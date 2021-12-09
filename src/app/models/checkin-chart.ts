export class CheckinChart {
  checkinDate: Date
  totalCheckin: number
  numOfInvalidFaceMask: number
  numOfHighTemperature: number

  constructor(checkinDate: Date, totalCheckin: number, numOfInvalidFaceMask: number, numOfHighTemperature: number) {
    this.checkinDate = checkinDate;
    this.totalCheckin = totalCheckin;
    this.numOfInvalidFaceMask = numOfInvalidFaceMask;
    this.numOfHighTemperature = numOfHighTemperature;
  }
}
