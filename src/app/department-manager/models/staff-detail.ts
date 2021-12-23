import {User} from '../../models/user';
import {CheckinForStaffDetail} from './checkin-for-staff-detail';

export class StaffDetail {
  user: User
  checkins: CheckinForStaffDetail[]

  constructor(user: User, checkins: CheckinForStaffDetail[]) {
    this.user = user;
    this.checkins = checkins;
  }
}
