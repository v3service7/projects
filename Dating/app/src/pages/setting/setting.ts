import { Component, ViewChild } from '@angular/core';
import { NavController,AlertController,Nav,ViewController } from 'ionic-angular';

import { ChangePasswordPage } from './changepassword';
import { PlanPage } from './plan';
import { LoginPage } from '../login/login';
import { SocketService } from '../../app/service/socket.service';

@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html'
})
export class SettingPage {
   //@ViewChild(Nav) nav: Nav;
   pages: Array<{icon:string, title: string, component: any}>;
	
	constructor(public socketService: SocketService,public nav: Nav,public navCtrl: NavController,public alertCtrl: AlertController,) {
		this.pages = [
            { icon:'person', title: 'Change Password', component: ChangePasswordPage },
            { icon:'person', title: 'My Plan', component: PlanPage },
            /*{ icon:'person', title: 'My Account', component: ProfilePage },*/
      ];
	}

	openPage(page) {
      this.navCtrl.push(page.component);
	}
	logout() {

    	this.socketService.customerOffline();
    	this.nav.setRoot(LoginPage);
      	console.log('sdfjhbsdjh')
	}

}
