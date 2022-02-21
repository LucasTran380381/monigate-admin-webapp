import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private accountService: AccountService,
              private dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit(): void {
  }

  resetPassword() {
    // this.accountService.resetPassword();
    console.log(this.data);
  }
}
