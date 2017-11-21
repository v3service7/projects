import { Component, OnInit, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { FlashMessagesService } from 'angular2-flash-messages';
//import {InlineEditorDirective} from 'ng2-inline-editor';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService } from '../service/index';
import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../global";

declare var $: any;
declare var google: any;
declare var toastr: any;

@Component({
	selector: 'app-pickup',
	templateUrl: './serviceandopening.component.html',
	styles: []
})
export class RestaurantOwnerPickupComponent implements OnInit {

	pickupAddModel: FormGroup;
	restaurants: any;

	btn_class1: any = 'btn-success';
	btn_class2: any = 'btn-default';
	user = [];

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }

	ngOnInit() {
		this.pickupAddModel = this.lf.group({
			pickup: ['', Validators.required],
			_id: []
		});
		this.getRestaurants();
	}

	pickupYesUpdate() {
		this.pickupAddModel.controls['pickup'].setValue(true);
		if (this.btn_class1 != 'btn-success') {
			this.btn_class2 = 'btn-default';
			this.btn_class1 = 'btn-success';
		}
		
	}

	pickupNoUpdate() {
		this.pickupAddModel.controls['pickup'].setValue(false);
		if (this.btn_class2 != 'btn-danger') {
			this.btn_class1 = 'btn-default';
			this.btn_class2 = 'btn-danger';
		}	
	}

	pickupDetailUpdate() {
		this.restaurantsService.updatePickUp(this.pickupAddModel.value).subscribe(
			(data) => {
				this.user = data.message;
				toastr.success('Pickup Detail Updated','Success!')
				this.router.navigate(['/owner/restaurant-deliveryzone']);			
			});
	}


	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			if (this.restaurants.pickup) {
				this.pickupYesUpdate();
			} else {
				this.pickupNoUpdate();
			}
			this.pickupAddModel.controls['pickup'].setValue(true);
			this.pickupAddModel.controls['_id'].setValue(this.restaurants._id);			
		});
	}
}

@Component({
	selector: 'app-pickup',
	templateUrl: './openinghours.component.html',
	styles: []
})
export class RestaurantOwnerOpeningHoursComponent implements OnInit {

	openingAddModel: FormGroup;
	restaurants: any = {};
	user: any;
	optionSet: any = {};
	preoptionSet: any = {};

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }


	ngOnInit() {

		this.openingAddModel = this.lf.group({
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
			opentime: ['', Validators.required],
			closetime: ['', Validators.required],
			_id: []
		});
		this.initailfun();
	}

	initailfun() {
		// var objForUpdate : any = {}; 	
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.optionSet._id = this.restaurants._id;

			for (var i in this.restaurants.openinghours) {
				if (this.restaurants.openinghours[i]) {
					this.preoptionSet[i] = this.restaurants.openinghours[i];
				}
			}

			console.log("users.message");
			console.log(users.message);
			//this.optionSet.openinghours.push(objForUpdate);
		});
	}

	openingHourDetailUpdate() {
		var objForUpdate: any = {};
		var timeObj: any = {};

		timeObj.opentime = this.openingAddModel.value.opentime;
		timeObj.closetime = this.openingAddModel.value.closetime;


		for (var i in this.openingAddModel.value) {
			if (this.openingAddModel.value[i] == true) {
				objForUpdate[i] = this.openingAddModel.value[i];
				var timeKey = i + 'time';
				objForUpdate[timeKey] = timeObj;
			}
		}

		var d = this.preoptionSet;
		for (var key in d) {
			if (objForUpdate[key] != d[key] && objForUpdate.hasOwnProperty(key) == false) {
				objForUpdate[key] = d[key];
			}
		}

		this.optionSet.result = { "openinghours": objForUpdate };
		this.restaurantsService.updatePickUpHours(this.optionSet).subscribe((data) => {
			this.user = data.message;
			toastr.success('Restaurant Opening Hours Updated','Success!')
			this.router.navigate(['/owner/restaurant-orderforlater']);
		});
	}

	remove(day){
		var time = day + "time";
		delete this.preoptionSet[day];
		delete this.preoptionSet[time];

		this.optionSet.result = { "openinghours": this.preoptionSet };
		this.restaurantsService.updatePickUpHours(this.optionSet).subscribe((data) => {
			this.user = data.message;
			toastr.success('Restaurant Opening Hours Updated','Success!');
			this.initailfun();
		});

	}
}

@Component({
	selector: 'app-pickup',
	templateUrl: './orderforlater.component.html',
	styles: []
})
export class RestaurantOwnerOrderForLaterComponent implements OnInit {

	orderAddModel: FormGroup;
	restaurants: any;
	orderlater: any = {};
	user = [];

	detailComplete : boolean = false;

	styleforpass1 = { 'background-color': 'green', "color": 'white' };
	styleforpass2 = {};
	stylefordisplay1 = { 'display': 'block' };
	stylefordisplay2 = { 'display': 'none' };

	mintime : number;
	mindate : number;
	dmintime : number;
	dmindate : number;


	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }


	ngOnInit() {
		this.getRestaurants();
	}

	orderForChange(action) {
		if (action) {
			this.styleforpass1 = { 'background-color': 'green', "color": 'white' };
			this.styleforpass2 = { 'background-color': '', "color": 'black' };
			this.stylefordisplay2 = { 'display': 'none' };
			this.stylefordisplay1 = { 'display': 'block' };

			this.orderlater['orderforlater'] = true;
			this.detailComplete = false;
		} else {
			this.styleforpass2 = { 'background-color': 'red', "color": 'white' };
			this.styleforpass1 = { 'background-color': '', "color": 'black' };
			this.stylefordisplay2 = { 'display': 'block' };
			this.stylefordisplay1 = { 'display': 'none' };

			this.orderlater['orderforlater'] = false;
			this.detailComplete = true;

			delete this.orderlater['orderforlaterpickup'];
			delete this.orderlater['orderforlaterdelivery'];
			delete this.mintime;
			delete this.mindate;
			delete this.dmintime;
			delete this.dmindate;
		}
	}

	orderDetailUpdate(event) {
		this.orderlater['orderforlaterpickup'] = { 'mintime': this.mintime, 'mindate': this.mindate };
		this.orderlater['orderforlaterdelivery'] = { 'mintime': this.dmintime, 'mindate': this.dmindate };

		if (this.mintime > 0 && this.mindate > 0 && this.dmintime > 0 && this.dmindate > 0) {
			this.detailComplete = true;
		}else{
			this.detailComplete = false;
		}
	}

	saveData(){
		this.restaurantsService.updatePickUp(this.orderlater).subscribe(
			(data) => {
				this.user = data.message;
				toastr.success('Order for Later Detail Updated','Success!');
				this.router.navigate(['/owner/restaurant-pickup']);
			}
		);
	}

	incompleteData(){
		if (this.detailComplete)
			return false;
		else
			return true;
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.orderlater['_id'] = this.restaurants._id;
			this.orderForChange(this.restaurants.orderforlater);

			if (this.restaurants.orderforlater) {
				this.mintime = this.restaurants.orderforlaterpickup.mintime;
				this.mindate = this.restaurants.orderforlaterpickup.mindate;
				this.dmintime = this.restaurants.orderforlaterdelivery.mintime;
				this.dmindate = this.restaurants.orderforlaterdelivery.mindate;

				this.orderDetailUpdate(null);
			}
		});
	}
}

@Component({
	selector: 'app-pickup',
	templateUrl: './taxation.component.html',
	styles: []
})
export class RestaurantOwnerTaxationComponent implements OnInit {

	taxationAddModel: FormGroup;
	restaurants: any;
	deliveryT: number;
	newTax: boolean = false;
	user = [];

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }

	ngOnInit() {

		this.taxationAddModel = this.lf.group({
			name: ['', Validators.required],
			tax: ['', Validators.required],
			menuTax: ['', Validators.required],
			deliveryTaxType: ['', Validators.required],
			deliveryTax: [],
			currency: ['', Validators.required],
			_id: []
		});
		this.getRestaurants();
	}

	getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			console.log("this.restaurants");
			console.log(this.restaurants);
			if (typeof this.restaurants.taxation != 'undefined') {
				this.taxationAddModel.patchValue(this.restaurants.taxation);
			}
		});
	}

	taxationDetailUpdate() {

		if (this.taxationAddModel.controls['deliveryTaxType'].value == 'New Tax' && this.taxationAddModel.controls['deliveryTax'].value == null) {
			this.taxationAddModel.controls['deliveryTax'].setValue(0);
		}
		if (this.taxationAddModel.controls['deliveryTaxType'].value == 'Same Tax') {
			this.taxationAddModel.controls['deliveryTax'].setValue(null);
		}
		var objForUpdate: any = {};
		objForUpdate._id = this.restaurants._id;
		objForUpdate.taxation = this.taxationAddModel.value;
		this.restaurantsService.updatePickUp(objForUpdate).subscribe(
			(data) => {
				if (!data.error) {
					toastr.success('Taxation Detail Updated','Success!');
					this.router.navigate(['/owner/restaurant-paymentoption']);
				}else{
					toastr.error('Unable to Updated','Error!');
				}
			}
		);
	}
}

@Component({
	selector: 'app-pickup',
	templateUrl: './paymentoption.component.html',
	styles: []
})
export class RestaurantOwnerPaymentOptionComponent implements OnInit {

	restaurants: any;
	user = [];
	cashObj: any = { "cash": false, "cardpickup": false, "cardinternet": false, "dcash": false, "dcardpickup": false, "dcardinternet": false };
	cashi: any;
	cardpickupi: any;
	cardinterneti: any;

	dcashi: any;
	dcardpickupi: any;
	dcardinterneti: any;

	forgreen: any = { "background-color": "green", "color": "white" };
	forred: any = { "background-color": "red", "color": "white" };
	forwhite: any = { "background-color": "white", "color": "black" };


	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }

	ngOnInit() {
		this.intialoption();
		this.getRestaurants();
	}

	intialoption() {
		if (this.cashObj.cash) { this.cashi = true; } else { this.cashi = false; }
		if (this.cashObj.cardpickup) { this.cardpickupi = true; } else { this.cardpickupi = false; }
		if (this.cashObj.cardinternet) { this.cardinterneti = true; } else { this.cardinterneti = false; }

		if (this.cashObj.dcash) { this.dcashi = true; } else { this.dcashi = false; }
		if (this.cashObj.dcardpickup) { this.dcardpickupi = true; } else { this.dcardpickupi = false; }
		if (this.cashObj.dcardinternet) { this.dcardinterneti = true; } else { this.dcardinterneti = false; }
	}


	intialOnLoadOption(loadobj) {
		if (loadobj.paymentpickup.cash) { this.cashi = true; } else { this.cashi = false; }
		if (loadobj.paymentpickup.cardpickup) { this.cardpickupi = true; } else { this.cardpickupi = false; }
		if (loadobj.paymentpickup.cardinternet) { this.cardinterneti = true; } else { this.cardinterneti = false; }

		if (loadobj.paymentdelivery.cash) { this.dcashi = true; } else { this.dcashi = false; }
		if (loadobj.paymentdelivery.cardpickup) { this.dcardpickupi = true; } else { this.dcardpickupi = false; }
		if (loadobj.paymentdelivery.cardinternet) { this.dcardinterneti = true; } else { this.dcardinterneti = false; }
	}


	intialoption2(fors, selectoption) {
		if (fors == 'cash' && selectoption == true) {
			this.cashi = true;
		}

		if (fors == 'cash' && selectoption == false) {
			this.cashi = false;
		}

		if (fors == 'cardpickup' && selectoption == true) {
			this.cardpickupi = true;
		}

		if (fors == 'cardpickup' && selectoption == false) {
			this.cardpickupi = false;
		}

		if (fors == 'cardinternet' && selectoption == true) {
			this.cardinterneti = true;
		}

		if (fors == 'cardinternet' && selectoption == false) {
			this.cardinterneti = false;
		}
		if (fors == 'dcash' && selectoption == true) {
			this.dcashi = true;
		}

		if (fors == 'dcash' && selectoption == false) {
			this.dcashi = false;
		}

		if (fors == 'dcardpickup' && selectoption == true) {
			this.dcardpickupi = true;
		}

		if (fors == 'dcardpickup' && selectoption == false) {
			this.dcardpickupi = false;
		}

		if (fors == 'dcardinternet' && selectoption == true) {
			this.dcardinterneti = true;
		}

		if (fors == 'dcardinternet' && selectoption == false) {
			this.dcardinterneti = false;
		}
	}


	getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			/*console.log("this.restaurants");
			console.log(this.restaurants);*/
			this.intialOnLoadOption(this.restaurants);
		});
	}


	paymentDetailUpdate() {
		var objForUpdate: any = {};
		objForUpdate._id = this.restaurants._id;
		objForUpdate.paymentpickup = { "cash": this.cashi, "cardpickup": this.cardpickupi, "cardinternet": this.cardinterneti };
		objForUpdate.paymentdelivery = { "cash": this.dcashi, "cardpickup": this.dcardpickupi, "cardinternet": this.dcardinterneti };
		this.restaurantsService.updatePickUp(objForUpdate).subscribe(
			(data) => {
				this.user = data.message;
				toastr.success('Order Payment Options Updated','Success!');
				this.router.navigate(['/owner/restaurant-taxation']);
			});
	}
}

@Component({
	selector: 'app-pickup',
	templateUrl: './deliveryzone.component.html',
	styleUrls: ['./kitchenmenulist.component.css']
})
export class RestaurantOwnerDeliveryZoneComponent implements OnInit {
	deliveryAddModel: FormGroup;
	editableDetail: FormGroup;
	areatype: any = 'Circle';
	addanother: any = { "display": "none" };
	restaurants: any;
	deliverys: any = [];
	classMap: any = 'active';
	edit: any = false;
	etypeClass: any;
	lat: any;
	lng: any;
	latt: number;
	lngg: number;
	StockColor: any = '#FF6856';
	BackColor: any = '#56FFF2';
	radiusadd: number = 200;
	citymap: any = {};
	randomColorCode: any;
	triangleCoords: any = [];
	mypolygone: any = [];
	cityCircle: any;
	displayMapProp: any = [];
	mergeCircleShape: any = [];
	mypolygoneedit: any = [];
	mycircleedit: any = [];

	deliveryConfirmAddModel: FormGroup;
	
	btn_class1: any = 'btn-success';
	btn_class2: any = 'btn-default';
	user : any ;

	constructor(
		private elem: ElementRef,
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder,
		private ngZone: NgZone
		) {}

	ngOnInit() {
		
		this.deliveryConfirmAddModel = this.lf.group({
			delivery: ['', Validators.required],
			_id: []
		});
		this.deliveryAddModel = this.lf.group({
			type: [],
			name: ['', Validators.required],
			amount: ['', Validators.required],
			deliveryfee: ['', Validators.required],
			radius: [],
			restaurantId: [],
			color: []
		});
		this.getRestaurants();
		this.editableDetail = this.lf.group({
			etype: [],
			ename: ['', Validators.required],
			eamount: ['', Validators.required],
			edeliveryfee: ['', Validators.required],
			eid: [],
			eradius: [],
			ecolor: []
		});
		this.jq();
	}
	jq() {
		$(document).ready(function() {
			$(document).on('click', '.colls', function() {
				var cName = $(this).hasClass("collapsed");				   
				if (cName == true) {						
					$(this).children('span').attr("class", "icon-collapse");						
					return false;
				}
				if (cName == false) {
					$(this).children('span').attr("class", "icon-expand");						
					return false;
				}
			});
		});
	}

	deliveryYesUpdate() {
		this.deliveryConfirmAddModel.controls['delivery'].setValue(true);
		if (this.btn_class1 != 'btn-success') {
			this.btn_class2 = 'btn-default';
			this.btn_class1 = 'btn-success';
		}
	}

	deliveryNoUpdate() {
		this.deliveryConfirmAddModel.controls['delivery'].setValue(false);
		if (this.btn_class2 != 'btn-danger') {
			this.btn_class1 = 'btn-default';
			this.btn_class2 = 'btn-danger';
		}
		document.getElementById('deliveryChoice').style.display = 'block';
	}

	deliveryDetailUpdate() {
		this.restaurantsService.updateDelivery(this.deliveryConfirmAddModel.value).subscribe(
			(data) => {
				this.user = data.message;
				toastr.success('Delivery Availability Updated','Success!');
				if (!this.deliveryConfirmAddModel.controls['delivery'].value) {
					this.router.navigate(['/owner/restaurant-openinghours']);
				}else{
				this.getRestaurants();
				}
			}
		);
	}
	selectCircleEdit(Obj1) {
		let mapProp = {
			center: new google.maps.LatLng(this.lat, this.lng),
			zoom: 12,
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

		// Add the circle for this city to the map.
		if (Obj1.type == 'Circle') {
			this.mycircleedit = new google.maps.Circle({
				strokeColor: Obj1.color,
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: Obj1.color,
				fillOpacity: 0.6,
				map: map,
				editable: true,
				center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
				radius: parseFloat(Obj1.radius)
			});
		}
		else {
			var polygonCord = [];
			var newArr = Obj1.radius;
			var splitString = newArr.split('@');
			var splitStrlen = splitString.length;
			
			for (var k = 0; k < splitStrlen; k++) {
				var my_lat = splitString[k].split(',');
				polygonCord.push({ lat: parseFloat(my_lat[0]), lng: parseFloat(my_lat[1]) });
			}

			this.mypolygoneedit = new google.maps.Polygon({
				paths: polygonCord,
				strokeColor: Obj1.color,
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: Obj1.color,
				fillOpacity: 0.6,
				editable: true,
			});
			this.mypolygoneedit.setMap(map);
		}
	}
	selectCircle() {
		let mapProp = {
			center: new google.maps.LatLng(this.lat, this.lng),
			zoom: 12,
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
	selectCircleEditable() {
		this.randomColorCode = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
		let mapProp = {
			center: new google.maps.LatLng(this.lat, this.lng),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		let map = new google.maps.Map(document.getElementById("gmap"), mapProp);
		let latLng = new google.maps.LatLng(this.lat, this.lng);
		let marker = new google.maps.Marker({
			position: latLng,
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP
		});
		for (var city in this.citymap) {
			// Addthe  circle for this city to the map.
			this.cityCircle = new google.maps.Circle({
				strokeColor: this.StockColor,
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: this.randomColorCode,
				fillOpacity: 0.35,
				editable: true,
				map: map,
				center: this.citymap.center,
				radius: this.radiusadd
			});
		}
	}
	selectShapeEditable() {
		this.randomColorCode = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
		let mapProp = {
			center: new google.maps.LatLng(this.lat, this.lng),
			zoom: 12,
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
		this.mypolygone = new google.maps.Polygon({
			paths: this.triangleCoords,
			strokeColor: this.StockColor,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: this.randomColorCode,
			fillOpacity: 0.35,
			editable: true
		});
		this.mypolygone.setMap(map);
	}
	getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.deliveryConfirmAddModel.controls['delivery'].setValue(this.restaurants.delivery);
			this.deliveryConfirmAddModel.controls['_id'].setValue(this.restaurants._id);

			if (this.restaurants.delivery) {
				document.getElementById('deliveryChoice').style.display = 'none';
				this.deliveryYesUpdate();
				this.lat = this.restaurants.lat;
				this.lng = this.restaurants.lng;
				this.citymap = { center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) } };
				this.triangleCoords = [{ lat: parseFloat(this.lat), lng: parseFloat(this.lng) }, { lat: parseFloat(this.lat), lng: parseFloat(this.lng) }];
				this.getAllDeliveryZoneLoad();
			} else {
				document.getElementById('deliveryChoice').style.display = 'block';
				this.deliveryNoUpdate();
			}
		});		
	}
	circleShapeClick(val) {
		this.areatype = val;
		this.BackColor = this.randomColorCode;
		if (val == 'Circle') {
			this.selectCircleEditable();
		}
		if (val == 'Shape') {
			this.selectShapeEditable();
		}
	}
	addAnotherZone() {
		this.addanother = { "display": "block" };
		this.BackColor = this.randomColorCode;
		this.selectCircleEditable();
		this.edit = false;
		this.editableDetail.reset();
	}
	getAllDeliveryZoneLoad() {		
		this.restaurantsService.getAllDeliveryZone(this.restaurants._id).subscribe((data) => {
			this.deliverys = data.message;
			this.drawAreaOnMap();
		});
	}
	makeEmptyAllFields() {	
		this.classMap = 'active';
		this.deliveryAddModel.controls['name'].setValue("");
		this.deliveryAddModel.controls['amount'].setValue("");
		this.deliveryAddModel.controls['deliveryfee'].setValue("");
	}
	deliveryZoneDetailAdd() {
		this.deliveryAddModel.controls['type'].setValue(this.areatype);
		this.deliveryAddModel.controls['restaurantId'].setValue(this.restaurants._id);
		this.deliveryAddModel.controls['color'].setValue(this.randomColorCode);
		if (this.areatype == 'Shape') {
			var len = this.mypolygone.getPath().getLength();
			var htmlStr = "";
			for (var i = 0; i < len; i++) {
				htmlStr += this.mypolygone.getPath().getAt(i).toUrlValue(5) + '@';
			}
			var htmlStrRemoveLast = htmlStr.toString().substring(0, htmlStr.length - 1);
			this.deliveryAddModel.controls['radius'].setValue(htmlStrRemoveLast);
		}
		if (this.areatype == 'Circle') {
			this.deliveryAddModel.controls['radius'].setValue(this.cityCircle.getRadius());
		}
		this.restaurantsService.addDeliveryZone(this.deliveryAddModel.value).subscribe(
			(data) => {
				this.makeEmptyAllFields();
				this.getAllDeliveryZoneLoad();
				this.clearadd();
			});
		toastr.success('Zone Added Successfully','Success!');
	}
	deliveryZoneDetailRemove(id) {
		if (confirm("Are you sure to delete ?")) {
			this.restaurantsService.removeDeliveryZone(id).subscribe(
				(data) => {
					this.getAllDeliveryZoneLoad();
					this.clearadd();
					this.clearEdit();
				}
			);
		}
	}
	deliveryZoneDetailEdit(id) {
		this.restaurantsService.editDeliveryZone(id).subscribe(
			(data) => {
				this.edit = true;
				this.editableDetail.controls['ename'].setValue(data.message.name);
				this.editableDetail.controls['eamount'].setValue(data.message.amount);
				this.editableDetail.controls['edeliveryfee'].setValue(data.message.deliveryfee);
				this.editableDetail.controls['etype'].setValue(data.message.type);
				this.editableDetail.controls['eid'].setValue(data.message._id);
				this.editableDetail.controls['ecolor'].setValue(data.message.color);
				this.etypeClass = data.message.type;
				this.selectCircleEdit(data.message);
				this.addanother = { 'display': 'none' };
				this.deliveryAddModel.reset();
				this.areatype = 'Circle';				
			}
		);
	}
	editDeliveryValueUpdate() {
		if (this.etypeClass == 'Circle') {
			var cir = this.mycircleedit.getRadius();
			this.editableDetail.controls['eradius'].setValue(cir);
		}
		if (this.etypeClass == 'Shape') {
			var poly = this.mypolygoneedit.getPath();
			var len = poly.getLength();
			var htmlStr = "";
			for (var i = 0; i < len; i++) {
				htmlStr += poly.getAt(i).toUrlValue(5) + '@';
			}
			var htmlStrRemoveLast = htmlStr.toString().substring(0, htmlStr.length - 1);
			this.editableDetail.controls['eradius'].setValue(htmlStrRemoveLast);
		}
		var detailObj: any = {};
		detailObj.name = this.editableDetail.value.ename;
		detailObj.amount = this.editableDetail.value.eamount;
		detailObj.deliveryfee = this.editableDetail.value.edeliveryfee;
		detailObj.type = this.editableDetail.value.etype;
		detailObj._id = this.editableDetail.value.eid;
		detailObj.color = this.editableDetail.value.ecolor;
		detailObj.radius = this.editableDetail.value.eradius;		
		this.restaurantsService.editDeliveryZoneUpdate(detailObj).subscribe(
			(data) => {
				this.edit = false;
				this.editableDetail.reset();
				this.getAllDeliveryZoneLoad();
			});
		toastr.success('Delivery Zone Updated','Success!')
	}
	clearEdit() {
		this.edit = false;
		this.editableDetail.reset();
		this.selectCircle();
	}
	clearadd() {
		this.addanother = { "display": "none" };
		this.deliveryAddModel.reset();
		this.areatype = 'Circle';
		this.classMap = 'active';
		this.selectCircle();
	}
	drawAreaOnMap() {
		if (this.deliverys.length != 0) {
			this.selectCircle();
		}
		else {
			this.selectCircle();
		}
	}
}

@Component({
	selector: 'app-kitchenmenulist',
	templateUrl: './kitchenmenulist.component.html',
	styleUrls: ['./kitchenmenulist.component.css']
})
export class KitchenMenuListComponent implements OnInit {

	multisizeAddModel : FormGroup;
	editableDetail : FormGroup;
	groupAddModel : FormGroup;
	multisizeEditAddModel: FormGroup;
	choiceAddModel : FormGroup;
	editableChoiceDetail : FormGroup;
     
    menuImageAddModel : FormGroup; 
    smenuImageAddModel : FormGroup;
    scheduleForm : FormGroup;

	currentOpen : any = '';
	currentChoice : any;
	groups : any;

	restaurants : any;
	order: string = 'name';
	userFilter: any = { name: ''};
	reverse: boolean = false;
	users = [];
	items = [];
	addGroupAddon = [];
	option2 = [];

	mondayCheck : boolean;
	tuesdayCheck : boolean;
	wednesdayCheck : boolean;
	thursdayCheck : boolean;
	fridayCheck : boolean;
	saturdayCheck : boolean;
	sundayCheck : boolean;

	menuObj : any = {};
	item4UpdateObj : any = {};
	itemObj : any = {};
	openinghours : any = {};
	hideMenuOption : any = false;
	showMenuOption : any = false;

	showDivDetail : String;
	showDivItemDetail : String;
	doctshtml : any = '';
	openDays : any = '';
	docts : any = false;
	addgroup : any = {"display" : "none"};;
	edit : any = true;
    df: any;

	groupDetail: any = {};
	btn_class1: any = 'btn-success';
	btn_class2: any = 'btn-default';


	menuAddModel: FormGroup;
	menuUpdateModel: FormGroup;
	itemUpdateModel: FormGroup;
	itemAddModel: FormGroup;
	userForUpdate: any;
	itemGroups : any;
	item : any;
	allAddons : any;
	err: any;

	imageUrl: string = globalVariable.url+'uploads/';
	frontUrl: string = globalVariable.frontUrl;

	spicyLevel: Number = 1;

	spicyArray : any = [1,2,3];

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
	constructor(
		private lf: FormBuilder,
		private restaurantsService : RestaurantsService,
		private kitchenMenuService: KitchenMenuService,
		private kitchenMenuItemService: KitchenItemService,
		private router: Router,
		private alertService: AlertService,
		private route: ActivatedRoute
		){ }

	ngOnInit() {

		this.menuAddModel = this.lf.group({
			name: ['', Validators.required],
			description: [''],
			kitchenId: ['', Validators.required],
			image: [],
		});

		this.menuUpdateModel = this.lf.group({
			_id: ['', Validators.required],
			description: [''],
			name: ['', Validators.required],
			image:[]
		});

		this.itemAddModel = this.lf.group({
			name: ['', Validators.required],
			kitchenId: ['', Validators.required],
			menuId: ['', Validators.required],
			price: ['', Validators.required],
			spicyLevel: ['', Validators.required],
			description: ['', Validators.required],
			options : [],
			image: [],
		});

		this.itemUpdateModel = this.lf.group({
			_id: ['', Validators.required],
			name: ['', Validators.required],
			price: ['', Validators.required],
			spicyLevel: ['', Validators.required],
			description: ['', Validators.required],
			options: [],
			image: []
		});

		this.multisizeAddModel = this.lf.group({
			sid : [],
			sizename: ['', Validators.required],
			sizeprice: ['', Validators.required]			
		});

		this.editableDetail = this.lf.group({
			_id : [],
			name : ['', Validators.required],
			groupType : ['', Validators.required]
		});

		this.groupAddModel = this.lf.group({
			name : ['', Validators.required],
			groupType : ['', Validators.required],
			restaurantId : []						
		});

		this.multisizeEditAddModel = this.lf.group({
			id : ['', Validators.required],
			size : ['', Validators.required],
			price : ['', Validators.required],
			_id : []									
		});

		this.choiceAddModel = this.lf.group({
			_id : [],			
			name : ['', Validators.required],
			price : ['', Validators.required]								
		});

		this.editableChoiceDetail = this.lf.group({
			_id : [],
			id : [],			
			name : ['', Validators.required],
			price : ['', Validators.required]								
		});

		this.menuImageAddModel = this.lf.group({
			_id : [],
			image: []			
		});

		this.smenuImageAddModel = this.lf.group({
			 _id : [],			 
			image: []
		});

		this.scheduleForm = this.lf.group({
			
		});


		this.getRestaurants();		
		this.jq();
		$('#previewModal').css('display','none');
	}
	jq() {
		$(document).ready(function() {
			$(document).on('click', '.colls', function() {
				var cName = $(this).hasClass("collapsed");				   
				if (cName == true) {						
					$(this).children('span').attr("class", "icon-collapse");						
					return false;
				}
				if (cName == false) {
					$(this).children('span').attr("class", "icon-expand");						
					return false;
				}
			});
		});
	}

	private addDropMenu(event1,menu){
		var menuId = menu._id;
		console.log(menuId)

		this.kitchenMenuItemService.updateMenuItem(menu._id,event1._id).subscribe((data) => {
			this.loadAllItem(); 
			toastr.success('Addons Updated successful');
		});
	}

	deleteOption(id,index){
		if (confirm("Are you sure to delete ?")) {
			var removeid = {_id : id, index: index};
			console.log(removeid)
			this.kitchenMenuItemService.removeOption(removeid).subscribe(data => {
				//this.getAllAddonDetail();
				this.loadAllItem();
			});
			toastr.success('Choice Removed');
		}
	}

	saveEditAddon(grID,id,key,value){
		var data = {id: grID, cid : id};
		this.kitchenMenuItemService.getEditChoice(data).subscribe(data => {
			this.editableChoiceDetail.controls['id'].setValue(data.message.subaddon[0]._id);
			this.editableChoiceDetail.controls['_id'].setValue(data.message._id);	  	
			this.editableChoiceDetail.controls['name'].setValue(data.message.subaddon[0].name);
			this.editableChoiceDetail.controls['price'].setValue(data.message.subaddon[0].price);	  	
			this.editableChoiceDetail.controls[key].setValue(value);
			this.kitchenMenuItemService.editSubAddOnUpdate(this.editableChoiceDetail.value).subscribe(data => {	
				this.loadAllAddons(this.editableChoiceDetail.value._id);
				this.clearCancel();
				toastr.success('Choice Updated','Success!');
			})
		});
	}

	private addDropItem(event1,item){
		var itemObj = {};
		itemObj['_id'] = item._id;
		itemObj['options'] = [];
		let addOns = []
		for (var i = 0; i < item.options.length; ++i) {
			addOns.push(item.options[i]._id);
		}
		if (addOns.indexOf(event1._id) == -1) {
			addOns.push(event1._id);
		}
		itemObj['options'] = addOns;
		console.log(itemObj)

		this.kitchenMenuItemService.updateMenu(itemObj).subscribe((data) => {
			this.loadAllItem(); 
			toastr.success('Addons Updated successful');
		});
	}

	spicylevel(num,type){
		this.widthFunction(num);
		if (type == 'add') {
        	this.itemAddModel.controls['spicyLevel'].setValue(num);
		}
		if (type == 'update') {
        	this.itemUpdateModel.controls['spicyLevel'].setValue(num);
		}
    }

    private widthFunction(num){
    	if (num == 0) {
	        this.spicyLevel = 1;
		}
		if (num == 1) {
	        this.spicyLevel = 34;
		}
		if (num == 2) {
	        this.spicyLevel = 67;
		}
		if (num == 3) {
	        this.spicyLevel = 100;
		}
    }
	private showPreview(){
		var gfid = this.restaurants._id;
	    var baseUrl = this.frontUrl;
	    var src = baseUrl + 'frontend/' + gfid;

	    var height = '680px';
	    $("#previewModal iframe").attr({'src':src , 'height':height});
		$('#previewModal iframe').css({'position':'fixed','left': '0','top': '0','width': '100%','padding': '3% 20%','background': 'rgba(0, 0, 0, 0.58)','height':'100%'});
		$('#previewModal').css({'display':'block'});
		$('body').css({'overflow':'hidden'});

		var closeBtn  = $('<a class ="closeBtn" href="javascript:void(0)">Close</a>');
		$('#previewModal').append(closeBtn);
		$('.closeBtn').css({'text-decoration-line:':'unset','padding':'10px','border-radius':'3px','background-color':'rgba(0,0,0,.6)','position':'fixed','right':'13%','top':'40px','color':'#fff','box-shadow':'0 2px 10px rgba(0,0,0,.5)'});
		$('a.closeBtn').on('click', function(e) {
			$('#previewModal').css('display','none');
			$('body').css({'overflow':'auto'});
		});
	}
	private onClicked(event){
	    if (!event.target.checked) {
	    	this.addGroupAddon.splice(this.addGroupAddon.indexOf(event.target.value),1);
	    }
	    if ((event.target.checked) && (this.addGroupAddon.indexOf(event.target.value) == -1)) {
	    	this.addGroupAddon.push(event.target.value);
	    }
	    /*console.log(this.addGroupAddon);*/
	    this.getGroupDetail(this.addGroupAddon);
    }
    private getGroupDetail(data){
    	this.option2 = []
    	/*console.log(data);*/
    	for (var i = 0; i < data.length; i++) {
    		this.kitchenMenuService.groupDetailEditser(data[i]).subscribe(user=>{
    			this.option2.push(user.message);
    		});
    	}
    }
    private checkCheckedGroup(id){
    	if((typeof this.addGroupAddon !='undefined') && (this.addGroupAddon.length > 0)) {
	    	if(this.addGroupAddon.indexOf(id) > -1) {
		    	return true;
		    }else{
		    	return false;
		    }
	    }
	}
	onChange(event) {
	    var files = event.srcElement.files;
	    this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.menuAddModel.controls['image'].setValue(responsePath.filename);
			toastr.success('Image Uploaded Successfully');
		};
	}
	menuModelShow() {
		$("#addMenu").modal('show');
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.menuAddModel.controls['kitchenId'].setValue(users.message._id);
		});
	}
	userAdd() {
		this.kitchenMenuService.addUser(this.menuAddModel.value).subscribe(
			(data) => {
				this.modelClose();
				this.refresh();
				toastr.success('Menu Add successful');
			}
		);
	}
	private menuUpdateModelShow(id) {
		$("#updateMenu").modal('show');
		this.getUsers(id);
	}
	private getUsers(id) {
		this.kitchenMenuService.getOne(id).subscribe(users => {
			this.userForUpdate = users.message;
			this.menuUpdateModel.patchValue(this.userForUpdate);			
		});
	}
	onChangeMenuUpdate(event) {
	    var files = event.target.files;
	    this.menuUpdateModel.controls['image'].setValue(files[0].name);
	}
	userUpdate() {
		if (this.menuUpdateModel.value.image == null || this.menuUpdateModel.value.image == this.userForUpdate.image) {
			this.kitchenMenuService.updateMenu(this.menuUpdateModel.value).subscribe(
				(data) => {
					this.modelClose();
					this.refresh();
					toastr.success('Menu Updated successful');
				}
			);
		}else{
			this.uploader.uploadAll();
			this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
				var responsePath = JSON.parse(response);
				this.menuUpdateModel.controls['image'].setValue(responsePath.filename);
				this.kitchenMenuService.updateMenu(this.menuUpdateModel.value).subscribe(
					(data) => {
						this.modelClose();
						this.refresh();
						toastr.success('Menu Updated successful');
					}
				);
			};
		}
	}
	private itemAddModelShow(id) {
		this.spicyLevel = 1;
		$("#addItem").modal('show');
		this.itemAddModel.controls['menuId'].setValue(id);
		this.itemAddModel.controls['spicyLevel'].setValue(0);
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.itemAddModel.controls['kitchenId'].setValue(users.message._id);
		});
		this.getAllGroups();
	}
    private getAllGroups(){
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(data => {		
			this.kitchenMenuService.getAllAddOn(data.message._id).subscribe(users => {
				this.itemGroups = users.message;
				console.log("this.itemGroups");
				console.log(this.itemGroups);
			});
		});
	}
	onChangeItem(event) {
	    var files = event.srcElement.files;
	    this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.itemAddModel.controls['image'].setValue(responsePath.filename);
			toastr.success('Image Uploaded Successfully');
		};
	}
	itemAdd() {
		this.itemAddModel.controls['options'].setValue(this.addGroupAddon) ;
		this.kitchenMenuItemService.addUser(this.itemAddModel.value).subscribe(
			(data) => {
				this.modelClose();
				//this.refresh();
				this.loadAllItem();
				toastr.success('Item Add successful');
				this.addGroupAddon = [];
			}
		);
	}
	itemUpdateModelShow(item) {

		this.item4UpdateObj = item;

		this.widthFunction(item.spicyLevel)
		$("#updateItem").modal('show');
		this.getAllGroups();
		this.itemUpdateModel.patchValue(item);

		console.log("this.itemUpdateModel.value");
		console.log(this.itemUpdateModel.value);
		for (var i = 0; i < item.options.length; ++i) {
			this.addGroupAddon.push(item.options[i]._id);
		}
	}
	onChangeItemUpdate(event) {
	    var files = event.target.files;
	    this.itemUpdateModel.controls['image'].setValue(files[0].name);
	}
	itemUpdate() {
		if (this.option2.length > 0) {
			this.itemUpdateModel.controls['options'].setValue(this.option2);
		}
		if (this.itemUpdateModel.value.image == null || this.itemUpdateModel.value.image == this.item4UpdateObj.image) {
			this.kitchenMenuItemService.updateMenu(this.itemUpdateModel.value).subscribe((data) => {
				this.modelClose();
				//this.refresh();
				this.loadAllItem(); 
				toastr.success('Item Updated successful');
				this.addGroupAddon = [];
				this.option2 = [];
			});
		}else{
			this.uploader.uploadAll();
			this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
				this.modelClose();
				this.refresh();
				var responsePath = JSON.parse(response);
				this.itemUpdateModel.controls['image'].setValue(responsePath.filename);
				this.kitchenMenuItemService.updateMenu(this.itemUpdateModel.value).subscribe((data) => {
					toastr.success('Item Updated successful');
					this.addGroupAddon = [];
					this.option2 = [];
				});
			};
		}
	}
	optionalUpdate() {
		this.groupDetail = {};
		if (this.btn_class1 != 'btn-success') {
			this.btn_class2 = 'btn-default';
			this.btn_class1 = 'btn-success';
		}
		this.groupDetail.gType = 'optional';

		this.groupAddModel.controls['groupType'].setValue(this.groupDetail);
		document.getElementById('mandatoryFields').style.display = 'none';
	}
	optionalUpdateEdit() {
		this.groupDetail = {};
		if (this.btn_class1 != 'btn-success') {
			this.btn_class2 = 'btn-default';
			this.btn_class1 = 'btn-success';
		}
		this.groupDetail.gType = 'optional';

		this.editableDetail.controls['groupType'].setValue(this.groupDetail);
		document.getElementById('mandatoryFields').style.display = 'none';
	}
	mandatoryUpdate() {
		this.groupDetail = {};
		if (this.btn_class2 != 'btn-success') {
			this.btn_class1 = 'btn-default';
			this.btn_class2 = 'btn-success';
		}
		this.groupDetail.gType = 'mandatory';
		//this.groupAddModel.controls['groupType'].setValue(null);
		
		if (typeof this.groupDetail.min != 'undefined' && typeof this.groupDetail.max != 'undefined' && this.groupDetail.min != "" && this.groupDetail.max != "") {
			this.groupAddModel.controls['groupType'].setValue(this.groupDetail);
		}else{
			this.groupAddModel.controls['groupType'].setValue(null);
		}

		document.getElementById('mandatoryFields').style.display = 'block';
	}
	mandatoryUpdateEdit() {
		this.groupDetail = {};
		if (this.btn_class2 != 'btn-success') {
			this.btn_class1 = 'btn-default';
			this.btn_class2 = 'btn-success';
		}
		this.groupDetail.gType = 'mandatory';
		//this.groupAddModel.controls['groupType'].setValue(null);
		
		if (typeof this.groupDetail.min != 'undefined' && typeof this.groupDetail.max != 'undefined' && this.groupDetail.min != "" && this.groupDetail.max != "") {
			this.editableDetail.controls['groupType'].setValue(this.groupDetail);
		}else{
			this.editableDetail.controls['groupType'].setValue(null);
		}

		document.getElementById('mandatoryFields').style.display = 'block';
	}
	mandMinMaxValue(event,type){
		if (type == 'min') {
			this.groupDetail.min = event.target.value;
		}

		if (type == 'max') {
			this.groupDetail.max = event.target.value;
		}

		if (typeof this.groupDetail.min != 'undefined' && typeof this.groupDetail.max != 'undefined' && this.groupDetail.min != "" && this.groupDetail.max != "" && this.groupDetail.min > 0 && this.groupDetail.max > 0) {
			this.groupAddModel.controls['groupType'].setValue(this.groupDetail);
		}else{
			this.groupAddModel.controls['groupType'].setValue(null);
		}
	}
	mandEditMinMaxValue(event,type){
		if (type == 'min') {
			this.groupDetail.min = event.target.value;
		}

		if (type == 'max') {
			this.groupDetail.max = event.target.value;
		}

		if (typeof this.groupDetail.min != 'undefined' && typeof this.groupDetail.max != 'undefined' && this.groupDetail.min != "" && this.groupDetail.max != "" && this.groupDetail.min > 0 && this.groupDetail.max > 0) {
			this.editableDetail.controls['groupType'].setValue(this.groupDetail);
		}else{
			this.editableDetail.controls['groupType'].setValue(null);
		}
	}
	private modelClose(){
		$("#myeditModal").modal('hide');
		$("#addMenu").modal('hide');
		$("#updateMenu").modal('hide');
		$("#addItem").modal('hide');
		$("#updateItem").modal('hide');
		$("#myModal").modal('hide');
		$('#mymenuModal').modal('hide');
		$('#mySubMenuModal').modal('hide');
        this.df = '';
        $('#mymenuModal').on('hidden.bs.modal', function () {
               $(this).find('form').trigger('reset');
           });
        $('#mySubMenuModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
           });
        $('#addMenu').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
           });
		$('#updateMenu').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
           });
		$('#addItem').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
           });
		$('#updateItem').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
           });
	}
	private refresh(){
		this.loadAllUsers();
		this.loadAllItem(); 
		this.getAllAddonDetail();
	}
	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;	
			this.refresh();	
			////console.log(this.restaurants);	
		});
	}
	addAnothergroup(){
		this.currentOpen = 'group';
		this.addgroup = {"display" : "block"};
		this.groupDetail.gType = 'optional';
		this.btn_class2 = 'btn-default';
		this.btn_class1 = 'btn-success';

		this.groupAddModel.controls['groupType'].setValue(this.groupDetail);
	}
	private clearadd(){
		this.addgroup = {"display" : "none"}; 
	}
	private groupDetailAdd(){
		this.groupAddModel.controls['restaurantId'].setValue(this.restaurants._id);
		this.kitchenMenuService.adddetailAddOn(this.groupAddModel.value).subscribe(addons => {     
			this.getAllAddonDetail();
			this.clearCancel();  
		});
	}
	private groupDetailRemove(id){
		if (confirm("Are you sure to delete ?")) {
			this.kitchenMenuService.groupRemove(id).subscribe(data => {         	
				this.getAllAddonDetail(); 
			});
		}
	}
	private groupDetailEdit(id){
		this.currentOpen = 'editgroup_' + id;
		this.kitchenMenuService.groupDetailEditser(id).subscribe(data => {   
			this.editableDetail.patchValue(data.message);
			
			this.groupDetail = data.message.groupType;
			if (data.message.groupType.gType == 'mandatory') {
				this.btn_class1 = 'btn-default';
				this.btn_class2 = 'btn-success';

				document.getElementById('mandatoryFields').style.display = 'block';
			}else{
				this.btn_class2 = 'btn-default';
				this.btn_class1 = 'btn-success';

				document.getElementById('mandatoryFields').style.display = 'none';
			}
		});
	}
	private groupDetailEditUpdate(){
		this.kitchenMenuService.groupEditUpdate(this.editableDetail.value).subscribe(data => {
			this.getAllAddonDetail();
			this.clearCancel();
			toastr.success('Group Updated Successfully','Success!');
		});
	}
	private getAllAddonDetail(){
		this.kitchenMenuService.getAllAddOn(this.restaurants._id).subscribe(data => { 
			this.groups = data.message;
			console.log("this.groups");
			console.log(this.groups);
		})
	}
	private loadAllUsers() {
		this.kitchenMenuService.getAll(this.restaurants._id).subscribe(users => { 			
			this.users = users.message;
		});
	}
	private loadAllItem() {
		this.kitchenMenuItemService.getAll().subscribe(users => { 
			this.items = users.message;
			console.log("this.items");
			console.log(this.items);
		});
	}
	private deleteUser(id) {
		if (confirm("Are you sure to delete ?")) {
			this.kitchenMenuService.deleteOne(id).subscribe(data => {				
				this.loadAllUsers();
				this.loadAllItem();
				toastr.warning('Menu Deleted');
			});
		}
	}
	private deleteItem(id) {
		if (confirm("Are you sure to delete ?")) {
			this.kitchenMenuItemService.deleteOne(id).subscribe(data => {
				//this.loadAllUsers();
				this.loadAllItem();
				toastr.warning('Item Deleted');
			});
		}
	}
	private sortBy(data) {
		this.order = data;
		if (this.reverse == false) {
			this.reverse = true;
		} else {
			this.reverse = false;
		}
	}
	private addMultisizeAddOn(id){
		this.multisizeAddModel.controls['sid'].setValue(id);	
	}
	multisizeAddUpdate(){
		var allvalue :any = {}; 
		allvalue._id = this.multisizeAddModel.value.sid;	
		allvalue.multisize = {size: this.multisizeAddModel.value.sizename, price: this.multisizeAddModel.value.sizeprice};	 		
		this.kitchenMenuItemService.updateMenuAddOn(allvalue).subscribe(data =>{		
			this.multisizeAddModel.reset();
			this.loadAllItem();
			//this.refresh();
			this.modelClose();
			toastr.success('Multisize Added');
		});
	}
	private removeSubmenuAddOn(index, submenuid){
		if (confirm("Are you sure to delete ?")) {
			var removedata = {_id: submenuid, indexi: index}; 
			this.kitchenMenuItemService.removeAddOnToSubmenu(removedata).subscribe(data => {      
				//this.refresh();
				this.loadAllItem();
			});
		toastr.success('Removed!');
		}
	}
	private editSubmenuAddOn(id, submenuid){  	 
		var value = {submenuid: submenuid, id : id};
		this.kitchenMenuItemService.editAddOnToSubmenu(value).subscribe(data => {
			this.multisizeEditAddModel.controls['id'].setValue(data.message.multisize[0]._id);
			this.multisizeEditAddModel.controls['_id'].setValue(data.message._id);	  	
			this.multisizeEditAddModel.controls['size'].setValue(data.message.multisize[0].size);
			this.multisizeEditAddModel.controls['price'].setValue(data.message.multisize[0].price);       
		});
	}
	multisizeEditAddUpdate(){
		this.kitchenMenuItemService.updateEditMenuAddOn(this.multisizeEditAddModel.value).subscribe(data => {
			//this.refresh();
			this.loadAllItem();
			this.modelClose(); 
			toastr.success('Multisize Updated');

		});           
	}
	private addChoic(id, name){
		var groupId = "gr"+id;
		//console.log("groupId on click");
		//console.log(groupId);
		this.currentOpen = 'choice';
		this.currentChoice = name;
		this.choiceAddModel.controls['_id'].setValue(id);
	}
	private choiceDetailadd(){
		var groupId = "gr"+this.choiceAddModel.value._id;
		this.kitchenMenuItemService.addChoice(this.choiceAddModel.value).subscribe(data => {   
			//this.getAllAddonDetail();
			this.loadAllAddons(this.choiceAddModel.value._id);
			this.clearCancel();
			toastr.success('Choice Added Successfully','Success!');
		}); 
	}
	private showHideAddons(id, property){
		var addonGroupId = "#gr"+id;
		var x = property.getAttribute('class');
		if (x == 'icon-collapse') {
			this.loadAllAddons(id);
			$("div[id^='gr']").hide();
			$(addonGroupId).show();
		}else{
			$("div[id^='gr']").hide();
		}
	}
	private loadAllAddons(id){
		this.kitchenMenuService.groupDetailEditser(id).subscribe(data => {   
			this.allAddons = data.message.subaddon;
			//console.log("id, this.allAddons")
			//console.log(id, this.allAddons)
		})
	}
	private removechoice(id, index){
		if (confirm("Are you sure to delete ?")) {
			var removeid = {_id : id, index: index};
			this.kitchenMenuItemService.removeChoice(removeid).subscribe(data => {
				//this.getAllAddonDetail();
				this.loadAllAddons(index);
			});
			toastr.success('Choice Removed');
		}
	}
	private editchoice(id, cid){
		var data = {id: id, cid : cid};
		this.kitchenMenuItemService.getEditChoice(data).subscribe(data => {
			this.editableChoiceDetail.controls['id'].setValue(data.message.subaddon[0]._id);
			this.editableChoiceDetail.controls['_id'].setValue(data.message._id);	  	
			this.editableChoiceDetail.controls['name'].setValue(data.message.subaddon[0].name);
			this.editableChoiceDetail.controls['price'].setValue(data.message.subaddon[0].price);
			this.currentOpen = 'editchoice';
		});
	}
	private editChoiceUpdate(){
		let id = 'gr'+this.editableChoiceDetail.value._id;
		//console.log(this.editableChoiceDetail.value);
		this.kitchenMenuItemService.editSubAddOnUpdate(this.editableChoiceDetail.value).subscribe(data => {	
			this.loadAllAddons(this.editableChoiceDetail.value._id);
			this.clearCancel();
			toastr.success('Choice Updated','Success!');
		})
	}
	private clearCancel(){
		this.currentOpen = '';
		this.editableDetail.reset();
		this.choiceAddModel.reset();
		this.groupAddModel.reset();
		this.editableChoiceDetail.reset();
		this.currentChoice = '';
	}
	private menuImage(img,type){
		if (img != null && img != "") {
            var imgPath = this.imageUrl + img;
        }
        if (img == null) {
        	if (type == 'menu') {
            	var imgPath = "assets/images/menu.jpg";
        	}else{
        		var imgPath = "assets/images/itemimage.gif";
        	}
        }
        return imgPath;
	}
	private passId(id){
      this.menuImageAddModel.controls["_id"].setValue(id);
	}
    private passub(id){
     this.smenuImageAddModel.controls["_id"].setValue(id);     
    }
	updateMenuImage(){
      this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.menuImageAddModel.controls['image'].setValue(responsePath.filename);
            this.kitchenMenuService.updateMenu(this.menuImageAddModel.value).subscribe(data => {
                //// console.log(data.message);
                this.menuImageAddModel.reset();
                this.refresh();
			    this.modelClose();
			    toastr.success('Image Uploaded Successfully');

            });
		}
    }
    updateSubMenuImage(){
      this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.smenuImageAddModel.controls['image'].setValue(responsePath.filename);
            this.kitchenMenuItemService.updateMenu(this.smenuImageAddModel.value).subscribe(data => {                
                 this.smenuImageAddModel.reset();
                 this.refresh();
			     this.modelClose();
			     toastr.success('Image Uploaded Successfully');	
            });
	   }
	}
   	private showDayOption(user,type){
   		this.mondayCheck = false;
		this.tuesdayCheck = false;
		this.wednesdayCheck = false;
		this.thursdayCheck = false;
		this.fridayCheck = false;
		this.saturdayCheck = false;
		this.sundayCheck = false;
   		/*this.mondayCheck,this.tuesdayCheck,this.wednesdayCheck,this.thursdayCheck, this.fridayCheck, this.saturdayCheck, this.sundayCheck = false;*/
   		if (type == 'menu') {
   			this.showDivDetail = user._id;

   		}else{
   			this.showDivItemDetail = user._id;
   		}
   		if (user.isSpecific) {
   			this.showMenu(user._id)
   		}
   		if (user.isHidden) {
   			this.hideMenu(user._id)
   		}
   		this.menuObj._id = user._id;
   		if (user.openinghours) {
   			for (var i in user.openinghours) {
				if (user.openinghours[i] == true) {
					if (i == 'monday') {
						this.mondayCheck = true;
					}
					if (i == 'tuesday') {
						this.tuesdayCheck = true;
					}
					if (i == 'wednesday') {
						this.wednesdayCheck = true;
					}
					if (i == 'thursday') {
						this.thursdayCheck = true;
					}
					if (i == 'friday') {
						this.fridayCheck = true;
					}
					if (i == 'saturday') {
						this.saturdayCheck = true;
					}
					if (i == 'sunday') {
						this.sundayCheck = true;
					}
				}
			}
   		}
   	}
   	private checkChecked(allDay,day){
   		if (allDay) {
	   		if (allDay.monday && day == 'Monday') {
	   			return true;
	   		}
	   		if (allDay.tuesday && day == 'Tuesday') {
	   			return true;
	   		}
	   		if (allDay.wednesday && day == 'Wednesday') {
	   			return true;
	   		}
	   		if (allDay.thursday && day == 'Thursday') {
	   			return true;
	   		}
	   		if (allDay.friday && day == 'Friday') {
	   			return true;
	   		}
	   		if (allDay.saturday && day == 'Saturday') {
	   			return true;
	   		}
	   		if (allDay.sunday && day == 'Sunday') {
	   			return true;
	   		}
   		}
   	}
   	private radioChecked(id,data){
   		if (data == 'specific') {
   			if(id) {
   				return id;
   			}else{
   				return id;
   			}
   		}
   		if (data == 'hidden') {
   			if(id) {
   				return id;
   			}else{
   				return id;
   			}
   		}
   	}
   	private showDiv(id,type) {
   		if (type == 'menu') {
	        if (this.showDivDetail == id) {
	            return 'block';
	        }
   		}else{
	        if (this.showDivItemDetail == id) {
	            return 'block';
	        }
   		}
    }
   	private showDay(id,type) {
   		if (type == 'menu') {
	        if (this.showDivDetail == id) {
	            return 'block';
	        }
   		}else{
	        if (this.showDivItemDetail == id) {
	            return 'block';
	        }
   		}
    }
    private hideDiv(type) {
    	if (type == 'menu') {
    		this.showDivDetail = '';
    	}else{
    		this.showDivItemDetail = '';
    	}
    }
	private hideMenu(id){
   		var divId = 'days'+id;
   		document.getElementById(divId).style.display = 'none';
   		this.hideMenuOption = true;
		this.showMenuOption = false;
   	}
   	private showMenu(id){
   		var divId = 'days'+id;
   		document.getElementById(divId).style.display = 'block';
   		this.hideMenuOption = false;
   		this.showMenuOption = true;
   	}
   	private checkMon(){
   		this.mondayCheck = !this.mondayCheck;
   		this.save();
   	}
   	private checkTue(){
   		this.tuesdayCheck = !this.tuesdayCheck;
   		this.save();
   	}
   	private checkWed(){
   		this.wednesdayCheck = !this.wednesdayCheck;
   		this.save();
   	}
   	private checkThu(){
   		this.thursdayCheck = !this.thursdayCheck;
   		this.save();
   	}
   	private checkFri(){
   		this.fridayCheck = !this.fridayCheck;
   		this.save();
   	}
   	private checkSat(){
   		this.saturdayCheck = !this.saturdayCheck;
   		this.save();
   	}
   	private checkSun(){
   		this.sundayCheck = !this.sundayCheck;
   		this.save();
   	}
   	private save(){
   		if (this.mondayCheck==true){
   			this.openinghours.monday = true;
   		}
		if (this.mondayCheck==false){
			delete this.openinghours.monday;
   		}
   		if (this.tuesdayCheck==true) {
   			this.openinghours.tuesday = true;
   		}
   		if (this.tuesdayCheck==false) {
   			delete this.openinghours.tuesday;
   		}
   		if (this.wednesdayCheck==true){
   			this.openinghours.wednesday = true;
   		}
   		if (this.wednesdayCheck==false){
   			delete this.openinghours.wednesday;
   		}
   		if (this.thursdayCheck==true) {
   			this.openinghours.thursday = true;
   		}
   		if (this.thursdayCheck==false) {
   			delete this.openinghours.thursday;
   		}
   		if (this.fridayCheck==true){
   			this.openinghours.friday = true;
   		}
   		if (this.fridayCheck==false){
   			delete this.openinghours.friday;
   		}
   		if (this.saturdayCheck==true) {
   			this.openinghours.saturday = true;
   		}
   		if (this.saturdayCheck==false) {
   			delete this.openinghours.saturday;
   		}
   		if (this.sundayCheck==true){
   			this.openinghours.sunday = true;
   		}
   		if (this.sundayCheck==false){
   			delete this.openinghours.sunday;
   		}
  		//console.log("this.openinghours sdfghjk");
   		//console.log(this.openinghours);
   	}
   	private saveOpeningTimings(type){
   		if (this.hideMenuOption == true) {
   			this.menuObj.isHidden = true;
   			this.menuObj.isSpecific = false;
   			this.mondayCheck = false; 
   			this.tuesdayCheck = false;
   			this.wednesdayCheck = false;
   			this.thursdayCheck = false;
   			this.fridayCheck = false;
   			this.saturdayCheck = false;
   			this.sundayCheck = false;
   			this.openinghours = {};
   			this.menuObj.openinghours = {};
   			this.save();
   		}
   		if (this.hideMenuOption == false){
   		var opentime=((<HTMLInputElement>document.getElementById("opentime_"+this.menuObj._id)).value);
   		var closetime=((<HTMLInputElement>document.getElementById("closetime_"+this.menuObj._id)).value);
   		this.openinghours.opentime = opentime;
   		this.openinghours.closetime = closetime;
   			this.menuObj.isHidden = false;
   			this.menuObj.isSpecific = true;
   			this.menuObj.openinghours = this.openinghours;
   			this.save();
   		}
   		if (type == 'menu'){
   			this.kitchenMenuService.updateMenu(this.menuObj).subscribe(
				(data) => {
					toastr.success('Menu Updated successful');
					this.loadAllUsers();
				}
			);
   		}
   		if (type == 'item'){
   			this.kitchenMenuItemService.updateMenu(this.menuObj).subscribe(
   				(data) => {
   					toastr.success('Item Updated successful');
					this.loadAllItem();
				}
			);
   		}
		// console.log("this.menuObj");
		// console.log(this.menuObj);
		this.hideDiv(type);
   	}
   	private deleteHiddenSpecific(user, type){

   		user.isSpecific = false;
   		user.isHidden = false;
   		user.openinghours = {};
   		if (type == 'menu') {
	   		this.kitchenMenuService.updateMenu(user).subscribe((data)=>{
	   			toastr.success('Menu is no more Hidden or Specific');
	   		});
   		}
   		if (type == 'item') {
	   		this.kitchenMenuItemService.updateMenu(user).subscribe((data)=>{
	   			toastr.success('Item is no more Hidden or Specific');
	   		});
   		}
   	}
   	private deleteMenuImage(user,type){
   		if (user.image != null) {
   			if (confirm("Delete Image?")) {
	   			delete user.image;
	   			user.image = null;
		   		if (type == 'menu') {
		   			this.kitchenMenuService.updateMenu(user).subscribe(data => {
		                console.log(data);
		                if (!data.error) {
						    toastr.success('Image Deleted Successfully');
		                }else{
						    toastr.error('Unable to Delete Image');
		                }
		            });
		   		}
		   		if (type == 'item') {
		   			this.kitchenMenuItemService.updateMenu(user).subscribe((data) => {
		   				console.log(data);
						toastr.success('Image Deleted successful');
					});
		   		}
		   	}
   		}
   	}
}

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styles: []
})
export class LegacyComponent implements OnInit {
	currentOwner: any = {};
	restaurants: any = {};
  	constructor(private restaurantsService: RestaurantsService) { 
  		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
  	}

  	ngOnInit() {
  		this.getRestaurants();
  	}

  	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			//console.log(this.restaurants);
		});
	}
}

@Component({
  selector: 'app-legacycode',
  templateUrl: './legacycode.component.html',
  styleUrls: ['./legacycode.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegacycodeComponent implements OnInit {
	currentOwner: any = {};
	restaurants: any = {};
	showDom: any = {};
	resId: String;
	url:any = globalVariable;
  	constructor(private restaurantsService: RestaurantsService, private activatedRoute: ActivatedRoute) { 
  		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
  	}

  	ngOnInit() {
  		this.activatedRoute.params.subscribe((params: Params) => {
			this.resId = params['id'];
		});
		this.getRestaurants();
		this.showDom.default = true;
  	}

  	showChildDom(type){
  		this.showDom.wordpress = false;
  		this.showDom.weebly = false;
  		this.showDom.wix = false;
  		this.showDom.squarespace = false;
  		this.showDom.drupal = false;
  		this.showDom.joomla = false;
  		this.showDom.jimdo = false;
  		this.showDom.default = false;
  		
  		this.showDom[type] = true;
  	}

  	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			//console.log(this.restaurants);
		});
	}
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: []
})
export class NotificationComponent implements OnInit {
	restaurants: any = {};
	user = [];
	notification = [];
	
	notificationObj: any = { "rozConfirm": false, "pickupConfirm": false, "rozConfirmText": false, "orderReject": false, "orderError": false, "orderUnfinished": false, "lowBettery": false, "badConnection": false };

	rozConfirmi: any;
	notiIndex:Number;
	pickupConfirmi: any;
	rozConfirmTexti: any;
	orderRejecti: any;
	orderErrori: any;
	orderUnfinishedi: any;
	lowBetteryi: any;
	badConnectioni: any;
	restaurantAddModel: FormGroup;
	public edited = false;


	forgreen: any = { "background-color": "green", "color": "white" };
	forred: any = { "background-color": "red", "color": "white" };
	forwhite: any = { "background-color": "white", "color": "black" };

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }

	ngOnInit() {
		this.getRestaurants();
		this.restaurantAddModel = this.lf.group({
			email: ['', Validators.required],
		});
		this.intialoption();
	}

	intialoption() {
		if (this.notificationObj.rozConfirm) { this.rozConfirmi = true; } else { this.rozConfirmi = false; }
		if (this.notificationObj.pickupConfirm) { this.pickupConfirmi = true; } else { this.pickupConfirmi = false; }
		if (this.notificationObj.rozConfirmText) { this.rozConfirmTexti = true; } else { this.rozConfirmTexti = false; }
		if (this.notificationObj.orderReject) { this.orderRejecti = true; } else { this.orderRejecti = false; }
		if (this.notificationObj.orderError) { this.orderErrori = true; } else { this.orderErrori = false; }
		if (this.notificationObj.orderUnfinished) { this.orderUnfinishedi = true; } else { this.orderUnfinishedi = false; }
		if (this.notificationObj.lowBettery) { this.lowBetteryi = true; } else { this.lowBetteryi = false; }
		if (this.notificationObj.badConnection) { this.badConnectioni = true; } else { this.badConnectioni = false; }
	}

	intialoption2(fors, selectoption) {
		if (fors == 'rozConfirm' && selectoption == true) {
			this.rozConfirmi = true;
		}

		if (fors == 'rozConfirm' && selectoption == false) {
			this.rozConfirmi = false;
		}

		if (fors == 'pickupConfirm' && selectoption == true) {
			this.pickupConfirmi = true;
		}

		if (fors == 'pickupConfirm' && selectoption == false) {
			this.pickupConfirmi = false;
		}

		if (fors == 'rozConfirmText' && selectoption == true) {
			this.rozConfirmTexti = true;
		}

		if (fors == 'rozConfirmText' && selectoption == false) {
			this.rozConfirmTexti = false;
		}
		if (fors == 'orderReject' && selectoption == true) {
			this.orderRejecti = true;
		}

		if (fors == 'orderReject' && selectoption == false) {
			this.orderRejecti = false;
		}

		if (fors == 'orderError' && selectoption == true) {
			this.orderErrori = true;
		}

		if (fors == 'orderError' && selectoption == false) {
			this.orderErrori = false;
		}

		if (fors == 'orderUnfinished' && selectoption == true) {
			this.orderUnfinishedi = true;
		}

		if (fors == 'orderUnfinished' && selectoption == false) {
			this.orderUnfinishedi = false;
		}

		if (fors == 'lowBettery' && selectoption == true) {
			this.lowBetteryi = true;
		}

		if (fors == 'lowBettery' && selectoption == false) {
			this.lowBetteryi = false;
		}

		if (fors == 'badConnection' && selectoption == true) {
			this.badConnectioni = true;
		}

		if (fors == 'badConnection' && selectoption == false) {
			this.badConnectioni = false;
		}
	}

	getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			//console.log(this.restaurants);
		});
	}

	notificationUpdate() {
		var objForUpdate: any = {};
		objForUpdate._id = this.restaurants._id;
		objForUpdate.notification = {}
		objForUpdate.notification.rozConfirm = this.rozConfirmi;
		objForUpdate.notification.pickupConfirm = this.pickupConfirmi;
		objForUpdate.notification.rozConfirmText = this.rozConfirmTexti;
		objForUpdate.notification.orderReject = this.orderRejecti;
		objForUpdate.notification.orderError = this.orderErrori;
		objForUpdate.notification.orderUnfinished = this.orderUnfinishedi;
		objForUpdate.notification.lowBettery = this.lowBetteryi;
		objForUpdate.notification.badConnection = this.badConnectioni;
		objForUpdate.notification.email = this.restaurantAddModel.controls['email'].value;

		//console.log(objForUpdate);
		this.restaurantsService.updateNotification(objForUpdate).subscribe(
			(data) => {
				//console.log(data);
				//this.user = data.message;
				toastr.success('Notification Settings Updated');
				this.router.navigate(['/owner/supported-languages']);
			});
	}

	remove(id, index){
		if (confirm("Are you sure to delete ?")) {
		    this.restaurantsService.deleteNotification(id,index).subscribe(users => {
				if (!users.error) {
					this.getRestaurants();
					toastr.success('Removed Successfully');
				}
			});
		}
	}

	get(notiFyObj,index){
		this.edited = true;
		this.restaurantAddModel.controls['email'].setValue(notiFyObj.email);
		this.rozConfirmi = notiFyObj.rozConfirm;
		this.pickupConfirmi = notiFyObj.pickupConfirm;
		this.rozConfirmTexti = notiFyObj.rozConfirmText;
		this.orderRejecti = notiFyObj.orderReject;
		this.orderErrori = notiFyObj.orderError;
		this.orderUnfinishedi = notiFyObj.orderUnfinished;
		this.lowBetteryi = notiFyObj.lowBettery;
		this.badConnectioni = notiFyObj.badConnection;
		this.notiIndex = index;
	}

	edit(){
		var objForUpdateNew: any = {};
		objForUpdateNew._id = this.restaurants._id;
		objForUpdateNew.notification = {}
		objForUpdateNew.notification.rozConfirm = this.rozConfirmi;
		objForUpdateNew.notification.pickupConfirm = this.pickupConfirmi;
		objForUpdateNew.notification.rozConfirmText = this.rozConfirmTexti;
		objForUpdateNew.notification.orderReject = this.orderRejecti;
		objForUpdateNew.notification.orderError = this.orderErrori;
		objForUpdateNew.notification.orderUnfinished = this.orderUnfinishedi;
		objForUpdateNew.notification.lowBettery = this.lowBetteryi;
		objForUpdateNew.notification.badConnection = this.badConnectioni;
		objForUpdateNew.notification.email = this.restaurantAddModel.controls['email'].value;

	    this.restaurantsService.editNotification(this.notiIndex,objForUpdateNew).subscribe(users => {
			if (!users.error) {
				this.getRestaurants();
			}
		});
	}
}

@Component({
  selector: 'app-supported-languages',
  templateUrl: './supportedLanguages.component.html',
  styles: []
})
export class SupportedLanguagesComponent implements OnInit {
    users= [];
    restaurants:any={};
    cusObj:any={};
    restaurantAddLanguage: FormGroup;
    addLng = [];
  	constructor(
  		private masterService: MasterService,
  		private restaurantsService: RestaurantsService,
  		private router: Router,
  		private alertService: AlertService,
  		private lf: FormBuilder
  		) { }

  	ngOnInit() {
		this.getRestaurants();
		this.loadAllLanguage();
		this.restaurantAddLanguage = this.lf.group({
			lanId: ['', Validators.required],
		});
	}

    private loadAllLanguage() {
        this.masterService.getAllLanguage().subscribe(users => { this.users = users.message; });
    }

    private onClicked(option, event){
	    if (!event.target.checked) {
	    	this.addLng.splice(this.addLng.indexOf(event.target.value),1);
	    }
	    if ((event.target.checked) && (this.addLng.indexOf(event.target.value) == -1)) {
	    	this.addLng.push(event.target.value);
	    }
    }

    languageUpdate(){    	
    	this.cusObj._id = this.restaurants._id;
    	this.cusObj.languages = this.addLng;
    	this.restaurantsService.updateRestaurant(this.cusObj).subscribe(users => {
			//console.log(users);
			toastr.success('Language Settings Updated');
		});
    }

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.addLng = this.restaurants.languages;
			//console.log(this.restaurants);
		});
	}

    private checkChecked(id){
    	if((typeof this.restaurants.languages !='undefined') && (this.restaurants.languages.length > 0)) {
	    	if(this.restaurants.languages.indexOf(id) > -1) {
		    	return true;
		    }else{
		    	return false;
		    }
	    }
	}
}

@Component({
  selector: 'app-online-payment',
  templateUrl: './onlinePayment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class OnlinePaymentComponent implements OnInit {
    restaurants:any={};
    paymentConfirmModel : FormGroup;
    billingDetailModel : FormGroup;
    cardDetailModel : FormGroup;
    providerModel : FormGroup;

    btn_class1: any = 'btn-default';
	btn_class2: any = 'btn-danger';
	months:any = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    years:any=[];
	show:boolean = false;
	firstSection:boolean = false;
	secondSection:boolean = false;
	thirdSection:boolean = false;
	forthSection:boolean = false;
	fifthSection:boolean = false;
	sixthSection:boolean = false;


  	constructor(
  		private masterService: MasterService,
  		private restaurantsService: RestaurantsService,
  		private router: Router,
  		private alertService: AlertService,
  		private lf: FormBuilder
  		) { }

  	ngOnInit() {
  		this.paymentConfirmModel = this.lf.group({
			paymentCard: ['', Validators.required],
			_id: []
		});
		
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


		this.cardDetailModel.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // reset validation messages now
        this.yearAdd();

		document.getElementById('showCards').style.display = 'none';		
		$("[id$='Section']").css("display","none"); 
	    document.getElementById('firstSection').style.display = 'block';

		this.paymentConfirmModel.controls['paymentCard'].setValue(false);
		this.getRestaurants();
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.wantEdit(this.restaurants);
			console.log(this.restaurants);
		});
	}
	private wantEdit(obj){
		if (obj.onlinepayment) {
			this.billingDetailModel.patchValue(obj.billingaddress);			
			this.providerModel.patchValue(obj.paymentcredential);			
			document.getElementById('firstSection').style.display = 'none';
			document.getElementById('sixthSection').style.display = 'block';
		}
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

	onlineYesUpdate() {
		this.paymentConfirmModel.controls['paymentCard'].setValue(true);
		if (this.btn_class1 != 'btn-success') {
			this.btn_class2 = 'btn-default';
			this.btn_class1 = 'btn-success';
			document.getElementById('showCards').style.display = 'block';
		}
		
	}

	onlineNoUpdate() {
		this.paymentConfirmModel.controls['paymentCard'].setValue(false);
		if (this.btn_class2 != 'btn-danger') {
			this.btn_class1 = 'btn-default';
			this.btn_class2 = 'btn-danger';
			document.getElementById('showCards').style.display = 'none';
		}	
	}

	goFurther(id){
		$("[id$='Section']").css("display","none"); 
	    document.getElementById(id).style.display = 'block';
	}

	acceptOnlinePayment(){
		if (this.btn_class1 == 'btn-success') {
			document.getElementById('firstSection').style.display = 'none';
			document.getElementById('secondSection').style.display = 'block';
		}
		if (this.btn_class2 == 'btn-danger') {
			let obj = {};
			obj['onlinepayment'] = false;
			obj['_id'] = this.restaurants._id;
			this.restaurantsService.updateRestaurant(obj).subscribe(users => {
	    		toastr.success('Payment option has been saved successfully');
				this.router.navigate(['/owner/restaurant-paymentoption']);
			});
		}
	}

	showDetail(){
		this.show = !this.show;
	}

	cardDetailSubmit(id){
		let obj = {};
		obj['_id'] = this.restaurants._id;
		obj['onlinepayment'] = true;
		obj['billingaddress'] = this.billingDetailModel.value;
    	console.log('obj');
    	console.log(obj);

    	this.restaurantsService.updateRestaurant(obj).subscribe(users => {
    		console.log(users)
			toastr.success('Payment done successfully');
		});

		this.goFurther(id);
		/*document.getElementById('firstSection').style.display = 'none';
		document.getElementById('secondSection').style.display = 'none';
		document.getElementById('thirdSection').style.display = 'none';
		document.getElementById('forthSection').style.display = 'none';
		document.getElementById('fifthSection').style.display = 'none';
		document.getElementById('sixthSection').style.display = 'block';*/
		/*console.log("this.cardDetailModel.value");
		console.log(this.cardDetailModel.value);*/
	}

	providerSetting(){
		toastr.success('Successful');
		console.log("this.providerModel.value");
		console.log(this.providerModel.value);
		let obj = {};
		obj['_id'] = this.restaurants._id;
		obj['paymentcredential'] = this.providerModel.value;
    	this.restaurantsService.updateRestaurant(obj).subscribe(users => {
    		toastr.success('Credential has been saved successfully');
			this.router.navigate(['/owner/restaurant-paymentoption']);
		});
		
	}
}

@Component({
  selector: 'app-delivery-outside',
  templateUrl: './deliveryoutside.component.html',
  styleUrls: ['./deliveryoutside.component.css']
})
export class DeliveryOutsideComponent implements OnInit {
    restaurants:any={};

    selected1 = 'green';
    selected2 = 'white';
    outsideDelivery : boolean = true;

  	constructor(
  		private masterService: MasterService,
  		private restaurantsService: RestaurantsService,
  		private router: Router,
  		private alertService: AlertService,
  		private lf: FormBuilder
  		) { }

  	ngOnInit() {
		this.getRestaurants();
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			console.log("this.restaurants");
			console.log(this.restaurants);
			if (!this.restaurants.deliveryoutside) {
				this.selected2 = 'green';
				this.selected1 = 'white';
				this.outsideDelivery = false;
			}
		});
	}

	deliveryOutside(type){
		if (type == false) {
			this.outsideDelivery = false;
			if (this.selected2 != 'green') {
				this.selected2 = 'green';
				this.selected1 = 'white';
			}
		}else{
			this.outsideDelivery = true;
			if (this.selected1 != 'green') {
				this.selected1 = 'green';
				this.selected2 = 'white';
			}
		}

	}

	saveDeliveryOutside(){
		var obj = {}; 
		obj['_id'] = this.restaurants._id
		obj['deliveryoutside'] = this.outsideDelivery;
		this.restaurantsService.updateRestaurant(obj).subscribe((data)=>{
			console.log(data);
		});
	}
}

@Component({
  selector: 'app-custom-message',
  templateUrl: './customMessage.component.html',
  styleUrls: ['./custom-message.component.css']
})
export class CustomMessageComponent implements OnInit {
    restaurants:any={};
    customMessageForm : FormGroup;

  	constructor(
  		private masterService: MasterService,
  		private restaurantsService: RestaurantsService,
  		private router: Router,
  		private alertService: AlertService,
  		private lf: FormBuilder
  		) { }

  	ngOnInit() {
  		this.customMessageForm = this.lf.group({
  			checkoutMessage : ['', Validators.required],
  			_id : ['', Validators.required]
  		});
		this.getRestaurants();
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.customMessageForm.patchValue(this.restaurants);
		});
	}

	messageUpdate(){
		this.restaurantsService.updateRestaurant(this.customMessageForm.value).subscribe((data)=>{
			toastr.success('Checkout Page Message has been saved successfully');
			this.router.navigate(['/owner/supported-languages']);
		});
	}
}


