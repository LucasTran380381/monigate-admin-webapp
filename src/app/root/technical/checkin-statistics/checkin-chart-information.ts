import {DatePipe} from '@angular/common';

export class CheckinChartInformation {
  reports: ChartReport[]

  constructor(reports: ChartReport[]) {
    this.reports = reports;
  }

  public static getChartLabels(dateRange: Date[]) {
    const datePipe = new DatePipe('vi');
    return dateRange.map(date => datePipe.transform(date, 'dd/MM/yyyy')!)
  }

  public static generateDateRange(dateFrom: Date, dateTo: Date) {
    const dateRange = [];
    let currentDate = dateFrom;
    while (currentDate <= dateTo) {
      dateRange.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateRange;
  }

  getCheckinDataset(dateRange: Date[]) {
    return dateRange.map(date => {
      const report = this.getReport(date);
      return report?.checkinReport.totalCheckin ?? 0;
    });
  }

  getMaskFaultDataSet(dateRange: Date[]) {
    return dateRange.map(date => this.getReport(date)?.faceMaskReport.maskFaultCount ?? 0)
  }

  getTemperatureFaultDataset(dateRange: Date[]) {
    return dateRange.map(value => this.getReport(value)?.temperatureReport.Abnormal ?? 0)
  }

  private getReport(date: Date) {
    return this.reports.find(report => {
      report.checkinDate = new Date(report.checkinDate)
      return report.checkinDate.getDate() == date.getDate() &&
        report.checkinDate.getMonth() == date.getMonth();
    });
  }
}

export class ChartReport {
  checkinDate: Date;
  checkinReport: CheckinReport;
  faceMaskReport: FaceMaskReport;
  temperatureReport: TemperatureReport;

  constructor(src: ChartReport) {
    this.checkinDate = new Date(src.checkinDate)
    this.checkinReport = new CheckinReport(src.checkinReport)
    this.faceMaskReport = new FaceMaskReport(src.faceMaskReport)
    this.temperatureReport = src.temperatureReport
  }
}

export class CheckinReport {
  Approved: number = 0;
  ApprovedManually: number = 0;
  DeclinedManually: number = 0;
  Declined: number = 0;

  constructor(src: CheckinReport) {
    Object.assign(this, src)
  }

  get totalCheckin() {
    return this.ApprovedManually + this.Approved + this.Declined + this.DeclinedManually
  }
}

export class FaceMaskReport {
  Incorrect: number = 0;
  Correct?: number;
  None: number = 0;
  Unavailable: number = 0;

  constructor(src: FaceMaskReport) {
    Object.assign(this, src)
  }

  get maskFaultCount() {
    return this.None + this.Incorrect + this.Unavailable
  }
}

export class TemperatureReport {
  Normal?: number;
  Abnormal: number = 0;
}
