import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService } from '../../app/service/index';;

//import { RestaurantPage } from '../restaurant/restaurant';

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
    resID: string = globalVariable.resId;
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
            review: [''],
            rating: ['', [Validators.required]],
        });
        //this.id = navParams.get('id');

        this.ratingForm.controls['restaurantId'].setValue(this.resID);
    }

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        this.getAllRating();

        if(localStorage.getItem('currentCustomer')){
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            this.ratingForm.controls['customerId'].setValue(this.currentCustomer._id);
            this.ratingForm.controls['rating'].setValue(0);
        }
    }

    addRating(x){
        for (var i = 1; i <= x ; i++) {
            let starShowClass = "showStar_"+i;
            let starHideClass = "hideStar_"+i;

            let abc = document.getElementsByClassName(starShowClass);
            let xyz = document.getElementsByClassName(starHideClass);

            /*console.log(typeof abc);
            console.log(abc);
            console.log(xyz);*/

            /*abc[0].style.display='block';
            xyz[0].style.display='none';*/
            abc[0].setAttribute("style", "display:block");
            xyz[0].setAttribute("style", "display:none");
        }
        this.ratingForm.controls['rating'].setValue(x);
    }

    removeRating(x){
        for (var i = x+1; i <= 5 ; i++) {
            let starShowClass = "showStar_"+i;
            let starHideClass = "hideStar_"+i;

            let abc = document.getElementsByClassName(starShowClass);
            let xyz = document.getElementsByClassName(starHideClass);

            /*abc[0].style.display='none';
            xyz[0].style.display='block';*/

            abc[0].setAttribute("style", "display:none");
            xyz[0].setAttribute("style", "display:block");
        }
        this.ratingForm.controls['rating'].setValue(x);
    }

    getAllRating(){
        this.ratingService.getAllRatingById(this.resID).subscribe((data)=>{

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

    checkDisable(){
        if (!this.ratingForm.valid || this.ratingForm.value['rating'] == 0) {
            return true;
        }else{
            return false;
        }
    }

    /*goToRestroPage(id){
        this.navCtrl.pop(RestaurantPage)
    }*/

    doRefresh(refresher) {
        setTimeout(() => {
            this.getAllRating();
            refresher.complete();
        }, 2000);
    }

    rateRestro(){
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
    }

}
