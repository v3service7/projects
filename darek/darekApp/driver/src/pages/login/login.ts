import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { AuthService } from '../../app/service/auth.service';

import { DriversService} from '../../app/service/index';
import { SocketService } from '../../app/service/socket.service';


import { MyOrderPage } from '../my-order/my-order';
import { ForgetPasswordPage } from '../forget-password/forget-password';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {

 	loginForm: FormGroup;
    rootPage: any;
 	loading: any;

 	formErrors = {
 		'password'  : ''   
 	};

 	validationMessages = {   
 		'password' : {
 			'required':      'Password is required.',
 			'pattern'   :    'Password must contain 8-25 characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Charecter'
 		}        
 	};

 	constructor(
        public socketService : SocketService,
        public nav: Nav,
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        private lf: FormBuilder,
        private authService: AuthService,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        private viewCtrl: ViewController,
        public navParams: NavParams,
        public driverService: DriversService
        ) {
 		this.loginForm = this.lf.group({
 			email: ['', Validators.required],
 			password: ['', [Validators.required]],
 		});
 		this.menuCtrl.enable(false);
 	}

 	ionViewWillEnter() {
		//this.viewCtrl.showBackButton(false);
	}

 	private login(){
 		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
 		this.authService.getDriver(this.loginForm.value).subscribe(
            (data) => {
              	if (data.status) {
                    this.socketService.assignSocketIdToDriver(data.data);
                    if (typeof data.data.lat == 'undefined' || typeof data.data.lng == 'undefined') {
                        if(navigator.geolocation){
                            navigator.geolocation.getCurrentPosition((position) => {
                                data.data.lat = position.coords.latitude;
                                data.data.lng = position.coords.longitude;
                                this.updateDriver(data.data);
                            });
                        }
                    }else{
                        localStorage.setItem('currentDriver', JSON.stringify(data.data));
                        this.nav.setRoot(MyOrderPage);
                        this.loading.dismiss();
                    }
                }else{
                	this.getToast('Bad Credential');
                	this.loginForm.reset();
                    this.loading.dismiss();
                }
            },
            (err)=>{
                this.loading.dismiss();
            	this.getToast('Bad Credential');
            	this.loginForm.reset();
            }
        );
 	}

    private updateDriver(data){
        this.driverService.updateDriver(data).subscribe((data) => {
                if (!data.error) {
                    this.loading.dismiss();
                    this.getToast('Login Successfully!');
                    localStorage.setItem('currentDriver', JSON.stringify(data));
                    this.nav.setRoot(MyOrderPage);
                }else{
                    this.loading.dismiss();
                    this.getToast('Unable to get your location! Please Login again');
                    this.loginForm.reset();
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

 	private goToForget(){
 		this.navCtrl.push(ForgetPasswordPage);
 	}

 	ionViewDidLoad() {
 		this.loginForm = this.lf.group({
 			email: ['', Validators.required],
 			password: ['', [Validators.required]],
 		});
 		console.log('ionViewDidLoad LoginPage');
 	}

 	onValueChanged(data?: any) {
 		if (!this.loginForm) {return;  }
 		const form = this.loginForm;
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
}
