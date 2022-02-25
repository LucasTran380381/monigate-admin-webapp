import {TechnicalIssueType} from './technical-issue-type';
import {CheckinReport} from './checkin-report';

export class TechnicalIssue {
  id: string;
  issueType: TechnicalIssueType;
  issueTypes: any;
  note: string;
  reportDate: Date;
  reportedCheckinId: string;
  reportedCheckin: CheckinReport;
  status: number;

  constructor(id: string, issueType: TechnicalIssueType, note: string, reportDate: Date, reportedCheckingId: string, status: number, checkinReport: CheckinReport) {
    this.id = id;
    this.issueType = issueType;
    this.note = note;
    this.reportDate = reportDate;
    this.reportedCheckinId = reportedCheckingId;
    this.status = status;
    this.reportedCheckin = checkinReport;
  }
}
