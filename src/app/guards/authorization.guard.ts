import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isInvalidRole = this.authService.currentUser?.role !== route.data.role
    if (isInvalidRole) {
      let commands = ['admin']
      switch (this.authService.currentUser?.role) {
        case 'admin':
          commands = ['admin']
          break;
      }
      this.router.navigate(commands).then()
    }

    return !isInvalidRole
  }

}
