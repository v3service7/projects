import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { ToastController } from 'ionic-angular';
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
  	public toastCtrl: ToastController
  	) { 
  	this.loginForm = this.lf.group({
			email: ['', Validators.required]
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

  login() {
  	this.navCtrl.push(HomePage);
  }

	forgotPassword() {
    this.userService.forgotPassword(this.loginForm.value).subscribe(
        (data) => {
            if (!data.error) {
            	this.getToast('Please check your email to reset the password !');
                this.nav.setRoot(HomePage);
            }else {
                this.getToast('Email id does not exist !');
            }
        },
        (err) => {
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
