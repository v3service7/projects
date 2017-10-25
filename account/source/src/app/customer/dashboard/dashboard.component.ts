import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { CustomerService, BusinessService} from '../../service/index';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
    currentCustomer: any = {};
    staffs: any = [];
    plans: any = [];
    business: any = [];
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private businessService: BusinessService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }

    ngOnInit() {
        this.getBusinessList();
    }

    getBusinessList(){
        this.businessService.businessList(this.currentCustomer._id).subscribe((bsns)=>{
            if (!bsns.error) {
                this.business = bsns.message;
            }
        });
    }
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class CustomerProfileComponent implements OnInit {
    currentCustomer: any = {};
	err = '';
    customerAddForm: FormGroup;
	cpForm: FormGroup;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'phonenumber': ''
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber' : {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'pattern'   :    "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        }
    };

    cpFormErrors = {
        'password' : '',
        'newpassword' : ''     
    };

    cpValidationMessages = {
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
    }

  	constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){ 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.phoneRegex)]],
            dob: [''],
            email: ['', Validators.required],
        });

        this.cpForm = this.lf.group({
            _id: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]]
        });

        this.customerAddForm.patchValue(this.currentCustomer);
        
        this.cpForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        
        this.customerAddForm.valueChanges.subscribe(data => this.onValueChangedForm(data));
        this.onValueChangedForm();

        this.cpForm.controls["_id"].setValue(this.currentCustomer._id);
  	}

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.currentCustomer = data.message;
                    localStorage.removeItem('currentCustomer');
                    localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private matchpasswordreg(){
        if (this.cpForm.value.newpassword != '') {
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

    customerUpdate(){
        this.customerService.customerUpdate(this.customerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Profile updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                  this.customer(this.customerAddForm.value._id);
                  this.router.navigate(['customer/dashboard']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            }
        );
    }

    customerChangePassword(){
        this.customerService.customerChangePassword(this.cpForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this.customer(this.cpForm.value._id);
                  this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                  this.router.navigate(['customer/dashboard']);
                }else{
                    this.cpForm.reset();
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj');
            }
        );
    }
}