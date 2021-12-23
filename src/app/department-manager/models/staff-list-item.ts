export class StaffListItem {
  checkinCount: number;
  abnormalTempCount: number;
  maskFaultCount: number;
  id: string;
  firstName: string;
  lastName: string;
  status: number;

  constructor(checkinCount: number, abnormalTempCount: number, maskFaultCount: number, id: string, firstName: string, lastName: string, status: number) {
    this.checkinCount = checkinCount;
    this.abnormalTempCount = abnormalTempCount;
    this.maskFaultCount = maskFaultCount;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
  }

  toArray() {
    return [this.id, `${this.lastName} ${this.firstName}`, this.checkinCount]
  }
}
