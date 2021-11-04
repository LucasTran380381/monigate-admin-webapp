import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async onLogin() {
    const formValue = this.loginForm.value;
    try {
      const user = await this.authService.onLogin(formValue.username, formValue.password).toPromise()
      if (user.account.roleName === 'Admin') {
        this.router.navigate(['admin']).then()
      }
    } catch (e) {
      if (e.status === 404)
        this.loginForm.controls.username.setErrors({notFound: true})
    }
  }
}
