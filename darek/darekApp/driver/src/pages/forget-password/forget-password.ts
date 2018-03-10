import { Component  } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }
  resetPassword(){
    this.navCtrl.pop();
    this.showAlert();
  }
  showAlert(){
    let toast = this.toastCtrl.create({
      message: 'Reset code sent successfully.',
      duration: 3000
    });
    toast.present();
  }

}
