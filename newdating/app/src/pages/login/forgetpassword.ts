import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forgetpassword.html',
})
export class ForgetPasswordPage {

	forgetForm: FormGroup;

	constructor(
		public nav: Nav,
		public loadingCtrl: LoadingController,
		public menuCtrl: MenuController,
		private lf: FormBuilder,
		public navCtrl: NavController,
		private viewCtrl: ViewController,
		public toastCtrl: ToastController,
		private customerService: CustomersService,
		public navParams: NavParams
		){
		this.forgetForm = this.lf.group({
			email: ['', Validators.required]
		});
	}

  	importonViewDidLoad() {
  	}
	
	forgetPass(){
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		this.customerService.forgetPassword(this.forgetForm.value).subscribe(
            (data) => {
                if (!data.error) {            	
	                loading.dismiss();
					this.getToast('Email Sent Successfully');
					this.navCtrl.pop(LoginPage);
                }else{
                	loading.dismiss();
                	this.getToast(data.data);
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
