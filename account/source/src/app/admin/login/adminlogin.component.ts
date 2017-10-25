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
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(){
        this.adminService.adminLogin(this.loginForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    localStorage.setItem('currentAdmin', JSON.stringify(data.message));
                    this._flashMessagesService.show('Login Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate([this.returnUrl]);
                }else{
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                this.router.navigate(['admin/login']);
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

    constructor(
        private lf: FormBuilder, 
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute
        ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', Validators.required]
        });
    }

    forgetPassword(){
        this.adminService.adminForgetPassword(this.loginForm.value).subscribe(
            (data) => {
                if (data.status) {
                    this.router.navigate(['admin/login']);
                }else{
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
                this.router.navigate(['admin/login']);
            }
            );
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
        private adminService: AdminService,
        private lf: FormBuilder
        ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            console.log("this.id");
            console.log(this.id);
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
            this.adminService.adminUpdate(custObj).subscribe((data)=>{
                if (!data.error) {
                    this._flashMessagesService.show('Password changed Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/login']);
                    console.log("data");
                    console.log(data);
                }else{
                    this._flashMessagesService.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
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