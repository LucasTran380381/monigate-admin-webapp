import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from '../../services/department.service';
import {DepartmentStatus} from '../../models/enums/department-status';
import {MatTableDataSource} from '@angular/material/table';
import {Department} from '../../models/department';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ImportDepartmentComponent} from '../import-department/import-department.component';
import {DepartmentManipulationComponent} from '../department-manipulation/department-manipulation.component';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.scss'],
})
export class DepartmentManagementComponent implements OnInit {
  activeDepartmentDataSource = new MatTableDataSource<Department>()
  displayedColumns = ['no', 'id', 'name'];
  @ViewChild(MatPaginator)
  paginator: any;

  constructor(private departmentService: DepartmentService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._fetchDepartments()
  }

  addAttachment(fileInput: any) {
    const file = fileInput.target.file[0]
  }

  openImportDepartmentDialog() {
    this.dialog.open(ImportDepartmentComponent, {
      disableClose: true,
      data: {
        templateUrl: 'https://drive.google.com/uc?export=download&id=1MAp3ymIeQJFuOl10oPRAQVOgSDfFmxwX',
      },
    })
  }

  openAddDepartmentDialog() {
    this.dialog.open(DepartmentManipulationComponent, {
      disableClose: true,
    }).afterClosed().subscribe(message => {
      if (message == 'refresh')
        this._fetchDepartments()
    })
  }

  private _fetchDepartments() {
    this.departmentService.getDepartments(DepartmentStatus.all).subscribe(value => {
      this.activeDepartmentDataSource.data = value.filter(department => department.status = DepartmentStatus.active)
      this.activeDepartmentDataSource.paginator = this.paginator
    })
  }
}
