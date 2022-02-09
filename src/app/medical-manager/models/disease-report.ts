import {DiseaseReportStatus} from '../../models/enums/disease-report-status';

export class DiseaseReport {
  id: string;
  reportedUserId: string;
  reportedUser: ReportedUser;
  status: DiseaseReportStatus;
  reportDate: Date
  note?: string
  diseaseCode?: string
  reportImageUrls?: string[]

  get statusName(): string {
    switch (this.status) {
      case DiseaseReportStatus.notApprove:
        return 'Chưa được chấp nhận'
      case DiseaseReportStatus.approved:
        return 'Đã chấp nhận'
      case DiseaseReportStatus.notified:
        return 'Đã thông báo'
    }
    return 'status named'
  }
}

export class ReportedUser {
  id: string;
  firstName: string;
  lastName: string
}
