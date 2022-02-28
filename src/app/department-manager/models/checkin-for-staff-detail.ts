import {FaceMaskStatus} from '../../models/enums/face-mask-status';
import {CheckinStatus} from '../../models/enums/checkin-status';

export class CheckinForStaffDetail {
  id: string;
  checkinTime: Date;
  checkoutTime?: Date;
  temperature: number;
  faceMaskImageUrl?: string;
  faceMaskStatus: FaceMaskStatus;
  note?: string;
  status: CheckinStatus;

  constructor(id: string, checkinTime: Date, checkoutTime: Date | undefined, temperature: number, faceMaskImageUrl: string, faceMaskStatus: FaceMaskStatus, note: string, status: CheckinStatus) {
    this.id = id;
    this.checkinTime = checkinTime;
    this.checkoutTime = checkoutTime;
    this.temperature = temperature;
    this.faceMaskImageUrl = faceMaskImageUrl;
    this.faceMaskStatus = faceMaskStatus;
    this.note = note;
    this.status = status;
  }
}
