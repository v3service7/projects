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
        alert("Logged Out Successfully");
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            console.log(this.restaurants);
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
            // if(cartalready.length > 0){
                if(cartalready){
                    this.totalOrder = JSON.parse(localStorage.getItem('cart'));
                }else{
                    localStorage.setItem('cart','[]');
                }
                console.log("this.totalOrder");
                console.log(this.totalOrder);
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
        console.log("this.totalOrder");
        console.log(this.totalOrder);
        this.totalOrder = JSON.parse(localStorage.getItem('cart'));
        console.log(this.totalOrder);
        console.log("this.orderItem");
        console.log(this.orderItem);
        this.totalOrder.push(this.orderItem);
        console.log("this.totalOrder2");
        console.log(this.totalOrder);

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
        console.log("this.orderItem");
        console.log(this.orderItem);
    }

    private getRestaurants(id) {
        //console.log(id)
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            console.log(this.restaurants);
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

            console.log(this.lat);
            console.log(this.lng);
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
        console.log(this.delivery);
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
    oMethod:any;
    oTime:any;
    oPayment:any;
    //orderMethod:String;
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
        this.oMethod = JSON.parse(localStorage.getItem('orderMethod'));
        this.oTime = JSON.parse(localStorage.getItem('orderTime'));
        this.oPayment = JSON.parse(localStorage.getItem('orderPayment'));

        if (this.oMethod) {
            console.log("this.oMethod");
            console.log(this.oMethod);
            this.editOrderMethod = true;
            this.orderType = true;
            this.saveInfo();
        }
        if (this.oTime) {
            console.log("this.oTime");
            console.log(this.oTime);
            this.editTimeMethod = true;
            this.addTime = true;
            this.saveInfo();
        }
        if (this.oPayment) {
            console.log("this.oPayment");
            console.log(this.oPayment);
            this.editPaymentMethod = true;
            this.paymentMethod = true;
            this.saveInfo();
        }

        if(this.currentCustomer){
            let custId = this.currentCustomer._id;
            this.addDetail=true;
            this.detailForm.patchValue(this.currentCustomer);
            this.cartDetail.customerId=custId;
        }

        this.cart = JSON.parse(localStorage.getItem('cart'));

        if (this.cart.length > 0) {
            this.cartDetail.orders = this.cart;
            this.cartZero = true;
        }
        if(this.cartDetail){
            console.log(this.oMethod)
            this.addressForm.patchValue(this.oMethod);
        }
    }

    private saveDetailInfo(){
        this.customerService.updateCustomer(this.detailForm.value).subscribe(
            (data) => {
                localStorage.setItem('currentCustomer', JSON.stringify(this.detailForm.value));
                this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            }
        );
        this.addDetail=true;
        console.log("this.addDetail");
        console.log(this.addDetail);
        this.saveInfo();
        this.changeShowDetailStatus();
    }

    private addressButton(id){
        if (id=="pickup") {
            this.orderMethod = {};
            this.orderMethod.mType ='Pickup';
            this.deliveryAddress = true; 
            this.del=false;
            // console.log(this.cartDetail);
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
        this.oMethod = JSON.parse(localStorage.getItem('orderMethod'));
        this.cartDetail.orderMethod=this.orderMethod;
        console.log(this.cartDetail);
        this.orderType=true;
        this.saveInfo();
        this.showHideOrderingMethod =false;
        this.editOrderMethod = true;
    }


    private saveAddressInfo(){
        this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"mType":'Delivery'};
        this.customerService.getLatLng(this.orderMethod).subscribe(data => {
            console.log('data');
            console.log(data);
            console.log('data');
            //this.alertService.success('Restaurant Deleted successful', true);
        });
        localStorage.setItem('orderMethod', JSON.stringify(this.orderMethod));
        this.oMethod = JSON.parse(localStorage.getItem('orderMethod'));
        this.cartDetail.orderMethod = this.orderMethod;
        this.orderType=true;
        this.editOrderMethod = true;
        console.log(this.cartDetail);
        this.saveInfo();
        this.changeShowOrderingStatus();
    }

    private editOrder(){
        this.editOrderMethod = !this.editOrderMethod;
        this.showHideOrderingMethod = true;
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
        this.oTime = JSON.parse(localStorage.getItem('orderTime'));
        this.cartDetail.orderTime = this.orderTime;
        this.editTimeMethod = true;

        console.log(this.cartDetail);
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
        console.log(this.cartDetail);
        this.paymentMethod=true;
        this.oPayment=JSON.parse(localStorage.getItem('orderPayment'));
        this.editPaymentMethod = true;
        this.saveInfo();
        this.changeShowPaymentStatus();
    }

    private editPayment(){
        this.editPaymentMethod =!this.editTimeMethod;
        this.showHidePaymentMethod = true;
    }

    private saveInfo(){
        if (this.orderType == true && this.addTime == true && this.paymentMethod == true && this.cartZero == true) {
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
        this.grandTotalWithTax = ((parseInt(this.restaurants.taxation.taxpercent) + 100)/100) * this.grandTotal;
        this.cartDetail.subTotal=this.grandTotal;
        this.cartDetail.gTotal=this.grandTotalWithTax;
        console.log('this.cartDetail123456789');
        console.log(this.cartDetail);
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
            console.log("this.delivery");
            console.log(this.delivery);
        });
    }

    private placeOrder(){
        console.log(this.cartDetail);
        this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            this.user = data.message;
            alert("Order Placed");
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
        console.log();

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
                    // console.log("x");
                    // console.log(x);
                    this.router.navigate(['/frontend-cart',this.id]);
                }
                else{
                    this._flashMessagesService.show('Bad Credential', { cssClass: 'alert-danger', timeout: 10000 });
                    //this.alertService.error('Bad Credential', true);
                    alert('Bad Credential');
                    this.router.navigate(['/login',this.id]);
                }
            }
            );
    }

    register(){
        this.customerService.addCustomer(this.regForm.value).subscribe(
            (data) => {
                alert('Registration Successful');
                this.router.navigate(['/login',this.id]);
            }
            );
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            console.log(this.restaurants);
        });
    }
}

