import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
	user: any;
  cpForm: FormGroup;
  passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  passwordp: any = '';
  newo: any = false;
  MutchPassword: any = false;

  cpFormErrors = {
    'password': '',
    'newpassword': '',
    'cnewpassword': '',
  };

  cpValidationMessages = {
    'newpassword' : {
        'required':      'New Password is required.',
        'pattern' :      'Please Enter at least one letter and number',
        'minlength':     'New Password should contain minimum 6 characters',
    },
    'cnewpassword' : {
        'required':      'Please Confirm New Password.',
        'pattern' :      'Please Enter at least one letter and number',
        'minlength':     'Confirm Password should contain minimum 6 characters',
    } 
  };

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public nav: Nav,
  	private userService: UserService,
    private lf: FormBuilder,
    public toastCtrl: ToastController) {

  	this.cpForm = this.lf.group({
      password: ['', Validators.required],
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
      cnewpassword: ['', [Validators.required]]
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  cancelPassword() {
  	this.nav.setRoot(MainPage);
  }

  changePassword() {
  	if (this.cpForm.value['cnewpassword'] == this.cpForm.value['newpassword']) {
	    this.userService.changePassword(this.cpForm.value).subscribe(
	      (data) => {
	      	console.log(data);
	        if (!data.error) {
	            this.getToast("Password Changed Successfully !");
	            this.nav.setRoot(MainPage);
	          }else {
	          	this.getToast(data.message);
	          }
	      },
	      (err) => {
	      	this.getToast("Something went wrong !");
	      }
	    );
	  }else{
  		this.getToast('Passwords did not match !');
  	}  
	}

	getToast(msg){
  	const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
