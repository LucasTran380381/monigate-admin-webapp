import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserManipulation} from '../user-manipulation/user-manipulation.component';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ConfirmDialogComponent} from '../../root/confirm-dialog/confirm-dialog.component';
import {DialogData} from '../../models/dialog-data';
import {ImportUserComponent} from '../import-user/import-user.component';
import {AssignRoleComponent} from '../assign-role/assign-role.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, OnDestroy, AfterViewInit {
  editUserDialog: MatDialogRef<UserManipulation> | undefined
  searchControl = new FormControl(undefined, [Validators.minLength(3)])
  originalUsers: User [] = []
  userDataSource: MatTableDataSource<User> = new MatTableDataSource<User>()
  disabledUserDataSource: MatTableDataSource<User> = new MatTableDataSource<User>()
  userTableColumns: string[] = ['position', 'name', 'userId', 'status', 'action'];
  disabledUserTableColumns: string[] = ['position', 'id', 'name', 'email'];
  isNotFoundUser = false
  @ViewChild('paginator', {static: false})
  private paginator: MatPaginator | undefined;
  @ViewChild('disablePaginator', {static: false})
  private disablePaginator: MatPaginator | undefined;

  constructor(private title: Title,
              private dialog: MatDialog,
              private userService: UserService,
              private snackbar: MatSnackBar,
              private changeDetector: ChangeDetectorRef) {
    this.title.setTitle('Monigate Admin')
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  openUserManipulationDialog(user?: User) {
    this.editUserDialog = this.dialog.open(UserManipulation, {
      width: '600px',
      data: user,
      disableClose: true,
    })
    this.editUserDialog.afterClosed().subscribe(message => {
      let friendlyMessage;

      if (message == 'create success') {
        friendlyMessage = 'Tạo user thành công'
      }

      if (message == 'update success') {
        friendlyMessage = 'Cập nhật user thành công'
      }

      if (friendlyMessage) {
        this.searchUsers().then(_ => {})
        this.snackbar.open(
          friendlyMessage,
          undefined,
          {
            panelClass: 'green-snackbar',
          },
        )
      }

    })
  }

  ngOnDestroy(): void {
    this.editUserDialog?.close()
  }

  async searchUsers() {
    if (this.searchControl.invalid || !this.searchControl.value?.trim()) {
      this.searchControl.setErrors({
        minLength: true,
      })
      return
    }
    try {
      const result = await this.userService.searchUser(this.searchControl.value.trim()).toPromise()
      console.log('result', result)
      this.userDataSource.data = result.filter(user => user.status !== 0)
      this.disabledUserDataSource.data = result.filter(user => user.status === 0)
      this.isNotFoundUser = false
      this.changeDetector.detectChanges()
      if (this.paginator)
        this.userDataSource.paginator = this.paginator
      if (this.disablePaginator)
        this.disabledUserDataSource.paginator = this.disablePaginator
    } catch (e) {
      if (e.status === 404) {
        this.userDataSource.data = []
        this.isNotFoundUser = true
      }
    }
  }

  openBlockDialog(id: string, status: number) {
    const dialogData = new DialogData(status === 110 ? 'Xác nhận chặn người dùng' : 'Xác nhận bỏ chặn', status, status === 110 ? 'Chặn' : 'Bỏ' +
      ' chặn', 'Huỷ bỏ')
    this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    }).afterClosed().subscribe(value => {
      if (!value)
        return
      this.userService.changeStatus(id, value).subscribe(() => {
        const userForUpdateStatus = this.userDataSource.data.find(user => user.id === id);
        if (userForUpdateStatus)
          userForUpdateStatus.status = status
      })
    });
  }

  openConfirmDisableDialog(id: string) {
    const dialogData = new DialogData('Xác nhận vô hiệu hoá người dùng', 'disable', 'Vô hiệu hoá', 'Huỷ bỏ')
    this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    }).afterClosed().subscribe(message => {
      if (message == 'disable') {
        this.userService.changeStatus(id, 0).subscribe(() => {
          const deletedIndex = this.userDataSource.data.findIndex(user => user.id === id);
          const disabledUser = this.userDataSource.data.find(user => user.id === id);
          this.userDataSource.data.splice(deletedIndex, 1)
          this.userDataSource._updateChangeSubscription()

          if (disabledUser) {
            this.disabledUserDataSource.data.push(disabledUser)
            this.disabledUserDataSource._updateChangeSubscription()
          }
        }, error => console.log(error))
      }
    })
  }

  openImportUserDialog() {
    this.dialog.open(ImportUserComponent)
  }

  assignRole(user: User) {
    this.dialog.open(AssignRoleComponent, {
      data: user,
      width: '500px',
    }).afterClosed().subscribe(message => {
      if (message == 'success') {
        this.searchUsers().then(_ => {})
        this.snackbar.open('Thêm quyền thành công', '', {
          panelClass: 'green-snackbar',
        })
      }
    })
  }

  resetPassword(element: User) {
    this.dialog.open(ResetPasswordComponent, {
      data: element,
    }).afterClosed().subscribe(message => console.log(message));
  }
}
