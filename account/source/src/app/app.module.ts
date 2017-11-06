import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';

import { MyDirective } from './directive';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard , CustomerAuthGuard} from './guards/index';

import { AdminService, CustomerService, StaffService, BusinessService, PlanService} from './service/index';

/*Customer*/
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent,CustomerForgetPasswordComponent, CustomerRegisterComponent, CustomerResetPasswordComponent } from './customer/login/customerlogin.component';
import { CustomerDashboardComponent, CustomerProfileComponent } from './customer/dashboard/dashboard.component';
import { CustomerHeaderComponent,CustomerSidebarComponent } from './header/customerheader.component';
import { CustomerBusinessComponent, CustomerBusinessListComponent, CustomerBusinessAddComponent, CustomerBusinessDocumentComponent, CustomerBusinessEditComponent } from './customer/business/business.component';

/*Staff*/
import { StaffsComponent } from './staff/staff.component';
import { StaffLoginComponent, StaffForgetPasswordComponent, StaffResetPasswordComponent } from './staff/login/stafflogin.component';
import { StaffDashboardComponent, StaffProfileComponent } from './staff/dashboard/dashboard.component';

/*Admin*/
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent,AdminForgetPasswordComponent, AdminResetPasswordComponent } from './admin/login/adminlogin.component';
import { DashboardComponent,AdminProfileComponent } from './admin/dashboard/dashboard.component';
import { AdminHeaderComponent,AdminSidebarComponent } from './header/adminheader.component';
import { StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent } from './admin/staff/staff.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminBusinessComponent,BusinessListComponent,BusinessViewComponent,BusinessEditComponent } from './admin/business/business.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReCaptchaModule } from 'angular2-recaptcha';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";
import { AccountActiveComponent } from './account-active/account-active.component';


@NgModule({
  declarations: [
       OrderPipe,
       FilterPipe,
    AppComponent,MyDirective,
    AdminComponent,
    AdminLoginComponent,AdminForgetPasswordComponent,AdminResetPasswordComponent,
    AdminHeaderComponent,AdminSidebarComponent,
    DashboardComponent,AdminProfileComponent,
    StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    AdminBusinessComponent,BusinessListComponent,BusinessViewComponent,BusinessEditComponent,
    CustomerComponent,
    CustomerLoginComponent, CustomerRegisterComponent, CustomerForgetPasswordComponent,CustomerResetPasswordComponent,
    CustomerDashboardComponent, CustomerProfileComponent,
    CustomerHeaderComponent,CustomerSidebarComponent,
    CustomerBusinessComponent, CustomerBusinessListComponent, CustomerBusinessAddComponent, CustomerBusinessDocumentComponent, CustomerBusinessEditComponent, AccountActiveComponent,
    StaffsComponent,
    StaffLoginComponent, StaffForgetPasswordComponent,StaffResetPasswordComponent,
    StaffDashboardComponent, StaffProfileComponent,   
  ],
  imports: [
    ReCaptchaModule,
    FileUploadModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FlashMessagesModule,
  ],
  exports: [FileUploadModule],
  providers: [AuthGuard, CustomerAuthGuard, AdminService, CustomerService, StaffService, BusinessService, PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
