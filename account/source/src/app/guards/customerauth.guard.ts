import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService} from '../service/index';
@Injectable()
export class CustomerAuthGuard implements CanActivate {

    constructor(private customerService: CustomerService,private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.customerService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/customer/login'], { queryParams: { returnUrl: state.url }});
        return false;
        
    }
}