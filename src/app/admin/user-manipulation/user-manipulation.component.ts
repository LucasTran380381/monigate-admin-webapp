import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/role';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Department} from '../../models/department';
import {DepartmentService} from '../../services/department.service';
import {DepartmentStatus} from '../../models/enums/department-status';

@Component({
  selector: 'app-edit-user',
  templateUrl: './user-manipulation.component.html',
  styleUrls: ['./user-manipulation.component.scss'],
})
export class UserManipulation implements OnInit {
  isAddMode = true
  shouldHidePassword: boolean = true;
  roles: Role[] = []
  departments: Department[] = []
  userForm = this.fb.group({
    id: ['', [Validators.required]],
    firstname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    lastname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    email: ['', [Validators.email]],
    phone: ['', Validators.pattern('[0-9]{10}')],
    departmentId: ['', Validators.required],
  })

  constructor(private snackbar: MatSnackBar,
              private fb: FormBuilder,
              private userService: UserService,
              private departmentService: DepartmentService,
              private dialogRef: MatDialogRef<UserManipulation>,
              @Inject(MAT_DIALOG_DATA) public data?: User) { }

  ngOnInit() {
    this.isAddMode = this.data == undefined

    this.userForm.patchValue(
      {
        id: this.data?.id,
        firstname: this.data?.firstName,
        lastname: this.data?.lastName,
        email: this.data?.email,
        phone: this.data?.phone,
        departmentId: this.data?.departmentId,
      },
    )
    this.departmentService.getDepartments(DepartmentStatus.active).subscribe(value => this.departments = value)
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

  async onSubmit() {
    try {
      if (!this.isAddMode) {
        await this.userService.updateUser(this.userForm.value).toPromise()
        this.dialogRef.close('update success')
      } else {
        await this.userService.onRegisterUser(this.userForm.value).toPromise();
        this.dialogRef.close("create success")
      }
    } catch (e) {
      console.log(e);
      if (e.status === 500) {
        this.userForm.controls.id.setErrors({
          duplicate: true,
        })
      } else
        this.snackbar.open('Đã có lỗi xảy ra, vui lòng thử lại', undefined, {
          panelClass: 'red-snackbar',
        })
    }
  }
}
