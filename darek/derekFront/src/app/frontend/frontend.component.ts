import { Component, OnInit, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService,CustomersService} from '../service/index';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as globalVariable from "../global";
import { FlashMessagesService } from 'angular2-flash-messages';
import {TranslateService} from 'ng2-translate';

declare var google: any;

@Component({
    selector: 'app-frontendheader',
    templateUrl: './frontendheader.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendHeaderComponent implements OnInit {
    @Input() ids: string;
    restaurants: any = {};
    cart:any =[];
    currentCustomer:any;
    constructor(
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private customerService: CustomersService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        ) { }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            this.cart = JSON.parse(localStorage.getItem('cart'));
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        });
    }
    logout(){
        this.customerService.customerLogout();
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            
        });
    }
}

@Component({
    selector: 'app-frontend',
    templateUrl: './frontend.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendComponent implements OnInit {
    restaurants: any = {};
    menus: any = [];
    items: any = [];
    addOns: any = [];
    detailShow: String;
    price: number;
    finalPrice: number;
    addonPrice: number;
    multiSizePrice: number;
    quantity: number;
    orderItem: any={};
    totalOrder: any;
    imageURL: string = globalVariable.imageUrl;
    count: any= 1;
    currentCustomer:any;
    constructor(
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private kitchenMenuService: KitchenMenuService,
        private kitchenMenuItemService: KitchenItemService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        ) {}
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            var cartalready = JSON.parse(localStorage.getItem('cart'));
            if(cartalready){
                this.totalOrder = JSON.parse(localStorage.getItem('cart'));
            }else{
                localStorage.setItem('cart','[]');
            }
        });
    }
    private loadAllUsers(id) {
        this.kitchenMenuService.getAll(id).subscribe(users => {       
            this.menus = users.message;
            this.menus.image=this.imageURL+this.menus.image;
        });
    }
    private loadAllItem() {
        this.kitchenMenuItemService.getAll().subscribe(users => { 
            this.items = users.message;
            this.items.image=this.imageURL+this.items.image;
        });
        this.kitchenMenuService.getAllAddOn(this.restaurants._id).subscribe(data => {
            this.addOns = data.message;
        });
    }
    private showDiv(id) {
        if (this.detailShow == id) {
            return 'block';
        }
    }
    private hideDiv() {
        this.detailShow=''; 
    }
    private addToCart() {   
        this.totalOrder = JSON.parse(localStorage.getItem('cart'));
        this.totalOrder.push(this.orderItem);
        localStorage.setItem('cart', JSON.stringify(this.totalOrder));
        this.detailShow='';
    }
    private addonPriceInfo(addonObj,addonDetail) {
        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');
        if (isCheck == 'check') {
            document.getElementById(id).style.backgroundColor = '#e1eef5';
            document.getElementById(id).setAttribute('data-addon','uncheck');
            this.orderItem.addon.push(addonObj);
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            document.getElementById(id).style.backgroundColor = '#fff';
            document.getElementById(id).setAttribute('data-addon','check');
            this.addonPrice = this.addonPrice - parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }
    private multiSizePriceInfo(itemMultiSizeObj) {
        this.orderItem.multisize = itemMultiSizeObj;
        this.multiSizePrice = parseInt(itemMultiSizeObj.price);
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }
    private quantityIncrement() {
        this.quantity = this.quantity +1;
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }
    private quantityDecrement() {
        if(this.quantity > 1){
            this.quantity = this.quantity -1; 
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
            this.orderItem.totalPrice = this.finalPrice;
            this.orderItem.quantity = this.quantity;
        }
    }
    private showDetail(itemObj,itemMultiSizeObj) {
        this.detailShow = itemObj._id;

        this.multiSizePrice = 0;  
        this.price = 0;
        this.finalPrice = 0;
        this.addonPrice = 0;
        this.quantity = 1;
        this.multiSizePrice = parseInt(itemMultiSizeObj.price);  
        this.price = parseInt(itemObj.price);
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.item = itemObj; 
        this.orderItem.multisize = itemMultiSizeObj; 
        this.orderItem.addon = [];
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;    
            this.loadAllUsers(this.restaurants._id);
            this.loadAllItem(); 
        });
    }
}

@Component({
    selector: 'app-frontendDetail',
    templateUrl: './frontendDetail.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendDetailComponent implements OnInit {
    restaurants: any = {};
    delivery: any = {};
    deliverys: any = [];
    mypolygone: any = [];
    mergeCircleShape: any = [];
    cart:any=[];
    lat: any;
    lng: any;
    lang:string='en';
    translatedText: string;
    constructor(
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            this.deliveryZone(id);
            this.cart = JSON.parse(localStorage.getItem('cart'));
        });
        this.translate.setDefaultLang(this.lang);
    }
    selectLang(lang: string) {
        this.lang = lang;
        this.translate.setDefaultLang(this.lang);
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.lat = this.restaurants.lat;
            this.lng = this.restaurants.lng;        
        });
    }
    private deliveryZone(id){
        this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
            this.delivery = users.message;
            this.deliverys = users.message;
            this.selectCircle();
        });
    }
    private selectCircle() {        
        let mapProp = {
            center: new google.maps.LatLng(this.lat, this.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("gmap"), mapProp);
        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
        for (var key in this.deliverys) {
            // Add the circle for this city to the map.
            if (this.deliverys[key].type == 'Circle') {
                var newCobj = new google.maps.Circle({
                    strokeColor: this.deliverys[key].color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: this.deliverys[key].color,
                    fillOpacity: 0.6,
                    map: map,
                    center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
                    radius: parseFloat(this.deliverys[key].radius)
                });
                this.mergeCircleShape.push(newCobj);
            }
            else {
                var polygonCord = [];
                var newArr = this.deliverys[key].radius;
                var splitString = newArr.split('@');
                var splitStrlen = splitString.length;

                for (var k = 0; k < splitStrlen; k++) {
                    var my_lat = splitString[k].split(',');
                    polygonCord.push({ lat: parseFloat(my_lat[0]), lng: parseFloat(my_lat[1]) });
                }
                this.mypolygone = new google.maps.Polygon({
                    paths: polygonCord,
                    strokeColor: this.deliverys[key].color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: this.deliverys[key].color,
                    fillOpacity: 0.6
                });
                this.mypolygone.setMap(map);
            }
        }
    }
}

@Component({
    selector: 'app-frontendCart',
    templateUrl: './frontendCart.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendCartComponent implements OnInit {
    restaurants: any = {};
    delivery: any = {};
    order: any = {};
    cartDetail: any = {};
    objForUpdate: any = {};
    cart:any=[];
    user = [];
    zoneObject = [];
    deliveryFee : number;
    amount : number;
    showHideContactDetail:boolean;
    showHideOrderingMethod:boolean;
    showHideTime:boolean;
    showHidePaymentMethod:boolean;
    editOrderMethod:boolean;
    editTimeMethod:boolean;
    editPaymentMethod:boolean;
    del:boolean;
    flagForTime:boolean =false;
    flagForPayment:boolean =false;
    addDetail:boolean =false;
    orderType:boolean =false;
    addTime:boolean =false;
    paymentMethod:boolean =false;
    cartZero:boolean =false;
    all:boolean=false;
    delLater:boolean;
    addressClicked:boolean;
    grandTotal:number;
    grandTotalWithTax:number = 0;
    currentCustomer:any;
    deliveryAddress:Boolean = false;
    orderMethod:any={};
    orderTime:any={};
    orderPayment:any={};
    //orderTime:any;
    //orderPayment:any;
    detailForm:FormGroup;
    addressForm:FormGroup;
    day :any = 'today';
    days:any = [{day : "today"}, {day: "tomorrow"}];
    time:any = '8:00';
    times:any = [{time:"8:00"},{time:"9:00"},{time:"10:00"},{time:"11:00"},{time:"12:00"},{time:"13:00"},{time:"14:00"},{time:"15:00"},{time:"16:00"},{time:"17:00"},{time:"18:00"},{time:"19:00"},{time:"20:00"}]

    constructor(
        private lf: FormBuilder,
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private customerService: CustomersService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ) {
        this.showHideContactDetail = false;
        this.showHideOrderingMethod = false;
        this.showHideTime = false;
        this.showHidePaymentMethod = false;
        this.del = false;
        this.delLater = false;
        this.addressClicked = true;
        this.editOrderMethod = false;
        this.editTimeMethod = false;
        this.editPaymentMethod = false;
    }

    ngOnInit() {
        this.addressForm = this.lf.group({
            streetName: ['', Validators.required],
            city: ['', Validators.required],
            postcode: ['', Validators.required],
        });
        this.detailForm = this.lf.group({
            _id:['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            phonenumber: ['', Validators.required],
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.cartDetail.restaurantId=id;
            this.getRestaurants(id);
            this.deliveryZone(id);
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        if (JSON.parse(localStorage.getItem('orderMethod')) != null) {
            this.orderMethod = JSON.parse(localStorage.getItem('orderMethod'));
            this.zoneCalculate(this.orderMethod);
            this.editOrderMethod = true;
            this.orderType = true;
            this.saveInfo();
            this.deliveryAddress=true;
        }
        if (JSON.parse(localStorage.getItem('orderTime')) != null) {
            this.orderTime = JSON.parse(localStorage.getItem('orderTime'));
            this.editTimeMethod = true;
            this.addTime = true;
            this.saveInfo();
            this.flagForTime=true;
        }
        if (JSON.parse(localStorage.getItem('orderPayment')) != null) {
            this.orderPayment = JSON.parse(localStorage.getItem('orderPayment'));
            this.editPaymentMethod = true;
            this.paymentMethod = true;
            this.saveInfo();
            this.flagForPayment=true;
        }

        if(this.currentCustomer){
            let custId = this.currentCustomer._id;
            this.addDetail=true;
            this.detailForm.patchValue(this.currentCustomer);
            this.cartDetail.customerId=custId;
            this.saveInfo();
        }
        this.cart = JSON.parse(localStorage.getItem('cart'));
        if (this.cart.length > 0) {
            this.cartDetail.orders = this.cart;
            this.cartZero = true;
            this.saveInfo();
        }
        if(typeof this.orderMethod != 'undefined'){
            this.addressForm.patchValue(this.orderMethod);
        }
        this.deliveryFee = 0;
    }
    private saveDetailInfo(){     
        this.customerService.updateCustomer(this.detailForm.value).subscribe(
            (data) => {
                localStorage.setItem('currentCustomer', JSON.stringify(this.detailForm.value));
                this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            }
        );
        this.addDetail=true;
        this.saveInfo();
        this.changeShowDetailStatus();
    }
    private addressButton(id){
        if (id=="pickup") {
            this.orderMethod = {};
            this.orderMethod.mType ='Pickup';
            this.deliveryAddress = true; 
            this.del=false;
        }
        else if (id=="delivery") {
            this.del=true;
            this.orderMethod.mType = 'Delivery';
            this.addressClicked = true;
            this.deliveryAddress = false;
        }
    }
    private pickupOnly(){
        localStorage.setItem('orderMethod', JSON.stringify(this.orderMethod));
        this.orderMethod = JSON.parse(localStorage.getItem('orderMethod'));
        this.cartDetail.orderMethod=this.orderMethod;        
        this.orderType=true;
        this.saveInfo();
        this.showHideOrderingMethod =false;
        this.editOrderMethod = true;
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
    private zoneCalculate(method){
        this.customerService.getLatLng(method).subscribe(data => {
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
            for (var i = 0; i < this.delivery.length; i++) {
                var zones = this.calculateDeliveryZone(this.delivery[i],latLngDeliveryAddress,map,marker);
                if (typeof zones != 'undefined') {
                    this.zoneObject.push(zones);
                }
            }
            if (this.zoneObject.length > 0) {
                this.deliveryFee = parseInt(this.zoneObject[0].deliveryfee);
                for (var i = 0; i < this.zoneObject.length; i++) {
                    if (this.zoneObject[i].deliveryfee <= this.deliveryFee) {
                        this.deliveryFee = parseInt(this.zoneObject[i].deliveryfee);
                        this.amount = parseInt(this.zoneObject[i].amount);
                    }
                }
                this.cartDetail.deliveryfee = this.deliveryFee;
                this.update();
            }
        });
    }

    private saveAddressInfo(){
        this.zoneObject=[];
        this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"mType":'Delivery'};
        this.zoneCalculate(this.orderMethod);
        localStorage.setItem('orderMethod', JSON.stringify(this.orderMethod));
        this.orderMethod = JSON.parse(localStorage.getItem('orderMethod'));
        this.cartDetail.orderMethod = this.orderMethod;
        this.orderType=true;
        this.editOrderMethod = true;
        this.saveInfo();
        this.changeShowOrderingStatus();
    }
    private editOrder(){
        this.editOrderMethod = !this.editOrderMethod;
        this.showHideOrderingMethod = true;
        this.deliveryAddress = true;
    }
    private setTime(id){
        if (id=="now") {
            this.delLater=false;
            this.orderTime = {};
            this.orderTime.tType = 'Now';
            this.flagForTime=true;
        }
        else if (id=="later") {            
            this.delLater=true;
            this.orderTime = {};
            this.orderTime.tType = 'Later';
            this.flagForTime=true;
        }
    }
    private saveTimeInfo(){
        if (this.orderTime.tType == 'Later') {
            this.orderTime = {"day":this.day, "time":this.time, "tType": 'Later'}
        }
        if (this.orderTime.tType == 'Now') {
            var date = Date();
            this.orderTime = {"time":date,  "tType": 'Now'}
        }
        localStorage.setItem('orderTime', JSON.stringify(this.orderTime));
        this.orderTime = JSON.parse(localStorage.getItem('orderTime'));
        this.cartDetail.orderTime = this.orderTime;
        this.editTimeMethod = true;
        this.addTime=true;
        this.saveInfo();
        this.changeShowTimingStatus();
    }
    private editTime(){
        this.editTimeMethod =!this.editTimeMethod;
        this.showHideTime = true;
    }
    private paymentOption(id){
        if (id=="cash") {
            this.flagForPayment=true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":true, "cardpickup":false,"cardinternet":false}
        }
        if (id=="cardInHand") {
            this.flagForPayment=true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":false, "cardpickup":true,"cardinternet":false}
        }
        if (id=="cardInternet") {
            this.flagForPayment=true;
            this.orderPayment = {"ptype":this.orderMethod.mType,"cash":false, "cardpickup":false,"cardinternet":true}
        }
    }
    private savePaymentInfo(){
        localStorage.setItem('orderPayment', JSON.stringify(this.orderPayment));
        this.cartDetail.orderPayment=this.orderPayment;        
        this.paymentMethod=true;
        this.orderPayment=JSON.parse(localStorage.getItem('orderPayment'));
        this.editPaymentMethod = true;
        this.saveInfo();
        this.changeShowPaymentStatus();
    }
    private editPayment(){
        this.editPaymentMethod =!this.editTimeMethod;
        this.showHidePaymentMethod = true;
    }
    private saveInfo(){
        if (this.addDetail == true && this.orderType == true && this.addTime == true && this.paymentMethod == true && this.cartZero == true && this.amount < this.grandTotal) {
            this.all=true;
        }
        else{
            this.all=false;
        }
    }
    private changeShowDetailStatus(){
        this.showHideContactDetail = !this.showHideContactDetail;
    }
    private changeShowOrderingStatus(){
        this.showHideOrderingMethod = !this.showHideOrderingMethod;
        this.addressClicked =true;
        this.del =false;
    }
    private changeShowTimingStatus(){
        this.showHideTime = !this.showHideTime;
    }
    private changeShowPaymentStatus(){
        this.showHidePaymentMethod = !this.showHidePaymentMethod;
    }
    private addressInfo(){
        this.addressClicked = !this.addressClicked;
    }
    private update(){
        this.grandTotal=0;
        for (var i = 0; i < this.cart.length; ++i) {
            this.grandTotal = this.grandTotal+this.cart[i].totalPrice;
        }
        this.grandTotalWithTax =this.deliveryFee + ((parseInt(this.restaurants.taxation.taxpercent) + 100)/100) * this.grandTotal;
        this.cartDetail.subTotal=this.grandTotal;
        this.cartDetail.gTotal=this.grandTotalWithTax ;
        this.saveInfo();
    }
    private deleteCart(index) {
        this.cart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.update();
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.update();
            this.cartDetail.tax=this.restaurants.taxation.taxpercent;
         
        });
    }
    private deliveryZone(id){
        this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
            this.delivery = users.message;
        });
    }
    private placeOrder(){
        this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            this.user = data.message;
            localStorage.setItem('cart','[]');
            this.router.navigate(['/frontend',this.restaurants._id]);
            }
        );
    }
}

@Component({
    selector: 'app-frontendLogin',
    templateUrl: './frontendLogin.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendLoginComponent implements OnInit {
    restaurants: any = {};
    loginForm: FormGroup;
    regForm: FormGroup;
    returnUrl: string;
    err:any;
    showLogin : boolean = true;
    showRegister : boolean = false;
    id:any;
    currentCustomer:any;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        ) { }
    ngOnInit() {
        if (typeof this.route.snapshot.queryParams["show"] != 'undefined') {
            this.showRegister = true;
            this.showLogin = false;
        }
        this.customerService.customerLogout();
        this.loginForm = this.lf.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.regForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.id= params['id'];
            this.getRestaurants(id);

        });
    }
    showLoginForm(){
        this.showLogin = true;
        this.showRegister = false;
    }
    showRegisterForm(){
        this.showLogin = false;
        this.showRegister = true;
    }
    login(){
        this.customerService.getCustomer(this.loginForm.value).subscribe(
            (data) => {
                if (data.status) {
                    localStorage.setItem('currentCustomer', JSON.stringify(data.data));
                    this.alertService.success('Login successful', true);
                    //this._flashMessagesService.show('Login Successful', { cssClass: 'alert-success', timeout: 10000 });
                    // var x = JSON.parse(localStorage.getItem('currentCustomer'));
                    // 
                    // 
                    this.router.navigate(['/frontend-cart',this.id]);
                }
                else{
                    this._flashMessagesService.show('Bad Credential', { cssClass: 'alert-danger', timeout: 10000 });
                    //this.alertService.error('Bad Credential', true);
                    this.router.navigate(['/login',this.id]);
                }
            }
        );
    }
    register(){
        this.customerService.addCustomer(this.regForm.value).subscribe(
            (data) => {
                this.router.navigate(['/login',this.id]);
            }
            );
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            
        });
    }
}