import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style';
import {WorkSheet} from 'xlsx-js-style';

// import * as test from 'xlsx-js-style'

@Injectable({
  providedIn: 'root',
})
export class ExcelService {

  private _fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private _fileExtension = '.xlsx';

  constructor() { }

  public exportExcel(data: [any][any], fileName: string, headers?: string[]): void {
    // const wb = XLSX.utils.book_new();
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData, {skipHeader: true,});
    const ws = XLSX.utils.aoa_to_sheet(data)
    if (headers)
      this._formatHeader(ws, headers)
    //   ws["A1"].s = {
    //     font: {
    //       name: 'Times New Roman',
    //       sz: 16,
    //       color: {rgb: "#FF000000"},
    //       bold: true,
    //     },
    // }

    const wb: XLSX.WorkBook = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    this._saveFile(excelBuffer, fileName);
  }

  private _saveFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this._fileType});
    FileSaver.saveAs(data, fileName + this._fileExtension);
  }

  private _formatHeader(ws: WorkSheet, headers: string[]) {
    headers.forEach(value => ws[value].s = {
      font: {
        sz: 16,
        bold: true,
      },
    })
  }
}
