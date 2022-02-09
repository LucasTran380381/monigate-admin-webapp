import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import {DiseaseReport} from './models/disease-report';
import {DiseaseReportService} from '../disease-report.service';
import {MatDialog} from '@angular/material/dialog';
import {DiseaseReportDetailComponent} from '../disease-report-detail/disease-report-detail.component';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {DiseaseReportStatus} from '../models/enums/disease-report-status';

@Component({
  selector: 'app-medical-manager',
  templateUrl: './medical-manager.component.html',
  styleUrls: ['./medical-manager.component.scss'],
})
export class MedicalManagerComponent implements OnInit {
  displayedColumns = ['no', 'id', 'userId', 'date', 'status', 'action'];
  dataSource: MatTableDataSource<DiseaseReport> = new MatTableDataSource<DiseaseReport>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  filterFrom = new FormGroup({
      startDay: new FormControl(),
      endDay: new FormControl(),
    },
  )

  constructor(private title: Title,
              private diseaseService: DiseaseReportService,
              private dialog: MatDialog) {
    this.title.setTitle('Medical Staff')
  }

  ngOnInit(): void {
    this.getDiseaseReports()
  }

  getDiseaseReports() {
    this.diseaseService.getDiseaseReports().subscribe(value => {
      console.log(value);
      this.dataSource.data = value.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
      this.dataSource.paginator = this.paginator
      this.dataSource.filterPredicate = (data, filter) => {
        let startDayPredicate = true
        let endDayPredicate = true
        const reportDay = new Date(data.reportDate)
        reportDay.setHours(0, 0, 0, 0)
        const filterObj = JSON.parse(filter);

        if (filterObj.startDay != null) {
          const startDay = new Date(filterObj.startDay)
          startDayPredicate = reportDay.getTime() >= startDay.getTime()
        }

        if (filterObj.endDay != null) {
          const endDay = new Date(filterObj.endDay)
          endDayPredicate = reportDay.getTime() <= endDay.getTime()
        }
        return startDayPredicate && endDayPredicate
      }
    })
    this.filterFrom.valueChanges.subscribe(form => {
      this.dataSource.filter = JSON.stringify(form)
    })
  }

  openDialog(id: string) {
    this.dialog.open(DiseaseReportDetailComponent, {
      data: id,
      width: '1200px',
    }).afterClosed().subscribe(_ => this.getDiseaseReports())
  }

  getStatusName(status: DiseaseReportStatus): string {
    switch (status) {
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
