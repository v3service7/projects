import { Component } from '@angular/core';
import { ToastController, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { SettingPage } from './setting';

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
			console.log("this.currentCustomer");
			console.log(this.currentCustomer);
			this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
		}
	}

	ionViewDidLoad() {
  	}

    private changePass(){
    	if (this.currentCustomer['password'] == this.resetForm.value['oldpassword']) {
    		var obj = {};
    		obj['_id'] = this.currentCustomer['_id'];
    		obj['password'] = this.resetForm.value['newpassword'];
	        this.customerService.updateCustomer(obj).subscribe(
            (data) => {
            	if (!data.error) {
	            	this.getToast('Password Updated');
	            	this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(cust=>{
	            		console.log("cust.message");
	            		console.log(cust.message);
	            		localStorage.removeItem('currentCustomer');
	            		localStorage.setItem('currentCustomer', JSON.stringify(cust.message));

	            		this.navCtrl.pop(SettingPage);
	            	});
            	}else{
            		this.getToast('Something went Wrong');
            	}
            });
    	}else{
    		this.getToast('Incorrect Current Password');
    		this.resetForm.reset();
    		this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
    	}
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
