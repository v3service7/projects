import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { UsersService } from '../../app/service/users.service';
import { HomePage } from '../home/home';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	profileForm: FormGroup;
 	rootPage: any;
 	currentOwner:any;

  	constructor(public nav: Nav, public loadingCtrl: LoadingController, public menuCtrl: MenuController, private lf: FormBuilder, private userService: UsersService,public toastCtrl: ToastController, public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
 		this.profileForm = this.lf.group({
 			_id: ['', Validators.required],
 			username: ['', Validators.required],
 			email: ['', [Validators.required]],
 			firstname: ['', [Validators.required]],
 			lastname: ['', [Validators.required]],
 			phoneNo: ['', [Validators.required]],
 		});
 		this.getOwner()
 	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	private getOwner(){
		let tempOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.userService.getOne(tempOwner._id).subscribe(
            (data) => {
                if (data.error) {
            		this.getToast('Some thing went wrong');
                }else{
                	this.currentOwner = data.message
 					this.profileForm.patchValue(this.currentOwner);
                	localStorage.removeItem('currentOwner');
                	localStorage.setItem('currentOwner', JSON.stringify(data.message));
                }
            }
        );
 	}

	private update(){
 		let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.userService.updateUser(this.profileForm.value).subscribe(
            (data) => {
                loading.dismiss();
                if (data.error) {
            		this.getToast('Some thing went wrong');
                }else{
                	this.getOwner();
            		this.getToast('Profile updated successfully');
                    this.nav.setRoot(HomePage);
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

}
