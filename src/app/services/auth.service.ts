import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser?: User

  constructor(private router: Router) {
    const jsonUser = localStorage.getItem("currentUser");

    if (jsonUser) {this.currentUser = JSON.parse(jsonUser)}

  }

  onLogin(username: string, password: string): User | null {
    if (username === 'admin' && password === '123') {
      const user = new User('ad1', "Nhan", "Tran", "", 1, "0908380381", "nhantse140983@fpt.edu.vn", "admin")
      localStorage.setItem("currentUser", JSON.stringify(user))
      this.currentUser = user;
      return user
    }
    return null;
  }

  onLogout() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser')
    this.router.navigate(['login']).then()
  }
}
