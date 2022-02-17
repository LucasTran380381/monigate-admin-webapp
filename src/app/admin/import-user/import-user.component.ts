import {Component, Inject, OnInit} from '@angular/core';
import * as XLSX from 'xlsx'
import {WorkSheet} from 'xlsx'
import {ExcelService} from '../../services/excel.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserForManipulation} from '../models/user-for-manipulation';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/role';

@Component({
  selector: 'app-import-department',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.scss'],
})
export class ImportUserComponent implements OnInit {
  users: UserForManipulation[] = []
  fileName?: string
  roles: Role[] = []

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<ImportUserComponent>,
              private excelService: ExcelService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  addAttachment($event: any) {
    const file = $event.target.files[0]
    this.fileName = file.name
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onload = (_) => {
      const binaryData = fileReader.result
      const wb = XLSX.read(binaryData, {type: 'binary'})

      const fistSheetName = wb.SheetNames[0]
      const ws: WorkSheet = wb.Sheets[fistSheetName]

      const header = ['Mã nhân viên', 'Họ', 'Tên', 'Số điện thoại', 'Email', 'Mã phòng ban', 'Quyền người dùng'];

      this.users = XLSX.utils.sheet_to_json(ws)
        .map((record: any) => {
          const id = record[header[0]]
          const firstName = record[header[2]]
          const lastName = record[header[1]]
          const phone = record[header[3]]
          const email = record[header[4]]
          const departmentId = record[header[5]]
          return new UserForManipulation(id, firstName, lastName, phone, email, departmentId)
        })
      console.log(this.users)
    }
  }

  openFileExplorer() {
    document.getElementById('file-input')?.click()
  }

  importUsers() {
    if (!this.users.length)
      return
    this.userService.importUser(this.users).subscribe(value => {
      const header = ['Mã nhân viên', 'Họ', 'Tên', 'Số điện thoại', 'Email', 'Mã phòng ban', 'Trạng thái', 'Thông báo']
      const headerRef = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
      value.unshift(header)
      this.excelService.exportExcel(value, 'kết quả', headerRef);
      this.dialogRef.close('refresh')
    })
  }
}
