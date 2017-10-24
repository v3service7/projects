import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { UserComponent, UserListComponent, UserAddComponent, UserEditComponent} from './admin/user/user.component';
import { PlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { ExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent } from './admin/exchange/exchange.component';

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { SidebarComponent } from './admin/sidebar/sidebar.component';




const appRoutes: Routes =  [
  {
    path:'admin', component: AdminComponent, children :[ 
        { path: '', component: LoginComponent },     
        { path: 'login', component: LoginComponent },
        { path: 'forgotpassword', component: ForgotPasswordComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
        { path: 'user', component: UserComponent, canActivate: [AuthGuard], children :[
            { path: '', component: UserListComponent, },
            { path: 'add', component: UserAddComponent, },
            { path: ':id', component: UserEditComponent, },
        ]},
        { path: 'plan', component: PlanComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PlanListComponent, },
            { path: 'add', component: PlanAddComponent, },
            { path: ':id', component: PlanEditComponent, },
        ]},
        { path: 'exchange', component: ExchangeComponent, canActivate: [AuthGuard], children :[
            { path: '', component: ExchangeListComponent, },
            { path: 'add', component: ExchangeAddComponent, },
            { path: ':id', component: ExchangeEditComponent, },
        ]},        
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    UserComponent, UserListComponent, UserAddComponent, UserEditComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    PlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    ExchangeComponent, ExchangeListComponent, ExchangeAddComponent, ExchangeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
  ],
  providers: [ValidateService, AdminService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
