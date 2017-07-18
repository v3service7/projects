import { Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, DriversService, RestaurantsService } from '../service/index';

declare var toastr: any;

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styles: []
})
export class OwnerDriversComponent implements OnInit {

  order: string = 'firstname';
  userFilter: any = { email: '' };
  reverse: boolean = false;
  drivers= []; 


  constructor(
    private driversService: DriversService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loadAllDrivers();
  }


  private loadAllDrivers() {
    this.driversService.getAll().subscribe(users => { this.drivers = users.message; });

  }

  private deleteDrivers(id) {
    if(confirm("Are you sure to delete ?")) {
      this.driversService.deleteOne(id).subscribe(data => {       
        this.loadAllDrivers();
        toastr.success('Driver Deleted successful');
        //this.alertService.success('Driver Deleted successful', true);
      });
    }
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
  selector: 'app-adddrivers',
  templateUrl: './driveradd.component.html',
  styles: []
})
export class OwnerDriversaddComponent implements OnInit {
  
  driverAddModel: FormGroup;
  restaurants : any;

  constructor(
    private driversService: DriversService,
    private router: Router,
    private alertService: AlertService,
    private lf: FormBuilder,    
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit() {

    this.getRestaurants();

    this.driverAddModel = this.lf.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleName: ['', Validators.required],
      vehicleNo: ['', Validators.required],
      restaurantId : []
    });
  }


   private getRestaurants() {
    this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
      this.restaurants = users.message;       
    });
  }
   

  private driverAdd() {
    this.driverAddModel.controls['restaurantId'].setValue(this.restaurants._id);
    this.driversService.addDriver(this.driverAddModel.value).subscribe(
      (data) => {
        toastr.success('Driver Add successful');
        //this.alertService.success('Driver Add successful', true);
        this.router.navigate(['/owner/drivers']);
      }
    );
  }
}



@Component({
  selector: 'app-drivers',
  templateUrl: './driverupdate.component.html',
  styles: []
})
export class OwnerDriversupdateComponent implements OnInit {
  drivers:any;
  driverAddModel: FormGroup;
  err:any;

  constructor(
    private lf: FormBuilder,
    private alertService: AlertService,
    private driversService: DriversService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getDrivers(id);
    });

    this.driverAddModel = this.lf.group({
      _id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleName: ['', Validators.required],
      vehicleNo: ['', Validators.required],
    });

  }


  private getDrivers(id) {
    this.driversService.getOne(id).subscribe(users => {
      this.drivers = users.message;
      this.driverAddModel.patchValue(this.drivers);      
    });
  }

  private driverUpdate() {
    console.log(this.driverAddModel.value);
    this.driversService.updateDriver(this.driverAddModel.value).subscribe(
      (data) => {
        toastr.success('Driver Updated successful');
        //this.alertService.success('Driver Updated successful', true);
        this.router.navigate(['/owner/drivers']);
      }
    );
  }
}
