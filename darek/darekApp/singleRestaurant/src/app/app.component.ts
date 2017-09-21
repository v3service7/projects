import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';


@Component({
   templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;

   rootPage: any = LoginPage;
   currentCustomer : any;
   pages: Array<{iconA: string, iconI : string, iconW : string ,title: string, component: any}>;

   constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public alertCtrl: AlertController,
      public splashScreen: SplashScreen
      ) {
      this.initializeApp();

      // used for an example of ngFor and navigation
      this.pages = [
      { iconA : 'home' , iconI : 'ios-home' , iconW : 'md-home' , title: 'Home', component: HomePage },
      { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: ProfilePage },
      { iconA : 'clipboard' , iconI : 'ios-clipboard' , iconW : 'md-clipboard' , title: 'Menu', component: MenuPage }
      ];

      this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer')); 
   }

   logout(){
      let prompt = this.alertCtrl.create({
         title: 'Logout',
         message: "Are you sure ?",
         buttons: [
         {
            text: 'Cancel',
            handler: data => {
               console.log('Cancel clicked');
            }
         },
         {
            text: 'oK',
            handler: data => {
               localStorage.removeItem('currentCustomer');
               this.nav.setRoot(LoginPage);
            }
         }
         ]
      });
      prompt.present();
   }

   initializeApp() {
      this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         this.statusBar.styleDefault();
         this.splashScreen.hide();
      });
   }

   openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
   }
}
