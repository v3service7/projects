import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {RestaurantsService, UsersService, CuisinesService } from '../service/index';

import { FileUploader } from 'ng2-file-upload';

import * as globalVariable from "../global";

declare var google: any;
declare var toastr: any;
declare var $: any;

@Component({
	selector: 'app-restaurants',
	templateUrl: './restaurants.component.html',
	styles: []
})
export class RestaurantsComponent implements OnInit {
	
	order: string = 'resCode';
	userFilter: any = { resCode: '' };
	reverse: boolean = false;
	restaurants= [];
	
	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router) { }
	
	ngOnInit() {
		this.loadAllRestaurants();
	}

	private loadAllRestaurants() {
		this.restaurantsService.getAll().subscribe(users => { 
			this.restaurants = users.message;
			console.log("this.restaurants");
			console.log(this.restaurants);
		});
	}

	private deleteRestaurants(id) {

		this.restaurantsService.deleteOne(id).subscribe(data => {
			console.log(data);
			this.loadAllRestaurants();
			toastr.success('Restaurant Deleted successful','Success!');
		});

	}
	private sortBy(data) {
		this.order = data;
		if (this.reverse == false) {
			this.reverse = true;
		}else{
			this.reverse = false;
		}
	}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantadd.component.html',
	styles: []
})
export class RestaurantaddComponent implements OnInit {
	restaurantAddModel: FormGroup;

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private lf: FormBuilder
		) { }

	ngOnInit() {
		this.restaurantAddModel = this.lf.group({
			name: ['', Validators.required],
			//ownerId: ['', Validators.required],
			city: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
			address: ['', Validators.required],
			zipcode: ['', Validators.required],
			phoneNo: ['', Validators.required]
		});
	}

	restaurantAdd() {
		this.restaurantsService.addRestaurant(this.restaurantAddModel.value).subscribe(
			(data) => {
				toastr.success('Restaurant Added successful','Success!');
				this.router.navigate(['/admin/restaurants']);
			}
		);
	}
}


/*Admin End Restaurant Update*/
@Component({
	selector: 'app-updaterestaurants',
	templateUrl: './restaurantupdate.component.html',
	styles: []
})
export class RestaurantupdateComponent implements OnInit {
	restaurants:any;
	restaurantAddModel: FormGroup;
	err:any;

	constructor(
		private lf: FormBuilder,
		private restaurantsService: RestaurantsService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			let id = params['id'];
			this.getRestaurants(id);
		});

		this.restaurantAddModel = this.lf.group({
			_id: ['', Validators.required],
			name: ['', Validators.required],
			city: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
			zipcode: ['', Validators.required],
			address: ['', Validators.required],
			phoneNo: ['', Validators.required]
		});
	}


	private getRestaurants(id) {
		this.restaurantsService.getOne(id).subscribe(users => {
			this.restaurants = users.message;
			this.restaurantAddModel.patchValue(this.restaurants);
			// this.userAddModel.controls['firstname'].setValue(this.users.firstname);
		});
	}

	restaurantUpdate() {
		console.log(this.restaurantAddModel.value);
		this.restaurantsService.updateRestaurantLocation(this.restaurantAddModel.value).subscribe(
			(data) => {
				toastr.success('Restaurant Updated successful','Success');
				this.router.navigate(['/admin/restaurants']);
			}
			);
	}
}
/*Admin End Restaurant Update End*/

/*Admin End Cuisine Update*/
@Component({
	selector: 'app-cuisine',
	templateUrl: './cuisine.component.html',
	styles: []
})
export class CuisinesComponent implements OnInit {

	cuisineAddModel : FormGroup;
	currentType: string;
	currentID: string;

	order: string = 'name';
	userFilter: any = { name: '' };
	reverse: boolean = false;
	cuisines= [];

	imageUrl: string = globalVariable.url+'uploads/';

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

	constructor(
		private cuisinesService: CuisinesService,
		private router: Router,
		private lf: FormBuilder
		) {
		this.cuisineAddModel = this.lf.group({
			name : ['', Validators.required],
			image : ['', Validators.required]
		});

		this.loadAllCuisines();
	}

	ngOnInit() {
	}

	hideModal(){
		$('#addModal').modal('hide');
		$("#image").val('');
	}

	addData(data, type){
		if (type == 'add') {
			this.currentType = 'Add';
			$("#addModal").modal('show');
		}

		if (type == 'edit') {
			this.currentType = 'Edit';
			this.currentID = data._id;
			$("#addModal").modal('show');
			this.cuisineAddModel.patchValue(data);
		}
	}

	sortBy(data) {
		this.order = data;
		if (this.reverse == false) {
			this.reverse = true;
		}else{
			this.reverse = false;
		}
	}

	onChange(event) {
		var files = event.srcElement.files;
		this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);

			console.log("responsePath");
			console.log(responsePath);

			this.cuisineAddModel.controls['image'].setValue(responsePath.filename);
			toastr.success('Image Uploaded Successfully');
		};
	}

	addCuisine(){
		if (this.currentType == 'Add') {
			this.cuisinesService.addCuisine(this.cuisineAddModel.value).subscribe((data)=>{
				console.log("data added");
				console.log(data);
				if (!data.error) {
					toastr.success('Cuisine Added!');
					this.loadAllCuisines();
					this.hideModal();
					this.cuisineAddModel.reset();
				}else{
					toastr.error('Unable to add Cuisine. Try Later!');
					this.hideModal();
					this.cuisineAddModel.reset();
				}
			});
		}

		if (this.currentType == 'Edit') {
			let obj4Update = {};
			obj4Update = this.cuisineAddModel.value;
			obj4Update['id'] = this.currentID;

			console.log("obj4Update");
			console.log(obj4Update);

			this.cuisinesService.updateCuisine(obj4Update).subscribe((data)=>{
				console.log("data updated");
				console.log(data);
				if (!data.error) {
					toastr.success('Cuisine Updated!');
					this.loadAllCuisines();
					this.hideModal();
					this.cuisineAddModel.reset();
				}else{
					toastr.error('Unable to add Cuisine. Try Later!');
					this.hideModal();
					this.cuisineAddModel.reset();
				}
			});
		}
	}

	loadAllCuisines(){
		this.cuisinesService.getAll().subscribe((data)=>{
			console.log("data");
			console.log(data);
			this.cuisines = data.message;
		})
	}

	deleteCuisine(id){
		if (confirm("Delete Cuisine?")) {
			this.cuisinesService.deleteOne(id).subscribe((data)=>{
				if (!data.error) {
					toastr.success('Deleted Successfully');
					this.loadAllCuisines();
				}else{
					toastr.error('Unable to delete. Try Later!')
				}
			})
		}
	}
}
/*Admin End Cuisine Update End*/


@Component({
	selector: 'app-restaurant-cuisine',
	templateUrl: './restaurantcuisine.component.html',
	styleUrls: ['../../assets/css/restaurant.component.css']
})
export class RestaurantCuisinesComponent implements OnInit {

	cuisines= [];
	restaurantCuisines= [];
	restaurants:any;

	imageUrl: string = globalVariable.url+'uploads/';

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

	constructor(
		private restaurantsService: RestaurantsService,
		private cuisinesService: CuisinesService,
		private router: Router,
		private lf: FormBuilder
		) {
		this.getRestaurants();
		this.loadAllCuisines();
	}

	ngOnInit() {
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			if (this.restaurants.cuisine && this.restaurants.cuisine.length > 0) {
				this.restaurantCuisines = this.restaurants.cuisine;
			}
		});
	}

	loadAllCuisines(){
		this.cuisinesService.getAll().subscribe((data)=>{
			console.log("data");
			console.log(data);
			this.cuisines = data.message;
		})
	}

	addCuisineToRestro(obj){
		let indx = this.restaurantCuisines.findIndex(mn=>mn._id == obj._id)
		if (indx == -1) {
			this.restaurantCuisines.push(obj);
		}else{
			this.restaurantCuisines.splice(indx,1);
		}
	}

	deleteCuisine(i){
		this.restaurantCuisines.splice(i,1);
	}

	checkColor(id){
		let indx = this.restaurantCuisines.findIndex(mn=>mn._id == id);
		if (indx == -1) {
			return {'color' : '#777'};
		}else{
			return {'color': '#5AC15E'};
		}
	}

	addCuisinesToRestaurant(){
		let obj4Update = {};
		obj4Update['_id'] = this.restaurants._id;
		obj4Update['cuisine'] = this.restaurantCuisines;

		this.restaurantsService.updateRestaurant(obj4Update).subscribe((data)=>{
			console.log("data");
			console.log(data);

			if (!data.error) {
				toastr.success('Cuisines Updated Successfully');
				this.router.navigate(['/owner/restaurant-confirm']);
			}else{
				toastr.error('Unable to update Cuisine. Try Later!');
			}
		})
	}


}

@Component({
	selector: 'app-ownerprofile',
	template: ''
})
export class OwnermailactivateComponent implements OnInit {

	returnUrl: string;
	err:any;
	id:any;

	currentOwner : any = {};

	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private activatedRoute: ActivatedRoute
		) { }

	ngOnInit() {

		this.activatedRoute.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.mailactivate(this.id);
		});
		/*JSON.parse(localStorage.getItem('currentOwner'));
		this.mailactivate(JSON.parse(localStorage.getItem('currentOwner'))._id)*/
	}

	mailactivate(id){
		this.restaurantsService.activateMail(id).subscribe(
			(data) => {
				if (data.error) {
					toastr.warning(data.message,'Alert!');
					//this._flashMessagesService.show('Some thing went wrong', { cssClass: 'alert-danger', timeout: 10000 });
				}else{
					//toastr.success('Email confirmed','Success!');
					if(localStorage.getItem('currentOwner')){
						this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
						if (this.currentOwner._id == this.id && this.currentOwner['emailstatus'] == false) {
							toastr.success(data.message,'Success!')
						}else if(this.currentOwner._id == this.id && this.currentOwner['emailstatus'] == true){
							toastr.success("Email Already Activated")
						}else{
							toastr.success(data.message,'Success!')
							localStorage.removeItem('currentOwner');
						}
					}else{
						toastr.success(data.message,'Success!');
					}
					this.router.navigate(['owner/profile']);
					//this._flashMessagesService.show('Email confirmed', { cssClass: 'alert-success', timeout: 10000 });
				}
			}
		);
	}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantupdateowner.component.html',
	styleUrls: ['./restaurantCSS.component.css'],
	styles: ['#gmap {height: 600px; overflow:hidden;position:relative}']
})
export class RestaurantupdateownerComponent implements OnInit {
	restaurantAddModel: FormGroup;
	restaurants:any;
	lat: number ;
	lng: number ;

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private lf: FormBuilder
		) { }

	ngOnInit() {

		this.restaurantAddModel = this.lf.group({
			_id: ['', Validators.required],
			name: ['', Validators.required],
			city: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
			address: ['', Validators.required],
			zipcode: ['', Validators.required],
			phoneNo: ['', Validators.required],
			image: []
		});
		this.getRestaurants();
		/*document.getElementById('Menu18').className = 'progress';
		document.getElementById('Menu18').addClass('progree');*/
		
	}

	initMap(){
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
			draggable: true,
			animation: google.maps.Animation.DROP
		});
	}

	private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;
			this.restaurantAddModel.patchValue(this.restaurants);
			// this.userAddModel.controls['firstname'].setValue(this.users.firstname);
			this.lat = this.restaurants.lat;
			this.lng = this.restaurants.lng;
			this.initMap();
		});
	}

	onChange(event) {
		var files = event.target.files;
		this.restaurantAddModel.controls['image'].setValue(files[0].name);
	}

	restaurantUpdate() {
		document.getElementById('Menu18').style.cursor = 'wait';
		document.getElementById('submitButton').style.cursor = 'wait';
		//document.body.style.cursor='progress';
		console.log(this.restaurantAddModel.value);
		console.log(this.restaurants.image);
		if (this.restaurantAddModel.value.image == this.restaurants.image ) {
			this.restaurantsService.updateRestaurantLocation(this.restaurantAddModel.value).subscribe(
				(data) => {
					toastr.success('Restaurant Updated Successfully','Success!');
					this.router.navigate(['/owner/restaurant-location']);
				}
			);
		}else{
			this.uploader.uploadAll();
			this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
				var responsePath = JSON.parse(response);
				this.restaurantAddModel.controls['image'].setValue(responsePath.filename);
				this.restaurantsService.updateRestaurantLocation(this.restaurantAddModel.value).subscribe(
					(data) => {
						toastr.success('Restaurant Updated Successfully','Success!');
						this.router.navigate(['/owner/restaurant-location']);
					}
				);
			};	
		}
	}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantlocation.component.html',
	styles: ['#gmap {height: 600px; overflow:hidden;position:relative}']
})
export class RestaurantlocationComponent implements OnInit {

	restaurantAddModel: FormGroup;
	restaurants:any;
	address:any;
	restaurantObj4Update:any = {};
	lat: number ;
	lng: number ;
	static  latt: number;
	static  lngg: number;


	constructor(
		private restaurantsService: RestaurantsService,
		private router: Router,
		private lf: FormBuilder,
		private ngZone: NgZone
		) { }


	ngOnInit(){
		var owner = JSON.parse(localStorage.getItem('currentOwner'))
		this.getRestaurants(owner._id);
	}

	initMap(){
		console.log(this.lat, this.lng);
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
			draggable: true,
			animation: google.maps.Animation.DROP
		});
		google.maps.event.addListener(
			marker,
			'dragend',
			() => {
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
				geocoder.geocode({ 'latLng': latlng }, (results, status) => {
					console.log("results");
					console.log(results);

					if (status == google.maps.GeocoderStatus.OK) { 
						if (results[0]) {
							document.getElementById('addressId').innerText =  results[0].formatted_address;
							var result = results[0];
							var component = results[0].address_components;
							var country = null, state = null, city = null,cityAlt = null, address = null, zipcode = null;

							for (var i = 0; i < component.length; i++) {
								if (!address) {
									if (component[i].types[0] == 'route') {
										address = component[i].long_name;
										//this.restaurantObj4Update['address'] = address;
									}
								}
								if (!city) {
									if (component[i].types[0] == 'administrative_area_level_2') {
										city = component[i].long_name;
										//this.restaurantObj4Update['city'] = city;
									}
								}
								if (!cityAlt) {
									if (component[i].types[0] == 'locality') {
										cityAlt = component[i].long_name;
										//this.restaurantObj4Update['cityAlt'] = cityAlt;
									}
								}
								if (!state) {
									if (component[i].types[0] == 'administrative_area_level_1') {
										state = component[i].long_name;
										this.restaurantObj4Update['state'] = state;
									}
								}
								if (!country) {
									if (component[i].types[0] == 'country') {
										country = component[i].long_name;
										this.restaurantObj4Update['country'] = country;
									}
								}
								if (!zipcode) {
									if (component[i].types[0] == 'postal_code') {
										zipcode = component[i].long_name;
										this.restaurantObj4Update['zipcode'] = zipcode;
									}
								}
							}

							if (city == null && cityAlt != null) {
								this.restaurantObj4Update['city'] = cityAlt;
								this.restaurantObj4Update['address'] = address;
							}
							if (city != null && cityAlt == null) {
								this.restaurantObj4Update['city'] = city;
								this.restaurantObj4Update['address'] = address;
							}

							if (city != null && cityAlt != null && city == cityAlt) {
								this.restaurantObj4Update['city'] = city;
								this.restaurantObj4Update['address'] = address;
							}

							if (city != null && cityAlt != null && city !== cityAlt) {
								this.restaurantObj4Update['city'] = city;
								this.restaurantObj4Update['address'] = address + ', ' + cityAlt;
							}
							
						} else {
							alert("address not found");
						}
					} else { 
						alert("Geocoder failed due to: " + status);
					}
				});
				RestaurantlocationComponent.latt  = marker.position.lat();
				RestaurantlocationComponent.lngg  = marker.position.lng();
			}
		);
	}

	private getRestaurants(id) {
		this.restaurantsService.getOwnerRestaurants(id).subscribe(users => {
			this.restaurants = users.message;
			console.log("this.restaurants");
			console.log(this.restaurants);
			//this.restaurantAddModel.controls['_id'].setValue(this.restaurants._id);
			this.lat = this.restaurants.lat;
			this.lng = this.restaurants.lng;
			this.initMap();
		});
	}

	restaurantUpdate() {
		document.getElementById('Menu18').style.cursor = 'wait';
		document.getElementById('submitButton').style.cursor = 'wait';
		this.restaurantObj4Update['lat'] = RestaurantlocationComponent.latt;
		this.restaurantObj4Update['lng'] = RestaurantlocationComponent.lngg;
		this.restaurantObj4Update['_id'] = this.restaurants._id;

		this.restaurantsService.updateLocation(this.restaurantObj4Update).subscribe(
			(data) => {
				if (!data.error) {
					toastr.success('Restaurant Location Updated Successfully','Success!');
					this.router.navigate(['/owner/restaurant-cuisine']);
					/*this.router.navigate(['/owner/restaurant-confirm']);*/
				}else{
					toastr.error('Unable to Update Location','Error!');
				}
			}
		);
	}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantconfirmation.component.html',
	styles: []
})
export class RestaurantconfirmationComponent implements OnInit {

	user:any = {};
	restaurants: any;

	constructor(
		private restaurantsService: RestaurantsService,
		private usersService: UsersService,
		private router: Router,
		private lf: FormBuilder
		) { }

	ngOnInit() {
		this.getUserData();	
	}

	/*private restaurantUpdate() {
		this.router.navigate(['/owner/basic-detail']);
	}*/

	private getUserData(){
		this.usersService.getOne(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(
			(data) => {
				this.user = data.message;
				if (this.user.emailstatus) {
					document.getElementById("MyElement").className = "status-smile";
				}else{
					document.getElementById("MyElement").className = "status-sad";
				}

				localStorage.setItem('currentOwner',JSON.stringify(this.user));
				/*console.log("this.user");
				console.log(this.user);*/
			}
		);
	}

	accountConfirm() {
		document.getElementById('rightMenu1').style.cursor = 'wait';
		document.getElementById('submitButton').style.cursor = 'wait';
		this.restaurantsService.emailConfirm({'email': this.user.email }).subscribe(
			(data) => {
				console.log("data");
				console.log(data);
				toastr.info('Email Sent Successfully','Email Sent');
				//this.router.navigate(['/owner/basic-detail']);
			}
		);
	}

	/*private getRestaurants() {
		this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
			this.restaurants = users.message;					
		});
	}*/
}
