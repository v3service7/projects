import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { UsersService } from '../../app/service/users.service';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	ownerProfile: FormGroup;

  	constructor(public nav: Nav, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private lf: FormBuilder, private userService: UsersService,public toastCtrl: ToastController, public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
 	    this.ownerProfile = this.lf.group({
	        _id: ['', Validators.required],
	        oldpassword: ['', Validators.required],
	        newpassword: ['', Validators.required]
	    });
	    this.ownerProfile.patchValue(JSON.parse(localStorage.getItem('currentOwner')));
  	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad ChangePasswordPage');
	}

	ownerPasswordUpdate(){
        this.userService.updateOwnerPassword(this.ownerProfile.value).subscribe(
            (data) => {
                if (data.error) {
                	this.getToast(data.message)
                }else{
                	this.getToast('Password Has been changed Successfully');
                    this.nav.setRoot(ProfilePage)
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

 	private goToChangePassword(){
 		this.navCtrl.push(ProfilePage)
 	}

}
