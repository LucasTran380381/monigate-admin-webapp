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
  currentDay = Date.now()

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
    switch (role) {
      case 'Admin':
        this.navItems = [
          new NavItem('Quản lí người dùng', '/admin/user-management'),
          new NavItem('Quản lí phòng ban', '/admin/department-management'),
          new NavItem('Quản lí quyền người dùng', '/admin/role-management'),
        ]
        break;
      case 'Technical Moderator':
        this.navItems = [
          new NavItem('Báo cáo kỹ thuật', '/technical/report-management'),
          new NavItem('Thống kê checkin', '/technical/checkin-statistics'),
        ]
        break;
      case 'Department Manager':
        this.navItems = [
          new NavItem('Quản lí nhân viên', '/manager/staff-management'),
        ]
        break;
      case 'Medical Staff':
        this.navItems = [
          new NavItem('Báo cáo bệnh án', '/medical'),
        ]
        break;

    }
    //share nav link
    this.navItems.push(new NavItem('Profile', '/profile'));
  }
}
