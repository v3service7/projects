import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AlertService, AuthService, UsersService } from '../service/index';

declare var toastr: any;

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styles: ['body{background-color:#fff;margin-top:0px;}'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
	  
  }  
}

@Component({
  selector: 'app-ownerregister',
  templateUrl: './ownerregister.component.html'
})
export class OwnerregisterComponent implements OnInit {

    loginForm: FormGroup;
    returnUrl: string;
    err: any;

      constructor(
        private lf: FormBuilder, 
        private ownerService: UsersService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) { }

      ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'owner/login';
          this.loginForm = this.lf.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
      }

    register(){
        this.ownerService.addUser(this.loginForm.value).subscribe(
            (data) => {
                toastr.success('Register successful','Success!');
                this.router.navigate([this.returnUrl]);
            }
        );
    }
}

@Component({
  selector: 'app-ownerlogin',
  templateUrl: './ownerlogin.component.html'
})
export class OwnerloginComponent implements OnInit {

  loginForm: FormGroup;
    returnUrl: string;
	err:any;

  	constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService
    ) { }


  	ngOnInit() {
        this.authService.ownerLogout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'owner/basic-detail';
        console.log(this.returnUrl);
  		this.loginForm = this.lf.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
  	}

    login(){
        this.authService.getOwner(this.loginForm.value).subscribe(
            (data) => {
                if (data.status) {
                    localStorage.setItem('currentOwner', JSON.stringify(data.data));
                    toastr.success('Login successful','Success!');
                    this.router.navigate([this.returnUrl]);
                }
                else{
                    toastr.error('Bad Credential','Error!');
                    this.router.navigate(['owner/login']);
                }
            }
        );
    }
}

@Component({
    selector: 'app-ownerautologin',
    template: ''
})
export class OwnerAutologinComponent implements OnInit {
    constructor( 
        private router: Router,
        private route: ActivatedRoute,        
        private authService: AuthService,        
        private alertService: AlertService        
        ) { }

    ngOnInit() {   
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.autologin(id);
        });
    }

    autologin(id){
        this.authService.getOwnerById(id).subscribe(
            (data) => {
                console.log(data);
                if (!data.error) {
                    localStorage.removeItem('currentOwner');              
                    localStorage.setItem('currentOwner', JSON.stringify(data.message));
                    console.log(JSON.parse(localStorage.getItem('currentOwner')));
                    toastr.success('Login successful','Success!');
                    //this.alertService.success('Login successful', true);                   
                    this.router.navigate(['owner/profile']);
                }
            }
        );
    }
}

@Component({
    selector: 'app-ownerprofile',
    templateUrl: './ownerprofile.component.html'
})
export class OwnerprofileComponent implements OnInit {
    ownerProfile: FormGroup;
    returnUrl: string;
    err: any;
    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private userService: UsersService,
        private router: Router,
        private alertService: AlertService,
        private _flashMessagesService: FlashMessagesService,
        private route: ActivatedRoute,
    ) { 
    }

    ngOnInit() {
        this.ownerProfile = this.lf.group({
            _id: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            phoneNo: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        });
        this.ownerProfile.patchValue(JSON.parse(localStorage.getItem('currentOwner')));
    }

    ownerUpdate(){
        this.userService.updateUser(this.ownerProfile.value).subscribe(
            (data) => {
                if (data.error) {
                    toastr.error(data.message.errmsg,'Error!');
                    //this._flashMessagesService.show(data.message.errmsg, { cssClass: 'alert-danger', timeout: 10000 });
                }else{
                    localStorage.removeItem('currentOwner');
                    localStorage.setItem('currentOwner', JSON.stringify(this.ownerProfile.value));
                    toastr.success('Profile updated successfully','Success!');
                    //this._flashMessagesService.show('Profile updated successfully', { cssClass: 'alert-success', timeout: 10000 });
                    this.router.navigate(['owner/profile']);
                }
            }
        );
    }
}

@Component({
    selector: 'app-ownerprofile',
    templateUrl: './ownerchangepassword.component.html'
})
export class OwnerchangepasswordComponent implements OnInit {

    ownerProfile: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private userService: UsersService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.ownerProfile = this.lf.group({
            _id: ['', Validators.required],
            oldpassword: ['', Validators.required],
            newpassword: ['', Validators.required]
        });
        this.ownerProfile.patchValue(JSON.parse(localStorage.getItem('currentOwner')));
        console.log(JSON.parse(localStorage.getItem('currentOwner')));
    }

    ownerUpdate(){
        this.userService.updateOwnerPassword(this.ownerProfile.value).subscribe(
            (data) => {
                if (data.error) {
                    toastr.error(data.message,'Error!');
                }else{
                    toastr.success(data.message,'Success!');
                    this.router.navigate(['owner/profile']);
                }
            }
        );
    }
}

@Component({
  selector: 'app-forget',
  templateUrl: './forgetPassword.component.html',
  styles: []
})
export class ForgetOwnerComponent implements OnInit {
    forgetForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute){}
    ngOnInit() {
        this.forgetForm = this.lf.group({
            email: ['', Validators.required]
          });
    }
    forgetPass(){
        console.log(this.forgetForm.value);
        this.authService.forgetPassword(this.forgetForm.value).subscribe(
            (data) => {
                toastr.info('check ur email', 'Email Sent!');
                this.router.navigate(['/owner/login']);
            }
        );
    }
}

@Component({
  selector: 'app-forget',
  templateUrl: './resetPasswordOwner.component.html',
  styles: []
})
export class ResetPasswordOwnerComponent implements OnInit {
    
    forgetForm: FormGroup;
    returnUrl: string;
    err:any;
    id:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute){}
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.forgetForm = this.lf.group({
            password: ['', Validators.required],
            newpassword: ['', Validators.required]
          });
    }

    forgetPass(){
        console.log(this.forgetForm.value);
        this.authService.resetPassword(this.id,this.forgetForm.value).subscribe(
            (data) => {
                toastr.info('check ur email', 'Email Sent!');
                //this.alertService.success('check ur email', true);
                this.router.navigate(['/owner/login']);
            }
        );
    }
}