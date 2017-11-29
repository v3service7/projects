import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';
/*import { FormBuilder, FormGroup, Validators } from '@angular/forms';*/

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService } from '../../app/service/index';;

//import { RestaurantPage } from '../restaurant/restaurant';

@Component({
	selector: 'page-rating',
	templateUrl: 'rating.html'
})
export class RatingPage {
    /*ratingForm: FormGroup;*/
	ratingArray : any = [1,2,3,4,5];
    /*id: string;*/
    loading: any;
    restaurants : any = {};
    settingTrue: boolean;
	rating : any;
    imageURL: string = globalVariable.imageUrl;
    resID: string;
    /*currentCustomer: any;*/

	constructor(
		public navCtrl: NavController,
        public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
        public restaurantsService : RestaurantsService,
		public ratingService : RatingService,
		) {
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;

            this.settingTrue = this.restaurants.rating;
            this.resID = this.restaurants._id;
            this.getAllRating();
        });
    }

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    notify(event){
        console.log(event.checked);
        this.settingTrue = event.checked;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        
        this.updateRestro();
    }

    updateRestro(){
        let obj = {};
        obj['_id'] = this.restaurants._id;
        obj['rating'] = this.settingTrue;

        this.restaurantsService.updateRestaurant(obj).subscribe((data)=>{
            if (!data.error) {
                this.getRestaurants();
            }
        })

    }

    /*addRating(x){
        for (var i = 1; i <= x ; i++) {
            let starShowClass = "showStar_"+i;
            let starHideClass = "hideStar_"+i;

            let abc = document.getElementsByClassName(starShowClass);
            let xyz = document.getElementsByClassName(starHideClass);
            
            abc[0].setAttribute("style", "display:block");
            xyz[0].setAttribute("style", "display:none");
        }
        this.ratingForm.controls['rating'].setValue(x);

        console.log("this.ratingForm.value");
        console.log(this.ratingForm.value);
    }

    removeRating(x){
        for (var i = x+1; i <= 5 ; i++) {
            let starShowClass = "showStar_"+i;
            let starHideClass = "hideStar_"+i;

            let abc = document.getElementsByClassName(starShowClass);
            let xyz = document.getElementsByClassName(starHideClass);

            console.log(abc);
            console.log(xyz);

            abc[0].setAttribute("style", "display:none");
            xyz[0].setAttribute("style", "display:block");
        }

        this.ratingForm.controls['rating'].setValue(x);
        console.log("this.ratingForm.value");
        console.log(this.ratingForm.value);
    }*/

    getAllRating(){
        this.ratingService.getAllRatingById(this.resID).subscribe((data)=>{

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

    /*checkDisable(){
        if (!this.ratingForm.valid || this.ratingForm.value['rating'] == 0) {
            return true;
        }else{
            return false;
        }
    }*/

    doRefresh(refresher) {
        setTimeout(() => {
            this.getRestaurants();
            refresher.complete();
        }, 2000);
    }

    /*rateRestro(){
        this.ratingService.addRating(this.ratingForm.value).subscribe((data)=>{
            if (!data.error) {
                console.log(data);
                this.getAllRating();
                this.resetForm();
            }
        })
    }

    resetForm(){
        this.ratingForm.controls['review'].setValue(null);
        this.removeRating(0);
    }*/

}
