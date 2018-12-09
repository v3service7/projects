import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../app/services/user.service';

import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PasswordPage } from '../pages/password/password';

import { PanicService } from './services/panic.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private panicService: PanicService,
    private userService: UserService
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MainPage },
      { title: 'My Profile', component: ProfilePage },
      { title: 'Change Password', component: PasswordPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      const token = localStorage.getItem('id_token');
      if(token){
        let user = JSON.parse(localStorage.getItem('user'));
        this.panicService.pendingPanicList(user._id).subscribe((data)=>{
          if (!data.error && data.message.length > 0) {
            this.nav.setRoot(MapPage, {panicID:data.message[0]['_id']});
          }else{
            this.rootPage = MainPage;
          }
        })
      }
      else
        this.rootPage = HomePage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Do you really want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.logout();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }
}
