import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, CustomerService, SocketService } from '../service/index';
import {OrderPipe} from "../order.pipe"

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: []
})
export class CustomerComponent implements OnInit {

  constructor(private socketService : SocketService) { }

  ngOnInit() {}

}

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styles: []
})
export class CustomerlistComponent implements OnInit {
	  order: string = 'title';
    customerFilter: any = { firstname: '' };
    reverse: boolean = false;
    customerslist:any= [];
    reported : any = [];
    blocked : any = [];
    
    

  	constructor(private customerService: CustomerService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {

      this.loadAllreport();
      this.loadAllBlocked();      
      this.loadAllCustomers();

    }

    private loadAllCustomers() {
      
        this.customerService.getAll().subscribe(customers => {
         this.customerslist = customers.message;
         console.log(this.customerslist); 
       });
    }

    private loadAllreport(){
       this.customerService.getAllreport().subscribe(data => {         
         this.reported = data.message;
         console.log("this.reported");
         console.log(data.message);
       });

    }
   
   private loadAllBlocked(){
      this.customerService.getAllBlocked().subscribe(data => {
         this.blocked = data.message;
         console.log("this.blocked");
         console.log(this.blocked);
       });

   }

   private checkreport(id){

   var index = this.reported.findIndex(item => {
     return item.FromId == id    
   });

   if(index != -1){
     return true;
   }else{
     return false;
   }

   }

 private checkblock(id){

   var index = this.blocked.findIndex(item => {
     return item.FromId == id    
   });

   if(index != -1){
     return true;
   }else{
     return false;
   }
   
   }


  private deleteCustomer(id) {
      if(confirm("Are you sure to delete ?")) {
        this.customerService.deleteOne(id).subscribe(data => {          
                this.loadAllCustomers();
                this.alertService.success('Customer Deleted successful', true);
                this.router.navigate(['/admin/customer/list']);
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
  selector: 'app-customeradd',
  templateUrl: './customeradd.component.html',
  styles: []
})
export class CustomeraddComponent implements OnInit {
    customerAddModel: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
    ) { }

      ngOnInit() {
        this.customerAddModel = this.lf.group({
           firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            phone: [],
            age: [],
            gender: ['', Validators.required],
            featured : [],
            activate : []
        });
        
    }

      private customerAdd() {
         this.customerAddModel.controls["activate"].setValue(true);
        this.customerService.addCustomer(this.customerAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Customer Add successful', true);
                this.router.navigate(['/admin/customer/list']);
            }
        );
    }
}

@Component({
  selector: 'app-customerupdate',
  templateUrl: './customerupdate.component.html',
  styles: []
})
export class CustomerupdateComponent implements OnInit {
    customers:any;
    customerUpdateModel: FormGroup;
    err:any;

      constructor(private lf: FormBuilder, private alertService: AlertService,private customerService: CustomerService,private router: Router,private activatedRoute: ActivatedRoute) { }

      ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getCustomer(id);
        });

        this.customerUpdateModel = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            phone: [],
            age: [],
            gender: ['', Validators.required],
            featured : []
        });

      }

    
      private getCustomer(id) {
        this.customerService.getOne(id).subscribe(customers => { 
            this.customers = customers.message; 
            this.customerUpdateModel.patchValue(this.customers);
            // this.userAddModel.controls['firsttitle'].setValue(this.users.firsttitle);
        });
    }

    private customerUpdate() {
      
        console.log(this.customerUpdateModel.value);
        this.customerService.updateCustomer(this.customerUpdateModel.value).subscribe(
            (data) => {
           
                this.alertService.success('Customer Updated successful', true);
                this.router.navigate(['/admin/customer/list']);
            }
        );
    }
}



@Component({
  selector: 'app-blockedusers',
  templateUrl: './blockedusers.component.html',
  styles: []
})
export class AdminShowBlockedUserComponent implements OnInit {

    userid : any;
    userblock : any = [];

    constructor(private customerService: CustomerService,private router: Router,private alertService: AlertService, private activatedRoute : ActivatedRoute) { }

    ngOnInit() {        
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userid = params['id'];   
            this.loadBlockedUser();         
        });
       }

    private loadBlockedUser() {

        var obj = {FromId : this.userid, status : 4};
        this.customerService.loadAllBlockedUser(obj).subscribe(data => {
          console.log("bloacked users");
          console.log(data.message);
          for(var i=0; i<data.message.length; i++){
           
           this.userblock.push(data.message[i]);

          console.log(this.userblock);
          } 
        });
        
    }
}



@Component({
  selector: 'app-blockedusers',
  templateUrl: './abusereport.component.html',
  styles: []
})
export class AdminViewAbuseReportComponent implements OnInit {

    userid : any;
    details : any = [];

    constructor(private customerService: CustomerService,private router: Router,private alertService: AlertService, private activatedRoute : ActivatedRoute) { }

    ngOnInit() {        
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userid = params['id'];   
            this.loadReportUser();         
        });
       }

    private loadReportUser() {
        var obj = {FromId : this.userid};
        this.customerService.loadReports(obj).subscribe(data => {
          console.log("repo data.message");
          console.log(data.message);
          this.details = data.message;         
        });
        
    }
}




