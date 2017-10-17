import { Component, OnInit } from '@angular/core';import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService, AlertService, UsersService, PromotionsService, DriversService, RestaurantsService } from '../service/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
	users= [];
  restaurants= [];
  drivers= [];
  promotions = [];

  	constructor(private usersService: UsersService,private driversService: DriversService,private restaurantsService: RestaurantsService,private promotionsService: PromotionsService,private _flashMessagesService: FlashMessagesService,) {}

  	ngOnInit() {
  		this.loadAllUsers();
      this.loadAllDrivers();
      this.loadAllRestaurants();
      this.loadAllPromotions();
  	}

  	private loadAllUsers() {
        this.usersService.getAll().subscribe(users => { this.users = users.message; });
    }

    private loadAllDrivers() {
      this.driversService.getAll().subscribe(drivers => { this.drivers = drivers.message; });
    }

    private loadAllRestaurants() {
      this.restaurantsService.getAll().subscribe(restaurants => { this.restaurants = restaurants.message; });
    }

    private loadAllPromotions() {
      this.promotionsService.getAll().subscribe(promotions => { this.promotions = promotions.message; });
    }
}


@Component({
    selector: 'app-adminprofile',
    templateUrl: './adminprofile.component.html'
})
export class DashboardprofileComponent implements OnInit {

    adminProfile: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private UsersService: UsersService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.adminProfile = this.lf.group({
            _id: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        });
        this.adminProfile.patchValue(JSON.parse(localStorage.getItem('currentUser')));
        console.log(JSON.parse(localStorage.getItem('currentUser')));
    }

    adminUpdate(){
        this.UsersService.updateAdmin(this.adminProfile.value).subscribe(
            (data) => {
                localStorage.removeItem('currentUser');
                localStorage.setItem('currentUser', JSON.stringify(this.adminProfile.value));
                this.alertService.success('Profile updated successfully', true);
                this.router.navigate(['admin/dashboard']);
            }
        );
    }
}