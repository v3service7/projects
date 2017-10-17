import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent,HeaderownerComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './directives/index';

import { AlertService, AuthService, UsersService,DriversService,RestaurantsService, PromotionsService} from './service/index';
import { AuthGuard , OwnerAuthGuard} from './guards/index';
import { DashboardComponent,DashboardprofileComponent } from './dashboard/dashboard.component';
import { UsersComponent, UsersupdateComponent, UsersaddComponent, AdminComponent, AdminaddComponent, AdminupdateComponent} from './users/index';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";

import { RestaurantsComponent , RestaurantaddComponent , RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent, RestaurantconfirmationComponent,OwnermailactivateComponent} from './restaurants/index';
import { DriversComponent,DriveraddComponent, DriverupdateComponent} from './drivers/index';
import { PromotionsComponent, PromotionaddComponent, PromotionupdateComponent } from './promotions/promotions.component';
import { ForgetComponent,ResetPasswordAdminComponent } from './login/forgetPassword.component';
import { OwnerComponent,OwnerloginComponent,OwnerregisterComponent,OwnerprofileComponent,OwnerchangepasswordComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent } from './owner/owner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HeaderownerComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,DashboardprofileComponent,
    UsersComponent,UsersupdateComponent,UsersaddComponent,AdminComponent,AdminaddComponent,AdminupdateComponent,
    OrderPipe,
    FilterPipe,
    DriversComponent,
    DriveraddComponent,
    DriverupdateComponent,
    RestaurantsComponent,RestaurantaddComponent,RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent,RestaurantconfirmationComponent,
    PromotionsComponent,
    PromotionaddComponent,
    PromotionupdateComponent,
    ForgetComponent,ResetPasswordAdminComponent,
    OwnerComponent,OwnerloginComponent,OwnerprofileComponent,OwnerregisterComponent,OwnerchangepasswordComponent,OwnermailactivateComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FlashMessagesModule,
  ],
  providers: [AuthGuard,OwnerAuthGuard,AlertService,UsersService,AuthService,DriversService,RestaurantsService,PromotionsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
