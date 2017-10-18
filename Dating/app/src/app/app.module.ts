import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { MyApp } from './app.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AboutPage } from '../pages/about/about';

import { SettingPage } from '../pages/setting/setting';
import { ChangePasswordPage } from '../pages/setting/changepassword';
import { FriendPage } from '../pages/friend/friend';

import { MessagesPage } from '../pages/messages/messages';
import { MessageDetailPage } from '../pages/messages/messagedetail';

import { PlanPage } from '../pages/setting/plan';

import { HomePage } from '../pages/home/home';
import { FilterPage } from '../pages/home/filter';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { RegisterPage } from '../pages/login/register';
import { StepPage } from '../pages/login/step';

import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';

import { CustomerPage } from '../pages/customer/customer';
import { CustomerDetailPage } from '../pages/customer/customerdetail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {  CustomersService, PackageService, SocketService,FriendService } from './service/index';
import * as globalVariable from "./global";

const config: SocketIoConfig = { url: globalVariable.url, options: {} };

@NgModule({
  declarations: [
    MyApp,FileSelectDirective,
    AboutPage,
    SettingPage,ChangePasswordPage,PlanPage,
    HomePage,FilterPage,FriendPage,MessagesPage,MessageDetailPage,
    TabsPage,
    LoginPage,ForgetPasswordPage,RegisterPage,StepPage,
    ProfilePage,
    ProfileUpdatePage,CustomerPage, CustomerDetailPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'bottom'}),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingPage,ChangePasswordPage,PlanPage,
    HomePage,FilterPage,FriendPage,MessagesPage,MessageDetailPage,
    TabsPage,CustomerPage, CustomerDetailPage,
    LoginPage,ForgetPasswordPage,RegisterPage,StepPage,
    ProfilePage,
    ProfileUpdatePage
  ],
  providers: [
    StatusBar,
    CustomersService, PackageService, SocketService ,FriendService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
