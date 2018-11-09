import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	user: any;
  err = '';
  userProfileForm: FormGroup;
  cpForm: FormGroup;
  passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  // tslint:disable-next-line:max-line-length
  emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordp: any = '';
  newo: any = false;
  MutchPassword: any = false;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'phonenumber' : '',
    'email' : ''
	};

  validationMessages = {
    'firstname': {
        'required':      'First Name is required.',
    },
    'lastname': {
        'required':      'Last Name is required.',
    },
    'phonenumber': {
        'required':      'Phone Number is required.',
        'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
        'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.'
    },
    'email' : {
        'required':      'Email is required.',
        'pattern'   :    'Email not in well format.'
    }
  };

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public nav: Nav,
  	private userService: UserService,
    private lf: FormBuilder,
    public toastCtrl: ToastController) {

    this.userProfileForm = this.lf.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern(this.emailp)]]
    });

    this.userService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.message;
      this.userProfileForm.patchValue(this.user);
    },
    err => {
      console.log(err);
      return false;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

	profileUpdate() {
    this.userService.updateProfile(this.userProfileForm.value).subscribe(
      (data) => {
        if (!data.error) {
        	localStorage.setItem('user', JSON.stringify(data.message));
        	this.getToast("Profile updated Successfully !");	
          this.nav.setRoot(MainPage);
          }
      },
      (err) => {
      	this.getToast("Something went wrong !");
      }
    );
  }

  cancelProfile() {
  	this.nav.setRoot(MainPage);
  }

  getToast(msg){
  	const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
