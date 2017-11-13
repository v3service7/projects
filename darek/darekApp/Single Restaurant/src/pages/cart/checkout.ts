import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, LoadingController, Nav, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import * as globalVariable from "../../app/global";

import { CustomersService,RestaurantsService } from '../../app/service/index';

import { LoginPage } from '../login/login';

import { CartPage } from './cart';

declare var google: any;

@Component({
	selector: 'page-checkout',
	templateUrl: 'checkout.html',
})
export class CheckoutPage {

	cartStorage : any = {};
    loading : any;
    currentTime : any;
    currentDate : any;
	completeDateMDYformat : any;

    /*laterDay:any;
    laterTime:any;*/

    event = {laterDay : '',laterTime : ''};
    laterPickupDay:any;
    laterPickupTime:any;
    laterDeliveryDay:any;
    laterDeliveryTime:any;
    laterDiffDays : number = 0;
	
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
    resId: string = globalVariable.resId;
	cartStorageString: string;


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

    monthArray : any = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    time24Array : any = ['0','13','14','15','16','17','18','19','20','21','22','23'];

	constructor(
		public navCtrl: NavController,
        public nav: Nav,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		private restaurantsService: RestaurantsService,
		private customerService: CustomersService,
		public toastCtrl: ToastController,
		private lf: FormBuilder,
        public alertCtrl: AlertController
		) {

		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //this.loadScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyAYQoBlDYqxMVhiiZFTzWljTUi84ZwoA6g&libraries=places,geometry','js');
        this.loading.present();

		if (localStorage.getItem('currentCustomer')) {
			this.loading.dismiss();
			this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));

            this.cartStorageString = 'cartStorage_' + this.resId;

			//this.cartStorage = navParams.get('cart');
			this.cartStorage = JSON.parse(localStorage.getItem(this.cartStorageString))

            if (this.cartStorage['orderMethod']) {
                if(this.cartStorage['orderMethod']['mType'] == 'Pickup'){
                    this.orderMethodSelect = 'pickup';
                    this.oMethod = true;
                    this.orderMethod = this.cartStorage['orderMethod'];
                }
                if(this.cartStorage['orderMethod']['mType'] == 'Delivery'){
                    this.orderMethodSelect = 'delivery';
                    this.del = true;
                    this.oMethod = true;
                    this.enterAddress = false;
                    this.orderMethod = this.cartStorage['orderMethod'];
                }
            }

            if (this.cartStorage['orderPayment']) {
                if(this.cartStorage['orderPayment']['cardinternet'] == true){
                    this.orderPaymentSelect = 'cardInternet';
                }
                if(this.cartStorage['orderPayment']['cardpickup'] == true){
                    this.orderPaymentSelect = 'cardPickup';
                }
                if(this.cartStorage['orderPayment']['cash'] == true){
                    this.orderPaymentSelect = 'cash';
                }
                this.orderPaymentFunction();
            }

            if (this.cartStorage['orderTime']) {
                if(this.cartStorage['orderTime']['tType'] == 'Now'){
                    this.orderTimeSelect = 'now';
                    this.orderTimeFunction();
                }
                if(this.cartStorage['orderTime']['tType'] == 'Later'){
                    this.orderTimeSelect = 'later';
                    this.showLater = true;
                    this.tMethod = true;
                    this.orderTime = this.cartStorage['orderTime'];

                    var datee1 = this.orderTime['day'].split(', ');
                    var datee2 = datee1[1].split('-');
                    var monthNo = this.monthArray.findIndex((mn)=>mn == datee2[1]);

                    this.event['laterDay'] = datee2[2] + '-' + (monthNo+1) + '-' + datee2[0];
                    this.laterDateFunction();
                    
                    var timee1 = this.orderTime['time'].split(' ');
                    var timee2 : string;
                    if (timee1[1] == 'AM') {
                        timee2 = timee1[0] + ':00';
                        this.event['laterTime'] = timee2;
                    }else{
                        var timee3 = timee1[0].split(':');
                        var date24Format = this.time24Array[timee3[0]];
                        this.event['laterTime'] = date24Format+':'+timee3[1]+':00';
                    }

                    this.laterTimeFunction();

                    /*setTimeout(()=>{
                        var x = document.getElementsByTagName('ion-datetime');
                        var day = x[0].getElementsByClassName('datetime-text');
                        var time = x[1].getElementsByClassName('datetime-text');
                        day[0].innerHTML = this.cartStorage['orderTime']['day'];
                        time[0].innerHTML = this.cartStorage['orderTime']['time'];
                        this.tMethod = true;
                    },500)*/
                }
            }

			this.totalAmount = this.cartStorage.gTotal;

			this.cartStorage['customerId'] = this.currentCustomer._id;
			this.getRestaurants();
			this.deliveryZone();
		}else{
			this.loading.dismiss();
			this.nav.setRoot(LoginPage);
		}
	}

    private initMap() {
        var input = <HTMLInputElement>document.getElementById('pac-input');
        var options = {};
        var autocomplete = new google.maps.places.Autocomplete(input,options);

        autocomplete.addListener('place_changed', ()=> {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            if (place.address_components) {
                var component = place.address_components;
                var country = null, state = null, city = null,cityAlt = null;

                for (var i = 0; i < component.length; i++) {
                    if (!city) {
                        if (component[i].types[0] == 'administrative_area_level_2') {
                            city = component[i].long_name;
                        }
                    }
                    if (!cityAlt) {
                        if (component[i].types[0] == 'locality') {
                            cityAlt = component[i].long_name;
                        }
                    }
                    if (!state) {
                        if (component[i].types[0] == 'administrative_area_level_1') {
                            state = component[i].long_name;
                        }
                    }
                    if (!country) {
                        if (component[i].types[0] == 'country') {
                            country = component[i].long_name;
                        }
                    }
                }
                if (cityAlt != null && city != null) {
                    this.addressForm.controls['city'].setValue(cityAlt+ ', '+city);
                }else if(cityAlt != null && city == null){
                    this.addressForm.controls['city'].setValue(cityAlt);
                }else{
                    this.addressForm.controls['city'].setValue(city);
                }
                this.addressForm.controls['state'].setValue(state);
                this.addressForm.controls['country'].setValue(country);
            }
        });
    }

	ionViewDidLoad() {
		this.addressForm = this.lf.group({
            streetName: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
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

    private getRestaurants() {
        this.restaurantsService.getOne(this.resId).subscribe(users => {
            this.restaurants = users.message;

            if (this.restaurants.orderforlater) {
                let pmindate : any;
                let pmintime : any;
                let dmindate : any;
                let dmintime : any;

                let temp = 24*60*60*1000;
                pmindate = this.restaurants.orderforlaterpickup['mindate'];
                pmintime = this.restaurants.orderforlaterpickup['mintime'];
                dmindate = this.restaurants.orderforlaterdelivery['mindate'];
                dmintime = this.restaurants.orderforlaterdelivery['mintime'];

                var time = new Date();
                
                this.laterPickupDay = new Date(time.getTime()+(parseInt(pmindate)*temp));
                this.laterDeliveryDay = new Date(time.getTime()+(parseInt(dmindate)*temp));

                this.laterPickupTime = new Date();
                this.laterPickupTime.setMinutes(time.getMinutes() + parseInt(pmintime));

                this.laterDeliveryTime = new Date();
                this.laterDeliveryTime.setMinutes(time.getMinutes() + parseInt(dmintime));

                var hour = this.addZero(time.getHours());
                var min = this.addZero(time.getMinutes());
                var sec = this.addZero(time.getSeconds());
                
                var date = this.addZero(time.getDate());
                var month = this.addZero(time.getMonth()+1);
                var year = time.getFullYear();

                this.currentDate = year+'-'+month+'-'+date;
                this.completeDateMDYformat = month+'-'+date+'-'+year;
                this.currentTime = hour+':'+min+':'+sec;

                console.log("this.currentDate");
                console.log(this.currentDate);
                console.log(this.currentTime);
                console.log(this.completeDateMDYformat);
                
                var hP = this.addZero(this.laterPickupTime.getHours());
                var mP = this.addZero(this.laterPickupTime.getMinutes());
                var sP = this.addZero(this.laterPickupTime.getSeconds());
                
                var hD = this.addZero(this.laterDeliveryTime.getHours());
                var mD = this.addZero(this.laterDeliveryTime.getMinutes());
                var sD = this.addZero(this.laterDeliveryTime.getSeconds());

                var dateP = this.addZero(this.laterPickupDay.getDate());
                var monthP = this.addZero(this.laterPickupDay.getMonth()+1);
                var yearP = this.laterPickupDay.getFullYear();

                var dateD = this.addZero(this.laterDeliveryDay.getDate());
                var monthD = this.addZero(this.laterDeliveryDay.getMonth()+1);
                var yearD = this.laterDeliveryDay.getFullYear();

                this.laterPickupTime = hP+':'+mP+':'+sP;
                this.laterDeliveryTime = hD+':'+mD+':'+sD;

                this.laterPickupDay = yearP+'-'+monthP+'-'+dateP;
                this.laterDeliveryDay = yearD+'-'+monthD+'-'+dateD;
            }


        });
    }
    
    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private deliveryZone(){
        this.restaurantsService.getAllDeliveryZone(this.resId).subscribe(users => {
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
            var imgPath = "assets/img/profile.png";
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
            
            setTimeout(()=>{
                this.initMap();
            },1000)
            if (this.cartStorage['orderPayment']) {
                delete this.cartStorage['orderPayment'];
                this.orderPaymentSelect = '';
                this.orderPaymentFunction();
            }
    		if (this.cartStorage['orderTime']) {
    			delete this.cartStorage['orderTime'];
    			this.orderTimeSelect = '';

    			this.orderTimeFunction();
    		}
    	}else{
    		this.del = false;
    		this.enterAddress = false;
    		this.oMethod = true;
    		this.orderMethod = {};
    		this.orderMethod['mType'] = 'Pickup';
    		this.cartStorage['orderMethod'] = this.orderMethod;
    		if (this.cartStorage['deliveryfee']) {
                this.cartStorage['gTotal'] = this.cartStorage['gTotal'] - this.cartStorage['deliveryfee'] - this.cartStorage['deliveryTax'];
                delete this.cartStorage['deliveryfee'];
                delete this.cartStorage['deliveryTax'];
    		}
    		if (this.cartStorage['orderPayment']) {
    			delete this.cartStorage['orderPayment'];
    			this.orderPaymentSelect = '';
    			this.orderPaymentFunction();
    		}
            if (this.cartStorage['orderTime']) {
                delete this.cartStorage['orderTime'];
                this.orderTimeSelect = '';
                this.orderTimeFunction();
            }
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
    	}

        if(time == 'later'){
            this.showLater = true;
            this.tMethod = false;
            this.orderTime = {};
            this.orderTime['tType'] = 'Later';
        }

        if(time == ''){
            this.showLater = false;
    		this.tMethod = false;
            delete this.orderTime;
            this.event = {laterDay : '',laterTime : ''};
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

			this.orderTime['day'] = day[0].innerHTML;

            var val2 = this.event.laterDay.split('-'); /*YMD*/

            var date1 = new Date(this.completeDateMDYformat);
            var date2 = new Date(val2[1]+'-'+val2[2]+'-'+val2[0]);

            var timeDiff = date2.getTime() - date1.getTime();
            this.laterDiffDays = timeDiff / (1000 * 3600 * 24);

            if (typeof this.orderTime['time'] != 'undefined') {
                if (this.laterDiffDays == 0) {
                    if (this.orderMethod.mType == 'Pickup') {
                        if (this.event.laterTime && this.event.laterTime < this.laterPickupTime) {
                            this.showAlert('pickup');
                            this.tMethod = false;
                        }else{
                            this.cartStorage['orderTime'] = this.orderTime;
                            this.tMethod = true;
                        }
                    }
                    if (this.orderMethod.mType == 'Delivery') {
                        if (this.event.laterTime && this.event.laterTime < this.laterDeliveryTime) {
                            this.showAlert('delivery');
                            this.tMethod = false;
                        }else{
                            this.cartStorage['orderTime'] = this.orderTime;
                            this.tMethod = true;
                        }
                    }
                }else{
                    this.cartStorage['orderTime'] = this.orderTime;
    				this.tMethod = true;
                }
            }else{
                this.tMethod = false;
            }
        },500)
	}

	private laterTimeFunction(){
		setTimeout(()=>{
			var timeId = document.getElementById('laterTime1');
			var time = timeId.getElementsByClassName('datetime-text');

			this.orderTime['time'] = time[0].innerHTML;
			if (typeof this.orderTime['day'] != 'undefined') {

                if (this.laterDiffDays == 0) {
                    if (this.orderMethod.mType == 'Pickup') {
                        if (this.event.laterTime && this.event.laterTime < this.laterPickupTime) {
                            this.showAlert('pickup');
                            this.tMethod = false;
                        }else{
                            this.cartStorage['orderTime'] = this.orderTime;
                            this.tMethod = true;
                        }
                    }
                    if (this.orderMethod.mType == 'Delivery') {
                        if (this.event.laterTime && this.event.laterTime < this.laterDeliveryTime) {
                            this.showAlert('delivery');
                            this.tMethod = false;
                        }else{
                            this.cartStorage['orderTime'] = this.orderTime;
                            this.tMethod = true;
                        }
                    }
                }else{
                    this.cartStorage['orderTime'] = this.orderTime;
                    this.tMethod = true;
                }
			}else{
                this.tMethod = false;
            }
	    },500);
	}

    private showAlert(type){
        if (type == 'pickup'){
            let alert = this.alertCtrl.create({
            title: 'Choose Date/Time Again!',
            subTitle: 'For Later Pickup Order, The order placement has to be at least: ' +this.restaurants.orderforlaterpickup['mintime']+ ' min before',
            buttons: ['OK']
            });
            alert.present();
        }
        if (type == 'delivery'){
            let alert = this.alertCtrl.create({
            title: 'Choose Date/Time Again!',
            subTitle: 'For Later Delivery Order, The order placement has to be at least: ' +this.restaurants.orderforlaterdelivery['mintime']+ ' min before',
            buttons: ['OK']
            });
            alert.present();
        }

        this.tMethod = false;
    }

    private saveAddressInfo(){
        this.zoneObject=[];
        this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "state": this.addressForm.value.state, "country": this.addressForm.value.country, "postcode": this.addressForm.value.postcode,"mType":'Delivery'};
        this.zoneCalculate(this.orderMethod);
    }

    private zoneCalculate(method){
        this.customerService.getLatLng(method).subscribe(data => {

            this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "state": this.addressForm.value.state, "country": this.addressForm.value.country, "postcode": this.addressForm.value.postcode,"lat": data.message.lat,"lng": data.message.lng,"mType":'Delivery'};
            
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
                if (this.restaurants['deliveryoutside']) {
                    let confirm = this.alertCtrl.create({
                    title: 'Outside our delivery zones!',
                    message: 'A delivery fee of $50 will be added for your location.',
                    buttons: [
                    {
                        text: 'Cancel',
                        handler: () => {
                            this.getToast('Delivery Not Available');
                            this.enterAddress = true;
                            this.oMethod = false;
                        }
                    },
                    {
                        text: 'Ok',
                        handler: () => {
                            this.deliveryFee = 50;
                            this.minAmount = 0;
                            this.enterAddress = false;
                            this.oMethod = true;
                            this.cartStorage.deliveryfee = this.deliveryFee;
                            this.cartStorage['gTotal'] = this.totalAmount + this.deliveryFee;
                        }
                    }
                    ]
                });
                confirm.present();
                }else{
                    this.getToast('Delivery Not Available');
                    this.enterAddress = true;
                    this.oMethod = false;
                    //this.addressForm.reset();
                }
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
        setTimeout(()=>{
            this.initMap();
        },1000)
    }

    private checkDisabled(){
    	if ((this.oMethod ==true) && (this.tMethod==true) && (this.pMethod==true)) {
    	 	return false;
    	}else{
    		return true;
    	}
    }

    private updateInfo(){
        localStorage.removeItem(this.cartStorageString);
        localStorage.setItem(this.cartStorageString,JSON.stringify(this.cartStorage));
        this.navCtrl.pop(CartPage)
    }
}
