import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {

  constructor(public title: Title, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.onLogout()
  }
}
