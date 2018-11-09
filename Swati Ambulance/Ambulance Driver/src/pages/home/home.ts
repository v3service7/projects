import { Component } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import { MainPage } from '../main/main';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var FCMPlugin : any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: String;
  password: String;
  firestore = firebase.database().ref('/drivers');

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    public toastCtrl: ToastController,
    public nav: Nav,
    public afd: AngularFireDatabase) {}

  onLoginSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };

    this.userService.validateUser(user).subscribe(data => {
      if (!data.error) {
        this.userService.storeUser(data.token, data.user);
        this.tokensetup().then((token) => {
          this.storetoken(token);
        })
        this.getToast('You are logged-in Successfully  !');
        this.nav.setRoot(MainPage);       
      } else {
        this.getToast(data.msg);
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

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }

  storetoken(token) {
    this.afd.list(this.firestore).push({
      user: JSON.parse(localStorage.getItem('user')),
      devtoken: token      
      }).then(() => {
        //alert('Token stored');
        })/*.catch(() => {
          alert('Token not stored');
        })*/
  }

}
