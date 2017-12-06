import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Nav, AlertController } from 'ionic-angular';

import * as globalVariable from "../../app/global";

import { RestaurantsService, KitchenMenuService, RatingService, CuisinesService } from '../../app/service/index';;

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
    searchResultArray : any = [];
    allCuisines : any = [];
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
		public cuisinesService : CuisinesService
		) {}

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        this.getAllRestaurants();
        this.getAllCuisines();

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

    getAllCuisines(){
        this.cuisinesService.getAll().subscribe((data)=>{
            if (!data.error) {
                this.allCuisines = data.message;
            }
        })
    }

    showCuisine(){
        let alert = this.alertCtrl.create();
        alert.setTitle('Choose Cuisines');

        for (var i = 0; i < this.allCuisines.length; i++) {
            alert.addInput({
                type: 'checkbox',
                label: this.allCuisines[i].name,
                value: this.allCuisines[i]
            });
        }


        alert.addButton('Cancel');
        alert.addButton({
            text: 'Search',
            handler: data => {
                console.log('Checkbox data:', data);
                this.searchResultArray = [];

                /*for (var i = 0; i < data.length; i++) {
                    let obj = {'type':data[i].name , 'restaurant' : []};
                    this.searchResultArray.push(obj);
                }*/

                for (var i = 0; i < this.restaurantsList.length; i++) {
                    let obj = {'restaurant' : this.restaurantsList[i], 'cuisines':[]};
                    this.searchResultArray.push(obj);
                }


                this.searchRestaurant(data);
                /*this.testCheckboxOpen = false;
                this.testCheckboxResult = data;*/
            }
        });
        /*alert.present().then(() => {
            this.testCheckboxOpen = true;
        });*/

        alert.present()
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

   /* getItems(ev) {
        this.getAllMenu();
        var val = ev.target.value;

        console.log("val");
        console.log(val);

        if (val && val.trim() != '') {
            this.menuName = this.allMenu.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }*/


    searchRestaurant(data){
        for (var i = 0; i < this.restaurantsList.length; i++) {
            let cuisine = [];
            if (this.restaurantsList[i].cuisine && this.restaurantsList[i].cuisine.length > 0) {
                cuisine = this.restaurantsList[i].cuisine;
            }

            for (var j = 0; j < data.length; j++) {
                let indx = cuisine.findIndex(mn=>mn._id == data[j]._id)

                if (indx > -1) {
                    let index = this.searchResultArray.findIndex(pq=> pq['restaurant']['_id'] == this.restaurantsList[i]._id);
                    if (index > -1) {
                        this.searchResultArray[index]['cuisines'].push(data[j].name)
                    }
                }
            }
        }
    }

    spliceSearchCusine(i){
        this.searchResultArray.splice(i,1);
    }

    /*openMenu(menu){
        this.navCtrl.push(ItemPage, {
            menu : menu, resId : menu.kitchenId
        });
    }*/

}
