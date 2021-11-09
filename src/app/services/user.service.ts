import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Role} from '../models/role';
import {User} from '../models/user';

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
    return this.http.get<User[]>(`${environment.apiUrl}/User/filter`, {
      params: {
        search: query,
      },
    })
  }

}
