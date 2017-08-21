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

  private showDiv(id){
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
    private promotionsService: PromotionsService
  ) {}

  ngOnInit() {
    //this.loadScript('/assets/js/Moment.js','js');
    this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');
    this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');
    //this.loadScript('/assets/js/custome.js','js');
    
    //$('#datepicker').datepicker();
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
    console.log('ngInit') 

    this.getRestaurants();
    //this.loadAllPromotions();
    this.getCustomData();
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

      console.log(this.orderLast);
    });
  }

  private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
        this.restaurants = users.message;
      });
  }

  private presentTimeUpdate(property){
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

  private dateNtimeUpdate(property){
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
    $('#datepicker').datetimepicker({format:'DD - MM - YYYY'});
    $('#timepicker').datetimepicker({format: 'LT'});
  }

  private showDatePicker(){
    console.log("clicked showDatePicker");
    $('#datepicker').datetimepicker({format:'DD - MM - YYYY'});
    $('#timepicker').datetimepicker({format:'LT'});
  }

  private showTimePicker(){
    console.log("clicked showTimePicker");
    $('#datepicker').datetimepicker({format:'DD - MM - YYYY'});
    $('#timepicker').datetimepicker({format: 'LT'});
  }

  private getValue(type){
     let eleObj = (<HTMLInputElement>document.getElementById(type));
     console.log("eleObj");
     console.log(eleObj.value);
  }
}

@Component({
  selector: 'app-marketing-promotions-list',
  templateUrl: './marketingPromotionsList.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingPromotionsListComponent implements OnInit {
  promotions = [];
  restaurants:any ={};
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
  promotion = [];
  promotions = [];
  menus: any = [];
  items: any = [];
  itemIds = [];
  menuIds = [];
  discountOn = [];
  discountTiming = [];
  menu1 = [];
  menu2 = [];
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
    private promotionsService: PromotionsService,
    private kitchenMenuService: KitchenMenuService,
    private kitchenMenuItemService: KitchenItemService,
    private lf: FormBuilder
  ) {}

  ngOnInit() {

    this.loadScript('/assets/js/bootstrap-datetimepicker.min.js','js');
    this.loadScript('/assets/css/bootstrap-datetimepicker.css','css');

    this.promoDetailAddModel = this.lf.group({
      restaurantId: ['', Validators.required],
      promotionId: ['', Validators.required],
      promoname: ['', Validators.required],
      description: [],
      image: [],
      discountOn: ['', Validators.required],
      discountPercent: ['', Validators.required],
      discountTiming: ['', Validators.required],
      orderType: ['', Validators.required],
      orderTime: ['', Validators.required],
      clientbenefited: ['', Validators.required],
      dealredemption: ['', Validators.required],
      couponcode: ['', Validators.required],
      status: ['', Validators.required]
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
    $("div[id^='orderType']").addClass('selected2');
    $("div[id^='orderTime']").addClass('selected2');
    $("div[id^='clientType']").addClass('selected2');
    $("div[id^='show']").addClass('selected2');
    $("div[id='auto']").addClass('selected2');
    $("div[id='code']").addClass('selected2');
    this.getRestaurants();
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
      $('#datePicker1').datetimepicker({format:'DD - MM - YYYY'});
      $('#datePicker2').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
      $("#datePicker1").on("dp.change", function (e) {
        $('#datePicker2').data("DateTimePicker").minDate(e.date);
      });
      $("#datePicker2").on("dp.change", function (e) {
        $('#datePicker1').data("DateTimePicker").maxDate(e.date);
      });
    }

    if (type == 'fulfillmentTime') {
      $('#datePicker3').datetimepicker({format:'DD - MM - YYYY'});
      $('#datePicker4').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
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

  private showDisplayTime(){
    if (this.displayTrue != 'displayTrue') {
      this.displayFalse = 'displayFalse';
      this.displayTrue = 'displayTrue';
    }
    this.displayTime = true;
    this.fulfillmentTime = false;
    $('#datePicker1').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker2').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
  }

  private showFulfillmentTime(){
    if (this.displayFalse != 'displayTrue') {
      this.displayFalse = 'displayTrue';
      this.displayTrue = 'displayFalse';
    }
    this.displayTime = false;
    this.fulfillmentTime = true;
    $('#datePicker3').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker4').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
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

    $('#datePicker1').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker2').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
    $('#datePicker3').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker4').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
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

    $('#datePicker1').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker2').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
    $('#datePicker3').datetimepicker({format:'DD - MM - YYYY'});
    $('#datePicker4').datetimepicker({format:'DD - MM - YYYY',useCurrent: false});
  }

  private orderType(type){
    $("div[id^='orderType']").addClass('selected2');
    if (type == 'any') {
      $("div[id='orderType1']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderType'].setValue({'mType':'Any'});
    }
    if (type == 'pickup') {
      $("div[id='orderType2']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderType'].setValue({'mType':'Pickup'});
    }
    if (type == 'delivery') {
      $("div[id='orderType3']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderType'].setValue({'mType':'Delivery'});
    }
    console.log(this.promoDetailAddModel.value);
  }

  private orderTime(type){
    $("div[id^='orderTime']").addClass('selected2');
    if (type == 'any') {
      $("div[id='orderTime1']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderTime'].setValue({'tType':'Any'});
    }
    if (type == 'now') {
      $("div[id='orderTime2']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderTime'].setValue({'tType':'now'});
    }
    if (type == 'later') {
      $("div[id='orderTime3']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['orderTime'].setValue({'tType':'later'});
    }
    console.log(this.promoDetailAddModel.value);
  }

  private clientType(type){
    $("div[id^='clientType']").addClass('selected2');
    if (type == 'any') {
      $("div[id='clientType1']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['clientbenefited'].setValue({'cType':'Any'});
    }
    if (type == 'new') {
      $("div[id='clientType2']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['clientbenefited'].setValue({'cType':'new'});
    }
    if (type == 'returning') {
      $("div[id='clientType3']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['clientbenefited'].setValue({'cType':'returning'});
    }
    console.log(this.promoDetailAddModel.value);
  }

  private dealRedemption(type){
    $("div[id^='show']").addClass('selected2');
    if (type == 'showAll') {
      $("div[id='showAll']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['dealredemption'].setValue({'redeemTo':'all'});
    }
    if (type == 'showSome') {
      $("div[id='showSome']").removeClass('selected2').addClass('selected1');
      this.promoDetailAddModel.controls['dealredemption'].setValue({'redeemTo':'some'});
    }
    console.log(this.promoDetailAddModel.value);
  }

  private couponCode(type){
    if (type == 'auto') {
      $("div[id='auto']").removeClass('selected2').addClass('selected1');
      $("div[id='code']").addClass('selected2').removeClass('selected1');
      this.customCouponCode = false;
      this.promoDetailAddModel.controls['couponcode'].setValue('');
    }
    if (type == 'code') {
      $("div[id='auto']").removeClass('selected1').addClass('selected2');
      $("div[id='code']").addClass('selected1').removeClass('selected2');
      this.customCouponCode = true;
    }
    console.log(this.promoDetailAddModel.value);
  }

  /*private selectCheck(event,obj,type){
    console.log("obj");
    console.log(obj);
    if (type == 'item' && obj !='') {
      if (!event.target.checked) {
          this.itemIds.splice(this.itemIds.indexOf(event.target.value),1);
        }
      if ((event.target.checked) && (this.itemIds.indexOf(event.target.value) == -1)) {
        var xyz = this.menu.findIndex(mn => mn.item.indexOf(event.target.value));
        //this.itemIds.push(event.target.value);
        console.log("x while pushing item");
        console.log(xyz);
      }
    }

    if (type == 'menu') {
      if (!event.target.checked) {
        this.menuIds.splice(this.menuIds.indexOf(event.target.value),1);
        if (this.menu.length > 0){
          for (var i = 0; i < this.menu.length; i++) {
            if (this.menu[i]['id'] == event.target.value) {
              this.markChecked(this.menu[i],event,type);
              this.menu.splice(i,1);
            }
          }
        }
      }
      if ((event.target.checked) && (this.menuIds.indexOf(event.target.value) == -1)) {
        var menu = {};
        var itemId = [];
        this.menuIds.push(event.target.value);
        menu['id'] = event.target.value;
        var x = this.items.findIndex(mn => mn.menuId == event.target.value);
        if (x > -1) {        
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].menuId == event.target.value) {
              if (this.itemIds.indexOf(this.items[i]._id) == -1) {
                itemId.push(this.items[i]._id);
                this.itemIds.push(this.items[i]._id)
              }
              menu['item'] = itemId;
              this.markChecked(menu,event,type);
            }
          }
        }
        if (x == -1) {
          menu['item'] = itemId;
        }
        this.menu.push(menu);
      }
    }

    console.log("this.itemIds");
    console.log(this.itemIds);
    console.log("this.menuIds");
    console.log(this.menuIds);
  }*/

  private selectCheck(event,obj,type,itemGroup){
    var menuObj = {};
    var itemIdObj = [];


    if (itemGroup == 'itemGroup1') {
      if (type == 'menu' && obj == '') {
        if (event.target.checked) {
          var x = this.menu1.findIndex(mn => mn.id == event.target.value);
          console.log("x - "+ x);
          if (x > -1) {
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].menuId == event.target.value) {
                itemIdObj.push(this.items[i]._id);
              }
            }
            this.menu1[x]['item'] = itemIdObj;
            this.markChecked(this.menu1[x],event,type);
          }

          if (x == -1) {
            menuObj['id'] = event.target.value;
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].menuId == event.target.value) {
                itemIdObj.push(this.items[i]._id);
                menuObj['item'] = itemIdObj;
              }
            }
            this.menu1.push(menuObj);
            this.markChecked(menuObj,event,type);
          }
        }
        if (!event.target.checked) {
          if (this.menu1.length > 0){
            for (var i = 0; i < this.menu1.length; i++) {
              if (this.menu1[i]['id'] == event.target.value) {
                this.markChecked(this.menu1[i],event,type);
                itemIdObj = [];
                this.menu1.splice(i,1);
              }
            }
          }
        }
      }

      if (type == 'item' && obj != '') {
        var id = 'item_' + event.target.value
        var x = this.menu1.findIndex(mn => mn.id == obj.menuId);
        if (event.target.checked) {
          if (x == -1) {
            menuObj['id'] = obj.menuId;
            itemIdObj.push(event.target.value);
            menuObj['item'] = itemIdObj;
            this.menu1.push(menuObj);
            document.getElementById(id).setAttribute('checked','true');
          }
          if (x > -1) {
            menuObj = this.menu1[x];
            itemIdObj = menuObj['item'];
            if (itemIdObj.indexOf(event.target.value) == -1) {
              itemIdObj.push(event.target.value);
              menuObj['item'] = itemIdObj;
              this.menu1[x]['item'] = itemIdObj;
              document.getElementById(id).setAttribute('checked','true');            
            }
          }
        }

        if (!event.target.checked) {
          if (x > -1) {
            menuObj = this.menu1[x];
            if (menuObj['item'].indexOf(event.target.value) > -1) {
              itemIdObj = menuObj['item'];
              itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
              menuObj['item'] = itemIdObj; 
              document.getElementById(id).removeAttribute('checked');
            }
          }
        }
      }
    }

    if (itemGroup == 'itemGroup2') {
      if (type == 'menu' && obj == '') {
        if (event.target.checked) {
          var x = this.menu2.findIndex(mn => mn.id == event.target.value);
          console.log("x - "+ x);
          if (x > -1) {
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].menuId == event.target.value) {
                itemIdObj.push(this.items[i]._id);
              }
            }
            this.menu2[x]['item'] = itemIdObj;
            this.markChecked(this.menu2[x],event,type);
          }

          if (x == -1) {
            menuObj['id'] = event.target.value;
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].menuId == event.target.value) {
                itemIdObj.push(this.items[i]._id);
                menuObj['item'] = itemIdObj;
              }
            }
            this.menu2.push(menuObj);
            this.markChecked(menuObj,event,type);
          }
        }
        if (!event.target.checked) {
          if (this.menu2.length > 0){
            for (var i = 0; i < this.menu2.length; i++) {
              if (this.menu2[i]['id'] == event.target.value) {
                this.markChecked(this.menu2[i],event,type);
                itemIdObj = [];
                this.menu2.splice(i,1);
              }
            }
          }
        }
      }

      if (type == 'item' && obj != '') {
        var id = 'item_' + event.target.value
        var x = this.menu2.findIndex(mn => mn.id == obj.menuId);
        if (event.target.checked) {
          if (x == -1) {
            menuObj['id'] = obj.menuId;
            itemIdObj.push(event.target.value);
            menuObj['item'] = itemIdObj;
            this.menu2.push(menuObj);
            document.getElementById(id).setAttribute('checked','true');
          }
          if (x > -1) {
            menuObj = this.menu2[x];
            itemIdObj = menuObj['item'];
            if (itemIdObj.indexOf(event.target.value) == -1) {
              itemIdObj.push(event.target.value);
              menuObj['item'] = itemIdObj;
              this.menu2[x]['item'] = itemIdObj;
              document.getElementById(id).setAttribute('checked','true');            
            }
          }
        }

        if (!event.target.checked) {
          if (x > -1) {
            menuObj = this.menu2[x];
            if (menuObj['item'].indexOf(event.target.value) > -1) {
              itemIdObj = menuObj['item'];
              itemIdObj.splice(itemIdObj.indexOf(event.target.value),1);
              menuObj['item'] = itemIdObj; 
              document.getElementById(id).removeAttribute('checked');
            }
          }
        }
      }
    }

    console.log("this.menu1");
    console.log(this.menu1);
    console.log("this.menu2");
    console.log(this.menu2);
  }

  private markChecked(menu,event,type){
    if (type == 'menu') {
      if (menu['item'].length > 0) {
        for (var i = 0; i < menu['item'].length; i++) {        
          var id = 'item_' + menu['item'][i];
          if (event.target.checked) {
            if (!document.getElementById(id).getAttribute('checked')) {
              document.getElementById(id).setAttribute('checked','true');
            }
          }
          if (!event.target.checked) {
            if (document.getElementById(id).getAttribute('checked')) {
              document.getElementById(id).removeAttribute('checked');
            }
          }
        }
      }
    }
  }

  private saveMenu(type){
    var discountOnItem = {};
    this.itemIds = [];
    if (type == 'itemGroup1') {
      this.itemNo1 = 0;
      discountOnItem['itemGroup'] = 1;
      for (var i = 0; i < this.menu1.length; i++) {
        if (this.menu1[i].item.length > 0) {      
          for (var j = 0; j < this.menu1[i].item.length; j++) {
            this.itemNo1++;
            this.itemIds.push(this.menu1[i].item[j])
          }
        }
      }
      $("#itemGroup1").modal('hide');
      discountOnItem['item'] = this.itemIds;
    }

    if (type == 'itemGroup2') {
      this.itemNo2 = 0;
      discountOnItem['itemGroup'] = 2;
      for (var i = 0; i < this.menu2.length; i++) {
        if (this.menu2[i].item.length > 0) {      
          for (var j = 0; j < this.menu2[i].item.length; j++) {
            this.itemNo2++;
            this.itemIds.push(this.menu2[i].item[j])
          }
        }
      }
      $("#itemGroup2").modal('hide');
      discountOnItem['item'] = this.itemIds;
    }

    this.discountOn.push(discountOnItem);
    this.promoDetailAddModel.controls['discountOn'].setValue(this.discountOn);

    console.log("this.promoDetailAddModel.value");
    console.log(this.promoDetailAddModel.value);
  }

  private countCharacter(event:any,name,type){
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
    if (type == 'couponCode') {
      this.promoDetailAddModel.controls['couponcode'].setValue(name.value);
    }

    console.log(this.promoDetailAddModel.value);
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.promoDetailAddModel.controls['image'].setValue(responsePath.filename);
      toastr.success('Image Uploaded Successfully');
      this.promoImage = responsePath.filename;
    };
  }

  private showStep(property,stepNo){
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
  }

  private hideStep(property,stepNo){
    var x = parseInt(stepNo) + 1;
    $('div.promotionStep').removeClass('changeBg');
    $('#step'+stepNo).css('display','none');
    //$('#step'+x).css('display','block');
    $('div.promotionStep').addClass('promotionHover');
    $('div.promotionStep .promotionStepNext').css('display','none');
    this.showStep(property,x);
  }

  private save(property,stepNo){
    this.hideStep(property,stepNo);
  }

  private loadPromotion(id) {
    this.promoDetailAddModel.controls['promotionId'].setValue(id);
    this.promotionsService.getOne(id).subscribe(user => {
      this.promotion = user.message;
      this.promoName = user.message.name;
      this.promoDetailAddModel.controls['promoname'].setValue(this.promoName);
      /*console.log("this.promotion");
      console.log(this.promotion);*/
    });
  }

  private loadAllUsers(id) {
    this.kitchenMenuService.getAll(id).subscribe(users => {       
        this.menus = users.message;
        /*console.log("this.menus");
        console.log(this.menus);*/
        /*for (var i = 0; i < this.menus.length; i++) {
          this.menuIds.push(this.menus[i]._id);
        } */           
    });
  }
  
  private loadAllItem(id) {
    this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
        this.items = users.message;
        /*console.log("this.items");
        console.log(this.items);*/
        
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
          this.days[i]=users.message.openinghours[i];
        }
      }
      this.fulfillmentTimeObj['days'] = this.days;
      this.promoDetailAddModel.controls['restaurantId'].setValue(users.message._id);
      this.loadAllUsers(users.message._id);
      this.loadAllItem(users.message._id);

      this.discountTiming.push(this.displayTimeObj);
      this.discountTiming.push(this.fulfillmentTimeObj);
      this.promoDetailAddModel.controls['discountTiming'].setValue(this.discountTiming);

      console.log(this.promoDetailAddModel.value);

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


  private goFurther(id){
    console.log("id");
    console.log(id);
    $("[id^='section']").css("display","none"); 
    $('#'+id).css("display","block");
  }

  private cardDetailSubmit(id){
    console.log("this.cardDetailModel.value");
    console.log(this.cardDetailModel.value);
    toastr.success('Payment done successfully');
    this.goFurther(id);
  }

  private providerSetting(){
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

  private showDetail(type){
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
    });
  }

  private getRestaurants() {
      this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
        this.restaurants = users.message;
      });
  }
}
