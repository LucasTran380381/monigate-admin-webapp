import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-staff-managerment',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
})
export class StaffManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'id', 'name', 'checkinCounter', 'faultFaceMaskCounter', 'highTemperatureCounter', 'action'];
  staffListDataSource: MatTableDataSource<StaffListItem> = new MatTableDataSource<StaffListItem>()
  @ViewChild(MatPaginator, {static: false})
  paginator?: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.staffListDataSource.sort = this.sort;
  }

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
    // this.filterFormControl.valueChanges.subscribe(month => {
    //   this.firstDateOfMonth = new Date(this.currentDate.getFullYear(), month, 1)
    //   this.lastDateOfMonth = new Date(this.currentDate.getFullYear(), month + 1, 0)
    // })
  }

  fetchStaffList() {
    this.month = this.filterFormControl.value
    this.firstDateOfMonth = new Date(this.currentDate.getFullYear(), this.month, 1)
    this.lastDateOfMonth = new Date(this.currentDate.getFullYear(), this.month + 1, 0)

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
      width: '800px',
    })
  }

  exportToExcel() {
    const today = new Date();
    const daysInMonth = this.getDaysInMonth(this.month, today.getFullYear())
    const formatDaysInMoth = daysInMonth.map(value => `${value.getDate()}/${value.getMonth() + 1}`)
    const time = [`Ngày ${today.getDate()}, Tháng ${today.getMonth() + 1}, Năm ${today.getFullYear()}`]
    const header = ['Mã nhân viên', 'Họ và tên', 'Ngày', 'Giờ vào làm theo quy định', 'Giờ tan về theo qui định', 'Giờ vào làm', 'Giờ tan làm', 'Đi trễ', 'Về sớm']
    const title = [`Báo cáo theo dõi nhân viên tháng ${this.month + 1} phòng ban ${this.authService.currentUser?.department.name}`]

    // this.managerService.getExportData(this.firstDateOfMonth, this.lastDateOfMonth).subscribe(staffDetails => {
    //   const isoDays = daysInMonth.map(value => {
    //     value.setMinutes(value.getMinutes() - value.getTimezoneOffset())
    //     return value.toISOString().slice(0, -5)
    //   })
    //
    //   const data = staffDetails.map(detail => {
    //     const formatCheckins = isoDays.map(day => detail.checkins?.[day]?.consumption?.toString() ?? '0')
    //
    //     return [detail.id, `${detail.lastName} ${detail.firstName}`, detail.totalWorkingDays, ...formatCheckins]
    //   })
    //
    //   data.unshift(title, [], header);
    //   data.push([], time)
    //   this.excelService.exportExcel(data, title[0])
    // });

    this.managerService.exportStaffData(this.firstDateOfMonth, this.lastDateOfMonth, '08:00', '18:00').subscribe(value => {
      const data = value.map(detail => {
        detail.timeIn = new Date(detail.timeIn)
        detail.timeOut = new Date(detail.timeOut)
        const date = new Date(detail.date)
        const datePipe = new DatePipe('vi')
        const timeIn = datePipe.transform(detail.timeIn, "HH:mm");
        const timeOut = datePipe.transform(detail.timeOut, "HH:mm")
        return [detail.id, `${detail.lastName} ${detail.firstName}`, datePipe.transform(date, 'd/M'), detail.stdIn, detail.stdOut, timeIn, timeOut, detail.comeLate, detail.leaveSoon];
      })

      data.unshift(title, [], header);
      data.push([], time)
      const headerPref = ['A1', 'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', `A${data.length}`]
      this.excelService.exportExcel(data, title[0], headerPref)
    })

    // const data = this.staffListDataSource.data.map(staff => [staff.id, `${staff.lastName} ${staff.firstName}`, staff.checkinCount]);

  }

  getDaysInMonth(month: number, year: number) {
    let date = new Date(year, month, 1, 0);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

}
