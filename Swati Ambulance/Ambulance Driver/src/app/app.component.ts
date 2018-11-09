import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from '../app/services/user.service';
import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PasswordPage } from '../pages/password/password';

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
    private userService: UserService) {
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      const token = localStorage.getItem('id_token');
      if(token)
        this.rootPage = MainPage;
      else
        this.rootPage = HomePage;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.userService.logout();
    this.nav.setRoot(HomePage);
  }
}
