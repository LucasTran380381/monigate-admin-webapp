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
    let isInvalidRole = this.authService.currentUser?.currentAccount.roleName !== route.data.role
    if (isInvalidRole) {
      let commands = ['']
      switch (this.authService.currentUser?.currentAccount.roleName) {
        case 'Admin':
          commands = ['admin']
          break;
        case 'Technical Moderator':
          commands = ['technical']
          break
        case 'Department Manager':
          commands = ['manager']
          break
        case 'Medical Staff':
          commands = ['medical']
      }
      this.router.navigate(commands).then()
    }

    return !isInvalidRole
  }

}
