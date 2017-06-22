import { Component, OnInit, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService } from '../service/index';
import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../global";
declare var $: any;
declare var google: any;

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
			this.router.navigate(['/owner/restaurant-orderforlater']);
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
	user = [];

	styleforpass1 = { 'background-color': 'green', "color": 'white' };
	styleforpass2 = {};
	stylefordisplay1 = { 'display': 'block' };
	stylefordisplay2 = { 'display': 'none' };


	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder
		) { }


	ngOnInit() {
		this.orderAddModel = this.lf.group({
			orderforlater: [],
			mintime: ['', Validators.required],
			mindate: ['', Validators.required],
			dmintime: ['', Validators.required],
			dmindate: ['', Validators.required],
			_id: []
		});
		this.orderAddModel.controls['orderforlater'].setValue(true);
		this.getRestaurants();
	}


	orderForChange(action) {
		if (action) {
			this.styleforpass1 = { 'background-color': 'green', "color": 'white' };
			this.styleforpass2 = { 'background-color': '', "color": 'black' };
			this.stylefordisplay2 = { 'display': 'none' };
			this.stylefordisplay1 = { 'display': 'block' };
			this.orderAddModel.controls['orderforlater'].setValue(true);
		} else {
			this.styleforpass2 = { 'background-color': 'red', "color": 'white' };
			this.styleforpass1 = { 'background-color': '', "color": 'black' };
			this.stylefordisplay2 = { 'display': 'block' };
			this.stylefordisplay1 = { 'display': 'none' };
			this.orderAddModel.controls['orderforlater'].setValue(false);
		}
	}

	orderDetailUpdate() {
		var orderlater: any = {};
		orderlater.orderforlater = this.orderAddModel.value.orderforlater;
		orderlater._id = this.orderAddModel.value._id;
		orderlater.orderforlaterpickup = { 'mintime': this.orderAddModel.value.mintime, 'mindate': this.orderAddModel.value.mindate };
		orderlater.orderforlaterdelivery = { 'mintime': this.orderAddModel.value.dmintime, 'mindate': this.orderAddModel.value.dmindate };

		this.restaurantsService.updatePickUp(orderlater).subscribe(
			(data) => {
				this.user = data.message;
				this.router.navigate(['/owner/restaurant-pickup']);				
			});
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.orderForChange(this.restaurants.orderforlater);		
			this.orderAddModel.controls['_id'].setValue(this.restaurants._id);
			this.orderAddModel.controls['orderforlater'].setValue(this.restaurants.orderforlater);
			this.orderAddModel.controls['mintime'].setValue(this.restaurants.orderforlaterpickup.mintime);
			this.orderAddModel.controls['mindate'].setValue(this.restaurants.orderforlaterpickup.mindate);
			this.orderAddModel.controls['dmintime'].setValue(this.restaurants.orderforlaterdelivery.mintime);
			this.orderAddModel.controls['dmindate'].setValue(this.restaurants.orderforlaterdelivery.mindate);
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
			deliveryTax: ['', Validators.required],
			currency: ['', Validators.required],
			_id: []
		});
		this.getRestaurants();
	}

	getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.taxationAddModel.controls['name'].setValue(this.restaurants.taxation.name);
			this.taxationAddModel.controls['tax'].setValue(this.restaurants.taxation.taxpercent);
			this.taxationAddModel.controls['menuTax'].setValue(this.restaurants.taxation.menuTax);
			this.taxationAddModel.controls['deliveryTax'].setValue(this.restaurants.taxation.deliveryTax);
			this.taxationAddModel.controls['currency'].setValue(this.restaurants.taxation.currency);
		});
	}

	taxationDetailUpdate() {

		var objForUpdate: any = {};
		objForUpdate._id = this.restaurants._id;
		objForUpdate.taxation = { "name": this.taxationAddModel.value.name, "taxpercent": this.taxationAddModel.value.tax, "menuTax": this.taxationAddModel.value.menuTax, "deliveryTax": this.taxationAddModel.value.deliveryTax, "currency": this.taxationAddModel.value.currency };
		this.restaurantsService.updatePickUp(objForUpdate).subscribe(
			(data) => {
				this.user = data.message;
				this.router.navigate(['/owner/restaurant-paymentoption']);
			});

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
				this.router.navigate(['/owner/restaurant-taxation']);
			});
	}
}




@Component({
	selector: 'app-pickup',
	templateUrl: './deliveryzone.component.html',
	styles: []
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



	constructor(
		private elem: ElementRef,
		private restaurantsService: RestaurantsService,
		private router: Router,
		private alertService: AlertService,
		private lf: FormBuilder,
		private ngZone: NgZone
		) { }

	ngOnInit() {
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


	selectCircleEdit(Obj1) {

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


	selectCircleEditable() {

		this.randomColorCode = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

		let mapProp = {
			center: new google.maps.LatLng(this.lat, this.lng),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		let map = new google.maps.Map(document.getElementById("gmap"), mapProp);		

		let latLng = new google.maps.LatLng(this.lat, this.lng);
		let marker = new google.maps.Marker({
			position: latLng,
			map: map,
			draggable: true,
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
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		let map = new google.maps.Map(document.getElementById("gmap"), mapProp);
		let latLng = new google.maps.LatLng(this.lat, this.lng);
		let marker = new google.maps.Marker({
			position: latLng,
			map: map,
			draggable: true,
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
			this.lat = this.restaurants.lat;
			this.lng = this.restaurants.lng;
			this.citymap = { center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) } };
			this.triangleCoords = [{ lat: parseFloat(this.lat), lng: parseFloat(this.lng) }, { lat: parseFloat(this.lat), lng: parseFloat(this.lng) }];
			this.getAllDeliveryZoneLoad();
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

	}

	deliveryZoneDetailRemove(id) {
		if (confirm("Are you sure to delete ?")) {
			this.restaurantsService.removeDeliveryZone(id).subscribe(
				(data) => {
					this.getAllDeliveryZoneLoad();
					this.clearadd();
					this.clearEdit();
				});
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
			});
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
	styles: []
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

	currentOpen : any = '';
	currentChoice : any;
	groups : any;

	restaurants : any;
	order: string = 'name';
	userFilter: any = { name: '' };
	reverse: boolean = false;
	users = [];
	items = [];

	doctshtml : any = '';
	docts : any = false; 
	addgroup : any = {"display" : "none"};;
	edit : any = true;
    df: any;
	//imageUrl: string = 'http://localhost:4003/uploads/';
	imageUrl: string = globalVariable.url+'uploads/';
	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
	constructor(private lf: FormBuilder, private restaurantsService : RestaurantsService, private kitchenMenuService: KitchenMenuService, private kitchenMenuItemService: KitchenItemService, private router: Router, private alertService: AlertService, private route: ActivatedRoute) { }

	ngOnInit() {


		this.multisizeAddModel = this.lf.group({
			sid : [],
			sizename: ['', Validators.required],
			sizeprice: ['', Validators.required]			
		});

		this.editableDetail = this.lf.group({
			_id : [],
			name : ['', Validators.required]						
		});

		this.groupAddModel = this.lf.group({
			name : ['', Validators.required],
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
			image: ['', Validators.required]			
		});

		this.smenuImageAddModel = this.lf.group({
			 _id : [],			 
			image: ['', Validators.required]			
		});


		this.getRestaurants();		
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
   
	private modelClose(){      
		$("#myeditModal").modal('hide');
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
			//console.log(this.restaurants);	
		});
	}

	private addAnothergroup(){	
		this.currentOpen = 'group';	
		this.addgroup = {"display" : "block"};    
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
		this.currentOpen = 'editgroup';
		this.kitchenMenuService.groupDetailEditser(id).subscribe(data => {        	
			this.editableDetail.controls['_id'].setValue(data.message._id);
			this.editableDetail.controls['name'].setValue(data.message.name);
		});
	}

	private groupDetailEditUpdate(){ 	   
		this.kitchenMenuService.groupEditUpdate(this.editableDetail.value).subscribe(data => {
			this.getAllAddonDetail();
			this.clearCancel();
		});
	}
	private getAllAddonDetail(){
		this.kitchenMenuService.getAllAddOn(this.restaurants._id).subscribe(data => { 
			this.groups = data.message;
		})
	}

	private loadAllUsers() {
		//console.log(this.restaurants._id);
		this.kitchenMenuService.getAll(this.restaurants._id).subscribe(users => { 			
			this.users = users.message;
		});

	}

	private loadAllItem() {
		this.kitchenMenuItemService.getAll().subscribe(users => { 
			this.items = users.message;			
		});
	}

	private deleteUser(id) {
		if (confirm("Are you sure to delete ?")) {
			this.kitchenMenuService.deleteOne(id).subscribe(data => {				
				this.loadAllUsers();
				this.loadAllItem();
			});
		}
	}
	private deleteItem(id) {
		if (confirm("Are you sure to delete ?")) {
			this.kitchenMenuItemService.deleteOne(id).subscribe(data => {
				this.loadAllUsers();
				this.loadAllItem();
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

	private multisizeAddUpdate(){	 
		var allvalue :any = {}; 
		allvalue._id = this.multisizeAddModel.value.sid;	
		allvalue.multisize = {size: this.multisizeAddModel.value.sizename, price: this.multisizeAddModel.value.sizeprice};	 		
		this.kitchenMenuItemService.updateMenuAddOn(allvalue).subscribe(data =>{		
			this.multisizeAddModel.reset();
			this.refresh();
			this.modelClose();		
		});
	}

	private removeSubmenuAddOn(index, submenuid){
		if (confirm("Are you sure to delete ?")) {
			var removedata = {_id: submenuid, indexi: index}; 
			this.kitchenMenuItemService.removeAddOnToSubmenu(removedata).subscribe(data => {      
				this.refresh();
			});
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

	private multisizeEditAddUpdate(){
		this.kitchenMenuItemService.updateEditMenuAddOn(this.multisizeEditAddModel.value).subscribe(data => {
			this.refresh();
			this.modelClose(); 

		});           
	}

	private addChoic(id, name){	
		this.currentOpen = 'choice';
		this.currentChoice = name;
		this.choiceAddModel.controls['_id'].setValue(id);
	}

	private choiceDetailadd(){
		this.kitchenMenuItemService.addChoice(this.choiceAddModel.value).subscribe(data => {   
			this.getAllAddonDetail();
			this.clearCancel();
		}); 
	}

	private removechoice(id, index){
		if (confirm("Are you sure to delete ?")) {
			var removeid = {_id : id, index: index};
			this.kitchenMenuItemService.removeChoice(removeid).subscribe(data => {
				this.getAllAddonDetail();
			}); 
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
		this.kitchenMenuItemService.editSubAddOnUpdate(this.editableChoiceDetail.value).subscribe(data => {	
			this.clearCancel();
			this.getAllAddonDetail();	
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

	private passId(id){	  
      this.menuImageAddModel.controls["_id"].setValue(id);
	}

    private passub(id){
     this.smenuImageAddModel.controls["_id"].setValue(id);     
    }

	private updateMenuImage(){      
      this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.menuImageAddModel.controls['image'].setValue(responsePath.filename);
            this.kitchenMenuService.updateMenu(this.menuImageAddModel.value).subscribe(data => {
                // console.log(data.message);
                 this.menuImageAddModel.reset();
                 this.refresh();
			     this.modelClose();	
            });
		   }
       }
    
    private updateSubMenuImage(){          
      this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.smenuImageAddModel.controls['image'].setValue(responsePath.filename);
            this.kitchenMenuItemService.updateMenu(this.smenuImageAddModel.value).subscribe(data => {                
                 this.smenuImageAddModel.reset();
                 this.refresh();
			     this.modelClose();	
            });
		   }
       }


    }

@Component({
	selector: 'app-kitchenmenuadd',
	templateUrl: './kitchenmenuadd.component.html',
	styles: []
})
export class KitchenMenuAddComponent implements OnInit {
	menuAddModel: FormGroup;
	err: any;
	//public uploader:FileUploader = new FileUploader({url:'http://localhost:4003/upload'});
	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
	constructor(
		private lf: FormBuilder,
		private kitchenMenuService: KitchenMenuService,
		private router: Router,
		private alertService: AlertService,
		private route: ActivatedRoute,
		private restaurantsService : RestaurantsService,
		) {}

	ngOnInit() {
		this.menuAddModel = this.lf.group({
			name: ['', Validators.required],
			kitchenId: ['', Validators.required],
			image: [],
		});


        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
		this.menuAddModel.controls['kitchenId'].setValue(users.message._id);
		});

	}

	private userAdd() {
		this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.menuAddModel.controls['image'].setValue(responsePath.filename);			
			this.kitchenMenuService.addUser(this.menuAddModel.value).subscribe(
				(data) => {
					this.alertService.success('Menu Add successful', true);
					this.router.navigate(['/owner/menu-list']);
				});
		};
	}
}


@Component({
	selector: 'app-kitchenmenuupdate',
	templateUrl: './kitchenmenuupdate.component.html',
	styles: []
})
export class KitchenMenuUpdateComponent implements OnInit {
	users: any;
	menuUpdateModel: FormGroup;
	err: any;

	constructor(private lf: FormBuilder, private alertService: AlertService, private kitchenMenuService: KitchenMenuService, private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			let id = params['id'];
			this.getUsers(id);
		});

		this.menuUpdateModel = this.lf.group({
			_id: ['', Validators.required],
			name: ['', Validators.required]
		});
	}

	private getUsers(id) {
		this.kitchenMenuService.getOne(id).subscribe(users => {		
			this.users = users.message;
			this.menuUpdateModel.patchValue(this.users);			
		});
	}

	private userUpdate() {		
		this.kitchenMenuService.updateMenu(this.menuUpdateModel.value).subscribe(
			(data) => {
				this.alertService.success('Menu Updated successful', true);
				this.router.navigate(['/owner/menu-list']);
			});
	}
}

@Component({
	selector: 'app-kitchenitem',
	templateUrl: './kitchenitem.component.html',
	styles: []
})
export class KitchenitemComponent implements OnInit {

	menuAddModel: FormGroup;
	err: any;	
	groups : any;
	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

	constructor(
		private lf: FormBuilder,
		private kitchenItemService: KitchenItemService,
		private router: Router,
		private alertService: AlertService,
		private route: ActivatedRoute,
		private restaurantsService : RestaurantsService,
		private kitchenMenuService: KitchenMenuService
		) { }

	ngOnInit() {
		this.menuAddModel = this.lf.group({
			name: ['', Validators.required],
			kitchenId: ['', Validators.required],
			menuId: ['', Validators.required],
			price: ['', Validators.required],
			description: ['', Validators.required],
			options : [],
			image: [],
		});
		this.route.params.subscribe((params: Params) => {
			let id = params['id'];
			this.menuAddModel.controls['menuId'].setValue(id);
		});
		this.menuAddModel.controls['kitchenId'].setValue(JSON.parse(localStorage.getItem('currentOwner'))._id);
		this.getAllGroups();
	}



    private getAllGroups(){
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(data => {		
		this.kitchenMenuService.getAllAddOn(data.message._id).subscribe(users => {
			this.groups = users.message;
		});
		});
	}

	private userAdd() {
		//console.log("this.menuAddModel.value");
		//console.log(this.menuAddModel.value);
		
		this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			this.menuAddModel.controls['image'].setValue(responsePath.filename);			
			this.kitchenItemService.addUser(this.menuAddModel.value).subscribe(
				(data) => {
					this.alertService.success('Item Add successful', true);
					this.router.navigate(['/owner/menu-list']);
				});
		     };
	      }

	private deleteItem(id) {
		   this.kitchenItemService.deleteOne(id).subscribe(data => {});
	      }
}


@Component({
	selector: 'app-kitchenmenuupdate',
	templateUrl: './kitchenmenuitemupdate.component.html',
	styles: []
})

export class KitchenMenuItemUpdateComponent implements OnInit {
	users: any;
	menuUpdateModel: FormGroup;
	err: any;
	groups : any;

	constructor(private lf: FormBuilder, private alertService: AlertService, private restaurantsService : RestaurantsService, private kitchenMenuService: KitchenMenuService,  private kitchenItemService: KitchenItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		
		this.activatedRoute.params.subscribe((params: Params) => {
			let id = params['id'];
			this.getUsers(id);
			this.getAllGroups();
		});

		this.menuUpdateModel = this.lf.group({
			_id: ['', Validators.required],
			name: ['', Validators.required],
			price: ['', Validators.required],
			description: ['', Validators.required],
			options: [],
			image: []
		});

	}

	private getUsers(id) {
		this.kitchenItemService.getOne(id).subscribe(users => {
			this.users = users.message;
			//console.log(users.message);
			this.menuUpdateModel.patchValue(this.users);			
		});
	}
    
  

	private getAllGroups(){
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(data => {		
		this.kitchenMenuService.getAllAddOn(data.message._id).subscribe(users => {
			this.groups = users.message;
		});
		});
	}

	private userUpdate() {	
		this.kitchenItemService.updateMenu(this.menuUpdateModel.value).subscribe((data) => {
			this.alertService.success('Item Updated successful', true);
			this.router.navigate(['/owner/menu-list']);
		});
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
			console.log(this.restaurants);
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

  	private showChildDom(type){
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
			console.log(this.restaurants);
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
			console.log(this.restaurants);
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

		console.log(objForUpdate);
		this.restaurantsService.updateNotification(objForUpdate).subscribe(
			(data) => {
				console.log(data);
				//this.user = data.message;
				this.router.navigate(['/owner/supported-languages']);
			});
	}

	remove(id, index){
		if (confirm("Are you sure to delete ?")) {
		    this.restaurantsService.deleteNotification(id,index).subscribe(users => {
				if (!users.error) {
					this.getRestaurants();
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

    private languageUpdate(){    	
    	this.cusObj._id = this.restaurants._id;
    	this.cusObj.languages = this.addLng;
    	this.restaurantsService.updateRestaurant(this.cusObj).subscribe(users => {
			console.log(users);
		});
    }

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.addLng = this.restaurants.languages;
			console.log(this.restaurants);
		});
	}

    private checkChecked(id){
    	if(this.restaurants.languages.indexOf(id) > -1) {
	    	return true;
	    }else{
	    	return false;
	    }
	}
}