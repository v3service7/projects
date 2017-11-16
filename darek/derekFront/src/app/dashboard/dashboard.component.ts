import { Component, OnInit } from '@angular/core';import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, AlertService, UsersService, PromotionsService, DriversService, RestaurantsService,OrderService } from '../service/index';

declare var toastr: any;

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
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    public barChartOptions:any = {scaleShowVerticalLines: false,responsive: true}; public lineChartColors:Array<any> = [
    { 
        backgroundColor: '#337ab7',
        borderColor: '#337ab7',
    }
    ];
    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public barChartData:any[] = [{data: [], label: 'Restaurant'}];

    constructor(private orderService: OrderService,private usersService: UsersService,private driversService: DriversService,private restaurantsService: RestaurantsService,private promotionsService: PromotionsService,) {}

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllDrivers();
        this.loadAllRestaurants();
        this.loadAllPromotions();
        this.getAllSalesData(this.selectedTime);
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

    private getAllSalesData( days) {
        this.orderService.getAllResSaleData(days).subscribe(users => {
            var chartData = users.message.data.sort(function (a, b) {
                if (a.name) {
                    return a.name.localeCompare( b.name );
                }
            });
            if (users.status) {
                let arr = chartData;
                let lbl = [];
                let data = [];
                for (var i = 0; i < arr.length; i++) {
                    lbl.push(arr[i].name);
                    data.push(arr[i].amount);
                }
                this.barChartLabels = lbl;
                this.barChartData[0]['data'] = data;
            }
            if(!users.status){
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }

    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.getAllSalesData(this.selectedTime);
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
                toastr.success('Profile updated successfully');
                this.router.navigate(['admin/dashboard']);
            }
            );
    }
}