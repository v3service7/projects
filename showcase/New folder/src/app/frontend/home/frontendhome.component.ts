import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service'
import { AuthService } from "angular2-social-login";

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
    
    sub: any;

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
        public _auth: AuthService,
        private router:Router,
        private lf: FormBuilder,
        private userService : UserService,
        private _flashMessagesService: FlashMessagesService
    ) {}

  	ngOnInit() {
        this.twitterFetchData();
        this.instaFetchData();

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

    instaFetchData(){
        const queryParams = this.router.routerState.snapshot.root.queryParams;
        const code = queryParams['code'];
        const error = queryParams['error'];
        const error_description = queryParams['error_description'];
        if (code) {
            console.log(code)
            console.log(error)
            this.userService.instaService(code).subscribe((instaResponse)=>{
                let resObj = JSON.parse(instaResponse);
                console.log(resObj)

                if (typeof resObj.code == 'undefined' && resObj.code != 400) {
                    let obj = {};
                    obj['role']= 'User';
                    obj['status']= true;
                    obj['email']= resObj['user']['username'];
                    obj['password']= resObj['user']['id'];
                    obj['id']= resObj['user']['id'];
                    obj['provider']= 'instagram';
                    obj['image']= resObj['user']['profile_picture'];
                    obj['firstname']= resObj['user']['full_name'];
                    this.userService.socialValidateUser(obj).subscribe((loggedUser)=>{
                        if (!loggedUser.success) {
                            this.userService.socialRegisterUser(obj).subscribe((newUser)=>{
                                this.userService.socialValidateUser(obj).subscribe((loggedUser)=>{
                                    this.userService.storeUserData(loggedUser.token, loggedUser.user);
                                    this.router.navigate(['dashboard']);
                                });
                            });
                        }else{
                            this.userService.storeUserData(loggedUser.token, loggedUser.user);
                            this.router.navigate(['dashboard']);
                        }
                    })
                }else{
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
                    this.router.navigate(['/']);
                }
            })
        }
    }

    twitterFetchData(){
        const queryParams = this.router.routerState.snapshot.root.queryParams;
        const oauth_token = queryParams['oauth_token'];
        const oauth_verifier = queryParams['oauth_verifier'];
        if (oauth_verifier && oauth_token) {
            console.log(oauth_verifier,oauth_token)
            let requestSecret = localStorage.getItem('requestSecret');
            let obj = {};
            obj['oauth_verifier'] = oauth_verifier;
            obj['oauth_token'] = oauth_token;
            obj['requestSecret'] = requestSecret;
             this.userService.twitterFetchService(obj).subscribe((twitterResponse)=>{
                 localStorage.removeItem('requestSecret');
                let obj = {};
                obj['role']= 'User';
                obj['status']= true;
                obj['email']= twitterResponse['name'];
                obj['password']= twitterResponse['id'];
                obj['id']= twitterResponse['id'];
                obj['provider']= 'twitter';
                obj['image']= twitterResponse['profile_image_url_https'];
                obj['firstname']= twitterResponse['screen_name'];
                this.userService.socialValidateUser(obj).subscribe((loggedUser)=>{
                    if (!loggedUser.success) {
                        this.userService.socialRegisterUser(obj).subscribe((newUser)=>{
                            this.userService.socialValidateUser(obj).subscribe((loggedUserOauth)=>{
                                this.userService.storeUserData(loggedUserOauth.token, loggedUserOauth.user);
                                this.router.navigate(['dashboard']);
                            });
                        });
                    }else{
                        this.userService.storeUserData(loggedUser.token, loggedUser.user);
                        this.router.navigate(['dashboard']);
                    }
                })
             })
        }
    }

    signIn(provider){
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                //console.log(data)
                let obj = {};
                obj['role']= 'User';
                obj['status']= true;
                obj['email']= data['email'];
                obj['password']= data['uid'];
                obj['uid']= data['uid'];
                obj['provider']= data['provider'];
                obj['image']= data['image'];
                obj['firstname']= data['name'];
                //console.log(obj)
                this.userService.socialValidateUser(obj).subscribe((loggedUser)=>{
                    //console.log(loggedUser)
                    if (!loggedUser.success) {
                        this.userService.socialRegisterUser(obj).subscribe((newUser)=>{
                            this.userService.storeUserData(loggedUser.token, loggedUser.user);
                            this.router.navigate(['dashboard']);
                        });
                    }else{
                        this.userService.storeUserData(loggedUser.token, loggedUser.user);
                        this.router.navigate(['dashboard']);
                    }
                })
            }
        )
    }

    onLoginWithTwitter() {
        this.userService.twitterService().subscribe(
            (data) => {
                localStorage.setItem('requestSecret',data.requestSecret)
                window.location.href = data.url;
            }
        );
    }

    onLoginWithInstagram() {
        window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=98349c5779404c6ea9c9aa59e0e3aeeb&redirect_uri=https://measuremight.com:3002/&response_type=code`;
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
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
                }else{
                    //this.userService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    //this.router.navigate(['dashboard']);
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


