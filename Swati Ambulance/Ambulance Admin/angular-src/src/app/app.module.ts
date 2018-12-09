import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { TinymceModule } from 'angular2-tinymce';
import { SelectModule } from 'angular2-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {FlashMessagesModule} from 'angular2-flash-messages';


// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent,  ResetComponent} from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent, ResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AdminUserComponent, UserListComponent, UserAddComponent, UserEditComponent, UserChangepssditComponent } from './admin/user/user.component';
// tslint:disable-next-line:max-line-length
import { AdminProviderComponent, ProviderListComponent, ProviderAddComponent, ProviderEditComponent } from './admin/provider/provider.component';
import { AdminDriverComponent, DriverListComponent, DriverAddComponent, DriverEditComponent } from './admin/driver/driver.component';
// tslint:disable-next-line:max-line-length
import { AdminAmbulanceComponent, AmbulanceListComponent, AmbulanceAddComponent, AmbulanceEditComponent } from './admin/ambulance/ambulance.component';
import { AdminPanicComponent, PanicListComponent } from './admin/panic/panic.component';
import {ValidateService} from './services/validate.service';

import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {AmbulanceService} from './services/ambulance.service';
import {PanicService} from './services/panic.service';
import {AuthGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';

import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';


import * as globalVariable from './global';

const appRoutes: Routes =  [
    {
    path: 'admin', component: AdminComponent, children : [
        { path: '', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'reset', component: ResetComponent },
        { path: 'forgotpassword', component: ForgotPasswordComponent },
        { path: 'resetpassword/:id', component: ResetPasswordComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
        { path: 'user', component: AdminUserComponent, canActivate: [AuthGuard], children : [
            { path: '', component: UserListComponent, },
            { path: 'add', component: UserAddComponent, },
            { path: ':id', component: UserEditComponent, },
            { path: 'changepassword/:id/:username', component: UserChangepssditComponent, }, 
        ]},
        { path: 'provider', component: AdminProviderComponent, canActivate: [AuthGuard], children : [
            { path: '', component: ProviderListComponent, },
            { path: 'add', component: ProviderAddComponent, },
            { path: ':id', component: ProviderEditComponent, },
        ]},
        { path: 'driver', component: AdminDriverComponent, canActivate: [AuthGuard], children : [
            { path: '', component: DriverListComponent, },
            { path: 'add', component: DriverAddComponent, },
            { path: ':id', component: DriverEditComponent, },
        ]},
        { path: 'ambulance', component: AdminAmbulanceComponent, canActivate: [AuthGuard], children : [
            { path: '', component: AmbulanceListComponent, },
            { path: 'add', component: AmbulanceAddComponent, },
            { path: ':id', component: AmbulanceEditComponent, },
        ]},
        { path: 'panic', component: AdminPanicComponent, canActivate: [AuthGuard], children : [
            { path: '', component: PanicListComponent, },
        ]}
    ]},
    {path: 'reset', component: ResetComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent, ResetComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    AdminUserComponent, UserListComponent, UserAddComponent, UserEditComponent, UserChangepssditComponent, 
    AdminProviderComponent, ProviderListComponent, ProviderAddComponent, ProviderEditComponent,
    AdminDriverComponent, DriverListComponent, DriverAddComponent, DriverEditComponent,
    AdminAmbulanceComponent, AmbulanceListComponent, AmbulanceAddComponent, AmbulanceEditComponent,
    AdminPanicComponent, PanicListComponent,
    ForgotPasswordComponent, ResetPasswordComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TinymceModule.withConfig({}),
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    SelectModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FileUploadModule
  ],
  /*exports: [FileUploadModule],*/
  providers: [ValidateService, AdminService, AuthGuard, UserGuard, UserService, AmbulanceService, PanicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
