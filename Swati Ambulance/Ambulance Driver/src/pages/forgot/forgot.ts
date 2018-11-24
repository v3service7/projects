import { Component } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { HomePage } from '../home/home';


/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  loginForm: FormGroup;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private userService: UserService,
  	public nav: Nav,
  	private lf: FormBuilder,
    public toastCtrl: ToastController,
  	public loadingCtrl: LoadingController
  	) { 
  	this.loginForm = this.lf.group({
			email: ['', Validators.required]
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

	forgotPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.userService.forgotPassword(this.loginForm.value).subscribe(
      (data) => {
        if (!data.error) {
          loading.dismiss();
        	this.getToast('Please check your email to reset the password !');
          this.nav.setRoot(HomePage);
        }else {
          loading.dismiss();
          this.getToast('Email id does not exist !');
        }
      },
      (err) => {
        loading.dismiss();
      	this.getToast('Email id does not exist !');
      }
    );
  }

  getToast(msg){
  	const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
	}

}
