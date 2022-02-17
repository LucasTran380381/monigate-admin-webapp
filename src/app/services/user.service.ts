import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Role} from '../models/role';
import {User} from '../models/user';
import {UserForManipulation} from '../admin/models/user-for-manipulation';
import {map} from 'rxjs/operators';
import {ResultStatus} from '../models/enums/result-status';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserRoles() {
    return this.http.get<Role[]>(`${environment.apiUrl}/Role`)
  }

  onRegisterUser(userInfo: any) {
    return this.http.post(`${environment.apiUrl}/User/register`, userInfo)
  }

  searchUser(query: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/User/search`, {
      params: {
        search: query,
      },
    })
  }

  updateUser(userInfo: any) {
    return this.http.put(`${environment.apiUrl}/User`, userInfo)
  }

  getUser(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/User/${id}`)
  }

  changeStatus(id: string, statusCode: number) {
    return this.http.put(`${environment.apiUrl}/User/status`, {
      id, statusCode,
    })
  }

  private static _handleResponseMessage(resp: any[], users: UserForManipulation[]) {
    return resp.map(record => {
      const user = users.find(user => user.id == record.id)
      return [user?.id, user?.firstName, user?.lastName, user?.phone, user?.email, user?.departmentId, ResultStatus.toString(record.resultEnum), record.resultMessage]
    })
  }

  importUser(users: UserForManipulation[]) {
    return this.http.post<any>(`${environment.apiUrl}/User/bulk-register`,
      users).pipe(map(resp => UserService._handleResponseMessage(resp, users)))
  }
}
