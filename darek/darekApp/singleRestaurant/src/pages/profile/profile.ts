import { Component } from '@angular/core';
import { NavController, Nav, LoadingController } from 'ionic-angular';

import { CustomersService } from '../../app/service/customer.service';

import { LoginPage } from '../login/login';

import { ChangePasswordPage } from './changepassword';
import { ProfileUpdatePage } from './profileupdate';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	currentCustomer : any;
	loading: any;

	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private customerService: CustomersService,
		) {
		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
		if (localStorage.getItem('currentCustomer')) {
			this.getCustomer();
		}else{
			this.loading.dismiss();
			this.nav.setRoot(LoginPage);
		}
	}

	ionViewDidLoad() {}

	private getCustomer(){
		var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
		this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(cust=>{
			this.loading.dismiss();
			this.currentCustomer = cust.message;
    	});
	}

	goToChangePassword(){
		this.navCtrl.push(ChangePasswordPage);
	}

 	private goToUpdateProfile(){
 		this.navCtrl.push(ProfileUpdatePage)
 	}
}
