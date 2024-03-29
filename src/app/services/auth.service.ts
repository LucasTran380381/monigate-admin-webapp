import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Account} from '../models/account';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser?: User
  token?: string

  constructor(private router: Router, private http: HttpClient) {
    const jsonUser = localStorage.getItem("currentUser");
    this.token = localStorage.getItem('token') ?? undefined

    if (jsonUser) {this.currentUser = JSON.parse(jsonUser)}

  }

  onLogin(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/Account/login`, {
      username, password,
    }).pipe(map(value => {
      const user = value.user as User
      user.account = new Account(value.username, value.roleName)
      this.currentUser = user
      this.token = value.token
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('token', value.token)
      return user
    }))
    // if (username === 'admin' && password === '123') {
    //   const user = new User('ad1', "Nhan", "Tran", "", 1, "0908380381", "nhantse140983@fpt.edu.vn", "admin")
    //   localStorage.setItem("currentUser", JSON.stringify(user))
    //   this.currentUser = user;
    //   return user
    // }
  }

  onLogout() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigate(['login']).then()
  }
}
