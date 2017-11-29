import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService } from '../../app/service/index';;

import { RestaurantPage } from '../restaurant/restaurant';

@Component({
	selector: 'page-rating',
	templateUrl: 'rating.html'
})
export class RatingPage {
    ratingForm: FormGroup;
	ratingArray : any = [1,2,3,4,5];
    id: string;
    loading: any;
	rating : any;
    imageURL: string = globalVariable.imageUrl;
    currentCustomer: any;

	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
        private lf: FormBuilder,
		public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public restaurantsService : RestaurantsService,
        public kitchenMenuService : KitchenMenuService,
		public ratingService : RatingService,
		) {
        
        this.ratingForm = this.lf.group({
            restaurantId: ['', Validators.required],
            customerId: ['', [Validators.required]],
            review: ['', [Validators.required]],
            rating: ['', [Validators.required]],
        });
        this.id = navParams.get('id');
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

                this.rating = data.message;
                let rate = 0;
                if (this.rating.length > 0) {
                    for (var j = 0; j < this.rating.length; j++) {
                        rate = rate + this.rating[j].rating;
                    }
                    this.rating['avgRating'] = Math.floor(rate/this.rating.length);
                    this.rating['totalReview'] = this.rating.length;
                }
            }
        });
    }

    goToRestroPage(id){
        this.navCtrl.pop(RestaurantPage)
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
