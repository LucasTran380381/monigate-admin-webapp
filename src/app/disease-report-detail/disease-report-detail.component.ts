import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DiseaseReportService} from '../disease-report.service';
import {DiseaseReport} from '../models/disease-report';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-disease-report-detail',
  templateUrl: './disease-report-detail.component.html',
  styleUrls: ['./disease-report-detail.component.scss'],
})
export class DiseaseReportDetailComponent implements OnInit {

  diseaseReport: DiseaseReport;
  dateRangeControl: FormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private diseaseReportService: DiseaseReportService,
              private dialogRef: MatDialogRef<DiseaseReportDetailComponent>,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.diseaseReportService.getDiseaseReport(this.data).subscribe(value => this.diseaseReport = value)
  }

  notify() {
    if (this.dateRangeControl.invalid) { return }
    this.diseaseReportService.notifyDiseaseReport(this.data, this.dateRangeControl.value).subscribe(value => {
      console.log(value);
      this.snackbar.open('Đã gửi thông báo', '', {
        panelClass: 'green-snackbar',
      })
      this.dialogRef.close()
    }, _ => this.snackbar.open('Đã có lỗi xảy ra, vui lòng thử lại', '', {
      panelClass: 'red-snackbar',
    }))
  }
}
