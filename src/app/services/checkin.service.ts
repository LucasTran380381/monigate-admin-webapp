import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Checkin} from "../models/checkin";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';

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
    let params: any = {}
    if (dateFrom) params.timeMin = dateFrom.getTime()
    if (dateTo) params.timeMax = dateTo.getTime()
    return this.http.get<Checkin[]>(`${environment.apiUrl}/Checkin/filter`, {params: params})
      .pipe(map(checkins => checkins.sort((previousCheckin, nextCheckin) => {
          const previousCheckinTime = new Date(previousCheckin.checkinTime).getTime();
          const nextCheckinTime = new Date(nextCheckin.checkinTime).getTime();
          return nextCheckinTime - previousCheckinTime;
        }),
      ))
  }
}
