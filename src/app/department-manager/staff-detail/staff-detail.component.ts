import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ManagerService} from '../services/manager.service';
import {MatTableDataSource} from '@angular/material/table';
import {CheckinForStaffDetail} from '../models/checkin-for-staff-detail';
import {MatPaginator} from '@angular/material/paginator';
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
  checkinDataSource: MatTableDataSource<CheckinForStaffDetail> = new MatTableDataSource<CheckinForStaffDetail>()
  displayedColumns: string[] = ['no', 'checkinTime', 'temperature', 'maskStatus', 'checkinStatus'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService
      .getStaffDetail(this.data.id, this.data.dateFrom, this.data.dateTo)
      .subscribe(value => {
        if (!value)
          return
        this.user = value.user
        this.checkinDataSource.data = value.checkins.sort((a, b) => new Date(b.checkinTime).getTime() - new Date(a.checkinTime).getTime())
        this.checkinDataSource.paginator = this.paginator
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

}
