import { Component, OnInit, ViewEncapsulation, Input, ElementRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AlertService, RestaurantsService, PromotionsService,KitchenMenuService,KitchenItemService } from '../service/index';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as globalVariable from "../global";
import { FileUploader } from 'ng2-file-upload';

declare var $: any;
declare var toastr: any;

@Component({
   selector: 'app-marketingnav',
   templateUrl: './marketingnav.component.html',
   styles: []
})
export class MarketingNavComponent implements OnInit {
   currentOwner:any={};
   restaurants:any ={};
   constructor(private restaurantsService: RestaurantsService) {
   }

   ngOnInit() {
      this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
      this.getRestaurants();
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
      });
   }
}

@Component({
   selector: 'app-marketing',
   templateUrl: './marketing.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
   constructor() {}

   ngOnInit() {}
}

@Component({
   selector: 'app-marketing-overview',
   templateUrl: './marketingOverview.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingOverviewComponent implements OnInit {
   promotions = [];
   restaurants:any ={};

   constructor(
      private restaurantsService: RestaurantsService,
      private promotionsService: PromotionsService
      ) {}

   ngOnInit() {
      $("[id$='Div']").css("display","none"); 
      document.getElementById('firstDiv').style.display = 'block';
      this.getRestaurants();
      this.loadAllPromotions();
   }

   private loadAllPromotions() {
      this.promotionsService.getAll().subscribe(promotions => {
         this.promotions = promotions.message;
      });
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
      });
   }

   showDiv(id){
      $("[id$='Div']").css("display","none"); 
      document.getElementById(id).style.display = 'block';
   }
}

@Component({
   selector: 'app-marketing-promotions',
   templateUrl: './marketingPromotions.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingPromotionsComponent implements OnInit {
   promotions : any;
   clientOrderNum = [];
   restroPromotions = [];
   clientOrderAmount = [];
   clientLastOrder = [];
   orderDetail = {};
   restaurants:any ={};
   selected1 : any = 'selected1';
   selected2 : any = 'selected2';
   selected3 : any = 'selected3';
   selected4 : any = 'selected4';
   showTiming : boolean = false;
   clientDetail : boolean = false;
   addClicked : boolean = false;
   addClickedForAmount : boolean = false;
   addClickedForLst : boolean = false;
   typeAvailable : boolean = false;
   orderType : any;
   orderAmount : any;
   orderLast : any;
   orderSource : any;
   orderNum : string;
   orderAmt : string;
   orderLst : number;
   orderVia1 : string;

   clientOrderForm : FormGroup;
   clientAmountForm : FormGroup;
   clientLastOrderForm : FormGroup;

   constructor(
      private lf: FormBuilder,
      private restaurantsService: RestaurantsService,
      private router: Router,
      private promotionsService: PromotionsService
      ) {}

   ngOnInit() {
      this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');
      this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');

      this.clientOrderForm = this.lf.group({
         selectOptn: ['', Validators.required],
         orderNum: ['', Validators.required]
      });

      this.clientAmountForm = this.lf.group({
         selectOptnAmount: ['', Validators.required],
         orderAmt: ['', Validators.required]
      });

      this.clientLastOrderForm = this.lf.group({
         lastOrder: ['', Validators.required],
         orderViaSelect: [''],
         orderViaText: ['']
      });

      this.getRestaurants();
      this.getCustomData();
   }

   private selectCheck(event,id){
      this.promotionsService.getOnePromo(id).subscribe(data=> {
         var pro = data.message;
         if (event.target['checked']) {    
            pro.status = true;
         }

         if (!event.target['checked']) {    
            pro.status = false;
         }        
         this.promotionsService.updateRestroPromotion(pro).subscribe(data=> {
            this.loadAllRestroPromotions(this.restaurants._id);
         });
      });
   }

   private createDuplicate(id){
      this.promotionsService.getOnePromo(id).subscribe(data=> {
         var pro = data.message;
         //console.log(data.message);
         pro.promoname = pro.promoname + '-Copy';
         pro.status = false;
         delete pro._id;
         this.promotionsService.addPromotionDetail(pro).subscribe(data=>{
            if(data.error == false){
               this.loadAllRestroPromotions(this.restaurants._id);
            }
         });
      });
   }

   private editPromo(id){
      this.router.navigate(['/owner/marketing/promotions/edit-promotion', id]);
   }

   private removePromotion(id){
      if (confirm("Are you sure to delete ?")) {
         this.promotionsService.deleteRestroPromotion(id).subscribe(data=> {
            if(data.error == false){
               this.loadAllRestroPromotions(this.restaurants._id);
               toastr.remove();
               toastr.success('Deleted Successfully');
            }
         });
      }
   }

   private onChange(value){
      if (typeof this.orderLast[value].type != 'undefined') {
         this.typeAvailable = true;
         this.orderSource = this.orderLast[value].type;
         this.orderVia1 = this.orderSource[0].key;
      }
      else{
         this.typeAvailable = false;
      }
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

   private showOrder(type){
      if (type == 'num') {    
         this.addClicked = true;
         this.orderNum = this.orderType[0].key;
      }
      if (type == 'amount') {
         this.addClickedForAmount = true;
         this.orderAmt = this.orderAmount[0].key;
      }
      if (type == 'lastOrder') {    
         this.addClickedForLst = true;
         this.orderLst = 0;
         if (typeof this.orderLast[0].type != 'undefined') {
            this.typeAvailable = true;      
            this.orderSource = this.orderLast[0].type;
            this.orderVia1 = this.orderSource[0].key;
         }
      }
   }

   private hideOrder(type){
      if (type == 'num') {     
         this.addClicked = false;
      }
      if (type == 'amount') {     
         this.addClickedForAmount = false;
      }
      if (type == 'lastOrder') {     
         this.addClickedForLst = false;
      }
   }

   private clientOrderDetail(){
      var orderDetails = {};
      orderDetails['num'] = this.clientOrderForm.controls['orderNum'].value;
      for (var i = 0; i < this.orderType.length; i++) {
         if (this.orderType[i].key == this.clientOrderForm.controls['selectOptn'].value) {
            orderDetails['name'] = this.orderType[i].name;
            orderDetails['key'] = this.orderType[i].key;
            this.clientOrderNum.push(orderDetails);
            this.orderType.splice(i,1);
         }
      }
      this.addClicked = false;
   }

   private clientAmountDetail(){
      var orderDetails = {};
      orderDetails['amt'] = this.clientAmountForm.controls['orderAmt'].value;
      for (var i = 0; i < this.orderAmount.length; i++) {
         if (this.orderAmount[i].key == this.clientAmountForm.controls['selectOptnAmount'].value) {
            orderDetails['name'] = this.orderAmount[i].name;
            orderDetails['key'] = this.orderAmount[i].key;
            this.clientOrderAmount.push(orderDetails);
            this.orderAmount.splice(i,1);    
         }
      }
      this.addClickedForAmount = false;
   }

   private clientLastOrderDetail(){
      var orderDetails = {};
      orderDetails['completeInfo'] = this.orderLast[this.clientLastOrderForm.controls['lastOrder'].value];
      orderDetails['lastOrder'] = this.orderLast[this.clientLastOrderForm.controls['lastOrder'].value].name;
      if (typeof this.orderLast[this.clientLastOrderForm.controls['lastOrder'].value].type != 'undefined') {
         for (var i = 0; i < this.orderSource.length; i++) {
            if (this.orderSource[i].key == this.clientLastOrderForm.controls['orderViaSelect'].value) {
               orderDetails['orderVia'] = this.orderSource[i].name;
            }
         }
      }else{
         orderDetails['orderVia'] = this.clientLastOrderForm.controls['orderViaText'].value;
      }

      this.clientLastOrder.push(orderDetails);
      this.orderLast.splice(this.clientLastOrderForm.controls['lastOrder'].value,1);

      this.addClickedForLst = false;    
   }

   private remove(x,j , type){
      if (type == 'num') {    
         this.clientOrderNum.splice(j,1);
         this.orderType.push({name : x.name , key : x.key});
      }

      if (type == 'amount') {
         this.clientOrderAmount.splice(j,1);
         this.orderAmount.push({name : x.name , key : x.key});
      }

      if (type == 'lastOrder') {
         this.orderLast.push(this.clientLastOrder[j].completeInfo);
         this.clientLastOrder.splice(j,1);
      }
   }

   private getCustomData() {
      this.promotionsService.getCustom().subscribe(promotions => {
         this.orderType = promotions['certainNoOrder'];
         this.orderAmount = promotions['certainAmt'];
         this.orderLast = promotions['lastOrder'];
      });
   }

   private loadAllRestroPromotions(id){
      this.promotionsService.getRestroPromotions(id).subscribe(data => {
         this.restroPromotions = data.message;
         console.log("this.restroPromotions");
         console.log(this.restroPromotions);
      });
   }

   private checkCheck(promo){
      if (promo.status == true) {    
         return true;
      }else return false;
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
         this.loadAllRestroPromotions(users.message._id);
      });
   }

   presentTimeUpdate(property){
      if (property == 'forTime') {    
         if (this.selected1 != 'selected1') {
            this.selected2 = 'selected2';
            this.selected1 = 'selected1';
            this.showTiming = false;
         }
      }

      if (property == 'forClient') {
         if (this.selected3 != 'selected3') {
            this.selected4 = 'selected4';
            this.selected3 = 'selected3';
            this.clientDetail = false;
         }
      }
   }

   dateNtimeUpdate(property){
      if (property == 'forTime') {
         if (this.selected2 != 'selected1') {
            this.selected2 = 'selected1';
            this.selected1 = 'selected2';
            this.showTiming = true;
         }
      }
      if (property == 'forClient') {
         if (this.selected4 != 'selected3') {
            this.selected4 = 'selected3';
            this.selected3 = 'selected4';
            this.clientDetail = true;
         }
      }
      $('#datepicker').datetimepicker({format:'DD-MM-YYYY'});
      $('#timepicker').datetimepicker({format: 'LT'});
   }

   private showDatePicker(){
      console.log("clicked showDatePicker");
      $('#datepicker').datetimepicker({format:'DD-MM-YYYY'});
      $('#timepicker').datetimepicker({format:'LT'});
   }

   private showTimePicker(){
      console.log("clicked showTimePicker");
      $('#datepicker').datetimepicker({format:'DD-MM-YYYY'});
      $('#timepicker').datetimepicker({format: 'LT'});
   }

   private getValue(type){
      let eleObj = (<HTMLInputElement>document.getElementById(type));
      console.log("eleObj");
      console.log(eleObj.value);
   }
}

@Component({
   selector: 'app-marketing-edit-promotion',
   templateUrl: './marketingEditPromotion.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingEditPromotionComponent implements OnInit {

   promotion : any = [];
   promotions : any = [];
   promotionEdit : any = [];
   promotionTemplate : any = [];
   menus: any = [];
   items: any = [];
   ids : any = [];
   itemIds : any = [];
   menuIds : any = [];
   discountOn : any = [];
   discountTiming : any = [];
   menu1 : any = [];
   menu2 : any = [];
   menu1Copy : any = [];
   menu2Copy : any = [];
   restaurants:any ={};
   optionSet: any = {};
   preoptionSet: any = {};
   preoptionSetFulfill: any = {};
   displayTimeObj: any = {};
   fulfillmentTimeObj: any = {};
   fDays : any = {};
   dDays : any = {'monday':true,'tuesday':true,'wednesday':true,'thursday':true,'friday':true,'saturday':true,'sunday':true};

   obj1 = {}
   obj2 = {}

   promoImage : String;
   promoName : String;
   promoDesc : String;
   displayFrom : String;
   displayTill : String;
   fulfillmentFrom : String;
   fulfillmentTill : String;
   selected1 : any = 'selected1';
   selected2 : any = 'selected2';
   selected3 : any = 'selected3';
   selected4 : any = 'selected4';
   selected5 : any = 'selected5';
   selected6 : any = 'selected6';
   selected7 : any = 'selected7';
   selected8 : any = 'selected8';
   displayTrue : any = 'displayTrue';
   displayFalse : any = 'displayFalse';
   customSelectionDay : boolean = false;
   customSelectionAvailable : boolean = false;
   fulfillmentTimeDay : boolean = false;
   fulfillmentTimeAvailable : boolean = false;
   customCouponCode : boolean = false;
   displayTime : boolean = true;
   fulfillmentTime : boolean = false;
   autoCode:string;
   selfCode:string;

   index: number;
   discount: number;
   minCartAmount: number;
   itemNo1: number = 0;
   itemNo2: number = 0;

   promoDetailUpdateModel :FormGroup;
   openingAddModel: FormGroup;

   imageUrl = globalVariable.imageUrl;

   public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
   constructor(
      private restaurantsService: RestaurantsService,
      private activatedRoute:ActivatedRoute,
      private router: Router,
      private promotionsService: PromotionsService,
      private kitchenMenuService: KitchenMenuService,
      private kitchenMenuItemService: KitchenItemService,
      private lf: FormBuilder
      ) {}

   ngOnInit() {

      this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');
      this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');

      this.promoDetailUpdateModel = this.lf.group({
         _id: [null, Validators.required],
         restaurantId: [null, Validators.required],
         promotionId: [null, Validators.required],
         promoname: [null, Validators.required],
         description: [null],
         image: [null],
         discountOn: [null],
         discountPercent: [null],
         discountAmount: [null],
         minCartAmount: [null],
         discountTiming: [null, Validators.required],
         orderType: [],
         orderTime: [],
         clientbenefited: [],
         dealredemption: [],
         couponcode: [null]
      });

      this.openingAddModel = this.lf.group({
         monday: [],
         tuesday: [],
         wednesday: [],
         thursday: [],
         friday: [],
         saturday: [],
         sunday: [],
         opentime: ['', Validators.required],
         closetime: ['', Validators.required]
      });

      this.activatedRoute.params.subscribe((params: Params) => {
         let id = params['id'];
         this.promotionsService.getOnePromo(id).subscribe(data=>{
            this.promotionEdit = data.message;

            console.log("data.message",data.message);

            this.promoDetailUpdateModel.controls['_id'].setValue(data.message._id);
            this.promoDetailUpdateModel.controls['promotionId'].setValue(data.message.promotionId[0]);
            this.promoDetailUpdateModel.controls['restaurantId'].setValue(data.message.restaurantId[0]);
            this.promoDetailUpdateModel.controls['promoname'].setValue(data.message.promoname);
            this.promoDetailUpdateModel.controls['description'].setValue(data.message.description);
            this.promoDetailUpdateModel.controls['image'].setValue(data.message.image);
            this.promoDetailUpdateModel.controls['discountOn'].setValue(data.message.discountOn);

            this.promoDetailUpdateModel.controls['discountTiming'].setValue(data.message.discountTiming);

            this.promoDetailUpdateModel.controls['orderType'].setValue(data.message.orderType);
            this.promoDetailUpdateModel.controls['orderTime'].setValue(data.message.orderTime);
            this.promoDetailUpdateModel.controls['clientbenefited'].setValue(data.message.clientbenefited);
            this.promoDetailUpdateModel.controls['dealredemption'].setValue(data.message.dealredemption);
            this.promoDetailUpdateModel.controls['couponcode'].setValue(data.message.couponcode);

            this.promoImage = data.message.image;
            this.promoDesc = data.message.description;
            this.promoName = data.message.promoname;
            this.discountOn = data.message.discountOn;

            this.discountTiming = data.message.discountTiming;

            if (this.discountOn != null || this.discountOn.length > 0) {
               this.menu1 = this.discountOn[0]['itemGroup1'];
               if (this.discountOn[1]) {
                  this.menu2 = this.discountOn[1]['itemGroup2'];
               }
            }

            var dIndex = data.message.discountTiming.findIndex(mn=> mn.tType == 'display')
            var fIndex = data.message.discountTiming.findIndex(mn=> mn.tType == 'fulfillment')

            this.displayTimeObj = data.message.discountTiming[dIndex];
            this.fulfillmentTimeObj = data.message.discountTiming[fIndex];

            if (this.displayTimeObj['available'] == 'unlimited') {
               this.defaultUpdate('availableTime');
            }

            if (this.displayTimeObj['available'] != 'unlimited') {
               this.customUpdate('availableTime');
               this.displayFrom = this.displayTimeObj['available']['from'];
               this.displayTill = this.displayTimeObj['available']['till'];
            }

            if (this.fulfillmentTimeObj['available'] == 'unlimited') {
               this.defaultUpdate('fulfillmentAvailableTime');
            }

            if (this.fulfillmentTimeObj['available'] != 'unlimited') {
               this.customUpdate('fulfillmentAvailableTime');
               this.fulfillmentFrom = this.fulfillmentTimeObj['available']['from'];
               this.fulfillmentTill = this.fulfillmentTimeObj['available']['till'];
            }

            if (data.message.discountAmount != null) {
               this.discount = data.message.discountAmount;
               this.promoDetailUpdateModel.controls['discountAmount'].setValue(data.message.discountAmount);
            }

            if (data.message.discountPercent != null) {
               this.discount = data.message.discountPercent;
               this.promoDetailUpdateModel.controls['discountPercent'].setValue(data.message.discountPercent);
            }

            if (data.message.minCartAmount != null) {
               this.minCartAmount = data.message.minCartAmount;
               this.promoDetailUpdateModel.controls['minCartAmount'].setValue(data.message.minCartAmount);
            }

            this.promotionsService.getOne(data.message.promotionId[0]).subscribe(user => {
               this.promotionTemplate = user.message;
            });

            $("div[id^='step']").hide();

            $("div[id='step1']").show();
            $('div.changeBg .promotionStepNext').css('display','block');

            $("div[id^='orderType']").addClass('selected2');
            $("div[id^='orderTime']").addClass('selected2');
            $("div[id^='clientType']").addClass('selected2');
            $("div[id^='show']").addClass('selected2');
            $("div[id='auto']").addClass('selected2');
            $("div[id='code']").addClass('selected2');
      
            this.orderType(data.message.orderType);
            this.orderTime(data.message.orderTime);
            this.clientType(data.message.clientbenefited);
            if (data.message.dealredemption == 'all') {
               this.dealRedemption('showAll');
            }
            if (data.message.dealredemption == 'some') {
               this.dealRedemption('showSome');
            }

            if (data.message.couponcode.type == "auto") {
               this.autoCode = data.message.couponcode.code;
            }
            if (data.message.couponcode.type == "self") {
               this.selfCode = data.message.couponcode.code;
            }
            this.couponCodeUpdate(data.message.couponcode.type);

            this.loadAllPromotions(data.message.promotionId[0]);

            console.log("this.promoDetailUpdateModel.value");
            console.log(this.promoDetailUpdateModel.value);
            this.getRestaurants();
         })
      });

   }

   public autoGenerate(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i <10 ; i++)
         text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
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

   private openingHourDetailUpdate(type) {
      var objForUpdate: any = {};
      var timeObj: any = {};

      timeObj.opentime = this.openingAddModel.value.opentime;
      timeObj.closetime = this.openingAddModel.value.closetime;

      for (var i in this.openingAddModel.value) {
         if (this.openingAddModel.value[i] == true) {
            objForUpdate[i] = this.openingAddModel.value[i];
            var timeKey = i + 'time';
            objForUpdate[timeKey] = timeObj;

            if (type == 'displayTime') {
               var d = this.preoptionSet;        
               for (var key in d) {
                  if (objForUpdate[key] != d[key] && objForUpdate.hasOwnProperty(key) == false) {
                     objForUpdate[key] = d[key];
                  }
               }

               for (var i in objForUpdate) {
                  if (objForUpdate[i]) {
                     this.preoptionSet[i] = objForUpdate[i];
                  }
               }
               this.displayTimeObj['days'] = this.preoptionSet;
               var x = this.discountTiming.findIndex(mn => mn.tType == 'display');
               this.discountTiming[x]['days'] = this.preoptionSet;

            }

            if (type == 'fulfillmentTime') {
               var d = this.preoptionSetFulfill;        
               for (var key in d) {
                  if (objForUpdate[key] != d[key] && objForUpdate.hasOwnProperty(key) == false) {
                     objForUpdate[key] = d[key];
                  }
               }

               for (var i in objForUpdate) {
                  if (objForUpdate[i]) {
                     this.preoptionSetFulfill[i] = objForUpdate[i];
                  }
               }
               this.fulfillmentTimeObj['days'] = this.preoptionSetFulfill;
               var y = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');
               this.discountTiming[y]['days'] = this.preoptionSetFulfill;
            }
         }
      }

      this.openingAddModel.reset();

      this.promoDetailUpdateModel.controls['discountTiming'].setValue(this.discountTiming);
   }

   private remove(preoptionSet,day){
      var time = day + "time"

      delete this.preoptionSet[day];
      delete this.preoptionSet[time];
      this.displayTimeObj['days'] = this.preoptionSet;

      var x = this.discountTiming.findIndex(mn => mn.tType == 'display');
      this.discountTiming[x]['days'] = this.preoptionSet;

      this.promoDetailUpdateModel.controls['discountTiming'].setValue(this.discountTiming);
   }

   private delete(preoptionSetFulfill,day){
      var time = day + "time"

      delete this.preoptionSetFulfill[day];
      delete this.preoptionSetFulfill[time];
      this.fulfillmentTimeObj['days'] = this.preoptionSetFulfill;

      var y = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');
      this.discountTiming[y]['days'] = this.preoptionSetFulfill;

      this.promoDetailUpdateModel.controls['discountTiming'].setValue(this.discountTiming);
   }

   private showDatePicker(type){
      if (type == 'displayTime') {
         $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
         $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
         $("#datePicker1").on("dp.change", function (e) {
            $('#datePicker2').data("DateTimePicker").minDate(e.date);
         });
         $("#datePicker2").on("dp.change", function (e) {
            $('#datePicker1').data("DateTimePicker").maxDate(e.date);
         });
      }

      if (type == 'fulfillmentTime') {
         $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
         $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
         $("#datePicker3").on("dp.change", function (e) {
            $('#datePicker4').data("DateTimePicker").minDate(e.date);
         });
         $("#datePicker4").on("dp.change", function (e) {
            $('#datePicker3').data("DateTimePicker").maxDate(e.date);
         });
      }
   }

   private getValue(type){
      let eleObj = (<HTMLInputElement>document.getElementById(type));
      if (type == 'datePicker1') {
         this.obj1['from'] = eleObj.value;
         this.displayTimeObj['available'] = this.obj1;
      }
      if (type == 'datePicker2') {
         this.obj1['till'] = eleObj.value;
         this.displayTimeObj['available'] = this.obj1;
      }
      if (type == 'datePicker3') {
         this.obj2['from'] = eleObj.value;
         this.fulfillmentTimeObj['available'] = this.obj2;

      }
      if (type == 'datePicker4') {
         this.obj2['till'] = eleObj.value;
         this.fulfillmentTimeObj['available'] = this.obj2;
      }
      /*this.displayTimeObj['available'] = this.obj1;*/
      /*this.fulfillmentTimeObj['available'] = this.obj2;*/
   }

   showDisplayTime(){
      if (this.displayTrue != 'displayTrue') {
         this.displayFalse = 'displayFalse';
         this.displayTrue = 'displayTrue';
      }
      this.displayTime = true;
      this.fulfillmentTime = false;
      $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
   }

   showFulfillmentTime(){
      if (this.displayFalse != 'displayTrue') {
         this.displayFalse = 'displayTrue';
         this.displayTrue = 'displayFalse';
      }
      this.displayTime = false;
      this.fulfillmentTime = true;
      $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
   }

   private defaultUpdate(property){
      var a = this.discountTiming.findIndex(mn => mn.tType == 'display');
      var b = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');

      if (property == 'displayTime') {
         if (this.selected1 != 'selected1') {
            this.selected2 = 'selected2';
            this.selected1 = 'selected1';
            this.customSelectionDay = false;
            this.displayTimeObj['days'] = this.dDays;

            this.discountTiming[a]['days'] = this.displayTimeObj['days'];
            this.preoptionSet = {};
         }
      }

      if (property == 'availableTime') {
         if (this.selected3 != 'selected3') {
            this.selected4 = 'selected4';
            this.selected3 = 'selected3';
            this.customSelectionAvailable = false;
         }
         this.displayTimeObj['available'] = 'unlimited';
         this.obj1 = {};
         this.discountTiming[a]['available'] = this.displayTimeObj['available'];
      }


      if (property == 'fulfillmentTime') {
         if (this.selected5 != 'selected5') {
            this.selected6 = 'selected6';
            this.selected5 = 'selected5';
            this.fulfillmentTimeDay = false;
         }
         this.fulfillmentTimeObj['days'] = this.fDays;

         this.discountTiming[b]['days'] = this.fulfillmentTimeObj['days'];
         this.preoptionSetFulfill = {};
      }

      if (property == 'fulfillmentAvailableTime') {
         if (this.selected7 != 'selected7') {
            this.selected8 = 'selected8';
            this.selected7 = 'selected7';
            this.fulfillmentTimeAvailable = false;
         }
         this.fulfillmentTimeObj['available'] = 'unlimited';
         this.obj2 = {};
         this.discountTiming[b]['available'] = this.fulfillmentTimeObj['available'];
      }

      this.promoDetailUpdateModel.controls['discountTiming'].setValue(this.discountTiming);
   }

   private customUpdate(property){
      if (property == 'displayTime') {
         if (this.selected2 != 'selected1') {
            this.selected2 = 'selected1';
            this.selected1 = 'selected2';
            this.customSelectionDay = true;
         }
      }

      if (property == 'availableTime') {
         if (this.selected4 != 'selected3') {
            this.selected4 = 'selected3';
            this.selected3 = 'selected4';
            this.customSelectionAvailable = true;
         }
      }

      if (property == 'fulfillmentTime') {
         if (this.selected6 != 'selected5') {
            this.selected6 = 'selected5';
            this.selected5 = 'selected6';
            this.fulfillmentTimeDay = true;
         }
      }

      if (property == 'fulfillmentAvailableTime') {
         if (this.selected8 != 'selected7') {
            this.selected8 = 'selected7';
            this.selected7 = 'selected8';
            this.fulfillmentTimeAvailable = true;
         }
      }
   }

   orderType(type){
      $("div[id^='orderType']").addClass('selected2');
      if (type == 'any') {
         $("div[id='orderType1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'pickup') {
         $("div[id='orderType2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'delivery') {
         $("div[id='orderType3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailUpdateModel.controls['orderType'].setValue(type);
   }

   orderTime(type){
      $("div[id^='orderTime']").addClass('selected2');
      if (type == 'any') {
         $("div[id='orderTime1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'now') {
         $("div[id='orderTime2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'later') {
         $("div[id='orderTime3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailUpdateModel.controls['orderTime'].setValue(type);
   }

   clientType(type){
      $("div[id^='clientType']").addClass('selected2');
      if (type == 'any') {
         $("div[id='clientType1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'new') {
         $("div[id='clientType2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'returning') {
         $("div[id='clientType3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailUpdateModel.controls['clientbenefited'].setValue(type);
   }

   dealRedemption(type){
      $("div[id^='show']").addClass('selected2');
      if (type == 'showAll') {
         $("div[id='showAll']").removeClass('selected2').addClass('selected1');
         this.promoDetailUpdateModel.controls['dealredemption'].setValue('all');
      }
      if (type == 'showSome') {
         $("div[id='showSome']").removeClass('selected2').addClass('selected1');
         this.promoDetailUpdateModel.controls['dealredemption'].setValue('some');
      }
   }

   couponCode(type){
      if (type == 'auto') {
         this.autoCode = this.autoGenerate()
         $("div[id='auto']").removeClass('selected2').addClass('selected1');
         $("div[id='code']").addClass('selected2').removeClass('selected1');
         this.customCouponCode = false;
         var obj = {'type' : 'auto' , 'code' : this.autoCode};
         this.promoDetailUpdateModel.controls['couponcode'].setValue(obj);
      }
      if (type == 'self') {
         $("div[id='auto']").removeClass('selected1').addClass('selected2');
         $("div[id='code']").addClass('selected1').removeClass('selected2');
         this.customCouponCode = true;
      }
   }

   private couponCodeUpdate(type){
      if (type == 'auto') {
         $("div[id='auto']").removeClass('selected2').addClass('selected1');
         $("div[id='code']").addClass('selected2').removeClass('selected1');
         this.customCouponCode = false;
      }
      if (type == 'self') {
         $("div[id='auto']").removeClass('selected1').addClass('selected2');
         $("div[id='code']").addClass('selected1').removeClass('selected2');
         this.customCouponCode = true;
      }
   }

   private selectCheck(event,obj,type,itemGroup){
      var itemIdObj = [];

      if (itemGroup == 'itemGroup1') {
         if (type == 'menu' && obj == '') {
            var x = this.menu1.findIndex(mn => mn.id1 == event.target.value);
            if (event.target.checked) {
               for (var i = 0; i < this.items.length; i++) {
                  if (this.items[i].menuId == event.target.value) {
                     itemIdObj.push(this.items[i]._id);
                  }
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               this.menu1[x]['item1'] = [];
            }
         }

         if (type == 'item' && obj != '') {
            var x = this.menu1.findIndex(mn => mn.id1 == obj.menuId);
            if (event.target.checked) {
               itemIdObj = this.menu1[x]['item1'];
               if (itemIdObj.indexOf(event.target.value) == -1) {
                  itemIdObj.push(event.target.value);
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               if (this.menu1[x]['item1'].indexOf(event.target.value) > -1) {
                  itemIdObj = this.menu1[x]['item1'];
                  itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }
         }
      }

      if (itemGroup == 'itemGroup2') {
         if (type == 'menu' && obj == '') {
            var x = this.menu2.findIndex(mn => mn.id2 == event.target.value);
            if (event.target.checked) {
               for (var i = 0; i < this.items.length; i++) {
                  if (this.items[i].menuId == event.target.value) {
                     itemIdObj.push(this.items[i]._id);
                  }
                  this.menu2[x]['item2'] = itemIdObj;
               }
            }
            if (!event.target.checked) {
               this.menu2[x]['item2'] = [];
            }
         }

         if (type == 'item' && obj != '') {
            var x = this.menu2.findIndex(mn => mn.id2 == obj.menuId);
            if (event.target.checked) {
               itemIdObj = this.menu2[x]['item2'];
               if (itemIdObj.indexOf(event.target.value) == -1) {
                  itemIdObj.push(event.target.value);
                  this.menu2[x]['item2'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               if (this.menu2[x]['item2'].indexOf(event.target.value) > -1) {
                  itemIdObj = this.menu2[x]['item2'];
                  itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
                  this.menu2[x]['item2'] = itemIdObj; 
               }
            }
         }
      }

      console.log("this.menu1");
      console.log(this.menu1);
      console.log("this.menu2");
      console.log(this.menu2);
   }

   saveMenu(type){
      this.itemIds = [];
      if (type == 'itemGroup1') {
         this.itemNo1 = 0;
         for (var i = 0; i < this.menu1.length; i++) {
            if (this.menu1[i]['item1'].length > 0) {      
               for (var j = 0; j < this.menu1[i]['item1'].length; j++) {
                  this.itemNo1++;
               }
            }
         }
         $("#itemGroup1").modal('hide');
         if (this.itemNo1 > 0) {
            var elementExists = document.getElementById("iG2");
            if (typeof elementExists != 'undefined' && elementExists != null && this.itemNo2 == 0) {
               document.getElementById('saveButton').setAttribute('disabled','true');
            }
            else{
               document.getElementById('saveButton').removeAttribute('disabled');
            }
         }else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      if (type == 'itemGroup2') {
         this.itemNo2 = 0;
         for (var i = 0; i < this.menu2.length; i++) {
            if (this.menu2[i]['item2'].length > 0) {      
               for (var j = 0; j < this.menu2[i]['item2'].length; j++) {
                  this.itemNo2++;
               }
            }
         }
         $("#itemGroup2").modal('hide');
         if (this.itemNo2 > 0) {
            var elementExists1 = document.getElementById("iG1");
            if (typeof elementExists1 != 'undefined' && elementExists1 != null && this.itemNo1 == 0) {
               document.getElementById('saveButton').setAttribute('disabled','true');
            }
            else{
               document.getElementById('saveButton').removeAttribute('disabled');
            }
         }else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      this.checkFormValidation();

      //var tempArr = [{'itemGroup1':this.menu1},{'itemGroup2':this.menu2}];
      var tempArr : any = [];

      if (this.index == 0 || this.index == 5 || this.index == 6) {
         tempArr = [{'itemGroup1':this.menu1},{'itemGroup2':this.menu2}];
      }

      if (this.index == 1) {
         tempArr = [{'itemGroup1':this.menu1}];
      }

      this.discountOn = tempArr;
      this.promoDetailUpdateModel.controls['discountOn'].setValue(this.discountOn);

      console.log("this.promoDetailUpdateModel.value");
      console.log(this.promoDetailUpdateModel.value);
   }

   countCharacter(event:any,name,type){
      if (type == 'promoName') {
         this.promoName = name.value;
         this.promoDetailUpdateModel.controls['promoname'].setValue(this.promoName);
      }
      if (type == 'promoDesc') {
         this.promoDesc = name.value;
         this.promoDetailUpdateModel.controls['description'].setValue(this.promoDesc);
      }
      if (type == 'discountPercent') {
         this.promoDetailUpdateModel.controls['discountPercent'].setValue(name.value);
      }
      if (type == 'discountAmount') {
         this.promoDetailUpdateModel.controls['discountAmount'].setValue(name.value);
      }
      if (type == 'cartAmount') {
         this.promoDetailUpdateModel.controls['minCartAmount'].setValue(name.value);
      }
      if (type == 'couponCode') {
         var obj = {'type' : 'self' , 'code' : name.value};
         this.promoDetailUpdateModel.controls['couponcode'].setValue(obj);
      }
      this.checkFormValidation();
   }

   onChange(event) {
      var files = event.srcElement.files;
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         var responsePath = JSON.parse(response);
         this.promoImage = responsePath.filename;
         this.promoDetailUpdateModel.controls['image'].setValue(responsePath.filename);
         toastr.success('Image Uploaded Successfully');
      };
   }

   showStep(property,stepNo){
      if (typeof property == 'object') {
         $('div.promotionStep').removeClass('changeBg');
         var cls = property.getAttribute('class');
         var newCls = cls + ' changeBg';
         property.setAttribute('class',newCls);
         $("div[id^='step']").css('display','none');
         $('#step'+stepNo).css('display','block');
         $('div.promotionStep').addClass('promotionHover');
         $('div.changeBg').removeClass('promotionHover');
         $('div.promotionStep .promotionStepNext').css('display','none');
         $('div.changeBg .promotionStepNext').css('display','block');
      }
      $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
      $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});

      this.showDatePicker('displayTime');
      this.showDatePicker('fulfillmentTime');
   }

   private hideStep(property,stepNo){
      var x = parseInt(stepNo) + 1;
      $('div.promotionStep').removeClass('changeBg');
      $('#step'+stepNo).css('display','none');
      $('div.promotionStep').addClass('promotionHover');
      $('div.promotionStep .promotionStepNext').css('display','none');
      this.showStep(property,x);
   }

   save(property,stepNo){
      this.hideStep(property,stepNo);
   }

   private loadAllUsers(id) {
      this.kitchenMenuService.getAll(id).subscribe(users => {       
         var allMenu = [];
         allMenu = users.message;

         for (var i = 0; i < allMenu.length; i++) {
            var menuObj = {};
            var itemObj = [];

            var index = this.items.findIndex(mn => mn.menuId == allMenu[i]._id);

            if (index != -1) {
               this.menus.push(allMenu[i]);
               menuObj['id'] = allMenu[i]._id;

               for (var k = 0; k < this.items.length; k++) {
                  if (this.items[k].menuId == allMenu[i]._id) {
                     itemObj.push(this.items[k]._id);
                  }

                  menuObj['item'] = itemObj;
               }
               this.menu1Copy.push(menuObj);

               var index2 = this.menu1.findIndex(mn=> mn.id1 == allMenu[i]._id);
               if (index2 == -1) {
                  var pushObj1 = {'id1' : allMenu[i]._id , 'item1' : []}
                  var pushObj2 = {'id2' : allMenu[i]._id , 'item2' : []}
                  this.menu1.push(pushObj1);
                  this.menu2.push(pushObj2);
               }
            }
         }

         setTimeout(()=>{
            this.spliceMenu1Obj();
         },2000)

      });
   }

   private spliceMenu1Obj(){
      for (var i = 0; i < this.menu1.length; i++) {
         var index1 = this.menus.findIndex(mn=> mn._id == this.menu1[i].id1);
         if (index1 == -1) {
            this.menu1.splice(i,1);
         }
      }

      for (var j = 0; j < this.menu2.length; j++) {
         var index2 = this.menus.findIndex(mn=> mn._id == this.menu2[j].id2);
         if (index2 == -1) {
            this.menu2.splice(j,1);
         }
      }

      setTimeout(()=>{
         if (this.menu1.length > 0) {
            for (var i = 0; i < this.menu1.length; i++) {
               if (this.menu1[i]['item1'].length > 0) {
                  for (var j = 0; j < this.menu1[i]['item1'].length; j++) {
                     this.itemNo1++;
                  }
               }
            }
         }

         if (this.menu2.length > 0) {          
            for (var m = 0; m < this.menu2.length; m++) {
               if (this.menu2[m]['item2'].length > 0) {
                  for (var n = 0; n < this.menu2[m]['item2'].length; n++) {
                     this.itemNo2++;
                  }
               }
            }
         }
      },2000)
   }

   private loadAllItem(id) {
      this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
         this.items = users.message;
         this.loadAllUsers(id);
      });
   }

   private loadAllPromotions(id) {
      this.promotionsService.getAll().subscribe(pro => {
         this.promotions = pro.message;
         this.index = pro.message.findIndex(mn => mn._id == id);
      });
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;

         for (var i in users.message.openinghours) {
            if (users.message.openinghours[i] == true) {
               this.fDays[i]=users.message.openinghours[i];
            }
         }

         var unorderedDisplayDays = this.displayTimeObj['days'];
         var unorderedFulfillmentDays = this.fulfillmentTimeObj['days'];
         var unorderdDays = this.dDays;
         var unorderfDays = this.fDays;
         
         var orderedDisplayDays = {};
         var orderedFulfillmentDays = {};
         var orderdDays = {};
         var orderfDays = {};

         Object.keys(unorderedDisplayDays).sort().forEach(function(key) {
           orderedDisplayDays[key] = unorderedDisplayDays[key];
         });
         
         Object.keys(unorderedFulfillmentDays).sort().forEach(function(key) {
           orderedFulfillmentDays[key] = unorderedFulfillmentDays[key];
         });

         Object.keys(unorderdDays).sort().forEach(function(key) {
           orderdDays[key] = unorderdDays[key];
         });
         
         Object.keys(unorderfDays).sort().forEach(function(key) {
           orderfDays[key] = unorderfDays[key];
         });

         var stringifyOrderedDisplayDays = JSON.stringify(orderedDisplayDays);
         var stringifyOrderedFulfillmentDays = JSON.stringify(orderedFulfillmentDays);
         var stringifydDays = JSON.stringify(orderdDays);
         var stringifyfDays = JSON.stringify(orderfDays);


         var displayCompare = stringifyOrderedDisplayDays.localeCompare(stringifydDays);
         var fulfillmentCompare = stringifyOrderedFulfillmentDays.localeCompare(stringifyfDays);

         if (displayCompare == 0) {
            this.defaultUpdate('displayTime');
         }else{
            this.customUpdate('displayTime');
            this.preoptionSet = unorderedDisplayDays;
         }

         if (fulfillmentCompare == 0) {
            this.defaultUpdate('fulfillmentTime');
         }else{
            this.customUpdate('fulfillmentTime');
            this.preoptionSetFulfill = unorderedFulfillmentDays;
         }

         this.promoDetailUpdateModel.controls['restaurantId'].setValue(users.message._id);
         this.loadAllItem(users.message._id);
         this.checkFormValidation();
      });
   }

   private checkFormValidation(){

      var val1 = this.promoDetailUpdateModel.controls['discountPercent'].value;
      var val2 = this.promoDetailUpdateModel.controls['discountAmount'].value;
      var val3 = this.promoDetailUpdateModel.controls['minCartAmount'].value;


      if (this.index == 2 || this.index == 3 || this.index == 4) {
         if (this.promoDetailUpdateModel.valid && ((val1 != null && val1 != '') || (val2 != null && val2 != '')) && (val3 != null && val3 != '')) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      if ( this.index == 1) {
         if (this.promoDetailUpdateModel.valid && (val1 != null && val1 != '') && this.itemNo1 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }

      if (this.index == 0 || this.index == 5) {
         if (this.promoDetailUpdateModel.valid && (val1 != null && val1 != '') && this.itemNo1 > 0 && this.itemNo2 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }

      if (this.index == 6) {
         if (this.promoDetailUpdateModel.valid && (val1 != null && val1 != '') && (val3 != null && val3 != '') && this.itemNo1 > 0 && this.itemNo2 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }
   }

   savePromotion(){
      this.promotionsService.updateRestroPromotion(this.promoDetailUpdateModel.value).subscribe(data=>{
         this.router.navigate(['/owner/marketing/promotions']);
         console.log("data");
         console.log(data);
      });
   }
}

@Component({
   selector: 'app-marketing-promotions-list',
   templateUrl: './marketingPromotionsList.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingPromotionsListComponent implements OnInit {
   promotions = [];
   restaurants : any = {};
   restaurantOptionsUndefined : boolean = false;

   imageUrl = globalVariable.imageUrl;

   constructor(
      private restaurantsService: RestaurantsService,
      private promotionsService: PromotionsService
      ) {}

   ngOnInit() {
      this.getRestaurants();
      this.loadAllPromotions();
   }

   private loadAllPromotions() {
      this.promotionsService.getAll().subscribe(promotions => {
         this.promotions = promotions.message;
         console.log("this.promotions");
         console.log(this.promotions);
      });
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
      });
   }
}

@Component({
   selector: 'app-marketing-promotions-template',
   templateUrl: './marketingPromotionsTemplate.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingPromotionsTemplateComponent implements OnInit {
   promotion : any = {};
   promotions : any = {};
   menus: any = [];
   items: any = [];
   itemIds = [];
   menuIds = [];
   discountOn = [];
   discountTiming = [];
   menu1 : any = [];
   menu2 : any = [];
   menu1Copy : any = [];
   restaurants:any ={};
   optionSet: any = {};
   preoptionSet: any = {};
   preoptionSetFulfill: any = {};
   displayTimeObj: any = {};
   fulfillmentTimeObj: any = {};
   days : any = {};

   obj1 = {}
   obj2 = {}

   promoImage : String;
   promoName : String;
   promoDesc : String;
   selected1 : any = 'selected1';
   selected2 : any = 'selected2';
   selected3 : any = 'selected3';
   selected4 : any = 'selected4';
   selected5 : any = 'selected5';
   selected6 : any = 'selected6';
   selected7 : any = 'selected7';
   selected8 : any = 'selected8';
   displayTrue : any = 'displayTrue';
   displayFalse : any = 'displayFalse';
   customSelectionDay : boolean = false;
   customSelectionAvailable : boolean = false;
   fulfillmentTimeDay : boolean = false;
   fulfillmentTimeAvailable : boolean = false;
   customCouponCode : boolean = false;
   displayTime : boolean = true;
   fulfillmentTime : boolean = false;
   autoCode:string;

   index: number;
   itemNo1: number = 0;
   itemNo2: number = 0;

   promoDetailAddModel :FormGroup;
   openingAddModel: FormGroup;

   imageUrl = globalVariable.imageUrl;

   public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
   constructor(
      private restaurantsService: RestaurantsService,
      private activatedRoute:ActivatedRoute,
      private router: Router,
      private promotionsService: PromotionsService,
      private kitchenMenuService: KitchenMenuService,
      private kitchenMenuItemService: KitchenItemService,
      private lf: FormBuilder
      ) {}

   ngOnInit() {

      this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');
      this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');

      this.promoDetailAddModel = this.lf.group({
         restaurantId: [null, Validators.required],
         promotionId: [null, Validators.required],
         promoname: [null, Validators.required],
         description: [null],
         image: [null],
         discountOn: [null],
         discountPercent: [null],
         discountAmount: [null],
         minCartAmount: [null],
         discountTiming: [null, Validators.required],
         orderType: [],
         orderTime: [],
         clientbenefited: [],
         dealredemption: [],
         couponcode: [null]
      });

      this.openingAddModel = this.lf.group({
         monday: [],
         tuesday: [],
         wednesday: [],
         thursday: [],
         friday: [],
         saturday: [],
         sunday: [],
         opentime: ['', Validators.required],
         closetime: ['', Validators.required]
      });

      this.activatedRoute.params.subscribe((params: Params) => {
         let id = params['id'];
         this.loadPromotion(id);
         this.loadAllPromotions(id);
      });

      this.displayTimeObj['tType'] = 'display';
      this.displayTimeObj['available'] = 'unlimited';
      this.displayTimeObj['days'] = {'monday':true,'tuesday':true,'wednesday':true,'thursday':true,'friday':true,'saturday':true,'sunday':true};

      this.fulfillmentTimeObj['tType'] = 'fulfillment';
      this.fulfillmentTimeObj['available'] = 'unlimited';

      $("div[id^='step']").hide();

      $("div[id='step1']").show();
      $('div.changeBg .promotionStepNext').css('display','block');

      $("div[id^='orderType']").addClass('selected2');
      $("div[id^='orderTime']").addClass('selected2');
      $("div[id^='clientType']").addClass('selected2');
      $("div[id^='show']").addClass('selected2');
      $("div[id='auto']").addClass('selected2');
      $("div[id='code']").addClass('selected2');

      this.orderType('any');
      this.orderTime('any');
      this.clientType('any');
      this.dealRedemption('showAll');
      this.couponCode('auto');

      this.checkFormValidation();
   }

   public autoGenerate(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i <10 ; i++)
         text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
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

   private openingHourDetailUpdate(type) {
      var objForUpdate: any = {};
      var timeObj: any = {};

      timeObj.opentime = this.openingAddModel.value.opentime;
      timeObj.closetime = this.openingAddModel.value.closetime;

      for (var i in this.openingAddModel.value) {
         if (this.openingAddModel.value[i] == true) {
            objForUpdate[i] = this.openingAddModel.value[i];
            var timeKey = i + 'time';
            objForUpdate[timeKey] = timeObj;

            if (type == 'displayTime') {
               var d = this.preoptionSet;        
               for (var key in d) {
                  if (objForUpdate[key] != d[key] && objForUpdate.hasOwnProperty(key) == false) {
                     objForUpdate[key] = d[key];
                  }
               }

               for (var i in objForUpdate) {
                  if (objForUpdate[i]) {
                     this.preoptionSet[i] = objForUpdate[i];
                  }
               }
               this.displayTimeObj['days'] = this.preoptionSet;
               var x = this.discountTiming.findIndex(mn => mn.tType == 'display');
               this.discountTiming[x]['days'] = this.preoptionSet;

            }

            if (type == 'fulfillmentTime') {
               var d = this.preoptionSetFulfill;        
               for (var key in d) {
                  if (objForUpdate[key] != d[key] && objForUpdate.hasOwnProperty(key) == false) {
                     objForUpdate[key] = d[key];
                  }
               }

               for (var i in objForUpdate) {
                  if (objForUpdate[i]) {
                     this.preoptionSetFulfill[i] = objForUpdate[i];
                  }
               }
               this.fulfillmentTimeObj['days'] = this.preoptionSetFulfill;
               var y = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');
               this.discountTiming[y]['days'] = this.preoptionSetFulfill;
            }
         }
      }

      this.openingAddModel.reset();
      console.log("this.discountTiming");
      console.log(this.discountTiming);

      this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);
      console.log(this.promoDetailAddModel.value);
   }

   private remove(preoptionSet,day){
      var time = day + "time"

      delete this.preoptionSet[day];
      delete this.preoptionSet[time];
      this.displayTimeObj['days'] = this.preoptionSet;

      var x = this.discountTiming.findIndex(mn => mn.tType == 'display');
      this.discountTiming[x]['days'] = this.preoptionSet;

      this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);
      console.log(this.promoDetailAddModel.value);
   }

   private delete(preoptionSetFulfill,day){
      var time = day + "time"

      delete this.preoptionSetFulfill[day];
      delete this.preoptionSetFulfill[time];
      this.fulfillmentTimeObj['days'] = this.preoptionSetFulfill;

      var y = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');
      this.discountTiming[y]['days'] = this.preoptionSetFulfill;

      this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);
      console.log(this.promoDetailAddModel.value);
   }

   private showDatePicker(type){
      if (type == 'displayTime') {
         $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
         $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
         $("#datePicker1").on("dp.change", function (e) {
            $('#datePicker2').data("DateTimePicker").minDate(e.date);
         });
         $("#datePicker2").on("dp.change", function (e) {
            $('#datePicker1').data("DateTimePicker").maxDate(e.date);
         });
      }

      if (type == 'fulfillmentTime') {
         $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
         $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
         $("#datePicker3").on("dp.change", function (e) {
            $('#datePicker4').data("DateTimePicker").minDate(e.date);
         });
         $("#datePicker4").on("dp.change", function (e) {
            $('#datePicker3').data("DateTimePicker").maxDate(e.date);
         });
      }
   }

   private getValue(type){
      let eleObj = (<HTMLInputElement>document.getElementById(type));
      if (type == 'datePicker1') {
         this.obj1['from'] = eleObj.value;
         this.displayTimeObj['available'] = this.obj1;
      }
      if (type == 'datePicker2') {
         this.obj1['till'] = eleObj.value;
         this.displayTimeObj['available'] = this.obj1;
      }
      if (type == 'datePicker3') {
         this.obj2['from'] = eleObj.value;
         this.fulfillmentTimeObj['available'] = this.obj2;

      }
      if (type == 'datePicker4') {
         this.obj2['till'] = eleObj.value;
         this.fulfillmentTimeObj['available'] = this.obj2;
      }
      /*this.displayTimeObj['available'] = this.obj1;*/
      /*this.fulfillmentTimeObj['available'] = this.obj2;*/
   }

   showDisplayTime(){
      if (this.displayTrue != 'displayTrue') {
         this.displayFalse = 'displayFalse';
         this.displayTrue = 'displayTrue';
      }
      this.displayTime = true;
      this.fulfillmentTime = false;
      $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
   }

   showFulfillmentTime(){
      if (this.displayFalse != 'displayTrue') {
         this.displayFalse = 'displayTrue';
         this.displayTrue = 'displayFalse';
      }
      this.displayTime = false;
      this.fulfillmentTime = true;
      $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
   }

   private defaultUpdate(property){
      var a = this.discountTiming.findIndex(mn => mn.tType == 'display');
      var b = this.discountTiming.findIndex(mn => mn.tType == 'fulfillment');

      if (property == 'displayTime') {
         if (this.selected1 != 'selected1') {
            this.selected2 = 'selected2';
            this.selected1 = 'selected1';
            this.customSelectionDay = false;
            this.displayTimeObj['days'] = {'monday':true,'tuesday':true,'wednesday':true,'thursday':true,'friday':true,'saturday':true,'sunday':true};

            this.discountTiming[a]['days'] = this.displayTimeObj['days'];
            this.preoptionSet = {};
         }
      }

      if (property == 'availableTime') {
         if (this.selected3 != 'selected3') {
            this.selected4 = 'selected4';
            this.selected3 = 'selected3';
            this.customSelectionAvailable = false;
         }
         this.displayTimeObj['available'] = 'unlimited';
         this.obj1 = {};
         this.discountTiming[a]['available'] = this.displayTimeObj['available'];
      }


      if (property == 'fulfillmentTime') {
         if (this.selected5 != 'selected5') {
            this.selected6 = 'selected6';
            this.selected5 = 'selected5';
            this.fulfillmentTimeDay = false;
         }
         this.fulfillmentTimeObj['days'] = this.days;

         this.discountTiming[b]['days'] = this.fulfillmentTimeObj['days'];
         this.preoptionSetFulfill = {};
      }

      if (property == 'fulfillmentAvailableTime') {
         if (this.selected7 != 'selected7') {
            this.selected8 = 'selected8';
            this.selected7 = 'selected7';
            this.fulfillmentTimeAvailable = false;
         }
         this.fulfillmentTimeObj['available'] = 'unlimited';
         this.obj2 = {};
         this.discountTiming[b]['available'] = this.fulfillmentTimeObj['available'];
      }

      this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);
      console.log(this.promoDetailAddModel.value);
   }

   private customUpdate(property){
      if (property == 'displayTime') {
         if (this.selected2 != 'selected1') {
            this.selected2 = 'selected1';
            this.selected1 = 'selected2';
            this.customSelectionDay = true;
         }
      }

      if (property == 'availableTime') {
         if (this.selected4 != 'selected3') {
            this.selected4 = 'selected3';
            this.selected3 = 'selected4';
            this.customSelectionAvailable = true;
         }
      }

      if (property == 'fulfillmentTime') {
         if (this.selected6 != 'selected5') {
            this.selected6 = 'selected5';
            this.selected5 = 'selected6';
            this.fulfillmentTimeDay = true;
         }
      }

      if (property == 'fulfillmentAvailableTime') {
         if (this.selected8 != 'selected7') {
            this.selected8 = 'selected7';
            this.selected7 = 'selected8';
            this.fulfillmentTimeAvailable = true;
         }
      }
   }

   orderType(type){
      $("div[id^='orderType']").addClass('selected2');
      if (type == 'any') {
         $("div[id='orderType1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'pickup') {
         $("div[id='orderType2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'delivery') {
         $("div[id='orderType3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailAddModel.controls['orderType'].setValue(type);
   }

   orderTime(type){
      $("div[id^='orderTime']").addClass('selected2');
      if (type == 'any') {
         $("div[id='orderTime1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'now') {
         $("div[id='orderTime2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'later') {
         $("div[id='orderTime3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailAddModel.controls['orderTime'].setValue(type);
   }

   clientType(type){
      $("div[id^='clientType']").addClass('selected2');
      if (type == 'any') {
         $("div[id='clientType1']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'new') {
         $("div[id='clientType2']").removeClass('selected2').addClass('selected1');
      }
      if (type == 'returning') {
         $("div[id='clientType3']").removeClass('selected2').addClass('selected1');
      }
      this.promoDetailAddModel.controls['clientbenefited'].setValue(type);
   }

   dealRedemption(type){
      $("div[id^='show']").addClass('selected2');
      if (type == 'showAll') {
         $("div[id='showAll']").removeClass('selected2').addClass('selected1');
         this.promoDetailAddModel.controls['dealredemption'].setValue('all');
      }
      if (type == 'showSome') {
         $("div[id='showSome']").removeClass('selected2').addClass('selected1');
         this.promoDetailAddModel.controls['dealredemption'].setValue('some');
      }
   }

   couponCode(type){
      if (type == 'auto') {
         this.autoCode = this.autoGenerate()
         $("div[id='auto']").removeClass('selected2').addClass('selected1');
         $("div[id='code']").addClass('selected2').removeClass('selected1');
         this.customCouponCode = false;
         var obj = {'type' : 'auto' , 'code' : this.autoCode};
         this.promoDetailAddModel.controls['couponcode'].setValue(obj);
      }
      if (type == 'self') {
         $("div[id='auto']").removeClass('selected1').addClass('selected2');
         $("div[id='code']").addClass('selected1').removeClass('selected2');
         this.customCouponCode = true;
      }
   }

   private selectCheck(event,obj,type,itemGroup){
      var itemIdObj = [];

      if (itemGroup == 'itemGroup1') {
         if (type == 'menu' && obj == '') {
            var x = this.menu1.findIndex(mn => mn.id1 == event.target.value);
            if (event.target.checked) {
               for (var i = 0; i < this.items.length; i++) {
                  if (this.items[i].menuId == event.target.value) {
                     itemIdObj.push(this.items[i]._id);
                  }
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               this.menu1[x]['item1'] = [];
            }
         }

         if (type == 'item' && obj != '') {
            var x = this.menu1.findIndex(mn => mn.id1 == obj.menuId);
            if (event.target.checked) {
               itemIdObj = this.menu1[x]['item1'];
               if (itemIdObj.indexOf(event.target.value) == -1) {
                  itemIdObj.push(event.target.value);
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               if (this.menu1[x]['item1'].indexOf(event.target.value) > -1) {
                  itemIdObj = this.menu1[x]['item1'];
                  itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
                  this.menu1[x]['item1'] = itemIdObj;
               }
            }
         }
      }

      if (itemGroup == 'itemGroup2') {
         if (type == 'menu' && obj == '') {
            var x = this.menu2.findIndex(mn => mn.id2 == event.target.value);
            if (event.target.checked) {
               for (var i = 0; i < this.items.length; i++) {
                  if (this.items[i].menuId == event.target.value) {
                     itemIdObj.push(this.items[i]._id);
                  }
                  this.menu2[x]['item2'] = itemIdObj;
               }
            }
            if (!event.target.checked) {
               this.menu2[x]['item2'] = [];
            }
         }

         if (type == 'item' && obj != '') {
            var x = this.menu2.findIndex(mn => mn.id2 == obj.menuId);
            if (event.target.checked) {
               itemIdObj = this.menu2[x]['item2'];
               if (itemIdObj.indexOf(event.target.value) == -1) {
                  itemIdObj.push(event.target.value);
                  this.menu2[x]['item2'] = itemIdObj;
               }
            }

            if (!event.target.checked) {
               if (this.menu2[x]['item2'].indexOf(event.target.value) > -1) {
                  itemIdObj = this.menu2[x]['item2'];
                  itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
                  this.menu2[x]['item2'] = itemIdObj; 
               }
            }
         }
      }

      console.log("this.menu1");
      console.log(this.menu1);
      console.log("this.menu2");
      console.log(this.menu2);
   }

   saveMenu(type){
      this.itemIds = [];
      if (type == 'itemGroup1') {
         this.itemNo1 = 0;
         for (var i = 0; i < this.menu1.length; i++) {
            if (this.menu1[i]['item1'].length > 0) {      
               for (var j = 0; j < this.menu1[i]['item1'].length; j++) {
                  this.itemNo1++;
               }
            }
         }
         $("#itemGroup1").modal('hide');
         if (this.itemNo1 > 0) {
            var elementExists = document.getElementById("iG2");
            if (typeof elementExists != 'undefined' && elementExists != null && this.itemNo2 == 0) {
               document.getElementById('saveButton').setAttribute('disabled','true');
            }
            else{
               document.getElementById('saveButton').removeAttribute('disabled');
            }
         }else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      if (type == 'itemGroup2') {
         this.itemNo2 = 0;
         for (var i = 0; i < this.menu2.length; i++) {
            if (this.menu2[i]['item2'].length > 0) {      
               for (var j = 0; j < this.menu2[i]['item2'].length; j++) {
                  this.itemNo2++;
               }
            }
         }
         $("#itemGroup2").modal('hide');
         if (this.itemNo2 > 0) {
            var elementExists1 = document.getElementById("iG1");
            if (typeof elementExists1 != 'undefined' && elementExists1 != null && this.itemNo1 ==0) {
               document.getElementById('saveButton').setAttribute('disabled','true');
            }
            else{
               document.getElementById('saveButton').removeAttribute('disabled');
            }
         }else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      this.checkFormValidation();

      var tempArr : any = [];

      if (this.index == 0 || this.index == 5 || this.index == 6) {
         tempArr = [{'itemGroup1':this.menu1},{'itemGroup2':this.menu2}];
      }

      if (this.index == 1) {
         tempArr = [{'itemGroup1':this.menu1}];
      }

      this.discountOn = tempArr;
      this.promoDetailAddModel.controls['discountOn'].setValue(this.discountOn);
   }

   countCharacter(event:any,name,type){
      if (type == 'promoName') {
         this.promoName = name.value;
         this.promoDetailAddModel.controls['promoname'].setValue(this.promoName);
      }
      if (type == 'promoDesc') {
         this.promoDesc = name.value;
         this.promoDetailAddModel.controls['description'].setValue(this.promoDesc);
      }
      if (type == 'discountPercent') {
         this.promoDetailAddModel.controls['discountPercent'].setValue(name.value);
      }
      if (type == 'discountAmount') {
         this.promoDetailAddModel.controls['discountAmount'].setValue(name.value);
      }
      if (type == 'cartAmount') {
         this.promoDetailAddModel.controls['minCartAmount'].setValue(name.value);
      }
      if (type == 'couponCode') {
         var obj = {'type' : 'self' , 'code' : name.value};
         this.promoDetailAddModel.controls['couponcode'].setValue(obj);
      }
      this.checkFormValidation();
   }

   onChange(event) {
      var files = event.srcElement.files;
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         var responsePath = JSON.parse(response);
         this.promoImage = responsePath.filename;
         this.promoDetailAddModel.controls['image'].setValue(responsePath.filename);
         toastr.success('Image Uploaded Successfully');
      };
   }

   showStep(property,stepNo){
      if (typeof property == 'object') {
         $('div.promotionStep').removeClass('changeBg');
         var cls = property.getAttribute('class');
         var newCls = cls + ' changeBg';
         property.setAttribute('class',newCls);
         $("div[id^='step']").css('display','none');
         $('#step'+stepNo).css('display','block');
         $('div.promotionStep').addClass('promotionHover');
         $('div.changeBg').removeClass('promotionHover');
         $('div.promotionStep .promotionStepNext').css('display','none');
         $('div.changeBg .promotionStepNext').css('display','block');
      }

      $('#datePicker1').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker2').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});
      $('#datePicker3').datetimepicker({format:'DD-MM-YYYY'});
      $('#datePicker4').datetimepicker({format:'DD-MM-YYYY',useCurrent: false});

      this.showDatePicker('displayTime');
      this.showDatePicker('fulfillmentTime');
   }

   private hideStep(property,stepNo){
      var x = parseInt(stepNo) + 1;
      $('div.promotionStep').removeClass('changeBg');
      $('#step'+stepNo).css('display','none');
      $('div.promotionStep').addClass('promotionHover');
      $('div.promotionStep .promotionStepNext').css('display','none');
      this.showStep(property,x);
   }

   save(property,stepNo){
      this.hideStep(property,stepNo);
   }

   private loadPromotion(id) {
      this.promoDetailAddModel.controls['promotionId'].setValue(id);
      this.promotionsService.getOne(id).subscribe(user => {
         this.promotion = user.message;
         this.promoName = user.message.name;
         this.promoDetailAddModel.controls['promoname'].setValue(this.promoName);
         this.checkFormValidation();
      });
   }

   private loadAllUsers(id) {
      this.kitchenMenuService.getAll(id).subscribe(users => {       
         var allMenu = [];
         allMenu = users.message;

         for (var i = 0; i < allMenu.length; i++) {
            var menuObj = {};
            var itemObj = [];

            var menuObj1 = {};
            var menuObj2 = {};
            var index = this.items.findIndex(mn => mn.menuId == allMenu[i]._id);
            if (index != -1) {
               this.menus.push(allMenu[i]);

               menuObj['id'] = allMenu[i]._id;

               /*menuObj1['id1'] = allMenu[i]['_id'];
               menuObj2['id2'] = allMenu[i]['_id'];
               menuObj1['item1'] = [];
               menuObj2['item2'] = [];*/

               menuObj1 = {'id1' : allMenu[i]._id , 'item1' : []}
               menuObj2 = {'id2' : allMenu[i]._id , 'item2' : []}

               this.menu1.push(menuObj1);
               this.menu2.push(menuObj2);

               for (var k = 0; k < this.items.length; k++) {
                  if (this.items[k].menuId == allMenu[i]._id) {
                     itemObj.push(this.items[k]._id);
                  }

                  menuObj['item'] = itemObj;
               }
               this.menu1Copy.push(menuObj);
            }
         }
      });
   }

   private loadAllItem(id) {
      this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
         this.items = users.message;
         this.loadAllUsers(id);
      });
   }

   private loadAllPromotions(id) {
      this.promotionsService.getAll().subscribe(pro => {
         this.promotions = pro.message;
         this.index = pro.message.findIndex(mn => mn._id == id);

         console.log("this.index");
         console.log(this.index);

         if (this.index == 0) {
            this.promoDetailAddModel.controls['discountPercent'].setValue(100);
         }
      });
      this.getRestaurants();
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
         for (var i in users.message.openinghours) {
            if (users.message.openinghours[i] == true) {
               this.days[i]=users.message.openinghours[i];
            }
         }
         this.fulfillmentTimeObj['days'] = this.days;
         this.promoDetailAddModel.controls['restaurantId'].setValue(users.message._id);
         this.loadAllItem(users.message._id);
         this.discountTiming.push(this.displayTimeObj);
         this.discountTiming.push(this.fulfillmentTimeObj);
         this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);
         this.checkFormValidation();
      });
   }

   private checkFormValidation(){

      var val1 = this.promoDetailAddModel.controls['discountPercent'].value;
      var val2 = this.promoDetailAddModel.controls['discountAmount'].value;
      var val3 = this.promoDetailAddModel.controls['minCartAmount'].value;

      if (this.index == 2 || this.index == 3 || this.index == 4) {
         if (this.promoDetailAddModel.valid &&  ((val1 != null && val1 != '') || (val2 != null && val2 != '')) && (val3 != null && val3 != '')) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }
      }

      if ( this.index == 1) {
         if (this.promoDetailAddModel.valid && (val1 != null && val1 != '') && this.itemNo1 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }

      if (this.index == 0 || this.index == 5) {
         if (this.promoDetailAddModel.valid && (val1 != null && val1 != '') && this.itemNo1 > 0 && this.itemNo2 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }

      if (this.index == 6) {
         if (this.promoDetailAddModel.valid && (val1 != null && val1 != '') && (val3 != null && val3 != '') && this.itemNo1 > 0 && this.itemNo2 > 0) {
            document.getElementById('saveButton').removeAttribute('disabled');
         }
         else{
            document.getElementById('saveButton').setAttribute('disabled','true');
         }      
      }
   }

   savePromotion(){
      if (this.promoDetailAddModel.controls['image'].value == null) {
         this.promoDetailAddModel.controls['image'].setValue('defaultPromoImage.jpg');
      }
      this.promotionsService.addPromotionDetail(this.promoDetailAddModel.value).subscribe(data=>{
         this.router.navigate(['/owner/marketing/promotions']);
         console.log("data");
         console.log(data);
      });
   }
}

@Component({
   selector: 'app-marketing-promotions-subscription',
   templateUrl: './marketingPromotionsSubscription.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingPromotionsSubscriptionComponent implements OnInit {
   promotion = [];
   show :boolean = false;
   showPricingDetail :boolean = false;
   restaurants:any ={};
   months:any = ['01','02','03','04','05','06','07','08','09','10','11','12'];
   years:any=[];

   billingDetailModel : FormGroup;
   cardDetailModel : FormGroup;
   providerModel : FormGroup;

   constructor(
      private restaurantsService: RestaurantsService,
      private promotionsService: PromotionsService,
      private activatedRoute:ActivatedRoute,
      private lf: FormBuilder
      ) {}

   ngOnInit() {
      this.billingDetailModel = this.lf.group({
         businessType : ['', Validators.required],
         companyName : ['', Validators.required],
         fName : ['', Validators.required],
         lName : ['', Validators.required],
         address : ['', Validators.required],
         city : ['', Validators.required],
         zipcode : ['', Validators.required],
         country : ['', Validators.required],
         _id: []
      });

      this.cardDetailModel = this.lf.group({
         fName : ['', Validators.required],
         lName : ['', Validators.required],
         cardNumber : ['', [Validators.required, Validators.minLength(16),Validators.maxLength(16), Validators.pattern('[0-9]+')]],
         month : ['', Validators.required],
         year : ['', Validators.required],
         cvv : ['', Validators.required],
         phoneNumber : ['', Validators.required],
         _id: []
      });

      this.providerModel = this.lf.group({
         apiKey : ['', Validators.required],
         secretKey : ['', Validators.required],
         gatewayId : ['', Validators.required],
         terminalPass : ['', Validators.required],
         _id: []
      });
      this.activatedRoute.params.subscribe((params: Params) => {
         let id = params['id'];
         this.loadPromotion(id);
      });


      this.cardDetailModel.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // reset validation messages now
      this.getRestaurants();
      this.yearAdd();
      this.goFurther('section1');
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
   onValueChanged(data?: any) {
      if (!this.cardDetailModel){
         return;
      }
      const form = this.cardDetailModel;
      for (const field in this.formErrors) {
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


   goFurther(id){
      console.log("id");
      console.log(id);
      $("[id^='section']").css("display","none"); 
      $('#'+id).css("display","block");
   }

   cardDetailSubmit(id){
      console.log("this.cardDetailModel.value");
      console.log(this.cardDetailModel.value);
      toastr.success('Payment done successfully');
      this.goFurther(id);
   }

   providerSetting(){
      toastr.success('Successful');
      let obj = {};
      obj['_id'] = this.restaurants._id;
      obj['onlinepayment'] = true;
      obj['billingaddress'] = this.billingDetailModel.value;
      obj['cardDetail'] = this.cardDetailModel.value;
      obj['paymentcredential'] = this.providerModel.value;
      console.log("obj");
      console.log(obj);
   }

   showDetail(type){
      if (type == 'price') {
         this.showPricingDetail = !this.showPricingDetail
      }

      if (type == 'activation') {    
         this.show = !this.show;
      }
   }

   private loadPromotion(id) {
      this.promotionsService.getOne(id).subscribe(user => {
         this.promotion = user.message;
         console.log("this.promotion");
         console.log(this.promotion);
      });
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
      });
   }
}

@Component({
   selector: 'app-marketing-stats',
   templateUrl: './marketingStats.component.html',
   styleUrls: ['./marketing.component.css']
})
export class MarketingStatsComponent implements OnInit {
   promotions = [];
   restaurants:any ={};
   timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
   selectedTime = this.timeValue[0].name;

    // lineChart
    public lineChartData:Array<any> = [
    {data: [], label: ''}
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    isShow:boolean = false;
    public lineChartType:string = 'line';

   constructor(
      private restaurantsService: RestaurantsService,
      private promotionsService: PromotionsService
      ) {}

   ngOnInit() {
      document.getElementById('noRecordClass').style.display = 'none';
      this.getRestaurants();
      this.loadAllPromotions();
   }

   private loadAllPromotions() {
      this.promotionsService.getAll().subscribe(promotions => {
         this.promotions = promotions.message;
         console.log("this.promotions");
         console.log(this.promotions);
      });
   }

   private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
         this.restaurants = users.message;
         this.lineChartLabels = this.lastSevenDays(this.selectedTime);
         this.getStatsData(this.restaurants._id , this.selectedTime);
      });
   }

   private getStatsData(id , days) {
      this.promotionsService.getPromotionChart(id , days).subscribe(users => {
         console.log(users.message)
         if (users.message.length > 0) {
            this.lineChartData = users.message;
            this.isShow = true;
         }
         if(users.message.length == 0){
            this.isShow = false;
            document.getElementById('noRecordClass').style.display = 'block';
         }
      });
   }

   private lastSevenDays(day){
      var array = [];
      for (var i = 0; i < day; i++) {
         var date = new Date();
         date.setDate(date.getDate()-i)
         array.push(new Date(date).toDateString())
      }
      return array;
   }

   onChangeObj(newObj) {
      this.selectedTime = newObj;
      this.lineChartLabels = this.lastSevenDays(this.selectedTime);
      this.getStatsData(this.restaurants._id , this.selectedTime);
   }
}
