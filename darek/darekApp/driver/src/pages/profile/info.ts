import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { UsersService,DriversService } from '../../app/service/index';
import { HomePage } from '../home/home';
import { ChangePasswordPage } from '../change-password/change-password';
import { ProfilePage } from './profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

	profileForm: FormGroup;
 	rootPage: any;
 	currentDriver:any={};

  	constructor(public nav: Nav, public driverService: DriversService, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private lf: FormBuilder, private userService: UsersService,public toastCtrl: ToastController, public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
 		this.getOwner()
 	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	private getOwner(){
		let tempOwner = JSON.parse(localStorage.getItem('currentDriver'));
        this.driverService.getOne(tempOwner._id).subscribe(
            (data) => {
                if (data.error) {
            		this.getToast('Some thing went wrong');
                }else{
                	this.currentDriver = data.message
 					localStorage.removeItem('currentDriver');
                	localStorage.setItem('currentDriver', JSON.stringify(data.message));
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
         this.navCtrl.push(ChangePasswordPage)
     }
 	private goToUpdateProfile(){
 		this.navCtrl.push(ProfilePage)
 	}

}
