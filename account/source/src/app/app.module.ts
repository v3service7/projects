import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard , OwnerAuthGuard} from './guards/index';

import { AdminService, CustomerService,StaffService} from './service/index';

/*Customer*/
import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer/login/customerlogin.component';
import { AdminHeaderComponent,AdminSidebarComponent } from './header/adminheader.component';

/*Admin*/
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent,AdminForgetPasswordComponent } from './admin/login/adminlogin.component';
import { DashboardComponent,AdminProfileComponent } from './admin/dashboard/dashboard.component';
import { StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent } from './admin/staff/staff.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminLoginComponent,AdminForgetPasswordComponent,
    AdminHeaderComponent,AdminSidebarComponent,
    DashboardComponent,AdminProfileComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    StaffComponent,StaffListComponent,StaffAddComponent,StaffEditComponent,
    CustomerComponent,
    CustomerLoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AdminService, CustomerService, StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
