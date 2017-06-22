import { Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AlertService, RestaurantsService,UsersService } from '../service/index';
declare var google: any;

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
		private router: Router,
		private alertService: AlertService) { }

	ngOnInit() {
		this.loadAllRestaurants();
	}

	private loadAllRestaurants() {
		this.restaurantsService.getAll().subscribe(users => { this.restaurants = users.message; });
	}

	private deleteRestaurants(id) {
		this.restaurantsService.deleteOne(id).subscribe(data => {
			console.log(data);
			this.loadAllRestaurants();
			this.alertService.success('Restaurant Deleted successful', true);
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
				private alertService: AlertService,
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

		private restaurantAdd() {
				this.restaurantsService.addRestaurant(this.restaurantAddModel.value).subscribe(
						(data) => {
								this.alertService.success('Restaurant Add successful', true);
								this.router.navigate(['/admin/restaurants']);
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
		user:any ={};
		restaurants:any;
		
		constructor(
				private restaurantsService: RestaurantsService,
				private usersService: UsersService,
				private router: Router,
				private alertService: AlertService,
				private lf: FormBuilder
		) { }

		ngOnInit() {
			// this.user = JSON.parse(localStorage.getItem('currentOwner'));
			// console.log(this.user);
			this.getUserData();
		}

		private restaurantUpdate() {
			this.router.navigate(['/owner/basic-detail']);
		}
		private getUserData(){
			this.usersService.getOne(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(
						(data) => {
								this.user = data.message;
						}
				);
		}

		private accountConfirm() {
				this.restaurantsService.emailConfirm({'email':this.user.email}).subscribe(
						(data) => {
								this.alertService.success('Email Sent Successfully', true);
								this.router.navigate(['/owner/basic-detail']);
						}
				);
		}
		private getRestaurants() {
				this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
					this.restaurants = users.message;
				});
		}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantupdateowner.component.html',
	styles: ['#gmap {height: 500px; overflow:hidden;position:relative}']
})
export class RestaurantupdateownerComponent implements OnInit {
		restaurantAddModel: FormGroup;
		restaurants:any;
		lat: number ;
		lng: number ;
		
		constructor(
				private restaurantsService: RestaurantsService,
				private router: Router,
				private alertService: AlertService,
				private lf: FormBuilder
		) { }

		ngOnInit() {

				this.restaurantAddModel = this.lf.group({
						_id: ['', Validators.required],
						name: ['', Validators.required],
						//ownerId: ['', Validators.required],
						city: ['', Validators.required],
						country: ['', Validators.required],
						state: ['', Validators.required],
						address: ['', Validators.required],
						zipcode: ['', Validators.required],
						phoneNo: ['', Validators.required]
				});
				this.getRestaurants();
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

		private restaurantUpdate() {
				this.restaurantsService.updateRestaurant(this.restaurantAddModel.value).subscribe(
						(data) => {
								this.alertService.success('Restaurant Updated Successfully', true);
								this.router.navigate(['/owner/restaurant-location']);
						}
				);
		}
}

@Component({
	selector: 'app-addrestaurants',
	templateUrl: './restaurantlocation.component.html',
	styles: ['#gmap {height: 500px; overflow:hidden;position:relative}']
})
export class RestaurantlocationComponent implements OnInit {
		restaurantAddModel: FormGroup;
		restaurants:any;
		lat: number ;
		lng: number ;
		static  latt: number;
		static  lngg: number;

		
		constructor(
				private restaurantsService: RestaurantsService,
				private router: Router,
				private alertService: AlertService,
				private lf: FormBuilder,
    			private ngZone: NgZone
		) { }


		ngOnInit() {
			this.restaurantAddModel = this.lf.group({
					_id: ['', Validators.required],
					lat: [],
					lng: []
			});
			this.getRestaurants();
			
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
            google.maps.event.addListener(
                marker,
                'drag',
                function() {
                	RestaurantlocationComponent.latt  = marker.position.lat();
                	RestaurantlocationComponent.lngg  = marker.position.lng();
                }
            );
		}

		private getRestaurants() {
			this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
				this.restaurants = users.message;
				this.restaurantAddModel.controls['_id'].setValue(this.restaurants._id);
				this.lat = this.restaurants.lat;
				this.lng = this.restaurants.lng;
				this.initMap();
			});
		}

		private restaurantUpdate() {
        	this.restaurantAddModel.controls['lat'].setValue(RestaurantlocationComponent.latt);
        	this.restaurantAddModel.controls['lng'].setValue(RestaurantlocationComponent.lngg);
			console.log(this.restaurantAddModel.value);
			this.restaurantsService.updateLocation(this.restaurantAddModel.value).subscribe(
				(data) => {
						this.alertService.success('Restaurant Updated Successfully', true);
						this.router.navigate(['/owner/restaurant-confirm']);
				}
			);
		}
}



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
		private alertService: AlertService,
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
			//ownerId: ['', Validators.required],
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

	private restaurantUpdate() {
		console.log(this.restaurantAddModel.value);
		this.restaurantsService.updateRestaurant(this.restaurantAddModel.value).subscribe(
			(data) => {
				this.alertService.success('Restaurant Updated successful', true);
				this.router.navigate(['/admin/restaurants']);
			}
		);
	}
}


@Component({
    selector: 'app-ownerprofile',
    template: ''
})
export class OwnermailactivateComponent implements OnInit {

    ownerProfile: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        
        
		private alertService: AlertService,
		private restaurantsService: RestaurantsService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        JSON.parse(localStorage.getItem('currentOwner'));
        this.mailactivate(JSON.parse(localStorage.getItem('currentOwner'))._id)
    }

    mailactivate(id){
        this.restaurantsService.activateMail(id).subscribe(
            (data) => {
                if (data.error) {
                    //this._flashMessagesService.show('Some thing went wrong', { cssClass: 'alert-danger', timeout: 10000 });
                }else{
                    //this._flashMessagesService.show('Email confirmed', { cssClass: 'alert-success', timeout: 10000 });
                    this.router.navigate(['owner/profile']);
                }
            }
        );
    }
}
