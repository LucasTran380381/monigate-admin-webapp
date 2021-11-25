import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TechnicalIssue} from '../../../models/technical-issue';
import {TechnicalService} from '../../../services/technical.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})
export class IssueDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public issue: TechnicalIssue, private technicalService: TechnicalService, private userService: UserService) { }

  ngOnInit(): void {
    this.technicalService.getTechnicalIssue(this.issue.id).subscribe(value => {
      this.issue = value
    });
  }

  async onGetIssueDetail() {
    this.issue.reportedCheckin = await this.technicalService.getChecking(this.issue.reportedCheckinId).toPromise()
  }

  getStatusTitle(status: number) {
    let title = ''
    switch (status) {
      case 100:
        title = 'Chưa tiếp nhận'
        break
      case 200:
        title = 'Đang xử lí'
        break
      case 300:
        title = 'Từ chối tiếp nhận'
        break
    }
    return title
  }

  getStatusStyle(status: number) {
    const style = {color: '#939393'}
    switch (status) {
      case 200:
        style.color = 'green'
        break
      case 300:
        style.color = 'red'
        break
    }
    return style
  }

  getFaceMaskStatusStyle(isValidStatus: boolean) {
    const style = {
      color: 'green',
    }
    if (!isValidStatus) style.color = 'red'
    return style
  }
}