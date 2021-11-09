import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../../models/user';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  editUserDialog: MatDialogRef<EditUserComponent, any> | undefined
  searchControl = new FormControl(undefined, [Validators.minLength(3)])
  originalUsers: User [] = []
  filteredUser: MatTableDataSource<User> = new MatTableDataSource<User>()
  displayedColumns: string[] = ['position', 'name', 'username', 'roleName', 'email', 'phone', 'status', 'action'];
  isNotFoundUser = false
  @ViewChild('paginator', {static: false})
  private paginator: MatPaginator | undefined;

  constructor(private title: Title, private dialog: MatDialog, private userService: UserService, private changeDetector: ChangeDetectorRef) {
    this.title.setTitle('Admin dashboard')
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  onOpenDialog(user?: User) {
    this.editUserDialog = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: user,
      disableClose: true,
    })
  }

  ngOnDestroy(): void {
    this.editUserDialog?.close()
  }

  async onSearch() {
    if (this.searchControl.invalid || !this.searchControl.value?.trim()) {
      this.searchControl.setErrors({
        minLength: true,
      })
      return
    }
    try {
      this.originalUsers = await this.userService.searchUser(this.searchControl.value.trim()).toPromise()
      this.isNotFoundUser = false
      this.filteredUser.data = this.originalUsers
      this.changeDetector.detectChanges()
      if (this.paginator)
        this.filteredUser.paginator = this.paginator
    } catch (e) {
      if (e.status === 404) {
        this.originalUsers = []
        this.filteredUser.data = []
        this.isNotFoundUser = true
      }
      console.log('error', e)
    }
  }

}
