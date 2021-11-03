import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {User} from '../../../models/user';
import {MatDialog} from '@angular/material/dialog';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private title: Title, private dialog: MatDialog) {
    this.title.setTitle('Admin dashboard')
  }

  ngOnInit(): void {
  }

  onQuery() {

  }

  onOpenDialog(user?: User) {
    this.dialog.open(EditUserComponent, {
      width: '800px',
      data: user,
      disableClose: true,
    })
  }
}
