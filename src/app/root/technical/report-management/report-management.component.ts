import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TechnicalService} from '../../../services/technical.service';
import {TechnicalIssueType} from '../../../models/technical-issue-type';
import {TechnicalIssue} from '../../../models/technical-issue';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {IssueDetailComponent} from '../issue-detail/issue-detail.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss'],
})
export class ReportManagementComponent implements OnInit, AfterViewInit {
  openedIssue = 0
  processingIssue = 0
  issueTypes: TechnicalIssueType[] = []
  issueDataSource = new MatTableDataSource<TechnicalIssue>()
  displayedColumns: string[] = ['position', 'date', 'note', 'status', 'action'];
  startDate = new Date();
  endDate = new Date(new Date().setDate(this.startDate.getDate() - 30))
  filterForm = new FormGroup({
    startDate: new FormControl(this.endDate),
    endDate: new FormControl(this.startDate),
    type: new FormControl(),
    status: new FormControl(),
  })
  closedIssue: number;

  constructor(private title: Title,
              private technicalService: TechnicalService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) {
    this.title.setTitle('Monigate Technical Moderator')
  }

  // @ViewChild(MatPaginator, {static: false}) set content(content: MatPaginator) {
  //   if (content) { // initially setter gets called with undefined
  //     this.paginator = content;
  //   }
  // }
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngAfterViewInit() {
    this.issueDataSource.paginator = this.paginator;
  }

  ngOnInit() {
    // this.issueDataSource.filterPredicate = (data, filter) => {
    //   let isValidFilter = true
    //   const filterObj = JSON.parse(filter);
    //   if (filterObj.type)
    //     isValidFilter = isValidFilter && data.issueType.id === filterObj.type
    //   if (filterObj.status)
    //     isValidFilter = isValidFilter && data.status === filterObj.status
    //   if (filterObj.startDate)
    //     isValidFilter = isValidFilter && data.reportDate >= filterObj.startDate
    //   if (filterObj.endDate)
    //     isValidFilter = isValidFilter && data.reportDate <= filterObj.endDate
    //   return isValidFilter
    // }
    // this.filterForm.valueChanges.subscribe(value => this.issueDataSource.filter = JSON.stringify(value))
    this.technicalService.getIssueTypes().subscribe(value => this.issueTypes = value)
    this.getTechnicalIssues()
  }

  getTechnicalIssues() {
    this.startDate = this.filterForm.value.startDate
    this.endDate = this.filterForm.value.endDate

    this.technicalService.getIssues(this.filterForm.value).subscribe(value => {
      this.issueDataSource.data = value
      this.openedIssue = value.filter(issue => issue.status === 100).length
      this.processingIssue = value.filter(issue => issue.status === 200).length
      this.closedIssue = value.filter(issue => issue.status == 300).length
    })
  }

  onGetStatusTitle(status: number) {
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

  onGetStatusStyle(status: number) {
    let style = {color: 'green'}
    switch (status) {
      case 100:
        style.color = '#939393'
        break
      case 200:
        style.color = 'orange'
        break
      case 300:
        style.color = 'green'
        break
    }
    return style
  }

  async onOpenDetailDialog(issue: TechnicalIssue) {
    this.dialog.open(IssueDetailComponent, {
      data: issue,
      width: '900px',
    }).afterClosed().subscribe(msg => {
      if (msg == 'refresh') {
        this.getTechnicalIssues()
        this.snackbar.open('Cập nhật thành công', '', {
          panelClass: 'green-snackbar',
        })
      }
    })
  }
}
