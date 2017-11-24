import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { OrderService, RestaurantsService, DriversService } from '../../app/service/index';

import { MyDriverPage } from './my-driver';
import { DriverDetailPage } from './driver-detail';

/**
 * Generated class for the Add Driver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-edit-driver',
 	templateUrl: 'edit-driver.html',
 })
 export class EditDriverPage {

     updateDriver: FormGroup;

     currentOwner:any={};
     restaurants:any ={};
     selectedDriver:any ={};
     drivers: Array<{}>;

     constructor(public modalCtrl: ModalController,public navCtrl: NavController, private lf: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public navParams: NavParams,private restaurantsService: RestaurantsService,private driversService: DriversService) {
        this.selectedDriver = navParams.get('driver');

        this.updateDriver = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            phoneNo: ['', Validators.required],
            vehicleType: ['', Validators.required],
            vehicleName: ['', Validators.required],
            vehicleNo: ['', Validators.required],
            restaurantId : [],
            _id : []
        });
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        console.log(this.selectedDriver)
        this.updateDriver.patchValue(this.selectedDriver);
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private updatedriver() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.updateDriver.controls['_id'].setValue(this.selectedDriver._id);
        this.driversService.updateDriver(this.updateDriver.value).subscribe(
            (data) => {
                loading.dismiss();
                this.navCtrl.pop(DriverDetailPage);
                this.getToast('Driver Updated successfully')

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

    ionViewDidLoad() {
        console.log('ionViewDidLoad Add Driver');
    }
}
