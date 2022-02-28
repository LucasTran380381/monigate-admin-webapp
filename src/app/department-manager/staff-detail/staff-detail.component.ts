import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ManagerService} from '../services/manager.service';
import {CheckinForStaffDetail} from '../models/checkin-for-staff-detail';
import {User} from '../../models/user';
import {CheckinStatus} from '../../models/enums/checkin-status';
import {FaceMaskStatus} from '../../models/enums/face-mask-status';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss'],
})
export class StaffDetailComponent implements OnInit {
  user: User
  viewDate = new Date();
  checkins: CheckinForStaffDetail[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService
      .getStaffDetail(this.data.id, this.data.dateFrom, this.data.dateTo)
      .subscribe(value => {
        console.log(value);
        if (!value)
          return
        this.user = value.user
        this.checkins = value.checkins
        console.log(this.checkins);
      })
  }

  formatCheckinStatus(status: CheckinStatus) {
    switch (status) {
      case CheckinStatus.approve:
        return {style: 'success-color', tooltip: 'Checkin thành công', icon: 'done'}
      case CheckinStatus.approveManual:
        return {style: 'warning-color', tooltip: 'Được phép cho vào', icon: 'report_problem'}
      case CheckinStatus.decline:
        return {style: 'error-color', tooltip: 'Checkin thất bại', icon: 'error_outline'}
    }
  }

  formatMaskStatus(status: FaceMaskStatus) {
    switch (status) {
      case FaceMaskStatus.none:
        return {style: 'error-color', tooltip: 'Không đeo khẩu trang'}
      case FaceMaskStatus.correct:
        return {style: 'success-color', tooltip: 'Khẩu trang hợp lệ'}
      case FaceMaskStatus.incorrect:
        return {style: 'warning-color', tooltip: 'Đeo khẩu trang sai'}
    }
  }

  getCheckin(date: string) {
    return this.checkins.find(checkin => new Date(checkin.checkinTime).getDate() == new Date(date).getDate())
  }

  formatTemperatureStatus(temperature: number) {
    if (temperature > 37.5)
      return {style: 'error-color', tooltip: `${temperature}`}
    else
      return {style: 'success-color', tooltip: `${temperature}`}
  }
}
