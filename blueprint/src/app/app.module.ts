import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule, Nav, Platform, NavController,ViewController,AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { RegisterPage } from '../pages/login/register';

import { HomePage } from '../pages/home/home';

import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { ChangePasswordPage } from '../pages/profile/changepassword';

/*Services*/
import {  CustomersService } from './service/index';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfilePage,
    ProfileUpdatePage,
    ChangePasswordPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfilePage,
    ProfileUpdatePage,
    ChangePasswordPage
  ],
  providers: [
    CustomersService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
