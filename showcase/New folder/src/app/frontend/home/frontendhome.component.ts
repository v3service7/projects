import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-frontendhome',
  templateUrl: './frontendhome.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class FrontendHomeComponent implements OnInit {
    
    customerLoginForm: FormGroup;
    customerSignupForm: FormGroup;
    customerForgetForm: FormGroup;
    emailp : any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    formErrors = {
        'email' : '',
        'password' : '',
    };

    validationMessages = {
      'email' : {
          'required':      'Email is required.',
          'pattern'   :    'Email not in well format.'
      },
      'password' : {
          'required':      'Phone Number is required.',
      }
    };

  	constructor(
        private router:Router,
        private lf: FormBuilder,
        private userService : UserService,
    private _flashMessagesService: FlashMessagesService
    ) {}

  	ngOnInit() {
        this.customerSignupForm = this.lf.group({
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        });

        this.customerLoginForm = this.lf.group({
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        });

        this.customerForgetForm = this.lf.group({
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
        });

        this.customerLoginForm.valueChanges.subscribe(data => this.onLoginFormValueChanged(data));
        this.customerSignupForm.valueChanges.subscribe(data => this.onLoginFormValueChanged(data));
    }

    signup(){
        this.userService.registerUser(this.customerSignupForm.value).subscribe(
            (data) => {
                this.modelClose('signup')
                if (!data.error) {
                    this._flashMessagesService.show('Registered  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    //this.router.navigate(['admin/dashboard']);
                }else{
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    login(){
        this.userService.validateUser(this.customerLoginForm.value).subscribe(
            (data) => {
                this.modelClose('login')
                if (!data.success) {
                    this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
                }else{
                    this.userService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show('Login  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['dashboard']);

                }
            },
            (err)=>{
                this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    forgetPass(){
        this.userService.forgotPassword(this.customerForgetForm.value).subscribe(
            (data) => {
                console.log(data)
                this.modelClose('forget')
                if (!data.success) {
                    this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
                }else{
                    this.userService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show('Login  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['dashboard']);

                }
            },
            (err)=>{
                this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    onLoginFormValueChanged(data?: any) {
        if (!this.customerLoginForm) {return;  }
        const form = this.customerLoginForm;

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

  	modelOpen(type){
  		if (type == 'login') {
            this.modelClose('forget')
  			document.getElementById('loginModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:blur(20px)');
  		}

          if (type == 'signup') {
            document.getElementById('signupModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:blur(20px)')
          }

  		if (type == 'forget') {
            this.modelClose('login')
        	document.getElementById('forgetPassModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:blur(20px)')
  		}
  	}

  	modelClose(type){
  		if (type == 'login') {
  			document.getElementById('loginModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:none');
  		}

        if (type == 'signup') {
            document.getElementById('signupModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:none')
        }

  		if (type == 'forget') {
        	document.getElementById('forgetPassModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style','filter:none')
  		}
  	}
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class ResetComponent implements OnInit {

  password: String;
  cpassword: String;
  id : any;

    constructor(
      private flashMessage:FlashMessagesService,
      private userService:UserService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

    ngOnInit() { 
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
    }

    resetPassword(){

        if (this.password == this.cpassword) {
            let usrObj = {};
            usrObj['_id']=this.id;
            usrObj['password'] = this.password;
            this.userService.resetPassword(usrObj).subscribe((data)=>{
                if (!data.error) {
                  this.flashMessage.show(data.message, {
                cssClass: 'alert-success',
                timeout: 5000});
                    this.router.navigate(['/']);
                }else{
                    this.flashMessage.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }else{
            this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 5000 });
            return false;
        }
    }
}

@Component({
    selector: 'app-account-active',
    templateUrl: './account-active.component.html',
    styleUrls: ['./frontendhome.component.css']
})
export class AccountActiveComponent implements OnInit {
    token: any;
    err= '';
    emailForm : FormGroup;


    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private lf: FormBuilder,
        private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {

        this.emailForm = this.lf.group({
            email : ['', Validators.required]
        });


        // subscribe to router event
        this.route.params.subscribe((params: Params) => {
            this.token = params['token'];
        });
        this.userService.customerVerify(this.token).subscribe(
            (data) => {
                console.log("data at activation time");
                console.log(data);

                if (!data.error) {
                    //localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    document.getElementById('login').style.display = 'block';
                    //this.router.navigate(['customer/login']);
                }else {
                    //this.router.navigate(['customer/login']);
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    if (data.error && data.message == 'Email Activation Link Expire.') {
                        document.getElementById('resendLink').style.display = 'block';
                    }
                }
            },
            (err) => {

                console.log("err at activation time");
                console.log(err);

                this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                //this.router.navigate(['customer/login']);
            }
        );
    }

    public resendActivationLink(){
        this.userService.resendActivationLink(this.emailForm.value).subscribe((data)=>{
            if (!data.error) {
                this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(()=>{
                    this.router.navigate(['/']);
                },1000)
            }else{
                this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        })
    }

    public goToLogin(){
        this.router.navigate(['/']);
    }
}


