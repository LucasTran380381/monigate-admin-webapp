import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ManagerService} from '../services/manager.service';
import {MatTableDataSource} from '@angular/material/table';
import {CheckinForStaffDetail} from '../models/checkin-for-staff-detail';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss'],
})
export class StaffDetailComponent implements OnInit {
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
        this.checkinDataSource.data = value.checkins.sort((a, b) => new Date(b.checkinTime).getTime() - new Date(a.checkinTime).getTime())
        this.checkinDataSource.paginator = this.paginator
      })
  }

}
