export interface ExportDataDetail {
  id: string;
  firstName: string;
  lastName: string;
  totalWorkingDays: number;
  checkins: { [key: string]: Checkin } | null;
}

export interface Checkin {
  consumption: number;
  checkInTime: Date;
  checkOutTime: Date;
}
