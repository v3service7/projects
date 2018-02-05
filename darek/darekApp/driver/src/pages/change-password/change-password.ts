import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { DriversService } from '../../app/service/index';

import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	changePasswordForm: FormGroup;
	driver : any = {};

  	constructor(
  		public nav: Nav,
  		public loadingCtrl: LoadingController,
  		public menuCtrl: MenuController,
  		private lf: FormBuilder,
  		private driverService: DriversService,
  		public toastCtrl: ToastController,
  		public navCtrl: NavController,
  		private viewCtrl: ViewController,
  		public navParams: NavParams
  		) {
  		
		this.driver = JSON.parse(localStorage.getItem('currentDriver'));

		console.log(this.driver);

		this.changePasswordForm = this.lf.group({
	        _id: ['', Validators.required],
	        oldpassword: ['', Validators.required],
	        newpassword: ['', Validators.required]
	    });

	    this.changePasswordForm.controls['_id'].setValue(this.driver._id);
  	}

	ionViewDidLoad() {

	}

	driverPasswordUpdate(){
        this.driverService.updateDriverPassword(this.changePasswordForm.value).subscribe(
            (data) => {
                if (data.error) {
                	this.changePasswordForm.reset();
                	this.changePasswordForm.controls['_id'].setValue(this.driver._id);
                	this.getToast(data.message)
                }else{
                	this.getToast(data.message);
                    this.navCtrl.pop(ProfilePage)
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
