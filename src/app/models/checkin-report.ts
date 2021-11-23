import {User} from './user';

export class CheckinReport {
  checkinTime: Date;
  faceMaskImageUrl?: string;
  gateId?: string;
  id: string;
  isValidFaceMask?: boolean;
  temperature: number
  user: User;
  userId: string;

  constructor(checkinTime: Date, faceMaskImageUrl: string, gateId: string, id: string, isValidFaceMask: boolean, temperature: number, user: User, userId: string) {
    this.checkinTime = checkinTime;
    this.faceMaskImageUrl = faceMaskImageUrl;
    this.gateId = gateId;
    this.id = id;
    this.isValidFaceMask = isValidFaceMask;
    this.temperature = temperature;
    this.user = user;
    this.userId = userId
  }
}
