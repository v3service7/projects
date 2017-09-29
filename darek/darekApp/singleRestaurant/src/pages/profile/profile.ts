import { Component } from '@angular/core';
import { NavController, Nav, LoadingController } from 'ionic-angular';
import * as globalVariable from "../../app/global";

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
	restaurant : any = {};
	loading: any;
	imageURL: string = globalVariable.imageUrl;

	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private customerService: CustomersService,
		) {
		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.restaurant = JSON.parse(localStorage.getItem('restaurant')); 
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

			console.log("this.currentCustomer");
			console.log(this.currentCustomer);
    	});
	}

    private restroImage(img){
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    }

	goToChangePassword(){
		this.navCtrl.push(ChangePasswordPage);
	}

 	private goToUpdateProfile(){
 		this.navCtrl.push(ProfileUpdatePage)
 	}

 	private customerImage(img){
    	if (typeof img != 'undefined' && img != null) {
            var imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            var imgPath = "../assets/img/profile.png";
        }
        return imgPath;
    }
}
