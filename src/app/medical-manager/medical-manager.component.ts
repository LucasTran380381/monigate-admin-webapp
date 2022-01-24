import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import {DiseaseReport} from '../models/disease-report';
import {DiseaseReportService} from '../disease-report.service';
import {MatDialog} from '@angular/material/dialog';
import {DiseaseReportDetailComponent} from '../disease-report-detail/disease-report-detail.component';

@Component({
  selector: 'app-medical-manager',
  templateUrl: './medical-manager.component.html',
  styleUrls: ['./medical-manager.component.scss'],
})
export class MedicalManagerComponent implements OnInit {
  displayedColumns = ['no', 'id', 'userId', 'date', 'action'];
  dataSource: MatTableDataSource<DiseaseReport> = new MatTableDataSource<DiseaseReport>();

  constructor(private title: Title,
              private diseaseService: DiseaseReportService,
              private dialog: MatDialog) {
    this.title.setTitle('Medical Staff')
  }

  ngOnInit(): void {
    this.diseaseService.getDiseaseReports().subscribe(value => {
      console.log(value);
      this.dataSource.data = value.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
    })
  }

  openDialog(id: string) {
    this.dialog.open(DiseaseReportDetailComponent, {
      data: id,
      width: '700px',
    })
  }
}
