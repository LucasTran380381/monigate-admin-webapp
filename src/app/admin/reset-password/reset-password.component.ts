import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';
import {AccountService} from '../../services/account.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  usernameControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private accountService: AccountService,
              private dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit(): void {
  }

  resetPassword() {
    if (this.usernameControl.invalid) {
      return
    }

    this.accountService.resetPassword(this.usernameControl.value).subscribe(_ => this.dialogRef.close('success'), error => console.log(error));
  }
}
