import { Component } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import { CustomersService } from '../../app/service/customer.service';

import { ChangePasswordPage } from './changepassword';
import { ProfileUpdatePage } from './profileupdate';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	currentCustomer : any;

	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		private customerService: CustomersService,
		) {
		this.getCustomer();
	}

	ionViewDidLoad() {}

	private getCustomer(){
		var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
		this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(cust=>{
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
