import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {StaffListItem} from '../models/staff-list-item';
import {ManagerService} from '../services/manager.service';
import {MatPaginator} from '@angular/material/paginator';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {StaffDetailComponent} from '../staff-detail/staff-detail.component';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-staff-managerment',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
})
export class StaffManagementComponent implements OnInit {
  displayedColumns: string[] = ['no', 'id', 'name', 'checkinCounter', 'faultFaceMaskCounter', 'highTemperatureCounter', 'action'];
  staffListDataSource: MatTableDataSource<StaffListItem> = new MatTableDataSource<StaffListItem>()
  @ViewChild(MatPaginator, {static: false})
  paginator?: MatPaginator

  currentDate = new Date()
  monthIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  filterFormControl = new FormControl(new Date().getMonth());
  month = this.filterFormControl.value as number
  firstDateOfMonth = new Date(this.currentDate.getFullYear(), this.month, 1)
  lastDateOfMonth = new Date(this.currentDate.getFullYear(), this.month + 1, 0)

  constructor(private managerService: ManagerService,
              private authService: AuthService,
              private title: Title,
              private dialog: MatDialog,
              private excelService: ExcelService) {
    const departmentName = authService.currentUser?.department.name
    title.setTitle(`${departmentName} Manager`)
  }

  ngOnInit(): void {
    this.fetchStaffList()
    this.filterFormControl.valueChanges.subscribe(month => {
      this.firstDateOfMonth = new Date(this.currentDate.getFullYear(), month, 1)
      this.lastDateOfMonth = new Date(this.currentDate.getFullYear(), month + 1, 0)
    })
  }

  fetchStaffList() {
    this.month = this.filterFormControl.value

    this.managerService.getStaffList(this.firstDateOfMonth, this.lastDateOfMonth).subscribe(value => {
      this.staffListDataSource.data = value
      if (this.paginator)
        this.staffListDataSource.paginator = this.paginator
    })
  }

  openDetailDialog(id: string) {
    this.dialog.open(StaffDetailComponent, {
      data: {
        id: id,
        dateFrom: this.firstDateOfMonth,
        dateTo: this.lastDateOfMonth,
      },
    })
  }

  exportToExcel() {
    const today = new Date();
    const time = [`Ngày ${today.getDate()}, Tháng ${today.getMonth() + 1}, Năm ${today.getFullYear()}`]
    const header = ['Mã nhân viên', 'Họ và tên', 'Số ngày đi làm']
    const title = [`Báo cáo theo dõi nhân viên tháng ${this.month + 1} phòng ban ${this.authService.currentUser?.department.name}`]
    const data = this.staffListDataSource.data.map(staff => [staff.id, `${staff.lastName} ${staff.firstName}`, staff.checkinCount]);
    data.unshift(title, [], header);
    data.push([], time)
    this.excelService.exportExcel(data, title[0])
  }
}
