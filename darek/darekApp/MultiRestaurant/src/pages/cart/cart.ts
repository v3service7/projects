import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantsService, PromotionsService, CustomersService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { CheckoutPage } from './checkout';
import { AwaitPage } from './await';
import { PaymentinfoPage } from '../paymentinfo/paymentinfo';

@Component({
	selector: 'page-cart',
	templateUrl: 'cart.html',
})
export class CartPage {
	cart : any = [];
	cartString : any = String;
	promotionString : any = String;
	cartStorageString : any = String;
	coupon : any = String;
	appliedCode : any = String;
	subTotal : number = 0;
	cartTotal : number = 0;
	minCartAmount : number;
	deliveryfee : number = 0;
	discountAmount : number;
	cartTotalAfterDiscount : number;
	index : number;
	totalWithTax : number = 0;
	restaurants : any = {};
	cartStorage : any = {};
	allPromotions : any = [];
	restroPromotions : any = [];
	currentCustomer : any;
	promotion : any;
    imageURL: string = globalVariable.imageUrl;
	resId: string;
	noCode : boolean = true;
	typeCode : boolean = false;
	haveCode : boolean = false;

    currentDate:any;
	subTotalString:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    currentTime : string;

    spicyArray : any = [1,2,3];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
	    private restaurantsService: RestaurantsService,
	    private promotionsService: PromotionsService,
	    private customerService: CustomersService,
	    public alertCtrl: AlertController
		) {
        this.resId = navParams.get('resId');
	}

	ionViewDidEnter() {
        this.resId = this.navParams.get('resId');

        this.deliveryfee = 0;

        this.currentDateTime();
        this.getRestaurants();
        this.cartString = 'cart_' + this.resId;
        this.subTotalString = 'subTotal_' + this.resId;
        this.cartStorageString = 'cartStorage_' + this.resId;
		this.promotionString = 'promotion_' + this.resId;
		this.coupon = 'coupon_' + this.resId;
		if (localStorage.getItem(this.cartString)) {
			this.cart = JSON.parse(localStorage.getItem(this.cartString));
		}
		if (localStorage.getItem(this.promotionString)) {
			this.promotion = JSON.parse(localStorage.getItem(this.promotionString));
		}

		if (localStorage.getItem(this.subTotalString)) {
			this.cartTotal = JSON.parse(localStorage.getItem(this.subTotalString));
		}

		if (localStorage.getItem(this.cartStorageString)) {
			this.cartStorage = JSON.parse(localStorage.getItem(this.cartStorageString));
			if (typeof this.cartStorage['deliveryfee'] != 'undefined') {
				this.deliveryfee = this.cartStorage['deliveryfee'];
			}
			if(this.cartStorage['customerId']){
				this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
			}
		}

		this.loadAllPromotions();
	}

    private hideCustomMessage(){
        delete this.restaurants.checkoutMessage;
    }

	private currentDateTime(){
		this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());

        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth()+1);
        var year = this.currentDate.getFullYear();
        
        this.currentTime = h+':'+m;

        this.completeDate = date+'-'+month+'-'+year;


        this.time = h+':'+m +':'+ s;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.day = days[this.currentDate.getDay()];
	}

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private checkDisablePlaceOrderBtn(){
        if (this.cartStorage['subTotal'] != 0 && typeof this.cartStorage['orderPayment'] != 'undefined') {
            return false;
        }else{
            return true;
        }
    }

    private loadAllPromotions() {
        this.promotionsService.getAll().subscribe(pro => {
        	this.allPromotions = pro.message;
        	console.log("this.allPromotions");
        	console.log(this.allPromotions);
	        if (this.promotion) {
	        	if (this.promotion.promotion && this.promotion.promotion['promotionId']) {
	            	this.index = this.allPromotions.findIndex(mn => mn._id == this.promotion.promotion['promotionId'][0]);
	        	}
	        }
        });
    }

    private getRestaurants() {
        this.restaurantsService.getOne(this.resId).subscribe(users => {
            this.restaurants = users.message;
            console.log("this.restaurants");
            console.log(this.restaurants);
            this.loadAllRestroPromotions();
            this.calculateTotal();
        });
    }

    private loadAllRestroPromotions(){
        this.promotionsService.getRestroPromotions(this.resId).subscribe(data => {
            for (var i = 0; i < data.message.length; i++) {
                if (data.message[i].status == true) {
                    var returnValue = this.displayPromotion(data.message[i]);

                    if (returnValue == 'block') {
                        this.restroPromotions.push(data.message[i]);
                    }
                }
            }

			if (localStorage.getItem(this.coupon)) {
				this.noCode = false;
				this.haveCode = true;
				this.appliedCode = JSON.parse(localStorage.getItem(this.coupon));
				this.applyCouponCodeonLoad();
			}
        });
    }

    private displayPromotion(promo){
        if ((this.completeDate >= promo.discountTiming[0].available.from && this.completeDate <= promo.discountTiming[0].available.till) || promo.discountTiming[0].available == 'unlimited') {
            for (var i in promo.discountTiming[0].days) {
                if (this.day == i) {
                    var ch = i+'time';
                    if (typeof promo.discountTiming[0].days[ch] !=  'undefined') {
                        if (promo.discountTiming[0].days[ch]['opentime'] <= this.currentTime && promo.discountTiming[0].days[ch]['closetime'] >= this.currentTime) {
                            return 'block';
                        }
                    }

                    if (typeof promo.discountTiming[0].days[ch] == 'undefined') {
                        return 'block';
                    }
                }
            }
        }else{
            return 'none';
        }
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
            var imgPath = "assets/img/itemimage.gif";
        }
        return imgPath;
    }

	private decreaseQuantity(i){
    	let singleItemPrice = this.cart[i].totalPrice/this.cart[i].quantity;
    	var tempCartPrice = this.cartTotal - singleItemPrice;
    	console.log("tempCartPrice");
    	console.log(tempCartPrice);
    	if (this.promotion){
    		if(this.index == 6) {
	            if (tempCartPrice >= this.promotion['promotion']['minCartAmount']) {
	            	this.decrease(i,singleItemPrice);
	            }else{
	            	let alert = this.alertCtrl.create({
		    		title: 'Alert!',
		    		message: 'Decreasing Quantity will remove ur deal!',
		    		buttons: [
			    		{
			    			text: 'Cancel'
			    		},
			    		{
			    			text: 'Confirm',
			    			handler: () => {
			    				delete this.promotion;
			    				delete this.cartStorage['promotion'];
			    				localStorage.removeItem(this.promotionString);
			    				this.decrease(i,singleItemPrice);
			    			}
			    		}
		    		]
		    	});
		    	alert.present();
	            }
	        }else{
	    		this.decrease(i,singleItemPrice)
	        }
	    }

	    if(typeof this.cartStorage['promotion'] != 'undefined' && typeof this.appliedCode != 'undefined' && typeof this.promotion == 'undefined'){
	    	let alert = this.alertCtrl.create({
		    		title: 'Alert!',
		    		message: 'Decreasing Quantity will remove ur deal!',
		    		buttons: [
			    		{
			    			text: 'Cancel'
			    		},
			    		{
			    			text: 'Confirm',
			    			handler: () => {
			    				this.removeCode();
			    				this.decrease(i,singleItemPrice);
			    			}
			    		}
		    		]
		    	});
		    	alert.present();
	    }

	    if(typeof this.cartStorage['promotion'] == 'undefined' && typeof this.promotion == 'undefined' && typeof this.appliedCode == 'undefined'){
	    	this.decrease(i,singleItemPrice);
	    }
    }

    private decrease(i,singleItemPrice){
    	if (this.cart[i].quantity >1) {
	    	this.cart[i].quantity = this.cart[i].quantity - 1;
	    	this.cart[i].totalPrice = singleItemPrice * this.cart[i].quantity;

            localStorage.removeItem(this.cartString);
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

            localStorage.removeItem(this.cartString);
	    	localStorage.setItem(this.cartString,JSON.stringify(this.cart));
	    	this.calculateTotal();
	    }else{
	    	this.getToast('Maximum quantity to buy this item');
	    }
	    if (this.cartStorage['promotion'] && typeof this.appliedCode != 'undefined') {
            this.removeCode();
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
                        localStorage.removeItem(this.cartString);
	    				localStorage.setItem(this.cartString,JSON.stringify(this.cart));
	    				this.calculateTotal();
	    			}
	    		}
    		]
    	});
    	alert.present();
    }

    private deletePromotion(){
    	let alert = this.alertCtrl.create({
    		title: 'Delete Deal!',
    		buttons: [
	    		{
	    			text: 'Cancel'
	    		},
	    		{
	    			text: 'Delete',
	    			handler: () => {
	    				delete this.promotion;
	    				delete this.cartStorage['promotion'];
	    				localStorage.removeItem(this.promotionString);
	    				this.calculateTotal();
	    			}
	    		}
    		]
    	});
    	alert.present();
    }

    private calculateTotal(){
    	this.cartTotal = 0;

    	if (this.promotion) {
    		this.cartStorage['promotion'] = this.promotion;
    		this.subTotal = this.promotion.total;
    	}else{
    		this.subTotal = 0;
    	}

    	for (var i = 0; i < this.cart.length; i++) {
    		this.subTotal = this.subTotal + this.cart[i].totalPrice;

    		this.cartTotal = this.cartTotal + this.cart[i].totalPrice;

            localStorage.removeItem(this.subTotalString);
    		localStorage.setItem(this.subTotalString,JSON.stringify(this.cartTotal));
    	}

    	this.cartStorage['orders'] = this.cart;
    	this.cartStorage['subTotal'] = this.subTotal;

    	if (typeof this.discountAmount != 'undefined') {
    		this.cartStorage['discountAmount'] = this.discountAmount;
    	}


    	this.cartStorage['restaurantId'] = this.resId;

    	if (typeof this.restaurants.taxation != 'undefined') {
		    let tax = parseInt(this.restaurants.taxation.tax);

    		if (typeof this.cartTotalAfterDiscount != 'undefined') {
                if (this.restaurants.taxation['menuTax'] == 'Apply Tax') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {
                        this.cartStorage['tax'] = (tax/100)*(this.cartTotalAfterDiscount+ this.deliveryfee);
                        this.totalWithTax = ((tax + 100)/100)*(this.cartTotalAfterDiscount + this.deliveryfee);
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {
                        this.cartStorage['tax'] = (tax/100)*this.cartTotalAfterDiscount;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryfee;
                        console.log("deliveryTax ", deliveryTax);
                        if (deliveryTax > 0) {
                            this.cartStorage['deliveryTax'] = deliveryTax.toFixed(2);
                        }

                        this.totalWithTax = this.cartTotalAfterDiscount + this.deliveryfee + deliveryTax + this.cartStorage['tax'];
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                }

                if (this.restaurants.taxation['menuTax'] == 'Already Include') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {
                        this.cartStorage['tax'] = 0;
                        this.totalWithTax = this.deliveryfee + this.cartTotalAfterDiscount;
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {
                        this.cartStorage['tax'] = 0;
                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryfee;
                        console.log("deliveryTax ", deliveryTax);
                        if (deliveryTax > 0) {
                            this.cartStorage['deliveryTax'] = deliveryTax.toFixed(2);
                        }

                        this.totalWithTax = this.cartTotalAfterDiscount + this.deliveryfee + deliveryTax;
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                }
    		}else{
                if (this.restaurants.taxation['menuTax'] == 'Apply Tax') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {
                        this.cartStorage['tax'] = (tax/100)*(this.subTotal+ this.deliveryfee);
                        this.totalWithTax = ((tax + 100)/100)*(this.subTotal + this.deliveryfee);
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {
                        this.cartStorage['tax'] = (tax/100)*this.subTotal;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryfee;
                        console.log("deliveryTax ", deliveryTax);
                        if (deliveryTax > 0) {
                            this.cartStorage['deliveryTax'] = deliveryTax.toFixed(2);
                        }

                        this.totalWithTax = this.subTotal + this.deliveryfee + deliveryTax + this.cartStorage['tax'];
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                }

                if (this.restaurants.taxation['menuTax'] == 'Already Include') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {
                        this.cartStorage['tax'] = 0;
                        this.totalWithTax = this.deliveryfee + this.subTotal;
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {
                        this.cartStorage['tax'] = 0;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryfee;
                        console.log("deliveryTax ", deliveryTax);
                        if (deliveryTax > 0) {
                            this.cartStorage['deliveryTax'] = deliveryTax.toFixed(2);
                        }

                        this.totalWithTax = this.subTotal + this.deliveryfee + deliveryTax;
                        this.cartStorage['gTotal'] = this.totalWithTax;
                    }
                }
		    	/*this.cartStorage['tax'] = (tax/100)*this.subTotal;
		    	this.totalWithTax = ((tax + 100)/100)*this.subTotal + this.deliveryfee;
	    		this.cartStorage['gTotal'] = this.totalWithTax;*/
    		}
	    }else{
	    	this.cartStorage['tax'] = 0;
	    	if (typeof this.cartTotalAfterDiscount != 'undefined') {
	    		this.totalWithTax = this.cartTotalAfterDiscount + this.deliveryfee;
    			this.cartStorage['gTotal'] = this.totalWithTax;
    		}else{
    			this.totalWithTax = this.subTotal + this.deliveryfee;
    			this.cartStorage['gTotal'] = this.totalWithTax;
    		}
	    }

	    console.log("this.cartStorage");
	    console.log(this.cartStorage);
    }

    private showField(){
    	this.noCode = false;
    	this.typeCode = true;
    }

    private applyCode(){
    	var index = this.restroPromotions.findIndex(mn=> mn.couponcode && mn.couponcode.code == this.appliedCode);
    	if (index > -1) {
            this.performCodeCalculation(index);
        }else{
        	this.getToast('Invalid Coupon Code');
        }
    }

    private performCodeCalculation(index){
        this.minCartAmount = this.restroPromotions[index].minCartAmount;
        if (this.cartStorage['subTotal'] >= this.minCartAmount) {

        	this.typeCode = false;
        	this.haveCode = true;
            
            localStorage.setItem(this.coupon,JSON.stringify(this.appliedCode))

            /*this.promotion = this.restroPromotions[index]*/
            this.cartStorage['promotion'] = {'promotion' : this.restroPromotions[index]};

            let promoIndex = this.allPromotions.findIndex(abc=> abc._id == this.restroPromotions[index].promotionId[0]);
            if (promoIndex == 4) {
                if (typeof this.deliveryfee != 'undefined') {
                    this.discountAmount = ((this.restroPromotions[index].discountPercent)/100)*this.deliveryfee;
                }else{
                	delete this.appliedCode;
                	this.getToast('Code Applicable on Delivery charges');
                }
            }else if(promoIndex == 2){
                this.discountAmount = this.restroPromotions[index].discountAmount;
                console.log("this.discountAmount");
                console.log(this.discountAmount);
                this.cartTotalAfterDiscount = this.cartStorage['subTotal'] - this.discountAmount;
                this.calculateTotal();
            }else{
                this.discountAmount = (this.restroPromotions[index].discountPercent/100)*this.cartStorage['subTotal'];
                console.log("this.discountAmount");
                console.log(this.discountAmount);
                this.cartTotalAfterDiscount = this.cartStorage['subTotal'] - this.discountAmount;
                this.calculateTotal();
            }
        }else{
        	delete this.appliedCode;
            this.getToast('To apply this coupon, Min order amount should be ' + this.minCartAmount);
        }
    }

    private applyCouponCodeonLoad(){
        var index = this.restroPromotions.findIndex(mn=> mn.couponcode.code == this.appliedCode);
        if (index > -1) {
            this.cartStorage['promotion'] = {'promotion' : this.restroPromotions[index]};

            let promoIndex = this.allPromotions.findIndex(abc=> abc._id == this.restroPromotions[index].promotionId[0]);
            if (promoIndex == 4) {
                if (typeof this.deliveryfee != 'undefined') {
                    this.discountAmount = (this.restroPromotions[index].discountPercent/100)*this.deliveryfee;
                    this.deliveryfee = this.deliveryfee - this.discountAmount;
                    this.cartStorage['deliveryfee'] = this.deliveryfee;
                }
            }else if(promoIndex == 2){
                this.discountAmount = this.restroPromotions[index].discountAmount;
                this.cartTotalAfterDiscount = this.cartStorage.subTotal - this.discountAmount;
                this.calculateTotal();
            }else{
                this.discountAmount = (this.restroPromotions[index].discountPercent/100)*this.cartStorage.subTotal;
                this.cartTotalAfterDiscount = this.cartStorage.subTotal - this.discountAmount;
                this.calculateTotal();
            }
        }
    }

    private removeCode(){
    	this.noCode = true;
    	this.typeCode = false;
    	this.haveCode = false;
    	delete this.appliedCode;
    	delete this.cartStorage['promotion'];
    	delete this.cartStorage['discountAmount'];
    	delete this.cartTotalAfterDiscount;
    	delete this.discountAmount;
    	localStorage.removeItem(this.coupon);

    	this.calculateTotal();
    }

    private countCharacter(event){
    	this.appliedCode = event.target.value;
    	console.log(this.appliedCode)
    }

    private comment(event){
    	this.cartStorage['comment'] = event.target.value;
    }

    private addDetail(){
        localStorage.removeItem(this.cartStorageString);
    	localStorage.setItem(this.cartStorageString,JSON.stringify(this.cartStorage));
    	this.navCtrl.push(CheckoutPage,{
            resId : this.resId
        })
    }

    private placeOrder(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.cartStorage['status'] = 'Received';
        if (this.cartStorage['promotion']) {
        	this.cartStorage['isPromotion'] = true;
        }else{
        	this.cartStorage['isPromotion'] = false;
        }

        if (this.cartStorage['orderPayment']['cardinternet']) {
            this.nav.setRoot(PaymentinfoPage,{
                cart : this.cartStorage, resId : this.resId
            })
            console.log("this.cartStorage");
            console.log(this.cartStorage);
            loading.dismiss();
        }else{
            this.customerService.addOrder(this.cartStorage).subscribe((data) => {
                if (data.error == false) {
                    localStorage.removeItem(this.cartString);
                    localStorage.removeItem(this.subTotalString);
                    localStorage.removeItem(this.cartStorageString);
                    localStorage.removeItem(this.promotionString);
                    localStorage.removeItem(this.coupon);
                    this.nav.setRoot(AwaitPage,{
                        resId : this.resId
                    });
                    loading.dismiss();
                }
            });
        }
    }

}
