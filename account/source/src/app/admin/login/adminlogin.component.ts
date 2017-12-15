import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { AdminService} from '../../service/index';


@Component({
    selector: 'app-admin-login',
    templateUrl: './adminlogin.component.html',
    styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {
    currentAdmin: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(){
        this.adminService.authenticateUser(this.loginForm.value).subscribe(
            (data) => {
                if(data.success){
                    this.adminService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show('You are now logged in', {
                        cssClass: 'alert-success',
                        timeout: 5000});
                    console.log(this.returnUrl)
                    this.router.navigate([this.returnUrl]);
                } else {
                    this._flashMessagesService.show(data.msg, {
                        cssClass: 'danger-alert',
                        timeout: 5000});
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
                this.err = 'Unable to reach Server';
            }
        );
    }
}

@Component({
    selector: 'app-admin-forgetpassword',
    templateUrl: './adminforgetpassword.component.html',
    styleUrls: ['./adminlogin.component.css'],
})
export class AdminForgetPasswordComponent implements OnInit {
    currentAdmin: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

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
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]]
        });

        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    forgetPassword(){
        this.adminService.adminForgetPassword(this.loginForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show(data.message+'. Please Check your mail', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/login']);
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                this.router.navigate(['admin/login']);
            }
        );
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
}

@Component({
    selector: 'app-admin-resetPassword',
    templateUrl: './adminresetpassword.component.html',
    styleUrls: ['./adminlogin.component.css'],
})
export class AdminResetPasswordComponent implements OnInit {

    resetPassForm: FormGroup;
    id : any;
    err = '';
    passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    formErrors = {
        'password' : '',
        'newpassword' : '',
    };

    validationMessages = {
        'password' : {
            'required':    'Password is required.',
            'pattern' :    'Please enter at least one letter and a number',
            'minlength':   'Password should contain 6 characters',
        },
        'newpassword' : {
            'required':    'Password is required.',
            'pattern' :    'Please enter at least one letter and a number',
            'minlength':   'Password should contain 6 characters',
        }
    };

    constructor(
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        private route: ActivatedRoute,
        private adminService: AdminService,
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

        this.resetPassForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    resetPass(){
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            let custObj = {};
            custObj['_id']=this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.adminService.resetPassword(custObj).subscribe((data)=>{
                console.log("data");
                console.log(data);
                if (!data.error) {
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/login']);
                }else{
                    this._flashMessagesService.show('Connection Error', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }else{
            this._flashMessagesService.show('Password dont match. Please enter same password', { cssClass: 'alert-danger', timeout: 5000 });
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