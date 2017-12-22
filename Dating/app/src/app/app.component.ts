import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/login/register';
import { LoginPage } from '../pages/login/login';
import { StepPage } from '../pages/login/step';
import { FilterPage } from '../pages/home/filter';
import { SettingPage } from '../pages/setting/setting';
import { ProfilePage } from '../pages/profile/profile';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { CustomerDetailPage } from '../pages/customer/customerdetail';
import { MessagesPage } from '../pages/messages/messages';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar,
        private diagnostic: Diagnostic, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
       
        let requestCameraCallback = (isAvailable) => { if(!isAvailable){this.diagnostic.requestCameraAuthorization();} };
          let requestMicrophoneaCallback = (isAvailable) => { if(!isAvailable){this.diagnostic.requestMicrophoneAuthorization();} };
          let errorCallback = (e) => console.error(e);
          // Checks camera permissions
          this.diagnostic.isCameraAvailable().then(requestCameraCallback, errorCallback);
          // Checks microphone permissions
          this.diagnostic.isMicrophoneAuthorized().then(requestMicrophoneaCallback,errorCallback);
          if(localStorage.getItem("currentCustomer")){
            this.rootPage = TabsPage;
          }else{
            this.rootPage = LoginPage;
          }
    });
  }
}

