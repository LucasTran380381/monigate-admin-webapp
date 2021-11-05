import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllRole() {
    return this.http.get<Role[]>(`${environment.apiUrl}/Role`)
  }

  onRegisterUser(userInfo: any) {
    return this.http.post(`${environment.apiUrl}/User/register`, userInfo)
  }
}
