import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService } from '../../app/service/index';;

import { MenuPage } from '../menu/menu';
import { ItemPage } from '../item/item';
import { CartPage } from '../cart/cart';

import { RatingPage } from '../rating/rating';

@Component({
	selector: 'page-restaurant',
	templateUrl: 'restaurant.html'
})
export class RestaurantPage {
    restaurantsList : any = [];
    allMenu : any = [];
    menuName : any = [];
	ratingArray : any = [1,2,3,4,5];
    loading: any;
    currentCustomer: any = {};
	rating : any;
	imageURL: string = globalVariable.imageUrl;

    cartLength : number;

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

        if (localStorage.getItem('cartLength') != null) {
            this.cartLength = parseInt(localStorage.getItem('cartLength'));
        }
        if (localStorage.getItem('cartLength') == null) {
            localStorage.setItem('cartLength','0');
        }
    }

    getAllRating(){
        this.ratingService.getAllRating().subscribe((data)=>{
            console.log("data");
            console.log(data);
            this.rating = data;
        });
    }

    goToReviewPage(id){
        this.navCtrl.push(RatingPage,{
            id:id
        })
    }

    findReview(id){
        if (this.rating) {
            var index = this.rating.findIndex(mn=> mn._id == id);
            if (index == -1) {
                return true;
            }else{
                return false;
            }
        }
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getAllRestaurants();
            refresher.complete();
        }, 2000);
    }

    private getAllRestaurants(){
        this.restaurantsList = [];
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

            this.getAllRating();
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

    private getAllMenu(){
        this.menuName = [];
        this.kitchenMenuService.getAllRestaurantMenu().subscribe((data)=>{
            this.allMenu = data.message;
        })
    }

    getItems(ev) {
        this.getAllMenu();
        var val = ev.target.value;

        console.log("val");
        console.log(val);

        if (val && val.trim() != '') {
            this.menuName = this.allMenu.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    openMenu(menu){
        this.navCtrl.push(ItemPage, {
            menu : menu, resId : menu.kitchenId
        });
    }

}
