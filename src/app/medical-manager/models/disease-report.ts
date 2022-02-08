export class DiseaseReport {
  id: string;
  reportedUserId: string;
  reportUser: ReportedUser;
  reportDate: Date
  note?: string
  diseaseCode?: string
  reportImageUrls?: string[]
}

export class ReportedUser {
  id: string;
  firstName: string;
  lastName: string
}
