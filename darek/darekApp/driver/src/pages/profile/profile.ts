import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { UsersService, DriversService} from '../../app/service/index';
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
 	currentDriver:any;

  	constructor(public nav: Nav, public loadingCtrl: LoadingController, public driverService: DriversService, public menuCtrl: MenuController, private lf: FormBuilder, private userService: UsersService,public toastCtrl: ToastController, public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
 		this.profileForm = this.lf.group({
 			_id: ['', Validators.required],
 			email: ['', [Validators.required]],
 			firstname: ['', [Validators.required]],
 			lastname: ['', [Validators.required]],
             phoneNo: ['', [Validators.required]],
             address: ['', [Validators.required]],
             vehicleType: ['', [Validators.required]],
             vehicleNo: ['', [Validators.required]],
 			vehicleName: ['', [Validators.required]],
 		});
 		this.getOwner()
 	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	private getOwner(){
		let tempDriver = JSON.parse(localStorage.getItem('currentDriver'));
        console.log(tempDriver);
        this.driverService.getOne(tempDriver._id).subscribe(
            (data) => {
                if (data.error) {
            		this.getToast('Some thing went wrong');
                }else{
                	this.currentDriver = data.message
 					this.profileForm.patchValue(this.currentDriver);
                	localStorage.removeItem('currentDriver');
                	localStorage.setItem('currentDriver', JSON.stringify(data.message));
                }
            }
        );
 	}

	private update(){
 		let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.driverService.updateDriver(this.profileForm.value).subscribe(
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
