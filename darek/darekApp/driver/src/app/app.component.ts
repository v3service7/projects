import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrderPage } from '../pages/order/order';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
/*import { LocationPage } from '../pages/location/location';*/
import { RestaurantsPage } from '../pages/restaurants/restaurants';

import { LocationService } from '../services/location.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any; 
  pages: Array<{title: string, component: any}>;
  constructor(
    public platform: Platform,
    public events: Events,
    public locationTracker: LocationService,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
    ) {
      
      this.events.subscribe('user:created', () => {
        this.locationTracker.startTracking();
      });
      this.initializeApp();
      this.pages = [
        { title: 'Profile', component: ProfilePage },
        { title: 'Orders', component: OrderPage },
        { title: 'Restaurants', component: RestaurantsPage }
      ];
    }

  initializeApp() {
    this.platform.ready().then(() => {
      if(localStorage.getItem('driver')){
        this.rootPage = OrderPage;
        this.events.publish('user:created');
      }else{
        this.rootPage = LoginPage;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
  doLogout() {
    let prompt = this.alertCtrl.create({
      title: 'Logout',
      message: "Are you sure ?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'oK',
          handler: data => {
            localStorage.removeItem('driver');
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    prompt.present();
  }
  

}
