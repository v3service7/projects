import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { AdminService, CustomerService, StaffService, PlanService} from '../../service/index';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    currentAdmin: any = {};
    staffs: any = [];
    plans: any = [];
    customers: any = [];
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private staffService: StaffService,
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.getCustomerList()
        this.getStaffList()
        this.getPlanList()
    }

    getCustomerList(){
        this.adminService.customerList().subscribe(
            (data) => {
                if (!data.error) {
                    this.customers = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getStaffList(){
        this.adminService.staffList().subscribe(
            (data) => {
                if (!data.error) {
                    this.staffs = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getPlanList(){
        this.planService.planList().subscribe(
            (data) => {
                if (!data.error) {
                    this.plans = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminProfileComponent implements OnInit {
    currentAdmin: any = {};
	err = '';
    customerAddForm: FormGroup;
	cpForm: FormGroup;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegx = /^[0-9]*$/
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'phonenumber': '',
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber': {
            'pattern':      'Invalid Phone Number.',
        }
    };

    cpFormErrors = {
        'newpassword' : ''     
    };

    cpValidationMessages = {
        'newpassword' : {
            'required':    'Password is required.',
            'pattern' :    'Please Enter at least one letter and number',
            'minlength':    'Password should contain 6 characters',
        }  
    }

  	constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){ 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['',[Validators.pattern(this.phoneRegx)]],
            email: ['', Validators.required],
        });

        this.cpForm = this.lf.group({
            _id: ['', Validators.required],
            password: ['', Validators.required],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]]
        });

        this.customerAddForm.valueChanges.subscribe(data => this.onValueChangedForm(data));
        this.onValueChangedForm();

        this.customerAddForm.patchValue(this.currentAdmin);
        this.cpForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.cpForm.controls["_id"].setValue(this.currentAdmin._id);
  	}

    admin(id){
        this.adminService.admin(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.currentAdmin = data.message;
                    localStorage.removeItem('currentAdmin');
                    localStorage.setItem('currentAdmin', JSON.stringify(data.message));
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private matchpasswordreg(){
        if (this.cpForm.value.newpassword != "") {
            if(this.cpForm.value.password == this.cpForm.value.newpassword){
                this.cpForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;   
            }else{
                this.cpForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }    
    }

    onValueChanged(data?: any) {
        if (!this.cpForm) {return;  }
        const form = this.cpForm;

        for (const field in this.cpFormErrors) {
            // clear previous error message (if any)
            this.cpFormErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.cpValidationMessages[field];
                for (const key in control.errors) {
                    this.cpFormErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }

    onValueChangedForm(data?: any) {
        if (!this.customerAddForm) {return;  }
        const form = this.customerAddForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
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

    adminUpdate(){
        this.adminService.adminUpdate(this.customerAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this.admin(this.currentAdmin._id);
                    this._flashMessagesService.show('Details Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/dashboard']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            }
        );
    }

    adminChangePassword(){
        this.adminService.adminChangePassword(this.cpForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this.admin(this.cpForm.value._id);
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/dashboard']);
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    this.cpForm.reset();
                    this.cpForm.controls["_id"].setValue(this.currentAdmin._id);
                }
            },(err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj')
            }
        );
    }
}