import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	signUpForm: FormGroup;

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
		this.signUpForm = this.lf.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			phonenumber: ['', Validators.required],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

  	importonViewDidLoad() {
  	}

	private register(){
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
        this.customerService.addCustomer(this.signUpForm.value).subscribe(
            (data) => {
            	if (!data.error) {
	            	console.log("data");
	            	console.log(data);
	            	loading.dismiss();
					this.getToast('Registered Successfully');
					this.navCtrl.pop(LoginPage);
            	}else{
            		loading.dismiss();
					this.getToast('Email/Username Already Exist');
            	}
            }
        );
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
