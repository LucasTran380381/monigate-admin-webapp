import {Component, Input, OnInit} from '@angular/core';
import {IssueType} from './issue-type';

@Component({
  selector: 'issue-tag',
  templateUrl: './issue-tag.component.html',
  styleUrls: ['./issue-tag.component.scss'],
})
export class IssueTagComponent implements OnInit {
  @Input()
  issueTypes: IssueType[]

  constructor() { }

  ngOnInit(): void {
  }

}
