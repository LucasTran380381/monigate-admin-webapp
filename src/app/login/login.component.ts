import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
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

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  async onLogin() {
    console.log(this.loginForm.value);
    if (this.authService.onLogin(this.loginForm.value.username, this.loginForm.value.password)) {
      this.router.navigate(['admin'])
    }
    // const isRouted = await this.router.navigate(['dashboard'])
    // if (isRouted) {
    //   this.snackbar.open("Login Successfully", "", {
    //     duration: 1000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top"
    //   })
    // }
  }
}
