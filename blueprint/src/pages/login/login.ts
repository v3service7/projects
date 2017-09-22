import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { HomePage } from '../home/home';
import { ForgetPasswordPage } from './forgetpassword';
import { RegisterPage } from './register';

@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
})
export class LoginPage {
   loginForm: FormGroup;
   rootPage: any;

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
      this.loginForm = this.lf.group({
         username: ['', Validators.required],
         password: ['', [Validators.required]],
      });
      this.menuCtrl.enable(false);
   }

   ionViewDidLoad() {}

   private login(){
      let loading = this.loadingCtrl.create({
         content: 'Please wait...'
      });
      loading.present();
      this.customerService.getCustomer(this.loginForm.value).subscribe(
         (data) => {
            loading.dismiss();
            if (data.status) {
               localStorage.setItem('currentCustomer', JSON.stringify(data.data));
               this.menuCtrl.enable(true);
               this.nav.setRoot(HomePage);
            }else{
               this.getToast('Bad Credential');
               this.loginForm.reset();
            }
         },
         (err)=>{
            loading.dismiss();
            this.getToast('Bad Credential');
            this.loginForm.reset();
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

   private register(){
      this.navCtrl.push(RegisterPage);
   }
}
