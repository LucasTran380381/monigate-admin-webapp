import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Department} from '../models/department';
import {map} from 'rxjs/operators';
import {DepartmentStatus} from '../models/enums/department-status';
import {ResultStatus} from '../models/enums/result-status';
import {DepartmentForManipulation} from '../admin/models/department-for-manipulation';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments(status: DepartmentStatus) {
    return this.http.get<Department[]>(`${environment.apiUrl}/Department`).pipe(map(resp => {
      if (status != DepartmentStatus.all) return resp.filter(department => department.status == status)
      else return resp
    }))
  }

  addDepartments(departments: Department[]) {
    const departmentsForManipulation = departments.map(department => ({id: department.id, name: department.name}))

    return this.http.post(`${environment.apiUrl}/Department/bulk`, departmentsForManipulation)
      .pipe(map((resp: any) => {
        return resp.map((record: any) => {
          const department = departments.find(department => department.id == record.id)
          const status = ResultStatus.toString(record.resultEnum)
          const message = ResultStatus.toMessage(record.resultMessage)
          return [department?.id, department?.name, status, message];
        })
      }));
  }

  addDepartment(department: DepartmentForManipulation) {
    return this.http.post<any>(`${environment.apiUrl}/Department`, department)
  }
}
