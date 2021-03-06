﻿import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent,AdminForgetPasswordComponent, AdminResetPasswordComponent } from './admin/login/adminlogin.component';
import { DashboardComponent,AdminProfileComponent } from './admin/dashboard/dashboard.component';
import { StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent } from './admin/staff/staff.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminBusinessComponent,BusinessListComponent,BusinessViewComponent,BusinessEditComponent } from './admin/business/business.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent, CustomerAccountVerifyComponent, CustomerRegisterComponent, CustomerOtpComponent, CustomerForgetPasswordComponent, CustomerResetPasswordComponent } from './customer/login/customerlogin.component';
import { CustomerDashboardComponent, CustomerProfileComponent } from './customer/dashboard/dashboard.component';
import { AccountActiveComponent } from './account-active/account-active.component';
import { CustomerBusinessComponent, CustomerBusinessAddComponent, CustomerBusinessDocumentComponent, CustomerBusinessEditComponent,CustomerBusinessListComponent } from './customer/business/business.component';

/*import { StaffsComponent } from './staff/staff.component';
import { StaffLoginComponent, StaffForgetPasswordComponent, StaffResetPasswordComponent } from './staff/login/stafflogin.component';
import { StaffDashboardComponent, StaffProfileComponent } from './staff/dashboard/dashboard.component';*/


import { AuthGuard , CustomerAuthGuard} from './guards/index';

const appRoutes: Routes = [
  	{ path: 'admin', component: AdminComponent, children :[
    	{ path: '', component: AdminLoginComponent },
        { path: 'login', component: AdminLoginComponent },
        { path: 'forget-password', component: AdminForgetPasswordComponent },
        { path: 'reset-password/:id', component: AdminResetPasswordComponent },
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
        { path: 'plan', component: AdminPlanComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PlanListComponent, },
            { path: 'add', component: PlanAddComponent, },
            { path: ':id', component: PlanEditComponent, },
        ]},
    	{ path: 'business', component: AdminBusinessComponent, canActivate: [AuthGuard], children :[
            { path: ':id', component: BusinessListComponent, },
            { path: 'view/:id', component: BusinessViewComponent, },
            { path: 'edit/:id', component: BusinessEditComponent, },
        ]},
    ]},
       
  	{ path: 'customer', component: CustomerComponent, children :[
        { path: '', component: CustomerLoginComponent },
        { path: 'login', component: CustomerLoginComponent },
        { path: 'register', component: CustomerRegisterComponent },
        { path: 'otp/:id', component: CustomerOtpComponent },
        { path: 'forget-password', component: CustomerForgetPasswordComponent },
        { path: 'reset-password/:id', component: CustomerResetPasswordComponent },
        { path: 'account-verify', component: CustomerAccountVerifyComponent, canActivate: [CustomerAuthGuard] },
        { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [CustomerAuthGuard] },
        { path: 'profile', component: CustomerProfileComponent, canActivate: [CustomerAuthGuard] },
        { path: 'business', component: CustomerBusinessComponent, canActivate: [CustomerAuthGuard], children :[
            { path: '', component: CustomerBusinessListComponent, },
            { path: 'add', component: CustomerBusinessAddComponent, },
            { path: 'document-update', component: CustomerBusinessDocumentComponent, },
            { path: ':id', component: CustomerBusinessEditComponent, },
        ]},
    ]},

    /*{ path: 'staff', component: StaffsComponent, children :[
    	{ path: '', component: StaffLoginComponent },
        { path: 'login', component: StaffLoginComponent },
        { path: 'forget-password', component: StaffForgetPasswordComponent },
    	{ path: 'reset-password/:id', component: StaffResetPasswordComponent },
        { path: 'dashboard', component: StaffDashboardComponent},
        { path: 'profile', component: StaffProfileComponent}
   	]},*/
  	{ path: '', component: CustomerLoginComponent },
  	{ path: 'account-active/:token', component: AccountActiveComponent },
  	{ path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
