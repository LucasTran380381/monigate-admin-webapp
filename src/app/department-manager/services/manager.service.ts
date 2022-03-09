import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimestampPipe} from '../../pipes/timestamp.pipe';
import {StaffListItem} from '../models/staff-list-item';
import {environment} from '../../../environments/environment';
import {Checkin} from '../../models/checkin';
import {map} from 'rxjs/operators';
import {StaffDetail} from '../models/staff-detail';
import {CheckinForStaffDetail} from '../models/checkin-for-staff-detail';
import {ExportDataDetail} from '../models/export-data-detail';
import {StaffExportDetail} from '../models/staff-export-detail';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  private static _handleStaffDetailResponse(resp: Checkin[]) {
    const user = resp[0].user;
    if (!user)
      return undefined
    const checkins = resp.map(checkin => new CheckinForStaffDetail(checkin.id,
      checkin.checkinTime,
      checkin.checkoutTime,
      checkin.temperature,
      checkin.invalidFaceMaskUrl,
      checkin.faceMaskStatus,
      '', checkin.status))
    return new StaffDetail(user, checkins)
  }

  getStaffList(dateFrom: Date, dateTo?: Date) {
    const pipe = new TimestampPipe()
    let params: any = {}
    params.timeMin = pipe.transform(dateFrom)
    if (dateTo) params.timeMax = pipe.transform(dateTo)

    return this.http.get<StaffListItem[]>(`${environment.apiUrl}/User/deparment-report`, {params});
  }

  getStaffDetail(id: string, dateFrom: Date, dateTo: Date) {
    const pipe = new TimestampPipe();
    let params: any = {}
    params.timeMin = pipe.transform(dateFrom)
    params.timeMax = pipe.transform(dateTo)
    params.userId = id

    return this.http.get<Checkin[]>(`${environment.apiUrl}/Checkin/filter`, {params})
      .pipe(map(resp => ManagerService._handleStaffDetailResponse(resp)))
  }

  getExportData(dateFrom: Date, dateTo: Date) {
    const pipe = new TimestampPipe();

    return this.http.get<ExportDataDetail[]>(`${environment.apiUrl}/User/export-deparment-report`, {
      params: {
        timeMin: pipe.transform(dateFrom), timeMax: pipe.transform(dateTo),
      },
    })
  }

  exportStaffData(dateFrom: Date, dateTo: Date, stdIn: string, stdOut: string) {
    const pipe = new TimestampPipe();

    return this.http.get<StaffExportDetail[]>(`${environment.apiUrl}/User/export-deparment-report-ver-2`,
      {
        params: {
          timeMin: pipe.transform(dateFrom), timeMax: pipe.transform(dateTo),
          stdIn: stdIn, stdOut: stdOut,
        },
      }).pipe(map(resp => resp.sort((a, b) => {
            a.date = new Date(a.date)
            b.date = new Date(b.date)
            return a.date.getDate() - b.date.getDate()
          },
        ),
      ),
    )
  }

}
