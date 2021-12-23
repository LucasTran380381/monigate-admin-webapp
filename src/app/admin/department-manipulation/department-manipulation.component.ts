import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../services/department.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-department-manipulation',
  templateUrl: './department-manipulation.component.html',
  styleUrls: ['./department-manipulation.component.scss'],
})
export class DepartmentManipulationComponent implements OnInit {
  departmentForm = new FormGroup({
    'id': new FormControl('', [Validators.required]),
    'name': new FormControl('', Validators.required),
  })
  isAddMode = true;

  constructor(private departmentService: DepartmentService, private dialogRef: MatDialogRef<DepartmentManipulationComponent>) { }

  ngOnInit(): void {
  }

  addDepartment() {
    this.departmentService.addDepartment(this.departmentForm.value).subscribe(
      value => this.dialogRef.close('refresh'),
    )
  }

}
