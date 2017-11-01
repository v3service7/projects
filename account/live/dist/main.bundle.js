webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/account-active/account-active.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#login , #resendLink{\r\n\tdisplay: none;\r\n    text-align: center;\r\n    margin: 15% 0;\r\n}\r\n\r\n/*#resendLink a{\r\n\tcolor: green;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    text-decoration: underline;\r\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account-active/account-active.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 id=\"login\"><button class=\"btn btn-success btn-wd btn-lg\" (click)=\"goToLogin()\">Login</button></h3>\r\n\r\n<form id=\"resendLink\" [formGroup]=\"emailForm\" (ngSubmit)=\"resendActivationLink()\">\r\n\tEmail : <input type=\"email\" formControlName=\"email\" placeholder=\"Enter Email ID\"><br>\r\n\r\n\t<button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!emailForm.valid\">Resend Activation Link</button>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/account-active/account-active.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountActiveComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AccountActiveComponent = (function () {
    function AccountActiveComponent(customerService, router, route, lf, _flashMessagesService) {
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this.lf = lf;
        this._flashMessagesService = _flashMessagesService;
        this.err = '';
    }
    AccountActiveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.emailForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required]
        });
        // subscribe to router event
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
        });
        this.customerService.customerVerify(this.token).subscribe(function (data) {
            if (!data.error) {
                //localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                document.getElementById('login').style.display = 'block';
                //this.router.navigate(['customer/login']);
            }
            else {
                //this.router.navigate(['customer/login']);
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                if (data.error && data.message == 'Email Activation Link Expire.') {
                    document.getElementById('resendLink').style.display = 'block';
                }
            }
        }, function (err) {
            _this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
            //this.router.navigate(['customer/login']);
        });
    };
    AccountActiveComponent.prototype.resendActivationLink = function () {
        var _this = this;
        this.customerService.resendActivationLink(this.emailForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['customer/login']);
                }, 1000);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        });
    };
    AccountActiveComponent.prototype.goToLogin = function () {
        this.router.navigate(['customer/login']);
    };
    return AccountActiveComponent;
}());
AccountActiveComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-account-active',
        template: __webpack_require__("../../../../../src/app/account-active/account-active.component.html"),
        styles: [__webpack_require__("../../../../../src/app/account-active/account-active.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_index__["c" /* CustomerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], AccountActiveComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=account-active.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = (function () {
    function AdminComponent() {
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    AdminComponent.prototype.ngOnInit = function () { };
    return AdminComponent;
}());
AdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin',
        template: __webpack_require__("../../../../../src/app/admin/admin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/admin.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AdminComponent);

//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/business/business.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n.businessClass{\r\n\theight: 100%;\r\n}\r\n\r\n.docDiv{\r\n\tborder: 1px solid #43a047;\r\n    padding: 10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.docDiv .form-group{\r\n\tpadding-bottom: 0px;\r\n    margin: 0;\r\n}\r\n\r\n.viewFile{\r\n\tposition: absolute;\r\n    top: 5px;\r\n    right: 15px;\r\n}\r\n\r\n.viewFile a{\r\n    color: #4caf50;\r\n    text-decoration: underline;\r\n}\r\n\r\n\r\n/* Start progress bar*/\r\n.progress {\r\n  overflow: visible;\r\n  margin-bottom: 26px;\r\n  height: 6px;\r\n  width: 100%;\r\n  background-color: white !important;\r\n}\r\n\r\n.progress .progress-bar {\r\n  position: relative;\r\n  border-radius: 4px;\r\n}\r\n\r\n.progress-bar-info{\r\n  background-color: #0198b3;\r\n}\r\n\r\n\r\n/* End progress bar*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/business/business.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper businessClass\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/business/business.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminBusinessComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BusinessListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BusinessViewComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BusinessEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__("../../../../../src/app/global.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*service*/

var AdminBusinessComponent = (function () {
    function AdminBusinessComponent(lf, router, route) {
        this.lf = lf;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminBusinessComponent.prototype.ngOnInit = function () {
    };
    return AdminBusinessComponent;
}());
AdminBusinessComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business',
        template: __webpack_require__("../../../../../src/app/admin/business/business.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], AdminBusinessComponent);

var BusinessListComponent = (function () {
    function BusinessListComponent(lf, businessService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.currentCustomer = {};
        this.businesses = [];
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    BusinessListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.getList(id);
            _this.customer(id);
        });
    };
    BusinessListComponent.prototype.deleteBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.businessService.businessDelete(id).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show('Business deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    _this.getList(_this.currentCustomer._id);
                }
                else {
                    _this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'alert-success', timeout: 5000 });
                }
            });
        }
    };
    BusinessListComponent.prototype.customer = function (id) {
        var _this = this;
        this.adminService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    BusinessListComponent.prototype.getList = function (id) {
        var _this = this;
        this.businessService.businessList(id).subscribe(function (data) {
            if (!data.error) {
                _this.businesses = data.message;
                console.log("this.businesses");
                console.log(_this.businesses);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    BusinessListComponent.prototype.goToCustomerList = function () {
        this.router.navigate(['/admin/customer']);
    };
    return BusinessListComponent;
}());
BusinessListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-list',
        template: __webpack_require__("../../../../../src/app/admin/business/businesslist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["a" /* AdminService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _j || Object])
], BusinessListComponent);

var BusinessViewComponent = (function () {
    function BusinessViewComponent(lf, router, businessService, route) {
        this.lf = lf;
        this.router = router;
        this.businessService = businessService;
        this.route = route;
        this.currentAdmin = {};
        this.business = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    BusinessViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.getBusiness(_this.id);
        });
    };
    BusinessViewComponent.prototype.getBusiness = function (id) {
        var _this = this;
        this.businessService.business(id).subscribe(function (data) {
            if (!data.error) {
                _this.business = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    BusinessViewComponent.prototype.goToBusinessList = function () {
        this.router.navigate(['/admin/business', this.id]);
    };
    return BusinessViewComponent;
}());
BusinessViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-view',
        template: __webpack_require__("../../../../../src/app/admin/business/businessview.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _o || Object])
], BusinessViewComponent);

var BusinessEditComponent = (function () {
    function BusinessEditComponent(lf, businessService, adminService, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.adminService = adminService;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.businessDetail = {};
        this.plans = [];
        this.isVisit = false;
        this.mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.phoneRegex = /^[0-9]*$/;
        this.imgUrl = __WEBPACK_IMPORTED_MODULE_5__global__["a" /* imageUrl */];
        this.processCompletePercent = 0;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_5__global__["b" /* url */] + 'upload' });
        this.formErrors = {
            'businessName': '',
            'tradeLicenseNumber': '',
            'tradeLicenseExpiry': '',
            'emiRate': '',
            'phoneNumber': '',
            'ownerName': '',
            'mobileNumber': '',
            'nationality': '',
            'emiRateIdNumber': '',
        };
        this.validationMessages = {
            'businessName': {
                'required': 'Name is required.',
            },
            'tradeLicenseNumber': {
                'required': 'Trade License Number is required.',
            },
            'emiRate': {
                'required': 'Emi Rate is required.',
            },
            'tradeLicenseExpiry': {
                'required': 'Trade License Expiry is required.',
            },
            'phoneNumber': {
                'required': 'Phone Number is required.',
                'pattern': "Invalid Phone Number"
            },
            'ownerName': {
                'required': 'Owner Name is required.'
            },
            'mobileNumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number along with country code.',
                'maxlength': 'Enter 10 digit mobile number along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            'nationality': {
                'required': 'Nationality is required.'
            },
            'emiRateIdNumber': {
                'required': 'Emirate Id Number is required.'
            },
        };
    }
    BusinessEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessEditForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            businessName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phoneNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            ownerName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            mobileNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.mobileRegex)]],
            passportNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            nationality: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRateIdNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            ownerId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            plan: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],
            passportFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            visaFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRatesIdFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tradeLicenseFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            articleAndPartnershipFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            certificateOfIncorporationFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankStatementFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.business(id);
        });
        this.businessEditForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.getPlanList();
    };
    BusinessEditComponent.prototype.checkIsVisit = function () {
        if (this.businessEditForm.value.siteVisit != 'AED 0') {
            this.isVisit = true;
        }
        else {
            this.isVisit = false;
        }
    };
    BusinessEditComponent.prototype.getPlanList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    BusinessEditComponent.prototype.businessUpdate = function () {
        var _this = this;
        this.businessService.businessUpdate(this.businessEditForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Business Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/business/', _this.businessEditForm.value.ownerId]);
            }
            else {
                _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                _this.businessEditForm.reset();
                _this.businessEditForm.patchValue(_this.businessDetail);
                //this.router.navigate(['admin/business/',this.businessEditForm.value.ownerId]);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            _this.businessEditForm.reset();
            _this.businessEditForm.patchValue(_this.businessDetail);
        });
    };
    BusinessEditComponent.prototype.onChange = function (event, fileType) {
        var _this = this;
        this.uploader.uploadAll();
        this.uploader.onProgressItem = function (file, progress) {
            _this.processCompletePercent = progress;
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            _this.businessEditForm.controls[fileType].setValue(responsePath.filename);
            /*this.businesses[fileType]= responsePath.filename;*/
        };
    };
    BusinessEditComponent.prototype.business = function (id) {
        var _this = this;
        this.businessService.business(id).subscribe(function (data) {
            if (!data.error) {
                _this.businessDetail = data.message;
                _this.businessEditForm.patchValue(data.message);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    BusinessEditComponent.prototype.onValueChanged = function (data) {
        if (!this.businessEditForm) {
            return;
        }
        var form = this.businessEditForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    BusinessEditComponent.prototype.goToBusinessList = function () {
        this.router.navigate(['/admin/business', this.businessEditForm.value.ownerId]);
    };
    return BusinessEditComponent;
}());
BusinessEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-edit',
        template: __webpack_require__("../../../../../src/app/admin/business/businessedit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["a" /* AdminService */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _v || Object])
], BusinessEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
//# sourceMappingURL=business.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/business/businessedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Update Business\r\n                    <span class=\"nav-tabs-title\" style=\"float: right;cursor: pointer;\" (click) = \"goToBusinessList()\">Back</span>\r\n                </h4>\r\n                <p class=\"category\">update your Business Data</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <div class=\"progress progress-bar\" *ngIf=\"processCompletePercent > 0 && processCompletePercent < 100\">\r\n                    <div class=\"progress-bar progress-bar-info progress-bar\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width': processCompletePercent + '%'}\"></div>\r\n                </div>\r\n                \r\n                <form [formGroup]=\"businessEditForm\" (ngSubmit)=\"businessUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name of business*</label>\r\n                                <input formControlName=\"businessName\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.businessName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.businessName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Types of business Organisation</label>\r\n                                <select formControlName=\"typeOfOrg\" class=\"form-control\">\r\n                                    <option>Natural Person</option>\r\n                                    <option>Incorporated entity</option>\r\n                                    <option>Non-incorporated entity</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Trade License Number*</label>\r\n                                <input formControlName=\"tradeLicenseNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseNumber }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Issuing Authority</label>\r\n                                <input formControlName=\"issuingAuthority\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Trade License Expiry*</label>\r\n                                <input formControlName=\"tradeLicenseExpiry\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseExpiry\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseExpiry }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Emirate*</label>\r\n                                <select formControlName=\"emiRate\" class=\"form-control\">\r\n                                    <option>Dubai</option>\r\n                                    <option>Abu Dhabi</option>\r\n                                    <option>Ajman</option>\r\n                                    <option>Fujairah</option>\r\n                                    <option>UAQ</option>\r\n                                    <option>RAK</option>\r\n                                    <option>Sharjah</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRate\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRate }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Phone*</label>\r\n                                <input formControlName=\"phoneNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phoneNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phoneNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name of Owner / Manager*</label>\r\n                                <input formControlName=\"ownerName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.ownerName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.ownerName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Mobile Number*</label>\r\n                                <input formControlName=\"mobileNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.mobileNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.mobileNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Passport Number*</label>\r\n                                <input formControlName=\"passportNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.passportNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.passportNumber }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Nationality*</label>\r\n                                <input formControlName=\"nationality\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.nationality\" class=\"alert alert-danger\">\r\n                                {{ formErrors.nationality }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Emirates ID Number*</label>\r\n                                <input formControlName=\"emiRateIdNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRateIdNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRateIdNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Bank Name</label>\r\n                                <input formControlName=\"bankName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Branch Name</label>\r\n                                <input formControlName=\"bankBranch\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Account Number</label>\r\n                                <input formControlName=\"bankAccountNumber\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Certificate of incorporation no</label>\r\n                                <input formControlName=\"certificateOfIncorporationNo\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">VAT TRN </label>\r\n                                <input formControlName=\"vattrn\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Select Plan*</label>\r\n                                <select formControlName=\"plan\" class=\"form-control\">\r\n                                    <option *ngFor=\"let plan of plans\" [value]=\"plan._id\">{{plan.type}} business - {{plan.name}} ({{plan.amount}}/{{plan.duration}})</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Optional Site visit package</label>\r\n                                <select formControlName=\"siteVisit\" class=\"form-control\" (change)=\"checkIsVisit()\">\r\n                                    <option value=\"AED 0\">No Site Visit Required(AED 0)</option>\r\n                                    <option value=\"AED 150\">Site Visit Required(AED 150)</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\" *ngIf=\"isVisit\">\r\n                            <div class=\"form-group\" >\r\n                                <label class=\"control-label\">Number of days required</label>\r\n                                <input formControlName=\"noDaysRequired\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'passportFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Passport File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.passportFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.passportFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'visaFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Visa File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.visaFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.visaFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    \r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                 <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'emiRatesIdFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD EMI Rates Id File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.emiRatesIdFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.emiRatesIdFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                 <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'tradeLicenseFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Trade License File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.tradeLicenseFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.tradeLicenseFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                   \r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'articleAndPartnershipFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Article and Partnership File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.articleAndPartnershipFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.articleAndPartnershipFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'certificateOfIncorporationFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Certificate of Incorporation File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.certificateOfIncorporationFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.certificateOfIncorporationFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard docDiv\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'bankStatementFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Bank Statement File</a>\r\n                                </div>\r\n                                <div class=\"textCenter viewFile\" *ngIf=\"businessEditForm.value.bankStatementFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessEditForm.value.bankStatementFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!businessEditForm.valid\">Update Business</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/business/businesslist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header brandingColor\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Business List of \"{{currentCustomer.firstname}} {{currentCustomer.lastname}}\"</span> <span class=\"nav-tabs-title\" style=\"float: right;cursor: pointer;\" (click) = \"goToCustomerList()\">Back</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                \r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"businesses.length >0\">\r\n            <thead class=\"text-warning\">\r\n                <th>Name</th>\r\n                <th>Type of Organisation</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let bsns of businesses\">\r\n                    <td class=\"padding0\">{{bsns.businessName}}</td>\r\n                    <td class=\"padding0\">{{bsns.typeOfOrg}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/business/view',bsns._id]\" rel=\"tooltip\" title=\"Business Detail\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">business</i>\r\n                        </a>\r\n                        <a [routerLink]=\"['/admin/business/edit',bsns._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deleteBusiness(bsns._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-primary\" *ngIf=\"businesses.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> Business Empty  of \"{{currentCustomer.firstname}} {{currentCustomer.lastname}}\"</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/business/businessview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\" *ngIf = \"business\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">\r\n                    Business Detail\r\n                    <span class=\"nav-tabs-title\" style=\"float: right;cursor: pointer;\" (click) = \"goToBusinessList()\">Back</span>\r\n                 </h4>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <div *ngIf = \"business.businessName && business.businessName != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Name of business</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.businessName}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.typeOfOrg && business.typeOfOrg != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Types of business Organisation</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.typeOfOrg}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.tradeLicenseNumber && business.tradeLicenseNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Trade License Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.tradeLicenseNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.issuingAuthority && business.issuingAuthority != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Issuing Authority</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.issuingAuthority}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.tradeLicenseExpiry && business.tradeLicenseExpiry != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Trade License Expiry</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.tradeLicenseExpiry}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.emiRate && business.emiRate != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Emirate</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.emiRate}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.phoneNumber && business.phoneNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Phone</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.phoneNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.ownerName && business.ownerName != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Name of Owner / Manager</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.ownerName}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.mobileNumber && business.mobileNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Mobile Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.mobileNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.passportNumber && business.passportNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Passport Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.passportNumber}}</label>\r\n                    </div>\r\n                </div>\r\n                \r\n                <div *ngIf = \"business.nationality && business.nationality != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Nationality</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.nationality}}</label>\r\n                    </div>\r\n                </div>\r\n                \r\n                <div *ngIf = \"business.emiRateIdNumber && business.emiRateIdNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Emirates ID Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.emiRateIdNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.emiRateIdNumber && business.emiRateIdNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Emirates ID Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.emiRateIdNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.bankName && business.bankName != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Bank Name</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.bankName}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.bankBranch && business.bankBranch != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Branch Name</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.bankBranch}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.bankAccountNumber && business.bankAccountNumber != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Account Number</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.bankAccountNumber}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.certificateOfIncorporationNo && business.certificateOfIncorporationNo != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Certificate of incorporation no</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.certificateOfIncorporationNo}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.vattrn && business.vattrn != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">VAT TRN</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.vattrn}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.plan && business.plan != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Plan Selected</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">{{business.plan}}</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.siteVisit && business.siteVisit != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Optional Site visit package</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\" *ngIf = \"business.siteVisit == 'AED 0'\">\r\n                            No Site Visit Required(AED 0)\r\n                            <span>{{business.noDaysRequired}}</span>\r\n                        </label>\r\n                        <label class=\"\" *ngIf = \"business.siteVisit == 'AED 150'\">Site Visit Required(AED 150)</label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.passportFile && business.passportFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Passport File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.passportFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.visaFile && business.visaFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Visa File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.visaFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.emiRatesIdFile && business.emiRatesIdFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Emirates Id File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.emiRatesIdFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.tradeLicenseFile && business.tradeLicenseFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Trade License File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.tradeLicenseFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.articleAndPartnershipFile && business.articleAndPartnershipFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Article and Partnership File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.articleAndPartnershipFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf = \"business.certificateOfIncorporationFile && business.certificateOfIncorporationFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Certificate of Incorporation File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.certificateOfIncorporationFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n               \r\n                <div *ngIf = \"business.bankStatementFile && business.bankStatementFile != ''\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\">Bank Statement File</label>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <label class=\"\"><a target=\"_blank\" href=\"{{imgUrl}}{{business.bankStatementFile}}\">View</a></label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n\r\n.addCustomerClass{\r\n\theight: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/customer/customer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper addCustomerClass\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminCustomerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CustomerListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CustomerEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var AdminCustomerComponent = (function () {
    function AdminCustomerComponent(lf, adminService, router, route) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminCustomerComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    AdminCustomerComponent.prototype.getAdmin = function () {
    };
    return AdminCustomerComponent;
}());
AdminCustomerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-customer',
        template: __webpack_require__("../../../../../src/app/admin/customer/customer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/customer.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object])
], AdminCustomerComponent);

var CustomerListComponent = (function () {
    function CustomerListComponent(lf, customerService, router, route, adminService, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.customers = [];
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    CustomerListComponent.prototype.getList = function () {
        var _this = this;
        this.adminService.customerList().subscribe(function (data) {
            if (!data.error) {
                _this.customers = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerListComponent.prototype.deleteCustomer = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.adminService.customerDelete(id).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show('Customer Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                }
                _this.getList();
            });
        }
    };
    return CustomerListComponent;
}());
CustomerListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-customer-list',
        template: __webpack_require__("../../../../../src/app/admin/customer/customerlist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/customer.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], CustomerListComponent);

var CustomerAddComponent = (function () {
    function CustomerAddComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.passwordp = '';
        this.err = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'email': '',
            'phonenumber': '',
            'password': '',
            'newpassword': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    CustomerAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            matchpass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
        });
        this.customerAddForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerAddComponent.prototype.matchpasswordreg = function () {
        if (this.customerAddForm.value.newpassword != "") {
            if (this.customerAddForm.value.password == this.customerAddForm.value.newpassword) {
                this.customerAddForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.customerAddForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
        else {
            this.MutchPassword = false;
        }
    };
    CustomerAddComponent.prototype.customerAdd = function () {
        var _this = this;
        this.customerService.customerRegister(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Customer created successfully', { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['admin/customer']);
                }, 1000);
            }
            else {
                //this._flashMessagesService.show('Email already in use', { cssClass: 'danger-alert', timeout: 5000 });
                //this.customerAddForm.reset();
                _this.err = 'Email already in use';
            }
        }, function (err) {
            _this._flashMessagesService.show('Server not Responding', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    CustomerAddComponent.prototype.onValueChanged = function (data) {
        if (!this.customerAddForm) {
            return;
        }
        var form = this.customerAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return CustomerAddComponent;
}());
CustomerAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-customer-add',
        template: __webpack_require__("../../../../../src/app/admin/customer/customeradd.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/customer.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _q || Object])
], CustomerAddComponent);

var CustomerEditComponent = (function () {
    function CustomerEditComponent(lf, customerService, router, route, adminService, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.currentCustomer = {};
        this.passwordp = '';
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'phonenumber': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            }
        };
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.customer(id);
        });
        this.customerAddForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    /*private matchpasswordreg(){
        if(this.customerAddForm.value.password == this.customerAddForm.value.newpassword){
            this.customerAddForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;
        }else{
            this.customerAddForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    }*/
    CustomerEditComponent.prototype.customerUpdate = function () {
        var _this = this;
        this.adminService.customerUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Customer Updated successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/customer']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    CustomerEditComponent.prototype.customer = function (id) {
        var _this = this;
        this.adminService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                console.log(_this.currentCustomer);
                _this.customerAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerEditComponent.prototype.onValueChanged = function (data) {
        if (!this.customerAddForm) {
            return;
        }
        var form = this.customerAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return CustomerEditComponent;
}());
CustomerEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-customer-edit',
        template: __webpack_require__("../../../../../src/app/admin/customer/customeredit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/customer.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _w || Object])
], CustomerEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
//# sourceMappingURL=customer.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/customer/customeradd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Add Customer</h4>\r\n                <p class=\"category\">Complete Customer's profile</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerAdd()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Fist Name*</label>\r\n                                <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.firstname }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Last Name*</label>\r\n                                <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.lastname }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Email Id*</label>\r\n                                <input formControlName=\"email\" type=\"email\" class=\"form-control\" validateOnBlur [validateFormControl]=\"customerAddForm.controls['email']\">\r\n                            </div>\r\n                            <div *ngIf=\"customerAddForm.controls['email'].touched && customerAddForm.controls['email'].dirty && customerAddForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                {{ formErrors.email }}\r\n                            </div>\r\n                            <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                {{ err }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Phone Number*</label>\r\n                                <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phonenumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Password*</label>\r\n                                <input formControlName=\"password\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                {{ formErrors.password }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Confirm Password*</label>\r\n                                <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                {{ formErrors.newpassword }}\r\n                            </div>\r\n                            <div style=\"padding: 3px;\" class=\"alert alert-danger\" *ngIf=\"MutchPassword\">Password not match</div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!customerAddForm.valid\">Save Customer</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customeredit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Edit Customer</h4>\r\n                <p class=\"category\">Complete your profile</p>\r\n            </div>\r\n            <div class=\"card-content\" *ngIf = \"currentCustomer\">\r\n                <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Fist Name</label>\r\n                                <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.firstname }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Last Name</label>\r\n                                <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.lastname }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Email address</label>\r\n                                <input formControlName=\"email\" type=\"email\" class=\"form-control\" disabled>\r\n                            </div>\r\n                            <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                {{ formErrors.email }}\r\n                            </div> -->\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Phone Number</label>\r\n                                <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phonenumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Password</label>\r\n                                <input formControlName=\"password\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                {{ formErrors.password }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group \">\r\n                                <label class=\"control-label\">Confirm Password</label>\r\n                                <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                {{ formErrors.newpassword }}\r\n                            </div>\r\n                            <div style=\"padding: 3px;\" class=\"alert alert-danger\" *ngIf=\"MutchPassword\">Password not match</div>\r\n                        </div>\r\n                    </div> -->\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!customerAddForm.valid\">Save Customer</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customerlist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header brandingColor\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Customer</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/admin/customer/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Customer\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"customers.length >0\">\r\n            <thead class=\"text-warning\">\r\n                <th>Name</th>\r\n                <th>Phone Number</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let customer of customers\">\r\n                    <td class=\"padding0\">{{customer.firstname}} {{customer.lastname}}</td>\r\n                    <td class=\"padding0\">{{customer.phonenumber}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/business/',customer._id]\" rel=\"tooltip\" title=\"Business Detail\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">business</i>\r\n                        </a>\r\n                        <a [routerLink]=\"['/admin/customer/',customer._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a href=\"javascript:void(0)\" rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deleteCustomer(customer._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-primary\" *ngIf=\"customers.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> Customer Empty Kindly create One\"</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-content .label-floating{\r\n\ttext-align: left;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header brandingColor\">\r\n                                <i class=\"material-icons\">perm_identity</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Customer</p>\r\n                                <h3 class=\"title\">{{customers.length}}\r\n                                </h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/customer/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header brandingColor\">\r\n                                <i class=\"material-icons\">supervisor_account</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Staff</p>\r\n                                <h3 class=\"title\">{{staffs.length}}</h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/staff/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header brandingColor\">\r\n                                <i class=\"material-icons\">business_center</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Plan</p>\r\n                                <h3 class=\"title\">{{plans.length}}</h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/plan/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var DashboardComponent = (function () {
    function DashboardComponent(lf, adminService, staffService, customerService, planService, router, route) {
        this.lf = lf;
        this.adminService = adminService;
        this.staffService = staffService;
        this.customerService = customerService;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        this.staffs = [];
        this.plans = [];
        this.customers = [];
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getCustomerList();
        this.getStaffList();
        this.getPlanList();
    };
    DashboardComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.adminService.customerList().subscribe(function (data) {
            if (!data.error) {
                _this.customers = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    DashboardComponent.prototype.getStaffList = function () {
        var _this = this;
        this.adminService.staffList().subscribe(function (data) {
            if (!data.error) {
                _this.staffs = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    DashboardComponent.prototype.getPlanList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-dashboard',
        template: __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object])
], DashboardComponent);

var AdminProfileComponent = (function () {
    function AdminProfileComponent(lf, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegx = /^[0-9]*$/;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'phonenumber': '',
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'pattern': 'Invalid Phone Number.',
            }
        };
        this.cpFormErrors = {
            'newpassword': ''
        };
        this.cpValidationMessages = {
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegx)]],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.cpForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.customerAddForm.valueChanges.subscribe(function (data) { return _this.onValueChangedForm(data); });
        this.onValueChangedForm();
        this.customerAddForm.patchValue(this.currentAdmin);
        this.cpForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.cpForm.controls["_id"].setValue(this.currentAdmin._id);
    };
    AdminProfileComponent.prototype.admin = function (id) {
        var _this = this;
        this.adminService.admin(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentAdmin = data.message;
                localStorage.removeItem('currentAdmin');
                localStorage.setItem('currentAdmin', JSON.stringify(data.message));
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    AdminProfileComponent.prototype.matchpasswordreg = function () {
        if (this.cpForm.value.newpassword != "") {
            if (this.cpForm.value.password == this.cpForm.value.newpassword) {
                this.cpForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.cpForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
    };
    AdminProfileComponent.prototype.onValueChanged = function (data) {
        if (!this.cpForm) {
            return;
        }
        var form = this.cpForm;
        for (var field in this.cpFormErrors) {
            // clear previous error message (if any)
            this.cpFormErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.cpValidationMessages[field];
                for (var key in control.errors) {
                    this.cpFormErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    AdminProfileComponent.prototype.onValueChangedForm = function (data) {
        if (!this.customerAddForm) {
            return;
        }
        var form = this.customerAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    AdminProfileComponent.prototype.adminUpdate = function () {
        var _this = this;
        this.adminService.adminUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.admin(_this.currentAdmin._id);
                _this._flashMessagesService.show('Details Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/dashboard']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
        });
    };
    AdminProfileComponent.prototype.adminChangePassword = function () {
        var _this = this;
        this.adminService.adminChangePassword(this.cpForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.admin(_this.cpForm.value._id);
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/dashboard']);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.cpForm.reset();
                _this.cpForm.controls["_id"].setValue(_this.currentAdmin._id);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    return AdminProfileComponent;
}());
AdminProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-profile',
        template: __webpack_require__("../../../../../src/app/admin/dashboard/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _m || Object])
], AdminProfileComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/dashboard/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-8\">\r\n                            <div class=\"card\">\r\n                                <div class=\"card-header brandingColor\">\r\n                                    <h4 class=\"title\">Edit Profile</h4>\r\n                                    <p class=\"category\">Complete your profile</p>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"adminUpdate()\">\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Fist Name</label>\r\n                                                    <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.firstname }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Last Name</label>\r\n                                                    <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.lastname }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Email address</label>\r\n                                                    <input formControlName=\"email\" type=\"email\" class=\"form-control\" disabled>\r\n                                                </div>\r\n                                                <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.email }}\r\n                                                </div> -->\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Phone Number</label>\r\n                                                    <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.phonenumber }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!customerAddForm.valid\">Save</button>\r\n                                        <div class=\"clearfix\"></div>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"card card-profile\">\r\n                                <div class=\"content\">\r\n                                    <h6 class=\"category text-gray\">Change Password</h6>\r\n                                    <form [formGroup]=\"cpForm\" (ngSubmit)=\"adminChangePassword()\">\r\n                                        <div class=\"card-content\">\r\n                                            <div *ngIf=\"err !=''\" class=\"alert alert-danger\">\r\n                                                {{err}}\r\n                                            </div>\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">Password</label>\r\n                                                    <input formControlName=\"password\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.password\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.password }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                                    {{ err }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">New Password</label>\r\n                                                    <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.newpassword\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.newpassword }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                                    {{ err }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-warning btn-round\" [disabled]=\"!cpForm.valid\">Change Password</button>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/login/adminforgetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"forgetPassword()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Forgot Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"email\" class=\"form-control\" formControlName=\"email\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-danger btn-wd btn-lg\" [disabled]=\"!loginForm.valid\">Send</button>\r\n                                     <a class=\"btn btn-danger btn-simple btn-wd btn-lg\" [routerLink]=\"['/admin/login']\">Login</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/login/adminlogin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n\r\n.footer a{\r\n    color: #0198B3 !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/login/adminlogin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Admin Login</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div *ngIf=\"err && err != ''\" class=\"alert alert-danger\">\r\n                                        {{ err }}\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"email\">\r\n                                        <span class=\"material-input\"></span></div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                        <span class=\"material-input\"></span></div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-danger btn-wd btn-lg\" id=\"submitButton\" [disabled]=\"!loginForm.valid\">Login</button>\r\n                                    <a class=\"btn btn-simple btn-wd btn-lg\" [routerLink]=\"['/admin/forget-password']\">Forgot Password ?</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/login/adminlogin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AdminLoginComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminForgetPasswordComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AdminResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var AdminLoginComponent = (function () {
    function AdminLoginComponent(lf, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminLoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
    };
    AdminLoginComponent.prototype.login = function () {
        var _this = this;
        this.adminService.authenticateUser(this.loginForm.value).subscribe(function (data) {
            if (data.success) {
                _this.adminService.storeUserData(data.token, data.user);
                _this._flashMessagesService.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this._flashMessagesService.show(data.msg, {
                    cssClass: 'danger-alert',
                    timeout: 5000
                });
                _this.router.navigate(['admin/login']);
            }
        }, function (err) {
            _this.err = 'Unable to reach Server';
        });
    };
    return AdminLoginComponent;
}());
AdminLoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-login',
        template: __webpack_require__("../../../../../src/app/admin/login/adminlogin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/login/adminlogin.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], AdminLoginComponent);

var AdminForgetPasswordComponent = (function () {
    function AdminForgetPasswordComponent(lf, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Invalid Email.'
            }
        };
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminForgetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]]
        });
        this.loginForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    AdminForgetPasswordComponent.prototype.forgetPassword = function () {
        var _this = this;
        this.adminService.adminForgetPassword(this.loginForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show(data.message + '. Please Check your mail', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/login']);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.router.navigate(['admin/login']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            _this.router.navigate(['admin/login']);
        });
    };
    AdminForgetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return AdminForgetPasswordComponent;
}());
AdminForgetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-forgetpassword',
        template: __webpack_require__("../../../../../src/app/admin/login/adminforgetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/login/adminlogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], AdminForgetPasswordComponent);

var AdminResetPasswordComponent = (function () {
    function AdminResetPasswordComponent(router, _flashMessagesService, route, adminService, lf) {
        this.router = router;
        this._flashMessagesService = _flashMessagesService;
        this.route = route;
        this.adminService = adminService;
        this.lf = lf;
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.formErrors = {
            'password': '',
            'newpassword': '',
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
    }
    AdminResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.resetPassForm = this.lf.group({
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.resetPassForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    AdminResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            var custObj = {};
            custObj['_id'] = this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.adminService.resetPassword(custObj).subscribe(function (data) {
                console.log("data");
                console.log(data);
                if (!data.error) {
                    _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    _this.router.navigate(['admin/login']);
                }
                else {
                    _this._flashMessagesService.show('Connection Error', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }
        else {
            this._flashMessagesService.show('Password dont match. Please enter same password', { cssClass: 'alert-danger', timeout: 5000 });
            this.resetPassForm.reset();
        }
    };
    AdminResetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.resetPassForm) {
            return;
        }
        var form = this.resetPassForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return AdminResetPasswordComponent;
}());
AdminResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-resetPassword',
        template: __webpack_require__("../../../../../src/app/admin/login/adminresetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/login/adminlogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _q || Object])
], AdminResetPasswordComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=adminlogin.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/login/adminresetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"resetPassForm\" (ngSubmit)=\"resetPass()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Reset Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.password }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">confirm password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"newpassword\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.newpassword }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!resetPassForm.valid\">Submit</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/plan.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n.addPlanClass{\r\n\theight: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/plan/plan.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper addPlanClass\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/plan.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPlanComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PlanListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PlanAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PlanEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var AdminPlanComponent = (function () {
    function AdminPlanComponent(lf, router, route) {
        this.lf = lf;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminPlanComponent.prototype.ngOnInit = function () { };
    return AdminPlanComponent;
}());
AdminPlanComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-plan',
        template: __webpack_require__("../../../../../src/app/admin/plan/plan.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/plan/plan.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], AdminPlanComponent);

var PlanListComponent = (function () {
    function PlanListComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.plans = [];
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    PlanListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    PlanListComponent.prototype.getList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PlanListComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.planService.planDelete(id).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show('Plan Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                }
                _this.getList();
            });
        }
    };
    return PlanListComponent;
}());
PlanListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-plan-list',
        template: __webpack_require__("../../../../../src/app/admin/plan/planlist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/plan/plan.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _h || Object])
], PlanListComponent);

var PlanAddComponent = (function () {
    function PlanAddComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.amountRegx = /^[0-9]*[.]{0,1}[0-9]{1,2}$/;
        this.formErrors = {
            'name': '',
            'amount': '',
            'type': '',
            'duration': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
            },
            'amount': {
                'required': 'Amount is required.',
                'pattern': 'Invalid Amount/accepts 2 digit after decimal',
            },
            'type': {
                'required': 'Select Plan Type.'
            },
            'duration': {
                'required': 'Select Duration.'
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    PlanAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            amount: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.amountRegx)]],
            desc: [''],
            type: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            duration: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PlanAddComponent.prototype.planAdd = function () {
        var _this = this;
        this.planService.planAdd(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Plan added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/plan']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    PlanAddComponent.prototype.onValueChanged = function (data) {
        if (!this.planAddForm) {
            return;
        }
        var form = this.planAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return PlanAddComponent;
}());
PlanAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-plan-add',
        template: __webpack_require__("../../../../../src/app/admin/plan/planadd.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/plan/plan.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _o || Object])
], PlanAddComponent);

var PlanEditComponent = (function () {
    function PlanEditComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.currentCustomer = {};
        this.amountRegx = /^[0-9]*[.]{0,1}[0-9]{1,2}$/;
        this.formErrors = {
            'name': '',
            'amount': '',
            'type': '',
            'duration': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
            },
            'amount': {
                'required': 'Amount is required.',
                'pattern': 'Invalid Amount/accepts 2 digit after decimal',
            },
            'type': {
                'required': 'Select Plan Type.'
            },
            'duration': {
                'required': 'Select Duration.'
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    PlanEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            amount: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.amountRegx)]],
            desc: [''],
            type: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            duration: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.plan(id);
        });
        this.planAddForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PlanEditComponent.prototype.planUpdate = function () {
        var _this = this;
        this.planService.planUpdate(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Plan Updated successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/plan']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    PlanEditComponent.prototype.plan = function (id) {
        var _this = this;
        this.planService.plan(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                _this.planAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PlanEditComponent.prototype.onValueChanged = function (data) {
        if (!this.planAddForm) {
            return;
        }
        var form = this.planAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return PlanEditComponent;
}());
PlanEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-plan-edit',
        template: __webpack_require__("../../../../../src/app/admin/plan/planedit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/plan/plan.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["d" /* PlanService */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _t || Object])
], PlanEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
//# sourceMappingURL=plan.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/plan/planadd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Add Plan</h4>\r\n                <p class=\"category\">Create plan for customer</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planAdd()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Name <span>*</span></label>\r\n                                <input formControlName=\"name\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\r\n                                {{ formErrors.name }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Amount</label>\r\n                                <input formControlName=\"amount\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.amount\" class=\"alert alert-danger\">\r\n                                {{ formErrors.amount }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"form-group label-floating\">\r\n                                    <label class=\"control-label\"> Describe about this plan</label>\r\n                                    <textarea class=\"form-control\" formControlName=\"desc\" rows=\"2\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Type</label>\r\n                                <select formControlName=\"type\" class=\"form-control\">\r\n                                    <option>Select Type</option>\r\n                                    <option value=\"Small Business\">Small Business</option>\r\n                                    <option value=\"Medium Business\">Medium Business</option>\r\n                                    <option value=\"Large Business\">Large Business</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.type\" class=\"alert alert-danger\">\r\n                                {{ formErrors.type }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Duration</label>\r\n                                <select formControlName=\"duration\" class=\"form-control\">\r\n                                    <option>Select Duration</option>\r\n                                    <option value=\"Month\">Month</option>\r\n                                    <option value=\"Quarterly\">Quarterly</option>\r\n                                    <option value=\"halfyerly\">Halfyearly</option>\r\n                                    <option value=\"year\">year</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.duration\" class=\"alert alert-danger\">\r\n                                {{ formErrors.duration }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!planAddForm.valid\">Add Plan</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/planedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Add Plan</h4>\r\n                <p class=\"category\">Create plan for customer</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name <span>*</span></label>\r\n                                <input formControlName=\"name\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\r\n                                {{ formErrors.name }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Amount</label>\r\n                                <input formControlName=\"amount\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.amount\" class=\"alert alert-danger\">\r\n                                {{ formErrors.amount }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"form-group\">\r\n                                    <label class=\"control-label\"> Describe about this plan</label>\r\n                                    <textarea class=\"form-control\" formControlName=\"desc\" rows=\"2\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Type</label>\r\n                                <select formControlName=\"type\" class=\"form-control\">\r\n                                    <option>Select Type</option>\r\n                                    <option value=\"Small Business\">Small Business</option>\r\n                                    <option value=\"Medium Business\">Medium Business</option>\r\n                                    <option value=\"Large Business\">Large Business</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.type\" class=\"alert alert-danger\">\r\n                                {{ formErrors.type }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Duration</label>\r\n                                <select formControlName=\"duration\" class=\"form-control\">\r\n                                    <option>Select Duration</option>\r\n                                    <option value=\"Month\">Month</option>\r\n                                    <option value=\"Quarterly\">Quarterly</option>\r\n                                    <option value=\"halfyerly\">Halfyearly</option>\r\n                                    <option value=\"year\">year</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.duration\" class=\"alert alert-danger\">\r\n                                {{ formErrors.duration }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!planAddForm.valid\">Update Plan</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/planlist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header brandingColor\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Plans</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/admin/plan/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Plan\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"plans.length >0\">\r\n            <thead class=\"text-warning\">\r\n                <th>Name</th>\r\n                <th>Amount</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let customer of plans\">\r\n                    <td class=\"padding0\">{{customer.name}}</td>\r\n                    <td class=\"padding0\">{{customer.amount}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/plan/',customer._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a href=\"javascript:void(0)\" rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deletePlan(customer._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-primary\" *ngIf=\"plans.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> Plans Empty Kindly create One\"</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/staff/staff.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n.staffClass{\r\n\theight: 100%;\r\n}\r\n\r\n.dobLabel label{\r\n\tleft : 30%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/staff/staff.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper staffClass\">\r\n\t<app-admin-sidebar></app-admin-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-admin-header></app-admin-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/staff/staff.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StaffComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return StaffListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StaffEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var StaffComponent = (function () {
    function StaffComponent(lf, adminService, router, route) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        //this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    StaffComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    StaffComponent.prototype.getAdmin = function () {
    };
    return StaffComponent;
}());
StaffComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-staff',
        template: __webpack_require__("../../../../../src/app/admin/staff/staff.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/staff/staff.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object])
], StaffComponent);

var StaffListComponent = (function () {
    function StaffListComponent(lf, 
        /*private staffService: StaffService,*/
        adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.staffs = [];
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    StaffListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    StaffListComponent.prototype.getList = function () {
        var _this = this;
        this.adminService.staffList().subscribe(function (data) {
            if (!data.error) {
                _this.staffs = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    StaffListComponent.prototype.deleteStaff = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.adminService.staffDelete(id).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show('Staff Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                }
                _this.getList();
            });
        }
    };
    return StaffListComponent;
}());
StaffListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-staff-list',
        template: __webpack_require__("../../../../../src/app/admin/staff/stafflist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/staff/staff.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _j || Object])
], StaffListComponent);

var StaffAddComponent = (function () {
    function StaffAddComponent(lf, staffService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.staffService = staffService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'email': '',
            'phonenumber': '',
            'password': '',
            'newpassword': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            'percentage': {
                'required': 'Percentage is required.',
            },
            'dob': {
                'required': 'Date of Birth is required.',
            },
            'qualification': {
                'required': 'Qulification is required.',
            },
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    StaffAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.staffAddForm = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            qualification: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            dob: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            percentage: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            matchpass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
        });
        this.staffAddForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    StaffAddComponent.prototype.matchpasswordreg = function () {
        if (this.staffAddForm.value.newpassword != '') {
            if (this.staffAddForm.value.password == this.staffAddForm.value.newpassword) {
                this.staffAddForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.staffAddForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
    };
    StaffAddComponent.prototype.staffAdd = function () {
        var _this = this;
        this.adminService.staffAdd(this.staffAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Staff Created Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/staff']);
            }
            else {
                _this._flashMessagesService.show('Email already in use', { cssClass: 'danger-alert', timeout: 5000 });
                _this.staffAddForm.reset();
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    StaffAddComponent.prototype.onValueChanged = function (data) {
        if (!this.staffAddForm) {
            return;
        }
        var form = this.staffAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return StaffAddComponent;
}());
StaffAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-staff-add',
        template: __webpack_require__("../../../../../src/app/admin/staff/staffadd.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/staff/staff.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _q || Object])
], StaffAddComponent);

var StaffEditComponent = (function () {
    function StaffEditComponent(lf, staffService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.staffService = staffService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.currentStaff = {};
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'phonenumber': '',
            'percentage': '',
            'dob': '',
            'qualification': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
            },
            'percentage': {
                'required': 'Percentage is required.',
            },
            'dob': {
                'required': 'Date of Birth is required.',
            },
            'qualification': {
                'required': 'Qulification is required.',
            }
        };
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    StaffEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.staffAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            qualification: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            dob: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            percentage: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.staff(id);
        });
        this.staffAddForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    StaffEditComponent.prototype.staffUpdate = function () {
        var _this = this;
        this.adminService.staffUpdate(this.staffAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Staff Updated successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/staff']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    StaffEditComponent.prototype.staff = function (id) {
        var _this = this;
        this.adminService.staff(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentStaff = data.message;
                console.log(_this.currentStaff);
                _this.staffAddForm.patchValue(_this.currentStaff);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    StaffEditComponent.prototype.onValueChanged = function (data) {
        if (!this.staffAddForm) {
            return;
        }
        var form = this.staffAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return StaffEditComponent;
}());
StaffEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-staff-edit',
        template: __webpack_require__("../../../../../src/app/admin/staff/staffedit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/staff/staff.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["a" /* AdminService */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _w || Object])
], StaffEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
//# sourceMappingURL=staff.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/staff/staffadd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Add Staff</h4>\r\n                <p class=\"category\">Complete your profile</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"staffAddForm\" (ngSubmit)=\"staffAdd()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Fist Name</label>\r\n                                <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.firstname }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Last Name</label>\r\n                                <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.lastname }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Email address</label>\r\n                                <input formControlName=\"email\" type=\"email\" class=\"form-control\" validateOnBlur [validateFormControl] = \"staffAddForm.controls['email']\">\r\n                            </div>\r\n                            <div *ngIf=\"staffAddForm.controls['email'].touched && staffAddForm.controls['email'].dirty && staffAddForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                {{ formErrors.email}}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Phone Number</label>\r\n                                <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phonenumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating dobLabel\">\r\n                                <label class=\"control-label\">Date Of Birth</label>\r\n                                <input formControlName=\"dob\" type=\"date\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.dob\" class=\"alert alert-danger\">\r\n                                {{ formErrors.dob }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Qualification</label>\r\n                                <input formControlName=\"qualification\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.qualification\" class=\"alert alert-danger\">\r\n                                {{ formErrors.qualification }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Percentage</label>\r\n                                <input formControlName=\"percentage\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.percentage\" class=\"alert alert-danger\">\r\n                                {{ formErrors.percentage }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Password</label>\r\n                                <input formControlName=\"password\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                {{ formErrors.password }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Confirm Password</label>\r\n                                <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                {{ formErrors.newpassword }}\r\n                            </div>\r\n                            <div style=\"padding: 3px;\" class=\"alert alert-danger\" *ngIf=\"MutchPassword\">Password not match</div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!staffAddForm.valid\">Save Staff</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/staff/staffedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Edit Staff</h4>\r\n                <p class=\"category\">Complete your profile</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"staffAddForm\" (ngSubmit)=\"staffUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Fist Name</label>\r\n                                <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.firstname }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Last Name</label>\r\n                                <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                {{ formErrors.lastname }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Email address</label>\r\n                                <input formControlName=\"email\" type=\"email\" class=\"form-control\" disabled>\r\n                            </div>\r\n                            <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                {{ formErrors.email }}\r\n                            </div> -->\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Phone Number</label>\r\n                                <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phonenumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Date Of Birth</label>\r\n                                <input formControlName=\"dob\" type=\"date\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.dob\" class=\"alert alert-danger\">\r\n                                {{ formErrors.dob }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Qualification</label>\r\n                                <input formControlName=\"qualification\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.qualification\" class=\"alert alert-danger\">\r\n                                {{ formErrors.qualification }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Percentage</label>\r\n                                <input formControlName=\"percentage\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.percentage\" class=\"alert alert-danger\">\r\n                                {{ formErrors.percentage }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-warning pull-right\" [disabled]=\"!staffAddForm.valid\">Update Staff</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/staff/stafflist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header brandingColor\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Staff</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/admin/staff/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Staff\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"staffs.length >0\">\r\n            <thead class=\"text-warning\">\r\n                <th>Name</th>\r\n                <th>Phone Number</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let staff of staffs\">\r\n                    <td class=\"padding0\">{{staff.firstname}} {{staff.lastname}}</td>\r\n                    <td class=\"padding0\">{{staff.phonenumber}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/staff/',staff._id]\" rel=\"tooltip\" title=\"Edit Staff\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a href=\"javascript:void(0)\" rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deleteStaff(staff._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-primary\" *ngIf=\"staffs.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <strong> No Data - </strong> Staff Empty Kindly create One\"</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<flash-messages></flash-messages>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directive__ = __webpack_require__("../../../../../src/app/directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guards_index__ = __webpack_require__("../../../../../src/app/guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__customer_login_customerlogin_component__ = __webpack_require__("../../../../../src/app/customer/login/customerlogin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__customer_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/customer/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__header_customerheader_component__ = __webpack_require__("../../../../../src/app/header/customerheader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__ = __webpack_require__("../../../../../src/app/customer/business/business.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__staff_login_stafflogin_component__ = __webpack_require__("../../../../../src/app/staff/login/stafflogin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__staff_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/staff/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__admin_login_adminlogin_component__ = __webpack_require__("../../../../../src/app/admin/login/adminlogin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__admin_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__header_adminheader_component__ = __webpack_require__("../../../../../src/app/header/adminheader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__ = __webpack_require__("../../../../../src/app/admin/staff/staff.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__ = __webpack_require__("../../../../../src/app/admin/plan/plan.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__admin_customer_customer_component__ = __webpack_require__("../../../../../src/app/admin/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__admin_business_business_component__ = __webpack_require__("../../../../../src/app/admin/business/business.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_recaptcha__ = __webpack_require__("../../../../angular2-recaptcha/angular2-recaptcha.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angular2_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_angular2_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__account_active_account_active_component__ = __webpack_require__("../../../../../src/app/account-active/account-active.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










/*Customer*/







/*Admin*/











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_5__directive__["a" /* MyDirective */], __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileSelectDirective"],
            __WEBPACK_IMPORTED_MODULE_17__admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_18__admin_login_adminlogin_component__["b" /* AdminLoginComponent */], __WEBPACK_IMPORTED_MODULE_18__admin_login_adminlogin_component__["a" /* AdminForgetPasswordComponent */], __WEBPACK_IMPORTED_MODULE_18__admin_login_adminlogin_component__["c" /* AdminResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_20__header_adminheader_component__["a" /* AdminHeaderComponent */], __WEBPACK_IMPORTED_MODULE_20__header_adminheader_component__["b" /* AdminSidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__admin_dashboard_dashboard_component__["b" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_19__admin_dashboard_dashboard_component__["a" /* AdminProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__["b" /* StaffComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__["d" /* StaffListComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__["a" /* StaffAddComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__["c" /* StaffEditComponent */],
            __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["a" /* AdminPlanComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["d" /* PlanListComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["b" /* PlanAddComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["c" /* PlanEditComponent */],
            __WEBPACK_IMPORTED_MODULE_23__admin_customer_customer_component__["a" /* AdminCustomerComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_customer_customer_component__["d" /* CustomerListComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_customer_customer_component__["b" /* CustomerAddComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_customer_customer_component__["c" /* CustomerEditComponent */],
            __WEBPACK_IMPORTED_MODULE_24__admin_business_business_component__["a" /* AdminBusinessComponent */], __WEBPACK_IMPORTED_MODULE_24__admin_business_business_component__["c" /* BusinessListComponent */], __WEBPACK_IMPORTED_MODULE_24__admin_business_business_component__["d" /* BusinessViewComponent */], __WEBPACK_IMPORTED_MODULE_24__admin_business_business_component__["b" /* BusinessEditComponent */],
            __WEBPACK_IMPORTED_MODULE_10__customer_customer_component__["a" /* CustomerComponent */],
            __WEBPACK_IMPORTED_MODULE_11__customer_login_customerlogin_component__["b" /* CustomerLoginComponent */], __WEBPACK_IMPORTED_MODULE_11__customer_login_customerlogin_component__["c" /* CustomerRegisterComponent */], __WEBPACK_IMPORTED_MODULE_11__customer_login_customerlogin_component__["a" /* CustomerForgetPasswordComponent */], __WEBPACK_IMPORTED_MODULE_11__customer_login_customerlogin_component__["d" /* CustomerResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_12__customer_dashboard_dashboard_component__["a" /* CustomerDashboardComponent */], __WEBPACK_IMPORTED_MODULE_12__customer_dashboard_dashboard_component__["b" /* CustomerProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_13__header_customerheader_component__["a" /* CustomerHeaderComponent */], __WEBPACK_IMPORTED_MODULE_13__header_customerheader_component__["b" /* CustomerSidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__["b" /* CustomerBusinessComponent */], __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__["e" /* CustomerBusinessListComponent */], __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__["a" /* CustomerBusinessAddComponent */], __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__["c" /* CustomerBusinessDocumentComponent */], __WEBPACK_IMPORTED_MODULE_14__customer_business_business_component__["d" /* CustomerBusinessEditComponent */], __WEBPACK_IMPORTED_MODULE_27__account_active_account_active_component__["a" /* AccountActiveComponent */],
            __WEBPACK_IMPORTED_MODULE_21__admin_staff_staff_component__["b" /* StaffComponent */],
            __WEBPACK_IMPORTED_MODULE_15__staff_login_stafflogin_component__["b" /* StaffLoginComponent */], __WEBPACK_IMPORTED_MODULE_15__staff_login_stafflogin_component__["a" /* StaffForgetPasswordComponent */], __WEBPACK_IMPORTED_MODULE_15__staff_login_stafflogin_component__["c" /* StaffResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_16__staff_dashboard_dashboard_component__["a" /* StaffDashboardComponent */], __WEBPACK_IMPORTED_MODULE_16__staff_dashboard_dashboard_component__["b" /* StaffProfileComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_26_angular2_recaptcha__["ReCaptchaModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_7__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_25_angular2_flash_messages__["FlashMessagesModule"],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__guards_index__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_8__guards_index__["b" /* CustomerAuthGuard */], __WEBPACK_IMPORTED_MODULE_9__service_index__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_9__service_index__["c" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_9__service_index__["e" /* StaffService */], __WEBPACK_IMPORTED_MODULE_9__service_index__["b" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_9__service_index__["d" /* PlanService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_login_adminlogin_component__ = __webpack_require__("../../../../../src/app/admin/login/adminlogin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_staff_staff_component__ = __webpack_require__("../../../../../src/app/admin/staff/staff.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_plan_plan_component__ = __webpack_require__("../../../../../src/app/admin/plan/plan.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__ = __webpack_require__("../../../../../src/app/admin/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_business_business_component__ = __webpack_require__("../../../../../src/app/admin/business/business.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__ = __webpack_require__("../../../../../src/app/customer/login/customerlogin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__customer_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/customer/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__account_active_account_active_component__ = __webpack_require__("../../../../../src/app/account-active/account-active.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__ = __webpack_require__("../../../../../src/app/customer/business/business.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__guards_index__ = __webpack_require__("../../../../../src/app/guards/index.ts");














var appRoutes = [
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_1__admin_admin_component__["a" /* AdminComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_adminlogin_component__["b" /* AdminLoginComponent */] },
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_adminlogin_component__["b" /* AdminLoginComponent */] },
            { path: 'forget-password', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_adminlogin_component__["a" /* AdminForgetPasswordComponent */] },
            { path: 'reset-password/:id', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_adminlogin_component__["c" /* AdminResetPasswordComponent */] },
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_3__admin_dashboard_dashboard_component__["b" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_3__admin_dashboard_dashboard_component__["a" /* AdminProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]] },
            { path: 'staff', component: __WEBPACK_IMPORTED_MODULE_4__admin_staff_staff_component__["b" /* StaffComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__admin_staff_staff_component__["d" /* StaffListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_4__admin_staff_staff_component__["a" /* StaffAddComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_4__admin_staff_staff_component__["c" /* StaffEditComponent */], },
                ] },
            { path: 'customer', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["a" /* AdminCustomerComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["d" /* CustomerListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["b" /* CustomerAddComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["c" /* CustomerEditComponent */], },
                ] },
            { path: 'plan', component: __WEBPACK_IMPORTED_MODULE_5__admin_plan_plan_component__["a" /* AdminPlanComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__admin_plan_plan_component__["d" /* PlanListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_5__admin_plan_plan_component__["b" /* PlanAddComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_5__admin_plan_plan_component__["c" /* PlanEditComponent */], },
                ] },
            { path: 'business', component: __WEBPACK_IMPORTED_MODULE_7__admin_business_business_component__["a" /* AdminBusinessComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["a" /* AuthGuard */]], children: [
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_7__admin_business_business_component__["c" /* BusinessListComponent */], },
                    { path: 'view/:id', component: __WEBPACK_IMPORTED_MODULE_7__admin_business_business_component__["d" /* BusinessViewComponent */], },
                    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_7__admin_business_business_component__["b" /* BusinessEditComponent */], },
                ] },
        ] },
    { path: 'customer', component: __WEBPACK_IMPORTED_MODULE_8__customer_customer_component__["a" /* CustomerComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["b" /* CustomerLoginComponent */] },
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["b" /* CustomerLoginComponent */] },
            { path: 'register', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["c" /* CustomerRegisterComponent */] },
            { path: 'forget-password', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["a" /* CustomerForgetPasswordComponent */] },
            { path: 'reset-password/:id', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["d" /* CustomerResetPasswordComponent */] },
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_10__customer_dashboard_dashboard_component__["a" /* CustomerDashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["b" /* CustomerAuthGuard */]] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_10__customer_dashboard_dashboard_component__["b" /* CustomerProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["b" /* CustomerAuthGuard */]] },
            { path: 'business', component: __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__["b" /* CustomerBusinessComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_index__["b" /* CustomerAuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__["e" /* CustomerBusinessListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__["a" /* CustomerBusinessAddComponent */], },
                    { path: 'document-update', component: __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__["c" /* CustomerBusinessDocumentComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_12__customer_business_business_component__["d" /* CustomerBusinessEditComponent */], },
                ] },
        ] },
    /*{ path: 'staff', component: StaffsComponent, children :[
        { path: '', component: StaffLoginComponent },
        { path: 'login', component: StaffLoginComponent },
        { path: 'forget-password', component: StaffForgetPasswordComponent },
        { path: 'reset-password/:id', component: StaffResetPasswordComponent },
        { path: 'dashboard', component: StaffDashboardComponent},
        { path: 'profile', component: StaffProfileComponent}
    ]},*/
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__customer_login_customerlogin_component__["b" /* CustomerLoginComponent */] },
    { path: 'account-active/:token', component: __WEBPACK_IMPORTED_MODULE_11__account_active_account_active_component__["a" /* AccountActiveComponent */] },
    { path: '**', redirectTo: '' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/customer/business/business.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n.myCard{\r\nborder: 1px solid #43a047;\r\npadding: 10px;\r\nborder-radius: 10px;\r\n}\r\n\r\n.myCard > .form-group {\r\n    padding-bottom: 0px;\r\n    margin: 0;\r\n}\r\n\r\n.textCenter{\r\n\ttext-align: center;\r\n}\r\n\r\n.addBusinessClass{\r\n\theight: 100%;\r\n}\r\n\r\n.expiryDateLabel label{\r\n\tleft: 30%;\r\n}\r\n\r\n.viewFile{\r\n\tposition: absolute;\r\n    top: 5px;\r\n    right: 15px;\r\n}\r\n\r\n.viewFile a{\r\n    color: #4caf50;\r\n    text-decoration: underline;\r\n}\r\n\r\n.myCard a.btn{\r\n    padding: 12px !important;\r\n}\r\n\r\n\r\n.docUploaded{\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  color: #4caf50;\r\n}\r\n\r\n\r\n\r\n\r\n/* Start progress bar*/\r\n.progress {\r\n  overflow: visible;\r\n  margin-bottom: 26px;\r\n  height: 6px;\r\n  width: 100%;\r\n  background-color: white !important;\r\n}\r\n\r\n.progress .progress-bar {\r\n  position: relative;\r\n  border-radius: 4px;\r\n}\r\n\r\n.progress-bar-info{\r\n  background-color: #0198b3;\r\n}\r\n\r\n\r\n/* End progress bar*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/business/business.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper addBusinessClass\">\r\n\t<app-customer-sidebar></app-customer-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-customer-header></app-customer-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/business/business.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerBusinessComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CustomerBusinessListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerBusinessAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CustomerBusinessDocumentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CustomerBusinessEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__("../../../../../src/app/global.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*service*/

var CustomerBusinessComponent = (function () {
    function CustomerBusinessComponent(lf, router, route) {
        this.lf = lf;
        this.router = router;
        this.route = route;
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerBusinessComponent.prototype.ngOnInit = function () { };
    return CustomerBusinessComponent;
}());
CustomerBusinessComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-business',
        template: __webpack_require__("../../../../../src/app/customer/business/business.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], CustomerBusinessComponent);

var CustomerBusinessListComponent = (function () {
    function CustomerBusinessListComponent(lf, businessService, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.businesses = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerBusinessListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.customer(_this.currentCustomer._id);
        });
    };
    CustomerBusinessListComponent.prototype.customer = function (id) {
        var _this = this;
        this.customerService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                _this.getList(_this.currentCustomer._id);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessListComponent.prototype.getList = function (id) {
        var _this = this;
        this.businessService.businessList(id).subscribe(function (data) {
            if (!data.error) {
                _this.businesses = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessListComponent.prototype.deleteBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.businessService.businessDelete(id).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show('Business deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    _this.getList(_this.currentCustomer._id);
                }
                else {
                    _this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'alert-success', timeout: 5000 });
                }
            });
        }
    };
    return CustomerBusinessListComponent;
}());
CustomerBusinessListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-list',
        template: __webpack_require__("../../../../../src/app/customer/business/businesslist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _j || Object])
], CustomerBusinessListComponent);

var CustomerBusinessAddComponent = (function () {
    function CustomerBusinessAddComponent(lf, businessService, customerService, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.customerService = customerService;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.plans = [];
        this.isVisit = false;
        this.mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.phoneRegex = /^[0-9]*$/;
        /*passportRegex = /^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$/;*/
        this.formErrors = {
            'businessName': '',
            'tradeLicenseNumber': '',
            'tradeLicenseExpiry': '',
            'emiRate': '',
            'phoneNumber': '',
            'ownerName': '',
            'mobileNumber': '',
            /* 'passportNumber' : '',*/
            'nationality': '',
            'emiRateIdNumber': '',
        };
        this.validationMessages = {
            'businessName': {
                'required': 'Name is required.',
            },
            'tradeLicenseNumber': {
                'required': 'Trade License Number is required.',
            },
            'emiRate': {
                'required': 'Emi Rate is required.',
            },
            'tradeLicenseExpiry': {
                'required': 'Trade License Expiry is required.',
            },
            'phoneNumber': {
                'required': 'Phone Number is required.',
                'pattern': "Invalid Phone Number"
            },
            'ownerName': {
                'required': 'Owner Name is required.'
            },
            'mobileNumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number along with country code.',
                'maxlength': 'Enter 10 digit mobile number along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            /*'passportNumber' : {
                'required':    'Passport Number is required.',
                'pattern' :    'eg : G0308084<1ITY9999999Q0410056<<<<<<<<<<<<<<39'
            },*/
            'nationality': {
                'required': 'Nationality is required.'
            },
            'emiRateIdNumber': {
                'required': 'Emirate Id Number is required.'
            },
        };
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerBusinessAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessAddForm = this.lf.group({
            businessName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phoneNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            ownerName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            mobileNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.mobileRegex)]],
            passportNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            nationality: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRateIdNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            ownerId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            plan: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],
        });
        this.customer(this.currentCustomer._id);
        this.businessAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.getPlanList();
    };
    CustomerBusinessAddComponent.prototype.checkIsVisit = function () {
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
            this.isVisit = true;
        }
        else {
            this.isVisit = false;
        }
    };
    CustomerBusinessAddComponent.prototype.getPlanList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessAddComponent.prototype.businessAdd = function () {
        /*this.businessService.businessAdd(this.businessAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Business Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['customer/business/document-update',data.message._id]);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'danger-alert', timeout: 5000 });
            }
        );*/
        console.log("this.businessAddForm.value");
        console.log(this.businessAddForm.value);
        this._flashMessagesService.show('Upload Documents to add Business', { cssClass: 'alert-warning', timeout: 5000 });
        var bID = 'business_' + this.currentCustomer._id;
        localStorage.setItem(bID, JSON.stringify(this.businessAddForm.value));
        this.router.navigate(['customer/business/document-update']);
    };
    CustomerBusinessAddComponent.prototype.customer = function (id) {
        var _this = this;
        this.customerService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                var name = _this.currentCustomer.firstname + ' ' + _this.currentCustomer.lastname;
                _this.businessAddForm.controls["ownerName"].setValue(name);
                _this.businessAddForm.controls["mobileNumber"].setValue(_this.currentCustomer.phonenumber);
                _this.businessAddForm.controls["ownerId"].setValue(data.message._id);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessAddComponent.prototype.onValueChanged = function (data) {
        if (!this.businessAddForm) {
            return;
        }
        var form = this.businessAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return CustomerBusinessAddComponent;
}());
CustomerBusinessAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-business-add',
        template: __webpack_require__("../../../../../src/app/customer/business/businessadd.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _r || Object])
], CustomerBusinessAddComponent);

var CustomerBusinessDocumentComponent = (function () {
    function CustomerBusinessDocumentComponent(lf, businessService, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.businesses = {};
        this.processCompletePercent = 0;
        this.imgUrl = __WEBPACK_IMPORTED_MODULE_5__global__["a" /* imageUrl */];
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_5__global__["b" /* url */] + 'upload' });
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerBusinessDocumentComponent.prototype.ngOnInit = function () {
        this.businessAddForm = this.lf.group({
            businessName: [],
            typeOfOrg: [],
            tradeLicenseNumber: [],
            issuingAuthority: [],
            tradeLicenseExpiry: [],
            emiRate: [],
            phoneNumber: [],
            ownerName: [],
            mobileNumber: [],
            passportNumber: [],
            nationality: [],
            emiRateIdNumber: [],
            ownerId: [],
            plan: [],
            bankName: [],
            bankBranch: [],
            bankAccountNumber: [],
            certificateOfIncorporationNo: [],
            vattrn: [],
            siteVisit: [],
            noDaysRequired: [],
            passportFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            visaFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRatesIdFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tradeLicenseFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            articleAndPartnershipFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            certificateOfIncorporationFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankStatementFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        var bID = 'business_' + this.currentCustomer._id;
        this.businessAddForm.patchValue(JSON.parse(localStorage.getItem(bID)));
    };
    CustomerBusinessDocumentComponent.prototype.onChange = function (event, fileType) {
        var _this = this;
        this.uploader.uploadAll();
        this.uploader.onProgressItem = function (file, progress) {
            _this.processCompletePercent = progress;
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            console.log(fileType, responsePath.filename);
            _this.businessAddForm.controls[fileType].setValue(responsePath.filename);
        };
    };
    CustomerBusinessDocumentComponent.prototype.businessDocument = function () {
        var _this = this;
        this.businessService.businessAdd(this.businessAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Business Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['customer/business']);
                localStorage.removeItem('business_' + _this.currentCustomer._id);
            }
        }, function (err) {
            _this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'danger-alert', timeout: 5000 });
        });
    };
    return CustomerBusinessDocumentComponent;
}());
CustomerBusinessDocumentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-document',
        template: __webpack_require__("../../../../../src/app/customer/business/businessdocument.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _w || Object, typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _x || Object])
], CustomerBusinessDocumentComponent);

var CustomerBusinessEditComponent = (function () {
    function CustomerBusinessEditComponent(lf, businessService, customerService, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.businessService = businessService;
        this.customerService = customerService;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.plans = [];
        this.isVisit = false;
        this.mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.phoneRegex = /^[0-9]*$/;
        this.imgUrl = __WEBPACK_IMPORTED_MODULE_5__global__["a" /* imageUrl */];
        this.processCompletePercent = 0;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_5__global__["b" /* url */] + 'upload' });
        this.formErrors = {
            'businessName': '',
            'tradeLicenseNumber': '',
            'tradeLicenseExpiry': '',
            'emiRate': '',
            'phoneNumber': '',
            'ownerName': '',
            'mobileNumber': '',
            'nationality': '',
            'emiRateIdNumber': '',
        };
        this.validationMessages = {
            'businessName': {
                'required': 'Name is required.',
            },
            'tradeLicenseNumber': {
                'required': 'Trade License Number is required.',
            },
            'emiRate': {
                'required': 'Emi Rate is required.',
            },
            'tradeLicenseExpiry': {
                'required': 'Trade License Expiry is required.',
            },
            'phoneNumber': {
                'required': 'Phone Number is required.',
                'pattern': "Invalid Phone Number"
            },
            'ownerName': {
                'required': 'Owner Name is required.'
            },
            'mobileNumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number along with country code.',
                'maxlength': 'Enter 10 digit mobile number along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            'nationality': {
                'required': 'Nationality is required.'
            },
            'emiRateIdNumber': {
                'required': 'Emirate Id Number is required.'
            },
        };
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerBusinessEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            businessName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phoneNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            ownerName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            mobileNumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.mobileRegex)]],
            passportNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            nationality: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRateIdNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            ownerId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            plan: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],
            passportFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            visaFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            emiRatesIdFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tradeLicenseFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            articleAndPartnershipFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            certificateOfIncorporationFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            bankStatementFile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.business(id);
        });
        this.businessAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.getPlanList();
    };
    CustomerBusinessEditComponent.prototype.checkIsVisit = function () {
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
            this.isVisit = true;
        }
        else {
            this.isVisit = false;
        }
    };
    CustomerBusinessEditComponent.prototype.getPlanList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessEditComponent.prototype.businessUpdate = function () {
        var _this = this;
        this.businessService.businessUpdate(this.businessAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Business Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['customer/business']);
            }
            else {
                _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                _this.router.navigate(['customer/business']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    CustomerBusinessEditComponent.prototype.onChange = function (event, fileType) {
        var _this = this;
        this.uploader.uploadAll();
        this.uploader.onProgressItem = function (file, progress) {
            _this.processCompletePercent = progress;
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            _this.businessAddForm.controls[fileType].setValue(responsePath.filename);
            /*this.businesses[fileType]= responsePath.filename;*/
        };
    };
    CustomerBusinessEditComponent.prototype.business = function (id) {
        var _this = this;
        this.businessService.business(id).subscribe(function (data) {
            if (!data.error) {
                console.log(data);
                _this.businessAddForm.patchValue(data.message);
                console.log("this.businessAddForm.value");
                console.log(_this.businessAddForm.value);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerBusinessEditComponent.prototype.onValueChanged = function (data) {
        if (!this.businessAddForm) {
            return;
        }
        var form = this.businessAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return CustomerBusinessEditComponent;
}());
CustomerBusinessEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-business-edit',
        template: __webpack_require__("../../../../../src/app/customer/business/businessedit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/business/business.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_y = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _y || Object, typeof (_z = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["b" /* BusinessService */]) === "function" && _z || Object, typeof (_0 = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["c" /* CustomerService */]) === "function" && _0 || Object, typeof (_1 = typeof __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_index__["d" /* PlanService */]) === "function" && _1 || Object, typeof (_2 = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _2 || Object, typeof (_3 = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _3 || Object, typeof (_4 = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _4 || Object])
], CustomerBusinessEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
//# sourceMappingURL=business.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/business/businessadd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Add Business</h4>\r\n                <p class=\"category\">Create your Business Data</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"businessAddForm\" (ngSubmit)=\"businessAdd()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Name of business*</label>\r\n                                <input formControlName=\"businessName\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.businessName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.businessName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Types of business Organisation</label>\r\n                                <select formControlName=\"typeOfOrg\" class=\"form-control\">\r\n                                    <option>Natural Person</option>\r\n                                    <option>Incorporated entity</option>\r\n                                    <option>Non-incorporated entity</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Trade License Number*</label>\r\n                                <input formControlName=\"tradeLicenseNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseNumber }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Issuing Authority</label>\r\n                                <input formControlName=\"issuingAuthority\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating expiryDateLabel\">\r\n                                <label class=\"control-label\">Trade License Expiry*</label>\r\n                                <input formControlName=\"tradeLicenseExpiry\" type=\"date\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseExpiry\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseExpiry }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Emirate*</label>\r\n                                <select formControlName=\"emiRate\" class=\"form-control\">\r\n                                    <option>Dubai</option>\r\n                                    <option>Abu Dhabi</option>\r\n                                    <option>Ajman</option>\r\n                                    <option>Fujairah</option>\r\n                                    <option>UAQ</option>\r\n                                    <option>RAK</option>\r\n                                    <option>Sharjah</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRate\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRate }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Phone*</label>\r\n                                <input formControlName=\"phoneNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phoneNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phoneNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name of Owner/Manager*</label>\r\n                                <input formControlName=\"ownerName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.ownerName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.ownerName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Mobile Number*</label>\r\n                                <input formControlName=\"mobileNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.mobileNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.mobileNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Passport Number*</label>\r\n                                <input formControlName=\"passportNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <!-- <div *ngIf=\"formErrors.passportNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.passportNumber }}\r\n                            </div> -->\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Nationality*</label>\r\n                                <input formControlName=\"nationality\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.nationality\" class=\"alert alert-danger\">\r\n                                {{ formErrors.nationality }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Emirates ID Number*</label>\r\n                                <input formControlName=\"emiRateIdNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRateIdNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRateIdNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Bank Name</label>\r\n                                <input formControlName=\"bankName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Branch Name</label>\r\n                                <input formControlName=\"bankBranch\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Account Number</label>\r\n                                <input formControlName=\"bankAccountNumber\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Certificate of incorporation no</label>\r\n                                <input formControlName=\"certificateOfIncorporationNo\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">VAT TRN</label>\r\n                                <input formControlName=\"vattrn\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Select Plan*</label>\r\n                                <select formControlName=\"plan\" class=\"form-control\">\r\n                                    <option *ngFor=\"let plan of plans\" [value]=\"plan._id\">{{plan.type}} business - {{plan.name}} ({{plan.amount}}/{{plan.duration}})</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Optional Site visit package</label>\r\n                                <select formControlName=\"siteVisit\" class=\"form-control\" (change)=\"checkIsVisit()\">\r\n                                    <option value=\"AED 0\">No Site Visit Required(AED 0)</option>\r\n                                    <option value=\"AED 150\">Site Visit Required(AED 150)</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\" *ngIf=\"isVisit\">\r\n                            <div class=\"form-group label-floating\" >\r\n                                <label class=\"control-label\">Number of days required</label>\r\n                                <input formControlName=\"noDaysRequired\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!businessAddForm.valid\">Upload Documents</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/business/businessdocument.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Update Business Document</h4>\r\n                <p class=\"category\">Create your Business Data</p>\r\n            </div>\r\n\r\n            <div class=\"card-content\">\r\n                <div class=\"progress progress-bar\" *ngIf=\"processCompletePercent > 0 && processCompletePercent < 100\">\r\n                    <div class=\"progress-bar progress-bar-info progress-bar\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width': processCompletePercent + '%'}\"></div>\r\n                </div>\r\n\r\n                <form [formGroup]=\"businessAddForm\" (ngSubmit)=\"businessDocument()\">\r\n                \t<!-- <div class=\"row\"> -->\r\n                        <div class=\"col-md-4\" style=\"padding-left: 6px;\">\r\n                        \t<div class=\"myCard\">\r\n\t                        \t<div class=\"form-group\">\r\n\t                                <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'passportFile')\">\r\n\t                                <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Passport File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.passportFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                        \t</div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t<div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'visaFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Visa File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.visaFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                    \r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'emiRatesIdFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD EMI Rates Id File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.emiRatesIdFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'tradeLicenseFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Trade License File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.tradeLicenseFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                   \r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t<div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'articleAndPartnershipFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Article and Partnership File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.articleAndPartnershipFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t<div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'certificateOfIncorporationFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Certificate of Incorporation File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.certificateOfIncorporationFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                        \t<div class=\"myCard\">\r\n                            \t<div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'bankStatementFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Bank Statement File</a>\r\n                                </div>\r\n                                <span *ngIf = \"businessAddForm.value.bankStatementFile != ''\" class=\"docUploaded\"><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i></span>\r\n                            </div>\r\n                        </div>\r\n                    <!-- </div> -->\r\n\r\n                    <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\r\n                        <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled] = \"!businessAddForm.valid\">Add Business</button>\r\n                    </div>\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/business/businessedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header brandingColor\">\r\n                <h4 class=\"title\">Update Business</h4>\r\n                <p class=\"category\">update your Business Data</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <div class=\"progress progress-bar\" *ngIf=\"processCompletePercent > 0 && processCompletePercent < 100\">\r\n                    <div class=\"progress-bar progress-bar-info progress-bar\" role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width': processCompletePercent + '%'}\"></div>\r\n                </div>\r\n                \r\n                <form [formGroup]=\"businessAddForm\" (ngSubmit)=\"businessUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name of business*</label>\r\n                                <input formControlName=\"businessName\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.businessName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.businessName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Types of business Organisation</label>\r\n                                <select formControlName=\"typeOfOrg\" class=\"form-control\">\r\n                                    <option>Natural Person</option>\r\n                                    <option>Incorporated entity</option>\r\n                                    <option>Non-incorporated entity</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Trade License Number*</label>\r\n                                <input formControlName=\"tradeLicenseNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseNumber }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Issuing Authority</label>\r\n                                <input formControlName=\"issuingAuthority\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Trade License Expiry*</label>\r\n                                <input formControlName=\"tradeLicenseExpiry\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.tradeLicenseExpiry\" class=\"alert alert-danger\">\r\n                                {{ formErrors.tradeLicenseExpiry }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Emirate*</label>\r\n                                <select formControlName=\"emiRate\" class=\"form-control\">\r\n                                    <option>Dubai</option>\r\n                                    <option>Abu Dhabi</option>\r\n                                    <option>Ajman</option>\r\n                                    <option>Fujairah</option>\r\n                                    <option>UAQ</option>\r\n                                    <option>RAK</option>\r\n                                    <option>Sharjah</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRate\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRate }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Phone*</label>\r\n                                <input formControlName=\"phoneNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.phoneNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.phoneNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Name of Owner / Manager*</label>\r\n                                <input formControlName=\"ownerName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.ownerName\" class=\"alert alert-danger\">\r\n                                {{ formErrors.ownerName }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Mobile Number*</label>\r\n                                <input formControlName=\"mobileNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.mobileNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.mobileNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Passport Number*</label>\r\n                                <input formControlName=\"passportNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.passportNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.passportNumber }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Nationality*</label>\r\n                                <input formControlName=\"nationality\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.nationality\" class=\"alert alert-danger\">\r\n                                {{ formErrors.nationality }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Emirates ID Number*</label>\r\n                                <input formControlName=\"emiRateIdNumber\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.emiRateIdNumber\" class=\"alert alert-danger\">\r\n                                {{ formErrors.emiRateIdNumber }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Bank Name</label>\r\n                                <input formControlName=\"bankName\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Branch Name</label>\r\n                                <input formControlName=\"bankBranch\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Account Number</label>\r\n                                <input formControlName=\"bankAccountNumber\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Certificate of incorporation no</label>\r\n                                <input formControlName=\"certificateOfIncorporationNo\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">VAT TRN </label>\r\n                                <input formControlName=\"vattrn\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Select Plan*</label>\r\n                                <select formControlName=\"plan\" class=\"form-control\">\r\n                                    <option *ngFor=\"let plan of plans\" [value]=\"plan._id\">{{plan.type}} business - {{plan.name}} ({{plan.amount}}/{{plan.duration}})</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Optional Site visit package</label>\r\n                                <select formControlName=\"siteVisit\" class=\"form-control\" (change)=\"checkIsVisit()\">\r\n                                    <option value=\"AED 0\">No Site Visit Required(AED 0)</option>\r\n                                    <option value=\"AED 150\">Site Visit Required(AED 150)</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\" *ngIf=\"isVisit\">\r\n                            <div class=\"form-group\" >\r\n                                <label class=\"control-label\">Number of days required</label>\r\n                                <input formControlName=\"noDaysRequired\" type=\"number\" class=\"form-control\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'passportFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Passport File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.passportFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.passportFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'visaFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">Upload Visa File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.visaFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.visaFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    \r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                 <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'emiRatesIdFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD EMI Rates Id File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.emiRatesIdFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.emiRatesIdFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                 <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'tradeLicenseFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Trade License File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.tradeLicenseFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.tradeLicenseFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                   \r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'articleAndPartnershipFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Article and Partnership File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.articleAndPartnershipFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.articleAndPartnershipFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'certificateOfIncorporationFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Certificate of Incorporation File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.certificateOfIncorporationFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.certificateOfIncorporationFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"myCard\">\r\n                                <div class=\"form-group\">\r\n                                    <input type=\"file\" class=\"form-control\" name=\"single\" ng2FileSelect [uploader]=\"uploader\" (change)=\"onChange($event,'bankStatementFile')\">\r\n                                    <a href=\"javascript:void(0)\" class=\"btn btn-success btn-round btn-block\">UPLOAD Bank Statement File</a>\r\n                                </div>\r\n                                <div class=\"form-group textCenter viewFile\" *ngIf=\"businessAddForm.value.bankStatementFile\">\r\n                                    <a target=\"_blank\" href=\"{{imgUrl}}{{businessAddForm.value.bankStatementFile}}\">View</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!businessAddForm.valid\">Update Business</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/business/businesslist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header brandingColor\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Business List of <strong>\"{{currentCustomer.firstname}} {{currentCustomer.lastname}}\"</strong></span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/customer/business/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Business\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"businesses.length >0\">\r\n            <thead class=\"text-warning\">\r\n                <th>Name</th>\r\n                <th>Type of Organisation</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let business of businesses\">\r\n                    <td class=\"padding0\">{{business.businessName}}</td>\r\n                    <td class=\"padding0\">{{business.typeOfOrg}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/customer/business/',business._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deleteBusiness(business._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"businesses.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <strong> No Data - </strong> Business Empty  of <strong>\"{{currentCustomer.firstname}} {{currentCustomer.lastname}}\"</strong></span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CustomerComponent = (function () {
    function CustomerComponent() {
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerComponent.prototype.ngOnInit = function () { };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer',
        template: __webpack_require__("../../../../../src/app/customer/customer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/customer.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CustomerComponent);

//# sourceMappingURL=customer.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-content .label-floating{\r\n\ttext-align: left;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-customer-sidebar></app-customer-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-customer-header></app-customer-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header brandingColor\">\r\n                                <i class=\"material-icons\">perm_identity</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Business</p>\r\n                                <h3 class=\"title\">{{business.length}}\r\n                                </h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/customer/business/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var CustomerDashboardComponent = (function () {
    function CustomerDashboardComponent(lf, customerService, businessService, router, route) {
        this.lf = lf;
        this.customerService = customerService;
        this.businessService = businessService;
        this.router = router;
        this.route = route;
        this.currentCustomer = {};
        this.staffs = [];
        this.plans = [];
        this.business = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerDashboardComponent.prototype.ngOnInit = function () {
        this.getBusinessList();
    };
    CustomerDashboardComponent.prototype.getBusinessList = function () {
        var _this = this;
        this.businessService.businessList(this.currentCustomer._id).subscribe(function (bsns) {
            if (!bsns.error) {
                _this.business = bsns.message;
            }
        });
    };
    return CustomerDashboardComponent;
}());
CustomerDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-dashboard',
        template: __webpack_require__("../../../../../src/app/customer/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["b" /* BusinessService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], CustomerDashboardComponent);

var CustomerProfileComponent = (function () {
    function CustomerProfileComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'phonenumber': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            }
        };
        this.cpFormErrors = {
            'password': '',
            'newpassword': ''
        };
        this.cpValidationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            dob: [''],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.cpForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.customerAddForm.patchValue(this.currentCustomer);
        this.cpForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.customerAddForm.valueChanges.subscribe(function (data) { return _this.onValueChangedForm(data); });
        this.onValueChangedForm();
        this.cpForm.controls["_id"].setValue(this.currentCustomer._id);
    };
    CustomerProfileComponent.prototype.customer = function (id) {
        var _this = this;
        this.customerService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', JSON.stringify(data.message));
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerProfileComponent.prototype.matchpasswordreg = function () {
        if (this.cpForm.value.newpassword != '') {
            if (this.cpForm.value.password == this.cpForm.value.newpassword) {
                this.cpForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.cpForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
    };
    CustomerProfileComponent.prototype.onValueChanged = function (data) {
        if (!this.cpForm) {
            return;
        }
        var form = this.cpForm;
        for (var field in this.cpFormErrors) {
            // clear previous error message (if any)
            this.cpFormErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.cpValidationMessages[field];
                for (var key in control.errors) {
                    this.cpFormErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    CustomerProfileComponent.prototype.onValueChangedForm = function (data) {
        if (!this.customerAddForm) {
            return;
        }
        var form = this.customerAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    CustomerProfileComponent.prototype.customerUpdate = function () {
        var _this = this;
        this.customerService.customerUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Profile updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.customer(_this.currentCustomer._id);
                setTimeout(function () {
                    _this.router.navigate(['customer/dashboard']);
                }, 2000);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
        });
    };
    CustomerProfileComponent.prototype.customerChangePassword = function () {
        var _this = this;
        this.customerService.customerChangePassword(this.cpForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.customer(_this.cpForm.value._id);
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['customer/dashboard']);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.cpForm.reset();
                _this.cpForm.controls["_id"].setValue(_this.currentCustomer._id);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    return CustomerProfileComponent;
}());
CustomerProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-profile',
        template: __webpack_require__("../../../../../src/app/customer/dashboard/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], CustomerProfileComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/dashboard/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-customer-sidebar></app-customer-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-customer-header></app-customer-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-8\">\r\n                            <div class=\"card\">\r\n                                <div class=\"card-header brandingColor\">\r\n                                    <h4 class=\"title\">Edit Profile</h4>\r\n                                    <p class=\"category\">Complete your profile</p>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerUpdate()\">\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Fist Name</label>\r\n                                                    <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.firstname }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Last Name</label>\r\n                                                    <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.lastname }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Email address</label>\r\n                                                    <input formControlName=\"email\" type=\"email\" class=\"form-control\" disabled>\r\n                                                </div>\r\n                                                <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.email }}\r\n                                                </div> -->\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Phone Number</label>\r\n                                                    <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.phonenumber }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Date Of Birth</label>\r\n                                                    <input formControlName=\"dob\" type=\"date\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.dob\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.dob }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!customerAddForm.valid\">Save Customer</button>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"card card-profile\">\r\n                                <div class=\"content\">\r\n                                    <h6 class=\"category text-gray\">Change Password</h6>\r\n                                    <form [formGroup]=\"cpForm\" (ngSubmit)=\"customerChangePassword()\">\r\n                                        <div class=\"card-content\">\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">Current Password</label>\r\n                                                    <input formControlName=\"password\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.password\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.password }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                                    {{ err }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">New Password</label>\r\n                                                    <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.newpassword\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.newpassword }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err !=''\" class=\"alert alert-danger\">\r\n                                                    {{err}}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-success btn-round\" [disabled]=\"!cpForm.valid\">Change Password</button>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/login/customerforgetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"forgetPassword()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Forgot Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"email\" class=\"form-control\" formControlName=\"email\" validateOnBlur [validateFormControl]=\"loginForm.controls['email']\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div> -->\r\n                                        <div *ngIf=\"loginForm.controls['email'].touched && loginForm.controls['email'].dirty && loginForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!loginForm.valid\">Send</button>\r\n                                     <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/login']\">Login</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/login/customerlogin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n.mobileNumberLabel label{\r\n    left : 10%;\r\n}\r\n\r\n\r\n.footer a{\r\n    color: #0198B3 !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/login/customerlogin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\" data-image=\"../../assets/img/login.jpeg\">\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Customer Login</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                        {{ err }}\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"email\" validateOnBlur [validateFormControl]=\"loginForm.controls['email']\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"loginForm.controls['email'].touched && loginForm.controls['email'].dirty && loginForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                        <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div> -->\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" id=\"submitButton\" [disabled]=\"!loginForm.valid\">Login</button>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/register']\">Signup ?</a>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/forget-password']\">Forgot Password ?</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/login/customerlogin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerLoginComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CustomerRegisterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerForgetPasswordComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CustomerResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha__ = __webpack_require__("../../../../angular2-recaptcha/angular2-recaptcha.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*service*/

var CustomerLoginComponent = (function () {
    function CustomerLoginComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.err = '';
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email is not valid.'
            }
        };
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.loginForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerLoginComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    CustomerLoginComponent.prototype.login = function () {
        var _this = this;
        this.customerService.authenticateUser(this.loginForm.value).subscribe(function (data) {
            console.log("data");
            console.log(data);
            if (data.success) {
                _this.customerService.storeUserData(data.token, data.user);
                _this._flashMessagesService.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this._flashMessagesService.show(data.msg, {
                    cssClass: 'danger-alert',
                    timeout: 5000
                });
                _this.router.navigate(['customer/login']);
            }
        }, function (err) {
            _this.err = 'Unable to reach Server';
        });
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
    };
    return CustomerLoginComponent;
}());
CustomerLoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-login',
        template: __webpack_require__("../../../../../src/app/customer/login/customerlogin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/login/customerlogin.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], CustomerLoginComponent);

var CustomerRegisterComponent = (function () {
    function CustomerRegisterComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.err = '';
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'email': '',
            'phonenumber': '',
            'password': '',
            'newpassword': '',
            'captcha': '',
        };
        this.validationMessages = {
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            },
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email is not valid.'
            },
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'captcha': {
                'required': 'Captcha is required.',
            }
        };
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.registerForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            matchpass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            newpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            captcha: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.registerForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerRegisterComponent.prototype.matchpasswordreg = function () {
        if (this.registerForm.value.newpassword != "") {
            if (this.registerForm.value.password == this.registerForm.value.newpassword) {
                this.registerForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.registerForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
        else {
            this.MutchPassword = false;
        }
    };
    CustomerRegisterComponent.prototype.register = function () {
        var _this = this;
        this.customerService.customerRegister(this.registerForm.value).subscribe(function (data) {
            if (!data.error) {
                /*localStorage.setItem('currentCustomer', JSON.stringify(data.message));*/
                _this._flashMessagesService.show('Successfully Registered, Please access your Email ID to Activate your Account', { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['customer/login']);
                }, 1000);
            }
            else {
                _this.err = 'Email already in use';
                //this.router.navigate(['customer/login']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Connection Lost! Try Again', { cssClass: 'danger-alert', timeout: 5000 });
            //this.router.navigate(['customer/login']);
        });
    };
    CustomerRegisterComponent.prototype.onValueChanged = function (data) {
        if (!this.registerForm) {
            return;
        }
        var form = this.registerForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    CustomerRegisterComponent.prototype.handleCorrectCaptcha = function (data) {
        console.log(data);
    };
    return CustomerRegisterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha__["ReCaptchaComponent"]),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha__["ReCaptchaComponent"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_recaptcha__["ReCaptchaComponent"]) === "function" && _f || Object)
], CustomerRegisterComponent.prototype, "captcha", void 0);
CustomerRegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-register',
        template: __webpack_require__("../../../../../src/app/customer/login/customerregister.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/login/customerlogin.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _l || Object])
], CustomerRegisterComponent);

var CustomerForgetPasswordComponent = (function () {
    function CustomerForgetPasswordComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Invalid Email.'
            }
        };
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerForgetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]]
        });
        this.loginForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerForgetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    CustomerForgetPasswordComponent.prototype.forgetPassword = function () {
        var _this = this;
        this.customerService.customerForgetPassword(this.loginForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show(data.message + '. Please Check your mail', { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['customer/login']);
                }, 1000);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.loginForm.reset();
                /*this.router.navigate(['customer/login']);*/
            }
        }, function (err) {
            _this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
            setTimeout(function () {
                _this.router.navigate(['customer/login']);
            }, 1000);
        });
    };
    return CustomerForgetPasswordComponent;
}());
CustomerForgetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-forgetpassword',
        template: __webpack_require__("../../../../../src/app/customer/login/customerforgetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/login/customerlogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _r || Object])
], CustomerForgetPasswordComponent);

var CustomerResetPasswordComponent = (function () {
    function CustomerResetPasswordComponent(router, _flashMessagesService, route, customerService, lf) {
        this.router = router;
        this._flashMessagesService = _flashMessagesService;
        this.route = route;
        this.customerService = customerService;
        this.lf = lf;
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.formErrors = {
            'password': '',
            'newpassword': '',
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
    }
    CustomerResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.resetPassForm = this.lf.group({
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.resetPassForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            var custObj = {};
            custObj['_id'] = this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.customerService.resetPassword(custObj).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    _this.router.navigate(['customer/login']);
                }
                else {
                    _this._flashMessagesService.show('Server not responding', { cssClass: 'danger-alert', timeout: 5000 });
                }
            });
        }
        else {
            this._flashMessagesService.show('Password dont match. Please enter same password', { cssClass: 'danger-alert', timeout: 5000 });
            this.resetPassForm.reset();
        }
    };
    CustomerResetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.resetPassForm) {
            return;
        }
        var form = this.resetPassForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return CustomerResetPasswordComponent;
}());
CustomerResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-resetPassword',
        template: __webpack_require__("../../../../../src/app/customer/login/customerresetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/customer/login/customerlogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_index__["c" /* CustomerService */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _w || Object])
], CustomerResetPasswordComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
//# sourceMappingURL=customerlogin.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/login/customerregister.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\" data-image=\"../../assets/img/login.jpeg\">\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Customer Register</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">account_circle</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">First Name</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"firstname\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">account_circle</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Last Name</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"lastname\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"email\" validateOnBlur [validateFormControl]=\"registerForm.controls['email']\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"registerForm.controls['email'].touched && registerForm.controls['email'].dirty && registerForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                        <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div> -->\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">phone</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty mobileNumberLabel\">\r\n                                            <label class=\"control-label\">Mobile Number</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"phonenumber\" [value]='+971'>\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.phonenumber }}\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\" (keyup)=\"matchpasswordreg()\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.password }}\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Confirm Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"newpassword\" (keyup)=\"matchpasswordreg()\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.newpassword }}\r\n                                        </div>\r\n                                        <div class=\"alert alert-danger\" *ngIf=\"MutchPassword\">Password not match</div>\r\n\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <re-captcha (captchaResponse)=\"handleCorrectCaptcha($event)\" site_key='6Ldg1SUUAAAAADvTCAxce8bTGFCK9TSw1ExOT7_I' formControlName=\"captcha\"></re-captcha>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" id=\"submitButton\" [disabled]=\"!registerForm.valid\">Submit</button>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/login']\">Login</a>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/forget-password']\">Forget Password ?</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/login/customerresetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"resetPassForm\" (ngSubmit)=\"resetPass()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Reset Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.password }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">confirm password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"newpassword\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.newpassword }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!resetPassForm.valid\">Submit</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyDirective = (function () {
    function MyDirective() {
    }
    MyDirective.prototype.onFocus = function (target) {
        console.log("Focus called");
        this.validateFormControl.markAsUntouched();
        console.log(this.validateFormControl.touched);
    };
    MyDirective.prototype.onFocusout = function (target) {
        console.log("Focus out called");
        this.validateFormControl.markAsTouched();
    };
    return MyDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('validateFormControl'),
    __metadata("design:type", Object)
], MyDirective.prototype, "validateFormControl", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focus', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyDirective.prototype, "onFocus", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focusout', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyDirective.prototype, "onFocusout", null);
MyDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[validateOnBlur]',
    }),
    __metadata("design:paramtypes", [])
], MyDirective);

//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "../../../../../src/app/global.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return url; });
/*export const imageUrl: string = 'http://localhost:4021/uploads/';

export const frontUrl: string = 'http://localhost:4200/';*/
/*export const url: string = 'http://localhost:4021/';*/
/*export const imageUrl: string = 'http://localhost:4021/uploads/';

export const frontUrl: string = 'http://localhost:4200/';*/ var imageUrl = '/uploads/';
var url = '/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, adminService) {
        this.router = router;
        this.adminService = adminService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.adminService.loggedIn()) {
            return true;
        }
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_index__["a" /* AdminService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/customerauth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerAuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomerAuthGuard = (function () {
    function CustomerAuthGuard(customerService, router) {
        this.customerService = customerService;
        this.router = router;
    }
    CustomerAuthGuard.prototype.canActivate = function (route, state) {
        if (this.customerService.loggedIn()) {
            return true;
        }
        this.router.navigate(['/customer/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return CustomerAuthGuard;
}());
CustomerAuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_index__["c" /* CustomerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], CustomerAuthGuard);

var _a, _b;
//# sourceMappingURL=customerauth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_guard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customerauth_guard__ = __webpack_require__("../../../../../src/app/guards/customerauth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__customerauth_guard__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/header/adminheader.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-transparent navbar-absolute\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li>\r\n                    <a href=\"#pablo\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"material-icons\">dashboard</i>\r\n                        <p class=\"hidden-lg hidden-md\">Dashboard</p>\r\n                    </a>\r\n                </li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"material-icons\">notifications</i>\r\n                        <span class=\"notification\">5</span>\r\n                        <p class=\"hidden-lg hidden-md\">Notifications</p>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li>\r\n                            <a href=\"#\">Mike John responded to your email</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">You have 5 new tasks</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">You're now friend with Andrew</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">Another Notification</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">Another One</a>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/header/adminheader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AdminSidebarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*service*/

var AdminSidebarComponent = (function () {
    function AdminSidebarComponent(adminService, router, _flashMessagesService) {
        this.adminService = adminService;
        this.router = router;
        this._flashMessagesService = _flashMessagesService;
        this.currentAdmin = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminSidebarComponent.prototype.ngOnInit = function () { };
    AdminSidebarComponent.prototype.adminLogout = function () {
        this._flashMessagesService.show('Logout Successfully', { cssClass: 'alert-success', timeout: 5000 });
        localStorage.removeItem('currentAdmin');
        localStorage.removeItem('id_token_admin');
        this.router.navigate(['admin/login']);
        /*this.adminService.adminLogout().subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentAdmin')
                    this.router.navigate(['admin/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['admin/login']);
            }
        );*/
    };
    return AdminSidebarComponent;
}());
AdminSidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-sidebar',
        template: __webpack_require__("../../../../../src/app/header/adminsidebar.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_index__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_index__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], AdminSidebarComponent);

var AdminHeaderComponent = (function () {
    function AdminHeaderComponent() {
        this.currentAdmin = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    AdminHeaderComponent.prototype.ngOnInit = function () { };
    return AdminHeaderComponent;
}());
AdminHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-header',
        template: __webpack_require__("../../../../../src/app/header/adminheader.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [])
], AdminHeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=adminheader.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/adminsidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-color=\"cgreen\" data-image=\"../assets/img/sidebar-1.jpg\">\r\n    <div class=\"logo\">\r\n        <a [routerLink]=\"['/admin/dashboard']\" class=\"simple-text\">\r\n            <img src=\"assets/img/logo.jpg\" style=\"height: 50px;width: 230px;\">\r\n        </a>\r\n    </div>\r\n    <div class=\"sidebar-wrapper\">\r\n        <ul class=\"nav\">\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/dashboard']\">\r\n                    <i class=\"material-icons\">dashboard</i>\r\n                    <p>Dashboard</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/profile']\">\r\n                    <i class=\"material-icons\">person</i>\r\n                    <p>Profile</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/customer/']\">\r\n                    <i class=\"material-icons\">perm_identity</i>\r\n                    <p>Customer</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/staff/']\">\r\n                    <i class=\"material-icons\">supervisor_account</i>\r\n                    <p>Staff</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/plan/']\">\r\n                    <i class=\"material-icons\">business_center</i>\r\n                    <p>Plan</p>\r\n                </a>\r\n            </li>\r\n            <!-- <li class=\"active customerSupportNumber\">\r\n                <p>Customer Support Number: +971 50 98 123 89 (UAE)</p>\r\n            </li> -->\r\n\r\n            <li class=\"active active-pro\">\r\n                <a href=\"javascript:void(0)\" (click)=\"adminLogout()\" >\r\n                    <i class=\"material-icons\">power_settings_new</i>\r\n                    <p>Logout</p>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"companyLocation-n-emailID\">\r\n    <span style=\"margin-right: 5%;\">Company Location: Dubai, UAE</span>\r\n    <span>Email ID: info@vatfile.com</span>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/header/customerheader.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-transparent navbar-absolute\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <span class=\"customerSupportNumber\">Customer Support Number: +971 50 98 123 89 (UAE)</span>\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\">\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/header/customerheader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerSidebarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*service*/

var CustomerSidebarComponent = (function () {
    function CustomerSidebarComponent(customerService, router, _flashMessagesService) {
        this.customerService = customerService;
        this.router = router;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerSidebarComponent.prototype.ngOnInit = function () { };
    CustomerSidebarComponent.prototype.customerLogout = function () {
        this._flashMessagesService.show('Logout Successfully', { cssClass: 'alert-success', timeout: 5000 });
        localStorage.removeItem('currentCustomer');
        localStorage.removeItem('id_token_customer');
        this.router.navigate(['customer/login']);
        /*this.customerService.customerLogout().subscribe(
            (data) => {
              if (!data.error) {
                    this._flashMessagesService.show('Logout Successfull', { cssClass: 'alert-success', timeout: 5000 });
                    localStorage.removeItem('currentCustomer');
                    this.router.navigate(['customer/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['customer/login']);
            }
        );*/
    };
    return CustomerSidebarComponent;
}());
CustomerSidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-sidebar',
        template: __webpack_require__("../../../../../src/app/header/customersidebar.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__service_index__["c" /* CustomerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], CustomerSidebarComponent);

var CustomerHeaderComponent = (function () {
    function CustomerHeaderComponent() {
        this.currentCustomer = {};
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    CustomerHeaderComponent.prototype.ngOnInit = function () { };
    return CustomerHeaderComponent;
}());
CustomerHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customer-header',
        template: __webpack_require__("../../../../../src/app/header/customerheader.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [])
], CustomerHeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=customerheader.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/customersidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-color=\"cgreen\" data-image=\"../assets/img/sidebar-1.jpg\">\r\n    <div class=\"logo\">\r\n        <a [routerLink]=\"['/customer/dashboard']\" class=\"simple-text\">\r\n            <img src=\"assets/img/logo.jpg\" style=\"height: 50px;width: 230px;\">\r\n        </a>\r\n    </div>\r\n    <div class=\"sidebar-wrapper\">\r\n        <ul class=\"nav\">\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/customer/dashboard']\">\r\n                    <i class=\"material-icons\">dashboard</i>\r\n                    <p>Dashboard</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/customer/profile']\">\r\n                    <i class=\"material-icons\">person</i>\r\n                    <p>Profile</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/customer/business']\">\r\n                    <i class=\"material-icons\">business_center</i>\r\n                    <p>Business</p>\r\n                </a>\r\n            </li>\r\n\r\n            <!-- <li class=\"active customerSupportNumber\">\r\n                <p>Customer Support Number: +971 50 98 123 89 (UAE)</p>\r\n            </li> -->\r\n            \r\n            <li class=\"active active-pro\">\r\n                <a href=\"javascript:void(0)\" (click)=\"customerLogout()\" >\r\n                    <i class=\"material-icons\">power_settings_new</i>\r\n                    <p>Logout</p>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"companyLocation-n-emailID\">\r\n    <span style=\"margin-right: 5%;\">Company Location: Dubai, UAE</span>\r\n    <span>Email ID: info@vatfile.com</span>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/service/admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-login', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token_admin', token);
        localStorage.setItem('currentAdmin', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AdminService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    };
    AdminService.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token_admin');
    };
    AdminService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AdminService.prototype.customerList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.customer = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.customerUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.customerDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.staffList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/staff', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.staff = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/staff/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.staffAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/staff', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.staffUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/staff/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.staffDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/staff/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.adminForgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.admin = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-get/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.adminUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-update/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.adminChangePassword = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-change-password/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AdminService.prototype.resetPassword = function (user) {
        /*let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json'); */
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-reset-password/' + user._id, user)
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.adminLogout = function () {
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'admin-logout')
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return AdminService;
}());
AdminService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AdminService);

var _a;
//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/business.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BusinessService = (function () {
    function BusinessService(http) {
        this.http = http;
        this.loadToken();
    }
    BusinessService.prototype.loadToken = function () {
        /*const token = localStorage.getItem('id_token_admin');
        this.authToken = token;*/
        if (localStorage.getItem('id_token_admin')) {
            this.authToken = localStorage.getItem('id_token_admin');
        }
        if (localStorage.getItem('id_token_customer')) {
            this.authToken = localStorage.getItem('id_token_customer');
        }
    };
    /*Business list of particular Customer*/
    BusinessService.prototype.businessList = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/business-list/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BusinessService.prototype.business = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/business/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BusinessService.prototype.businessAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/business', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BusinessService.prototype.businessUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/business/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BusinessService.prototype.businessDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/business/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return BusinessService;
}());
BusinessService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], BusinessService);

var _a;
//# sourceMappingURL=business.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/customer.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
    }
    CustomerService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-login', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token_customer', token);
        localStorage.setItem('currentCustomer', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    CustomerService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    };
    CustomerService.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token_customer');
    };
    CustomerService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    CustomerService.prototype.customerRegister = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.customerVerify = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-verify', { 'token': data })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.customerForgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.resetPassword = function (user) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-reset-password/' + user._id, user)
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.customer = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.resendActivationLink = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/resend-activation-link', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.customerUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'api/customer/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.customerChangePassword = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-change-password/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomerService.prototype.customerLogout = function () {
        /* let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);
        , {headers: headers}*/
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["b" /* url */] + 'customer-logout')
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return CustomerService;
}());
CustomerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CustomerService);

var _a;
//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_service__ = __webpack_require__("../../../../../src/app/service/admin.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customer_service__ = __webpack_require__("../../../../../src/app/service/customer.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__customer_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__staff_service__ = __webpack_require__("../../../../../src/app/service/staff.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__staff_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__business_service__ = __webpack_require__("../../../../../src/app/service/business.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__business_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plan_service__ = __webpack_require__("../../../../../src/app/service/plan.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__plan_service__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/service/plan.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlanService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlanService = (function () {
    function PlanService(http) {
        this.http = http;
    }
    PlanService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    };
    PlanService.prototype.planList = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/plan')
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.plan = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/plan/' + id)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/plan', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/plan/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/plan/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return PlanService;
}());
PlanService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], PlanService);

var _a;
//# sourceMappingURL=plan.service.js.map

/***/ }),

/***/ "../../../../../src/app/service/staff.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StaffService = (function () {
    function StaffService(http) {
        this.http = http;
    }
    StaffService.prototype.staff = function (id) {
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/staff/' + id)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    StaffService.prototype.staffUpdate = function (data) {
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);*/
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'api/staff/' + data._id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return StaffService;
}());
StaffService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], StaffService);

var _a;
//# sourceMappingURL=staff.service.js.map

/***/ }),

/***/ "../../../../../src/app/staff/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-content .label-floating{\r\n\ttext-align: left;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/staff/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-customer-sidebar></app-customer-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-customer-header></app-customer-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header brandingColor\">\r\n                                <i class=\"material-icons\">perm_identity</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Business</p>\r\n                                <h3 class=\"title\">{{business.length}}\r\n                                </h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/customer/business/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staff/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffDashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StaffProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var StaffDashboardComponent = (function () {
    function StaffDashboardComponent(lf, customerService, businessService, router, route) {
        this.lf = lf;
        this.customerService = customerService;
        this.businessService = businessService;
        this.router = router;
        this.route = route;
        this.currentCustomer = {};
        this.staffs = [];
        this.plans = [];
        this.business = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    StaffDashboardComponent.prototype.ngOnInit = function () {
        this.getBusinessList();
    };
    StaffDashboardComponent.prototype.getBusinessList = function () {
        var _this = this;
        this.businessService.businessList(this.currentCustomer._id).subscribe(function (bsns) {
            if (!bsns.error) {
                _this.business = bsns.message;
            }
        });
    };
    return StaffDashboardComponent;
}());
StaffDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-staff-dashboard',
        template: __webpack_require__("../../../../../src/app/staff/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/staff/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["b" /* BusinessService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["b" /* BusinessService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], StaffDashboardComponent);

var StaffProfileComponent = (function () {
    function StaffProfileComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'phonenumber': ''
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
                'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
                'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
            }
        };
        this.cpFormErrors = {
            'password': '',
            'newpassword': ''
        };
        this.cpValidationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    StaffProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            phonenumber: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.phoneRegex)]],
            dob: [''],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.cpForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.customerAddForm.patchValue(this.currentCustomer);
        this.cpForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.customerAddForm.valueChanges.subscribe(function (data) { return _this.onValueChangedForm(data); });
        this.onValueChangedForm();
        this.cpForm.controls["_id"].setValue(this.currentCustomer._id);
    };
    StaffProfileComponent.prototype.customer = function (id) {
        var _this = this;
        this.customerService.customer(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', JSON.stringify(data.message));
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    StaffProfileComponent.prototype.matchpasswordreg = function () {
        if (this.cpForm.value.newpassword != '') {
            if (this.cpForm.value.password == this.cpForm.value.newpassword) {
                this.cpForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            }
            else {
                this.cpForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }
    };
    StaffProfileComponent.prototype.onValueChanged = function (data) {
        if (!this.cpForm) {
            return;
        }
        var form = this.cpForm;
        for (var field in this.cpFormErrors) {
            // clear previous error message (if any)
            this.cpFormErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.cpValidationMessages[field];
                for (var key in control.errors) {
                    this.cpFormErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    StaffProfileComponent.prototype.onValueChangedForm = function (data) {
        if (!this.customerAddForm) {
            return;
        }
        var form = this.customerAddForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    StaffProfileComponent.prototype.customerUpdate = function () {
        var _this = this;
        this.customerService.customerUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Profile updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.customer(_this.currentCustomer._id);
                setTimeout(function () {
                    _this.router.navigate(['customer/dashboard']);
                }, 2000);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
        });
    };
    StaffProfileComponent.prototype.customerChangePassword = function () {
        var _this = this;
        this.customerService.customerChangePassword(this.cpForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.customer(_this.cpForm.value._id);
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['customer/dashboard']);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.cpForm.reset();
                _this.cpForm.controls["_id"].setValue(_this.currentCustomer._id);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    return StaffProfileComponent;
}());
StaffProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-staff-profile',
        template: __webpack_require__("../../../../../src/app/staff/dashboard/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/staff/dashboard/dashboard.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], StaffProfileComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/staff/dashboard/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-customer-sidebar></app-customer-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-customer-header></app-customer-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-8\">\r\n                            <div class=\"card\">\r\n                                <div class=\"card-header brandingColor\">\r\n                                    <h4 class=\"title\">Edit Profile</h4>\r\n                                    <p class=\"category\">Complete your profile</p>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerUpdate()\">\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Fist Name</label>\r\n                                                    <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.firstname }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Last Name</label>\r\n                                                    <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.lastname }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Email address</label>\r\n                                                    <input formControlName=\"email\" type=\"email\" class=\"form-control\" disabled>\r\n                                                </div>\r\n                                                <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.email }}\r\n                                                </div> -->\r\n                                            </div>\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Phone Number</label>\r\n                                                    <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.phonenumber }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-6\">\r\n                                                <div class=\"form-group \">\r\n                                                    <label class=\"control-label\">Date Of Birth</label>\r\n                                                    <input formControlName=\"dob\" type=\"date\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"formErrors.dob\" class=\"alert alert-danger\">\r\n                                                    {{ formErrors.dob }}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!customerAddForm.valid\">Save Customer</button>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"card card-profile\">\r\n                                <div class=\"content\">\r\n                                    <h6 class=\"category text-gray\">Change Password</h6>\r\n                                    <form [formGroup]=\"cpForm\" (ngSubmit)=\"customerChangePassword()\">\r\n                                        <div class=\"card-content\">\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">Current Password</label>\r\n                                                    <input formControlName=\"password\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.password\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.password }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                                    {{ err }}\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"\">\r\n                                                <div class=\"form-group label-floating\">\r\n                                                    <label class=\"control-label\">New Password</label>\r\n                                                    <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\">\r\n                                                </div>\r\n                                                <div *ngIf=\"cpFormErrors.newpassword\" class=\"alert alert-danger\">\r\n                                                    {{ cpFormErrors.newpassword }}\r\n                                                </div>\r\n                                                <div *ngIf=\"err !=''\" class=\"alert alert-danger\">\r\n                                                    {{err}}\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <button type=\"submit\" class=\"btn btn-success btn-round\" [disabled]=\"!cpForm.valid\">Change Password</button>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staff/login/staffforgetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"forgetPassword()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Forgot Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"email\" class=\"form-control\" formControlName=\"email\" validateOnBlur [validateFormControl]=\"loginForm.controls['email']\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div> -->\r\n                                        <div *ngIf=\"loginForm.controls['email'].touched && loginForm.controls['email'].dirty && loginForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!loginForm.valid\">Send</button>\r\n                                     <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/login']\">Login</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staff/login/stafflogin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n.mobileNumberLabel label{\r\n    left : 10%;\r\n}\r\n\r\n\r\n.footer a{\r\n    color: #0198B3 !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/staff/login/stafflogin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\" data-image=\"../../assets/img/login.jpeg\">\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Staff Login</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                        {{ err }}\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Email</label>\r\n                                            <input type=\"text\" class=\"form-control\" formControlName=\"email\" validateOnBlur [validateFormControl]=\"loginForm.controls['email']\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"loginForm.controls['email'].touched && loginForm.controls['email'].dirty && loginForm.controls['email'].invalid  \" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div>\r\n                                        <!-- <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.email }}\r\n                                        </div> -->\r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" id=\"submitButton\" [disabled]=\"!loginForm.valid\">Login</button>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/register']\">Signup ?</a>\r\n                                    <a class=\"btn btn-success btn-simple btn-wd btn-lg\" [routerLink]=\"['/customer/forget-password']\">Forgot Password ?</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staff/login/stafflogin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StaffLoginComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffForgetPasswordComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StaffResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_index__ = __webpack_require__("../../../../../src/app/service/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*service*/

var StaffLoginComponent = (function () {
    function StaffLoginComponent(lf, staffService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.staffService = staffService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.err = '';
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email is not valid.'
            }
        };
    }
    StaffLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/staff/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.loginForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    StaffLoginComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    StaffLoginComponent.prototype.login = function () {
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
    };
    return StaffLoginComponent;
}());
StaffLoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-staff-login',
        template: __webpack_require__("../../../../../src/app/staff/login/stafflogin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/staff/login/stafflogin.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["e" /* StaffService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], StaffLoginComponent);

var StaffForgetPasswordComponent = (function () {
    function StaffForgetPasswordComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            'email': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Invalid Email.'
            }
        };
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }
    StaffForgetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/dashboard';
        this.loginForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]]
        });
        this.loginForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    StaffForgetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.loginForm) {
            return;
        }
        var form = this.loginForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    StaffForgetPasswordComponent.prototype.forgetPassword = function () {
        var _this = this;
        this.customerService.customerForgetPassword(this.loginForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show(data.message + '. Please Check your mail', { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['customer/login']);
                }, 1000);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                _this.loginForm.reset();
                /*this.router.navigate(['customer/login']);*/
            }
        }, function (err) {
            _this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
            setTimeout(function () {
                _this.router.navigate(['customer/login']);
            }, 1000);
        });
    };
    return StaffForgetPasswordComponent;
}());
StaffForgetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-staff-forgetpassword',
        template: __webpack_require__("../../../../../src/app/staff/login/staffforgetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/staff/login/stafflogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], StaffForgetPasswordComponent);

var StaffResetPasswordComponent = (function () {
    function StaffResetPasswordComponent(router, _flashMessagesService, route, customerService, lf) {
        this.router = router;
        this._flashMessagesService = _flashMessagesService;
        this.route = route;
        this.customerService = customerService;
        this.lf = lf;
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.formErrors = {
            'password': '',
            'newpassword': '',
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            },
            'newpassword': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain 6 characters',
            }
        };
    }
    StaffResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.resetPassForm = this.lf.group({
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.resetPassForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    StaffResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            var custObj = {};
            custObj['_id'] = this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.customerService.resetPassword(custObj).subscribe(function (data) {
                if (!data.error) {
                    _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    _this.router.navigate(['customer/login']);
                }
                else {
                    _this._flashMessagesService.show('Server not responding', { cssClass: 'danger-alert', timeout: 5000 });
                }
            });
        }
        else {
            this._flashMessagesService.show('Password dont match. Please enter same password', { cssClass: 'danger-alert', timeout: 5000 });
            this.resetPassForm.reset();
        }
    };
    StaffResetPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.resetPassForm) {
            return;
        }
        var form = this.resetPassForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
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
    return StaffResetPasswordComponent;
}());
StaffResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-staff-resetPassword',
        template: __webpack_require__("../../../../../src/app/staff/login/staffresetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/staff/login/stafflogin.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__service_index__["c" /* CustomerService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _q || Object])
], StaffResetPasswordComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=stafflogin.component.js.map

/***/ }),

/***/ "../../../../../src/app/staff/login/staffresetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"resetPassForm\" (ngSubmit)=\"resetPass()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center brandingColor\">\r\n                                    <h4 class=\"card-title\">Reset Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.password }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\">confirm password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"newpassword\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.newpassword }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!resetPassForm.valid\">Submit</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map