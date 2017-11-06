import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { FlashMessagesService } from 'angular2-flash-messages';


/*service*/
import { CustomerService} from '../../service/index';

@Component({
    selector: 'app-customer-login',
    templateUrl: './customerlogin.component.html',
    styleUrls: ['./customerlogin.component.css']
})
export class CustomerLoginComponent implements OnInit {
    currentCustomer: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    err='';

    formErrors = {
        'email' : '',
    };

    validationMessages = {
        'email' : {
            'required':    'Email is required.',
            'pattern' :    'Email is not valid.'
        }
    };

    constructor(
        private lf: FormBuilder,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
        ){ 
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', Validators.required],
        });


        this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) {return;  }
        const form = this.loginForm;

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

    login(){
        this.customerService.authenticateUser(this.loginForm.value).subscribe(
            (data) => {
                console.log("data");
                console.log(data);
                if(data.success){
                    this.customerService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show('You are now logged in', {
                        cssClass: 'alert-success',
                        timeout: 5000});
                    this.router.navigate([this.returnUrl]);
                } else {
                    this._flashMessagesService.show(data.msg, {
                        cssClass: 'danger-alert',
                        timeout: 5000});
                    this.router.navigate(['customer/login']);
                }
            },
            (err)=>{
                this.err = 'Unable to reach Server';
            }
        );
        /*this.customerService.customerLogin(this.loginForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    if (data.success) {                    
                        this._flashMessagesService.show('Logged in Successfully', { cssClass: 'alert-success', timeout: 5000 });
                        this.customerService.storeUserData(data.token, data.user);
                        this.router.navigate([this.returnUrl]);
                    }else{
                        this._flashMessagesService.show('Your Account is not Active.', { cssClass: 'danger-alert', timeout: 5000 });
                        //this.loginForm.reset();
                    }
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    this.err = data.message;
                    this.loginForm.reset();
                }
            },
            (err)=>{
                this.err = 'Unable to reach Server';
                //this.loginForm.reset();
            }
        );*/
    }
}

@Component({
    selector: 'app-customer-register',
    templateUrl: './customerregister.component.html',
    styleUrls: ['./customerlogin.component.css']
})
export class CustomerRegisterComponent implements OnInit {

    currentCustomer: any = {};
    registerForm: FormGroup;
    returnUrl: string;
    err = '';
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    formErrors = {
        'email' : '',
        'phonenumber' : '',
        'password' : '',
        'newpassword' : '',
        'captcha' : '',
    };

    validationMessages = {
        'phonenumber': {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'pattern'   :    "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        },
        'email' : {
            'required':    'Email is required.',
            'pattern' :    'Email is not valid.'
        }, 
        'password' : {
            'required':    'Password is required.',
            'pattern' :    'Please Enter at least one letter and number',
            'minlength':   'Password should contain 6 characters',
        }, 
        'captcha' : {
            'required':      'Captcha is required.',
        }
    };

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';

        this.registerForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.phoneRegex)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass : ['', Validators.required],
            newpassword: ['', Validators.required],
            lastname: ['', Validators.required],
            firstname: ['', Validators.required],
            captcha: ['', Validators.required],
        });

        this.registerForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    public matchpasswordreg(){

        if (this.registerForm.value.newpassword != "") {
            if(this.registerForm.value.password == this.registerForm.value.newpassword){
                this.registerForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;   
            }else{
                this.registerForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }else{
            this.MutchPassword = false;
        }

    }

    register(){
        this.customerService.customerRegister(this.registerForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    /*localStorage.setItem('currentCustomer', JSON.stringify(data.message));*/
                    this._flashMessagesService.show('Successfully Registered, Please access your Email ID to Activate your Account', { cssClass: 'alert-success', timeout: 5000 });
                    setTimeout(()=>{
                        this.router.navigate(['customer/login']);
                    },1000)
                }else{
                    this.err = 'Email already in use';
                    //this.router.navigate(['customer/login']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Connection Lost! Try Again', { cssClass: 'danger-alert', timeout: 5000 });
                //this.router.navigate(['customer/login']);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.registerForm) {return;  }
        const form = this.registerForm;

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
    handleCorrectCaptcha(data)
    {
        console.log(data);
    }
}

@Component({
    selector: 'app-customer-forgetpassword',
    templateUrl: './customerforgetpassword.component.html',
    styleUrls: ['./customerlogin.component.css'],
})
export class CustomerForgetPasswordComponent implements OnInit {
    currentCustomer: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    err:any;


    formErrors = {
        'email' : '',
    };

    validationMessages = {
        'email' : {
            'required':    'Email is required.',
            'pattern' :    'Invalid Email.'
        }
    };

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]]
        });

        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.loginForm) {return;  }
        const form = this.loginForm;

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

    forgetPassword(){
        this.customerService.customerForgetPassword(this.loginForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show(data.message+'. Please Check your mail', { cssClass: 'alert-success', timeout: 5000 });
                    setTimeout(()=>{
                        this.router.navigate(['customer/login']);
                    },1000);
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    this.loginForm.reset();
                    /*this.router.navigate(['customer/login']);*/
                }
            },
            (err)=>{
                this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                setTimeout(()=>{
                    this.router.navigate(['customer/login']);
                },1000);
            }
        );
    }
}

@Component({
    selector: 'app-customer-resetPassword',
    templateUrl: './customerresetpassword.component.html',
    styleUrls: ['./customerlogin.component.css'],
})
export class CustomerResetPasswordComponent implements OnInit {

    resetPassForm: FormGroup;
    id : any;
    err = '';
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

    formErrors = {
        'password' : '',
        'newpassword' : '',
    };

    validationMessages = {
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
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private lf: FormBuilder
        ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.resetPassForm = this.lf.group({
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]]
          });

        this.resetPassForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    resetPass(){
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            let custObj = {};
            custObj['_id']=this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.customerService.resetPassword(custObj).subscribe((data)=>{
                if (!data.error) {
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['customer/login']);
                }else{
                    this._flashMessagesService.show('Server not responding', { cssClass: 'danger-alert', timeout: 5000 });
                }
            });
        }else{
            this._flashMessagesService.show('Password dont match. Please enter same password', { cssClass: 'danger-alert', timeout: 5000 });
            this.resetPassForm.reset();
        }
    }

    onValueChanged(data?: any) {
        if (!this.resetPassForm) {return;  }
        const form = this.resetPassForm;

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