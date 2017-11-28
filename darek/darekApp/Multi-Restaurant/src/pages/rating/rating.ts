import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService } from '../../app/service/index';;

import { RestaurantPage } from '../restaurant/restaurant';

@Component({
	selector: 'page-rating',
	templateUrl: 'rating.html'
})
export class RatingPage {
	ratingArray : any = [1,2,3,4,5];
    id: string;
    loading: any;
	rating : any;
    currentCustomer: any = {};

	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public restaurantsService : RestaurantsService,
        public kitchenMenuService : KitchenMenuService,
		public ratingService : RatingService,
		) {
        this.id = navParams.get('id');
        //this.getAllRating();
    }

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        this.getAllRating();

        if(localStorage.getItem('currentCustomer')){
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        }
    }

    getAllRating(){
        this.ratingService.getAllRatingById(this.id).subscribe((data)=>{

            console.log("data");
            console.log(data);

            if (!data.error) {
                this.loading.dismiss();
                this.rating = data.message[0];
                let rate = 0;
                if (this.rating.review) {
                    for (var j = 0; j < this.rating.review.length; j++) {
                        rate = rate + this.rating.review[j].rating;
                    }
                }
                this.rating['rat'] = Math.floor(rate/this.rating['review'].length);
                this.rating['totalReview'] = this.rating['review'].length;
            }
        });
    }

    goToRestroPage(id){
        this.navCtrl.push(RestaurantPage)
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getAllRating();
            refresher.complete();
        }, 2000);
    }

    private getToast(msg){
    	let toast = this.toastCtrl.create({
	        message: msg,
	        duration: 3000,
	        position:'top' //top,middle,bottom
	    });
	    toast.present();
    }
}
