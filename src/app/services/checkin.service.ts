import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Checkin} from "../models/checkin";
import {environment} from "../../environments/environment";

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
}
