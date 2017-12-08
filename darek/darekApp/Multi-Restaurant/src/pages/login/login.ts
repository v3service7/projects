import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService, SocketService } from '../../app/service/index';

import { ForgetPasswordPage } from './forgetpassword';
import { RegisterPage } from './register';

import { MyApp } from '../../app/app.component';
import { RestaurantPage } from '../restaurant/restaurant';

import { IconTextPage } from '../item/iconText';

@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
})
export class LoginPage {
   loginForm: FormGroup;
   rootPage: any;
   previousPage: any;

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
      public events: Events,
      public loadingCtrl: LoadingController,
      public menuCtrl: MenuController,
      private lf: FormBuilder,
      public navCtrl: NavController,
      private viewCtrl: ViewController,
      public toastCtrl: ToastController,
      private customerService: CustomersService,
      private socketService: SocketService,
      public navParams: NavParams
      ){
      this.loginForm = this.lf.group({
         username: ['', Validators.required],
         password: ['', [Validators.required]],
      });
      this.menuCtrl.enable(false);

      /*var val=this.navCtrl.last();
      this.previousPage = val.component*/
   }

   ionViewDidLoad() {}

   createUser(user) {
      console.log('User created!')
      this.events.publish('user:created', user, Date.now());
   }

   private login(){
      let loading = this.loadingCtrl.create({
         content: 'Please wait...'
      });
      loading.present();
      this.customerService.getCustomer(this.loginForm.value).subscribe(
         (data) => {
            loading.dismiss();
            if (data.status) {
               this.createUser(data.data.email)
               localStorage.setItem('currentCustomer', JSON.stringify(data.data));
               this.socketService.assignSocketIdToCustomer(data.data);
               this.menuCtrl.enable(true);
               //this.nav.setRoot(this.previousPage);
               this.nav.setRoot(RestaurantPage);
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
