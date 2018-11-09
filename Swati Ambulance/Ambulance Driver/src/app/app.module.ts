import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { PasswordPage } from '../pages/password/password';
import { UserService } from './services/user.service';
import { PanicService } from './services/panic.service';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBj0cN1BNqUhcIn3As1kmTwcF2sxr1lzms",
  authDomain: "ambulance-64e45.firebaseapp.com",
  databaseURL: "https://ambulance-64e45.firebaseio.com",
  projectId: "ambulance-64e45",
  storageBucket: "ambulance-64e45.appspot.com",
  messagingSenderId: "525296035743"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    ForgotPage,
    MainPage,
    ProfilePage,
    PasswordPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    ForgotPage,
    MainPage,
    ProfilePage,
    PasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PanicService,
    UserService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
