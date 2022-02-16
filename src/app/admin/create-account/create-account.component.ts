import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Role} from '../../models/role';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    'roleId': new FormControl(),
    'username': new FormControl(),
  });
  roles: Role[];

  constructor(
    private dialogRef: MatDialogRef<CreateAccountComponent>,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getSuppRole().subscribe(value => this.roles = value)
  }

  createAccount() {
    if (this.accountForm.invalid) {
      return
    }

    const formValue = this.accountForm.value;
    this.accountService.createSuppAccount(formValue.username, formValue.roleId).subscribe(_ => {
      this.dialogRef.close('success')
    }, error => {
      if (error.status == 409) {
        this.accountForm.controls.username.setErrors({
          'duplicate': true,
        })
      }
    });
  }
}
