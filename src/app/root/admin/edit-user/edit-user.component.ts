import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
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
    firstname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    lastname: ['', [Validators.maxLength(20), Validators.minLength(1)]],
    email: ['', [Validators.email]],
    phone: ['', Validators.pattern('[0-9]{10}')],
    roleId: ['', Validators.required],
  })

  constructor(private snackbar: MatSnackBar, private fb: FormBuilder, private accountService: AccountService, private dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data?: User) { }

  async ngOnInit() {
    this.isAddMode = this.data == undefined
    this.roles = await this.accountService.getAllRole().toPromise()
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

  async onSubmit() {
    await this.accountService.onRegisterUser(this.userForm.value).toPromise();
    this.snackbar.open(
      'Tạo user thành công',
    )
    this.dialogRef.close()
  }
}
