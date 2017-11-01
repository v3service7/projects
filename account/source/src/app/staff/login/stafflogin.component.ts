import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { FlashMessagesService } from 'angular2-flash-messages';


/*service*/
import { StaffService, CustomerService} from '../../service/index';

@Component({
    selector: 'app-staff-login',
    templateUrl: './stafflogin.component.html',
    styleUrls: ['./stafflogin.component.css']
})
export class StaffLoginComponent implements OnInit {
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
        private staffService: StaffService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){}

    ngOnInit() {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/staff/dashboard';
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
        /*this.staffService.authenticateUser(this.loginForm.value).subscribe(
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
        );*/
    }
}

@Component({
    selector: 'app-staff-forgetpassword',
    templateUrl: './staffforgetpassword.component.html',
    styleUrls: ['./stafflogin.component.css'],
})
export class StaffForgetPasswordComponent implements OnInit {
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
    selector: 'app-staff-resetPassword',
    templateUrl: './staffresetpassword.component.html',
    styleUrls: ['./stafflogin.component.css'],
})
export class StaffResetPasswordComponent implements OnInit {

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