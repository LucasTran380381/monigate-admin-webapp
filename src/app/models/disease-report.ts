export class DiseaseReport {
  id: string;
  reportedUserId: string;
  reportDate: Date
  note?: string
  diseaseCode?: string
  reportImageUrls?: string[]
}
