import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { OrderService, RestaurantsService, DriversService } from '../../app/service/index';

import { MyDriverPage } from './my-driver';

/**
 * Generated class for the Add Driver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-add-driver',
 	templateUrl: 'add-driver.html',
 })
 export class AddDriverPage {

     addDriver: FormGroup;

     currentOwner:any={};
     restaurants:any ={};
     drivers: Array<{}>;

     constructor(public modalCtrl: ModalController,public navCtrl: NavController, private lf: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public navParams: NavParams,private restaurantsService: RestaurantsService,private driversService: DriversService) {

        this.addDriver = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            phoneNo: ['', Validators.required],
            vehicleType: ['', Validators.required],
            vehicleName: ['', Validators.required],
            vehicleNo: ['', Validators.required],
            restaurantId : []
        });
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private savedriver() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.addDriver.controls['restaurantId'].setValue(this.restaurants._id);
        this.driversService.addDriver(this.addDriver.value).subscribe(
            (data) => {
                loading.dismiss();
                this.navCtrl.setRoot(MyDriverPage);
                this.getToast('Driver added successfully')

            }
        );
    }

    private goToLogin(){
        this.navCtrl.setRoot(MyDriverPage);
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
