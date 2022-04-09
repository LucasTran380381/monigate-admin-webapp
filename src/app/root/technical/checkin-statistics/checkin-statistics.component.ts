import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CheckinService} from '../../../services/checkin.service';
import {Checkin} from '../../../models/checkin';
import {MatPaginator} from '@angular/material/paginator';
import {CheckinStatus} from '../../../models/enums/checkin-status';
import {FaceMaskStatus} from '../../../models/enums/face-mask-status';
import {ChartConfiguration, ChartOptions, ChartType} from 'chart.js';
import {DatePipe} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkin-statistics',
  templateUrl: './checkin-statistics.component.html',
  styleUrls: ['./checkin-statistics.component.scss'],
})
export class CheckinStatisticsComponent implements OnInit, AfterViewInit {
  checkinDataSource = new MatTableDataSource<Checkin>()
  midnightCurrentDate = new Date(new Date().setHours(0, 0, 0, 0))
  firstDateOfMonth = new Date(this.midnightCurrentDate.getFullYear(), this.midnightCurrentDate.getMonth(), 1)
  displayedColumns = ['no', 'time', 'temperature', 'faceMaskStatus', 'status'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator
  totalCheckin = 0
  numOfWrongFaceMask = 0
  numOfHighTemperature = 0
  endDate = new Date()
  startDate = new Date(new Date().setDate(this.endDate.getDate() - 30))

  filterForm = new FormGroup({
    startDate: new FormControl(this.startDate),
    endDate: new FormControl(this.endDate),
  });

  chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Tổng số Checkin',
        borderColor: '#3f51b5',
      },
      {
        data: [],
        label: 'Đeo khẩu trang không đúng',
        borderColor: 'orange',
      },
      {
        data: [],
        label: 'Nhiệt độ cao bất thường',
        borderColor: 'red',
      },
    ],
    labels: [],
  }
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: {
        title: {
          display: true,
          text: 'Số người',
          font: {
            size: 18,
            weight: 'bold',
          },
        },
      },
      xAxes: {
        title: {
          display: true,
          text: 'Ngày',
          font: {
            weight: 'bold',
            size: 18,
          },
        },
      },
    },
  };
  chartType: ChartType = 'line'
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective


  constructor(private checkinService: CheckinService) { }

  ngOnInit(): void {
    this.checkinService.getCheckinChartDate(this.firstDateOfMonth).subscribe(reports => {
      const pipe = new DatePipe('vi')
      this.chartData.labels = reports.map(report => pipe.transform(report.checkinDate, 'd/M'))
      this.chartData.datasets[0].data = reports.map(report => report.totalCheckin)
      this.chartData.datasets[1].data = reports.map(report => report.numOfInvalidFaceMask)
      this.chartData.datasets[2].data = reports.map(report => report.numOfHighTemperature)
      this.chart?.chart?.update()
    })

    this.getCheckins()
  }

  ngAfterViewInit() {
    this.checkinDataSource.paginator = this.paginator
  }

  getDatesInMonth(month?: number, year?: number) {
    const dateInMonth: Date[] = [];
    if (month == null) {
      month = new Date().getMonth();
    }
    if (year == null) {
      year = new Date().getFullYear();
    }
    let date = new Date(month, year, 1);
    while (date.getMonth() === month) {
      dateInMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dateInMonth;
  }

  setupGeneralInfo(checkins: Checkin[]) {
    this.totalCheckin = checkins.length
    this.numOfWrongFaceMask = checkins.filter(checkin => checkin.faceMaskStatus != FaceMaskStatus.correct).length
    this.numOfHighTemperature = checkins.filter(checkin => checkin.temperature > 37.5).length
  }

  getStatusIcon(status: CheckinStatus) {
    switch (status) {
      case CheckinStatus.approve:
        return 'done'
      case CheckinStatus.approveManual:
        return 'warning_amber'
      case CheckinStatus.decline:
        return 'close'
    }
  }

  getStatusTooltip(status: CheckinStatus) {
    switch (status) {
      case CheckinStatus.approve:
        return 'Checkin thành công'
      case CheckinStatus.approveManual:
        return 'Lưu ý checkin này'
      case CheckinStatus.decline:
        return 'Checkin thất bại'
    }
  }

  getStatusStyle(status: number) {
    let style = {
      color: 'green',
    }
    switch (status) {
      case CheckinStatus.approve:
        style.color = 'green'
        break
      case CheckinStatus.decline:
        style.color = 'red'
        break
      case CheckinStatus.approveManual:
        style.color = 'orange'
        break
    }
    return style;
  }

  getFaceMaskStatusTooltip(status: FaceMaskStatus) {
    switch (status) {
      case FaceMaskStatus.none:
        return 'Không đeo khẩu trang'
      case FaceMaskStatus.correct:
        return 'Hợp lệ'
      case FaceMaskStatus.incorrect:
        return 'Đeo khẩu trang sai cách'
    }
  }

  getFaceMaksStatusStyle(status: FaceMaskStatus) {
    switch (status) {
      case FaceMaskStatus.none:
        return {color: 'red'}
      case FaceMaskStatus.correct:
        return {color: 'green'}
      case FaceMaskStatus.incorrect:
        return {color: 'orange'}
    }
  }

  getCheckins() {
    const formValues = this.filterForm.value;
    this.startDate = formValues.startDate;
    this.endDate = formValues.endDate;

    this.checkinDataSource.data = []
    this.checkinService.getCheckinBetweenDate(formValues.startDate, formValues.endDate)
      .subscribe(checkins => {
        this.setupGeneralInfo(checkins)
        this.checkinDataSource.data = checkins
      })

    this.getChartInfo()
  }

  private getChartInfo() {
    const formValues = this.filterForm.value;
    this.checkinService.getCheckinChartDate(formValues.startDate, formValues.endDate).subscribe(reports => {
      console.log(reports);
      const pipe = new DatePipe('vi')
      this.chartData.labels = reports.map(report => pipe.transform(report.checkinDate, 'd/M'))
      this.chartData.datasets[0].data = reports.map(report => report.totalCheckin)
      this.chartData.datasets[1].data = reports.map(report => report.numOfInvalidFaceMask)
      this.chartData.datasets[2].data = reports.map(report => report.numOfHighTemperature)
      this.chart?.chart?.update()
    })
    // const pipe = new DatePipe('vi')
    // this.chartData.labels = reports.map(report => pipe.transform(report.checkinDate, 'd/M'))
    // this.chartData.datasets[0].data = reports.map(report => report.totalCheckin)
    // this.chartData.datasets[1].data = reports.map(report => report.numOfInvalidFaceMask)
    // this.chartData.datasets[2].data = reports.map(report => report.numOfHighTemperature)
    // this.chart?.chart?.update()
  }
}
