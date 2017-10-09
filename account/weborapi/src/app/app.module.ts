import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthService} from './service/index';
import { AuthGuard , OwnerAuthGuard} from './guards/index';

import { HeaderComponent } from './header/header.component';
import { CustomerLoginComponent } from './customer/login/customerlogin.component';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
