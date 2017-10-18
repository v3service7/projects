import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { TinymceModule } from 'angular2-tinymce';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { HeaderComponent,CustomerHeaderComponent,CustomerFooterComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent,UserRegistrationComponent } from './login/login.component';
import { AlertComponent } from './directives/index';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AlertService, CountryService, AuthService, UsersService,CustomerService,PageService, BannerService, PackageService, PromotionService,FriendService,ChatService, SocketService } from './service/index';
import { AuthGuard,CustomerAuthGuard } from './guards/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent, UsersupdateComponent, UsersaddComponent} from './users/index';

import {OrderPipe} from "./order.pipe";
import {SafePipe} from "./iframe.pipe";
import {FilterPipe} from "./filter.pipe";
import { PageComponent,PagelistComponent,PageaddComponent,PageupdateComponent } from './page/page.component';
import { CountryComponent,CountrylistComponent,CountryaddComponent,CountryupdateComponent } from './country/country.component';
import { PromotionComponent,PromotionlistComponent,PromotionaddComponent,PromotionupdateComponent } from './promotion/promotion.component';
import { BannerComponent,BannerlistComponent,BanneraddComponent,BannerupdateComponent } from './banner/banner.component';
import { BannerTimeComponent,BannerlistTimeComponent,BanneraddTimeComponent,BannerupdateTimeComponent, BanneraddTimeImageComponent} from './bannersetting/banner.component'
import { PackageComponent,PackagelistComponent,PackageaddComponent,PackageupdateComponent } from './package/package.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { CustomerComponent,CustomerlistComponent,CustomeraddComponent,CustomerupdateComponent,AdminShowBlockedUserComponent,AdminViewAbuseReportComponent } from './customer/customer.component';
import { AdminLoginComponent,AdminRegistrationComponent, AdminResetPasswordComponent } from './admin-login/admin-login.component';
import { ProfileComponent,AdminChangePasswordComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { FrontendComponent,FrontendLiveButtonComponent,FrontenddashboardComponent,FrontendProfileComponent, FrontendPageComponent, FrontendProfileSummaryComponent,FrontendCustomerAccountComponent,FrontendCustomerViewsComponent,FrontendPublicProfileComponent,FrontendAllProfileComponent,FrontendFriendComponent,FrontendCustomerMessageComponent,FrontendVideoCallComponent, FrontendLiveNowComponent, FrontendLiveNowListComponent, CustomermailactivateComponent,CustomerResetPasswordComponent,FrontendContactUsComponent,FrontendReportComponent,FrontendSpeedDatingComponent , FrontenNotificationsComponent} from './frontend/frontend.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import * as globalVariable from "./global";

const config: SocketIoConfig = { url: globalVariable.url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HeaderComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    HomeComponent,
    LoginComponent,
    UserRegistrationComponent,
    AlertComponent,
    DashboardComponent,
    UsersComponent,
    UsersupdateComponent,
    UsersaddComponent,
    OrderPipe,
    SafePipe,
    FilterPipe,
    PageComponent,
    PagelistComponent,
    PageaddComponent,
    PageupdateComponent,
    PromotionComponent,
    PromotionlistComponent,
    PromotionaddComponent,
    PromotionupdateComponent,
    BannerComponent,
    BannerlistComponent,
    BanneraddComponent,
    BannerupdateComponent,
    PackageComponent,
    PackagelistComponent,
    PackageaddComponent,
    PackageupdateComponent,
    AdminSettingComponent,
    CustomerComponent,
    CustomerlistComponent,
    CustomeraddComponent,
    CustomerupdateComponent,
    AdminLoginComponent,
    AdminRegistrationComponent,
    ProfileComponent,
    FrontendComponent,
    FrontenddashboardComponent,
    FrontendProfileComponent,
    FrontendProfileSummaryComponent,
    ConfirmationDialogComponent,
    FrontendPageComponent,
    FrontendCustomerAccountComponent,
    FrontendCustomerViewsComponent,    
    FrontendPublicProfileComponent,
    FrontendAllProfileComponent,
    FrontendFriendComponent,
    FrontendCustomerMessageComponent,
    ChatComponent,
    FrontendVideoCallComponent,
    FrontendLiveNowComponent,
    FrontendLiveNowListComponent,
    CustomermailactivateComponent,
    CustomerResetPasswordComponent,
    AdminResetPasswordComponent,
    AdminChangePasswordComponent,
    AdminShowBlockedUserComponent,
    FrontendContactUsComponent,
    FrontendReportComponent,
    AdminViewAbuseReportComponent,
    BannerTimeComponent,
    BannerlistTimeComponent,
    BanneraddTimeComponent,
    BannerupdateTimeComponent,
    BanneraddTimeImageComponent,
    CountryComponent,
    CountrylistComponent,
    CountryaddComponent,
    CountryupdateComponent ,
    FrontendLiveButtonComponent,
    FrontendSpeedDatingComponent,
    FrontenNotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    ReCaptchaModule,
    TinymceModule.withConfig({'auto_focus':false,}),
    SocketIoModule.forRoot(config)
  ],
  providers: [AuthGuard,CustomerAuthGuard, CustomerService ,AlertService, AuthService, UsersService, PageService, BannerService, PackageService, PromotionService,FriendService, ChatService, SocketService,CountryService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})

export class AppModule { }
