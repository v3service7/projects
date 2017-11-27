import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { ProfilePage } from './profile';

@Component({
  selector: 'page-profile-update',
  templateUrl: 'profileupdate.html',
})
export class ProfileUpdatePage {

	currentCustomer : any;

	profileForm :FormGroup;

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
		) {

		this.profileForm = this.lf.group({
	        _id: ['', Validators.required],
	        email: ['', Validators.required],
	        username: ['', Validators.required],
	        firstname: ['', Validators.required],
	        lastname: ['', Validators.required],
	        phonenumber: ['', Validators.required]
	    });

		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));

		this.profileForm.patchValue(this.currentCustomer);
	}

	ionViewDidLoad() {}

	update(){
		this.customerService.updateCustomer(this.profileForm.value).subscribe(data => {
			if (!data.error) {
				this.getToast("Profile Updated");
            	this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(cust=>{
            		localStorage.removeItem('currentCustomer');
            		localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
            		this.nav.setRoot(ProfilePage);
            	});
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
