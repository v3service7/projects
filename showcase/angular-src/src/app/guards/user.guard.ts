import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
