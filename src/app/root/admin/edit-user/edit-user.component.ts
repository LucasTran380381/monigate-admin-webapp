import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/role';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  isAddMode = true
  shouldHidePassword: boolean = true;
  roles: Role[] = []
  userForm = this.fb.group({
    id: ['', [Validators.required]],
    firstname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    lastname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    email: ['', [Validators.email]],
    phone: ['', Validators.pattern('[0-9]{10}')],
    roleId: ['', Validators.required],
  })

  constructor(private snackbar: MatSnackBar, private fb: FormBuilder, private userService: UserService, private dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data?: User) { }

  ngOnInit() {
    this.isAddMode = this.data == undefined
    this.userForm.patchValue(
      {
        id: this.data?.id,
        firstname: this.data?.firstName,
        lastname: this.data?.lastName,
        email: this.data?.email,
        phone: this.data?.phone,
        roleId: this.data?.account.role?.id,
      },
    )
    this.onGetAllRole().then()
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

  async onGetAllRole() {
    try { this.roles = await this.userService.getUserRoles().toPromise()} catch (e) { }
  }

  async onSubmit() {
    try {
      if (!this.isAddMode) {

      }
      await this.userService.onRegisterUser(this.userForm.value).toPromise();
      this.snackbar.open(
        'Tạo user thành công',
        undefined,
        {
          panelClass: 'green-snackbar',
        },
      )
      this.dialogRef.close()
    } catch (e) {
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
