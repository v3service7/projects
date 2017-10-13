import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent,AdminForgetPasswordComponent } from './admin/login/adminlogin.component';
import { DashboardComponent,AdminProfileComponent } from './admin/dashboard/dashboard.component';
import { StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent } from './admin/staff/staff.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer/login/customerlogin.component';

import { AuthGuard , OwnerAuthGuard} from './guards/index';

const appRoutes: Routes = [
  	{ path: 'admin', component: AdminComponent, children :[
    	{ path: '', component: AdminLoginComponent },
        { path: 'login', component: AdminLoginComponent },
        { path: 'forget-password', component: AdminForgetPasswordComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: AdminProfileComponent, canActivate: [AuthGuard] },
        { path: 'staff', component: StaffComponent, canActivate: [AuthGuard], children :[
            { path: '', component: StaffListComponent, },
            { path: 'add', component: StaffAddComponent, },
            { path: ':id', component: StaffEditComponent, },
        ]},
    	{ path: 'customer', component: AdminCustomerComponent, canActivate: [AuthGuard], children :[
            { path: '', component: CustomerListComponent, },
            { path: 'add', component: CustomerAddComponent, },
            { path: ':id', component: CustomerEditComponent, },
        ]},
   	]},
  	{ path: 'customer', component: CustomerComponent, children :[
    	{ path: '', component: CustomerLoginComponent },
    	{ path: 'login', component: CustomerLoginComponent }
   	]},
  	{ path: '', component: CustomerLoginComponent },
  	{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
