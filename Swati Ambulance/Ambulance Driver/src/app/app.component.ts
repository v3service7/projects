import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from '../app/services/user.service';
import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PasswordPage } from '../pages/password/password';


declare var FCMPlugin : any;


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
    public events: Events,
    private userService: UserService) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: MainPage },
      { title: 'My Profile', component: ProfilePage },
      { title: 'Change Password', component: PasswordPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      const token = localStorage.getItem('id_token');
      if(token)
        this.rootPage = MainPage;
      else
        this.rootPage = HomePage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();




      var that = this;

      if (typeof FCMPlugin != 'undefined') {
        FCMPlugin.onNotification(function(data){
          /*alert(JSON.stringify(data));*/
          if(data.wasTapped){
            that.nav.setRoot(MainPage);
          }else{
            console.log("data");
            console.log(data);
            that.events.publish('notiTapped:false', data , Date.now());

            /*let confirmAlert = that.alertCtrl.create({
              title: 'Patient Notification',
              message: data.message,
              buttons: [{
                text: 'Cancel',
                role: 'cancel'
              }, {
                text: 'Accept',
                handler: () => {
                  that.nav.setRoot(MainPage);
                }
              }]
            });
            confirmAlert.present();*/
          }
        },(msg)=>{
          console.log('onNotification callback successfully registered: ' + msg);
        },(err)=>{
          console.log('Error registering onNotification callback: ' + err);
        });
        
        FCMPlugin.onTokenRefresh(function(token){
            console.log("token => ", token)
        });
      }







    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
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
