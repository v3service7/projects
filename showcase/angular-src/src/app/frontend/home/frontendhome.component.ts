import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { AuthService } from 'angular2-social-login';
import * as globalVariable from '../../global';
@Component({
    selector: 'app-frontendhome',
    templateUrl: './frontendhome.component.html',
    styleUrls: ['./frontendhome.component.css']
})
export class FrontendHomeComponent implements OnInit {
    token: any;
    returnUrl: string;
    customerLoginForm: FormGroup;
    customerSignupForm: FormGroup;
    customerForgetForm: FormGroup;
    // tslint:disable-next-line:max-line-length
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    formErrors = {
        'email': '',
        'password': '',
    };
    sub: any;
    validationMessages = {
        'email': {
            'required': 'Email is required.',
            'pattern': 'Email not in well format.'
        },
        'password': {
            'required': 'Phone Number is required.',
        }
    };

    constructor(
        public _auth: AuthService,
        private router: Router,
        private lf: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
        private zone: NgZone
    ) { }

    ngOnInit() {
        if (this.userService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.route.queryParams.subscribe((params: Params) => {
            this.token = params['q'];
        });
        if (this.token !== undefined) {
            this.userService.customerVerify(this.token).subscribe(
                (data) => {
                    if (!data.error) {
                        // localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                        this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                        /*   document.getElementById('login').style.display = 'block'; */
                        /* this.router.navigate(['/']); */
                    } else {
                        /* this.router.navigate(['/']); */
                        this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                        if (data.error && data.message === 'Email Activation Link Expire.') {
                            /*     document.getElementById('resendLink').style.display = 'block'; */
                        }
                    }
                },
                (err) => {
                    console.log('err at activation time');
                    console.log(err);
                    this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                    // this.router.navigate(['customer/login']);
                }
            );
        }
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

    instaFetchData() {
        const queryParams = this.router.routerState.snapshot.root.queryParams;
        const code = queryParams['code'];
        const error = queryParams['error'];
        const error_description = queryParams['error_description'];
        if (code) {
            console.log(code);
            console.log(error);
            this.userService.instaService(code).subscribe((instaResponse) => {
                const resObj = JSON.parse(instaResponse);
                if (typeof resObj.code === 'undefined' && resObj.code !== 400) {
                    const obj = {};
                    obj['role'] = 'User';
                    obj['status'] = true;
                    obj['email'] = resObj['user']['username'];
                    obj['password'] = resObj['user']['id'];
                    obj['id'] = resObj['user']['id'];
                    obj['provider'] = 'instagram';
                    obj['image'] = resObj['user']['profile_picture'];
                    obj['firstname'] = resObj['user']['full_name'];
                    this.userService.socialValidateUser(obj).subscribe((loggedUser) => {
                        if (!loggedUser.success) {
                            this.userService.socialRegisterUser(obj).subscribe((newUser) => {
                                this.userService.socialValidateUser(obj).subscribe((loggedUserAuth) => {
                                    localStorage.setItem('id_token_customer', loggedUserAuth.token);
                                    localStorage.setItem('customer', JSON.stringify(loggedUserAuth.user));
                                    this.router.navigate(['dashboard']);
                                });
                            });
                        }

                        if (loggedUser.success) {
                            localStorage.setItem('id_token_customer', loggedUser.token);
                            localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                            this.router.navigate(['dashboard']);
                        }
                    });
                } else {
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
                    this.router.navigate(['/']);
                }
            });
        }
    }

    twitterFetchData() {
        const queryParams = this.router.routerState.snapshot.root.queryParams;
        const oauth_token = queryParams['oauth_token'];
        const oauth_verifier = queryParams['oauth_verifier'];
        if (oauth_verifier && oauth_token) {
            const requestSecret = localStorage.getItem('requestSecret');
            const obj = {};
            obj['oauth_verifier'] = oauth_verifier;
            obj['oauth_token'] = oauth_token;
            obj['requestSecret'] = requestSecret;
            this.userService.twitterFetchService(obj).subscribe((twitterResponse) => {
                console.log('------twitter-------');
                console.log(twitterResponse);
                console.log('------twitter-------');
                localStorage.removeItem('requestSecret');
                const obj = {};
                obj['role'] = 'User';
                obj['status'] = true;
                obj['email'] = twitterResponse['email'];
                obj['password'] = twitterResponse['id'];
                obj['id'] = twitterResponse['id'];
                obj['provider'] = 'twitter';
                obj['image'] = twitterResponse['profile_image_url_https'];
                obj['firstname'] = twitterResponse['screen_name'];
                this.userService.socialValidateUser(obj).subscribe((loggedUser) => {
                    if (!loggedUser.success) {
                        this.userService.socialRegisterUser(obj).subscribe((newUser) => {
                            this.userService.socialValidateUser(obj).subscribe((loggedUserOauth) => {
                                localStorage.setItem('id_token_customer', loggedUserOauth.token);
                                localStorage.setItem('customer', JSON.stringify(loggedUserOauth.user));
                                this.userService.mycategory().subscribe((category) => {
                                    if (!category.error) {
                                        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'view/' + category.message[0]._id;
                                    }
                                    this.router.navigate([this.returnUrl]);
                                });
                            });
                        });
                    } else {
                        localStorage.setItem('id_token_customer', loggedUser.token);
                        localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                        this.userService.mycategory().subscribe((category) => {
                            if (!category.error) {
                                this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'view/' + category.message[0]._id;
                            }
                            this.router.navigate([this.returnUrl]);
                        });
                    }
                });
            });
        }
    }

    signIn(provider) {
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                const obj = {};
                obj['role'] = 'User';
                obj['status'] = true;
                obj['email'] = data['email'];
                obj['password'] = data['uid'];
                obj['uid'] = data['uid'];
                obj['provider'] = data['provider'];
                obj['image'] = data['image'];
                const nameArr = data['name'].split(' ');
                obj['lastname'] = nameArr.pop();
                obj['firstname'] = nameArr.join(' ');
                // console.log(obj)
                this.userService.socialValidateUser(obj).subscribe((loggedUser) => {
                    /*console.log(loggedUser,provider)*/
                    if (!loggedUser.success) {
                        this.userService.socialRegisterUser(obj).subscribe((newUser) => {
                            this.userService.socialValidateUser(obj).subscribe((loggedUserOauth) => {
                                localStorage.setItem('id_token_customer', loggedUserOauth.token);
                                localStorage.setItem('customer', JSON.stringify(loggedUserOauth.user));
                                this.modelClose('login');
                                this.modelClose('signup');
                                this.userService.mycategory().subscribe((category) => {
                                    if (!category.error) {
                                        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'view/' + category.message[0]._id;
                                        setTimeout(() => {
                                            this.zone.run(() => {
                                                this.router.navigate([this.returnUrl]);
                                            });
                                        }, 500);
                                    }
                                });
                            });
                        });
                    }

                    if (loggedUser.success) {
                        localStorage.setItem('id_token_customer', loggedUser.token);
                        localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                        this.modelClose('login');
                        this.modelClose('signup');
                        this.userService.mycategory().subscribe((category) => {
                            if (!category.error) {
                                this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'view/' + category.message[0]._id;
                                setTimeout(() => {
                                    this.zone.run(() => {
                                        this.router.navigate([this.returnUrl]);
                                    });
                                }, 500);
                            }
                        });
                    }
                });
            }
        );
    }

    onLoginWithTwitter() {
        this.userService.twitterService().subscribe(
            (data) => {
                localStorage.setItem('requestSecret', data.requestSecret);
                window.location.href = data.url;
            }
        );
    }

    onLoginWithInstagram() {
        // tslint:disable-next-line:max-line-length
        window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=98349c5779404c6ea9c9aa59e0e3aeeb&redirect_uri=' + globalVariable.url + '&response_type=code';
    }

    signup() {
        this.userService.registerUser(this.customerSignupForm.value).subscribe(
            (data) => {
                this.modelClose('signup');
                if (!data.error) {
                    // tslint:disable-next-line:max-line-length
                    this._flashMessagesService.show('Registered  Successfully, Please check your mail.', { cssClass: 'alert-success', timeout: 5000 });
                    // this.router.navigate(['admin/dashboard']);
                } else {
                    this._flashMessagesService.show('Email already exist.', { cssClass: 'alert-danger', timeout: 5000 });
                }
            },
            (err) => {
                this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    login() {
        this.userService.validateUser(this.customerLoginForm.value).subscribe(
            (data) => {
                this.modelClose('login');
                if (!data.success) {
                    this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
                } else {
                    this.userService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show('Login  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.userService.mycategory().subscribe((category) => {
                        if (!category.error) {
                            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'view/' + category.message[0]._id;
                        }
                        this.router.navigate([this.returnUrl]);
                    });
                }
            },
            (err) => {
                this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    forgetPass() {
        this.userService.forgotPassword(this.customerForgetForm.value).subscribe(
            (data) => {
                this.modelClose('forget');
                if (!data.success) {
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                } else {
                    // this.userService.storeUserData(data.token, data.user);
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
                    // this.router.navigate(['dashboard']);
                }
            },
            (err) => {
                this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
            }
        );
    }

    onLoginFormValueChanged(data?: any) {
        if (!this.customerLoginForm) { return; }
        const form = this.customerLoginForm;

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    modelOpen(type) {
        if (type === 'login') {
            this.modelClose('forget');
            document.getElementById('loginModal').style.display = 'block';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }

        if (type === 'signup') {
            document.getElementById('signupModal').style.display = 'block';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }

        if (type === 'forget') {
            this.modelClose('login');
            document.getElementById('forgetPassModal').style.display = 'block';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }
    }

    modelClose(type) {
        if (type === 'login') {
            document.getElementById('loginModal').style.display = 'none';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
        }

        if (type === 'signup') {
            document.getElementById('signupModal').style.display = 'none';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
        }

        if (type === 'forget') {
            document.getElementById('forgetPassModal').style.display = 'none';
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
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
    id: any;

    constructor(
        private flashMessage: FlashMessagesService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
    }

    resetPassword() {
        if (this.password === this.cpassword) {
            const usrObj = {};
            usrObj['_id'] = this.id;
            usrObj['password'] = this.password;
            this.userService.resetPassword(usrObj).subscribe((data) => {
                if (!data.error) {
                    this.flashMessage.show(data.message, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });
                    this.router.navigate(['/']);
                } else {
                    this.flashMessage.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        } else {
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
    err = '';
    emailForm: FormGroup;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private lf: FormBuilder,
        private _flashMessagesService: FlashMessagesService) {
    }

    ngOnInit() {
        this.emailForm = this.lf.group({
            email: ['', Validators.required]
        });
        // subscribe to router event
        this.route.params.subscribe((params: Params) => {
            this.token = params['token'];
        });
        this.userService.customerVerify(this.token).subscribe(
            (data) => {
                if (!data.error) {
                    // localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    document.getElementById('login').style.display = 'block';
                    /* this.router.navigate(['/']); */
                } else {
                    /* this.router.navigate(['/']); */
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    if (data.error && data.message === 'Email Activation Link Expire.') {
                        document.getElementById('resendLink').style.display = 'block';
                    }
                }
            },
            (err) => {
                console.log('err at activation time');
                console.log(err);
                this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                // this.router.navigate(['customer/login']);
            }
        );
    }

    public resendActivationLink() {
        this.userService.resendActivationLink(this.emailForm.value).subscribe((data) => {
            if (!data.error) {
                this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1000);
            } else {
                this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        });
    }

    public goToLogin() {
        this.router.navigate(['/']);
    }
}


