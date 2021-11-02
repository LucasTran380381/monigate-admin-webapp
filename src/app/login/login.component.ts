import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  async onLogin() {
    const isRouted = await this.router.navigate(['dashboard'])
    if (isRouted) {
      this.snackbar.open("Login Successfully", "", {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top"
      })
    }
  }
}
