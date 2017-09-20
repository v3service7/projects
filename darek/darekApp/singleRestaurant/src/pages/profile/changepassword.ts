import { Component } from '@angular/core';
import { ToastController, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-change-password',
  templateUrl: 'changepassword.html',
})
export class ChangePasswordPage {

	resetForm: FormGroup;

	currentCustomer : any;

	constructor(
		private lf: FormBuilder,
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		private customerService: CustomersService
		){
		this.resetForm = this.lf.group({
			_id: ['', Validators.required],
            oldpassword: ['', Validators.required], 
			newpassword: ['', Validators.required],
		});

		if (localStorage.getItem('currentCustomer')) {
			this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
			this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
		}
	}

	ionViewDidLoad() {
  	}

    private changePass(){
        this.customerService.changePassword(this.resetForm.value).subscribe(
            (data) => {
            	if (!data.error) {
	            	this.getToast(data.message);
	            	this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(cust=>{
	            		localStorage.removeItem('currentCustomer');
	            		localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
	            		this.navCtrl.pop(ProfilePage);
	            	});
            	}else{
            		this.getToast(data.message);
            	}
            });
    }

	private getToast(msg){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position:'top' //top,middle,bottom
		});
		toast.present();
	}

}
