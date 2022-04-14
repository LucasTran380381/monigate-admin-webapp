import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TechnicalIssueType} from '../models/technical-issue-type';
import {concatMap, map} from 'rxjs/operators';
import {TechnicalIssue} from '../models/technical-issue';
import {CheckinReport} from '../models/checkin-report';
import {TimestampPipe} from '../pipes/timestamp.pipe';
import {IssueStatus} from '../root/technical/issue-tag/issue-type';

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

  getCheckinImage(checkinId: string) {
    return this.http.get(`${environment.apiUrl}/Checkin/checkin-image`, {
      params: {
        checkinId,
      },
      responseType: 'text',
    })
  }

  getIssues(formValue: any) {
    const params = this.convertParams(formValue)
    return this.getIssueTypes().pipe(concatMap(issueTypes => this.http.get<any[]>(`${environment.apiUrl}/TechnicalIssue/filter`, {
      params,
    }).pipe(
      map(issues => issues.map(issue => {
        issue.issueType = issueTypes.find(type => type.id == issue.issueTypeId)
        return issue as TechnicalIssue
      })),
    )))
  }

  getChecking(checkingId: string) {
    return this.http.get<CheckinReport>(`${environment.apiUrl}/Checkin/${checkingId}`)
  }

  getTechnicalIssue(id: string) {
    return this.http.get<TechnicalIssue>(`${environment.apiUrl}/TechnicalIssue/${id}`)
  }

  convertParams(formValue: any) {
    const timestampPipe = new TimestampPipe();
    const params: any = {};
    params.timeMin = timestampPipe.transform(formValue.startDate)

    if (formValue.endDate) {
      params.timeMax = timestampPipe.transform(formValue.endDate)
    }

    if (formValue.type) {
      params.issueTypeId = formValue.type
    }

    if (formValue.status) {
      params.status = formValue.status
    }

    return params
  }

  updateStatusIssue(technicalIssueId: string, issueTypeId: string, status: IssueStatus) {
    return this.http.put(`${environment.apiUrl}/TechnicalIssue/status`, {
      technicalIssueId,
      issueTypeId,
      status,
    })
  }

}
