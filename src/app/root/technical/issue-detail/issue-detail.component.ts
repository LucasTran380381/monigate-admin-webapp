import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TechnicalIssue} from '../../../models/technical-issue';
import {TechnicalService} from '../../../services/technical.service';
import {UserService} from '../../../services/user.service';
import {IssueType} from '../issue-tag/issue-type';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})
export class IssueDetailComponent implements OnInit {
  issueTypes: IssueType[]
  statusForm = new FormGroup({
    issueTypeId: new FormControl(),
    status: new FormControl(),
  })
  statusOptions: {
    name: string;
    value: number;
  }[];

  constructor(@Inject(MAT_DIALOG_DATA) public issue: TechnicalIssue, private technicalService: TechnicalService, private userService: UserService) { }

  ngOnInit(): void {
    this.technicalService.getTechnicalIssue(this.issue.id).subscribe(value => {
      this.issue = value
      this.issueTypes = value.issueTypes.map((type: any) => new IssueType(type))
    });

    this.statusForm.valueChanges.subscribe(value => {
      console.log(value);
      this.statusOptions = this.issueTypes.find(type => type.id == value.issueTypeId)?.statusOptions ?? []
    })
  }

  async onGetIssueDetail() {
    this.issue.reportedCheckin = await this.technicalService.getChecking(this.issue.reportedCheckinId).toPromise()
  }

  getStatusTitle(status: number) {
    let title = ''
    switch (status) {
      case 100:
        title = 'Đã tiếp nhận'
        break
      case 200:
        title = 'Đang xử lý'
        break
      case 300:
        title = 'Đã xử lý'
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

  getIssueTypes() {
    return this.issue.issueTypes.map((value: any) => value.issueType.name).join(', ')
  }

  updateStatus() {
    const formValue = this.statusForm.value;

    this.technicalService.updateStatusIssue(formValue.issueTypeId, this.issue.id, formValue.status).subscribe(value => console.log(value))
  }
}
