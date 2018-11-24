import { Component } from '@angular/core';
import { NavController, Nav, ToastController, LoadingController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { MainPage } from '../main/main';

/*import { AngularFireDatabase } from 'angularfire2/database';*/
/*import firebase from 'firebase';*/
/*declare var FCMPlugin : any;*/


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: String;
  password: String;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public nav: Nav
    /*,public afd: AngularFireDatabase*/
    ) {}

  onLoginSubmit() {
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
    const user = {
      username: this.username,
      password: this.password
    };

    this.userService.validateUser(user).subscribe(data => {
      if (!data.error) {
        this.userService.storeUser(data.token, data.user);
        /*this.storeDriverToken(data.user);*/
        loading.dismiss();
        this.getToast('You are logged-in Successfully!');
        this.nav.setRoot(MainPage);
      } else {
        loading.dismiss();
        this.getToast(data.msg);
      }
    },(err)=>{
      loading.dismiss();
      this.getToast('Something went wrong. Please check your Internet Connection');
    });
  }

  signUp() {
  	this.navCtrl.push(SignupPage);
  }

  forgotPwd() {
    this.navCtrl.push(ForgotPage);
  }

  getToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
