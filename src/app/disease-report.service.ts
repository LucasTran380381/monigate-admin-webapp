import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {DiseaseReport} from './medical-manager/models/disease-report';

@Injectable({
  providedIn: 'root',
})
export class DiseaseReportService {

  constructor(private http: HttpClient) { }

  getDiseaseReports() {
    return this.http.get<DiseaseReport[]>(`${environment.apiUrl}/DiseaseReport`);
  }

  getDiseaseReport(id: string) {
    return this.http.get<DiseaseReport>(`${environment.apiUrl}/DiseaseReport/${id}`);
  }

  notifyDiseaseReport(id: string, dateRange: number) {
    return this.http.post<DiseaseReport>(`${environment.apiUrl}/DiseaseReport/notify?reportId=${id}&days=${dateRange}`, {});
  }

  approveDiseaseReport(id: string) {
    return this.http.put(`${environment.apiUrl}/DiseaseReport/approve`, {
      id,
    })
  }
}
