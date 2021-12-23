import {Component, Inject, OnInit} from '@angular/core';
import * as XLSX from 'xlsx'
import {WorkSheet} from 'xlsx'
import {Department} from '../../models/department';
import {DepartmentStatus} from '../../models/enums/department-status';
import {DepartmentService} from '../../services/department.service';
import {ExcelService} from '../../services/excel.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-import-department',
  templateUrl: './import-department.component.html',
  styleUrls: ['./import-department.component.scss'],
})
export class ImportDepartmentComponent implements OnInit {
  departments: Department[] = []
  fileName?: string

  constructor(private departmentService: DepartmentService,
              private dialogRef: MatDialogRef<ImportDepartmentComponent>,
              private excelService: ExcelService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  addAttachment($event: any) {
    const file = $event.target.files[0]
    this.fileName = file.name
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      const binaryData = fileReader.result
      const wb = XLSX.read(binaryData, {type: 'binary'})

      const fistSheetName = wb.SheetNames[0]
      const ws: WorkSheet = wb.Sheets[fistSheetName]

      const header = ['Mã phòng ban', 'Tên phòng ban'];

      this.departments = XLSX.utils.sheet_to_json(ws)
        .map((value: any) => new Department(value[header[0]], value[header[1]], DepartmentStatus.active))
    }
  }

  openFileExplorer() {
    document.getElementById('file-input')?.click()
  }

  importDepartments() {
    if (!this.departments.length)
      return
    this.departmentService.addDepartments(this.departments).subscribe(value => {
      const header = ['Mã phòng ban', 'Tên phòng ban', 'Trạng thái', 'Ghi chú thông tin']
      value.unshift(header)
      this.excelService.exportExcel(value, 'kết quả');
      this.dialogRef.close('refresh')
    })
  }
}
