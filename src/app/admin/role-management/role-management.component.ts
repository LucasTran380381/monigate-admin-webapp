import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Role} from '../../models/role';
import {MatPaginator} from '@angular/material/paginator';
import {RoleService} from '../services/role.service';
import {MatDialog} from '@angular/material/dialog';
import {RoleManipulationComponent} from '../role-manipulation/role-manipulation.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  rolesDataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  displayedColumns = ['no', 'name'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator

  constructor(private roleService: RoleService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this._fetchRoles()
  }

  openManipulationDialog(id?: string) {
    this.dialog.open(RoleManipulationComponent, {
      data: id,
    }).afterClosed().subscribe(message => {
      if (!message)
        return

      this._fetchRoles()
      message = message == 'created' ? 'Tạo thành công' : 'Cập nhật thành công'
      this.snackbar.open(message, undefined, {
        panelClass: 'green-snackbar',
      })
    })
  }

  private _fetchRoles() {
    this.roleService.getRoles().subscribe(value => {
      this.rolesDataSource.data = value
      this.rolesDataSource.paginator = this.paginator
    });
  }
}
