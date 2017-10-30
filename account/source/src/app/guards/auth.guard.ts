import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService} from '../service/index';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private adminService: AdminService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.adminService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}