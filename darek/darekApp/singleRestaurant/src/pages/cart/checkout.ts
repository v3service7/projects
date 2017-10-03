import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as globalVariable from "../../app/global";

import { CustomersService,RestaurantsService } from '../../app/service/index';

import { LoginPage } from '../login/login';

import { AwaitPage } from './await';

declare var google: any;

@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage {

	cartStorage : any = {};
	loading : any;
	laterDate : any;
	laterTime : any;
	orderMethodSelect : any;
	orderTimeSelect : any;
	orderPaymentSelect : any;
	restaurants : any = {};
	currentCustomer : any = {};
	orderMethod : any = {};
	orderTime : any = {};
	orderPayment : any;
	delivery : any = {};
	zoneObject : any = [];
	imageURL: string = globalVariable.imageUrl;


	deliveryFee : number;
	minAmount : number;
	totalAmount : number;

	addressForm:FormGroup;

	del : boolean = false;
	showLater : boolean = false;
	enterAddress : boolean;

	oMethod : boolean;
	tMethod : boolean;
	pMethod : boolean;

	constructor(
		public navCtrl: NavController,
        public nav: Nav,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		private restaurantsService: RestaurantsService,
		private customerService: CustomersService,
		public toastCtrl: ToastController,
		private lf: FormBuilder
		) {

		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loadScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyAYQoBlDYqxMVhiiZFTzWljTUi84ZwoA6g&libraries=places,geometry','js');
        this.loading.present();

		if (localStorage.getItem('currentCustomer')) {
			this.loading.dismiss();
			this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));

			/*this.cartStorage = navParams.get('cart');*/
			this.cartStorage = JSON.parse(localStorage.getItem('cartStorage_595172e2421a472120e0db5e'))

			this.totalAmount = this.cartStorage.gTotal;

			this.cartStorage['customerId'] = this.currentCustomer._id;
			this.getRestaurants(this.cartStorage.restaurantId);
			this.deliveryZone(this.cartStorage.restaurantId);
		}else{
			this.loading.dismiss();
			this.nav.setRoot(LoginPage);
		}
	}

	ionViewDidLoad() {
		this.addressForm = this.lf.group({
            streetName: ['', Validators.required],
            city: ['', Validators.required],
            postcode: ['', Validators.required],
        });
	}

	public loadScript(url,type) {
		if (type == 'js') {
			let node = document.createElement('script');
			node.src = url;
			node.type = 'text/javascript';
			document.getElementsByTagName('body')[0].appendChild(node);
		}
	}

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private deliveryZone(id){
        this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
            this.delivery = users.message;
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

    private customerImage(img){
    	if (typeof img != 'undefined' && img != null) {
            var imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            var imgPath = "../assets/img/profile.png";
        }
        return imgPath;
    }

    private orderMethodFunction(){
    	var method = this.orderMethodSelect;
    	if (method == 'delivery') {
    		this.del = true;
    		this.oMethod = false;
    		this.enterAddress = true;
    		this.orderMethod = {};
    		this.orderMethod['mType'] = 'Delivery';
    		if (this.cartStorage['orderPayment']) {
    			delete this.cartStorage['orderPayment'];
    			this.orderPaymentSelect = '';
    			this.orderPaymentFunction();
    		}
    	}else{
    		this.del = false;
    		this.enterAddress = false;
    		this.oMethod = true;
    		this.orderMethod = {};
    		this.orderMethod['mType'] = 'Pickup';
    		this.cartStorage['orderMethod'] = this.orderMethod;
    		if (this.cartStorage['deliveryfee']) {
    			delete this.cartStorage['deliveryfee'];
    		}
    		if (this.cartStorage['orderPayment']) {
    			delete this.cartStorage['orderPayment'];
    			this.orderPaymentSelect = '';
    			this.orderPaymentFunction();
    		}

    		this.cartStorage['deliveryfee'];
            this.cartStorage['gTotal'] = this.totalAmount;
    	}
    }

    private orderTimeFunction(){
    	var time = this.orderTimeSelect;
    	if (time == 'now') {
    		this.showLater = false;
    		this.tMethod = true;
    		this.orderTime = {};
    		this.orderTime['tType'] = 'Now';
    		this.orderTime['time'] = new Date();
    		this.cartStorage['orderTime'] = this.orderTime;
    	}else{
    		this.showLater = true;
    		this.tMethod = false;
    		this.orderTime = {};
    		this.orderTime['tType'] = 'Later';
    	}
    }

    private orderPaymentFunction(){
    	var pType = this.orderPaymentSelect;
    	if (pType=="cash") {
    		this.pMethod = true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":true, "cardpickup":false,"cardinternet":false}
        }
        if (pType=="cardPickup") {
        	this.pMethod = true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":false, "cardpickup":true,"cardinternet":false}
        }
        if (pType=="cardInternet") {
        	this.pMethod = true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":false, "cardpickup":false,"cardinternet":true}
        }

        if (pType == '') {
        	this.pMethod = false;
        	delete this.orderPayment;
        }

        if (typeof this.orderPayment != 'undefined') {
        	this.cartStorage['orderPayment'] = this.orderPayment;
        }
    }

	private laterDateFunction(){
        setTimeout(()=>{
			var dayId = document.getElementById('laterDate1');
			var day = dayId.getElementsByClassName('datetime-text');
			this.orderTime['day'] = day;
			if (typeof this.orderTime['time'] != 'undefined') {
				this.tMethod = true;
			}
        },500);
	}

	private laterTimeFunction(){
		setTimeout(()=>{
			var timeId = document.getElementById('laterTime1');
			var time = timeId.getElementsByClassName('datetime-text');
			this.orderTime['time'] = time;
			if (typeof this.orderTime['day'] != 'undefined') {
				this.tMethod = true;
			}
	    },500);
	}

    private saveAddressInfo(){
        this.zoneObject=[];
        this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"mType":'Delivery'};
        this.zoneCalculate(this.orderMethod);
    }

    private zoneCalculate(method){
        this.customerService.getLatLng(method).subscribe(data => {

            this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"lat": data.message.lat,"lng": data.message.lng,"mType":'Delivery'};
            /*localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));*/
            /*this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));*/
            
            let latLng = new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng);
            let latLngDeliveryAddress = new google.maps.LatLng(data.message.lat, data.message.lng);
            let map = new google.maps.Map(document.getElementById('gmap'), {
                zoom: 15,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
            let marker =  new google.maps.Marker({
                position: latLng,
                title: 'Location',
                map: map,
                draggable: true
            });
            let markerB =  new google.maps.Marker({
                position: latLngDeliveryAddress,
                title: 'Location',
                map: map,
                draggable: true
            });

            if (this.delivery.length > 0) {
	            for (var i = 0; i < this.delivery.length; i++) {
	                var zones = this.calculateDeliveryZone(this.delivery[i],latLngDeliveryAddress,map,marker);
	                if (typeof zones != 'undefined') {
	                    this.zoneObject.push(zones);
	                }
	            }
            }
            if (this.zoneObject.length > 0) {
                this.deliveryFee = parseInt(this.zoneObject[0].deliveryfee);
                for (var i = 0; i < this.zoneObject.length; i++) {
                    if (this.zoneObject[i].deliveryfee <= this.deliveryFee) {
                        this.deliveryFee = parseInt(this.zoneObject[i].deliveryfee);
                        this.minAmount = parseInt(this.zoneObject[i].amount);
                    }
                }
                this.cartStorage['orderMethod'] = method;
                this.enterAddress = false;
                this.oMethod = true;
                
                this.cartStorage['deliveryfee'] = this.deliveryFee;

                this.cartStorage['gTotal'] = this.totalAmount + this.deliveryFee;
            }
            if (this.zoneObject.length == 0) {
            	this.getToast('Delivery Not Available');
            	this.enterAddress = true;
            	this.oMethod = false;
            	this.addressForm.reset();
            }
        });
    }

    private calculateDeliveryZone(zoneObj,deliveryAddress,map,marker){
        if (zoneObj.type=='Circle') {
            let circle = new google.maps.Circle({
                map: map,
                clickable: false,
                radius: parseFloat(zoneObj.radius),
                //radius: 400,
                fillColor: '#fff',
                fillOpacity: .6,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8
            });
            circle.bindTo('center', marker, 'position');
            var isIn = circle.getBounds().contains(deliveryAddress);
            if (isIn) {
                return zoneObj;
            }
        }
        if(zoneObj.type=='Shape'){
            var polygonCord = [];
            var newArr = zoneObj.radius;
            var splitString = newArr.split('@');
            var splitStrlen = splitString.length;
            for (var k = 0; k < splitStrlen; k++) {
                var my_lat = splitString[k].split(',');
                polygonCord.push({ lat: parseFloat(my_lat[0]), lng: parseFloat(my_lat[1]) });
            }
            var mypolygone = new google.maps.Polygon({
                paths: polygonCord,
                strokeColor: zoneObj.color,
                fillColor: zoneObj.color,
            });
            mypolygone.setMap(map);
            var isWithinPolygon = google.maps.geometry.poly.containsLocation(deliveryAddress, mypolygone);
            if (isWithinPolygon) {
                return zoneObj;
            }
        }
    }

    private editAddress(){
    	this.enterAddress = true;
    	this.addressForm.patchValue(this.orderMethod);
    }

    private checkDisabled(){
    	if (this.oMethod && this.tMethod && this.pMethod) {
    	 	return false;
    	}else{
    		return true;
    	}
    }

    private placeOrder(){
        this.cartStorage['status'] = 'Received';
        if (this.cartStorage['orderPayment']['cardinternet']) {
            console.log("this.cartStorage");
            console.log(this.cartStorage);
        }else{
            this.customerService.addOrder(this.cartStorage).subscribe((data) => {
                if (data.error == false) {
                    localStorage.removeItem('cart_595172e2421a472120e0db5e');
                    localStorage.removeItem('cartStorage_595172e2421a472120e0db5e');
                    this.nav.setRoot(AwaitPage, {
                        order : data.message
                    })
                }
            });
        }
    }
}
