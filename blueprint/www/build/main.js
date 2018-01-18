webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export imageUrl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return url; });
/* unused harmony export frontUrl */
var imageUrl = 'http://104.236.69.166:4003/uploads/';
var url = 'http://104.236.69.166:4003/';
var frontUrl = 'http://104.236.69.166:3000/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordPage = (function () {
    function ChangePasswordPage(lf, navCtrl, toastCtrl, customerService) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.resetForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            newpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        if (localStorage.getItem('currentCustomer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
        }
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
    };
    ChangePasswordPage.prototype.changePass = function () {
        var _this = this;
        this.customerService.changePassword(this.resetForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getToast(data.message);
                _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust) {
                    localStorage.removeItem('currentCustomer');
                    localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
                    _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */]);
                });
            }
            else {
                _this.getToast(data.message);
            }
        });
    };
    ChangePasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-password',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\profile\changepassword.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="resetForm" (ngSubmit)="changePass()">\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="oldpassword" placeholder="Old Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="newpassword" placeholder="New Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!resetForm.valid">Change Password</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\profile\changepassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */]])
], ChangePasswordPage);

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileUpdatePage = (function () {
    function ProfileUpdatePage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.profileForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.profileForm.patchValue(this.currentCustomer);
    }
    ProfileUpdatePage.prototype.ionViewDidLoad = function () { };
    ProfileUpdatePage.prototype.update = function () {
        var _this = this;
        this.customerService.updateCustomer(this.profileForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getToast("Profile Updated");
                _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust) {
                    localStorage.removeItem('currentCustomer');
                    localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile__["a" /* ProfilePage */]);
                });
            }
        });
    };
    ProfileUpdatePage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ProfileUpdatePage;
}());
ProfileUpdatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile-update',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\profile\profileupdate.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>profile</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="profileForm" (ngSubmit)="update()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="text" disabled="true" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="username" type="text" disabled="true" placeholder="Username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="phonenumber" type="text" placeholder="Phone no."></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!profileForm.valid">Submit</button>\n\n\n\n        </form>\n\n        <!-- <button ion-button clear (click)="goToChangePassword()">Change Password</button> -->\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\blueprint\customer\src\pages\profile\profileupdate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], ProfileUpdatePage);

//# sourceMappingURL=profileupdate.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.forgetForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    ForgetPasswordPage.prototype.importonViewDidLoad = function () {
    };
    ForgetPasswordPage.prototype.forgetPass = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.forgetPassword(this.forgetForm.value).subscribe(function (data) {
            if (!data.error) {
                loading.dismiss();
                _this.getToast('Email Sent Successfully');
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
            else {
                loading.dismiss();
                _this.getToast(data.data);
            }
        });
    };
    ForgetPasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forget-password',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\login\forgetpassword.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Forget Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="forgetForm" (ngSubmit)="forgetPass()" >\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="email" placeholder="Enter Email Address" type="text"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!forgetForm.valid">Submit</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\login\forgetpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], ForgetPasswordPage);

//# sourceMappingURL=forgetpassword.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.signUpForm = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    RegisterPage.prototype.importonViewDidLoad = function () {
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.addCustomer(this.signUpForm.value).subscribe(function (data) {
            if (!data.error) {
                console.log("data");
                console.log(data);
                loading.dismiss();
                _this.getToast('Registered Successfully');
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
            else {
                loading.dismiss();
                _this.getToast('Email/Username Already Exist');
            }
        });
    };
    RegisterPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\login\register.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="signUpForm" (ngSubmit)="register()" >\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="firstname" class="form-control" placeholder="firstname" type="text" autofocus></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="lastname" class="form-control" placeholder="lastname" type="text"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="phonenumber" class="form-control" placeholder="Telephone *" type="number"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="username" class="form-control" placeholder="Choose your Username" type="text"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="email" class="form-control" placeholder="E-mail"  type="email"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="password" class="form-control" placeholder="Password" type="password" value=""></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!signUpForm.valid">Submit</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\login\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_forgetpassword__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_register__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_profile_profileupdate__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_profile_changepassword__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_index__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















/*Services*/

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_9__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profileupdate__["a" /* ProfileUpdatePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_profile_changepassword__["a" /* ChangePasswordPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_9__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profileupdate__["a" /* ProfileUpdatePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_profile_changepassword__["a" /* ChangePasswordPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__service_index__["a" /* CustomersService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, alertCtrl, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'My Profile', component: __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */] }
        ];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    MyApp.prototype.logout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        localStorage.removeItem('currentCustomer');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        prompt.present();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\blueprint\customer\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button menuClose padding-left class="logoutBtn" (click)="logout()">\n        <ion-icon name="power" item-start></ion-icon> Logout\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\blueprint\customer\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_service__ = __webpack_require__(271);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(272);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__(274);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_service__ = __webpack_require__(275);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__restaurants_service__ = __webpack_require__(276);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__promotions_service__ = __webpack_require__(277);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__kitchenmenu_service__ = __webpack_require__(278);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__kitchenitem_service__ = __webpack_require__(279);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__master_service__ = __webpack_require__(280);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__customer_service__ = __webpack_require__(30);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__customer_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__order_service__ = __webpack_require__(281);
/* unused harmony namespace reexport */











//# sourceMappingURL=index.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AlertService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.message = { type: 'success', text: message };
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.message = { type: 'error', text: message };
    };
    AlertService.prototype.getMessage = function () {
        return this.message;
    };
    AlertService.prototype.deleteMessage = function () {
        delete this.message;
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AlertService);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AuthService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.getUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'users/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwner = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'owners/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwnerById = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'users/' + id)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.ownerLogout = function () {
        localStorage.removeItem('currentOwner');
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.getStatus = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'status');
    };
    AuthService.prototype.resetPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'owners/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.resetAdminPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'users/admin/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'owners/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPasswordAdmin = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'users/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UsersService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersService = (function () {
    //url: string = 'http://34.209.114.118:4003/users/';
    //url: string = 'http://localhost:4003/users/';
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.updateAdmin = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + 'admin/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addAdmin = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + 'admin/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateUser = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAllAdmin = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + 'admin/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateOwnerPassword = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + 'change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAdminOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + '/admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteAdminOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + 'admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    return UsersService;
}());
UsersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], UsersService);

//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DriversService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DriversService = (function () {
    function DriversService(http) {
        this.http = http;
    }
    DriversService.prototype.addDriver = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'driver/', data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.updateDriver = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'driver/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'driver/')
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getRestaurantDrivers = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant-drivers/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.myOrder = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    return DriversService;
}());
DriversService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], DriversService);

//# sourceMappingURL=drivers.service.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RestaurantsService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Manvi on 14-Apr-17.
 */



var RestaurantsService = (function () {
    function RestaurantsService(http) {
        this.http = http;
    }
    RestaurantsService.prototype.addRestaurant = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateRestaurant = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUp = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateDelivery = function (data) {
        console.log("data");
        console.log(data);
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'delivery-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateNotification = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant-notification/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteNotification = function (id, index) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getNotification = function (id, index) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editNotification = function (index, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/notification/' + data._id + '/' + index, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUpHours = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/' + data._id, data.result)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.activateMail = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'owners/mailactivate/' + data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.emailConfirm = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'owners/account-confirm/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateLocation = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'location-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.addDeliveryZone = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'deliveryzone/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.removeDeliveryZone = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZone = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZoneUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'deliveryzone/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAllDeliveryZone = function (id) {
        console.log(id);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'deliveryzones/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/')
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOwnerRestaurants = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'owner-restaurants/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    return RestaurantsService;
}());
RestaurantsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], RestaurantsService);

//# sourceMappingURL=restaurants.service.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PromotionsService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Manvi on 14-Apr-17.
 */



var PromotionsService = (function () {
    function PromotionsService(http) {
        this.http = http;
    }
    PromotionsService.prototype.addPromotion = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'promotion/', data)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.updatePromotion = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'promotion/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'promotion/')
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'promotion/' + id)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'promotion/' + id)
            .map(function (response) { return response.json(); });
    };
    return PromotionsService;
}());
PromotionsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], PromotionsService);

//# sourceMappingURL=promotions.service.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KitchenMenuService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KitchenMenuService = (function () {
    function KitchenMenuService(http) {
        this.http = http;
    }
    KitchenMenuService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'menu/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.updateMenu = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'menu/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAll = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'menu-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.adddetailAddOn = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addon/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAllAddOn = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addon-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupDetailEditser = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupRemove = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupEditUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenMenuService;
}());
KitchenMenuService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], KitchenMenuService);

//# sourceMappingURL=kitchenmenu.service.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KitchenItemService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KitchenItemService = (function () {
    function KitchenItemService(http) {
        this.http = http;
    }
    KitchenItemService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenu = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenuAddOn = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'itemaddon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item/')
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAllItems = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeAddOnToSubmenu = function (data) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'itemaddon/' + data._id + '/' + data.indexi)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editAddOnToSubmenu = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'itemaddon/' + data.id + '/' + data.submenuid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateEditMenuAddOn = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'itemaddonedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.addChoice = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addonchoice/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeChoice = function (data) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addonchoice/' + data._id + '/' + data.index)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getEditChoice = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addonchoice/' + data.id + '/' + data.cid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editSubAddOnUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'addonchoiceedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenItemService;
}());
KitchenItemService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], KitchenItemService);

//# sourceMappingURL=kitchenitem.service.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MasterService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MasterService = (function () {
    function MasterService(http) {
        this.http = http;
    }
    MasterService.prototype.addLanguage = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'language/', data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.updateLanguage = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'language/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getAllLanguage = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'language/')
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getOneLanguage = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.deleteOneLanguage = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    return MasterService;
}());
MasterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MasterService);

//# sourceMappingURL=master.service.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export OrderService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
    }
    OrderService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/')
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.overview = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/overview/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.client = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/client/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.orders = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/list/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.customerOrders = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/customer/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getMethodChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/method/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getResultChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/results/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getTypeChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/type/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getPaymentChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/payment/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/items/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getAllSaleChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/all-sale/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemCategoryChart = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'reporting/item-category/' + data.id + '/' + data.menuid + '/' + data.days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getDetail = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return OrderService;
}());
OrderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], OrderService);

//# sourceMappingURL=order.service.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomersService = (function () {
    function CustomersService(http) {
        this.http = http;
    }
    CustomersService.prototype.getCustomer = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.getOneCustomer = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/' + id)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getLatLng = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/add-lat-lng', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.customerLogout = function (id) {
        localStorage.removeItem(id);
    };
    CustomersService.prototype.addCustomer = function (data) {
        console.log(data);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/register', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.updateCustomer = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/forget-pass', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.addOrder = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/add', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.orderPlaced = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'order/order-placed', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.changePassword = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["a" /* url */] + 'customer/change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return CustomersService;
}());
CustomersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], CustomersService);

//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__changepassword__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profileupdate__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilePage = (function () {
    function ProfilePage(nav, navCtrl, customerService) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.getCustomer();
    }
    ProfilePage.prototype.ionViewDidLoad = function () { };
    ProfilePage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(function (cust) {
            _this.currentCustomer = cust.message;
        });
    };
    ProfilePage.prototype.goToChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__changepassword__["a" /* ChangePasswordPage */]);
    };
    ProfilePage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profileupdate__["a" /* ProfileUpdatePage */]);
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\profile\profile.html"*/'<ion-header>\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row *ngIf = "currentCustomer">\n            <ion-col col-1>\n                <ion-icon name="person" item-start></ion-icon>\n            </ion-col>\n            <ion-col col-4>Username:</ion-col>\n            <ion-col col-7>{{currentCustomer.username}}</ion-col>\n            <ion-col col-1>\n                <ion-icon name="mail" item-start></ion-icon>\n            </ion-col>\n            <ion-col col-4>Email:</ion-col>\n            <ion-col col-7>{{currentCustomer.email}}</ion-col>\n            <ion-col col-1>\n                <ion-icon name="person" item-start></ion-icon>\n            </ion-col>\n            <ion-col col-4>Name:</ion-col>\n            <ion-col col-7> {{currentCustomer.firstname}} {{currentCustomer.lastname}}</ion-col>\n            <ion-col col-1>\n                <ion-icon name="call" item-start></ion-icon>\n            </ion-col>\n            <ion-col col-4>Contact:</ion-col>\n            <ion-col col-7> {{currentCustomer.phonenumber}} </ion-col>\n        </ion-row>\n\n    </ion-grid>\n    <hr>\n    <ion-list>\n        <button ion-button icon-only (click)="goToChangePassword()"><ion-icon name="key" item-start></ion-icon></button>\n        <button ion-button icon-only item-end (click)="goToUpdateProfile()"><ion-icon name="create" ></ion-icon></button>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_customer_service__["a" /* CustomersService */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgetpassword__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Password must contain 8-25 characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Charecter'
            }
        };
        this.loginForm = this.lf.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
        this.menuCtrl.enable(false);
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.getCustomer(this.loginForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.status) {
                localStorage.setItem('currentCustomer', JSON.stringify(data.data));
                _this.menuCtrl.enable(true);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
            else {
                _this.getToast('Bad Credential');
                _this.loginForm.reset();
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Bad Credential');
            _this.loginForm.reset();
        });
    };
    LoginPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    LoginPage.prototype.goToForget = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__forgetpassword__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__register__["a" /* RegisterPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\blueprint\customer\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-list>\n		<form role="form" [formGroup]="loginForm" (ngSubmit)="login()" >\n			<ion-item class="topRadius">\n				<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n				<ion-input formControlName="username" placeholder="Username" type="text"></ion-input>\n			</ion-item>\n			<ion-item class="bottomRadius">\n				<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n				<ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n			</ion-item>\n			<button ion-button full color="secondary" [disabled]="!loginForm.valid">Login</button>\n		</form>	\n		<button ion-button clear class="white" (click)="goToForget()">Forget Password ?</button>\n		<button ion-button clear class="white" (click)="register()">Sign Up ?</button>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\blueprint\customer\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map