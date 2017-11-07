import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';

import * as globalVariable from "../../app/global";

import { RestaurantsService } from '../../app/service/index';;

import { MenuPage } from '../menu/menu';
import { CartPage } from '../cart/cart';

@Component({
	selector: 'page-restaurant',
	templateUrl: 'restaurant.html'
})
export class RestaurantPage {
	restaurantsList : any = [];
    loading: any;
	currentCustomer: any = {};
	imageURL: string = globalVariable.imageUrl;

    cartLength : number;

	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
        public alertCtrl: AlertController,
		public restaurantsService : RestaurantsService
		) {}

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        this.getAllRestaurants();

        if(localStorage.getItem('currentCustomer')){
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        }

        if (localStorage.getItem('cartLength')) {
            this.cartLength = parseInt(localStorage.getItem('cartLength'));
        }
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getAllRestaurants();
            refresher.complete();
        }, 2000);
    }

    private getAllRestaurants(){
    	this.restaurantsService.getAll().subscribe((data)=>{
    		if (!data.error) {
    			this.loading.dismiss();
    			for (var i = 0; i < data.message.length; i++) {
    				if (typeof data.message[i].name != 'undefined') {
		    			this.restaurantsList.push(data.message[i]);
    				}
    			}
    		}else{
    			this.getToast('Unable to load data! Try Later')
    		}
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

    private goToRestaurant(id){
    	console.log("id");
    	console.log(id);
        this.navCtrl.push(MenuPage, {
            resId : id
        });
    }

    private restroImage(img){
		if (img != null) {
		   var imgPath = this.imageURL + img;
		}
		if (img == null) {
		   var imgPath = "assets/img/banner.jpg";
		}
		return imgPath;
    }

    private goToCart(){
        var restaurantID = localStorage.getItem('resID');

        if (restaurantID != null) {
            this.navCtrl.push(CartPage,{
                resId : restaurantID
            });
        }else{
            let alert = this.alertCtrl.create({
                title: 'No Item!',
                subTitle: 'Your Cart is empty',
                buttons: ['OK']
            });
            alert.present();
        }
    }

}
