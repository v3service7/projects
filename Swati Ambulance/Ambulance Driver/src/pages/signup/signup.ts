import { Component } from '@angular/core';
import { NavController, Nav, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../app/services/user.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userAddForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
  phoneRegex = /^[(]{0,1}[0-9]{2,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'phonenumber' : '',
    'email' : '',
    'username' : '',
    'password' : '',
    'newpassword' : ''
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
    },
    'username' : {
        'required':      'username is required.',
    },
    'password' : {
        'required':      'Password is required.',
        'pattern' :      'Please Enter at least one letter and number',
        'minlength':     'Password should contain minimum 6 characters',
    },
    'newpassword' : {
        'required':      'Confirm Password is required.',
        'pattern' :      'Please Enter at least one letter and number',
        'minlength':     'Password should contain minimum 6 characters',
    }
  };

	/*@ViewChild('firstname') firstname;
	@ViewChild('lastname') lastname;
	@ViewChild('email') email;
	@ViewChild('phonenumber') phonenumber;
	@ViewChild('emergencynumber') emergencynumber;
	@ViewChild('username') username;
	@ViewChild('password') password;*/

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private userService: UserService,
  	public nav: Nav,
  	private lf: FormBuilder,
    public toastCtrl: ToastController,
  	public loadCtrl: LoadingController
    ) {
  	this.userAddForm = this.lf.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern(this.emailp)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
      newpassword: ['', [Validators.required]]
    });
    this.userAddForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  goBack(){
    this.navCtrl.pop();
  }

  checkValidity(){
  	if (this.userAddForm.valid) {
  		return false;
  	}else{
  		return true;
  	}
  }

  onValueChanged(data?: any) {
    if (!this.userAddForm) {return;  }
    const form = this.userAddForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  signUp() {
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.userAddForm.value.role = "Driver";
    this.userAddForm.value.status = false;
  	if (this.userAddForm.value['password'] == this.userAddForm.value['newpassword']) {
	  	this.userService.registerUser(this.userAddForm.value).subscribe(
	    (data) => {
	      if (!data.error) {
          loading.dismiss();
	      	this.getToast('Driver Registered Successfully ! Please wait for approval.');
	        this.nav.setRoot(HomePage);
	      }else {
          loading.dismiss();
	        this.getToast("Email/Username already in use");
	      }
	    },(err) => {
        loading.dismiss();
	      this.getToast('Something went wrong');
	    });
  	}else{
      loading.dismiss();
  		this.getToast('Passwords did not match !');
  	}
  }

  getToast(msg){
  	const toast = this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
