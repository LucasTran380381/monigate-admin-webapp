import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  isAddMode = true
  shouldHidePassword: boolean = true;
  roles = [
    {roleId: 1, roleName: 'admin'},
    {roleId: 2, roleName: 'technical staff'},
    {roleId: 3, roleName: 'leader manager'},
    {roleId: 4, roleName: 'manager'},
  ];

  userForm = new FormGroup({});

  constructor(private dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data?: User) { }

  ngOnInit(): void {
    this.isAddMode = this.data == undefined
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

}
