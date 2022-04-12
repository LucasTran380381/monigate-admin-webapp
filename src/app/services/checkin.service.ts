import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Checkin} from "../models/checkin";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';
import {TimestampPipe} from '../pipes/timestamp.pipe';
import {CheckinChart} from '../models/checkin-chart';
import {ChartReport, CheckinChartInformation} from '../root/technical/checkin-statistics/checkin-chart-information';

@Injectable({
  providedIn: 'root',
})
export class CheckinService {

  constructor(private http: HttpClient) { }

  getAllCheckin() {
    return this.http.get<Checkin[]>(environment.apiUrl + "Checkin");
  }

  getCheckinFromDateToDate(formValue: any) {
    let queryParams: any = {};
    if (formValue.timeMin) queryParams.timeMin = formValue.timeMin
    if (formValue.timeMax) queryParams.timeMax = formValue.timeMax
    return this.http.get<Checkin[]>(environment.apiUrl.concat("Checkin/filter"), {params: queryParams})
  }

  getCheckinBetweenDate(dateFrom?: Date, dateTo?: Date) {
    const timestampPipe = new TimestampPipe();
    let params: any = {}
    if (dateFrom) {
      params.timeMin = timestampPipe.transform(dateFrom)
    }
    if (dateTo) params.timeMax = timestampPipe.transform(dateTo)
    return this.http.get<Checkin[]>(`${environment.apiUrl}/Checkin/filter`, {params: params})
      .pipe(map(checkins => checkins.sort((previousCheckin, nextCheckin) => {
          const previousCheckinTime = new Date(previousCheckin.checkinTime).getTime();
          const nextCheckinTime = new Date(nextCheckin.checkinTime).getTime();
          return nextCheckinTime - previousCheckinTime;
        }),
      ))
  }

  getCheckinChartDate(dateFrom: Date, dateTo?: Date) {
    const timestampPipe = new TimestampPipe()
    let params: any = {timeMin: timestampPipe.transform(dateFrom)};
    if (dateTo) params.timeMax = timestampPipe.transform(dateFrom);

    return this.http.get<any[]>(`${environment.apiUrl}/Checkin/report`, {params: params}).pipe(map((resp: any[]) => {
      return resp.map((record: {
        checkinDate: Date, checkinReport: any, faceMaskReport: any, temperatureReport: any
      }) => new CheckinChart(record.checkinDate, this.countTotalCheckin(record.checkinReport), this.countInvalidFaceMask(record.faceMaskReport), this.countHighTemperature(record.temperatureReport)));
    }));
  }

  getCheckinChartInfo(dateFrom: Date, dateTo?: Date) {
    const timestampPipe = new TimestampPipe();
    const params: any = {timeMin: timestampPipe.transform(dateFrom)}
    if (dateTo) { params.timeMax = timestampPipe.transform(dateTo)}

    return this.http.get<ChartReport[]>(`${environment.apiUrl}/Checkin/report`, {params}).pipe(
      map(reports => {
        const chartReports = reports.map(value => new ChartReport(value));
        chartReports.sort((a, b) => new Date(a.checkinDate).getTime() - new Date(b.checkinDate).getTime())
        return new CheckinChartInformation(chartReports)
      }),
    )

  }

  countTotalCheckin(checkinReport: {
    Approved?: number;
    ApprovedManually?: number,
    DeclinedManually?: number,
  }) {
    const numOfApprovedCheckin = checkinReport.Approved ?? 0
    const numOfApprovedManuallyCheckin = checkinReport.ApprovedManually ?? 0
    const numOfDeclinedManuallyCheckin = checkinReport.DeclinedManually ?? 0

    return numOfApprovedCheckin + numOfApprovedManuallyCheckin + numOfDeclinedManuallyCheckin
  }

  countInvalidFaceMask(report: {
    None?: number
    Unavailable?: number
  }) {
    const numOfNonEFaceMask = report.None ?? 0
    const numOfUnavailableFaceMask = report.Unavailable ?? 0
    return numOfNonEFaceMask + numOfUnavailableFaceMask
  }

  countHighTemperature(temperatureReport: {
    Abnormal?: number
  }) {
    return temperatureReport.Abnormal ?? 0
  }
}
