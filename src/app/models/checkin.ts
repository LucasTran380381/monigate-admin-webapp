import {User} from "./user";

export class Checkin {
  id: string;
  checkingTime: Date;
  temperature: number;
  invalidFaceMaskUrl: string;
  user: User;


  constructor(id: string, checkingTime: Date, temperature: number, invalidFaceMaskUrl: string, user: User) {
    this.id = id;
    this.checkingTime = checkingTime;
    this.temperature = temperature;
    this.invalidFaceMaskUrl = invalidFaceMaskUrl;
    this.user = user;
  }
}
