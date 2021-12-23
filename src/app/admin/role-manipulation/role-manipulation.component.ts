import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Role} from '../../models/role';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-role-manipulation',
  templateUrl: './role-manipulation.component.html',
  styleUrls: ['./role-manipulation.component.scss'],
})
export class RoleManipulationComponent implements OnInit {
  roleForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  constructor(private roleService: RoleService, @Inject(MAT_DIALOG_DATA) public data?: string,
  ) { }

  ngOnInit(): void {
    if (this.data)
      this.roleService.getRole(this.data).subscribe(value => this.roleForm.patchValue(value))
  }

  submit() {
    if (this.roleForm.invalid) return
    if (this.data)
      this._updateRole(this.roleForm.value)
    else
      this._addRole(this.roleForm.value.name)
  }

  private _updateRole(role: Role) {
    this.roleService.updateRole(role).subscribe(value => console.log(value))
  }

  private _addRole(nameRole: string) {
    this.roleService.addRole(nameRole).subscribe(value => console.log(value))
  }
}
