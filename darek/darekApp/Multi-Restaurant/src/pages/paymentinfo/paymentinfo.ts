import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as globalVariable from "../../app/global";

import { AwaitPage } from '../cart/await';
import { CartPage } from '../cart/cart';

@Component({
	selector: 'page-paymentinfo',
	templateUrl: 'paymentinfo.html',
})
export class PaymentinfoPage {

	cartDetail : any = {};
	paymentInfo : any = {};
	years : any = [];
	monthSelect : any = '01';
	yearSelect : any;
	cardNum : any;
	cardNumberErr : boolean = false;
	cvvErr : boolean = false;

	cartStorageString : string;

	resID: string;
	/*makePaymentModel : FormGroup;*/

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
	    public alertCtrl: AlertController,
	    private lf: FormBuilder
		) {

		this.cartDetail = navParams.get('cart');
		this.resID = navParams.get('resId');
		//this.cartStorageString = 'cartStorage_' + this.resID
		//this.cartDetail = JSON.parse(localStorage.getItem(this.cartStorageString));
		this.year();
	}

	ionViewDidLoad() {}

	private year(){
		let dateObj = new Date();
        let currentYear = dateObj.getFullYear();

        this.yearSelect = currentYear.toString();
        
        setTimeout(()=>{
        	this.paymentInfo['month'] = this.monthSelect;
        	this.paymentInfo['year'] = this.yearSelect;
        },1000)

        this.years.push(currentYear);
        for (var i = 0; i < 15; i++) {
            currentYear = currentYear+1;
            this.years.push(currentYear);
        }
	}


	private cancelPayment(){
		let alert = this.alertCtrl.create({
    		title: 'Cancel Payment!',
    		message: 'It will Cancel your payment process!',
    		buttons: [
	    		{
	    			text: 'Cancel'
	    		},
	    		{
	    			text: 'Confirm',
	    			handler: () => {
						this.nav.setRoot(CartPage,{
							resId : this.resID
						});
	    			}
	    		}
    		]
    	});
    	alert.present();
	}

	private selectFunction(type){
		if (type == 'monthSelect') {
			this.paymentInfo['month'] = this.monthSelect;
		}
		if (type == 'yearSelect') {
			this.paymentInfo['year'] = this.yearSelect;
		}
	}

	private countChar(event,type){
		if (type == 'cardNo' ) {
			let cardNum = event.target.value;
			if (cardNum.length < 16 || cardNum.length > 16) {
				this.cardNumberErr = true;
				if (typeof this.paymentInfo['cardNumber'] != 'undefined') {
					delete this.paymentInfo['cardNumber'];
				}
			}else{
				this.cardNumberErr = false;
				this.paymentInfo['cardNumber'] = cardNum;
			}
		}

		if (type == 'cvv' ) {
			let cvvNum = event.target.value;
			if (cvvNum.length < 3 || cvvNum.length > 3) {
				this.cvvErr = true;
				if (typeof this.paymentInfo['cvv'] != 'undefined') {
					delete this.paymentInfo['cvv'];
				}
			}else{
				this.cvvErr = false;
				this.paymentInfo['cvv'] = cvvNum;
			}
		}
	}

	private cardHolder(event){
		this.paymentInfo['name'] = event.target.value;

		console.log("this.paymentInfo");
		console.log(this.paymentInfo);
	}

	private checkDisable(){
		if (typeof this.paymentInfo['cvv'] != 'undefined' && typeof this.paymentInfo['cardNumber'] != 'undefined' ) {
			return false;
		}else{
			return true;
		}
	}
}
