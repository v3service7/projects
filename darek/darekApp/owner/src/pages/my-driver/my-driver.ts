import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, DriversService } from '../../app/service/index';

import { AddDriverPage } from './add-driver';
import { DriverDetailPage } from './driver-detail';
import { DriversPositionPage } from './drivers-position';

/**
 * Generated class for the MyDriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-my-driver',
 	templateUrl: 'my-driver.html',
 })
 export class MyDriverPage {

	currentOwner:any={};
	restaurants:any ={};
	drivers: Array<{}>;
	loading:any;
    
    constructor(public modalCtrl: ModalController, public menuCtrl: MenuController, public viewCtrl: ViewController,public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public navParams: NavParams,private restaurantsService: RestaurantsService,private driversService: DriversService) {
		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        /*this.getRestaurants();*/
    }

    ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getDrivers(this.restaurants._id);
        });
    }

    private getDrivers(resID){
    	this.driversService.getRestaurantDrivers(resID).subscribe(
    	(users) => {
    		this.drivers = users.message; 
    		this.loading.dismiss();
    	},
        (err)=>{
            this.loading.dismiss();
        	this.getToast('Some thing went wrong! Try Later.');
        });
    }

    private goToAddDriver(){
         this.navCtrl.push(AddDriverPage);
     }

    private viewDriverPosition(){
 		this.navCtrl.push(DriversPositionPage);
 	}

    private driverDetail(event,obj){
        this.navCtrl.push(DriverDetailPage, {
            'driverDetail':obj
        });
 	}

    private getToast(msg){
 		let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 3000,
	      position:'top' //top,middle,bottom
	    });
	    toast.present();
 	}

 	doRefresh(refresher) {
		setTimeout(() => {
			this.getDrivers(this.restaurants._id);
			refresher.complete();
		}, 2000);
	}

 }
