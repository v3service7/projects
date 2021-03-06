import { Component, OnInit, ViewEncapsulation, Input, ElementRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService,CustomersService,PromotionsService,OrderService, SocketService} from '../service/index';
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
        private socketService:SocketService
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
        /*if(localStorage.getItem('currentCustomer')){
            var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            
        }*/
        this.customerService.getOneCustomer(id).subscribe(users => {
            this.currentCustomer = users.message;
            /*this.socketService.assignSocketIdToCustomer(this.currentCustomer);*/
            console.log("this.currentCustomer");
            console.log(this.currentCustomer);
        });
    }

    private logout(){
        if (confirm("Logout?")) {
            delete this.currentCustomer;
            this.customerService.customerLogout(this.customerStorage);
        }
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

    resId : any;
    constructor(
        private activatedRoute : ActivatedRoute,
        private orderServices : OrderService
        ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resId = params['id'];
        });
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
    tempGroup=[];
    detailShow: String;
    promotionStorage : string;
    customerStorage : string;
    cartStorage : string;
    coupon : string;
    cartSubTotal : string;
    price: number;
    finalPrice: number;
    addonPrice: number;
    promotionTotal: number = 0;
    multiSizePrice: number;
    quantity: number;
    cartTotalAmount: number;
    index: number;
    orderItem: any={};
    promotionItem: any={};
    promoGroup: any;
    currentCustomerId: any;
    currentCustomer: any;


    mandatoryItemId=[];
    mandatoryItemArray=[];
    requiredAddonArray : any;

    imageURL: string = globalVariable.imageUrl;

    spicyArray : any = [1,2,3];

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
            this.cartSubTotal = 'subTotal_' + resId;

            this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
            this.cartTotalAmount = JSON.parse(localStorage.getItem(this.cartSubTotal));
        });

        if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
            toastr.remove();
            toastr.info("You can add only 1 promotion at a time. Adding new Deal will remove deal added ",null, {'positionClass' : 'toast-top-full-width'});
            this.promoGroup = JSON.parse(localStorage.getItem(this.promotionStorage));
        }

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


        /*setTimeout(()=>{
            var id1 = 'menuItem_ig1_' + this.itemG1[0].menus[0]._id;
            $("div[id^='menuItem_ig1_']").hide();
            $('#'+id1).show();
            if (this.itemG2) {
                var id2 = 'menuItem_ig2_' + this.itemG2[0].menus[0]._id;
                $("div[id^='menuItem_ig2_']").hide();
                $('#'+id2).show();
            }
        },1000)*/
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private scrollToMenu(id, group){
        let menu : any;
        if (group == 'ig1') {
            menu = '#menuItem_ig1_' + id;
        }
        if (group == 'ig2') {
            menu = '#menuItem_ig2_' + id;
        }

        console.log("menu");
        console.log(menu);
        /*$(menu).attr("tabindex",1).focus();*/

        var $target = $(menu);
        let top = $target.offset().top;
        $('html, body').stop().animate({
            'scrollTop': top-65
        }, 900);
    }

    private getCurrentCustomer(id){
        this.customerService.getOneCustomer(id).subscribe(
            users => {
            this.currentCustomer = users.message;
        });
    }

    private checkMenuShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'showBlockMenu';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'showBlockMenu';
                }else{
                    return 'showNoneMenu';
                }
            }else{
                return 'showNoneMenu';
            }
        }else{
            return 'showBlockMenu';
        }
    }

    private checkItemShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'blockClass';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'blockClass';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'blockClass';
                }else{
                    return 'noneClass';
                }
            }else{
                return 'noneClass';
            }
        }else{
            return 'blockClass';
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

            this.loadAllPromotions(data.message.promotionId[0])

            this.itemGroup1(this.promotion.discountOn[0]);
            if (this.promotion.discountOn[1]) {
                this.itemGroup2(this.promotion.discountOn[1]);
            }
        });
    }

    private loadAllPromotions(id) {
        this.promotionsService.getAll().subscribe(pro => {
            this.index = pro.message.findIndex(mn => mn._id == id);

            console.log("this.index");
            console.log(this.index);
            if (this.index == 6) {
                if (this.cartTotalAmount < this.promotion.minCartAmount) {
                    toastr.remove();
                    toastr.warning('Cant add this deal now \n Minimum Cart Amount should be ' + this.promotion.minCartAmount);
                }
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



                            console.log("this.itemG1");
                            console.log(this.itemG1);
                        }
                    });
                }
            });
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



                            console.log("this.itemG2");
                            console.log(this.itemG2);
                        }
                    });
                }
            });
        }
    }

    private loadThisItem(itemSent){
        this.mandatoryItemId = [];
        this.mandatoryItemArray = [];
        delete this.requiredAddonArray;

        if (itemSent.options && itemSent.options.length > 0) {
            for (var j = 0; j < itemSent.options.length; j++) {
                if (itemSent.options[j].groupType && itemSent.options[j].groupType.gType == 'mandatory') {
                    this.mandatoryItemId.push(itemSent.options[j]);
                    var obj = {};
                    obj['min'] = itemSent.options[j].groupType.min;
                    obj['max'] = itemSent.options[j].groupType.max;
                    obj['total'] = 0;
                    this.mandatoryItemArray[itemSent.options[j]._id] = obj;
                }

                console.log("this.mandatoryItemId");
                console.log(this.mandatoryItemId);
            }
        }
    }

    private showDetail(itemObj,itemMultiSizeObj) {

        $("div[id^='changeBg_']").removeClass('changeBg');
        $('#changeBg_ig1_'+itemObj._id).addClass('changeBg');
        $('#changeBg_ig2_'+itemObj._id).addClass('changeBg');

        this.loadThisItem(itemObj);

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
        $("div[id^='changeBg_']").removeClass('changeBg');

        $("textarea[id$='_specialInstructionIG1']").val('');
        $("textarea[id$='_specialInstructionIG2']").val('');

        delete this.requiredAddonArray;
        delete this.mandatoryItemId;
        delete this.mandatoryItemArray;
    }

    private addonUncheck(){
        $('.subAddOnDetail').removeClass('addonCheckClass');
        $('.subAddOnDetail').attr('data-addon','check');
    }

    private multiSizePriceInfo(itemMultiSizeObj) {
        this.orderItem.multisize = itemMultiSizeObj;
        this.multiSizePrice = parseInt(itemMultiSizeObj.price);
        this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }

    private addonPriceInfo(addonObj,addonDetail,group,option) {
        delete this.requiredAddonArray;

        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');

        var temp = id.split('_');
        var tempItemId = temp[2];
        var tempLocationId = temp[0]+'_'+temp[1];


        var groupId = group._id;
        if (isCheck == 'check') {
            $('#'+id).addClass('addonCheckClass');
            /*document.getElementById(id).style.backgroundColor = '#e1eef5';*/
            document.getElementById(id).setAttribute('data-addon','uncheck');
            addonObj.groupId = groupId;

            if (this.mandatoryItemArray[groupId]) {
                this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total+1;
            }

            if (group.groupType.gType == 'mandatory') {
                if (group.groupType.min == group.groupType.max && group.groupType.min == '1') {
                    var num = 0;
                    var manda = [];
                    for (var j = 0; j < this.orderItem.addon.length; j++) {
                        num = this.orderItem.addon.reduce(function (n, x) {
                            return n + (x.groupId == group._id);
                        }, 0);
                    }
                    manda[group._id] = num;

                    if (num != 0) {
                        for (var i = 0; i < this.orderItem.addon.length; i++) {
                            let indx = this.orderItem.addon.findIndex(itm => itm.groupId == group._id);
                            if (indx > -1) {
                                var idz = tempLocationId+'_'+tempItemId+'_'+this.orderItem.addon[indx]._id;
                                this.addonPrice = this.addonPrice - parseInt(this.orderItem.addon[indx].price);
                                this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
                                if (this.mandatoryItemArray[groupId]) {
                                    this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total-1;
                                }
                                this.orderItem.addon.splice(indx,1);
                                $('#'+idz).removeClass('addonCheckClass');
                                /*document.getElementById(idz).style.backgroundColor = '#fff';*/
                                document.getElementById(idz).setAttribute('data-addon','check');
                            }
                        }
                    }
                }
            }

            this.orderItem.addon.push(addonObj);
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            if (this.mandatoryItemArray[groupId]) {
                this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total-1;
            }
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            $('#'+id).removeClass('addonCheckClass');
            /*document.getElementById(id).style.backgroundColor = '#fff';*/
            document.getElementById(id).setAttribute('data-addon','check');
            this.addonPrice = this.addonPrice - parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }
        this.orderItem.totalPrice = this.finalPrice;
        this.orderItem.quantity = this.quantity;
    }

    private addToCart(id,type) {

        if (this.index == 6) {
            if (this.cartTotalAmount < this.promotion.minCartAmount) {
                toastr.remove();
                toastr.warning('Cant add this deal now \n Minimum Cart Amount should be ' + this.promotion.minCartAmount);
            }else{
                this.addCart(id,type);
            }
        }

        if (this.index != 6) {
            this.addCart(id,type);
        }
    }

    private addCart(id,type){
        var discountOn = this.promotion.discountOn;

        $('.errMsgDiv').hide();
        this.requiredAddonArray = [];

        var count = 0
        if (this.mandatoryItemId.length > 0) {
            for (var i = 0; i < this.mandatoryItemId.length; i++) {
                let id : String;
                if (type == 'itemG1') {
                    id = '#group_ig1_'+this.mandatoryItemId[i]._id;
                }else{
                    id = '#group_ig2_'+this.mandatoryItemId[i]._id;
                }
                if (this.mandatoryItemArray[this.mandatoryItemId[i]._id].total >= parseInt(this.mandatoryItemArray[this.mandatoryItemId[i]._id].min) && this.mandatoryItemArray[this.mandatoryItemId[i]._id].total <= parseInt(this.mandatoryItemArray[this.mandatoryItemId[i]._id].max) ) {
                    $(id + ' div.subAddOn').removeClass('errBoxShadow');
                    $(id + ' div.subAddOnDetail').removeClass('errBackground');
                    count++;
                }else{
                    count--;
                    $(id + ' div.subAddOn').addClass('errBoxShadow');
                    $(id + ' div.subAddOnDetail').addClass('errBackground');
                    this.requiredAddonArray.push(this.mandatoryItemId[i]);
                }
            }
        }

        if (this.requiredAddonArray.length > 0) {
            $('.errMsgDiv').fadeIn(1500);
            setTimeout(()=>{            
                $('.errMsgDiv').fadeOut(3000);
                //delete this.requiredAddonArray;
            },30000);
        }

        setTimeout(()=>{
            if (count == this.mandatoryItemId.length){
                if (type == 'itemG1') {
                    var id1 = 'Location_' + id + '_specialInstructionIG1';
                    var idG1 = <HTMLInputElement>document.getElementById(id1);
                    this.orderItem['itemInstruction'] = idG1.value;

                    idG1.value = "";

                    if (typeof discountOn[1] == 'undefined') {
                        var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.orderItem.totalPrice;
                        this.orderItem.totalPrice = discountedPrice;
                        this.promotionItem['itemGroup1'] = this.orderItem;
                        this.promotionItem['total'] = this.orderItem.totalPrice;
                        this.promoGroup = this.promotionItem;
                        localStorage.setItem(this.promotionStorage, JSON.stringify(this.promoGroup));
                        localStorage.removeItem(this.coupon);
                        toastr.remove();
                        toastr.success("Deal Added",null, {'positionClass' : 'toast-top-full-width'});
                        this.router.navigate(['/frontend',this.restaurants._id]);
                        this.orderItem = {}
                        this.hideDiv();
                    }
                    
                    if (typeof discountOn[1] != 'undefined' && discountOn[1]['itemGroup2'].length > 0 && (this.promotionItem['itemGroup2'] == null || typeof this.promotionItem['itemGroup2'] == 'undefined')) {
                        this.promotionItem['itemGroup1'] = this.orderItem;
                        toastr.remove();
                        toastr.warning("Please select another item to get this deal",null, {'positionClass' : 'toast-top-full-width'});
                        this.orderItem = {}
                        this.hideDiv();
                        this.selectItem(2);
                    }


                    if (typeof discountOn[1] != 'undefined' && discountOn[1]['itemGroup2'].length > 0 && (this.promotionItem['itemGroup2'] != null || typeof this.promotionItem['itemGroup2'] != 'undefined')) {
                        this.promotionItem['itemGroup1'] = this.orderItem;
                        if (this.promotionItem['itemGroup1'].totalPrice <= this.promotionItem['itemGroup2'].totalPrice) {
                            var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.promotionItem['itemGroup1'].totalPrice;
                            this.promotionItem['itemGroup1'].totalPrice = discountedPrice;
                            this.promotionItem['total'] = this.promotionItem['itemGroup1'].totalPrice + this.promotionItem['itemGroup2'].totalPrice;
                        }else{
                            var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.promotionItem['itemGroup2'].totalPrice;
                            this.promotionItem['itemGroup2'].totalPrice = discountedPrice;
                            this.promotionItem['total'] = this.promotionItem['itemGroup1'].totalPrice + this.promotionItem['itemGroup2'].totalPrice;
                        }

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
                    this.orderItem['itemInstruction'] = idG2.value;

                    idG2.value = "";

                    this.promotionItem['itemGroup2'] = this.orderItem;

                    if (typeof discountOn[0] != 'undefined' && discountOn[0]['itemGroup1'].length > 0 && (this.promotionItem['itemGroup1'] == null || typeof this.promotionItem['itemGroup1'] == 'undefined')) {
                        toastr.remove();
                        toastr.warning("Please select another item to get this deal",null, {'positionClass' : 'toast-top-full-width'});
                        this.orderItem = {}
                        this.hideDiv();
                        this.selectItem(1);
                    }
                    if (typeof discountOn[0] != 'undefined' && discountOn[0]['itemGroup1'].length > 0 && (this.promotionItem['itemGroup1'] != null || typeof this.promotionItem['itemGroup1'] != 'undefined')) {
                        if (this.promotionItem['itemGroup1'].totalPrice <= this.promotionItem['itemGroup2'].totalPrice) {
                            var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.promotionItem['itemGroup1'].totalPrice;
                            this.promotionItem['itemGroup1'].totalPrice = discountedPrice;
                            this.promotionItem['total'] = this.promotionItem['itemGroup1'].totalPrice + this.promotionItem['itemGroup2'].totalPrice;
                        }else{
                            var discountedPrice = ((100 - this.promotion.discountPercent)/100)*this.promotionItem['itemGroup2'].totalPrice;
                            this.promotionItem['itemGroup2'].totalPrice = discountedPrice;
                            this.promotionItem['total'] = this.promotionItem['itemGroup1'].totalPrice + this.promotionItem['itemGroup2'].totalPrice;
                        }
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
        },2000)

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

    showPos(id, type) {
        if (this.detailShow == id) {
            let divId : String;
            if (type == 'ig1') {
                divId = '#changeBg_ig1_'+id
            }
            if (type == 'ig2') {
                divId = '#changeBg_ig2_'+id
            }

            let left = '';
            let itemP = '#itemPop_'+id;

            $(itemP).attr("tabindex",1).focus();

            /*var $target = $(itemP);
            let top = $target.offset().top;
            $('html, body').stop().animate({
                'scrollTop': top
            }, 20, 'linear', function () {
                window.location.hash = itemP;
            });*/

            var offset = $(divId).offset();

            let offsetLeft = offset.left;
            
            
            if (offsetLeft < 150) {
                left = '100%';
            }else{
                left = '-100%';
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
    offerAvailable: boolean = false;
    tempGroup=[];

    mandatoryItemId=[];
    mandatoryItemArray=[];

    spicyArray : any = [1,2,3];

    requiredAddonArray : any;

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

    private scrollToMenu(id){
        let menu = '#menuItem_' + id;
        var $target = $(menu);
        let top = $target.offset().top;
        $('html, body').stop().animate({
            'scrollTop': top-65
        }, 900);
    }

    resImage(img){
        if (img != null && img != "") {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "assets/images/banner.jpg";
        }
        return imgPath;
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

    private checkItemShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'blockClass';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'blockClass';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'blockClass';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'blockClass';
                }else{
                    return 'noneClass';
                }
            }else{
                return 'noneClass';
            }
        }else{
            return 'blockClass';
        }
    }

    private checkMenuShow(obj){
        var currentDate2 = new Date();
        var date2 = currentDate2.toLocaleDateString();
        var h = this.addZero(currentDate2.getHours());
        var m = this.addZero(currentDate2.getMinutes());
        var s = this.addZero(currentDate2.getSeconds());
        var time2 = h+':'+m;
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= time2 && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'showBlockMenu';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'showBlockMenu';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'showBlockMenu';
                }else{
                    return 'showNoneMenu';
                }
            }else{
                return 'showNoneMenu';
            }
        }else{
            return 'showBlockMenu';
        }
    }

    private loadAllUsers(id) {
        this.kitchenMenuService.getAll(id).subscribe(users => {
            let menuList = users.message;
            for (var i = 0; i < menuList.length; i++) {
                var x = this.items.findIndex(mn=>menuList[i]['_id'] == mn.menuId)
                if (x > -1) {
                    this.menus.push(menuList[i])
                }
            }
        });
    }

    private loadAllItem(id) {
        this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
            this.items = users.message;
            this.loadAllUsers(id);
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

    showPos(id) {
        if (this.detailShow == id) {
            let divId = '#changeBg_'+id
            let left = '';
            let itemP = '#itemPop_'+id;

            $(itemP).attr("tabindex",1).focus();
            
            /*var $target = $(itemP);
            let top = $target.offset().top;
            $('html, body').stop().animate({
                'scrollTop': top
            }, 20, 'linear', function () {
                window.location.hash = itemP;
            });*/

            //$('html, body').animate({ scrollTop: $(itemP).offset().top }, 'slow');
            var offset = $(divId).offset();

            let offsetLeft = offset.left;
            if (offsetLeft < 150) {
                left = '100%';
            }else{
                left = '-100%';
            }
            return left;
        }
    }

    private hideDiv() {
        this.detailShow='';
        this.addonUncheck();
        $("div[id^='changeBg_']").removeClass('changeBg');

        $("textarea[id$='_specialInstruction']").val('');

        delete this.requiredAddonArray;
        delete this.mandatoryItemId;
        delete this.mandatoryItemArray;
    }

    private addonUncheck(){
        $('.subAddOnDetail').removeClass('addonCheckClass');
        $('.subAddOnDetail').attr('data-addon','check');
    }

    deleteErrMsg(i){
        this.requiredAddonArray.splice(i,1);
    }

    private addToCart(id) {
        $('.errMsgDiv').hide();
        this.requiredAddonArray = [];

        var count = 0
        if (this.mandatoryItemId.length > 0) {
            for (var i = 0; i < this.mandatoryItemId.length; i++) {
                let id = '#group_'+this.mandatoryItemId[i]._id;
                if (this.mandatoryItemArray[this.mandatoryItemId[i]._id].total >= parseInt(this.mandatoryItemArray[this.mandatoryItemId[i]._id].min) && this.mandatoryItemArray[this.mandatoryItemId[i]._id].total <= parseInt(this.mandatoryItemArray[this.mandatoryItemId[i]._id].max) ) {
                    $(id + ' div.subAddOn').removeClass('errBoxShadow');
                    $(id + ' div.subAddOnDetail').removeClass('errBackground');
                    count++;
                }else{
                    count--;
                    $(id + ' div.subAddOn').addClass('errBoxShadow');
                    $(id + ' div.subAddOnDetail').addClass('errBackground');
                    this.requiredAddonArray.push(this.mandatoryItemId[i]);
                }
            }
        }

        if (this.requiredAddonArray.length > 0) {
            $('.errMsgDiv').fadeIn(1500);
            setTimeout(()=>{            
                $('.errMsgDiv').fadeOut(3000);
                //delete this.requiredAddonArray;
            },30000);
        }

        setTimeout(()=>{

            if (count == this.mandatoryItemId.length) {
                var itemId = 'Location_' + id + '_specialInstruction';
                var itemInstruction = <HTMLInputElement>document.getElementById(itemId);
                this.orderItem['itemInstruction'] = itemInstruction.value;

                itemInstruction.value = "";

                this.totalOrder = JSON.parse(localStorage.getItem(this.cartStorage));
                this.totalOrder.push(this.orderItem);
                localStorage.setItem(this.cartStorage, JSON.stringify(this.totalOrder));
                toastr.remove();
                toastr.info(null, this.totalOrder.length+' Items Added', {'positionClass' : 'toast-top-full-width'});
                this.hideDiv();
            }else{
                console.log("addon left");
            }
        },2000);
    }

    private addonPriceInfo(addonObj,addonDetail,group,option) {
        delete this.requiredAddonArray;

        var isCheck = addonDetail.getAttribute('data-addon');
        var id = addonDetail.getAttribute('id');

        var temp = id.split('_');
        var tempItemId = temp[1];

        var groupId = group._id;
        if (isCheck == 'check') {

            $('#'+id).addClass('addonCheckClass');
            /*document.getElementById(id).style.backgroundColor = '#e1eef5';*/
            document.getElementById(id).setAttribute('data-addon','uncheck');
            addonObj.groupId = groupId;

            if (this.mandatoryItemArray[groupId]) {
                this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total+1;
            }

            if (group.groupType.gType == 'mandatory') {
                if (group.groupType.min == group.groupType.max && group.groupType.min == '1') {
                    var num = 0;
                    var manda = [];
                    for (var j = 0; j < this.orderItem.addon.length; j++) {
                        num = this.orderItem.addon.reduce(function (n, x) {
                            return n + (x.groupId == group._id);
                        }, 0);
                    }
                    manda[group._id] = num;

                    if (num != 0) {
                        for (var i = 0; i < this.orderItem.addon.length; i++) {
                            let indx = this.orderItem.addon.findIndex(itm => itm.groupId == group._id);
                            if (indx > -1) {
                                var idz = 'Location_'+tempItemId+'_'+this.orderItem.addon[indx]._id;
                                this.addonPrice = this.addonPrice - parseInt(this.orderItem.addon[indx].price);
                                this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
                                if (this.mandatoryItemArray[groupId]) {
                                    this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total-1;
                                }
                                this.orderItem.addon.splice(indx,1);
                                $('#'+idz).removeClass('addonCheckClass');
                                /*document.getElementById(idz).style.backgroundColor = '#fff';*/
                                document.getElementById(idz).setAttribute('data-addon','check');
                            }
                        }
                    }
                }
            }

            this.orderItem.addon.push(addonObj);
            this.addonPrice = this.addonPrice + parseInt(addonObj.price);
            this.finalPrice = (this.multiSizePrice + this.price+ this.addonPrice)* this.quantity;
        }else{
            if (this.mandatoryItemArray[groupId]) {
                this.mandatoryItemArray[groupId].total=this.mandatoryItemArray[groupId].total-1;
            }
            var addonIndex = this.orderItem.addon.findIndex(item => item._id == addonObj._id);
            this.orderItem.addon.splice(addonIndex, 1);
            $('#'+id).removeClass('addonCheckClass');
            /*document.getElementById(id).style.backgroundColor = '#fff';*/
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

    private loadThisItem(itemSent){
        $('div.subAddOn').removeClass('errBoxShadow');
        $('div.subAddOnDetail').removeClass('errBackground');
        this.mandatoryItemId = [];
        this.mandatoryItemArray = [];
        delete this.requiredAddonArray;

        if (itemSent.options && itemSent.options.length > 0) {
            for (var j = 0; j < itemSent.options.length; j++) {
                if (itemSent.options[j].groupType && itemSent.options[j].groupType.gType == 'mandatory') {
                    this.mandatoryItemId.push(itemSent.options[j]);
                    var obj = {};
                    obj['min'] = itemSent.options[j].groupType.min;
                    obj['max'] = itemSent.options[j].groupType.max;
                    obj['total'] = 0;
                    this.mandatoryItemArray[itemSent.options[j]._id] = obj;
                }

                console.log("this.mandatoryItemId");
                console.log(this.mandatoryItemId);
            }
        }
    }

    private showDetail(itemObj,itemMultiSizeObj) {
        $("div[id^='changeBg_']").removeClass('changeBg');
        $('#changeBg_'+itemObj._id).addClass('changeBg');

        this.loadThisItem(itemObj);

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
            zoom: 10,
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
    completeDateMDYformat :string ;
    completeDateYMDformat :string ;

    couponCodeApplied :string ;
    cartSubTotal :string ;
    coupon :string ;
    order: any = {};
    cartDetail: any = {};
    objForUpdate: any = {};
    cart:any=[];
    promotionOrder:any;
    
    laterDay:any;
    laterTime:any;
    laterPickupDay:any;
    laterPickupTime:any;
    laterDeliveryDay:any;
    laterDeliveryTime:any;




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
    cstMsg:boolean=false;
    addressClicked:boolean;
    grandTotal:number;
    indexPromotion:number;
    promotionOrderMinAmount:number;
    cartTotalAmount: number;
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
    regForm:FormGroup;
    currentDate:any;
    date : any;
    timeO : any;
    dayO : any;
    /*day :any = 'today';
    days:any = [{day : "today"}, {day: "tomorrow"}];
    time:any = '8:00';
    times:any = [{time:"8:00"},{time:"9:00"},{time:"10:00"},{time:"11:00"},{time:"12:00"},{time:"13:00"},{time:"14:00"},{time:"15:00"},{time:"16:00"},{time:"17:00"},{time:"18:00"},{time:"19:00"},{time:"20:00"}]*/
    months:any = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    years:any=[];

    enableDisablePicker = 'enableDisablePicker';

    laterDiffDays : number = 0;

    spicyArray : any = [1,2,3];


    guestLogin : any;

    constructor(
        private lf: FormBuilder,
        private masterService: MasterService,
        private restaurantsService: RestaurantsService,
        private customerService: CustomersService,
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private translate: TranslateService,
        private promotionsService: PromotionsService,
        private socketService :  SocketService
        ) {
        this.showHideContactDetail = false;
        this.showHideOrderingMethod = false;
        this.showHideTime = false;
        this.showHidePaymentMethod = false;
        this.del = false;
        this.addressClicked = true;
        this.editOrderMethod = false;
        this.editTimeMethod = false;
        this.editPaymentMethod = false;
    }

    ngOnInit() {

        this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');
        this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');

        this.addressForm = this.lf.group({
            streetName: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
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
            this.cartSubTotal = 'subTotal_' + id;
            localStorage.removeItem(this.orderTimeStorage);
            this.loadAllPromotions();
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

        this.regForm = this.lf.group({
            phonenumber: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        if (localStorage.getItem(this.cartSubTotal)) {
            this.cartTotalAmount = JSON.parse(localStorage.getItem(this.cartSubTotal));
            console.log("this.cartTotalAmount");
            console.log(this.cartTotalAmount);
        }

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

        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());

        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth()+1);
        var year = this.currentDate.getFullYear();

        this.currentTime = h+':'+m;
        this.timeO = h+':'+m +':'+ s;

        this.completeDate = date+'-'+month+'-'+year;
        this.completeDateMDYformat = month+'-'+date+'-'+year;
        this.completeDateYMDformat = year+'-'+month+'-'+date;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.dayO = days[this.currentDate.getDay()];

        (<HTMLInputElement>document.getElementById("paymentDiv")).style.display = 'none';

        this.makePaymentModel.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.yearAdd();

        this.laterTime = this.timeO;
        this.laterDay =  this.dayO + ', ' + this.completeDate;

        /*var date1 = new Date("12-17-2010");
        var date2 = new Date("12-15-2010");
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        alert(diffDays);*/
    }

    private showCustomMessage(){
        this.cstMsg = !this.cstMsg;
    }

    private hideMessage(){
        document.getElementById('custmMsg').style.display = 'none';
    }

    public loadScript(url,type) {
        if (type == 'js') {
            let node = document.createElement('script');
            node.src = url;
            node.type = 'text/javascript';
            document.getElementsByTagName('body')[0].appendChild(node);
        }else{
            let node = document.createElement('link');
            node.href = url;
            node.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    private fetchPromotion(id){
        this.indexPromotion = this.allPromotions.findIndex(mn => mn._id == id);
        if(this.indexPromotion == 6){
            if(this.promotionOrder.promotion && this.promotionOrder.promotion['minCartAmount']){
                this.promotionOrderMinAmount = this.promotionOrder.promotion['minCartAmount'];

                this.update();

                console.log("this.promotionOrderMinAmount");
                console.log(this.promotionOrderMinAmount);
            }
        }
    }

    private loadAllPromotions() {
        this.promotionsService.getAll().subscribe(promotions => {
            this.allPromotions = promotions.message;

            if (JSON.parse(localStorage.getItem(this.promotionStorage))) {
                this.promotionOrder = JSON.parse(localStorage.getItem(this.promotionStorage));
                if(this.promotionOrder.promotion && this.promotionOrder.promotion['promotionId']){
                    this.fetchPromotion(this.promotionOrder.promotion['promotionId'][0]);
                }
                this.cartZero = true;
                this.cartDetail['promotion'] = this.promotionOrder;
                this.saveInfo();
                this.update();
            }
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

    showCartDiv(){
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
            this.deliveryFee = 0;
            delete this.amount;
            delete this.cartDetail.deliveryfee;
            delete this.cartDetail.deliveryTax;
            this.update();

            if (this.orderTime.tType == 'Later') {
                this.addTime = false;
                this.editTimeMethod = false;
                this.showHideTime = false;
                this.flagForTime=false;
                this.enableDisablePicker = 'enableDisablePicker';
                localStorage.removeItem(this.orderTimeStorage);
                this.orderTime={};
                delete this.cartDetail.orderTime;
            }
            if (typeof this.orderPayment.ptype != 'undefined') {
                this.paymentMethod = false;
                this.editPaymentMethod = false;
                this.showHidePaymentMethod = false;
                this.flagForPayment = false;
                localStorage.removeItem(this.orderPaymentStorage);
                this.orderPayment={};
                delete this.cartDetail.orderPayment;
            }
        }
        
        if (id=="delivery") {
            this.del=true;
            this.orderMethod.mType = 'Delivery';
            this.addressClicked = true;
            this.deliveryAddress = false;
            this.orderType = false;

            if (this.orderTime.tType == 'Later') {
                this.addTime = false;
                this.editTimeMethod = false;
                this.showHideTime = false;
                this.flagForTime=false;
                this.enableDisablePicker = 'enableDisablePicker';
                localStorage.removeItem(this.orderTimeStorage);
                this.orderTime={};
                delete this.cartDetail.orderTime;
            }
            if (typeof this.orderPayment.ptype != 'undefined') {
                this.paymentMethod = false;
                this.editPaymentMethod = false;
                this.showHidePaymentMethod = false;
                this.flagForPayment = false;
                localStorage.removeItem(this.orderPaymentStorage);
                this.orderPayment={};
                delete this.cartDetail.orderPayment;
            }
        }
        this.saveInfo();
    }

    private pickupOnly(){
        localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));
        this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));
        this.cartDetail.orderMethod=this.orderMethod;        
        this.orderType=true;
        this.saveInfo();
        this.showHideOrderingMethod =false;
        this.editOrderMethod = true;
        toastr.remove();
        toastr.info('Order Method Updated','Information', {'positionClass' : 'toast-top-full-width'});   

        console.log("this.cartDetail");
        console.log(this.cartDetail);
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
                if (this.restaurants['deliveryoutside']) {
                    if (confirm("Outside our delivery zones! \n A delivery fee of $50 will be added for your location")) {
                        this.deliveryFee = 50;
                        this.amount = 0;
                        this.orderType = true;
                        this.cartDetail.deliveryfee = this.deliveryFee;
                        this.update();
                        toastr.remove();
                        toastr.info('A delivery fee of $50 is added',null,{'positionClass' : 'toast-top-full-width'});
                    }else{
                        this.deliveryFee = 0;
                        this.amount = 0;
                        this.orderType = false;
                        this.cartDetail.deliveryfee = this.deliveryFee;
                        this.update();
                        toastr.remove();
                        toastr.warning('No delivery Available on this address','Try Again',{'positionClass' : 'toast-top-full-width'});
                    }
                }else{
                    this.deliveryFee = 0;
                    this.amount = 0;
                    this.orderType = false;
                    this.cartDetail.deliveryfee = this.deliveryFee;
                    this.update();
                    toastr.remove();
                    toastr.warning('No delivery Available on this address','Try Again',{'positionClass' : 'toast-top-full-width'});
                }
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

    private editOrder(){
        this.editOrderMethod = !this.editOrderMethod;
        this.showHideOrderingMethod = true;
        this.deliveryAddress = true;
    }







    private setTime(id){
        if (id=="now") {
            this.enableDisablePicker = 'enableDisablePicker';
            this.orderTime = {};
            this.orderTime.tType = 'Now';
            this.flagForTime=true;
        }
        else if (id=="later") {
            /*$('#datetimepicker1').datetimepicker({format : 'dddd, DD-MM-YYYY'});*/
            if (this.orderMethod.mType == 'Pickup') {
            $('#datetimepicker1').datetimepicker({
                    format : 'dddd, DD-MM-YYYY',
                    minDate:this.completeDateYMDformat,
                    maxDate:this.laterPickupDay,
                });
            }
            if (this.orderMethod.mType == 'Delivery') {
                $('#datetimepicker1').datetimepicker({
                    format : 'dddd, DD-MM-YYYY',
                    minDate:this.completeDateYMDformat,
                    maxDate:this.laterDeliveryDay,
                });
            }
            $('#datetimepicker2').datetimepicker({format:'HH:mm:ss'});

            this.enableDisablePicker = '';
            this.orderTime = {};
            this.orderTime.tType = 'Later';
            this.flagForTime=false;
        }
    }

    private showDatePicker(type){
        if (this.orderMethod.mType == 'Pickup') {
            $('#datetimepicker1').datetimepicker({
                format : 'dddd, DD-MM-YYYY',
                minDate:this.completeDateYMDformat,
                maxDate:this.laterPickupDay,
            });
        }
        if (this.orderMethod.mType == 'Delivery') {
            $('#datetimepicker1').datetimepicker({
                format : 'dddd, DD-MM-YYYY',
                minDate:this.completeDateYMDformat,
                maxDate:this.laterDeliveryDay,
            });
        }
        $('#datetimepicker2').datetimepicker({
            format:'HH:mm:ss'
        });
    }

    private getValue(type){
        let eleObj = (<HTMLInputElement>document.getElementById(type));
        if (type == 'datetimepicker1') {

            var val2 = eleObj.value.split(', ');
            var D2 = val2[1].split('-');

            var date1 = new Date(this.completeDateMDYformat);
            var date2 = new Date(D2[1]+'-'+D2[0]+'-'+D2[2]);

            var timeDiff = date2.getTime() - date1.getTime();
            this.laterDiffDays = timeDiff / (1000 * 3600 * 24);

            if (this.laterDiffDays == 0) {
                if (this.orderMethod.mType == 'Pickup') {                
                    if (this.laterTime && this.laterTime < this.laterPickupTime) {
                        toastr.warning('Select time Again');
                        delete this.laterTime;
                        this.flagForTime=false;
                        this.addTime = false;
                    }
                }
                if (this.orderMethod.mType == 'Delivery') {                
                    if (this.laterTime && this.laterTime < this.laterDeliveryTime) {
                        toastr.warning('Select time Again');
                        delete this.laterTime;
                        this.flagForTime=false;
                        this.addTime = false;
                    }
                }
            }else{
                if (this.laterTime) {
                    this.flagForTime=true;
                    this.addTime = true;
                }
            }
            this.laterDay = eleObj.value;
            console.log(this.laterDay);
        }

        if (type == 'datetimepicker2') {
            if (this.laterDiffDays == 0) {
                if (this.orderMethod.mType == 'Pickup') {
                    if (eleObj.value < this.laterPickupTime) {
                        toastr.error('For Later Pickup Order, The order placement has to be at least: ' +this.restaurants.orderforlaterpickup['mintime']+ ' min before');
                        this.flagForTime=false;
                        this.addTime = false;
                    }else{
                        this.laterTime = eleObj.value;
                        this.flagForTime=true;
                        this.addTime = true;
                    }
                }
                if (this.orderMethod.mType == 'Delivery') {
                    if (eleObj.value < this.laterDeliveryTime) {
                        toastr.error('For Later Delivery Order, The order placement has to be at least: ' +this.restaurants.orderforlaterdelivery['mintime']+ ' min before');
                        this.flagForTime=false;
                        this.addTime = false;
                    }else{
                        this.laterTime = eleObj.value;
                        this.flagForTime=true;
                        this.addTime = true;
                    }
                }
            }else{
                this.laterTime = eleObj.value;
                this.flagForTime=true;
                this.addTime = true;
            }

        }
    }

    private saveTimeInfo(){
        if (this.orderTime.tType == 'Later') {
            this.orderTime = {"tType": 'Later',"day":this.laterDay,"time":this.laterTime}
        }
        if (this.orderTime.tType == 'Now') {
            var date = Date();
            this.orderTime = {"tType": 'Now',"time":date}
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

        if (this.orderTime.tType == 'Later') {
            if (this.orderMethod.mType == 'Pickup') {
                $('#datetimepicker1').datetimepicker({
                    format : 'dddd, DD-MM-YYYY',
                    minDate:this.completeDateYMDformat,
                    maxDate:this.laterPickupDay,
                });
            }
            if (this.orderMethod.mType == 'Delivery') {
                $('#datetimepicker1').datetimepicker({
                    format : 'dddd, DD-MM-YYYY',
                    minDate:this.completeDateYMDformat,
                    maxDate:this.laterDeliveryDay,
                });
            }
            $('#datetimepicker2').datetimepicker({format:'HH:mm:ss'});
            this.enableDisablePicker = '';
        }else{
            this.enableDisablePicker = 'enableDisablePicker';
        }
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

        console.log("this.cartDetail");
        console.log(this.cartDetail);
    }

    private editPayment(){
        this.editPaymentMethod =!this.editPaymentMethod;
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
        if (this.showHideTime) {
            $('#datetimepicker1').datetimepicker({format : 'dddd, DD-MM-YYYY'});
            $('#datetimepicker2').datetimepicker({format:'HH:mm:ss'});
        }
    }

    private changeShowPaymentStatus(){
        this.showHidePaymentMethod = !this.showHidePaymentMethod;
    }

    private addressInfo(){
        this.addressClicked = !this.addressClicked;
         setTimeout(()=>{
            this.initMap();
        },2000)
    }

    private update(){
        let taxAmount : any;
        if (typeof this.promotionOrder != 'undefined') {
            this.cartDetail['promotion'] = this.promotionOrder;
        }

        if (this.cart.length > 0 || typeof this.promotionOrder != 'undefined') {
            this.cartZero = true;
        }else{
            this.cartZero = false;
        }

        this.grandTotal = 0;
        this.cartTotalAmount = 0;
        if(this.promotionOrder){
            this.grandTotal = this.grandTotal+this.promotionOrder.total;
        }
        for (var i = 0; i < this.cart.length; i++) {
            this.grandTotal = this.grandTotal+this.cart[i].totalPrice;

            this.cartTotalAmount = this.cartTotalAmount + this.cart[i].totalPrice;

        }

        if (typeof this.restaurants.taxation != 'undefined') {
            if (typeof this.cartTotal != 'undefined') {
                if (this.restaurants.taxation['menuTax'] == 'Apply Tax') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {                    
                        taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * (this.deliveryFee + this.cartTotal);
                        console.log("taxAmount ", taxAmount);
                        this.cartDetail.tax = taxAmount;
                        this.grandTotalWithTax = this.deliveryFee + this.cartTotal + taxAmount;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {                    
                        taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * this.cartTotal;
                        console.log("taxAmount ", taxAmount);
                        this.cartDetail.tax = taxAmount;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryFee;
                        console.log("deliveryTax ", deliveryTax);
                        this.cartDetail.deliveryTax = deliveryTax;

                        this.grandTotalWithTax = this.deliveryFee + this.cartTotal + taxAmount + deliveryTax;
                    }
                }

                if (this.restaurants.taxation['menuTax'] == 'Already Include') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {                    
                        //taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * (this.deliveryFee + this.cartTotal);
                        this.cartDetail.tax = 0;
                        this.grandTotalWithTax = this.deliveryFee + this.cartTotal;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {                    
                        //taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * this.cartTotal;
                        this.cartDetail.tax = 0;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryFee;
                        console.log("deliveryTax ", deliveryTax);
                        this.cartDetail.deliveryTax = deliveryTax;

                        this.grandTotalWithTax = this.deliveryFee + this.cartTotal + deliveryTax;
                    }
                }
            }else{
                if (this.restaurants.taxation['menuTax'] == 'Apply Tax') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {                    
                        taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * (this.deliveryFee + this.grandTotal);
                        console.log("taxAmount ", taxAmount);
                        this.cartDetail.tax = taxAmount;
                        this.grandTotalWithTax = this.deliveryFee + this.grandTotal + taxAmount;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {                    
                        taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * this.grandTotal;
                        console.log("taxAmount ", taxAmount);
                        this.cartDetail.tax = taxAmount;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryFee;
                        console.log("deliveryTax ", deliveryTax);
                        this.cartDetail.deliveryTax = deliveryTax;

                        this.grandTotalWithTax = this.deliveryFee + this.grandTotal + taxAmount + deliveryTax;
                    }
                }

                if (this.restaurants.taxation['menuTax'] == 'Already Include') {
                    if (this.restaurants.taxation['deliveryTaxType'] == 'Same Tax') {                    
                        //taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * (this.deliveryFee + this.grandTotal);
                        this.cartDetail.tax = 0;
                        this.grandTotalWithTax = this.deliveryFee + this.grandTotal;
                    }

                    if (this.restaurants.taxation['deliveryTaxType'] == 'New Tax') {                    
                        //taxAmount = (parseInt(this.restaurants.taxation.tax)/100) * this.grandTotal;
                        this.cartDetail.tax = 0;

                        let deliveryTax : any;
                        deliveryTax = (parseInt(this.restaurants.taxation.deliveryTax)/100) * this.deliveryFee;
                        console.log("deliveryTax ", deliveryTax);
                        this.cartDetail.deliveryTax = deliveryTax;

                        this.grandTotalWithTax = this.deliveryFee + this.grandTotal +  deliveryTax;
                    }
                }
            }
        }else{
            this.cartDetail.tax = 0;
            if (typeof this.cartTotal != 'undefined') {
                this.grandTotalWithTax =this.deliveryFee + this.cartTotal;
            }else{
                this.grandTotalWithTax =this.deliveryFee + this.grandTotal;
            }
        }

        this.cartDetail.subTotal=this.grandTotal;
        if (typeof this.discountAmount != 'undefined') {
            this.cartDetail.discountAmount=this.discountAmount;
        }else{
            this.cartDetail.discountAmount=0;
        }
        
        this.cartDetail.gTotal=this.grandTotalWithTax ;
        this.cartDetail.orderMethod=this.orderMethod;
        this.saveInfo();

        if (this.cartDetail['promotion'] && this.cartDetail.subTotal < this.minCartAmount) {
            this.removeCoupon();
        }

        localStorage.setItem(this.cartSubTotal,JSON.stringify(this.cartTotalAmount));

        this.cartTotalAmount = JSON.parse(localStorage.getItem(this.cartSubTotal));
        console.log("this.cartDetail", this.cartDetail);
    }

    private deleteCart(index) {
        if ((this.cartDetail['promotion'] && typeof this.couponCodeApplied == 'undefined' && this.indexPromotion != 6 ) || typeof this.cartDetail['promotion'] == 'undefined') {
            if (confirm("Are you sure to delete ?")) {
                this.cart.splice(index,1);
                localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                this.update();
                toastr.remove();
                toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
            }
        }

        if (this.cartDetail['promotion'] && typeof this.couponCodeApplied != 'undefined') {
            if (confirm("Removing Item will remove your Coupon Applied! \n continue?")) {
                this.cart.splice(index,1);
                delete this.cartDetail['promotion'];
                localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                this.update();
                toastr.remove();
                toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
                this.removeCoupon();
            }
        }

        if(this.cartDetail['promotion'] && this.indexPromotion == 6 && typeof this.promotionOrderMinAmount != 'undefined'){
            var afterCartTotalAmount = this.cartTotalAmount - this.cart[index]['totalPrice'];
            if (afterCartTotalAmount < this.promotionOrderMinAmount) {
                if (confirm("Removing item will remove your deal! \n continue?")) {
                    this.cart.splice(index,1);
                    localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                    delete this.promotionOrder;
                    delete this.cartDetail['promotion'];
                    localStorage.removeItem(this.promotionStorage);
                    this.update();
                    toastr.remove();
                    toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
                }
            }

            if (afterCartTotalAmount >= this.promotionOrderMinAmount) {
                if (confirm("Are you sure to delete ?")) {
                    this.cart.splice(index,1);
                    localStorage.setItem(this.cartStorage, JSON.stringify(this.cart));
                    this.update();
                    toastr.remove();
                    toastr.info('Item Deleted!',null, {'positionClass' : 'toast-top-full-width'});
                }
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

            console.log("this.restaurants");
            console.log(this.restaurants);

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

    placeOrder(){
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


                        this.socketService.orderFromCustomer(data.message);

                        if (this.cartDetail.promotion) {
                            this.increaseCount(this.cartDetail.promotion);
                        }

                        localStorage.setItem(this.cartStorage,'[]');
                        localStorage.removeItem(this.orderTimeStorage);
                        localStorage.removeItem(this.orderMethodStorage);
                        localStorage.removeItem(this.orderPaymentStorage);
                        
                        if (localStorage.getItem(this.coupon) != 'undefined' && localStorage.getItem(this.coupon) != 'null') {
                            localStorage.removeItem(this.coupon);
                        }
                        if (localStorage.getItem(this.promotionStorage) != 'undefined' && localStorage.getItem(this.promotionStorage) != 'null') {
                            localStorage.removeItem(this.promotionStorage);
                        }
                        /*toastr.success('Your Order is Placed!','Thank You!!', {'positionClass' : 'toast-top-full-width'});*/
                        this.router.navigate(['/thanku',this.restaurants._id]);
                    }
                });
            }
        }
    }

    private increaseCount(promotion){
        if (promotion.promotion) {
            promotion.promotion.count = promotion.promotion.count + 1;
            this.promotionsService.updateRestroPromotion(promotion.promotion).subscribe(data =>{
            });
        }
    }

    makePayment(){
        this.hmacGenerate();
        this.customerService.addOrder(this.cartDetail).subscribe(
          (data) => {
            /*this.user = data.message;*/
            if (data.error == false) {

                if (this.cartDetail.promotion) {
                    this.increaseCount(this.cartDetail.promotion);
                }

                localStorage.setItem(this.cartStorage,'[]');
                localStorage.removeItem(this.orderTimeStorage);
                if (localStorage.getItem(this.coupon) != 'undefined' && localStorage.getItem(this.coupon) != 'null') {
                    localStorage.remove(this.coupon);
                }
                if (localStorage.getItem(this.promotionStorage) != 'undefined' && localStorage.getItem(this.promotionStorage) != 'null') {
                    localStorage.removeItem(this.promotionStorage);
                }
                /*toastr.remove();
                toastr.success('Your Order is Placed!','Thank You!!', {'positionClass' : 'toast-top-full-width'});*/
                this.router.navigate(['/thanku',this.restaurants._id]);
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
        this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity + 1;
        this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;

        localStorage.setItem(this.cartStorage,JSON.stringify(this.cartDetail.orders));

        this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        this.update();
        
        if (this.cartDetail['promotion'] && typeof this.couponCodeApplied != 'undefined') {
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

            var afterCartTotalAmount = this.cartTotalAmount - totalprice;

            if (this.cartDetail['promotion'] && this.indexPromotion == 6 && typeof this.promotionOrderMinAmount != 'undefined') {
                if (afterCartTotalAmount < this.promotionOrderMinAmount) {
                    if (confirm("Decreasing Quantity will remove your deal! \n continue?")) {
                        this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity - 1;
                        this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;
                        delete this.promotionOrder;
                        delete this.cartDetail['promotion'];
                        localStorage.removeItem(this.promotionStorage);
                    }
                }

                if (afterCartTotalAmount >= this.promotionOrderMinAmount) {
                    this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity - 1;
                    this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;
                }
            }

            if ((this.cartDetail['promotion'] && this.indexPromotion != 6) || typeof this.cartDetail['promotion'] == 'undefined') {
                this.cartDetail.orders[index].quantity = this.cartDetail.orders[index].quantity - 1;
                this.cartDetail.orders[index].totalPrice = totalprice * this.cartDetail.orders[index].quantity;
            }


        }else{
            toastr.remove();
            toastr.warning('Atleast 1 Item is Mandatory',null, {'positionClass' : 'toast-top-full-width'});
        }

        localStorage.setItem(this.cartStorage,JSON.stringify(this.cartDetail.orders));
        this.cart = JSON.parse(localStorage.getItem(this.cartStorage));
        this.update();
        
        if (this.cartDetail['promotion'] && typeof this.couponCodeApplied != 'undefined') {
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
        this.minCartAmount = this.restroPromotions[index].minCartAmount;
        if (this.cartDetail.subTotal >= this.minCartAmount) {
            if (typeof this.couponCodeApplied == 'undefined') {
                this.couponCodeApplied = value;
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
        if (typeof this.cartDetail['promotion'] != "undefined") {
            delete this.cartDetail['promotion'];
        }

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






    showGuestLogin(){
        this.guestLogin = 'loader';

        setTimeout(()=>{
            this.guestLogin = 'form';
        },3000)
    }


    register(){
        this.customerService.addCustomer(this.regForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    let obj = {};

                    obj['username'] = this.regForm.value.username;
                    obj['password'] = this.regForm.value.password;
                    this.login(obj);

                }else{
                    toastr.remove();
                    toastr.warrning('Username/email already exist');
                    this.regForm.reset();
                }
            }
        );
    }

    private login(obj){
        this.guestLogin = 'loader'
        this.customerService.getCustomer(obj).subscribe(
            (data) => {
                if (data.status) {
                    localStorage.setItem(this.customerStorage, JSON.stringify(data.data._id));
                    toastr.remove();
                    toastr.success('You are successfully Logged In!', 'Success!', {'positionClass' : 'toast-top-full-width'});
                    delete this.guestLogin;

                    this.ngOnInit();
                }
                else{
                    toastr.remove();
                    toastr.warning('Something went wrong', 'Oops!', {'positionClass' : 'toast-top-full-width'});
                    delete this.guestLogin;
                    this.ngOnInit()
                }
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
        private socketService: SocketService
        )
    {}
    ngOnInit() {
        /*if (typeof this.route.snapshot.queryParams["show"] != 'undefined') {
            this.showRegister = true;
            this.showLogin = false;
        }*/

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

    showLoginForm(){
        this.showLogin = true;
        this.showRegister = false;
    }

    showRegisterForm(){
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
                    //this.socketService.assignSocketIdToCustomer(data.data);
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

    forgetPass(){
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

    resetPass(){
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

    customerChangePassword(){
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
