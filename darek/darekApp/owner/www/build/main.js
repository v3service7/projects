webpackJsonp([1],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(110);
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
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.ownerProfile = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            oldpassword: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            newpassword: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]
        });
        this.ownerProfile.patchValue(JSON.parse(localStorage.getItem('currentOwner')));
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.ownerPasswordUpdate = function () {
        var _this = this;
        this.userService.updateOwnerPassword(this.ownerProfile.value).subscribe(function (data) {
            if (data.error) {
                _this.getToast(data.message);
            }
            else {
                _this.getToast('Password Has been changed Successfully');
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */]);
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
    ChangePasswordPage.prototype.goToChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */]);
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-password',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\change-password\change-password.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>Change Password</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="ownerProfile" (ngSubmit)="ownerPasswordUpdate()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="key" ios="ios-key" md="md-key"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="oldpassword" type="password" placeholder="Old Password"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="key" ios="ios-key" md="md-key"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="newpassword" type="password" placeholder="New Password"></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!ownerProfile.valid">Save</button>\n\n\n\n        </form>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\change-password\change-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
], ChangePasswordPage);

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__change_password_change_password__ = __webpack_require__(109);
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
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.profileForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            firstname: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            lastname: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            phoneNo: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
        });
        this.getOwner();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.getOwner = function () {
        var _this = this;
        var tempOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.userService.getOne(tempOwner._id).subscribe(function (data) {
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.currentOwner = data.message;
                _this.profileForm.patchValue(_this.currentOwner);
                localStorage.removeItem('currentOwner');
                localStorage.setItem('currentOwner', JSON.stringify(data.message));
            }
        });
    };
    ProfilePage.prototype.update = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.userService.updateUser(this.profileForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.getOwner();
                _this.getToast('Profile updated successfully');
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
        });
    };
    ProfilePage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ProfilePage.prototype.goToChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__change_password_change_password__["a" /* ChangePasswordPage */]);
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\profile\profile.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>Edit Profile</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="profileForm" (ngSubmit)="update()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="text" disabled="true" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="username" type="text" disabled="true" placeholder="Username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="phoneNo" type="text" placeholder="Phone no."></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!profileForm.valid">Submit</button>\n\n\n\n        </form>\n\n        <!-- <button ion-button clear (click)="goToChangePassword()">Change Password</button> -->\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 119:
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
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		292,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 161;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_auth_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(45);
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
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(nav, loadingCtrl, menuCtrl, lf, authService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.forgetForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        });
        this.menuCtrl.enable(false);
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.forgetPassword = function () {
        var _this = this;
        console.log(this.forgetForm.value);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.forgetPassword(this.forgetForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.status) {
                _this.getToast(data.message);
                _this.forgetForm.reset();
            }
            else {
                _this.getToast('Email Sent Successfully');
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Somthing went wrong');
            _this.forgetForm.reset();
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
    ForgetPasswordPage.prototype.goToLogin = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forget-password',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\forget-password\forget-password.html"*/'<!--\n\n  Generated template for the ForgetPasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar><!-- \n\n    <ion-title>ForgetPassword</ion-title> -->\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding  class="bg"  text-center>\n\n	<ion-list>\n\n		<form role="form" [formGroup]="forgetForm" (ngSubmit)="forgetPassword()" class="topMargin">\n\n			<ion-item class="topRadius bottomRadius">\n\n				<!-- <ion-label >Email</ion-label> -->\n\n				<ion-label> <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon> </ion-label>\n\n				<ion-input formControlName="email" placeholder="Email" type="email"></ion-input>\n\n			</ion-item>\n\n				<button full ion-button color="secondary" [disabled]="!forgetForm.valid">Submit</button>\n\n		\n\n		</form>	\n\n	<!-- 	<button ion-button clear (click)="goToLogin()">Login</button> -->\n\n	</ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\forget-password\forget-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__app_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
], ForgetPasswordPage);

//# sourceMappingURL=forget-password.js.map

/***/ }),

/***/ 20:
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

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_password_change_password__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile__ = __webpack_require__(110);
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
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var InfoPage = (function () {
    function InfoPage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.currentOwner = {};
        this.getOwner();
    }
    InfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    InfoPage.prototype.getOwner = function () {
        var _this = this;
        var tempOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.userService.getOne(tempOwner._id).subscribe(function (data) {
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.currentOwner = data.message;
                localStorage.removeItem('currentOwner');
                localStorage.setItem('currentOwner', JSON.stringify(data.message));
            }
        });
    };
    InfoPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    InfoPage.prototype.goToChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__change_password_change_password__["a" /* ChangePasswordPage */]);
    };
    InfoPage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__profile__["a" /* ProfilePage */]);
    };
    return InfoPage;
}());
InfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-info',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\profile\info.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>\n\n            <ion-icon name="person" item-start></ion-icon> &nbsp;Account</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-1>\n\n                <ion-icon name="person" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Username:</ion-col>\n\n            <ion-col col-7>{{currentOwner.username}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="mail" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Email:</ion-col>\n\n            <ion-col col-7>{{currentOwner.email}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="person" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Name:</ion-col>\n\n            <ion-col col-7> {{currentOwner.firstname}} {{currentOwner.lastname}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="call" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Contact:</ion-col>\n\n            <ion-col col-7> {{currentOwner.phoneNo}} </ion-col>\n\n        </ion-row>\n\n\n\n    </ion-grid>\n\n    <hr>\n\n    <ion-list>\n\n        <button ion-button icon-only (click)="goToChangePassword()"><ion-icon name="key" item-start></ion-icon></button>\n\n        <button ion-button icon-only item-end (click)="goToUpdateProfile()"><ion-icon name="create" ></ion-icon></button>\n\n\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\profile\info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__app_service_users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
], InfoPage);

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__customer_detail__ = __webpack_require__(208);
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
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyCustomerPage = (function () {
    function MyCustomerPage(modalCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.currentOwner = {};
        this.restaurants = {};
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }
    MyCustomerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    MyCustomerPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getClient(_this.restaurants._id);
        });
    };
    MyCustomerPage.prototype.getClient = function (id) {
        var _this = this;
        this.orderService.client(id).subscribe(function (users) {
            _this.client = users.message;
            _this.loading.dismiss();
        });
    };
    MyCustomerPage.prototype.cleintDetail = function (event, obj) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__customer_detail__["a" /* CustomerDetailPage */], { 'cusDetail': obj });
        modal.present();
    };
    MyCustomerPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getClient(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    return MyCustomerPage;
}());
MyCustomerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-customer',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-customer\my-customer.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>\n\n            <ion-icon name="people" item-start></ion-icon> &nbsp;Customers</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-list>\n\n        <ion-item *ngFor="let p of client" (click)="cleintDetail($event,p)">\n\n            <ion-avatar item-start>\n\n                <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png">\n\n            </ion-avatar>\n\n            <h2>\n\n                {{p.firstname}} {{p.lastname}}</h2>\n\n\n\n            <p>{{p.phonenumber}}</p>\n\n\n\n\n\n        </ion-item>\n\n\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-customer\my-customer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__["a" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__["a" /* OrderService */]])
], MyCustomerPage);

//# sourceMappingURL=my-customer.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_order_order_detail__ = __webpack_require__(43);
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
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerDetailPage = (function () {
    function CustomerDetailPage(viewCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.selectedCustomer = this.navParams.get('cusDetail');
        this.getCustomers();
    }
    CustomerDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    CustomerDetailPage.prototype.getCustomers = function () {
        var _this = this;
        this.orderService.customerOrders(this.selectedCustomer._id).subscribe(function (users) {
            _this.myOrders = users.message;
        });
    };
    CustomerDetailPage.prototype.orderDetail = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__my_order_order_detail__["a" /* OrderDetailPage */], {
            item: obj
        });
    };
    CustomerDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return CustomerDetailPage;
}());
CustomerDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-customer-detail',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-customer\customer-detail.html"*/'<!-- <ion-header>\n\n	<ion-navbar>\n\n		<button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>Customer Detail</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n-->\n\n\n\n<ion-header>\n\n    <ion-toolbar color="secondary">\n\n        <ion-title>\n\n            Description\n\n        </ion-title>\n\n        <ion-buttons start>\n\n            <button ion-button (click)="dismiss()">\n\n				<span ion-text color="primary" showWhen="ios">Cancel</span>\n\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n			</button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list>\n\n        <ion-item>\n\n            <ion-icon name="person" item-start></ion-icon> {{selectedCustomer.firstname}} {{selectedCustomer.lastname}}\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-icon name="mail" item-start></ion-icon> {{selectedCustomer.email}}\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-icon name="call" item-start></ion-icon> {{selectedCustomer.phonenumber}}\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-card>\n\n        <ion-card-header>Orders</ion-card-header>\n\n        <ion-card-content>\n\n            <ion-item *ngFor="let order of myOrders" (click)="orderDetail($event,order)">\n\n                <h2>{{order._id.substr(18,6)}}</h2>\n\n                <p>{{order.status}}</p>\n\n            </ion-item>\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-customer\customer-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__["a" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* OrderService */]])
], CustomerDetailPage);

//# sourceMappingURL=customer-detail.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssignOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_detail__ = __webpack_require__(43);
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
 * Generated class for the MyDriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AssignOrderPage = (function () {
    function AssignOrderPage(modalCtrl, navCtrl, orderService, lf, loadingCtrl, toastCtrl, navParams, restaurantsService, driversService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.orderService = orderService;
        this.lf = lf;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.currentOwner = {};
        this.restaurants = {};
        this.selectedOrder = {};
        this.selectedOrder = navParams.get('order');
        console.log(this.selectedOrder);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getDrivers(this.selectedOrder.restaurantId._id);
        this.driverForm = this.lf.group({
            driverId: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
        });
    }
    AssignOrderPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getDrivers(_this.restaurants._id);
        });
    };
    AssignOrderPage.prototype.driverAssign = function (event, driver) {
        console.log(driver);
        console.log(this.selectedOrder);
        /*this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getDrivers(this.restaurants._id);
        });*/
    };
    AssignOrderPage.prototype.doSubmit = function (event) {
        var _this = this;
        var objUpdate = {};
        objUpdate['_id'] = this.selectedOrder._id;
        objUpdate['driverId'] = this.driverForm.value.driverId;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.orderService.getUpdate(objUpdate).subscribe(function (data) {
            loading.dismiss();
            _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__order_detail__["a" /* OrderDetailPage */]);
            _this.getToast('Order Assigned to Driver successfully');
        });
        console.log('Submitting form', objUpdate);
    };
    AssignOrderPage.prototype.getDrivers = function (resID) {
        var _this = this;
        this.driversService.getRestaurantDrivers(resID).subscribe(function (users) {
            _this.drivers = users.message;
            _this.loading.dismiss();
        }, function (err) {
            _this.loading.dismiss();
            _this.getToast('Some thing went wrong! Try Later.');
        });
    };
    AssignOrderPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    AssignOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyDriverPage');
    };
    AssignOrderPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getDrivers(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    return AssignOrderPage;
}());
AssignOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-assign-order',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\assign-order.html"*/'<!--\n\n  Generated template for the MyDriverPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>Select Drivers</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    <form (submit)="doSubmit($event)" [formGroup]="driverForm">\n\n        <ion-list radio-group formControlName="driverId">\n\n            <ion-item *ngFor="let driver of drivers">\n\n                <ion-label>{{driver.firstname}} {{driver.lastname}}</ion-label>\n\n                <ion-radio [checked]="\'true\'" [value]="driver._id"></ion-radio>\n\n                <!-- <h2>{{driver.firstname}} {{driver.lastname}}</h2>\n\n				<p>{{driver.phoneNo}}</p> -->\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!driverForm.valid">Assigned</button>\n\n\n\n        </ion-list>\n\n    </form>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\assign-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* OrderService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* DriversService */]])
], AssignOrderPage);

//# sourceMappingURL=assign-order.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_detail__ = __webpack_require__(43);
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
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyOrderPage = (function () {
    function MyOrderPage(actionSheetCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.currentOwner = {};
        this.restaurants = {};
    }
    MyOrderPage.prototype.ionViewDidEnter = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    };
    MyOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    MyOrderPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getOrders(_this.restaurants._id);
        });
    };
    MyOrderPage.prototype.getOrders = function (id) {
        var _this = this;
        this.orderService.orders(id).subscribe(function (users) {
            console.log("users.message");
            console.log(users.message);
            _this.orders = users.message;
            _this.tempOrdr = users.message;
            _this.loading.dismiss();
        });
    };
    MyOrderPage.prototype.cleintDetail = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_detail__["a" /* OrderDetailPage */], {
            item: obj
        });
    };
    MyOrderPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getOrders(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    MyOrderPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Status',
            buttons: [
                {
                    text: 'Accepted',
                    handler: function () {
                        _this.filterItems('Accepted');
                        console.log(_this.orders);
                    }
                }, {
                    text: 'Rejected',
                    handler: function () {
                        _this.filterItems('Rejected');
                        console.log(_this.orders);
                    }
                }, {
                    text: 'Missed',
                    handler: function () {
                        _this.filterItems('Missed');
                        console.log(_this.orders);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    MyOrderPage.prototype.filterItems = function (searchTerm) {
        this.orders = this.tempOrdr;
        var ordr = this.orders.filter(function (item) {
            console.log(item['status'].toLowerCase() == searchTerm.toLowerCase());
            return item['status'].toLowerCase() == searchTerm.toLowerCase();
        });
        this.orders = ordr;
    };
    return MyOrderPage;
}());
MyOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-order',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\my-order.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>\n\n            <ion-icon name="cart" item-start></ion-icon> &nbsp;Orders</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-list>\n\n        <ion-item text-right>\n\n            <button ion-button clear (click)="presentActionSheet()">  <ion-icon name="funnel"></ion-icon></button>\n\n        </ion-item>\n\n        <ion-item *ngFor="let order of orders" (click)="cleintDetail($event,order)">\n\n            <ion-avatar item-start>\n\n                <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/50992-200.png">\n\n            </ion-avatar>\n\n            # {{order._id.substr(18,6)}} \n\n            <p *ngIf="order.status == \'Accepted\'"><ion-icon name="thumbs-up" color="secondary"></ion-icon> {{order.status}}</p>\n\n            <p *ngIf="order.status != \'Accepted\'"><ion-icon name="thumbs-down" color="danger"></ion-icon> {{order.status}}</p>\n\n            <span class="fontSize12px"><ion-icon name="clock" ios="ios-clock" md="md-clock"></ion-icon> {{order.created_at | date:\'medium\' }}</span>\n\n\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\my-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__["a" /* RestaurantsService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__["a" /* OrderService */]])
], MyOrderPage);

//# sourceMappingURL=my-order.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddDriverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_driver__ = __webpack_require__(44);
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
 * Generated class for the Add Driver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddDriverPage = (function () {
    function AddDriverPage(modalCtrl, navCtrl, lf, loadingCtrl, toastCtrl, navParams, restaurantsService, driversService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.lf = lf;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.currentOwner = {};
        this.restaurants = {};
        this.addDriver = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            address: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            phoneNo: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleType: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleNo: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            restaurantId: []
        });
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }
    AddDriverPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
        });
    };
    AddDriverPage.prototype.savedriver = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.addDriver.controls['restaurantId'].setValue(this.restaurants._id);
        this.driversService.addDriver(this.addDriver.value).subscribe(function (data) {
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__my_driver__["a" /* MyDriverPage */]);
            _this.getToast('Driver added successfully');
        });
    };
    AddDriverPage.prototype.goToLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__my_driver__["a" /* MyDriverPage */]);
    };
    AddDriverPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    AddDriverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Add Driver');
    };
    return AddDriverPage;
}());
AddDriverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-driver',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\add-driver.html"*/'<!--\n\n  Generated template for the ForgetPasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>Add Driver</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="addDriver" (ngSubmit)="savedriver()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="email" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="key" ios="ios-key" md="md-key"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="pin" ios="ios-pin" md="md-pin"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="address" type="text" placeholder="Address"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="phoneNo" type="text" placeholder="Phone No."></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleType" type="text" placeholder="Vehicle Type"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleName" type="text" placeholder="Vehicle Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleNo" type="text" placeholder="Vehicle Number"></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!addDriver.valid">Submit</button>\n\n\n\n        </form>\n\n        <!--   <button ion-button clear (click)=goToLogin()>Go Back</button> -->\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\add-driver.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* DriversService */]])
], AddDriverPage);

//# sourceMappingURL=add-driver.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_driver__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__driver_edit__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_order_order_detail__ = __webpack_require__(43);
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
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DriverDetailPage = (function () {
    function DriverDetailPage(alertCtrl, viewCtrl, navCtrl, toastCtrl, loadingCtrl, navParams, restaurantsService, driverService) {
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.driverService = driverService;
        this.selectedDriver = this.navParams.get('driverDetail');
        this.getDriver();
    }
    DriverDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    DriverDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DriverDetailPage.prototype.getDriver = function () {
        var _this = this;
        this.driverService.myOrder(this.selectedDriver._id).subscribe(function (users) {
            _this.myOrders = users.message;
        });
    };
    DriverDetailPage.prototype.orderDetail = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__my_order_order_detail__["a" /* OrderDetailPage */], {
            item: obj
        });
    };
    DriverDetailPage.prototype.goToDeleteDriver = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Delete',
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
                        _this.driverService.deleteOne(id).subscribe(function (data) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__my_driver__["a" /* MyDriverPage */]);
                            _this.getToast('Driver Deleted Successfully');
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DriverDetailPage.prototype.goToEditDriver = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__driver_edit__["a" /* EditDriverPage */], {
            driver: obj
        });
    };
    DriverDetailPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return DriverDetailPage;
}());
DriverDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-driver-detail',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\driver-detail.html"*/'<!-- <ion-header>\n\n    <ion-toolbar color="secondary">\n\n        <ion-title>\n\n            Driver Details\n\n        </ion-title>\n\n        <ion-buttons start>\n\n            <button ion-button (click)="dismiss()">\n\n				<span ion-text color="primary" showWhen="ios">Cancel</span>\n\n				<ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n			</button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header> -->\n\n<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title><ion-icon name="people"></ion-icon> &nbsp;Driver Detail</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list>\n\n        <button ion-button icon-only (click)="goToEditDriver($event,selectedDriver)">\n\n			<ion-icon name="create" ios="ios-create" md="md-create"></ion-icon>\n\n		</button>\n\n        <button ion-button icon-only color="danger" (click)="goToDeleteDriver(selectedDriver._id)">\n\n			<ion-icon name="remove-circle" ios="ios-remove-circle" md="md-remove-circle"> </ion-icon>\n\n		</button>\n\n        <ion-item>\n\n            <p>Name: {{selectedDriver.firstname}} {{selectedDriver.lastname}}</p>\n\n        </ion-item>\n\n        <ion-item>\n\n            <p>Email: {{selectedDriver.email}}</p>\n\n        </ion-item>\n\n        <ion-item>\n\n            <p>Phone No: {{selectedDriver.phoneNo}}</p>\n\n        </ion-item>\n\n        <ion-item>\n\n            <p>Address: {{selectedDriver.address}}</p>\n\n        </ion-item>\n\n        <ion-item>\n\n            <p>Vehicle Name: {{selectedDriver.vehicleName}}</p>\n\n        </ion-item>\n\n        <ion-item>\n\n            <p>Vehicle Number: {{selectedDriver.vehicleNo}}</p>\n\n        </ion-item>\n\n\n\n        <ion-card>\n\n            <ion-card-header>Orders</ion-card-header>\n\n            <ion-card-content>\n\n                <ion-item *ngFor="let order of myOrders" (click)="orderDetail($event,order)">\n\n                    <h2>{{order._id.substr(18,6)}}</h2>\n\n                    <p>{{order.status}}</p>\n\n                </ion-item>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\driver-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* DriversService */]])
], DriverDetailPage);

//# sourceMappingURL=driver-detail.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditDriverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_driver__ = __webpack_require__(44);
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
 * Generated class for the Add Driver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditDriverPage = (function () {
    function EditDriverPage(modalCtrl, navCtrl, lf, loadingCtrl, toastCtrl, navParams, restaurantsService, driversService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.lf = lf;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.currentOwner = {};
        this.restaurants = {};
        this.selectedDriver = {};
        this.selectedDriver = navParams.get('driver');
        this.updateDriver = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            address: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            phoneNo: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleType: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            vehicleNo: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            restaurantId: [],
            _id: []
        });
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        console.log(this.selectedDriver);
        this.updateDriver.patchValue(this.selectedDriver);
        this.getRestaurants();
    }
    EditDriverPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
        });
    };
    EditDriverPage.prototype.getDriver = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
        });
    };
    EditDriverPage.prototype.updatedriver = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.updateDriver.controls['_id'].setValue(this.selectedDriver._id);
        this.driversService.updateDriver(this.updateDriver.value).subscribe(function (data) {
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__my_driver__["a" /* MyDriverPage */]);
            _this.getToast('Driver Updated successfully');
        });
    };
    EditDriverPage.prototype.goToLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__my_driver__["a" /* MyDriverPage */]);
    };
    EditDriverPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    EditDriverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Add Driver');
    };
    return EditDriverPage;
}());
EditDriverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-driver',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\edit-driver.html"*/'<!--\n\n  Generated template for the ForgetPasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>Edit Driver</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="updateDriver" (ngSubmit)="updatedriver()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="email" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="key" ios="ios-key" md="md-key"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="pin" ios="ios-pin" md="md-pin"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="address" type="text" placeholder="Address"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="phoneNo" type="text" placeholder="Phone No."></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleType" type="text" placeholder="Vehicle Type"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleName" type="text" placeholder="Vehicle Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="vehicleNo" type="text" placeholder="Vehicle No."></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full [disabled]="!updateDriver.valid">Submit</button>\n\n\n\n        </form>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\edit-driver.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* DriversService */]])
], EditDriverPage);

//# sourceMappingURL=driver-edit.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyNotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
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
 * Generated class for the MyNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyNotificationPage = (function () {
    function MyNotificationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MyNotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyNotificationPage');
    };
    return MyNotificationPage;
}());
MyNotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-notification',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-notification\my-notification.html"*/'<!--\n\n  Generated template for the MyNotificationPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n        <ion-title>MyNotification</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-notification\my-notification.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MyNotificationPage);

//# sourceMappingURL=my-notification.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_forget_password_forget_password__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_change_password_change_password__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_profile_info__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_my_customer_my_customer__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_my_customer_customer_detail__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_my_order_my_order__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_my_order_order_detail__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_my_order_assign_order__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_my_driver_my_driver__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_my_driver_driver_detail__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_my_driver_add_driver__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_my_driver_driver_edit__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_my_notification_my_notification__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__service_index__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











/*import { LoginPageModule } from '../pages/login/login.module';*/














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
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_forget_password_forget_password__["a" /* ForgetPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_change_password_change_password__["a" /* ChangePasswordPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_14__pages_profile_info__["a" /* InfoPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_my_customer_my_customer__["a" /* MyCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_my_customer_customer_detail__["a" /* CustomerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_my_driver_my_driver__["a" /* MyDriverPage */], __WEBPACK_IMPORTED_MODULE_22__pages_my_driver_add_driver__["a" /* AddDriverPage */], __WEBPACK_IMPORTED_MODULE_21__pages_my_driver_driver_detail__["a" /* DriverDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_my_driver_driver_edit__["a" /* EditDriverPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_my_order_my_order__["a" /* MyOrderPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_my_order_order_detail__["a" /* OrderDetailPage */], __WEBPACK_IMPORTED_MODULE_19__pages_my_order_assign_order__["a" /* AssignOrderPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_my_notification_my_notification__["a" /* MyNotificationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            /*LoginPageModule,*/
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_forget_password_forget_password__["a" /* ForgetPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_change_password_change_password__["a" /* ChangePasswordPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_14__pages_profile_info__["a" /* InfoPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_my_customer_my_customer__["a" /* MyCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_my_customer_customer_detail__["a" /* CustomerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_my_driver_my_driver__["a" /* MyDriverPage */], __WEBPACK_IMPORTED_MODULE_22__pages_my_driver_add_driver__["a" /* AddDriverPage */], __WEBPACK_IMPORTED_MODULE_21__pages_my_driver_driver_detail__["a" /* DriverDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_my_driver_driver_edit__["a" /* EditDriverPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_my_order_my_order__["a" /* MyOrderPage */], __WEBPACK_IMPORTED_MODULE_18__pages_my_order_order_detail__["a" /* OrderDetailPage */], __WEBPACK_IMPORTED_MODULE_19__pages_my_order_assign_order__["a" /* AssignOrderPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_my_notification_my_notification__["a" /* MyNotificationPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_25__service_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_25__service_index__["b" /* DriversService */],
            __WEBPACK_IMPORTED_MODULE_25__service_index__["e" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_25__service_index__["d" /* RestaurantsService */],
            __WEBPACK_IMPORTED_MODULE_25__service_index__["c" /* OrderService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_service__ = __webpack_require__(284);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(86);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__(58);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__users_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_service__ = __webpack_require__(285);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__drivers_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__restaurants_service__ = __webpack_require__(42);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__restaurants_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__promotions_service__ = __webpack_require__(286);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__kitchenmenu_service__ = __webpack_require__(287);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__kitchenitem_service__ = __webpack_require__(288);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__master_service__ = __webpack_require__(289);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__customer_service__ = __webpack_require__(290);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__order_service__ = __webpack_require__(53);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_10__order_service__["a"]; });











//# sourceMappingURL=index.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profile_info__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_my_customer_my_customer__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_my_order_my_order__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_my_driver_my_driver__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_my_notification_my_notification__ = __webpack_require__(214);
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
    function MyApp(alertCtrl, platform, statusBar, splashScreen) {
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        //rootPage: any = MyOrderPage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Account', icon: 'contact', component: __WEBPACK_IMPORTED_MODULE_6__pages_profile_info__["a" /* InfoPage */] },
            { title: 'Customers', icon: 'people', component: __WEBPACK_IMPORTED_MODULE_7__pages_my_customer_my_customer__["a" /* MyCustomerPage */] },
            { title: 'Orders', icon: 'cart', component: __WEBPACK_IMPORTED_MODULE_8__pages_my_order_my_order__["a" /* MyOrderPage */] },
            { title: 'Drivers', icon: 'people', component: __WEBPACK_IMPORTED_MODULE_9__pages_my_driver_my_driver__["a" /* MyDriverPage */] },
            { title: 'Notifications', icon: 'notifications', component: __WEBPACK_IMPORTED_MODULE_10__pages_my_notification_my_notification__["a" /* MyNotificationPage */] },
        ];
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
    }
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
                        localStorage.removeItem('currentOwner');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-content color="dark" class="side">\n\n        <ion-list class="menu1">\n\n            <button class="sideLink" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n                <ion-icon name="{{p.icon}}" item-start></ion-icon> {{p.title}}\n\n            </button>\n\n            <button menuClose ion-item (click)="logout()">\n\n                <ion-icon name="power" item-start></ion-icon> Logout\n\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\app\app.html"*/,
        styles: ["\n    .list-md .item-block .item-inner {\n        border-bottom: 0px solid #dedede !important;\n    }\n    \n    "]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
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

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriversService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PromotionsService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KitchenMenuService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KitchenItemService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MasterService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomersService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-left></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-right>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assign_order__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {  OrderDetailPage } from './order-detail';
/**
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderDetailPage = (function () {
    function OrderDetailPage(alertCtrl, toastCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.selectedOrder = navParams.get('item');
    }
    OrderDetailPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter MyCustomerPage');
        console.log(this.selectedOrder);
        this.getOrderDetail(this.selectedOrder);
    };
    OrderDetailPage.prototype.ionViewDidLoad = function () {
    };
    OrderDetailPage.prototype.rejectPrompt = function (obj, status) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Oreder ' + status,
            message: "Enter a message ",
            inputs: [
                {
                    name: 'Message',
                    placeholder: 'Message'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var objUpdate = {};
                        objUpdate['_id'] = obj._id;
                        objUpdate['status'] = status;
                        objUpdate['custMessage'] = data.Message;
                        _this.updateStatus(objUpdate);
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderDetailPage.prototype.acceptPrompt = function (obj, status) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Oreder ' + status,
            message: "Enter a Time ",
            inputs: [
                {
                    name: 'Message',
                    placeholder: 'Message',
                    type: 'time'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var objUpdate = {};
                        objUpdate['_id'] = obj._id;
                        objUpdate['status'] = status;
                        objUpdate['custTime'] = data.Message;
                        _this.updateStatus(objUpdate);
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderDetailPage.prototype.updateStatus = function (obj) {
        var _this = this;
        console.log(obj);
        this.orderService.getUpdate(obj).subscribe(function (data) {
            console.log(data.message);
            _this.getOrderDetail(obj);
            _this.getToast('Order ' + status + ' successfully');
        });
    };
    OrderDetailPage.prototype.getOrderDetail = function (obj) {
        var _this = this;
        this.orderService.getDetail(obj._id).subscribe(function (data) {
            console.log(data.message);
            _this.selectedOrder = data.message;
            console.log(_this.selectedOrder);
        });
    };
    OrderDetailPage.prototype.assignOrder = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__assign_order__["a" /* AssignOrderPage */], {
            order: obj
        });
    };
    OrderDetailPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return OrderDetailPage;
}());
OrderDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-order-detail',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\order-detail.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <span class="white"># {{selectedOrder._id.substr(18,6)}}</span><br>\n\n        <span class="white">{{selectedOrder.created_at | date:\'medium\' }}\n\n        </span>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order Status\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <h2>{{selectedOrder.status}}</h2>\n\n            <div *ngIf="selectedOrder.status == \'Received\'">\n\n                <!-- <div> -->\n\n                    <button ion-button icon-only color="secondary" (click)="acceptPrompt(selectedOrder,\'Accepted\')">\n\n                        <ion-icon name="checkmark" ios="ios-checkmark" md="md-checkmark"> Accept</ion-icon>\n\n                    </button>\n\n                    <button ion-button icon-only color="danger" (click)="rejectPrompt(selectedOrder,\'Rejected\')">\n\n                        <ion-icon name="close" ios="ios-close" md="md-close"> Reject</ion-icon>\n\n                    </button>\n\n                </div>\n\n                <div *ngIf="!selectedOrder.driverId && selectedOrder.status != \'Rejected\' && selectedOrder.status != \'Received\' && selectedOrder.status != \'Missed\' && selectedOrder.orderMethod.mType != \'Pickup\'">\n\n                    <button ion-button full (click)="assignOrder($event,selectedOrder)">\n\n                        <ion-icon name="car" ios="ios-car" md="md-car"></ion-icon> &nbsp; Assign to Drivers\n\n                    </button>\n\n                </div>\n\n            </ion-card-content>\n\n    </ion-card>\n\n        \n\n    <ion-card>\n\n        <ion-card-header>\n\n            Customer Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p>\n\n                <ion-icon name="person" ios="ios-person" md="md-person"> Name: {{selectedOrder.customerId.firstname}} {{selectedOrder.customerId.lastname}}</ion-icon>\n\n            </p>\n\n            <p>\n\n                <ion-icon name="call" ios="ios-call" md="md-call"> Phone: {{selectedOrder.customerId.phonenumber}}</ion-icon>\n\n            </p>\n\n            <p>\n\n                <ion-icon name="mail" ios="ios-mail" md="md-mail"> Email: {{selectedOrder.customerId.email}}</ion-icon>\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card *ngIf="selectedOrder.driverId">\n\n        <ion-card-header>\n\n            <ion-list>\n\n                <ion-item style="background: #e7e7e7;">\n\n                    Driver Detail\n\n                    <button  item-end  (click)="assignOrder($event,selectedOrder)">\n\n                        <ion-icon name="create" ios="ios-create" md="md-create"></ion-icon>\n\n                    </button>\n\n                </ion-item>\n\n            </ion-list>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <h2>{{selectedOrder.driverId.firstname}} {{selectedOrder.driverId.lastname}}</h2>\n\n            <p>{{selectedOrder.driverId.phoneNo}}</p>\n\n            <p>{{selectedOrder.driverId.email}}</p>\n\n            <p>{{selectedOrder.driverId.address}}</p>\n\n            <p>{{selectedOrder.driverId.vehicleType}}</p>\n\n            <p>{{selectedOrder.driverId.vehicleName}} : {{selectedOrder.driverId.vehicleNo}}</p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p *ngIf="selectedOrder.orderMethod">\n\n                <ion-icon name="card" ios="ios-card" md="md-card"> Type: {{selectedOrder.orderMethod.mType}}\n\n                    <span *ngIf="selectedOrder.orderPayment">\n\n                        , <span *ngIf="selectedOrder.orderPayment.cash">Cash</span>\n\n                        <span *ngIf="selectedOrder.orderPayment.cardpickup">Card Pickup</span>\n\n                        <span *ngIf="selectedOrder.orderPayment.cardinternet">Card via Internet</span>\n\n                    </span>\n\n                </ion-icon>\n\n            </p>\n\n            <p *ngIf="selectedOrder.orderTime && selectedOrder.orderTime.tType == \'Now\'">\n\n                <ion-icon name="time">\n\n                Fulfillment date & time : </ion-icon><br>{{selectedOrder.orderTime.time | date : "EEEE, MMMM d, y - h:mm a"}}\n\n            </p>\n\n            <p *ngIf="selectedOrder.orderTime && selectedOrder.orderTime.tType == \'Later\'">\n\n                <ion-icon name="time">\n\n                Fulfillment date & time : </ion-icon><br>{{selectedOrder.orderTime.day}}<br>{{selectedOrder.orderTime.time}}\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Restaurant Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p *ngIf="selectedOrder.restaurantId">\n\n                <ion-icon name="home"> {{selectedOrder.restaurantId.name}}</ion-icon>\n\n                <span *ngIf="selectedOrder.restaurantId">\n\n                    , {{selectedOrder.restaurantId.address}} {{selectedOrder.restaurantId.zipcode}} {{selectedOrder.restaurantId.city}}\n\n                </span>\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Menu & Item Detail\n\n        </ion-card-header>\n\n        <ion-card-content *ngIf="selectedOrder.orders || selectedOrder.isPromotion">\n\n\n\n            <ion-item *ngFor="let order of selectedOrder.orders" text-left>\n\n                <ion-row *ngIf="order.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{order.quantity}} x </b></span>{{order.item.name}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{order.totalPrice}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.multisize">\n\n                    <ion-col col-6>\n\n                        {{order.multisize.size}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{order.multisize.price}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.addon.length > 0">\n\n                    <ion-item *ngFor="let adn of order.addon">\n\n                        <ion-row>\n\n                            <ion-col col-6>\n\n                                {{adn.name}}\n\n                            </ion-col>\n\n                            <ion-col col-6>\n\n                                <b>{{adn.price}}</b>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </ion-item>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.itemInstruction && order.itemInstruction != \'\'">\n\n                    <ion-item>\n\n                        <ion-row >\n\n                            <ion-col col-12>\n\n                                <b>Special Instructions</b>\n\n                            </ion-col>\n\n                            <ion-col col-12>\n\n                                <p class="wrap">{{order.itemInstruction}}</p>\n\n                            </ion-col>\n\n                        </ion-row >\n\n                    </ion-item>\n\n                </ion-row>\n\n\n\n            </ion-item>\n\n\n\n            <hr>\n\n\n\n            <ion-item *ngIf="selectedOrder.promotion">\n\n                <b>Promotion Item</b>\n\n                <ion-row *ngIf="selectedOrder.promotion.itemGroup1 && selectedOrder.promotion.itemGroup1.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{selectedOrder.promotion.itemGroup1.quantity}} x </b></span>{{selectedOrder.promotion.itemGroup1.item.name}}\n\n                    </ion-col>\n\n\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.promotion.itemGroup1.totalPrice}}</b>\n\n                    </ion-col>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.multisize">\n\n                        <ion-col col-6>\n\n                            {{selectedOrder.promotion.itemGroup1.multisize.size}}\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <b>{{selectedOrder.promotion.itemGroup1.multisize.price}}</b>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.addon.length > 0">\n\n                        <ion-item *ngFor="let adn of selectedOrder.promotion.itemGroup1.addon">\n\n                            <ion-row>\n\n                                <ion-col col-6>\n\n                                    {{adn.name}}\n\n                                </ion-col>\n\n                                <ion-col col-6>\n\n                                    <b>{{adn.price}}</b>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-item>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.itemInstruction && selectedOrder.promotion.itemGroup1.itemInstruction != \'\'">\n\n                        <ion-item>\n\n                            <ion-row >\n\n                                <ion-col col-12>\n\n                                    <b>Special Instructions</b>\n\n                                </ion-col>\n\n                                <ion-col col-12>\n\n                                    <p class="wrap">{{selectedOrder.promotion.itemGroup1.itemInstruction}}</p>\n\n                                </ion-col>\n\n                            </ion-row >\n\n                        </ion-item>\n\n                    </ion-row>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="selectedOrder.promotion.itemGroup2 && selectedOrder.promotion.itemGroup2.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{selectedOrder.promotion.itemGroup2.quantity}} x </b></span>{{selectedOrder.promotion.itemGroup2.item.name}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.promotion.itemGroup2.totalPrice}}</b>\n\n                    </ion-col>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.multisize">\n\n                        <ion-col col-6>\n\n                            {{selectedOrder.promotion.itemGroup2.multisize.size}}\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <b>{{selectedOrder.promotion.itemGroup2.multisize.price}}</b>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.addon.length > 0">\n\n                        <ion-item *ngFor="let adn of selectedOrder.promotion.itemGroup2.addon">\n\n                            <ion-row>\n\n                                <ion-col col-6>\n\n                                    {{adn.name}}\n\n                                </ion-col>\n\n                                <ion-col col-6>\n\n                                    <b>{{adn.price}}</b>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-item>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.itemInstruction && selectedOrder.promotion.itemGroup2.itemInstruction != \'\'">\n\n                        <ion-item>\n\n                            <ion-row >\n\n                                <ion-col col-12>\n\n                                    <b>Special Instructions</b>\n\n                                </ion-col>\n\n                                <ion-col col-12>\n\n                                    <p class="wrap">{{selectedOrder.promotion.itemGroup2.itemInstruction}}</p>\n\n                                </ion-col>\n\n                            </ion-row >\n\n                        </ion-item>\n\n                    </ion-row>\n\n                </ion-row>\n\n            </ion-item>\n\n            \n\n            <hr>\n\n            \n\n            <ion-item>\n\n                <ion-row>\n\n                    <ion-col col-6>\n\n                        Sub-Total\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.subTotal}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orderMethod && selectedOrder.orderMethod.mType == \'Delivery\'">\n\n                    <ion-col col-6>\n\n                        Delivery Fee\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.deliveryfee}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orders && selectedOrder.orders.length > 0">\n\n                    <ion-col col-6>\n\n                        Tax\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.tax}}%</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orders && selectedOrder.orders.length > 0">\n\n                    <ion-col col-6>\n\n                        Total\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.gTotal | number : \'1.2-2\'}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n            \n\n            <hr>\n\n            \n\n            <ion-item *ngIf="selectedOrder.comment">\n\n                <ion-row>\n\n                    <ion-col col-12>\n\n                        <b>Comment</b>\n\n                    </ion-col>\n\n                    <ion-col col-12>\n\n                        <p  class="wrap">{{selectedOrder.comment}}</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-order\order-detail.html"*/,
        styles: [" \n  ion-item{     \n  padding-left: 0px !important ;    \n    } \n    p{\n        margin-bottom: 10px;\n    }\n    .white{\n        color:#fff;\n    }\n    ion-label {\n        margin: 0px !important;\n    }\n    .label-ios {\n        margin: 0px !important;\n    }\n    .label-md {\n        margin: 0px !important;\n    }\n    .wrap{\n        white-space: normal;\n    }\n    "],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* OrderService */]])
], OrderDetailPage);

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyDriverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_driver__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__driver_detail__ = __webpack_require__(212);
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
 * Generated class for the MyDriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyDriverPage = (function () {
    function MyDriverPage(modalCtrl, menuCtrl, viewCtrl, navCtrl, loadingCtrl, toastCtrl, navParams, restaurantsService, driversService) {
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.driversService = driversService;
        this.currentOwner = {};
        this.restaurants = {};
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
        this.menuCtrl.enable(true);
        //console.log(this.currentOwner)
    }
    MyDriverPage.prototype.ionViewDidEnter = function () {
        //this.isLogin();
    };
    MyDriverPage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    MyDriverPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getDrivers(_this.restaurants._id);
        });
    };
    MyDriverPage.prototype.getDrivers = function (resID) {
        var _this = this;
        this.driversService.getRestaurantDrivers(resID).subscribe(function (users) {
            _this.drivers = users.message;
            _this.loading.dismiss();
        }, function (err) {
            _this.loading.dismiss();
            _this.getToast('Some thing went wrong! Try Later.');
        });
    };
    MyDriverPage.prototype.goToAddDriver = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__add_driver__["a" /* AddDriverPage */]);
    };
    MyDriverPage.prototype.driverDetail = function (event, obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__driver_detail__["a" /* DriverDetailPage */], {
            'driverDetail': obj
        });
        /*let modal = this.modalCtrl.create(DriverDetailPage, {'driverDetail':obj});
        modal.present();*/
    };
    MyDriverPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    MyDriverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyDriverPage');
    };
    MyDriverPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getDrivers(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    return MyDriverPage;
}());
MyDriverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-driver',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\my-driver.html"*/'<!--\n\n  Generated template for the MyDriverPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title><ion-icon name="people"></ion-icon> &nbsp;Drivers</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <button ion-button full icon-only (click)="goToAddDriver()">\n\n		<ion-icon name="person" ios="ios-person" md="md-person"> </ion-icon> Add Driver \n\n	</button>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    <ion-list>\n\n        <ion-item *ngFor="let driver of drivers" (click)="driverDetail($event,driver)">\n\n            <ion-avatar item-start>\n\n                <img src="http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png">\n\n            </ion-avatar>\n\n            <h2>{{driver.firstname}} {{driver.lastname}}</h2>\n\n            <p>{{driver.phoneNo}}</p>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\my-driver\my-driver.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* DriversService */]])
], MyDriverPage);

//# sourceMappingURL=my-driver.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_auth_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forget_password_forget_password__ = __webpack_require__(162);
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
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(nav, loadingCtrl, menuCtrl, lf, authService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
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
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
        });
        this.menuCtrl.enable(false);
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        //this.viewCtrl.showBackButton(false);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.getOwner(this.loginForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.status) {
                localStorage.setItem('currentOwner', JSON.stringify(data.data));
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__forget_password_forget_password__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.loginForm = this.lf.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
        });
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\login\login.html"*/'<!-- <ion-header>\n\n	<ion-navbar>\n\n		<ion-title>Login</ion-title>\n\n	</ion-navbar>\n\n</ion-header> -->\n\n\n\n\n\n<ion-content padding class="bg"  text-center>\n\n\n\n	<div class="title2">\n\n		<ion-title>TAKE ORDERS FOR <br>YOUR RESTAURANT</ion-title>\n\n	</div>\n\n\n\n	<ion-list>\n\n		<form role="form" [formGroup]="loginForm" (ngSubmit)="login()" >\n\n			<ion-item class="topRadius">\n\n				<!-- <ion-label floating>Username</ion-label> -->\n\n				<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n				<ion-input formControlName="username" placeholder="Username" type="text"></ion-input>\n\n			</ion-item>\n\n			<ion-item class="bottomRadius">\n\n				<!-- <ion-label floating>Password</ion-label> -->\n\n				<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n				<ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n\n			</ion-item>\n\n			<button ion-button full color="secondary" [disabled]="!loginForm.valid">Login</button>\n\n			<!-- <ion-item class="btn-design">\n\n				<button ion-button full secondary  [disabled]="!loginForm.valid">Login</button>\n\n			</ion-item>	 -->\n\n		</form>	\n\n		<button ion-button clear class="white"  (click)="goToForget()">Forget Password ?</button>\n\n	</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__app_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(45);
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
    function HomePage(navCtrl, menuCtrl, viewCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.overview = {};
        this.acceptedOrderTotal = 0;
        this.lastWeekOrderTotal = 0;
        this.menuCtrl.enable(true);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getRestaurants();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    HomePage.prototype.isLogin = function () {
        var isLog = localStorage.getItem('currentOwner');
        if (!isLog) {
            this.logout();
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
            this.getRestaurants();
        }
    };
    HomePage.prototype.getRestaurants = function () {
        var _this = this;
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.restaurantsService.getOwnerRestaurants(this.currentOwner._id).subscribe(function (users) {
            _this.restaurants = users.message;
            console.log(_this.restaurants);
            _this.getOverview(_this.restaurants._id);
        });
    };
    HomePage.prototype.getOverview = function (id) {
        var _this = this;
        this.orderService.overview(id).subscribe(function (users) {
            _this.overview = users.data;
            console.log("this.overview");
            console.log(_this.overview);
            if (_this.overview.totalAcceptedOrder) {
                for (var i = 0; i < _this.overview.totalAcceptedOrder.length; i++) {
                    _this.acceptedOrderTotal = _this.acceptedOrderTotal + _this.overview.totalAcceptedOrder[i].gTotal;
                }
                _this.avgAcceptedOrderTotal = Number(_this.acceptedOrderTotal) / Number(_this.overview.totalAcceptedOrder.length);
            }
            console.log("this.overview");
            console.log(_this.overview);
            if (_this.overview.asPerDayOrder) {
                for (var i = 0; i < _this.overview.asPerDayOrder.length; i++) {
                    _this.lastWeekOrderTotal = _this.lastWeekOrderTotal + _this.overview.asPerDayOrder[i].gTotal;
                }
                _this.avglastWeekOrderTotal = Number(_this.lastWeekOrderTotal) / Number(_this.overview.asPerDayOrder.length);
            }
            _this.loading.dismiss();
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        localStorage.removeItem('currentOwner');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */])
            .then(function () {
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Home</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card>\n\n        <ion-card-content style="background-color: #52B8CC;color: white;">\n\n            <h1 *ngIf="overview.totalAcceptedOrder" style="color: white;">{{overview.totalAcceptedOrder.length}}</h1>\n\n            Total Accepted Orders\n\n            <ion-row style="background-color: #4CABBE;padding: 2%; ">\n\n                <ion-col col-6><b>USD {{acceptedOrderTotal}}</b></ion-col>\n\n                <ion-col col-6><b>USD average order {{avgAcceptedOrderTotal}}</b></ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-content style="background-color: #52B8CC; color: white;">\n\n            <h1 *ngIf="overview.asPerDayOrder"  style="color: white;">{{overview.asPerDayOrder.length}}</h1>Order Accepted in last 7 Days\n\n            <ion-row style="background-color: #4CABBE;padding: 2%;">\n\n                <ion-col col-6><b>USD {{lastWeekOrderTotal}}</b></ion-col>\n\n                <ion-col col-6><b>USD average order {{avglastWeekOrderTotal}}</b></ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-content style="background-color: #505977;color: white;">\n\n            <h1 *ngIf="overview.totalClient"  style="color: white;">{{overview.totalClient.length}}</h1>Total Clients\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-content style="background-color: #505977;color: white;">\n\n            <h1 *ngIf="overview.asPerDayClient" style="color: white;">{{overview.asPerDayClient.length}}</h1>Clients In Last 7 Days\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\owner\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__["a" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__["a" /* OrderService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(20);
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

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(20);
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

/***/ })

},[215]);
//# sourceMappingURL=main.js.map