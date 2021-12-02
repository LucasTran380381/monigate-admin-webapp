import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthService} from '../../services/auth.service';
import {NavItem} from '../../models/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  navItems: NavItem[] = []

  constructor(public title: Title, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setupNavLinks()
  }

  onLogout() {
    this.authService.logout()
  }

  setupNavLinks() {
    const role = this.authService.currentUser?.account.roleName;
    console.log(role)
    switch (role) {
      case 'Admin':
        this.navItems = [
          new NavItem('Quản lí người dùng', '/admin/user-management'),
        ]
        break;
      case 'Technical Moderator':
        this.navItems = [
          new NavItem('Báo cáo kỹ thuật', '/technical/report-management'),
          new NavItem('Thống kê checkin', '/technical/checkin-statistics'),
        ]
        break;
    }
    //share nav link
    this.navItems.push(new NavItem('Profile', '/profile'));
  }
}
