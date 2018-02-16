import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TinymceModule } from 'angular2-tinymce';
import { SelectModule } from 'angular2-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';
import { Angular2SocialLoginModule,AuthService } from "angular2-social-login";

// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent,AdminResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent } from './admin/pages/pages.component';

// Frontend Component
import { FrontendComponent } from './frontend/frontend.component';
import { FrontendHeaderComponent } from './frontend/header/frontendheader.component';
import { FrontendHomeComponent, ResetComponent, AccountActiveComponent } from './frontend/home/frontendhome.component';
import { FrontendDashboardComponent, MyProfileComponent } from './frontend/dashboard/frontenddashboard.component'

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {PlanService} from './services/plan.service';
import { PagesService} from './services/pages.service';
import { PurchaseplanService } from './services/purchaseplan.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';
import { Ng2OrderModule } from 'ng2-order-pipe';
import * as globalVariable from "./global";

import { routing } from './app.routes';

let providers = {
    
    "google": {
      "clientId": "214874028334-4t3q11rlobifpmspvrac9dl6i6k6usq2.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "943878335767480",
      "apiVersion": "v2.4"
    }
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent,
    ForgotPasswordComponent,AdminResetPasswordComponent,
    SidebarComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent,
    FrontendComponent,
    FrontendHeaderComponent,
    FrontendHomeComponent,ResetComponent,
    AccountActiveComponent,
    FrontendDashboardComponent,MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TinymceModule.withConfig({}),
    ReactiveFormsModule,
    HttpModule,
    routing,
    FlashMessagesModule,
    FileUploadModule,
    SelectModule,
    Ng2OrderModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService,ValidateService, AdminService, AuthGuard, UserGuard, UserService, PlanService, PagesService, PurchaseplanService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);