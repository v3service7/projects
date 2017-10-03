import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantsService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { CheckoutPage } from './checkout';

@Component({
	selector: 'page-cart',
	templateUrl: 'cart.html',
})
export class CartPage {
	cart : any;
	cartString : any = String;
	cartStorageString : any = String;
	resId : any = String;
	subTotal : number = 0;
	totalWithTax : number = 0;
	restaurants : any = {};
	cartStorage : any = {};
	imageURL: string = globalVariable.imageUrl;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
	    private restaurantsService: RestaurantsService,
	    public alertCtrl: AlertController
		) {
		this.resId = '595172e2421a472120e0db5e';
		this.getRestaurants(this.resId);
	}

	ionViewDidLoad() {
		this.cartString = 'cart_' + this.resId;
		this.cartStorageString = 'cartStorage_' + this.resId;
		if (localStorage.getItem(this.cartString)) {
			this.cart = JSON.parse(localStorage.getItem(this.cartString));
		}else{
			this.cart = [];
		}
	}

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.calculateTotal();
            console.log("this.restaurants");
            console.log(this.restaurants);
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
    
    private itemImage(img){
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    }

	private decreaseQuantity(i){
    	let singleItemPrice = this.cart[i].totalPrice/this.cart[i].quantity;
    	if (this.cart[i].quantity >1) {
	    	this.cart[i].quantity = this.cart[i].quantity - 1;
	    	this.cart[i].totalPrice = singleItemPrice * this.cart[i].quantity;
	    	localStorage.setItem(this.cartString,JSON.stringify(this.cart));
	    	this.calculateTotal();
    	}else{
    		this.getToast('Already Minimum quantity to buy this item');
    	}
    }

    private increaseQuantity(i){
    	let singleItemPrice = this.cart[i].totalPrice/this.cart[i].quantity;
    	if (this.cart[i].quantity < 10) {
	    	this.cart[i].quantity = this.cart[i].quantity + 1;
	    	this.cart[i].totalPrice = singleItemPrice * this.cart[i].quantity;
	    	localStorage.setItem(this.cartString,JSON.stringify(this.cart));
	    	this.calculateTotal();
	    }else{
	    	this.getToast('Maximum quantity to buy this item');
	    }
    }

    private deleteItem(index){
    	let alert = this.alertCtrl.create({
    		title: 'Delete Item!',
    		buttons: [
	    		{
	    			text: 'Cancel'
	    		},
	    		{
	    			text: 'Delete',
	    			handler: () => {
	    				this.cart.splice(index,1);
	    				localStorage.setItem(this.cartString,JSON.stringify(this.cart));
	    				this.calculateTotal();
	    			}
	    		}
    		]
    	});
    	alert.present();
    }

    private calculateTotal(){
    	this.subTotal = 0;
    	for (var i = 0; i < this.cart.length; i++) {
    		this.subTotal = this.subTotal + this.cart[i].totalPrice;
    	}
    	this.cartStorage['orders'] = this.cart;
    	this.cartStorage['subTotal'] = this.subTotal;
    	this.cartStorage['restaurantId'] = this.resId;
    	if (typeof this.restaurants.taxation != 'undefined') {
	    	let tax = parseInt(this.restaurants.taxation.taxpercent);
	    	this.cartStorage['tax'] = (tax/100)*this.subTotal;

	    	this.totalWithTax = ((tax + 100)/100)*this.subTotal;
    		this.cartStorage['gTotal'] = this.totalWithTax;
	    }else{
	    	this.totalWithTax = this.subTotal;
    		this.cartStorage['gTotal'] = this.totalWithTax;
	    }
    }

    private checkout(){
    	localStorage.setItem(this.cartStorageString,JSON.stringify(this.cartStorage));
    	this.nav.push(CheckoutPage)
    }

}
