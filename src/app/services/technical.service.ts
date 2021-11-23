import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TechnicalIssueType} from '../models/technical-issue-type';
import {map} from 'rxjs/operators';
import {TechnicalIssue} from '../models/technical-issue';
import {CheckinReport} from '../models/checkin-report';

@Injectable({
  providedIn: 'root',
})
export class TechnicalService {

  constructor(private http: HttpClient) { }

  getIssueTypes() {
    return this.http.get<TechnicalIssueType[]>(`${environment.apiUrl}/IssueType`)
  }

  getTechnicalIssues(issueTypes: TechnicalIssueType[]) {
    return this.http.get<any[]>(`${environment.apiUrl}/TechnicalIssue`).pipe(
      map(issues => issues.map(value => {
          value.issueType = issueTypes.find(type => type.id === value.issueTypeId)
          return value as TechnicalIssue
        }),
      ),
    )
  }

  getChecking(checkingId: string) {
    return this.http.get<CheckinReport>(`${environment.apiUrl}/Checkin/${checkingId}`)
  }

  getTechnicalIssue(id: string) {
    return this.http.get<TechnicalIssue>(`${environment.apiUrl}/TechnicalIssue/${id}`)
  }

}
