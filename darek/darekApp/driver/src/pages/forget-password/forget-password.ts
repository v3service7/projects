import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastController,LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { AuthService } from '../../app/service/auth.service';


import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-forget-password',
 	templateUrl: 'forget-password.html',
 })
 export class ForgetPasswordPage {
 	
 	forgetForm: FormGroup;

 	constructor(public nav: Nav, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private lf: FormBuilder, private authService: AuthService,public toastCtrl: ToastController, public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
 		this.forgetForm = this.lf.group({
 			email: ['', Validators.required],
 		});
 		this.menuCtrl.enable(false);
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ForgetPasswordPage');
 	}

 	private forgetPassword(){
        console.log(this.forgetForm.value);
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.forgetPasswordDriver(this.forgetForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    loading.dismiss();
                	this.getToast(data.message);
                    this.navCtrl.pop(LoginPage);
                }else{
                    loading.dismiss();
                    this.getToast(data.message);
                	this.forgetForm.reset();
                }
            },
            (err)=>{
                loading.dismiss();
            	this.getToast('Somthing went wrong');
            	this.forgetForm.reset();
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

 	private goToLogin(){
 		this.navCtrl.pop(LoginPage);
 	}

 }
