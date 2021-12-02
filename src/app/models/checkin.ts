import {User} from "./user";
import {CheckinStatus} from './enums/checkin-status';
import {FaceMaskStatus} from './enums/face-mask-status';

export class Checkin {
  id: string;
  checkinTime: Date;
  temperature: number;
  invalidFaceMaskUrl: string;
  status: CheckinStatus
  faceMaskStatus: FaceMaskStatus
  user: User;

  constructor(id: string, checkingTime: Date, temperature: number, invalidFaceMaskUrl: string, status: number, faceMaskStatus: number, user: User) {
    this.id = id;
    this.checkinTime = checkingTime;
    this.temperature = temperature;
    this.invalidFaceMaskUrl = invalidFaceMaskUrl;
    this.status = status;
    this.faceMaskStatus = faceMaskStatus
    this.user = user;
  }
}
