import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SupplementaryAccount} from '../models/supplementary-account';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-confirm-reset-account',
  templateUrl: './confirm-reset-account.component.html',
  styleUrls: ['./confirm-reset-account.component.scss'],
})
export class ConfirmResetAccountComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SupplementaryAccount,
              private dialogRef: MatDialogRef<ConfirmResetAccountComponent>,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  resetAccount() {
    this.accountService.resetAccount(this.data.username).subscribe(_ => this.dialogRef.close('refresh'));
  }
}
