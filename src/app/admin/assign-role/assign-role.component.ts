import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Role} from '../../models/role';
import {SupplementaryAccount} from '../models/supplementary-account';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent implements OnInit, AfterContentChecked {
  roleControl = new FormControl()
  roles: Role[]
  availableAccounts: SupplementaryAccount[]
  usernameControl = new FormControl()

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private dialogRef: MatDialogRef<AssignRoleComponent>,
              private changeDetector: ChangeDetectorRef,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getSuppRole().subscribe(value => this.roles = value)
    this.roleControl.valueChanges.subscribe(value => console.log(value))
  }

  findAvailableAccount() {
    if (this.roleControl.invalid) {
      return
    }
    this.accountService.getAvailableAccounts(this.roleControl.value).subscribe(value => this.availableAccounts = value);
  }

  assignAccount() {
    if (this.usernameControl.invalid) {
      return
    }

    this.accountService.assignAccount(this.data.id, this.usernameControl.value).subscribe(_ => this.dialogRef.close('success'))
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()
  }
}
