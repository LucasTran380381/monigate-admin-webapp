import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CheckinService} from '../../../services/checkin.service';
import {Checkin} from '../../../models/checkin';
import {MatPaginator} from '@angular/material/paginator';
import {CheckinStatus} from '../../../models/enums/checkin-status';
import {FaceMaskStatus} from '../../../models/enums/face-mask-status';

@Component({
  selector: 'app-checkin-statistics',
  templateUrl: './checkin-statistics.component.html',
  styleUrls: ['./checkin-statistics.component.scss'],
})
export class CheckinStatisticsComponent implements OnInit {
  checkinDataSource = new MatTableDataSource<Checkin>()
  midnightCurrentDate = new Date(new Date().setHours(0, 0, 0, 0))
  displayedColumns = ['no', 'time', 'temperature', 'faceMaskStatus', 'status'];
  @ViewChild(MatPaginator, {static: false})
  paginator?: MatPaginator
  totalCheckin = 0
  numOfWrongFaceMask = 0
  numOfHighTemperature = 0

  constructor(private checkinService: CheckinService) { }

  ngOnInit(): void {
    this.checkinService.getCheckinBetweenDate(this.midnightCurrentDate)
      .subscribe(checkins => {
        this.setupGeneralInfo(checkins)
        this.checkinDataSource.data = checkins
        if (this.paginator)
          this.checkinDataSource.paginator = this.paginator
      })
  }

  setupGeneralInfo(checkins: Checkin[]) {
    this.totalCheckin = checkins.length
    this.numOfWrongFaceMask = checkins.filter(checkin => checkin.faceMaskStatus != FaceMaskStatus.correct).length
    this.numOfHighTemperature = checkins.filter(checkin => checkin.temperature > 37.5).length
  }

  getStatusTitle(status: number) {
    let title = ''
    switch (status) {
      case CheckinStatus.approve:
        title = 'Chấp nhận'
        break
      case CheckinStatus.approveManual:
        title = 'Cảnh báo'
        break
      case CheckinStatus.decline:
        title = 'Từ chối'
        break
    }
    return title
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

  getFaceMaskStatusTitle(status: FaceMaskStatus) {
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

}
