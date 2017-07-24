import { Component, OnInit, ViewEncapsulation, Input, ElementRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService,CustomersService} from '../service/index';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as globalVariable from "../global";
import { FlashMessagesService } from 'angular2-flash-messages';
import {TranslateService} from 'ng2-translate';
import { FileUploader } from 'ng2-file-upload';
// import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

declare var google: any;
declare var toastr: any;

@Component({
    selector: 'app-frontendheader',
    templateUrl: './frontendheader.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendHeaderComponent implements OnInit {
    @Input() ids: string;
    restaurants: any = {};
    cartStorage : string;
    customerStorage : string;
    cart:any =[];
    currentCustomer:any;
    currentCustomerId:any;
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
            this.cartStorage = 'cart'+id;
            this.customerStorage = 'currentCustomer'+id;
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
            if (JSON.parse(localStorage.getItem(this.customerStorage))) {
                this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));            
                this.getCurrentCustomer(this.currentCustomerId);
            }
        });
    }
    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }

    logout(){
        this.customerService.customerLogout(this.customerStorage);
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            console.log("this.restaurants");
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
    cartStorage : string;
    customerStorage : string;
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
    currentCustomerId:any;
    currentDate:any;
    date : any;
    time : any;
    day : any;
    resTime:any={};
    mandFlag : boolean = true;
    constructor(
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private kitchenMenuService: KitchenMenuService,
        private customerService: CustomersService,
        private kitchenMenuItemService: KitchenItemService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private translate: TranslateService,
        ){}
    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            this.locale(id);
            this.cartStorage = 'cart'+id;
            var cartalready = JSON.parse(localStorage.getItem(this.cartStorage));
            if(cartalready){
                this.totalOrder = JSON.parse(localStorage.getItem(this.cartStorage));
            }else{
                localStorage.setItem(this.cartStorage,'[]');
            }
        });
        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));            
            this.getCurrentCustomer(this.currentCustomerId);
        }

        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());


        this.time = h+':'+m +':'+ s;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.day = days[this.currentDate.getDay()];

        console.log(this.time);
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }


    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            this.translate.use(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }
    private checkOpenClose(restaurant){
        for (var i in restaurant.openinghours) {
            if (this.day == i) {
                var ch = i+'time';
                this.resTime['open'] = restaurant.openinghours[ch].opentime+':00'; 
                this.resTime['close'] = restaurant.openinghours[ch].closetime+':00';
                this.resTime['day'] = this.day;
                if ((this.time >=  this.resTime.open) &&  (this.time <=  this.resTime.close)) {
                    this.resTime['status'] = 'open';
                }else{
                    this.resTime['status'] = 'close';
                }
            }
        }
    }
    private getStyle(){
        if(this.resTime['status'] == 'close'){
            return "-1";
        }
        else{
            return "";
        }
    }
    private checkMenuItemShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;

        if (obj.isSpecific) {
            for (var i in obj.openinghours) {
                if (obj.openinghours[i] == true) {
                    //console.log(i,obj.name,obj.openinghours.opentime,obj.openinghours.closetime,time2)
                    if (/**/ (obj.openinghours.opentime <= time2) && (obj.openinghours.closetime >= time2)) {
                       // console.log(i,obj.name)
                        if (this.day == i) {
                            return 'block';
                        }
                    }else{
                        return 'none';
                    }
                }
            }
        }else{
            return 'block';
        }
    }
    private loadAllUsers(id) {
        this.kitchenMenuService.getAll(id).subscribe(users => {       
            this.menus = users.message;
            //this.menus.image=this.imageURL+this.menus.image;
            console.log("this.menus");
            console.log(this.menus);
            // console.log("this.menus.image");
            // console.log(this.menus.image);
        });
    }
    private loadAllItem(id) {
        this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
            this.items = users.message;
            //this.items.image=this.imageURL+this.items.image;
            console.log("this.items");
            console.log(this.items);
        });
        this.kitchenMenuService.getAllAddOn(this.restaurants._id).subscribe(data => {
            this.addOns = data.message;
            console.log("this.addOns");
            console.log(this.addOns);
        });
    }
    private addToCartSuccess(){
        toastr.remove();
        toastr.info(null, this.totalOrder.length+' Items Added');
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
        this.totalOrder = JSON.parse(localStorage.getItem(this.cartStorage));
        /*if (this.totalOrder.length>0) {
            for (var i = 0; i < this.totalOrder.length; i++) {
                let cartObj = this.cartItemCompare(this.totalOrder[i],this.orderItem,i);
                console.log(cartObj)
                if (typeof cartObj == 'undefined') {
                    this.totalOrder.push(this.orderItem);
                    localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
                    this.addToCartSuccess();
                    this.detailShow='';
                }
            }
        }else{*/
            this.totalOrder.push(this.orderItem);
            localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
            this.addToCartSuccess();
            this.detailShow='';
        // }
    }

    private cartItemCompare(obj1,obj2,index){
        console.log(obj1)
        console.log(index)
        console.log(obj2)
        if (((obj1.item._id == obj2.item._id) && (obj1.addon.length == obj2.addon.length)) ) {
            if ((typeof obj1.multisize != 'undefined') && (typeof obj2.multisize != 'undefined') && (obj1.item.multisize.size == obj2.item.multisize.size)) {
                    this.totalOrder[index].quantity = this.totalOrder[index].quantity+obj2.quantity
                    this.totalOrder[index].totalPrice = this.totalOrder[index].totalPrice+obj2.totalPrice
                    localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
                    return true;
                
            }
        }
    }
    
    private mandatory(data, option, group){
        console.log("data.length");
        console.log(data.length);
        if (group.groupType.gType == "mandatory") {
            this.mandFlag = false;
            var manda = [];
            for (var j = 0; j < data.length; j++) {
                var num = data.reduce(function (n, x) {
                    return n + (x.groupId == group._id);
                }, 0);
            }
            manda[group._id] = num;
            if ((group.groupType.min <= num) && (group.groupType.max  >= num)) {
                this.mandFlag = true;
            }
            else{
                this.mandFlag = false;
            }
            console.log("manda");
            console.log(manda);
        }
        if (data.length == 0) {
            this.mandFlag = true;
        }

    }

    private addonPriceInfo(addonObj,addonDetail,group,option) {
        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');
        var groupId = group._id;
        if (isCheck == 'check') {
            document.getElementById(id).style.backgroundColor = '#e1eef5';
            document.getElementById(id).setAttribute('data-addon','uncheck');
            addonObj.groupId = groupId;
            this.orderItem.addon.push(addonObj);
            this.mandatory(this.orderItem.addon,option, group);
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            this.mandatory(this.orderItem.addon,option, group);
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
        if ( itemMultiSizeObj ) {
            this.multiSizePrice = parseInt(itemMultiSizeObj.price);  
            this.orderItem.multisize = itemMultiSizeObj; 
        }
        this.price = parseInt(itemObj.price);
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.item = itemObj; 
        this.orderItem.addon = [];
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;    
            this.loadAllUsers(this.restaurants._id);
            this.checkOpenClose(this.restaurants);
            this.loadAllItem(this.restaurants._id); 
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
    cartStorage : string;
    delivery: any = {};
    deliverys: any = [];
    mypolygone: any = [];
    mergeCircleShape: any = [];
    cart:any=[];
    lat: any;
    lng: any;
    lang:string;
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
            this.locale(id);
            this.cartStorage = 'cart'+id;
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        });
       //this.translate.setDefaultLang(this.lang);
    }
    selectLang(lang: string) {
        this.lang = lang;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        let langObj = 'lang'+this.restaurants._id;
        localStorage.setItem(langObj,this.lang)
        console.log(localStorage.getItem(langObj));
    }


    private locale(id){
        let langObj = 'lang'+id;
        console.log(langObj)
        if (localStorage.getItem(langObj)) {
            this.lang = localStorage.getItem(langObj);
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
            this.lang = 'en';
        }
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
    cartStorage:string ;
    orderMethodStorage :string ;
    orderTimeStorage :string ;
    orderPaymentStorage :string ;
    customerStorage :string ;
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
    currentCustomerId:any;
    deliveryAddress:Boolean = false;
    orderMethod:any={};
    orderTime:any={};
    orderPayment:any={};
    //orderTime:any;
    //orderPayment:any;
    detailForm:FormGroup;
    addressForm:FormGroup;
    makePaymentModel:FormGroup;
    currentDate:any;
    date : any;
    timeO : any;
    dayO : any;
    resTime:any={};
    day :any = 'today';
    days:any = [{day : "today"}, {day: "tomorrow"}];
    time:any = '8:00';
    times:any = [{time:"8:00"},{time:"9:00"},{time:"10:00"},{time:"11:00"},{time:"12:00"},{time:"13:00"},{time:"14:00"},{time:"15:00"},{time:"16:00"},{time:"17:00"},{time:"18:00"},{time:"19:00"},{time:"20:00"}]
    months:any = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    years:any=[];

    constructor(
        private lf: FormBuilder,
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private customerService: CustomersService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
        private translate: TranslateService,
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
            this.cartStorage = 'cart'+id;
            this.orderMethodStorage = 'orderMethod' + id;
            this.orderTimeStorage = 'orderTime' + id;
            this.orderPaymentStorage = 'orderPayment' + id;
            this.customerStorage = 'currentCustomer' + id;
            this.getRestaurants(id);
            this.deliveryZone(id);
            this.locale(id);
        });
        this.makePaymentModel = this.lf.group({
            cardNumber: ['', [Validators.required, Validators.minLength(16),Validators.maxLength(16), Validators.pattern('[0-9]+')]],
            month: ['', Validators.required],
            year: ['', Validators.required],
            cvv: ['', Validators.required],
        });

        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
            this.getCurrentCustomer(this.currentCustomerId);
        }
        // this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
        if (JSON.parse(localStorage.getItem(this.orderMethodStorage)) != null) {

            this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));
            if (this.orderMethod.mType == 'Delivery') {
                this.zoneCalculate(this.orderMethod);
            }
            this.editOrderMethod = true;
            this.orderType = true;
            this.saveInfo();
            this.deliveryAddress=true;
        }
        if (JSON.parse(localStorage.getItem(this.orderTimeStorage)) != null) {
            this.orderTime = JSON.parse(localStorage.getItem(this.orderTimeStorage));
            this.editTimeMethod = true;
            this.addTime = true;
            this.saveInfo();
            this.flagForTime=true;
        }
        if (JSON.parse(localStorage.getItem(this.orderPaymentStorage)) != null) {
            this.orderPayment = JSON.parse(localStorage.getItem(this.orderPaymentStorage));
            this.editPaymentMethod = true;
            this.paymentMethod = true;
            this.saveInfo();
            this.flagForPayment=true;
        }

        if ( JSON.parse(localStorage.getItem(this.cartStorage))) {
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
            if (this.cart.length > 0) {
                this.cartDetail.orders = this.cart;
                this.cartZero = true;
                this.saveInfo();
            }
        }

        if(typeof this.orderMethod != 'undefined'){
            this.addressForm.patchValue(this.orderMethod);
        }
        this.deliveryFee = 0;

        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        this.timeO = this.currentDate.getHours()+':'+this.currentDate.getMinutes() +':'+ this.currentDate.getSeconds();

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.dayO = days[this.currentDate.getDay()];


        (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'none';

        this.makePaymentModel.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
        this.yearAdd();
    }

    private yearAdd(){
        let dateObj = new Date();
        let currentYear = dateObj.getFullYear();
        this.years.push(currentYear);
        for (var i = 0; i < 15; i++) {
            currentYear = currentYear+1;
            this.years.push(currentYear);
        }
        console.log(this.years);
    }
    onValueChanged(data?: any) {
    if (!this.makePaymentModel){
        return;
    }
    const form = this.makePaymentModel;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);      
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';          
        }
      }
    }
  }


  formErrors = {
    'cardNumber': ''    
  };

  validationMessages = {
    'cardNumber': {
      'required':      'Card Number is required.',
      'minlength':     'Card Number must be 16 character long.',
      'maxlength':     'Card Number must be 16 character long.',
      'pattern'   :    'Card Number contains Numberic only '
    }          
  };





    private showCartDiv(){
        (<HTMLInputElement>document.getElementById("cartDetailDiv")).style.display = 'block';
        (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'none';
    }
    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }
    private basicDetailSuccess(){
        toastr.remove();
        toastr.info('Basic Detail Updated','Information');
    }
    private orderMethodSuccess(){
        toastr.remove();
        toastr.info('Order Method Updated','Information');   
    }
    private orderTimeSuccess(){
        toastr.remove();
        toastr.info('Order Type Updated','Information');
    }
    private orderPaymentSuccess(){
        toastr.remove();
        toastr.info('Order Payment Method Updated','Information');   
    }
    private deleteSuccess(){
        toastr.remove();
        toastr.info('Item Deleted!',null);   
    }
    private orderPlacedSuccess(){
        toastr.remove();
        toastr.success('Your Order is Placed!','Thank You!!');   
    }

    private checkOpenClose(restaurant){
        for (var i in restaurant.openinghours) {
            if (this.dayO == i) {
                var ch = i+'time';
                this.resTime['open'] = restaurant.openinghours[ch].opentime+':00'; 
                this.resTime['close'] = restaurant.openinghours[ch].closetime+':00';
                this.resTime['day'] = this.dayO;
                if ((this.timeO >=  this.resTime.open) &&  (this.timeO <=  this.resTime.close)) {
                    this.resTime['status'] = 'open';
                }else{
                    this.resTime['status'] = 'close';
                }
            }
        }
    }
    private getStyle(){
        if(this.resTime['status'] == 'close'){
            return "1057";
        }
        else{
            return "";
        }
    }
    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(this.currentCustomerId).subscribe(
            users => {
            this.currentCustomer = users.message;
            this.addDetail=true;
            this.detailForm.patchValue(this.currentCustomer);
            this.cartDetail.customerId=this.currentCustomerId;
            this.saveInfo();
        });
    }
    private saveDetailInfo(){
        this.customerService.updateCustomer(this.detailForm.value).subscribe(
            (data) => {
                this.getCurrentCustomer(data.message._id)
                this.addDetail=true;
                this.saveInfo();
                this.changeShowDetailStatus();
                this.basicDetailSuccess();
            });
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
        localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));
        this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));
        this.cartDetail.orderMethod=this.orderMethod;        
        this.orderType=true;
        this.saveInfo();
        this.showHideOrderingMethod =false;
        this.editOrderMethod = true;
        this.orderMethodSuccess();
        localStorage.removeItem(this.orderPaymentStorage);
        this.orderPayment={};
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
            this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"lat": data.message.lat,"lng": data.message.lng,"mType":'Delivery'};
            localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));
            this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));
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
                        this.orderType=true;

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
        //localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));
        //this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));
        this.cartDetail.orderMethod = this.orderMethod;
        //this.orderType=true;
        this.editOrderMethod = true;
        this.saveInfo();
        this.changeShowOrderingStatus();
        this.orderMethodSuccess();
        localStorage.removeItem(this.orderPaymentStorage);
        this.orderPayment={};
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
        localStorage.setItem(this.orderTimeStorage, JSON.stringify(this.orderTime));
        this.orderTime = JSON.parse(localStorage.getItem(this.orderTimeStorage));
        this.cartDetail.orderTime = this.orderTime;
        this.editTimeMethod = true;
        this.addTime=true;
        this.saveInfo();
        this.changeShowTimingStatus();
        this.orderTimeSuccess();
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
        localStorage.setItem(this.orderPaymentStorage, JSON.stringify(this.orderPayment));
        this.cartDetail.orderPayment=this.orderPayment;        
        this.paymentMethod=true;
        this.orderPayment=JSON.parse(localStorage.getItem(this.orderPaymentStorage));
        this.editPaymentMethod = true;
        this.saveInfo();
        this.changeShowPaymentStatus();
        this.orderPaymentSuccess();
    }
    private editPayment(){
        this.editPaymentMethod =!this.editTimeMethod;
        this.showHidePaymentMethod = true;
    }
    private saveInfo(){

        console.log(this.addDetail,this.orderType,this.addTime,this.paymentMethod,this.cartZero,this.amount,this.grandTotal);
        if (this.addDetail == true && this.orderType == true && this.addTime == true && this.paymentMethod == true && this.cartZero == true && (this.orderMethod.mType == 'Pickup' || (typeof this.amount == 'undefined' || this.amount < this.grandTotal))) {
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
        this.cartDetail.gTotal=this.grandTotalWithTax.toFixed(2) ;
        this.cartDetail.orderMethod=this.orderMethod ;
        this.saveInfo();
    }
    private deleteCart(index) {
        if (confirm("Are you sure to delete ?")) {
            this.cart.splice(index,1);
            localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
            this.update();
            this.deleteSuccess();
        }
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.update();
            this.cartDetail.tax=this.restaurants.taxation.taxpercent;
            this.checkOpenClose(this.restaurants);
        });
    }
    private deliveryZone(id){
        this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
            this.delivery = users.message;
        });
    }

    private placeOrder(){
        this.cartDetail.orderTime = this.orderTime;
        this.cartDetail.orderPayment = this.orderPayment;
        this.cartDetail.status = 'Accepted';

        if (this.cartDetail.orderPayment) {
            if (this.cartDetail.orderPayment.cardinternet == true) {
                (<HTMLInputElement>document.getElementById("cartDetailDiv")).style.display = 'none';
                (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'block';
            }else{
                this.customerService.addOrder(this.cartDetail).subscribe(
                  (data) => {
                    this.user = data.message;
                    localStorage.setItem(this.cartStorage,'[]');
                    this.orderPlacedSuccess();
                    this.router.navigate(['/frontend',this.restaurants._id]);
                    }
                );                
            }
        }

        console.log("this.cartDetail");
        console.log(this.cartDetail);

       /* this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            this.user = data.message;
            localStorage.setItem(this.cartStorage,'[]');
            this.orderPlacedSuccess();
            this.router.navigate(['/frontend',this.restaurants._id]);
            }
        );*/
    }

    private makePayment(){
        this.hmacGenerate();
        this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            this.user = data.message;
            localStorage.setItem(this.cartStorage,'[]');
            this.orderPlacedSuccess();
            this.router.navigate(['/frontend',this.restaurants._id]);
        });
    }

    private hmacGenerate(){
        var apiKey = "orC0OGDhIz3NUg2HShAzczEeM18Zaciw";
        var apiSecret = "e71e64ce4eddfa0920c42d030207933166b9c8166874d0b0d65bfce10ddb8c5f";
        var nonce = Math.random();
        var timestamp = Math.round(+new Date()/1000);;
        var token = "9a7f7bef6a5f0ef2";
        var payload = "https://api-cert.payeezy.com/v1/transactions";
        var data = apiKey + nonce + timestamp + token + payload;
        var hashAlgorithm = "sha256";
        //var hmac = hash_hmac( hashAlgorithm , data , apiSecret, false );
        return hashAlgorithm;
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
    customerStorage: string;
    err:any;
    showLogin : boolean = true;
    showRegister : boolean = false;
    id:any;
    currentCustomer:any;
    currentDate:any;
    date : any;
    time : any;
    day : any;
    resTime:any={};

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        )
    {}
    ngOnInit() {
        if (typeof this.route.snapshot.queryParams["show"] != 'undefined') {
            this.showRegister = true;
            this.showLogin = false;
        }

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
            this.customerStorage = 'currentCustomer' + id;
            this.customerService.customerLogout(this.customerStorage);
        });
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        this.time = this.currentDate.getHours()+':'+this.currentDate.getMinutes() +':'+ this.currentDate.getSeconds();

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.day = days[this.currentDate.getDay()];
    }
    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    showSuccessLogin() {
        toastr.remove();
        toastr.success('You are successfully Logged In!', 'Success!');
      }
    showSuccessRegister() {
        toastr.remove();
        toastr.success('Registration successfully!', 'Success!');
      }
    showErrorLogin() {
        toastr.remove();
        toastr.warning('Incorrect Validations!', 'Oops!');
    }

    private checkOpenClose(restaurant){
        for (var i in restaurant.openinghours) {
            if (this.day == i) {
                var ch = i+'time';
                this.resTime['open'] = restaurant.openinghours[ch].opentime+':00'; 
                this.resTime['close'] = restaurant.openinghours[ch].closetime+':00';
                this.resTime['day'] = this.day;
                if ((this.time >=  this.resTime.open) &&  (this.time <=  this.resTime.close)) {
                    this.resTime['status'] = 'open';
                }else{
                    this.resTime['status'] = 'close';
                }
            }
        }
    }
    private getStyle(){
        if(this.resTime['status'] == 'close'){
            return "1";
        }
        else{
            return "";
        }
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
                    localStorage.setItem(this.customerStorage, JSON.stringify(data.data._id));
                    this.showSuccessLogin();
                    this.router.navigate(['/frontend-cart',this.id]);
                }
                else{
                    this.showErrorLogin();
                    this.router.navigate(['/login',this.id]);
                }
            }
        );
    }
    register(){
        this.customerService.addCustomer(this.regForm.value).subscribe(
            (data) => {
                this.showSuccessRegister();
                this.showLoginForm();
            }
        );
    }
    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.checkOpenClose(this.restaurants);
        });
    }
}

@Component({
    selector: 'app-frontendForgetPassword',
    templateUrl: './frontendForgetPassword.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendForgetPasswordComponent implements OnInit {
    restaurants: any = {};
    forgetForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        this.forgetForm = this.lf.group({
            email: ['', Validators.required]
          });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
        });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }


    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private showSuccessMsg(){
        toastr.remove();
        toastr.info('check ur email', 'Email Sent!');
    }

    private emailDontExist(){
        toastr.remove();
        toastr.warning('Email Dont Exist', 'Try Again!');
    }

    private forgetPass(){
        this.customerService.forgetPassword(this.forgetForm.value).subscribe(
            (data) => {
                if (data.error == true) {
                    this.emailDontExist();
                }
                else{
                    this.showSuccessMsg();
                    this.router.navigate(['/login', this.restaurants._id]);
                }
            }
        );
    }
}

@Component({
    selector: 'app-frontendResetPassword',
    templateUrl: './frontendResetPassword.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendResetPasswordComponent implements OnInit {
    restaurants: any = {};
    forgetForm: FormGroup;
    returnUrl: string;
    err:any;
    id:any;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.forgetForm = this.lf.group({
            password: ['', Validators.required],
            newpassword: ['', Validators.required]
          });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private showSuccessMsg(){
        toastr.remove();
        toastr.success('Password Successfully Changed', 'Success!');
    }

    private showErrorMsg(){
        toastr.remove();
        toastr.error('Password do not Match', 'Incorrect Password!');
    }

    private resetPass(){
        if (this.forgetForm.value.password == this.forgetForm.value.newpassword) {
            let cusObj = this.forgetForm.value;
            cusObj._id = this.id
            console.log(cusObj);
            this.customerService.updateCustomer(cusObj).subscribe(
                (data) => {
                    this.showSuccessMsg();
                }
            );
        }else{
            this.showErrorMsg();
        }
    }
}

@Component({
    selector: 'app-frontendUserProfilePassword',
    templateUrl: './frontendUserProfile.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendUserProfileComponent implements OnInit {
    restaurants: any = {};
    customerStorage :string;
    currentCustomer:any;
    currentCustomerId:any;
    id : any;
    profileForm : FormGroup;
    imageURL : String = globalVariable.imageUrl;

    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.getRestaurants(this.id);
            this.customerStorage = 'currentCustomer' + this.id;
        });
        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
            this.getCurrentCustomer(this.currentCustomerId);    
        }
        this.profileForm = this.lf.group({
            _id : ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            image : []
        });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }


    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
            this.profileForm.patchValue(this.currentCustomer);
        });
    }


    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private profilePicUploaded(){
        toastr.remove();
        toastr.success('Profile Pic Uploaded Successfully', 'Success!');
    }

    private showSuccessMsg(){
        toastr.remove();
        toastr.success('Profile Updated Successfuly', 'Success!');
    }

    onChange(event) {
        var files = event.srcElement.files;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.profileForm.controls['image'].setValue(responsePath.filename);
            this.profilePicUploaded();
        };
    }

    private saveProfile(){
        console.log("this.profileForm.value");
        console.log(this.profileForm.value);
        this.customerService.updateCustomer(this.profileForm.value).subscribe(
            (data) => {
                this.showSuccessMsg();
            }
        );
        this.router.navigate(['/frontend',this.id]);
    }
}

@Component({
    selector: 'app-frontendChangePassword',
    templateUrl: './frontendChangePassword.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendChangePasswordComponent implements OnInit {
    restaurants: any = {};
    currentCustomer:any;
    currentCustomerId:any;
    customerProfile: FormGroup;
    returnUrl: string;
    customerStorage: string;
    err:any;
    id:any;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.customerStorage = 'currentCustomer' + this.id;
        });
        
        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
            this.getCurrentCustomer(this.currentCustomerId);    
        }

        this.customerProfile = this.lf.group({
            oldpassword: ['', Validators.required],
            newpassword: ['', Validators.required],
            _id: [],
          });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            console.log(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }


    private showSuccessMsg() {
        toastr.remove();
        toastr.success('Password Changed!', 'Success!');
      }
    private showErrorMsg() {
        toastr.remove();
        toastr.error('Password do not Match', 'Incorrect Password!');
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }
    private customerChangePassword(){
        this.customerProfile.controls['_id'].setValue(this.currentCustomerId);
        this.customerService.changePassword(this.customerProfile.value).subscribe(
            (data) => {
                console.log(this.customerProfile.value);
                console.log(data);
                if (data.error) {
                    this.showErrorMsg();
                }else{
                    this.showSuccessMsg();
                    this.router.navigate(['/profile', this.id]);
                }
            }
        );
    }    
}
