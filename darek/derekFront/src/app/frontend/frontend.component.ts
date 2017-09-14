import { Component, OnInit, ViewEncapsulation, Input, ElementRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService,CustomersService,PromotionsService,OrderService} from '../service/index';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as globalVariable from "../global";
import {TranslateService} from '@ngx-translate/core';
import { FileUploader } from 'ng2-file-upload';

declare var google: any;
declare var toastr: any;
declare var $: any;

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
    orderMethodStorage : string;
    orderPaymentStorage : string;
    cart:any =[];
    currentCustomer:any;
    currentCustomerId:any;
    currentDate:any;
    date : any;
    time : any;
    day : any;
    resTime:any;
    showOpeningHour : boolean = false;
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
            console.log(id);
            this.getRestaurants(id);
            this.cartStorage = 'cart'+id;
            this.customerStorage = 'currentCustomer'+id;
            this.orderMethodStorage = 'orderMethod' + id;
            this.orderPaymentStorage = 'orderPayment' + id;
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
            if (JSON.parse(localStorage.getItem(this.customerStorage))) {
                this.currentCustomer = {};
                this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));            
                this.getCurrentCustomer(this.currentCustomerId);
            }
        });

        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());


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

    private hideDiv(){
        document.getElementById('closeNotification').style.display = 'none';
    }

    private checkDay(obj){
        let ifDay = {};
        ifDay['count'] = 0;
        for (var i in obj) {
            if (this.day == i) {
                ifDay['count'] = 1;
                ifDay['ch'] = i + 'time';
            }
        }
        return ifDay;
    }

    private checkOpenClose(restaurant){
        var countObj = this.checkDay(restaurant.openinghours)
        if (countObj['count'] == 0) {
            this.resTime = {};
            this.resTime['status'] = 'close';
            if (localStorage.getItem(this.orderPaymentStorage)) {
                localStorage.removeItem(this.orderPaymentStorage);
            }
            if (localStorage.getItem(this.orderMethodStorage)) {
                localStorage.removeItem(this.orderMethodStorage);
            }
        }

        if (countObj['count'] == 1) {
            this.resTime = {};
            var ch = countObj['ch'];
            this.resTime['open'] = restaurant.openinghours[ch].opentime+':00'; 
            this.resTime['close'] = restaurant.openinghours[ch].closetime+':00';
            this.resTime['day'] = this.day;
            if ((this.time >=  this.resTime.open) &&  (this.time <=  this.resTime.close)) {
                this.resTime['status'] = 'open';
            }else{
                this.resTime['status'] = 'close';
                if (localStorage.getItem(this.orderPaymentStorage)) {
                    localStorage.removeItem(this.orderPaymentStorage);
                }
                if (localStorage.getItem(this.orderMethodStorage)) {
                    localStorage.removeItem(this.orderMethodStorage);
                }
            }
        }
    }

    private showOpeningHours(){
        this.showOpeningHour = !this.showOpeningHour;
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }

    private logout(){
        this.customerService.customerLogout(this.customerStorage);
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.checkOpenClose(this.restaurants);
        });
    }
}

@Component({
    selector: 'app-thanku',
    templateUrl: './frontendThankuPage.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendThankuPageComponent implements OnInit {
    order : any = {};
    restaurants : any = {};

    showFlag : boolean = true;

    constructor(
        private activatedRoute : ActivatedRoute,
        private orderServices : OrderService
        ) { }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.authenticate_loop(id);
        });
        
        $('#timer').html('03:00');
        this.startTimer();
    }

    private authenticate_loop(id){
        var count = 0;
        var loopCount = setInterval(() => {
            count++;
            if(count < 6){
                this.orderServices.getDetail(id).subscribe(data=>{
                    this.order = data.message;
                    this.restaurants = data.message.restaurantId;
                    if (data.error == false) {
                        if (this.order.status == 'Pending') {
                            $('.backend-loader-preloader-wrapper').hide();
                            $('.continue').show();
                            this.showFlag = false;
                            clearInterval(loopCount);
                        }
                        if (this.order.status == 'Rejected') {
                            $('.backend-loader-preloader-wrapper').hide();
                            $('.continue').show();
                            this.showFlag = false;
                            clearInterval(loopCount);
                        }
                        if (this.order.status == 'Received') {
                            console.log("Still Received...");
                        }
                    }
                });
            }
            if (count >= 6){
                clearInterval(loopCount);
                $('.backend-loader-preloader-wrapper').hide();
                $('.orderMissed').show();
                $('.continue').show();
                this.showFlag = false;
                var obj = {}
                obj['id'] = this.order._id;
                obj['status'] = 'Missed';
                this.orderServices.getUpdate(obj).subscribe(data=>{
                    console.log("data");
                    console.log(data);
                });
            }
        },30000)
    }

    private startTimer() {
        var count = 0;
        var loopCount = setInterval(() => {
            count++;
            var presentTime = $('#timer').html();
            var timeArray = presentTime.split(/[:]+/);
            console.log(timeArray)
            var m = timeArray[0];
            var s = this.checkSecond((timeArray[1] - 1));
            if((s==59) && (m > 0)){m=m-1}

            let timeMMM = m + ":" + s;
            $('#timer').html(timeMMM)

            if (count >= 180){
                clearInterval(loopCount);
            }
        },1000)
    }

    private checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec};
        if (sec < 0) {sec = "59"};
        return sec;
    }
}

@Component({
    selector: 'app-frontendPromotion',
    templateUrl: './promotionDetail.component.html',
    styleUrls: ['./frontend.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FrontendPromoDetailComponent implements OnInit {
    restaurants: any = {};
    promotion: any = [];
    cart: any = [];
    menus: any = [];
    items: any = [];
    addOns: any = [];
    itemG1: any = [];
    itemG2: any = [];
    currentDate:any;
    date : any;
    time : any;
    day : any;
    mandDefaultCount: number=0;
    mandCheckedCount: boolean;
    mandStatus: boolean=true;
    mand: number = 0;
    tempGroup=[];
    mandatoryItemId=[];
    mandatoryItemIdList=[];
    detailShow: String;
    promotionStorage : string;
    customerStorage : string;
    cartStorage : string;
    coupon : string;
    price: number;
    finalPrice: number;
    addonPrice: number;
    promotionTotal: number = 0;
    multiSizePrice: number;
    quantity: number;
    orderItem: any={};
    promotionItem: any={};
    promoGroup: any;
    currentCustomerId: any;
    currentCustomer: any;

    imageURL: string = globalVariable.imageUrl;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private restaurantsService: RestaurantsService,
        private promotionsService: PromotionsService,
        private kitchenMenuService: KitchenMenuService,
        private kitchenMenuItemService: KitchenItemService,
        private translate: TranslateService,
        )
    {}
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let resId = params['id'];
            let promotionId = params['promotionId'];
            this.getRestaurants(resId,promotionId);
            this.locale(resId);
            this.promotionStorage = 'promotion_'+resId;
            this.customerStorage = 'currentCustomer'+resId;
            this.cartStorage = 'cart'+resId;
            this.coupon = 'coupon_' + resId;

            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        });

        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));            
            this.getCurrentCustomer(this.currentCustomerId);
        }

        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            this.promoGroup = JSON.parse(localStorage.getItem(this.promotionStorage));
        }

        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());


        this.time = h+':'+m +':'+ s;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.day = days[this.currentDate.getDay()];

        toastr.remove();
        toastr.warning("You can add only 1 promotion at a time",null, {'positionClass' : 'toast-top-full-width'});
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }

    private checkMenuItemShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }else{
                    return 'none';
                }
            }else{
                return 'none';
            }
        }else{
            return 'block';
        }
    }

    private loadAllUsers(id) {
        this.kitchenMenuService.getAll(id).subscribe(users => {       
            this.menus = users.message;
        });
    }

    private loadAllItem(id,promotionId) {
        this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
            this.items = users.message;
            this.getPromotion(promotionId);
        });
    }

    private loadAllAddons(id){
        this.kitchenMenuService.getAllAddOn(id).subscribe(data => {
            this.addOns = data.message;
        });
    }

    private getRestaurants(id,promotionId) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            this.loadAllUsers(this.restaurants._id);
            this.loadAllItem(this.restaurants._id,promotionId);
            this.loadAllAddons(this.restaurants._id);
        });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private getPromotion(id) {
        this.promotionsService.getOnePromo(id).subscribe(data=>{
            this.promotion = data.message;

            this.promotionItem['promotion'] = this.promotion;
            
            console.log("this.promotion");
            console.log(this.promotion);
            this.itemGroup1(this.promotion.discountOn[0]);
            if (this.promotion.discountOn[1]['itemGroup2'].length > 0) {
                this.itemGroup2(this.promotion.discountOn[1]);
            }
        });
    }

    private itemGroup1(menuIds){
        var menuObjectsArray = [];
        var length2 = menuIds.itemGroup1.length;
        if (menuIds.itemGroup1) {        
            menuIds.itemGroup1.forEach((menuObj) => {
                var menuObjects = {}
                var x = this.menus.findIndex(mn => mn._id == menuObj.id1);
                if (menuObj.item1.length > 0) {
                    this.kitchenMenuItemService.promotionsItem(menuObj.item1).subscribe(users => {
                        if (x > -1) {
                            menuObjects['menu'] = this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            this.itemG1 = menuObjectsArray;
                        }
                    });
                }
            });
            console.log("menuObjectsArray ig1");
            console.log(menuObjectsArray);
        }
    }

    private itemGroup2(menuIds){
        var menuObjectsArray = [];
        var menuObjects = {}
        if (menuIds.itemGroup2) {        
            menuIds.itemGroup2.forEach((menuObj) => {
                var menuObjects = {}
                var x = this.menus.findIndex(mn => mn._id == menuObj.id2);
                if (menuObj.item2.length > 0) {
                    this.kitchenMenuItemService.promotionsItem(menuObj.item2).subscribe(users => {
                        if (x > -1) {
                            menuObjects['menu'] = this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            this.itemG2 = menuObjectsArray;
                        }
                    });
                }
            });
            console.log("menuObjectsArray ig2");
            console.log(menuObjectsArray);
        }
    }

    private loadThisItem(itemSent){
        this.mandatoryItemId = [];
        this.mandDefaultCount = 0;
        if (itemSent.options.length > 0) {
            for (var j = 0; j < itemSent.options.length; j++) {
                if (itemSent.options[j].groupType) {
                    if (itemSent.options[j].groupType.gType == 'mandatory') {
                        this.mandDefaultCount++;
                    }
                }
            }
        }else{
            this.mandCheckedCount = true;
        }
    }

    private showDetail(itemObj,itemMultiSizeObj) {

        $("a[id^='changeBg_']").removeClass('changeBg');
        $('#changeBg_'+itemObj._id).addClass('changeBg');

        this.mandCheckedCount = false;
        this.loadThisItem(itemObj);

        if (this.mandDefaultCount == 0) {
            this.mandCheckedCount = true;
        }


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

    private showDiv(id) {
        if (this.detailShow == id) {
            return 'block';
        }
    }

    private hideDiv() {
        this.detailShow=''; 
        this.addonUncheck();
        $("a[id^='changeBg_']").removeClass('changeBg');
    }

    private addonUncheck(){
        $('.subAddOnDetailList').css('background','white');
        $('.subAddOnDetailList').attr('data-addon','check');
    }

    private multiSizePriceInfo(itemMultiSizeObj) {
        this.orderItem.multisize = itemMultiSizeObj;
        this.multiSizePrice = parseInt(itemMultiSizeObj.price);
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }

    private mandatory(data, option, group,type){
        if (group.groupType.gType == "mandatory") {
            var num = 0;
            var manda = [];
            for (var j = 0; j < data.length; j++) {
                num = data.reduce(function (n, x) {
                    return n + (x.groupId == group._id);
                }, 0);
            }
            manda[group._id] = num;

            this.mand = 0;
                if (type == 'add') {                    
                    if((group.groupType.min <= num) && (group.groupType.max >= num)) {
                        this.mand ++;
                        this.addRemoveGroup(type,group._id);
                    }
                    else{
                        type = 'remove'
                        this.mand --;
                        this.addRemoveGroup(type,group._id);
                    }
                }

                else if (type == 'remove') {                    
                    if((group.groupType.min <= num) && (group.groupType.max >= num)) {
                        type = 'add'
                        this.mand ++;
                        this.addRemoveGroup(type,group._id);
                    }
                    else{
                        this.mand --;
                        this.addRemoveGroup(type,group._id);
                    }
                }
            if (this.mand != 1 && this.mandatoryItemId.length != this.mandDefaultCount) {
                toastr.remove();
                toastr.warning('Please ensure Minimum and Maximum Addons for this Item',null, {'positionClass' : 'toast-top-full-width'});
            }
        }
    }

    private addRemoveGroup(type,id){
        if (this.mandatoryItemId.indexOf(id) > -1) {
            if (type == 'remove') {
                this.mandatoryItemId.splice(this.mandatoryItemId.indexOf(id), 1);
            }
        }
        else if (type == 'add') {
            this.mandatoryItemId.push(id);
        }
    }

    private addonPriceInfo(addonObj,addonDetail,group,option) {
        if (this.mandDefaultCount != 0) {
            this.mandCheckedCount = false;
        }
        if (this.mandDefaultCount == 0) {
            this.mandCheckedCount = true;
        }
        
        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');
        var groupId = group._id;
        if (isCheck == 'check') {
            document.getElementById(id).style.backgroundColor = '#e1eef5';
            document.getElementById(id).setAttribute('data-addon','uncheck');
            addonObj.groupId = groupId;
            this.orderItem.addon.push(addonObj);
            this.mandatory(this.orderItem.addon,option, group,'add');
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            this.mandatory(this.orderItem.addon,option, group,'remove');
            document.getElementById(id).style.backgroundColor = '#fff';
            document.getElementById(id).setAttribute('data-addon','check');
            this.addonPrice = this.addonPrice - parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;

        if (this.mand == 1 && this.mandatoryItemId.length == this.mandDefaultCount) {
            this.mandCheckedCount = true;
        }
    }

    private addToCart(id,type) {
        var discountOn = this.promotion.discountOn;

        if (type == 'itemG1') {

            var id1 = 'Location_' + id + '_specialInstructionIG1';
            var idG1 = <HTMLInputElement>document.getElementById(id1);

            console.log("idG1"); 
            console.log(idG1.value);
            this.orderItem['itemInstruction'] = idG1.value;

            if (discountOn[1]['itemGroup2'].length == 0) {
                var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.orderItem.totalPrice;
                this.orderItem.totalPrice = discountedPrice;
                this.promotionTotal = this.promotionTotal + this.orderItem.totalPrice;
                this.promotionItem['itemGroup1'] = this.orderItem;
                this.promotionItem['total'] = this.promotionTotal;
                this.promoGroup = this.promotionItem;
                localStorage.setItem(this.promotionStorage, JSON.stringify(this.promoGroup));
                localStorage.removeItem(this.coupon);
                toastr.remove();
                toastr.success("Deal Added",null, {'positionClass' : 'toast-top-full-width'});
                this.router.navigate(['/frontend',this.restaurants._id]);
                this.orderItem = {}
                this.hideDiv();
            }
            
            if (discountOn[1]['itemGroup2'].length > 0 && (this.promotionItem['itemGroup2'] == null || typeof this.promotionItem['itemGroup2'] == 'undefined')) {
                this.promotionTotal = this.promotionTotal + this.orderItem.totalPrice;
                this.promotionItem['itemGroup1'] = this.orderItem;

                toastr.remove();
                toastr.warning("Please select another item to get this deal",null, {'positionClass' : 'toast-top-full-width'});
                this.orderItem = {}
                this.hideDiv();
                this.selectItem(2);
            }


            if (discountOn[1]['itemGroup2'].length > 0 && (this.promotionItem['itemGroup2'] != null || typeof this.promotionItem['itemGroup2'] != 'undefined')) {
                this.promotionTotal = this.promotionTotal + this.orderItem.totalPrice;
                this.promotionItem['itemGroup1'] = this.orderItem;
                this.promotionItem['total'] = this.promotionTotal;
                this.promoGroup = this.promotionItem;

                localStorage.setItem(this.promotionStorage, JSON.stringify(this.promoGroup));
                localStorage.removeItem(this.coupon);
                toastr.remove();
                toastr.success("Deal Added",null, {'positionClass' : 'toast-top-full-width'});

                this.router.navigate(['/frontend',this.restaurants._id]);
                this.orderItem = {}
                this.hideDiv();

            }
        }

        if (type == 'itemG2') {

            var id2 = 'Location_' + id + '_specialInstructionIG2';
            var idG2 = <HTMLInputElement>document.getElementById(id2);

            console.log("idG2"); 
            console.log(idG2.value);
            this.orderItem['itemInstruction'] = idG2.value;


            var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.orderItem.totalPrice;
            this.orderItem.totalPrice = discountedPrice;
            this.promotionItem['itemGroup2'] = this.orderItem;

            this.promotionTotal = this.promotionTotal + this.orderItem.totalPrice;
            
            if (discountOn[0]['itemGroup1'].length > 0 && (this.promotionItem['itemGroup1'] == null || typeof this.promotionItem['itemGroup1'] == 'undefined')) {

                toastr.remove();
                toastr.warning("Please select another item to get this deal",null, {'positionClass' : 'toast-top-full-width'});
                this.orderItem = {}
                this.hideDiv();
                this.selectItem(1);
            }

            if (discountOn[0]['itemGroup1'].length > 0 && (this.promotionItem['itemGroup1'] != null || typeof this.promotionItem['itemGroup1'] != 'undefined')) {
                this.promotionItem['total'] = this.promotionTotal;
                this.promoGroup = this.promotionItem;
                localStorage.setItem(this.promotionStorage, JSON.stringify(this.promoGroup));
                localStorage.removeItem(this.coupon);

                toastr.remove();
                toastr.success("Deal Added",null, {'positionClass' : 'toast-top-full-width'});
                this.router.navigate(['/frontend',this.restaurants._id]);
                this.orderItem = {}
                this.hideDiv();
            }
        }
    }

    private selectItem(i){
        $("div[id^='itemGroup']").hide();
        $("#itemGroup"+ i).show();
        
        $("div[id^='itemNo']").removeClass('colorRust').addClass('colorWhite');
        $("#itemNo"+i).addClass('colorRust').removeClass('colorWhite');
        
        $("div[id^='selectItem']").hide();
        $("#selectItem"+ i).show();


        this.hideDiv();
    }

    private showPos(id) {
        if (this.detailShow == id) {
            let divId = '#changeBg_'+id
            let left = '';

            var offset = $(divId).offset();
            let offsetLeft = offset.left;
            if (offsetLeft < 150) {
                left = '106%';
            }else{
                left = '-106%';
            }
            return left;
        }
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
    promotionStorage : string;
    completeDate : string;
    currentTime : string;
    menus: any = [];
    items: any = [];
    restroPromotions : any = [];
    promotionOrder : any;
    hideButton : boolean = false;
    restroPromotionsLength : number = 0
    item: any;
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
    mandDefaultCount: number=0;
    mandCheckedCount: boolean;
    offerAvailable: boolean = false;
    mandStatus: boolean=true;
    mand: number = 0;
    tempGroup=[];
    mandatoryItemId=[];
    mandatoryItemIdList=[];
    constructor(
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private kitchenMenuService: KitchenMenuService,
        private customerService: CustomersService,
        private kitchenMenuItemService: KitchenItemService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private translate: TranslateService,
        private promotionsService: PromotionsService
        ){}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            this.locale(id);
            this.cartStorage = 'cart'+id;
            this.customerStorage = 'currentCustomer'+id;
            this.promotionStorage = 'promotion_'+id;
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

        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            this.promotionOrder = JSON.parse(localStorage.getItem(this.promotionStorage));
        }

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

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
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

    private checkMenuItemShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }else{
                    return 'none';
                }
            }else{
                return 'none';
            }
        }else{
            return 'block';
        }
    }

    private loadAllUsers(id) {
        this.kitchenMenuService.getAll(id).subscribe(users => {       
            this.menus = users.message;
        });
    }

    private loadAllItem(id) {
        this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
            this.items = users.message;
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

    private showPos(id) {
        if (this.detailShow == id) {
            let divId = '#changeBg_'+id
            let left = '';

            var offset = $(divId).offset();
            let offsetLeft = offset.left;
            if (offsetLeft < 150) {
                left = '106%';
            }else{
                left = '-106%';
            }
            return left;
        }
    }

    private hideDiv() {
        this.detailShow='';
        this.addonUncheck();
        $("a[id^='changeBg_']").removeClass('changeBg');
    }

    private addonUncheck(){
        $('.subAddOnDetailList').css('background','white');
        $('.subAddOnDetailList').attr('data-addon','check');
    }

    private addToCart(id) {
        var itemId = 'Location_' + id + '_specialInstruction'
        var itemInstruction = <HTMLInputElement>document.getElementById(itemId);
        this.orderItem['itemInstruction'] = itemInstruction.value;

        this.totalOrder = JSON.parse(localStorage.getItem(this.cartStorage));
        this.totalOrder.push(this.orderItem);
        localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
        toastr.remove();
        toastr.info(null, this.totalOrder.length+' Items Added', {'positionClass' : 'toast-top-full-width'});
        this.hideDiv();
    }

    private cartItemCompare(obj1,obj2,index){
        if (((obj1.item._id == obj2.item._id) && (obj1.addon.length == obj2.addon.length)) ) {
            if ((typeof obj1.multisize != 'undefined') && (typeof obj2.multisize != 'undefined') && (obj1.item.multisize.size == obj2.item.multisize.size)) {
                    this.totalOrder[index].quantity = this.totalOrder[index].quantity+obj2.quantity
                    this.totalOrder[index].totalPrice = this.totalOrder[index].totalPrice+obj2.totalPrice
                    localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
                    return true;
                
            }
        }
    }
    
    private mandatory(data, option, group,type){
        if (group.groupType.gType == "mandatory") {
            var num = 0;
            var manda = [];
            for (var j = 0; j < data.length; j++) {
                num = data.reduce(function (n, x) {
                    return n + (x.groupId == group._id);
                }, 0);
            }
            manda[group._id] = num;

            this.mand = 0;
                if (type == 'add') {                    
                    if((group.groupType.min <= num) && (group.groupType.max >= num)) {
                        this.mand ++;
                        this.addRemoveGroup(type,group._id);
                    }
                    else{
                        type = 'remove'
                        this.mand --;
                        this.addRemoveGroup(type,group._id);
                    }
                }

                else if (type == 'remove') {                    
                    if((group.groupType.min <= num) && (group.groupType.max >= num)) {
                        type = 'add'
                        this.mand ++;
                        this.addRemoveGroup(type,group._id);
                    }
                    else{
                        this.mand --;
                        this.addRemoveGroup(type,group._id);
                    }
                }
            if (this.mand != 1 && this.mandatoryItemId.length != this.mandDefaultCount) {
                toastr.remove();
                toastr.warning('Please ensure Minimum and Maximum Addons for this Item',null, {'positionClass' : 'toast-top-full-width'});
            }
        }
    }

    private addRemoveGroup(type,id){
        if (this.mandatoryItemId.indexOf(id) > -1) {
            if (type == 'remove') {
                this.mandatoryItemId.splice(this.mandatoryItemId.indexOf(id), 1);
            }
        }
        else if (type == 'add') {
            this.mandatoryItemId.push(id);
        }
    }

    private addonPriceInfo(addonObj,addonDetail,group,option) {
        if (this.mandDefaultCount != 0) {
            this.mandCheckedCount = false;
        }
        if (this.mandDefaultCount == 0) {
            this.mandCheckedCount = true;
        }
        
        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');
        var groupId = group._id;
        if (isCheck == 'check') {
            document.getElementById(id).style.backgroundColor = '#e1eef5';
            document.getElementById(id).setAttribute('data-addon','uncheck');
            addonObj.groupId = groupId;
            this.orderItem.addon.push(addonObj);
            this.mandatory(this.orderItem.addon,option, group,'add');
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            this.mandatory(this.orderItem.addon,option, group,'remove');
            document.getElementById(id).style.backgroundColor = '#fff';
            document.getElementById(id).setAttribute('data-addon','check');
            this.addonPrice = this.addonPrice - parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;

        if (this.mand == 1 && this.mandatoryItemId.length == this.mandDefaultCount) {
            this.mandCheckedCount = true;
        }
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

    private loadThisItem(itemSent){
        this.mandatoryItemId = [];
        this.mandDefaultCount = 0;
        if (itemSent.options.length > 0) {
            for (var j = 0; j < itemSent.options.length; j++) {
                if (itemSent.options[j].groupType) {
                    if (itemSent.options[j].groupType.gType == 'mandatory') {
                        this.mandDefaultCount++;
                    }
                }
            }
        }else{
            this.mandCheckedCount = true;
        }
    }

    private showDetail(itemObj,itemMultiSizeObj) {

        $("a[id^='changeBg_']").removeClass('changeBg');
        $('#changeBg_'+itemObj._id).addClass('changeBg');


        this.mandCheckedCount = false;
        this.loadThisItem(itemObj);

        if (this.mandDefaultCount == 0) {
            this.mandCheckedCount = true;
        }


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
            this.loadAllRestroPromotions(this.restaurants._id);
            this.loadAllUsers(this.restaurants._id);
            this.loadAllItem(this.restaurants._id); 
        });
    }
    
    private loadAllRestroPromotions(id){
        this.promotionsService.getRestroPromotions(id).subscribe(data => {
            for (var i = 0; i < data.message.length; i++) {
                if (data.message[i].status == true) {
                    var returnValue = this.displayPromotion(data.message[i]);

                    if (returnValue == 'block') {
                        this.restroPromotions.push(data.message[i]);
                    }
                    this.restroPromotionsLength = this.restroPromotions.length;
                    if (this.restroPromotionsLength > 4) {
                        this.hideButton = true;
                    }
                }
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

    private countDay(obj){
        var countObj1 = {};
        countObj1['count'] = 0;
        for (var i in obj) {
            if (this.day == i) {
                countObj1['count'] = 1;
                countObj1['ch'] = i+'time';
            }
        }
        return countObj1;
    }

    private fullfilment(promo){
        var discountObj2 = promo.discountTiming[1];
        if (discountObj2.available == 'unlimited' || (this.completeDate >= discountObj2.available.from && this.completeDate <= discountObj2.available.till)) {
            
            var dayObj = this.countDay(discountObj2.days);
            
            if (dayObj['count'] == 0) {
                this.offerAvailable = true;
                return false;
            }

            if (dayObj['count'] == 1) {
                if (typeof dayObj['ch'] == 'undefined') {
                    this.offerAvailable = false;
                    return true;
                }

                if (typeof dayObj['ch'] !=  'undefined') {
                    var ch = dayObj['ch'];

                    if (typeof discountObj2.days[ch] == 'undefined') {
                        this.offerAvailable = false;
                        return true;
                    }

                    if (typeof discountObj2.days[ch] !=  'undefined') {
                        if (discountObj2.days[ch]['opentime'] <= this.currentTime && discountObj2.days[ch]['closetime'] >= this.currentTime) {
                            this.offerAvailable = false;
                            return true;
                        }else{
                            this.offerAvailable = true;
                            return false;
                        }
                    }
                }
            }
        }else{
            this.offerAvailable = true;
            return false;
        }
    }

    private typeofAvailable(available){
        var typeObj = typeof available;
        if (typeObj == 'object') {
            return 'object';
        }

        if (typeObj == 'string') {
            return 'string';
        }
    }

    private promotionClass(j){
        if (j > 3) {
        return 'hide';
        }
    }

   private showPromotions(){
        $('.oddEven').removeClass('hide');
        $('.oddEven').addClass('display');
        this.hideButton = false;
    }

   private showPromoDetail(promo){
        console.log(promo)
        this.router.navigate(['/frontend-promotion',{'resId':this.restaurants._id,'promotionId':promo._id}])
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
    customerStorage : string;
    promotionStorage : string;
    currentCustomer:any;
    currentCustomerId:any;
    promotionOrder:any;
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
        ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getRestaurants(id);
            this.deliveryZone(id);
            this.locale(id);
            this.cartStorage = 'cart'+id;
            this.promotionStorage = 'promotion_'+id;
            this.customerStorage = 'currentCustomer'+id;
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        });
        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
        }
        
        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            this.promotionOrder = JSON.parse(localStorage.getItem(this.promotionStorage));
        }

       this.translate.setDefaultLang(this.lang);
    }

    private selectLang(lang: string) {
        this.lang = lang;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        let langObj = 'lang'+this.restaurants._id;
        localStorage.setItem(langObj,this.lang)
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.lang = localStorage.getItem(langObj);
            this.translate.setDefaultLang(localStorage.getItem(langObj));
        }else{
            this.translate.setDefaultLang('en');
            let browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|es|cn/) ? browserLang : 'en');
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
    resTime:any;
    delivery: any = {};
    commentMade:string ;
    cartStorage:string ;
    promotionStorage:string ;
    orderMethodStorage :string ;
    orderTimeStorage :string ;
    orderPaymentStorage :string ;
    customerStorage :string ;
    currentTime :string ;
    completeDate :string ;
    couponCodeApplied :string ;
    coupon :string ;
    order: any = {};
    cartDetail: any = {};
    objForUpdate: any = {};
    cart:any=[];
    promotionOrder:any;
    user = [];
    allPromotions = [];
    restroPromotions = [];
    zoneObject = [];
    deliveryFee : number = 0;
    discountAmount : number;
    cartTotal : number;

    minCartAmount : number;
    codeIndex : number;
    
    amount : number;
    showHideContactDetail:boolean;
    showHideOrderingMethod:boolean;
    showHideTime:boolean;
    showHidePaymentMethod:boolean;
    editOrderMethod:boolean;
    editTimeMethod:boolean;
    editPaymentMethod:boolean;
    del:boolean;
    addComment:boolean =false;
    commentNotMade:boolean =true;
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
    deliveryAddress:boolean = false;
    couponField:boolean = false;
    orderMethod:any={};
    orderTime:any={};
    orderPayment:any={};
    detailForm:FormGroup;
    addressForm:FormGroup;
    makePaymentModel:FormGroup;
    currentDate:any;
    date : any;
    timeO : any;
    dayO : any;
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
        private translate: TranslateService,
        private promotionsService: PromotionsService
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
            this.promotionStorage = 'promotion_'+id;
            this.orderMethodStorage = 'orderMethod' + id;
            this.orderTimeStorage = 'orderTime' + id;
            this.orderPaymentStorage = 'orderPayment' + id;
            this.customerStorage = 'currentCustomer' + id;
            this.coupon = 'coupon_' + id;
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
            this.currentCustomer = {};
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
            this.getCurrentCustomer(this.currentCustomerId);
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

        if (JSON.parse(localStorage.getItem(this.cartStorage))) {
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
            if (this.cart.length > 0) {
                this.cartDetail.orders = this.cart;
                this.cartZero = true;
                this.saveInfo();
            }
        }

        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            this.promotionOrder = JSON.parse(localStorage.getItem(this.promotionStorage));
            this.cartZero = true;
            this.cartDetail.promotion = this.promotionOrder;
            this.saveInfo();
        }

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


        this.timeO = h+':'+m +':'+ s;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.dayO = days[this.currentDate.getDay()];

        (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'none';

        this.makePaymentModel.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.yearAdd();
        this.loadAllPromotions();
    }

    private loadAllPromotions() {
        this.promotionsService.getAll().subscribe(promotions => {
            this.allPromotions = promotions.message;
            console.log("this.allPromotions");
            console.log(this.allPromotions);
        });
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private yearAdd(){
        let dateObj = new Date();
        let currentYear = dateObj.getFullYear();
        this.years.push(currentYear);
        for (var i = 0; i < 15; i++) {
            currentYear = currentYear+1;
            this.years.push(currentYear);
        }
    }

    private onValueChanged(data?: any) {
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
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
            this.addDetail=true;
            this.detailForm.patchValue(this.currentCustomer);
            this.cartDetail.customerId=id;
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
                toastr.remove();
                toastr.info('Basic Detail Updated','Information', {'positionClass' : 'toast-top-full-width'});
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

        console.log("this.orderType");
        console.log(this.orderType);
        this.showHideOrderingMethod =false;
        this.editOrderMethod = true;
        toastr.remove();
        toastr.info('Order Method Updated','Information', {'positionClass' : 'toast-top-full-width'});   
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

            console.log("marker", marker);
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

                if (typeof zones == 'undefined') {
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
                toastr.remove();
                toastr.info('Delivery Available',null,{'positionClass' : 'toast-top-full-width'});
                this.update();
            }
            if (this.zoneObject.length == 0) {
                this.deliveryFee = 0;
                this.amount = 0;
                this.orderType = false;
                this.cartDetail.deliveryfee = this.deliveryFee;
                this.update();
                toastr.remove();
                toastr.warning('No delivery Available on this address','Try Again',{'positionClass' : 'toast-top-full-width'});
            }
        });
    }

    private saveAddressInfo(){
        this.zoneObject=[];
        this.orderMethod = {"streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "postcode": this.addressForm.value.postcode,"mType":'Delivery'};
        this.zoneCalculate(this.orderMethod);
        this.cartDetail.orderMethod = this.orderMethod;
        this.editOrderMethod = true;
        this.saveInfo();
        this.changeShowOrderingStatus();
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
        toastr.remove();
        toastr.info('Order Type Updated','Information', {'positionClass' : 'toast-top-full-width'});
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
        toastr.remove();
        toastr.info('Order Payment Method Updated','Information', {'positionClass' : 'toast-top-full-width'});
    }

    private editPayment(){
        this.editPaymentMethod =!this.editTimeMethod;
        this.showHidePaymentMethod = true;
    }

    private saveInfo(){
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
        if (((typeof this.resTime == 'undefined' || (typeof this.resTime != 'undefined' && this.resTime['status'] == 'close')) && this.restaurants.delivery == false) || (typeof this.resTime != 'undefined' && this.resTime['status'] == 'open' && this.restaurants.delivery == false && this.restaurants.pickup == false)) {
            toastr.remove();
            toastr.error('No pickup or Delivery is available now. Please visit in Opening Hours');
        }else{
            this.showHideOrderingMethod = !this.showHideOrderingMethod;
            this.addressClicked =true;
            this.del = false;
        }
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
        let taxAmount : any;
        if (this.cart.length > 0 || typeof this.promotionOrder != 'undefined') {
            this.cartZero = true;
        }else{
            this.cartZero = false;
        }

        this.grandTotal=0;
        if(this.promotionOrder){
            this.grandTotal = this.grandTotal+this.promotionOrder.total;
        }
        for (var i = 0; i < this.cart.length; i++) {
            this.grandTotal = this.grandTotal+this.cart[i].totalPrice;
        }

        if (typeof this.restaurants.taxation != 'undefined') {
            if (typeof this.cartTotal != 'undefined') {            
                taxAmount = (parseInt(this.restaurants.taxation.taxpercent)/100) * this.cartTotal;
                this.cartDetail.tax = taxAmount.toFixed(2);
                this.grandTotalWithTax = this.deliveryFee + this.cartTotal + taxAmount;
            }else{
                taxAmount = (parseInt(this.restaurants.taxation.taxpercent)/100) * this.grandTotal;
                this.cartDetail.tax = taxAmount.toFixed(2);
                this.grandTotalWithTax = this.deliveryFee + this.grandTotal + taxAmount;
            }
        }else{
            this.cartDetail.tax = 0;
            if (typeof this.cartTotal != 'undefined') {
                this.grandTotalWithTax =this.deliveryFee + this.cartTotal;
            }else{
                this.grandTotalWithTax =this.deliveryFee + this.grandTotal;
            }
        }

        this.cartDetail.subTotal=this.grandTotal.toFixed(2);
        if (typeof this.discountAmount != 'undefined') {
            this.cartDetail.discountAmount=this.discountAmount.toFixed(2);
        }else{
            this.cartDetail.discountAmount=0;
        }
        
        this.cartDetail.gTotal=this.grandTotalWithTax.toFixed(2) ;
        this.cartDetail.orderMethod=this.orderMethod;
        this.saveInfo();

        if (this.cartDetail['promotion'] && this.cartDetail.subTotal < this.minCartAmount) {
            this.removeCoupon();
        }

        console.log("this.cartDetail", this.cartDetail);
    }

    private deleteCart(index) {
        if (this.cartDetail['promotion'] && this.couponCodeApplied != 'undefined') {
            if (confirm("Removing Item will remove your Coupon Applied! \n continue?")) {
                this.cart.splice(index,1);
                localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                this.update();
                toastr.remove();
                toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
                this.removeCoupon();
            }
        }else{
            if (confirm("Are you sure to delete ?")) {
                this.cart.splice(index,1);
                localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                this.update();
                toastr.remove();
                toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
            }
        }
    }

    private deleteDeal() {
        if (confirm("Are you sure to delete ?")) {
            delete this.promotionOrder;
            localStorage.removeItem(this.promotionStorage);
            this.update();
            toastr.remove();
            toastr.success('Deal Removed!',null, {'positionClass' : 'toast-top-full-width'});   
        }
    }

    private checkOpenClose(restaurant){
        for (var i in restaurant.openinghours) {
            if (this.dayO == i) {
                this.resTime = {};
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

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;

            this.checkOpenClose(this.restaurants);
            this.update();
            this.loadAllRestroPromotions(this.restaurants._id);
        });
    }

    private loadAllRestroPromotions(id){
        this.promotionsService.getRestroPromotions(id).subscribe(data => {
            for (var i = 0; i < data.message.length; i++) {
                if (data.message[i].status == true) {
                    var returnValue = this.displayPromotion(data.message[i]);

                    if (returnValue == 'block') {
                        this.restroPromotions.push(data.message[i]);
                    }
                }
            }

            console.log("this.restroPromotions",this.restroPromotions)

            if (localStorage.getItem(this.coupon) != 'undefined' && localStorage.getItem(this.coupon) != null) {
                this.couponCodeApplied = localStorage.getItem(this.coupon);
                this.applyCouponCodeonLoad();
            }
        });
    }

    private displayPromotion(promo){
        if ((this.completeDate >= promo.discountTiming[0].available.from && this.completeDate <= promo.discountTiming[0].available.till) || promo.discountTiming[0].available == 'unlimited') {
            for (var i in promo.discountTiming[0].days) {
                if (this.dayO == i) {
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

    private deliveryZone(id){
        this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
            this.delivery = users.message;

            if (JSON.parse(localStorage.getItem(this.orderMethodStorage)) != null) {
                this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));

                if(typeof this.orderMethod != 'undefined'){
                    this.addressForm.patchValue(this.orderMethod);
                }

                if (this.orderMethod.mType == 'Delivery') {
                    this.zoneCalculate(this.orderMethod);
                }

                if (this.orderMethod.mType == 'Pickup') {
                    this.orderType = true;
                }

                this.editOrderMethod = true;
                this.saveInfo();
                this.deliveryAddress=true;
            }
        });
    }

    private saveComment(){
        var comment = <HTMLInputElement>document.getElementById('commentArea');
        this.commentMade = comment.value;
        this.commentNotMade = false;
        this.cartDetail['comment'] = this.commentMade;
    }

    private placeOrder(){

        this.cartDetail.orderTime = this.orderTime;
        this.cartDetail.orderPayment = this.orderPayment;
        this.cartDetail.orderMethod = this.orderMethod;
        this.cartDetail.status = 'Received';
        if (typeof this.cartDetail['promotion'] != 'undefined') {
            this.cartDetail['isPromotion'] = true;
        }
        if (typeof this.cartDetail['promotion'] == 'undefined') {
            this.cartDetail['isPromotion'] = false;
        }

        if (this.cartDetail.orderPayment) {
            if (this.cartDetail.orderPayment.cardinternet == true) {
                (<HTMLInputElement>document.getElementById("cartDetailDiv")).style.display = 'none';
                (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'block';
            }else{
                this.customerService.addOrder(this.cartDetail).subscribe((data) => {
                    if (data.error == false) {
                        console.log("data.message");
                        console.log(data.message);

                        if (this.cartDetail.promotion) {
                            this.increaseCount(this.cartDetail.promotion);
                        }

                        localStorage.setItem(this.cartStorage,'[]');
                        if (localStorage.getItem(this.coupon) != 'undefined' && localStorage.getItem(this.coupon) != 'null') {
                            localStorage.removeItem(this.coupon);
                        }
                        if (localStorage.getItem(this.promotionStorage) != 'undefined' && localStorage.getItem(this.promotionStorage) != 'null') {
                            localStorage.removeItem(this.promotionStorage);
                        }
                        /*toastr.success('Your Order is Placed!','Thank You!!', {'positionClass' : 'toast-top-full-width'});*/
                        this.router.navigate(['/thanku',data.message._id]);
                    }
                });
            }
        }
    }

    private increaseCount(promotion){
        if (promotion.promotion) {
            promotion.promotion.count = promotion.promotion.count + 1;
            this.promotionsService.updateRestroPromotion(promotion.promotion).subscribe(data =>{
                console.log(data);
            });
        }
    }

    private makePayment(){
        this.hmacGenerate();
        this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            /*this.user = data.message;*/
            if (data.error == false) {

                if (this.cartDetail.promotion) {
                    this.increaseCount(this.cartDetail.promotion);
                }

                localStorage.setItem(this.cartStorage,'[]');
                if (localStorage.getItem(this.coupon) != 'undefined' && localStorage.getItem(this.coupon) != 'null') {
                    localStorage.remove(this.coupon);
                }
                if (localStorage.getItem(this.promotionStorage) != 'undefined' && localStorage.getItem(this.promotionStorage) != 'null') {
                    localStorage.removeItem(this.promotionStorage);
                }
                /*toastr.remove();
                toastr.success('Your Order is Placed!','Thank You!!', {'positionClass' : 'toast-top-full-width'});*/
                this.router.navigate(['/thanku',data.message._id]);
            }
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
        return hashAlgorithm;
    }

    private quantityIncrement(index) {
        var addonPrice = 0;
        var itemPrice = 0;
        var multisizePrice = 0;
        var totalprice = 0;
        itemPrice= this.cartDetail.orders[index].item.price;
        if (this.cartDetail.orders[index].addon.length > 0) {
            for (var i = 0; i < this.cartDetail.orders[index].addon.length; i++) {
                addonPrice = parseInt(this.cartDetail.orders[index].addon[i].price) + addonPrice;
            }
        }
        if (this.cartDetail.orders[index].multisize) {
            multisizePrice = parseInt(this.cartDetail.orders[index].multisize.price);
        }

        totalprice = addonPrice + itemPrice + multisizePrice;

        console.log(totalprice);
        this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity + 1;
        this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;

        localStorage.setItem(this.cartStorage,JSON.stringify(this.cartDetail.orders));

        this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        this.update();

        if (this.cartDetail['promotion'] && this.couponCodeApplied != 'undefined') {
            this.removeCoupon();
        }
    }

    private quantityDecrement(index) {
        if (this.cartDetail.orders[index].quantity > 1) {
            var addonPrice = 0;
            var itemPrice = 0;
            var multisizePrice = 0;
            var totalprice = 0;
            itemPrice= this.cartDetail.orders[index].item.price;
            if (this.cartDetail.orders[index].addon.length > 0) {
                for (var i = 0; i < this.cartDetail.orders[index].addon.length; i++) {
                    addonPrice = parseInt(this.cartDetail.orders[index].addon[i].price) + addonPrice;
                }
            }
            if (this.cartDetail.orders[index].multisize) {
                multisizePrice = parseInt(this.cartDetail.orders[index].multisize.price);
            }

            totalprice = addonPrice + itemPrice + multisizePrice;
            
            this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity - 1;
            this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;
        }
        else{
            toastr.remove();
            toastr.warning('Atleast 1 Item is Mandatory',null, {'positionClass' : 'toast-top-full-width'});
        }
        localStorage.setItem(this.cartStorage,JSON.stringify(this.cartDetail.orders));
        this.update();

        this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        if (this.cartDetail['promotion'] && this.couponCodeApplied != 'undefined') {
            this.removeCoupon();
        }
    }

    private showCouponField(type){
        if (type == 'add') {
            this.couponField = true;
        }
        if (type == 'cancel') {
            this.couponField = false;
        }
    }

    private performCodeCalculation(index,value){
        console.log("value");
        console.log(value);
        console.log(this.couponCodeApplied);
        this.minCartAmount = this.restroPromotions[index].minCartAmount;
        if (this.cartDetail.subTotal >= this.minCartAmount) {
            if (typeof this.couponCodeApplied == 'undefined') {
                this.couponCodeApplied = value;
                console.log("this.couponCodeApplied");
                console.log(this.couponCodeApplied);
            }

            localStorage.setItem(this.coupon,this.couponCodeApplied)
            toastr.remove();
            toastr.success('Coupon Code Applied');

            $('.couponClass').hide();
            $('.couponApplied').show();

            this.cartDetail['promotion'] = {'promotion' : this.restroPromotions[index]};

            let promoIndex = this.allPromotions.findIndex(abc=> abc._id == this.restroPromotions[index].promotionId[0]);
            if (promoIndex == 4) {
                if (typeof this.deliveryFee != 'undefined') {
                    this.discountAmount = (this.restroPromotions[index].discountPercent/100)*this.deliveryFee;
                    console.log(this.discountAmount);
                }
            }else if(promoIndex == 2){
                this.discountAmount = this.restroPromotions[index].discountAmount;
                this.cartTotal= this.cartDetail.subTotal - this.discountAmount;
                this.update();
            }else{
                this.discountAmount = (this.restroPromotions[index].discountPercent/100)*this.cartDetail.subTotal;
                this.cartTotal = this.cartDetail.subTotal - this.discountAmount;
                this.update();
            }
        }else{
            toastr.warning('To apply this coupon, Min order amount is ' + this.minCartAmount);
        }
    }

    private applyCouponCode(){
        let couponCode = (<HTMLInputElement>document.getElementById('couponCode'));
        
        this.codeIndex = this.restroPromotions.findIndex(mn=> mn.couponcode.code == couponCode.value);
        if (this.codeIndex > -1) {
            this.performCodeCalculation(this.codeIndex,couponCode.value);
        }else{
            toastr.remove();
            toastr.error('Invalid Coupon Code','Oops!', {'positionClass' : 'toast-top-full-width'});
        }
    }

    private applyCouponCodeonLoad(){
        this.codeIndex = this.restroPromotions.findIndex(mn=> mn.couponcode.code == this.couponCodeApplied);
        if (this.codeIndex > -1) {

            $('.couponClass').hide();
            $('.couponApplied').show();

            this.cartDetail['promotion'] = {'promotion' : this.restroPromotions[this.codeIndex]};

            let promoIndex = this.allPromotions.findIndex(abc=> abc._id == this.restroPromotions[this.codeIndex].promotionId[0]);
            if (promoIndex == 4) {
                if (typeof this.deliveryFee != 'undefined') {
                    this.discountAmount = (this.restroPromotions[this.codeIndex].discountPercent/100)*this.deliveryFee;
                    console.log(this.discountAmount);
                }
            }else if(promoIndex == 2){
                this.discountAmount = this.restroPromotions[this.codeIndex].discountAmount;
                this.cartTotal= this.cartDetail.subTotal - this.discountAmount;
                this.update();
            }else{
                this.discountAmount = (this.restroPromotions[this.codeIndex].discountPercent/100)*this.cartDetail.subTotal;
                this.cartTotal = this.cartDetail.subTotal - this.discountAmount;
                this.update();
            }
        }else{
            toastr.remove();
            toastr.error('Invalid Coupon Code','Oops!', {'positionClass' : 'toast-top-full-width'});
        }
    }

    private removeCoupon(){
        this.cartDetail.subTotal = this.cartTotal + this.discountAmount;
        localStorage.removeItem(this.coupon);
        delete this.couponCodeApplied;
        delete this.cartTotal;
        delete this.discountAmount;
        delete this.cartDetail['promotion'];

        $('.couponApplied').hide();
        $('.couponClass').show();
        this.showCouponField('cancel');
        this.update();
    }

    private addOrderComment(){
        this.addComment = true;
    }

    private cancelComment(){
        this.addComment = false;
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

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
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
            this.locale(id);
            this.customerStorage = 'currentCustomer' + id;
            this.customerService.customerLogout(this.customerStorage);
        });
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());


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
    
    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private showLoginForm(){
        this.showLogin = true;
        this.showRegister = false;
    }

    private showRegisterForm(){
        this.showLogin = false;
        this.showRegister = true;
    }

    private login(){
        this.customerService.getCustomer(this.loginForm.value).subscribe(
            (data) => {
                if (data.status) {
                    localStorage.setItem(this.customerStorage, JSON.stringify(data.data._id));
                    toastr.remove();
                    toastr.success('You are successfully Logged In!', 'Success!', {'positionClass' : 'toast-top-full-width'});
                    this.router.navigate(['/frontend-cart',this.id]);
                }
                else{
                    toastr.remove();
                    toastr.warning('Incorrect Validations!', 'Oops!', {'positionClass' : 'toast-top-full-width'});
                    this.router.navigate(['/login',this.id]);
                }
            }
        );
    }

    private register(){
        this.customerService.addCustomer(this.regForm.value).subscribe(
            (data) => {
                toastr.remove();
                toastr.success('Registration successfully!', 'Success!', {'positionClass' : 'toast-top-full-width'});
                this.showLoginForm();
            }
        );
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
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
            this.locale(id);
        });
    }

    private locale(id){
        let langObj = 'lang'+id;
        if (localStorage.getItem(langObj)) {
            this.translate.setDefaultLang(localStorage.getItem(langObj));
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private getRestaurants(id) {
        this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
        });
    }

    private forgetPass(){
        this.customerService.forgetPassword(this.forgetForm.value).subscribe(
            (data) => {
                if (data.error == true) {
                    toastr.remove();
                    toastr.warning('Email Dont Exist', 'Try Again!', {'positionClass' : 'toast-top-full-width'});
                }
                else{
                    toastr.remove();
                    toastr.info('check ur email', 'Email Sent!', {'positionClass' : 'toast-top-full-width'});
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
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.locale(this.id);
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
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        }
    }

    private resetPass(){
        if (this.forgetForm.value.password == this.forgetForm.value.newpassword) {
            let cusObj = this.forgetForm.value;
            cusObj._id = this.id
            this.customerService.updateCustomer(cusObj).subscribe(
                (data) => {
                    toastr.remove();
                    toastr.success('Password Successfully Changed', 'Success!', {'positionClass' : 'toast-top-full-width'});
                }
            );
        }else{
            toastr.remove();
            toastr.error('Password do not Match', 'Incorrect Password!', {'positionClass' : 'toast-top-full-width'});
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
    cart : any;
    promotionOrder : any;
    customerStorage :string;
    cartStorage :string;
    promotionStorage :string;
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
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.getRestaurants(this.id);
            this.locale(this.id);
            this.promotionStorage = 'promotion_'+this.id;
            this.cartStorage = 'cart'+this.id;
            this.customerStorage = 'currentCustomer' + this.id;
        });
        if (JSON.parse(localStorage.getItem(this.customerStorage))) {
            this.currentCustomerId = JSON.parse(localStorage.getItem(this.customerStorage));
            this.getCurrentCustomer(this.currentCustomerId);    
        }
        if (JSON.parse(localStorage.getItem(this.cartStorage))) {
            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        }

        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            this.promotionOrder = JSON.parse(localStorage.getItem(this.promotionStorage));
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
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
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

    onChange(event) {
        var files = event.target.files;
        this.profileForm.controls['image'].setValue(files[0].name);
    }

    private saveProfile(){
        if (this.profileForm.value.image == this.currentCustomer.image) {
            this.customerService.updateCustomer(this.profileForm.value).subscribe(
                (data) => {
                    toastr.remove();
                    toastr.success('Profile Updated Successfuly', 'Success!', {'positionClass' : 'toast-top-full-width'});
                    this.router.navigate(['/frontend',this.id]);
                }
            );
        }else{
            this.uploader.uploadAll();
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                var responsePath = JSON.parse(response);
                this.profileForm.controls['image'].setValue(responsePath.filename);
                toastr.remove();
                toastr.success('Profile Pic Uploaded Successfully', 'Success!', {'positionClass' : 'toast-top-full-width'});
                this.customerService.updateCustomer(this.profileForm.value).subscribe(
                    (data) => {
                        toastr.remove();
                        toastr.success('Profile Updated Successfuly', 'Success!', {'positionClass' : 'toast-top-full-width'});
                        this.router.navigate(['/frontend',this.id]);
                    }
                );
            };

        }
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
        private restaurantsService: RestaurantsService,
        private translate: TranslateService,
        ) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.locale(this.id);
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
            this.translate.use(localStorage.getItem(langObj));
        }else{
            localStorage.setItem(langObj,'en');
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

    private customerChangePassword(){
        this.customerProfile.controls['_id'].setValue(this.currentCustomerId);
        this.customerService.changePassword(this.customerProfile.value).subscribe(
            (data) => {
                if (data.error) {
                    toastr.remove();
                    toastr.error('Password do not Match', 'Incorrect Password!', {'positionClass' : 'toast-top-full-width'});
                }else{
                    toastr.remove();
                    toastr.success('Password Changed!', 'Success!', {'positionClass' : 'toast-top-full-width'});
                    this.router.navigate(['/profile', this.id]);
                }
            }
        );
    }    
}
