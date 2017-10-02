import { Component, ViewChild } from '@angular/core';
import { NavController,AlertController,Nav,ViewController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})
export class SettingPage {
   //@ViewChild(Nav) nav: Nav;

	profileRoot = ProfilePage;
   	pages: Array<{icon:string, title: string, component: any}>;
	
	constructor(public nav: Nav,public navCtrl: NavController,public alertCtrl: AlertController,) {
		this.pages = [
      		{ icon:'person',title: 'Profile', component: ProfilePage }
      ];
	}
   	openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      //this.nav.setRoot(page.component);
      this.navCtrl.push(page.component);
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
               //localStorage.removeItem('currentCustomer');
               this.nav.setRoot(LoginPage);
            }
         }
         ]
      });
      prompt.present();
   }

}
