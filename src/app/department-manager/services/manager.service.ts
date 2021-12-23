import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimestampPipe} from '../../pipes/timestamp.pipe';
import {StaffListItem} from '../models/staff-list-item';
import {environment} from '../../../environments/environment';
import {Checkin} from '../../models/checkin';
import {map} from 'rxjs/operators';
import {StaffDetail} from '../models/staff-detail';
import {CheckinForStaffDetail} from '../models/checkin-for-staff-detail';

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

}