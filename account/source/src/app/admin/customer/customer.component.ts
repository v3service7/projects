import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { AdminService,CustomerService} from '../../service/index';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class AdminCustomerComponent implements OnInit {
    currentAdmin: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
            this.loginForm = this.lf.group({
            email: ['', Validators.required]
        });
    }

    getAdmin(){
        
    }
}

@Component({
  selector: 'app-admin-customer-list',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerListComponent implements OnInit {
    currentAdmin: any = {};
    customers: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.getList()
    }

    getList(){
        this.customerService.customerList().subscribe(
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

    private deleteCustomer(id) {
        if(confirm("Are you sure to delete ?")) {
            this.customerService.customerDelete(id).subscribe(data => {
                if (!data.error) {
                    this._flashMessagesService.show('Customer Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                }
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-customer-add',
  templateUrl: './customeradd.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerAddComponent implements OnInit {
    currentAdmin: any = {};
    customerAddForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email' : '',
        'phonenumber' : '',
        'password' : '',
        'newpassword' : ''
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber': {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'pattern'   :    "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        },
        'email' : {
            'required':    'Email is required.',
            'pattern' :    'Email not in well format.'
        }, 
        'password' : {
            'required':    'Password is required.',
            'pattern' :    'Please Enter at least one letter and number',
            'minlength':   'Password should contain 6 characters',
        },
        'newpassword' : {
            'required':    'Password is required.',
            'pattern' :    'Please Enter at least one letter and number',
            'minlength':   'Password should contain 6 characters',
        }            
    };

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.customerAddForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.phoneRegex)]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass : ['', Validators.required],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            //dob: ['', Validators.required]
        });
        this.customerAddForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    private matchpasswordreg(){
        if (this.customerAddForm.value.newpassword != "") {
            if(this.customerAddForm.value.password == this.customerAddForm.value.newpassword){
                this.customerAddForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;   
            }else{
                this.customerAddForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }else{
            this.MutchPassword = false;
        }

    }

    customerAdd(){
        this.customerService.customerAdd(this.customerAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Customer created successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/customer']);
                }else{
                    this._flashMessagesService.show('Email already in use', { cssClass: 'danger-alert', timeout: 5000 });
                    this.customerAddForm.reset();
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
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
}

@Component({
  selector: 'app-admin-customer-edit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerEditComponent implements OnInit {
    currentAdmin: any = {};
	currentCustomer: any = {};
    customerAddForm: FormGroup;
    passwordp : any = '';
    phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'phonenumber' : ''
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber': {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'pattern'   :    "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        }
    };

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){ 
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.phoneRegex)]],
            email: ['', Validators.required],
            // password: ['', Validators.required],
            // matchpass : ['', Validators.required],
            // newpassword: ['', Validators.required],
            //dob: ['', Validators.required]
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.customer(id);
        });    

        this.customerAddForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    /*private matchpasswordreg(){
        if(this.customerAddForm.value.password == this.customerAddForm.value.newpassword){
            this.customerAddForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;   
        }else{
            this.customerAddForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    }*/

    customerUpdate(){
        this.customerService.customerUpdate(this.customerAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Customer Updated successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/customer']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj')
            }
        );
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.currentCustomer = data.message;
                    console.log(this.currentCustomer);
                    this.customerAddForm.patchValue(this.currentCustomer);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
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
}