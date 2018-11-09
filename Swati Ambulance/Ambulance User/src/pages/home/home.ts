import { Component } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { MainPage } from '../main/main';


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
    public nav: Nav,) { }

  onLoginSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };

    this.userService.validateUser(user).subscribe(data => {
      if (!data.error) {
        this.userService.storeUser(data.token, data.user);
        this.getToast('You are logged-in Successfully  !');
        this.nav.setRoot(MainPage);
      } else {
        this.getToast('Invalid User !')
      }
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
