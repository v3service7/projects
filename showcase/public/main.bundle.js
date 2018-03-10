webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

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

module.exports = "<!-- Bootstrap core CSS     -->\r\n<link href=\"/assets/admin/css/bootstrap.min.css\" rel=\"stylesheet\" />\r\n<!--  Material Dashboard CSS    -->\r\n<link href=\"/assets/admin/css/material-dashboard.css?v=1.2.0\" rel=\"stylesheet\" />\r\n<!--  CSS for Demo Purpose, don't include it in your project     -->\r\n<link href=\"/assets/admin/css/demo.css\" rel=\"stylesheet\" />\r\n<link href=\"/assets/admin/css/style.css\" rel=\"stylesheet\" />\r\n<!--     Fonts and icons     -->\r\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css\" rel=\"stylesheet\">\r\n<link href='https://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>\r\n<flash-messages></flash-messages>\r\n<router-outlet></router-outlet>\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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
    function AdminComponent(adminService) {
        this.adminService = adminService;
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object])
], AdminComponent);

var _a;
//# sourceMappingURL=admin.component.js.map

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

module.exports = "<div class=\"wrapper addCustomerClass\">\r\n\t<app-sidebar></app-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-header></app-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminCustomerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CustomerListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CustomerAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CustomerEditComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AdminUserBoardsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AdminUserBoardsBookmarkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_category_service__ = __webpack_require__("../../../../../src/app/services/category.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AdminCustomerComponent = (function () {
    function AdminCustomerComponent(lf, router, route) {
        this.lf = lf;
        this.router = router;
        this.route = route;
    }
    AdminCustomerComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required]
        });
    };
    return AdminCustomerComponent;
}());
AdminCustomerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-customer',
        template: __webpack_require__("../../../../../src/app/admin/customer/customer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/customer.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], AdminCustomerComponent);

var CustomerListComponent = (function () {
    function CustomerListComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.customers = [];
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    CustomerListComponent.prototype.setUsername = function (fname, lname, id) {
        var username;
        if (typeof fname === 'undefined' && typeof lname === 'undefined') {
            username = 'User';
        }
        else {
            username = fname + ' ' + lname;
        }
        localStorage.setItem('boardusername', username);
        localStorage.setItem('boarduserid', id);
    };
    CustomerListComponent.prototype.getList = function () {
        var _this = this;
        this.customerService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.customers = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerListComponent.prototype.deleteCustomer = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('User Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.customerService.deleteUserById(id).subscribe(function (data) {
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
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _h || Object])
], CustomerListComponent);

var CustomerAddComponent = (function () {
    function CustomerAddComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.phoneRegex = /^[(]{0,1}[0-9]{2,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
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
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'password': {
                'required': 'Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain minimum 6 characters',
            },
            'newpassword': {
                'required': 'Confirm Password is required.',
                'pattern': 'Please Enter at least one letter and number',
                'minlength': 'Password should contain minimum 6 characters',
            }
        };
    }
    CustomerAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            firstname: [''],
            lastname: [''],
            phonenumber: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailp)]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.passwordRegex)]],
            matchpass: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.customerAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
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
        this.customerService.userAdd(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('User Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/user']);
            }
            else {
                _this._flashMessagesService.show('Email/Username already in use', { cssClass: 'danger-alert', timeout: 3000 });
                //this.customerAddForm.reset();
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
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
    __metadata("design:paramtypes", [typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _o || Object])
], CustomerAddComponent);

var CustomerEditComponent = (function () {
    function CustomerEditComponent(lf, customerService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.customerService = customerService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
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
            },
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'password': {
                'required': 'Password is required.'
            },
            'newpassword': {
                'required': 'Password is required.'
            }
        };
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            firstname: [''],
            lastname: [''],
            phonenumber: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailp)]]
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.customer(id);
        });
        this.customerAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CustomerEditComponent.prototype.matchpasswordreg = function () {
        if (this.customerAddForm.value.password == this.customerAddForm.value.newpassword) {
            this.customerAddForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;
        }
        else {
            this.customerAddForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    };
    CustomerEditComponent.prototype.customerUpdate = function () {
        var _this = this;
        this.customerService.userUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('User Profile Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/user']);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    CustomerEditComponent.prototype.customer = function (id) {
        var _this = this;
        this.customerService.getUserById(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                console.log(_this.currentCustomer);
                _this.customerAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log(err);
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
    __metadata("design:paramtypes", [typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _t || Object])
], CustomerEditComponent);

var AdminUserBoardsComponent = (function () {
    function AdminUserBoardsComponent(lf, router, route, adminService, categoryService, _flashMessagesService) {
        this.lf = lf;
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this.categoryService = categoryService;
        this._flashMessagesService = _flashMessagesService;
    }
    AdminUserBoardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.username = localStorage.getItem('boardusername');
        this.route.params.subscribe(function (params) {
            _this.user_id = params['id'];
            _this.getBoards();
        });
    };
    AdminUserBoardsComponent.prototype.setBoardName = function (bname) {
        localStorage.setItem('boardname', bname);
    };
    AdminUserBoardsComponent.prototype.getBoards = function () {
        var _this = this;
        this.adminService.boardsList(this.user_id).subscribe(function (data) {
            if (!data.error) {
                _this.boards = data.message;
            }
        });
    };
    AdminUserBoardsComponent.prototype.deleteboard = function (id) {
        var _this = this;
        this.adminService.categoryDelete(id).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Board deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.getBoards();
            }
        });
    };
    return AdminUserBoardsComponent;
}());
AdminUserBoardsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-userboards',
        template: __webpack_require__("../../../../../src/app/admin/customer/userboards.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/userboards.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _w || Object, typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */]) === "function" && _x || Object, typeof (_y = typeof __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */]) === "function" && _y || Object, typeof (_z = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _z || Object])
], AdminUserBoardsComponent);

var AdminUserBoardsBookmarkComponent = (function () {
    function AdminUserBoardsBookmarkComponent(lf, router, route, adminService, sanitizer, _flashMessagesService) {
        this.lf = lf;
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this.sanitizer = sanitizer;
        this._flashMessagesService = _flashMessagesService;
    }
    AdminUserBoardsBookmarkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.boardname = localStorage.getItem('boardname');
        this.username = localStorage.getItem('boardusername');
        this.userid = localStorage.getItem('boarduserid');
        this.route.params.subscribe(function (params) {
            _this.board_id = params['id'];
            _this.getBookmarks();
        });
    };
    AdminUserBoardsBookmarkComponent.prototype.getBookmarks = function () {
        var _this = this;
        this.adminService.bookmarkList(this.board_id).subscribe(function (data) {
            if (!data.error) {
                _this.bookmarks = data.message;
            }
        });
    };
    AdminUserBoardsBookmarkComponent.prototype.deletebookmark = function (id) {
        var _this = this;
        this.adminService.bookmarkList(id).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Bookmark deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.getBookmarks();
            }
        });
    };
    AdminUserBoardsBookmarkComponent.prototype.videoUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return AdminUserBoardsBookmarkComponent;
}());
AdminUserBoardsBookmarkComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-userboardsbookmark',
        template: __webpack_require__("../../../../../src/app/admin/customer/userboardsbookmark.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/customer/userboardsbookmark.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_0 = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _0 || Object, typeof (_1 = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _1 || Object, typeof (_2 = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _2 || Object, typeof (_3 = typeof __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_admin_service__["a" /* AdminService */]) === "function" && _3 || Object, typeof (_4 = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]) === "function" && _4 || Object, typeof (_5 = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _5 || Object])
], AdminUserBoardsBookmarkComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
//# sourceMappingURL=customer.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/customer/customeradd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"navyblue\">\r\n            <h4 class=\"title\">Add User</h4>\r\n            <p class=\"category\">Create User Profile</p>\r\n        </div>\r\n        <div class=\"card-content\">\r\n            <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerAdd()\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">First Name <span>*</span></label>\r\n                            <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                            {{ formErrors.firstname }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Last Name <span>*</span></label>\r\n                            <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                            {{ formErrors.lastname }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Email address <span>*</span></label>\r\n                            <input formControlName=\"email\" type=\"email\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                            {{ formErrors.email }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Phone Number <span>*</span></label>\r\n                            <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                            {{ formErrors.phonenumber }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Password <span>*</span></label>\r\n                            <input formControlName=\"password\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                            {{ formErrors.password }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Confirm Password <span>*</span></label>\r\n                            <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\" (keyup)=\"matchpasswordreg()\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                            {{ formErrors.newpassword }}\r\n                        </div>\r\n                        <div style=\"padding: 3px;\" class=\"alert alert-danger\" *ngIf=\"MutchPassword\">Password does not match</div>\r\n                    </div>\r\n                </div>\r\n                <button type=\"submit\" class=\"btn bg-navyblue pull-right\" [disabled]=\"!customerAddForm.valid\">Save User</button>\r\n                <div class=\"clearfix\"></div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customeredit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"navyblue\">\r\n            <h4 class=\"title\">Edit User</h4>\r\n            <p class=\"category\">Update User Profile</p>\r\n        </div>\r\n        <div class=\"card-content\" *ngIf = \"currentCustomer\">\r\n            <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"customerUpdate()\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group \">\r\n                            <label class=\"control-label\">First Name <span>*</span></label>\r\n                            <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                            {{ formErrors.firstname }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group \">\r\n                            <label class=\"control-label\">Last Name <span>*</span></label>\r\n                            <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                            {{ formErrors.lastname }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group \">\r\n                            <label class=\"control-label\">Email address <span>*</span></label>\r\n                            <input formControlName=\"email\" type=\"email\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                            {{ formErrors.email }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group \">\r\n                            <label class=\"control-label\">Phone Number <span>*</span></label>\r\n                            <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                            {{ formErrors.phonenumber }}\r\n                        </div>\r\n                    </div>\r\n                </div>                   \r\n                <button type=\"submit\" class=\"btn bg-navyblue pull-right\" [disabled]=\"!customerAddForm.valid\">Update User</button>\r\n                <div class=\"clearfix\"></div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/customerlist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header\" data-background-color=\"navyblue\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Users</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a [routerLink]=\"['/admin/user/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add User\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"customers.length >0\">\r\n            <thead class=\"clr-navyblue\">\r\n                <th>Name</th>\r\n                <th>Phone Number</th>\r\n                 <th>Email</th>\r\n                 <th>View Boards</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let customer of customers\">\r\n                    <td class=\"padding0\">{{customer.firstname}} {{customer.lastname}}</td>\r\n                    <td class=\"padding0\">{{customer.phonenumber}}</td>\r\n                    <td class=\"padding0\">{{customer.email}}</td>\r\n                    <td class=\"padding0\" ><a  [routerLink]=\"['/admin/user/borads/',customer._id]\" (click)=\"setUsername(customer.firstname, customer.lastname, customer._id)\" class=\"btn  bg-navyblue text-white\">User board</a></td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/user/',customer._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-primary btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deleteCustomer(customer._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"customers.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> User Empty Kindly create One</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/userboards.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/customer/userboards.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header\" data-background-color=\"navyblue\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span style=\"float: right;\">\r\n                   <a [routerLink]=\"['/admin/user']\"><i class=\" fa fa-arrow-left\"></i> Back </a> </span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active text-cap\">\r\n                        {{username}} / boards \r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"boards?.length >0\">\r\n            <thead class=\"clr-navyblue\">\r\n                <th>Title</th>\r\n                <th>View bookmarks</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let board of boards\">\r\n                    <td class=\"padding0 text-cap\">{{board.name}}</td>\r\n                    <td class=\"padding0\">\r\n                        <a [routerLink]=\"['/admin/user/borads/bookmark',board._id]\" (click)=\"setBoardName(board.name)\" class=\"btn text-white bg-navyblue\">View bookmarks</a>\r\n                    </td>\r\n                    <td class=\"padding0  text-right\">\r\n                        <a class=\"btn btn-danger pull-left \" href=\"javascript:void(0)\" (click)=\"deleteboard(board._id)\">\r\n                            Delete\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"boards?.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span>\r\n                <b> No Data - </b></span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/customer/userboardsbookmark.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/customer/userboardsbookmark.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header\" data-background-color=\"navyblue\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n            <span style=\"float: right;\">\r\n                    <a [routerLink]=\"['/admin/user/borads/',userid]\">\r\n                        <i class=\" fa fa-arrow-left\"></i> Back </a>\r\n                </span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right text-cap\">\r\n                         {{username}}  / {{boardname}} / bookmarks\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"bookmarks?.length >0\">\r\n            <thead class=\"clr-navyblue\">\r\n                <th>Title</th>\r\n                <th>Type</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let bookmark of bookmarks\">\r\n                    <td class=\"padding0\" style=\"width:300px;\">\r\n                        <div *ngIf=\"bookmark.type == 'instagram' || bookmark.type == 'twitter'\" [innerHtml]=\"bookmark.body\"></div>\r\n                        <iframe *ngIf=\"bookmark.type != 'instagram' && bookmark.type != 'twitter'\" [src]=\"videoUrl(bookmark.title)\" width=\"100%\"></iframe>\r\n                    </td>\r\n                    <td>{{bookmark.type}}</td>\r\n                    <td class=\"padding0 text-right\">\r\n                        <a  class=\"btn btn-danger  pull-left\" href=\"javascript:void(0)\"  (click)=\"deletebookmark(bookmark._id)\">\r\n                            Delete\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"bookmarks?.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span>\r\n                <b> No Data </b></span>\r\n        </div>\r\n    </div>\r\n</div>"

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

module.exports = "<div class=\"wrapper\">\r\n\t<app-sidebar></app-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-header></app-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header\" data-background-color=\"navyblue\">\r\n                                <i class=\"material-icons\">perm_identity</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Users</p><br>\r\n                                <h3 class=\"title\">{{userCount}}</h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/user/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!--  <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header\" data-background-color=\"navyblue\">\r\n                                <i class=\"material-icons\">business_center</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Membership Plans</p>\r\n                                <h3 class=\"title\">{{planCount}}</h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/plan/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div> -->\r\n                     <div class=\"col-lg-3 col-md-6 col-sm-6\">\r\n                        <div class=\"card card-stats\">\r\n                            <div class=\"card-header\" data-background-color=\"navyblue\">\r\n                                <i class=\"material-icons\">description</i>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <p class=\"category\">Static Pages</p><br>\r\n                                <h3 class=\"title\">{{pageCount}}</h3>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <div class=\"stats\">\r\n                                    <a [routerLink]=\"['/admin/pages/']\">Get More...</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_pages_service__ = __webpack_require__("../../../../../src/app/services/pages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_plan_service__ = __webpack_require__("../../../../../src/app/services/plan.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(planService, pagesService, adminService) {
        this.planService = planService;
        this.pagesService = pagesService;
        this.adminService = adminService;
        this.planCount = 0;
        this.userCount = 0;
        this.pageCount = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getPlanList();
        this.getPageList();
        this.getUserList();
    };
    DashboardComponent.prototype.getPlanList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.planCount = data.message.length;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    DashboardComponent.prototype.getPageList = function () {
        var _this = this;
        this.pagesService.pageList().subscribe(function (data) {
            if (!data.error) {
                _this.pageCount = data.message.length;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    DashboardComponent.prototype.getUserList = function () {
        var _this = this;
        this.adminService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.userCount = data.message.length;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_plan_service__["a" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_plan_service__["a" /* PlanService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_pages_service__["a" /* PagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_pages_service__["a" /* PagesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _c || Object])
], DashboardComponent);

var _a, _b, _c;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/forgot-password/adminresetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"resetPassForm\" (ngSubmit)=\"resetPass()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center bg-navyblue\">\r\n                                    <h4 class=\"card-title\">Reset Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\" style=\"top: -30px;\">password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.password }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\" style=\"top: -30px;\">confirm password</label>\r\n                                            <input type=\"password\" class=\"form-control\" formControlName=\"newpassword\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                        <div *ngIf=\"formErrors.newpassword\" class=\"alert alert-danger\">\r\n                                            {{ formErrors.newpassword }}\r\n                                        </div>\r\n                                        <div *ngIf=\"err != ''\" class=\"alert alert-danger\">\r\n                                            {{ err }}\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn bg-navyblue btn-wd btn-lg\" [disabled]=\"!resetPassForm.valid\">Submit</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/forgot-password/forgot-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n.mobileNumberLabel label{\r\n    left : 10%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\">\r\n        <!--   you can change the color of the filter page using: data-color=\"blue | purple | green | orange | red | rose \" -->\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                        <form [formGroup]=\"loginForm\" (ngSubmit)=\"forgotPassword()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center bg-navyblue\">\r\n                                    <h4 class=\"card-title\">Forget Password</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating is-empty\">\r\n                                            <label class=\"control-label\" style=\"top: -30px;\">Email</label>\r\n                                            <input type=\"email\" class=\"form-control\" formControlName=\"email\">\r\n                                        <span class=\"material-input\"></span></div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">\r\n                                    <button class=\"btn bg-navyblue btn-wd btn-lg\" [disabled]=\"!loginForm.valid\">Send</button>\r\n                                     <a class=\"btn clr-navyblue btn-simple btn-wd btn-lg\" [routerLink]=\"['/admin/login']\">Login</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ForgotPasswordComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(lf, adminService, flashMessage, router, route) {
        this.lf = lf;
        this.adminService = adminService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.route = route;
        this.currentAdmin = {};
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var _this = this;
        this.adminService.forgotPassword(this.loginForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.flashMessage.show("Please check your email to reset the password", { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/login']);
            }
            else {
                _this.router.navigate(['admin/login']);
            }
        }, function (err) {
            _this.router.navigate(['admin/login']);
        });
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgot-password',
        template: __webpack_require__("../../../../../src/app/admin/forgot-password/forgot-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/forgot-password/forgot-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], ForgotPasswordComponent);

var AdminResetPasswordComponent = (function () {
    function AdminResetPasswordComponent(router, route, adminService, flashMessage, lf) {
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this.flashMessage = flashMessage;
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
            console.log("this.id");
            console.log(_this.id);
        });
        this.resetPassForm = this.lf.group({
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)]],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)]]
        });
        this.resetPassForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    AdminResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        if (this.resetPassForm.value.password == this.resetPassForm.value.newpassword) {
            var custObj = {};
            custObj['_id'] = this.id;
            custObj['password'] = this.resetPassForm.value.password;
            this.adminService.resetPassword(custObj).subscribe(function (data) {
                if (!data.error) {
                    _this.flashMessage.show(data.message, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });
                    _this.router.navigate(['admin/login']);
                    console.log("data");
                    console.log(data);
                }
                else {
                    _this.flashMessage.show('Something Went Wrong', { cssClass: 'danger-alert', timeout: 5000 });
                }
            });
        }
        else {
            this.flashMessage.show('Password dont match. Please enter same password', { cssClass: 'danger-alert', timeout: 5000 });
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
        template: __webpack_require__("../../../../../src/app/admin/forgot-password/adminresetpassword.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/forgot-password/forgot-password.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_admin_service__["a" /* AdminService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _k || Object])
], AdminResetPasswordComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=forgot-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-transparent navbar-absolute\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            \r\n        </div>\r\n        <div class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                \r\n            </ul>\r\n            <form class=\"navbar-form navbar-right\" role=\"search\">\r\n                <div class=\"form-group  is-empty\">\r\n                   \r\n                </div>               \r\n            </form>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/admin/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
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

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/admin/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);

//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n\r\n\r\n.mobileNumberLabel label{\r\n    left : 10%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper wrapper-full-page\">\r\n    <div class=\"full-page login-page\" filter-color=\"black\" data-image=\"../../assets/img/login.jpeg\">\r\n        <div class=\"content\">\r\n            <div class=\"container\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3\">\r\n                       \t<form (submit)=\"onLoginSubmit()\">\r\n                            <div class=\"card card-login\">\r\n                                <div class=\"card-header text-center bg-navyblue\">\r\n                                    <h4 class=\"card-title\">Admin Login</h4>\r\n                                </div>\r\n                                <div class=\"card-content\">                                   \r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">email</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating\">\r\n                                            <label class=\"control-label\">Username</label>\r\n                                            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"email\" name=\"email\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>                                       \r\n                                    </div>\r\n                                    <div class=\"input-group\">\r\n                                        <span class=\"input-group-addon\">\r\n                                            <i class=\"material-icons\">lock_outline</i>\r\n                                        </span>\r\n                                        <div class=\"form-group label-floating\">\r\n                                            <label class=\"control-label\">Password</label>\r\n                                            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\r\n                                            <span class=\"material-input\"></span>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer text-center\">                                     \r\n                                    <input type=\"submit\" class=\"btn bg-navyblue  btn-wd btn-lg\" value=\"Login\">                         \r\n                                    <a class=\"btn clr-navyblue btn-simple btn-wd btn-lg\" [routerLink]=\"['/admin/forgotpassword']\">Forgot Password ?</a>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(adminService, router, flashMessage) {
        this.adminService = adminService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.adminService.loggedIn()) {
            this.router.navigate(['/admin/dashboard']);
        }
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            email: this.email,
            password: this.password
        };
        this.adminService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.adminService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
                _this.router.navigate(['admin/dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'danger-alert',
                    timeout: 5000
                });
                _this.router.navigate(['admin/login']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/admin/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/pages/pages.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".padding0{text-align: left;padding-left: 0;}\r\n\r\n.addPlanClass{\r\n\theight: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/pages/pages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper addPlanClass\">\r\n\t<app-sidebar></app-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-header></app-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/pages/pages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPagesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PagesListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PagesAddComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PagesEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_pages_service__ = __webpack_require__("../../../../../src/app/services/pages.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminPagesComponent = (function () {
    function AdminPagesComponent() {
    }
    AdminPagesComponent.prototype.ngOnInit = function () { };
    return AdminPagesComponent;
}());
AdminPagesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-pages',
        template: __webpack_require__("../../../../../src/app/admin/pages/pages.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/pages/pages.component.css")],
    }),
    __metadata("design:paramtypes", [])
], AdminPagesComponent);

var PagesListComponent = (function () {
    function PagesListComponent(lf, pagesService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.pagesService = pagesService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.plans = [];
    }
    PagesListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    PagesListComponent.prototype.getList = function () {
        var _this = this;
        this.pagesService.pageList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PagesListComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Page Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.pagesService.pageDelete(id).subscribe(function (data) {
                _this.getList();
            });
        }
    };
    return PagesListComponent;
}());
PagesListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-pages-list',
        template: __webpack_require__("../../../../../src/app/admin/pages/pageslist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/pages/pages.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], PagesListComponent);

var PagesAddComponent = (function () {
    function PagesAddComponent(lf, pagesService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.pagesService = pagesService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.formErrors = {
            'title': '',
            'url': '',
        };
        this.validationMessages = {
            'title': {
                'required': 'Page Title is required.',
            },
            'url': {
                'required': 'URL Text is required.',
            },
        };
    }
    PagesAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            url: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            description: [''],
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PagesAddComponent.prototype.planAdd = function () {
        var _this = this;
        this.pagesService.pageAdd(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Page Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/pages']);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PagesAddComponent.prototype.onValueChanged = function (data) {
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
    return PagesAddComponent;
}());
PagesAddComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-pages-add',
        template: __webpack_require__("../../../../../src/app/admin/pages/pagesadd.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/pages/pages.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], PagesAddComponent);

var PagesEditComponent = (function () {
    function PagesEditComponent(lf, pagesService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.pagesService = pagesService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.formErrors = {
            'title': '',
            'url': '',
        };
        this.validationMessages = {
            'title': {
                'required': 'Page Title is required.',
            },
            'url': {
                'required': 'URL Text is required.',
            },
        };
    }
    PagesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            url: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            description: [''],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.plan(id);
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PagesEditComponent.prototype.planUpdate = function () {
        var _this = this;
        this.pagesService.pageUpdate(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Page Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/pages']);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PagesEditComponent.prototype.plan = function (id) {
        var _this = this;
        this.pagesService.page(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                _this.planAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    PagesEditComponent.prototype.onValueChanged = function (data) {
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
    return PagesEditComponent;
}());
PagesEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-pages-edit',
        template: __webpack_require__("../../../../../src/app/admin/pages/pagesedit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/pages/pages.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_pages_service__["a" /* PagesService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _q || Object])
], PagesEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=pages.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/pages/pagesadd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"navyblue\">\r\n            <h4 class=\"title\">Add Pages</h4>\r\n            <p class=\"category\">Create Page</p>\r\n        </div>\r\n        <div class=\"card-content\">\r\n            <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planAdd()\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">Page Title <span>*</span></label>\r\n                            <input formControlName=\"title\" type=\"text\" class=\"form-control\" autofocus>\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.title\" class=\"alert alert-danger\">\r\n                            {{ formErrors.title }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group label-floating\">\r\n                            <label class=\"control-label\">URL Text <span>*</span></label>\r\n                            <input formControlName=\"url\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.url\" class=\"alert alert-danger\">\r\n                            {{ formErrors.url }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\"> Content of this page</label>                                    \r\n                                <app-tinymce  formControlName=\"description\" ></app-tinymce>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <button type=\"submit\" class=\"btn bg-navyblue pull-right\" [disabled]=\"!planAddForm.valid\">Add Page</button>\r\n                <div class=\"clearfix\"></div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/pages/pagesedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header\" data-background-color=\"navyblue\">\r\n            <h4 class=\"title\">Edit Pages</h4>\r\n            <p class=\"category\">Update Page</p>\r\n        </div>\r\n        <div class=\"card-content\">\r\n            <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planUpdate()\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label\">Page Title <span>*</span></label>\r\n                            <input formControlName=\"title\" type=\"text\" class=\"form-control\" autofocus>\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.title\" class=\"alert alert-danger\">\r\n                            {{ formErrors.title }}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label\">URL Text <span>*</span></label>\r\n                            <input formControlName=\"url\" type=\"text\" class=\"form-control\">\r\n                        </div>\r\n                        <div *ngIf=\"formErrors.url\" class=\"alert alert-danger\">\r\n                            {{ formErrors.url }}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\"> Describe about this pages</label>\r\n                                <app-tinymce  formControlName=\"description\" ></app-tinymce>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <button type=\"submit\" class=\"btn bg-navyblue pull-right\" [disabled]=\"!planAddForm.valid\">Update Pages</button>\r\n                <div class=\"clearfix\"></div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/pages/pageslist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header\" data-background-color=\"navyblue\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Pages</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/admin/pages/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Static Page\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"plans.length >0\">\r\n            <thead class=\"clr-navyblue\">\r\n                <th>Page Title</th>\r\n                <th>URL Text</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let customer of plans\">\r\n                    <td class=\"padding0\">{{customer.title}}</td>\r\n                    <td class=\"padding0\">{{customer.url}}</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/pages/',customer._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-success btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deletePlan(customer._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"plans.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> Static Page Empty Kindly create One</span>\r\n        </div>\r\n    </div>\r\n</div>"

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

module.exports = "<div class=\"wrapper addPlanClass\">\r\n\t<app-sidebar></app-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-header></app-header>\r\n\t\t<div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n\t\t\t\t<router-outlet></router-outlet>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_plan_service__ = __webpack_require__("../../../../../src/app/services/plan.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminPlanComponent = (function () {
    function AdminPlanComponent() {
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
    __metadata("design:paramtypes", [])
], AdminPlanComponent);

var PlanListComponent = (function () {
    function PlanListComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.plans = [];
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
            console.log(err);
        });
    };
    PlanListComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Plan Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
            this.planService.planDelete(id).subscribe(function (data) {
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _e || Object])
], PlanListComponent);

var PlanAddComponent = (function () {
    function PlanAddComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.formErrors = {
            'name': '',
            'amount': '',
            'planType': '',
        };
        this.validationMessages = {
            'name': {
                'required': 'Plan Name is required.',
            },
            'amount': {
                'required': 'Amount is required.',
            },
            'planType': {
                'required': 'Plan Type is required.',
            },
        };
    }
    PlanAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            amount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            planType: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            desc: [''],
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PlanAddComponent.prototype.planAdd = function () {
        var _this = this;
        this.planService.planAdd(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Plan Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/plan']);
            }
        }, function (err) {
            console.log(err);
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
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _k || Object])
], PlanAddComponent);

var PlanEditComponent = (function () {
    function PlanEditComponent(lf, planService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.planService = planService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.formErrors = {
            'name': '',
            'amount': '',
            'planType': '',
        };
        this.validationMessages = {
            'name': {
                'required': 'Plan Name is required.',
            },
            'amount': {
                'required': 'Amount is required.',
            },
            'planType': {
                'required': 'Plan Type is required.',
            },
        };
    }
    PlanEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            amount: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            planType: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            desc: [''],
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.plan(id);
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PlanEditComponent.prototype.planUpdate = function () {
        var _this = this;
        this.planService.planUpdate(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Plan Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/plan']);
            }
        }, function (err) {
            console.log(err);
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
            console.log(err);
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
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_plan_service__["a" /* PlanService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _q || Object])
], PlanEditComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=plan.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/plan/planadd.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\t<div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header\" data-background-color=\"green\">\r\n                <h4 class=\"title\">Add Plan</h4>\r\n                <p class=\"category\">Create plan for user</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planAdd()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Plan Name <span>*</span></label>\r\n                                <input formControlName=\"name\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\r\n                                {{ formErrors.name }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group label-floating\">\r\n                                <label class=\"control-label\">Amount <span>*</span></label>\r\n                                <input formControlName=\"amount\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.amount\" class=\"alert alert-danger\">\r\n                                {{ formErrors.amount }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Plan Type <span>*</span></label>\r\n                                <select  formControlName=\"planType\" class=\"form-control\">\r\n                                    <option value=\"\">Select Plan</option>\r\n                                    <option value=\"3\">Quarterly</option>\r\n                                    <option value=\"6\">Half Yearly</option>\r\n                                    <option value=\"12\">Annual</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.planType\" class=\"alert alert-danger\">\r\n                                {{ formErrors.planType }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"form-group label-floating\">\r\n                                    <label class=\"control-label\"> Describe about this plan</label>\r\n                                    <textarea class=\"form-control\" formControlName=\"desc\" rows=\"5\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!planAddForm.valid\">Add Plan</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/planedit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header\" data-background-color=\"green\">\r\n                <h4 class=\"title\">Update Plan</h4>\r\n                <p class=\"category\">Update plan for customer</p>\r\n            </div>\r\n            <div class=\"card-content\">\r\n                <form [formGroup]=\"planAddForm\" (ngSubmit)=\"planUpdate()\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Plan Name <span>*</span></label>\r\n                                <input formControlName=\"name\" type=\"text\" class=\"form-control\" autofocus>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\r\n                                {{ formErrors.name }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Amount <span>*</span></label>\r\n                                <input formControlName=\"amount\" type=\"text\" class=\"form-control\">\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.amount\" class=\"alert alert-danger\">\r\n                                {{ formErrors.amount }}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label\">Plan Type <span>*</span></label>\r\n                                <select  formControlName=\"planType\" class=\"form-control\">\r\n                                    <option value=\"\">Select Plan </option>\r\n                                    <option value=\"3\">Quarterly</option>\r\n                                    <option value=\"6\">Half Yearly</option>\r\n                                    <option value=\"12\">Annual</option>\r\n                                </select>\r\n                            </div>\r\n                            <div *ngIf=\"formErrors.planType\" class=\"alert alert-danger\">\r\n                                {{ formErrors.planType }}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"form-group\">\r\n                                    <label class=\"control-label\"> Describe about this plan</label>\r\n                                    <textarea class=\"form-control\" formControlName=\"desc\" rows=\"5\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-success pull-right\" [disabled]=\"!planAddForm.valid\">Update Plan</button>\r\n                    <div class=\"clearfix\"></div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/plan/planlist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-nav-tabs\">\r\n    <div class=\"card-header\" data-background-color=\"green\">\r\n        <div class=\"nav-tabs-navigation\">\r\n            <div class=\"nav-tabs-wrapper\">\r\n                <span class=\"nav-tabs-title\">Plans</span>\r\n                <ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\r\n                    <li class=\"active pull-right\">\r\n                        <a  [routerLink]=\"['/admin/plan/add/']\">\r\n                            <i class=\"material-icons\">exposure_plus_1</i> Add Plan\r\n                            <div class=\"ripple-container\"></div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-content table-responsive\">\r\n        <table class=\"table\" *ngIf=\"plans.length >0\">\r\n            <thead class=\"text-success\">\r\n                <th>Name</th>\r\n                <th>Amount</th>\r\n                <th>Duration</th>\r\n                <th>Action</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let customer of plans\">\r\n                    <td class=\"padding0\">{{customer.name}}</td>\r\n                    <td class=\"padding0\">{{customer.amount}}</td>\r\n                     <td class=\"padding0\">{{customer.planType}} Months</td>\r\n                    <td class=\"padding0 td-actions text-right\">\r\n                        <a [routerLink]=\"['/admin/plan/',customer._id]\" rel=\"tooltip\" title=\"Edit Task\" class=\"btn btn-success btn-simple btn-xs\">\r\n                            <i class=\"material-icons\">edit</i>\r\n                        </a>\r\n                        <a rel=\"tooltip\" title=\"Remove\" class=\"btn btn-danger btn-simple btn-xs\" (click)=\"deletePlan(customer._id)\">\r\n                            <i class=\"material-icons\">close</i>\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"alert alert-warning\" *ngIf=\"plans.length == 0\">\r\n            <button type=\"button\" aria-hidden=\"true\" class=\"close\">×</button>\r\n            <span> <b> No Data - </b> Plan Empty Kindly create One</span>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-content .label-floating{\r\n\ttext-align: left;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n\t<app-sidebar></app-sidebar>\r\n\t<div class=\"main-panel\">\r\n\t\t<app-header></app-header>\r\n        <div class=\"content\">\r\n            <div class=\"container-fluid\">\r\n            \t<div class=\"row\">\r\n                    <div class=\"col-md-8\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header\" data-background-color=\"navyblue\">\r\n                                <h4 class=\"title\">Edit Admin Profile</h4>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <form [formGroup]=\"customerAddForm\" (ngSubmit)=\"adminUpdate()\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group \">\r\n                                                <label class=\"control-label\">Fist Name</label>\r\n                                                <input formControlName=\"firstname\" type=\"text\" class=\"form-control\" autofocus>\r\n                                            </div>\r\n                                            <div *ngIf=\"formErrors.firstname\" class=\"alert alert-danger\">\r\n                                                {{ formErrors.firstname }}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group \">\r\n                                                <label class=\"control-label\">Last Name</label>\r\n                                                <input formControlName=\"lastname\" type=\"text\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div *ngIf=\"formErrors.lastname\" class=\"alert alert-danger\">\r\n                                                {{ formErrors.lastname }}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group \">\r\n                                                <label class=\"control-label\">Email address</label>\r\n                                                <input formControlName=\"email\" type=\"email\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\r\n                                                {{ formErrors.email }}\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group \">\r\n                                                <label class=\"control-label\">Phone Number</label>\r\n                                                <input formControlName=\"phonenumber\" type=\"text\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div *ngIf=\"formErrors.phonenumber\" class=\"alert alert-danger\">\r\n                                                {{ formErrors.phonenumber }}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                <!--     <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group \">\r\n                                                <label class=\"control-label\">Date Of Birth</label>\r\n                                                <input formControlName=\"dob\" type=\"date\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div *ngIf=\"formErrors.dob\" class=\"alert alert-danger\">\r\n                                                {{ formErrors.dob }}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div> -->\r\n                                    <button type=\"submit\" class=\"btn bg-navyblue pull-right\" [disabled]=\"!customerAddForm.valid\">Save</button>\r\n                                    <div class=\"clearfix\"></div>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"card card-profile\">\r\n                            <div class=\"content\">\r\n                                <h6 class=\"category text-gray\">Change Password</h6>\r\n                                <form [formGroup]=\"cpForm\" (ngSubmit)=\"adminChangePassword()\">\r\n                                    <div class=\"card-content\">\r\n                                        <div class=\"\">\r\n                                            <div class=\"form-group label-floating\">\r\n                                                <label class=\"control-label\">Current Password</label>\r\n                                                <input formControlName=\"password\" type=\"password\" class=\"form-control\">\r\n                                            </div>                                                \r\n                                        </div>\r\n                                        <div class=\"\">\r\n                                            <div class=\"form-group label-floating\">\r\n                                                <label class=\"control-label\">New Password</label>\r\n                                                <input formControlName=\"newpassword\" type=\"password\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div *ngIf=\"cpFormErrors.newpassword\" class=\"alert alert-danger\">\r\n                                                {{ cpFormErrors.newpassword }}\r\n                                            </div>\r\n                                            <div *ngIf=\"err !=''\" class=\"alert alert-danger\">\r\n                                                {{err}}\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <button type=\"submit\" class=\"btn bg-navyblue btn-round\" [disabled]=\"!cpForm.valid\">Change Password</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = (function () {
    function ProfileComponent(adminService, router, lf, _flashMessagesService) {
        this.adminService = adminService;
        this.router = router;
        this.lf = lf;
        this._flashMessagesService = _flashMessagesService;
        this.err = '';
        this.passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.passwordp = '';
        this.newo = false;
        this.MutchPassword = false;
        this.formErrors = {
            'firstname': '',
            'lastname': '',
            'email': '',
            'phonenumber': '',
            'dob': '',
        };
        this.validationMessages = {
            'firstname': {
                'required': 'First Name is required.',
            },
            'lastname': {
                'required': 'Last Name is required.',
            },
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'phonenumber': {
                'required': 'Phone Number is required.',
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
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerAddForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            dob: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.emailp)]],
        });
        this.cpForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            newpassword: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern(this.passwordRegex)]]
        });
        this.cpForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.adminService.getProfile().subscribe(function (profile) {
            console.log(profile);
            _this.user = profile.user;
            _this.customerAddForm.patchValue(_this.user);
            _this.onValueChanged();
            _this.cpForm.controls["_id"].setValue(_this.user._id);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent.prototype.getUserById = function (id) {
        this.adminService.getUserById(id).subscribe(function (data) {
            if (!data.error) {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(data.message));
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ProfileComponent.prototype.matchpasswordreg = function () {
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
    ProfileComponent.prototype.onValueChanged = function (data) {
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
    ProfileComponent.prototype.adminUpdate = function () {
        var _this = this;
        this.adminService.userUpdate(this.customerAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Profile updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.getUserById(_this.customerAddForm.value._id);
                _this.router.navigate(['admin/dashboard']);
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-success', timeout: 5000 });
        });
    };
    ProfileComponent.prototype.adminChangePassword = function () {
        var _this = this;
        this.adminService.changePassword(this.cpForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getUserById(_this.cpForm.value._id);
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['admin/dashboard']);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
            console.log('kfgbhj');
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/admin/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/profile/profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _d || Object])
], ProfileComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/sidebar/sidebar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-color=\"navyblue\" data-image=\"../assets/img/sidebar-1.jpg\">\r\n    <div class=\"logo\"><a [routerLink]=\"['/admin/dashboard']\" class=\"simple-text\">Admin - Social Share</a></div>\r\n    <div class=\"sidebar-wrapper\">\r\n        <ul class=\"nav\">\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/dashboard']\">\r\n                    <i class=\"material-icons\">dashboard</i>\r\n                    <p>Dashboard</p>\r\n                </a>\r\n            </li>            \r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/user/']\">\r\n                    <i class=\"material-icons\">perm_identity</i>\r\n                    <p>Users</p>\r\n                </a>\r\n            </li>           \r\n            <!-- <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/plan/']\">\r\n                    <i class=\"material-icons\">business_center</i>\r\n                    <p>Membership Plans</p>\r\n                </a>\r\n            </li> -->\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/pages/']\">\r\n                    <i class=\"material-icons\">description</i>\r\n                    <p>Static Pages</p>\r\n                </a>\r\n            </li>\r\n            <li [routerLinkActive]=\"['active']\">\r\n                <a [routerLink]=\"['/admin/profile/']\">\r\n                    <i class=\"material-icons\">person</i>\r\n                    <p>Profile</p>\r\n                </a>\r\n            </li>\r\n            <li class=\"active active-pro\">\r\n                <a href=\"javascript:void(0)\" (click)=\"onLogoutClick()\" >\r\n                    <i class=\"material-icons\">power_settings_new</i>\r\n                    <p>Logout</p>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidebarComponent = (function () {
    function SidebarComponent(adminService, router, flashMessage) {
        this.adminService = adminService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.onLogoutClick = function () {
        this.adminService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['admin/login']);
        return false;
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-sidebar',
        template: __webpack_require__("../../../../../src/app/admin/sidebar/sidebar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/sidebar/sidebar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], SidebarComponent);

var _a, _b, _c;
//# sourceMappingURL=sidebar.component.js.map

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

module.exports = "<router-outlet></router-outlet>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_tinymce__ = __webpack_require__("../../../../angular2-tinymce/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_tinymce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_tinymce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_select__ = __webpack_require__("../../../../angular2-select/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_search_filter__ = __webpack_require__("../../../../ng2-search-filter/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_search_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_search_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_social_login__ = __webpack_require__("../../../../angular2-social-login/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_image_cropper__ = __webpack_require__("../../../../ngx-image-cropper/ngx-image-cropper.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_masonry__ = __webpack_require__("../../../../angular2-masonry/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular2_material_card__ = __webpack_require__("../../../../@angular2-material/card/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__admin_header_header_component__ = __webpack_require__("../../../../../src/app/admin/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__admin_sidebar_sidebar_component__ = __webpack_require__("../../../../../src/app/admin/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__admin_login_login_component__ = __webpack_require__("../../../../../src/app/admin/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__admin_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__admin_profile_profile_component__ = __webpack_require__("../../../../../src/app/admin/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__admin_forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/admin/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__ = __webpack_require__("../../../../../src/app/admin/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__ = __webpack_require__("../../../../../src/app/admin/plan/plan.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__admin_pages_pages_component__ = __webpack_require__("../../../../../src/app/admin/pages/pages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__frontend_frontend_component__ = __webpack_require__("../../../../../src/app/frontend/frontend.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__frontend_header_frontendheader_component__ = __webpack_require__("../../../../../src/app/frontend/header/frontendheader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__frontend_home_frontendhome_component__ = __webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__ = __webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_validate_service__ = __webpack_require__("../../../../../src/app/services/validate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_plan_service__ = __webpack_require__("../../../../../src/app/services/plan.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_category_service__ = __webpack_require__("../../../../../src/app/services/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_bookmark_service__ = __webpack_require__("../../../../../src/app/services/bookmark.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_pages_service__ = __webpack_require__("../../../../../src/app/services/pages.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_purchaseplan_service__ = __webpack_require__("../../../../../src/app/services/purchaseplan.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_37_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__guards_admin_guard__ = __webpack_require__("../../../../../src/app/guards/admin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__guards_user_guard__ = __webpack_require__("../../../../../src/app/guards/user.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_ng2_order_pipe__ = __webpack_require__("../../../../ng2-order-pipe/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_ng2_order_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40_ng2_order_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_41_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__safe_pipe__ = __webpack_require__("../../../../../src/app/safe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_ng2_sharebuttons__ = __webpack_require__("../../../../ng2-sharebuttons/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__public_public_component__ = __webpack_require__("../../../../../src/app/public/public.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ngx_clipboard__ = __webpack_require__("../../../../ngx-clipboard/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// Admin Component







// tslint:disable-next-line:max-line-length



// Frontend Component



// tslint:disable-next-line:max-line-length




















var providers = {
    'google': {
        'clientId': '214874028334-4t3q11rlobifpmspvrac9dl6i6k6usq2.apps.googleusercontent.com'
    },
    'facebook': {
        'clientId': '943878335767480',
        'apiVersion': 'v2.4'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_14__admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_17__admin_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_15__admin_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_18__admin_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_19__admin_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["a" /* AdminCustomerComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["f" /* CustomerListComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["d" /* CustomerAddComponent */], __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["e" /* CustomerEditComponent */],
            __WEBPACK_IMPORTED_MODULE_20__admin_forgot_password_forgot_password_component__["b" /* ForgotPasswordComponent */], __WEBPACK_IMPORTED_MODULE_20__admin_forgot_password_forgot_password_component__["a" /* AdminResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_16__admin_sidebar_sidebar_component__["a" /* SidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["a" /* AdminPlanComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["d" /* PlanListComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["b" /* PlanAddComponent */], __WEBPACK_IMPORTED_MODULE_22__admin_plan_plan_component__["c" /* PlanEditComponent */],
            __WEBPACK_IMPORTED_MODULE_23__admin_pages_pages_component__["a" /* AdminPagesComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_pages_pages_component__["d" /* PagesListComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_pages_pages_component__["b" /* PagesAddComponent */], __WEBPACK_IMPORTED_MODULE_23__admin_pages_pages_component__["c" /* PagesEditComponent */],
            __WEBPACK_IMPORTED_MODULE_24__frontend_frontend_component__["a" /* FrontendComponent */],
            __WEBPACK_IMPORTED_MODULE_25__frontend_header_frontendheader_component__["a" /* FrontendHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_26__frontend_home_frontendhome_component__["b" /* FrontendHomeComponent */], __WEBPACK_IMPORTED_MODULE_26__frontend_home_frontendhome_component__["c" /* ResetComponent */],
            __WEBPACK_IMPORTED_MODULE_26__frontend_home_frontendhome_component__["a" /* AccountActiveComponent */],
            __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["a" /* FrontendDashboardComponent */], __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["b" /* MyProfileComponent */], __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["f" /* ViewPublicComponent */],
            __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["d" /* SettingComponent */],
            __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["c" /* ProfileHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["c" /* AdminUserBoardsComponent */],
            __WEBPACK_IMPORTED_MODULE_21__admin_customer_customer_component__["b" /* AdminUserBoardsBookmarkComponent */],
            __WEBPACK_IMPORTED_MODULE_27__frontend_dashboard_frontenddashboard_component__["e" /* ViewComponent */],
            __WEBPACK_IMPORTED_MODULE_43__safe_pipe__["a" /* SafePipe */],
            __WEBPACK_IMPORTED_MODULE_45__public_public_component__["a" /* PublicComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_46_ngx_clipboard__["a" /* ClipboardModule */],
            __WEBPACK_IMPORTED_MODULE_11_ngx_image_cropper__["a" /* ImageCropperModule */],
            __WEBPACK_IMPORTED_MODULE_12_angular2_masonry__["a" /* MasonryModule */],
            __WEBPACK_IMPORTED_MODULE_13__angular2_material_card__["a" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6_angular2_tinymce__["TinymceModule"].withConfig({}),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["JsonpModule"],
            __WEBPACK_IMPORTED_MODULE_42__app_routes__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_37_angular2_flash_messages__["FlashMessagesModule"],
            __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_7_angular2_select__["SelectModule"],
            __WEBPACK_IMPORTED_MODULE_40_ng2_order_pipe__["Ng2OrderModule"],
            __WEBPACK_IMPORTED_MODULE_8_ng2_search_filter__["Ng2SearchPipeModule"],
            __WEBPACK_IMPORTED_MODULE_36__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_41_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClientJsonpModule */],
            __WEBPACK_IMPORTED_MODULE_44_ng2_sharebuttons__["a" /* ShareButtonsModule */].forRoot()
        ],
        // tslint:disable-next-line:max-line-length
        providers: [__WEBPACK_IMPORTED_MODULE_10_angular2_social_login__["b" /* AuthService */], __WEBPACK_IMPORTED_MODULE_28__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_32__services_category_service__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_33__services_bookmark_service__["a" /* BookmarkService */], __WEBPACK_IMPORTED_MODULE_29__services_admin_service__["a" /* AdminService */], __WEBPACK_IMPORTED_MODULE_38__guards_admin_guard__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_39__guards_user_guard__["a" /* UserGuard */], __WEBPACK_IMPORTED_MODULE_30__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_31__services_plan_service__["a" /* PlanService */], __WEBPACK_IMPORTED_MODULE_34__services_pages_service__["a" /* PagesService */], __WEBPACK_IMPORTED_MODULE_35__services_purchaseplan_service__["a" /* PurchaseplanService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

__WEBPACK_IMPORTED_MODULE_10_angular2_social_login__["a" /* Angular2SocialLoginModule */].loadProvidersScripts(providers);
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_login_login_component__ = __webpack_require__("../../../../../src/app/admin/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_profile_profile_component__ = __webpack_require__("../../../../../src/app/admin/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_forgot_password_forgot_password_component__ = __webpack_require__("../../../../../src/app/admin/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__ = __webpack_require__("../../../../../src/app/admin/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_plan_plan_component__ = __webpack_require__("../../../../../src/app/admin/plan/plan.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_pages_pages_component__ = __webpack_require__("../../../../../src/app/admin/pages/pages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__frontend_frontend_component__ = __webpack_require__("../../../../../src/app/frontend/frontend.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__frontend_home_frontendhome_component__ = __webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__ = __webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__ = __webpack_require__("../../../../../src/app/guards/admin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__guards_user_guard__ = __webpack_require__("../../../../../src/app/guards/user.guard.ts");

// Admin Component





// tslint:disable-next-line:whitespace
// tslint:disable-next-line:max-line-length



// Frontend Component


// tslint:disable-next-line:max-line-length

/*Auth Gaurds*/


var appRoutes = [
    {
        path: 'admin', component: __WEBPACK_IMPORTED_MODULE_1__admin_admin_component__["a" /* AdminComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_login_component__["a" /* LoginComponent */] },
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__admin_login_login_component__["a" /* LoginComponent */] },
            { path: 'forgotpassword', component: __WEBPACK_IMPORTED_MODULE_5__admin_forgot_password_forgot_password_component__["b" /* ForgotPasswordComponent */] },
            { path: 'resetpassword/:id', component: __WEBPACK_IMPORTED_MODULE_5__admin_forgot_password_forgot_password_component__["a" /* AdminResetPasswordComponent */] },
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_3__admin_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__["a" /* AuthGuard */]] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_4__admin_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__["a" /* AuthGuard */]] },
            { path: 'pages', component: __WEBPACK_IMPORTED_MODULE_8__admin_pages_pages_component__["a" /* AdminPagesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_8__admin_pages_pages_component__["d" /* PagesListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_8__admin_pages_pages_component__["b" /* PagesAddComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_8__admin_pages_pages_component__["c" /* PagesEditComponent */], },
                ] },
            { path: 'user', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["a" /* AdminCustomerComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["f" /* CustomerListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["d" /* CustomerAddComponent */], },
                    { path: 'borads/:id', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["c" /* AdminUserBoardsComponent */], },
                    { path: 'borads/bookmark/:id', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["b" /* AdminUserBoardsBookmarkComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_6__admin_customer_customer_component__["e" /* CustomerEditComponent */], },
                ] },
            { path: 'plan', component: __WEBPACK_IMPORTED_MODULE_7__admin_plan_plan_component__["a" /* AdminPlanComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_admin_guard__["a" /* AuthGuard */]], children: [
                    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__admin_plan_plan_component__["d" /* PlanListComponent */], },
                    { path: 'add', component: __WEBPACK_IMPORTED_MODULE_7__admin_plan_plan_component__["b" /* PlanAddComponent */], },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_7__admin_plan_plan_component__["c" /* PlanEditComponent */], },
                ] },
        ]
    },
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_9__frontend_frontend_component__["a" /* FrontendComponent */], children: [
            { path: 'public/:id', component: __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__["f" /* ViewPublicComponent */] },
            { path: 'resetpassword/:id', component: __WEBPACK_IMPORTED_MODULE_10__frontend_home_frontendhome_component__["c" /* ResetComponent */] },
            { path: 'account-active/:token', component: __WEBPACK_IMPORTED_MODULE_10__frontend_home_frontendhome_component__["a" /* AccountActiveComponent */] },
            { path: '', component: __WEBPACK_IMPORTED_MODULE_10__frontend_home_frontendhome_component__["b" /* FrontendHomeComponent */] },
            { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__["a" /* FrontendDashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_user_guard__["a" /* UserGuard */]] },
            { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__["b" /* MyProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_user_guard__["a" /* UserGuard */]] },
            { path: 'setting/:id', component: __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__["d" /* SettingComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_user_guard__["a" /* UserGuard */]] },
            { path: 'view/:id', component: __WEBPACK_IMPORTED_MODULE_11__frontend_dashboard_frontenddashboard_component__["e" /* ViewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_13__guards_user_guard__["a" /* UserGuard */]] }
        ]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/frontenddashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".pt-80{\r\n\tpadding-top: 80px;\r\n}\r\n\r\n.custom-dropdown-menu {\r\n    left: unset;\r\n    right: 0;\r\n}\r\n\r\n.brick { \r\n    width: 100px !important;\r\n }\r\n .box{\r\n     border: 1px solid gainsboro;\r\n     padding: 10px;\r\n }\r\n \r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/frontenddashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<app-profileheader></app-profileheader>\r\n<flash-messages></flash-messages>\r\n<section style=\"padding-top:65px;\">\r\n    <h1 class=\"display-2 text-center text-muted pt-5\">Dashboard</h1>\r\n</section>"

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/frontenddashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrontendDashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProfileHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MyProfileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SettingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ViewPublicComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_category_service__ = __webpack_require__("../../../../../src/app/services/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__ = __webpack_require__("../../../../../src/app/services/bookmark.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_validate_service__ = __webpack_require__("../../../../../src/app/services/validate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_observable_interval__ = __webpack_require__("../../../../rxjs/add/observable/interval.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__global__ = __webpack_require__("../../../../../src/app/global.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var FrontendDashboardComponent = (function () {
    function FrontendDashboardComponent() {
    }
    FrontendDashboardComponent.prototype.ngOnInit = function () {
    };
    return FrontendDashboardComponent;
}());
FrontendDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-frontenddashboard',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FrontendDashboardComponent);

var ProfileHeaderComponent = ProfileHeaderComponent_1 = (function () {
    // tslint:disable-next-line:max-line-length
    function ProfileHeaderComponent(route, toastr, validateService, vRef, userService, categoryService, bookService, router, lf) {
        var _this = this;
        this.route = route;
        this.toastr = toastr;
        this.validateService = validateService;
        this.userService = userService;
        this.categoryService = categoryService;
        this.bookService = bookService;
        this.router = router;
        this.lf = lf;
        this.isCopied1 = false;
        this.invalidUrl = false;
        this.isHere = false;
        this.showcaseField = false;
        this.categorySelectedId = false;
        ProfileHeaderComponent_1.updateUserStatus.subscribe(function (res) {
            _this.getMyCategories();
        });
        this.customer = JSON.parse(localStorage.getItem('customer'));
        this.checkCustomer();
        this.getMyCategories();
        this.toastr.setRootViewContainerRef(vRef);
    }
    ProfileHeaderComponent.prototype.ngOnInit = function () {
        this.shareUrl = window.location.href;
        setTimeout(function () {
            /* this.liCount = document.getElementById('category-navbar').getElementsByTagName('li').length; */
        }, 0);
        this.addCategoryForm = this.lf.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.addLinkForm = this.lf.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            type: [''],
            body: [''],
            category_id: ['']
        });
        this.category_id = this.childMessage;
        this.checkCustomer();
    };
    ProfileHeaderComponent.prototype.copyToClipboard = function () {
        // tslint:disable-next-line:max-line-length
        this.toastr.info('Copied to Clipboard');
    };
    ProfileHeaderComponent.prototype.doShare = function (category) {
        this.category = category;
        this.socialShareUrl = __WEBPACK_IMPORTED_MODULE_14__global__["a" /* url */] + 'public/' + category._id;
        this.modelShareOpen();
    };
    ProfileHeaderComponent.prototype.doEmbed = function (category) {
        this.category = category;
        // tslint:disable-next-line:max-line-length
        this.textToCopy = '<div id="showcaseSocialBlock" data-showcaseID=' + this.category._id + '></div><script src="https://measuremight.com:3002/embed.min.js"></script>';
        this.modelEmbedOpen();
    };
    ProfileHeaderComponent.prototype.addBoodmark = function (id) {
        var _this = this;
        if (id) {
            this.addLinkForm.controls['category_id'].setValue(id);
        }
        this.bookService.bookmarkAdd(this.addLinkForm.value).subscribe(function (data) {
            if (!data.eror) {
                _this.toastr.success('Bookmark added succesfully.', 'Success!');
                _this.modelCopyToClose();
                setTimeout(function () {
                    ViewComponent.updateBookmarkStatus.next(true); // here
                    _this.router.navigate(['view', _this.addLinkForm.value['category_id']]);
                    _this.addLinkForm.reset();
                }, 500);
            }
            else {
                _this.toastr.error('Error while adding bookmark, Try again.', 'Oops!');
            }
        });
    };
    ProfileHeaderComponent.prototype.openCopyToModel = function () {
        this.modelBookmarkClose();
        this.modelCopyToOpen();
    };
    ProfileHeaderComponent.prototype.openNewShowcase = function () {
        this.showcaseField = true;
        this.categorySelectedId = false;
    };
    ProfileHeaderComponent.prototype.categorySelected = function (id) {
        this.showcaseField = false;
        this.categorySelectedId = true;
        this.addLinkForm.controls['category_id'].setValue(id);
    };
    ProfileHeaderComponent.prototype.addLink = function () {
        this.embedLink(this.addLinkForm.value['title']);
        this.modelBookmarkOpen();
    };
    ProfileHeaderComponent.prototype.modelBookmarkCloseEmptyForm = function () {
        this.addLinkForm.reset();
        this.modelBookmarkClose();
    };
    ProfileHeaderComponent.prototype.embedFacebook = function (url) {
        // public => https://www.facebook.com/notes/facebook/public-search-listings-on-facebook/2963412130/
        // private => https://www.facebook.com/bob.brello
        var inputURL = encodeURIComponent(url);
        var ur = 'https://www.facebook.com/plugins/post.php?href=' + inputURL + '%26type%3D3&width=600';
        // tslint:disable-next-line:max-line-length
        var embedHTML = '<iframe id="bookmarkiframe" src="https://www.facebook.com/plugins/post.php?href=' + inputURL + '%26type%3D3&width=600" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
        var htmlToAdd = this.convertToGridItem(embedHTML);
        this.addLinkForm.controls['title'].setValue(ur);
        this.addLinkForm.controls['body'].setValue(embedHTML);
        this.addLinkForm.controls['type'].setValue('facebook');
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
    };
    ProfileHeaderComponent.prototype.embedInsta = function (url) {
        var _this = this;
        this.validateService.getInsta(url)
            .subscribe(function (data) {
            _this.addLinkForm.controls['title'].setValue(url);
            _this.addLinkForm.controls['body'].setValue(data.html);
            _this.addLinkForm.controls['type'].setValue('instagram');
            document.getElementById('loader').style.display = 'none';
            document.getElementById('bookMark').innerHTML = data.html;
            instgrm.Embeds.process();
        }, function (error) {
            document.getElementById('bookMark').innerHTML = 'Invalid Url';
            _this.invalidUrl = true;
            document.getElementById('loader').style.display = 'none';
        });
    };
    ProfileHeaderComponent.prototype.embedTwitter = function (url) {
        var _this = this;
        this.validateService.getTwitter(url)
            .subscribe(function (data) {
            _this.addLinkForm.controls['title'].setValue(url);
            _this.addLinkForm.controls['body'].setValue(data.html);
            _this.addLinkForm.controls['type'].setValue('twitter');
            document.getElementById('loader').style.display = 'none';
            document.getElementById('bookMark').innerHTML = data.html;
            twttr.widgets.load();
        }, function (error) {
            document.getElementById('bookMark').innerHTML = 'Invalid Url';
            _this.invalidUrl = true;
            document.getElementById('loader').style.display = 'none';
        });
    };
    ProfileHeaderComponent.prototype.embedPinterest = function (url) {
        var embedHTML = '<a data-pin-do="embedPin" data-pin-width="large" data-pin-terse="true" href="' + url + '"></a>';
        var htmlToAdd = this.convertToGridItem(embedHTML);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
    };
    ProfileHeaderComponent.prototype.embedSoundCloud = function (url) {
        // tslint:disable-next-line:max-line-length
        var ur = 'https://w.soundcloud.com/player/?url="' + url + '"';
        var embedHTML = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + url + '"></iframe>';
        var htmlToAdd = this.convertToGridItem(embedHTML);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
        this.addLinkForm.controls['title'].setValue(ur);
        this.addLinkForm.controls['body'].setValue(embedHTML);
        this.addLinkForm.controls['type'].setValue('facebook');
    };
    ProfileHeaderComponent.prototype.convertToGridItem = function (htmlInc) {
        if (htmlInc.match('facebook.com')) {
            // need to fix up BS facebook stuff
            // console.log(htmlInc);
        }
        var html = '<div class="grid-item">';
        html += '   ' + htmlInc;
        html += '</div>';
        return html;
    };
    ProfileHeaderComponent.prototype.embedYoutube = function (url) {
        var _this = this;
        var youtubeID = url.split('v=')[1];
        this.validateService.getYoutube(youtubeID)
            .subscribe(function (data) {
            if (data.items.length > 0) {
                // tslint:disable-next-line:max-line-length
                var embedHTML = '<iframe width="100%" id="bookmarkiframe" height="337" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
                _this.addLinkForm.controls['title'].setValue('https://www.youtube.com/embed/' + youtubeID);
                _this.addLinkForm.controls['body'].setValue(embedHTML);
                _this.addLinkForm.controls['type'].setValue('youtube');
                var htmlToAdd = _this.convertToGridItem(embedHTML);
                document.getElementById('loader').style.display = 'none';
                _this.invalidUrl = false;
                document.getElementById('bookMark').innerHTML = htmlToAdd;
            }
            else {
                document.getElementById('bookMark').innerHTML = 'Invalid Url';
                _this.invalidUrl = true;
                document.getElementById('loader').style.display = 'none';
            }
        }, function (err) {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('bookMark').innerHTML = 'Invalid Url';
            _this.invalidUrl = true;
        });
    };
    ProfileHeaderComponent.prototype.embedLink = function (link) {
        document.getElementById('loader').style.display = 'block';
        if (link.match('instagram.com')) {
            this.embedInsta(link);
        }
        else if (link.match('youtube.com')) {
            this.embedYoutube(link);
        }
        else if (link.match('facebook.com')) {
            this.embedFacebook(link);
        }
        else if (link.match('twitter.com')) {
            this.embedTwitter(link);
        }
        else if (link.match('pinterest.co')) {
            this.embedPinterest(link);
        }
        else if (link.match('soundcloud.com')) {
            this.embedSoundCloud(link);
        }
    };
    ProfileHeaderComponent.prototype.slugify = function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };
    ProfileHeaderComponent.prototype.getMyCategories = function () {
        var _this = this;
        this.userService.mycategory().subscribe(function (data) {
            if (!data.err) {
                _this.categories = data.message;
            }
        });
    };
    ProfileHeaderComponent.prototype.addCategory = function () {
        this.modelOpen();
    };
    ProfileHeaderComponent.prototype.addCategoryData = function (action) {
        var _this = this;
        if (action === 'close') {
            this.modelCopyToClose();
        }
        var position = this.addCategoryForm.value['position'];
        var obj = this.addCategoryForm.value;
        obj.user_id = this.customer._id;
        this.categoryService.categoryPositionUpdate(position).subscribe(function (data) {
            if (!data.error) {
                _this.categoryService.categoryAdd(obj).subscribe(function (data2) {
                    if (!data2.error) {
                        _this.toastr.success('Board added successfully.', 'Success!');
                        if (action) {
                            _this.addBoodmark(data2.message._id);
                        }
                        _this.modelClose();
                        _this.getMyCategories();
                        _this.addCategoryForm.reset();
                    }
                    else {
                        _this.toastr.error('Erro while adding board, Try again.', 'Oops!');
                        _this.modelClose();
                        _this.addCategoryForm.reset();
                        _this.getMyCategories();
                    }
                });
            }
        });
    };
    ProfileHeaderComponent.prototype.modelOpen = function () {
        document.getElementById('categoryModal').style.display = 'block';
    };
    ProfileHeaderComponent.prototype.modelClose = function () {
        document.getElementById('categoryModal').style.display = 'none';
    };
    ProfileHeaderComponent.prototype.modelBookmarkClose = function () {
        document.getElementById('bookmarkModal').style.display = 'none';
    };
    ProfileHeaderComponent.prototype.modelBookmarkOpen = function () {
        document.getElementById('bookmarkModal').style.display = 'block';
    };
    ProfileHeaderComponent.prototype.modelEmbedClose = function () {
        document.getElementById('embedModal').style.display = 'none';
    };
    ProfileHeaderComponent.prototype.modelEmbedOpen = function () {
        document.getElementById('embedModal').style.display = 'block';
    };
    ProfileHeaderComponent.prototype.modelCopyToOpen = function () {
        document.getElementById('copytokModal').style.display = 'block';
    };
    ProfileHeaderComponent.prototype.modelCopyToClose = function () {
        document.getElementById('copytokModal').style.display = 'none';
    };
    ProfileHeaderComponent.prototype.modelShareOpen = function () {
        document.getElementById('shareModal').style.display = 'block';
    };
    ProfileHeaderComponent.prototype.modelShareClose = function () {
        document.getElementById('shareModal').style.display = 'none';
    };
    ProfileHeaderComponent.prototype.checkCustomer = function () {
        var _this = this;
        this.customer = JSON.parse(localStorage.getItem('customer'));
        if (this.customer) {
            if (!this.isHere) {
                this.userService.getProfile().subscribe(function (data) {
                    if (data.user) {
                        _this.isHere = true;
                        _this.currentCustomer = data.user;
                    }
                });
            }
            return true;
        }
        else {
            return false;
        }
    };
    ProfileHeaderComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['/']);
    };
    return ProfileHeaderComponent;
}());
ProfileHeaderComponent.updateUserStatus = new __WEBPACK_IMPORTED_MODULE_11_rxjs_Subject__["Subject"]();
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ProfileHeaderComponent.prototype, "childMessage", void 0);
ProfileHeaderComponent = ProfileHeaderComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profileheader',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/profileheader.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_validate_service__["a" /* ValidateService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _j || Object])
], ProfileHeaderComponent);

var MyProfileComponent = (function () {
    function MyProfileComponent(lf, userService, _flashMessagesService) {
        this.lf = lf;
        this.userService = userService;
        this._flashMessagesService = _flashMessagesService;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_14__global__["a" /* url */] + 'upload' });
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.customer = {};
        this.filesToUpload = [];
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        this.customer = JSON.parse(localStorage.getItem('customer'));
        // console.log(this.customer,'profile');
        this.customerProfileForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            image: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.customerPasswordUpdateForm = this.lf.group({
            _id: [''],
            oldpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            newpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        this.getProfile();
    };
    MyProfileComponent.prototype.upload = function () {
        var _this = this;
        this.makeFileRequest('https://measuremight.com:3002/upload', [], this.filesToUpload).then(function (result) {
            _this.customerProfileForm.controls['image'].setValue('/uploads/' + result['filename']);
            _this.profileUpdate();
            _this.modelClose();
        }, function (error) {
            console.error(error);
        });
    };
    MyProfileComponent.prototype.fileChangeEvent = function (fileInput) {
        this.modelOpen();
        this.imageChangedEvent = event;
        this.filesToUpload = fileInput.target.files;
    };
    MyProfileComponent.prototype.makeFileRequest = function (url, params, files) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ImageURL = _this.croppedImage;
            // Split the base64 string in data and contentType
            var block = ImageURL.split(';');
            // Get the content type
            var contentType = block[0].split(':')[1]; // In this case 'image/gif'
            // get the real base64 content of the file
            var realData = block[1].split(',')[1]; // In this case "iVBORw0KGg...."
            // Convert to blob
            var blob = _this.b64toBlob(realData, contentType, 512);
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append('file', blob, files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    };
    MyProfileComponent.prototype.modelOpen = function () {
        document.getElementById('imageuploadModal').style.display = 'block';
    };
    MyProfileComponent.prototype.modelClose = function () {
        document.getElementById('imageuploadModal').style.display = 'none';
    };
    MyProfileComponent.prototype.imageCropped = function (image) {
        this.croppedImage = image;
    };
    MyProfileComponent.prototype.b64toBlob = function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    MyProfileComponent.prototype.getProfile = function () {
        var _this = this;
        this.userService.getProfile().subscribe(function (data) {
            if (data.user) {
                _this.customer = data.user;
                _this.customerProfileForm.patchValue(data.user);
            }
        });
    };
    MyProfileComponent.prototype.profileUpdate = function () {
        var _this = this;
        this.userService.updateProfile(this.customerProfileForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getProfile();
                _this._flashMessagesService.show('Profile Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
            }
            else {
                _this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
            }
        });
    };
    MyProfileComponent.prototype.passwordUpdate = function () {
        var _this = this;
        var obj = {
            id: this.customer['_id'],
            password: this.customerPasswordUpdateForm.value['oldpassword']
        };
        this.userService.checkPassword(obj).subscribe(function (data) {
            if (!data.error) {
                if (_this.customerPasswordUpdateForm.value['newpassword'] === _this.customerPasswordUpdateForm.value['confirmpassword']) {
                    var obj_1 = {};
                    obj_1['_id'] = _this.customer['_id'];
                    obj_1['password'] = _this.customerPasswordUpdateForm.value['newpassword'];
                    // tslint:disable-next-line:no-shadowed-variable
                    _this.userService.resetPassword(obj_1).subscribe(function (data) {
                        if (!data.error) {
                            _this._flashMessagesService.show('Password Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                        }
                    });
                }
                else {
                    // tslint:disable-next-line:max-line-length
                    _this._flashMessagesService.show('New Password & confirm password does not match', { cssClass: 'alert-danger', timeout: 5000 });
                }
            }
            else {
                _this._flashMessagesService.show('Old password is worng.', { cssClass: 'alert-danger', timeout: 5000 });
            }
        });
    };
    MyProfileComponent.prototype.imageParse = function () {
        if (this.customer.image) {
            return this.customer.image;
        }
        else {
            return 'https://www.w3schools.com/howto/img_avatar.png';
        }
    };
    MyProfileComponent.prototype.onChange = function (event) {
        var _this = this;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            _this.customerProfileForm.controls['image'].setValue('/uploads/' + responsePath.filename);
            _this.profileUpdate();
        };
    };
    return MyProfileComponent;
}());
MyProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-myprofile',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/myprofile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_angular2_flash_messages__["FlashMessagesService"]) === "function" && _m || Object])
], MyProfileComponent);

var SettingComponent = (function () {
    function SettingComponent(router, route, vRef, categoryService, bookmarkService, sanitizer, lf, toastr, userService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.categoryService = categoryService;
        this.bookmarkService = bookmarkService;
        this.sanitizer = sanitizer;
        this.lf = lf;
        this.toastr = toastr;
        this.userService = userService;
        this.bookmarks_ids = [];
        this.categorySelectedId = false;
        this.showcaseField = false;
        this.flag = true;
        this.toastr.setRootViewContainerRef(vRef);
        this.customer = JSON.parse(localStorage.getItem('customer'));
        this.router.events.subscribe(function (val) {
            if (_this.flag) {
                _this.flag = false;
                _this.route.params.subscribe(function (params) {
                    _this.id = params['id'];
                    _this.bookmarks_ids = [];
                    _this.parentMessage = _this.id;
                    _this.getMyCategories();
                    _this.getbookmark(_this.id);
                });
            }
        });
    }
    SettingComponent.prototype.videoUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addCategoryForm = this.lf.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.updateCategoryForm = this.lf.group({
            _id: [''],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.updateCategoryForm.reset();
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getMyCategories();
        this.getbookmark(this.id);
    };
    SettingComponent.prototype.doDeleteBookmark = function (id) {
        var _this = this;
        this.bookmarkService.bookmarkDelete(id).subscribe(function (data) {
            if (!data.error) {
                _this.toastr.success('Bookmark deleted succesfully.', 'Success!');
                _this.getbookmark(_this.id);
            }
            else {
                _this.toastr.error('Error while deleting bookmark, Try again', 'Oops!');
            }
        });
    };
    SettingComponent.prototype.getbookmark = function (id) {
        var _this = this;
        this.bookmarkService.categoryBookmarks(id).subscribe(function (data) {
            if (!data.error) {
                _this.bookmarks = data.message;
                setTimeout(function () {
                    instgrm.Embeds.process();
                    twttr.widgets.load();
                }, 3000);
            }
        });
    };
    SettingComponent.prototype.getMyCategories = function () {
        var _this = this;
        this.userService.mycategory().subscribe(function (data) {
            if (!data.err) {
                _this.categories = data.message;
                _this.category = data.message;
                _this.category = _this.category.filter(function (cid) { return cid._id === _this.id; });
                _this.updateCategoryForm.patchValue(_this.category[0]);
            }
        });
    };
    SettingComponent.prototype.myCategories = function () {
        var _this = this;
        this.userService.mycategory().subscribe(function (data) {
            if (!data.err) {
                _this.categories = data.message;
            }
        });
    };
    SettingComponent.prototype.changePosition = function (type, bookmark_id, position) {
        var _this = this;
        var obj = {
            type: type,
            bookmark_id: bookmark_id,
            category_id: this.id,
            position: position
        };
        this.bookmarkService.changePosition(obj).subscribe(function (data) {
            if (!data.error) {
                _this.toastr.success('Bookmark position changed succesfully.', 'Success!');
                _this.getbookmark(_this.id);
            }
            else {
                _this.toastr.error('Erro while chaning bookmark position, Try again.', 'Oops!');
            }
        });
    };
    SettingComponent.prototype.doSelect = function (obj) {
        var index = this.bookmarks_ids.findIndex(function (item) {
            return item._id === obj._id;
        });
        if (index > -1) {
            this.bookmarks_ids.splice(index, 1);
        }
        else {
            this.bookmarks_ids.push(obj);
        }
    };
    SettingComponent.prototype.doDelete = function () {
        var _this = this;
        var obj = {
            ids: this.bookmarks_ids
        };
        this.bookmarkService.bookmarkDeleteSelected(obj).subscribe(function (data) {
            if (!data.error) {
                _this.toastr.success('Bookmarks deleted succesfully.', 'Success!');
                _this.getbookmark(_this.id);
            }
            else {
                _this.toastr.error('Error while deleting bookmarks, Try again', 'Oops!');
            }
        });
    };
    SettingComponent.prototype.doSelectedCopy = function () {
        var obj = {
            ids: this.bookmarks_ids
        };
        this.copyShowcaseBookmarks = this.bookmarks_ids;
        this.modelCopy2Open();
    };
    SettingComponent.prototype.doCopy = function (bookmark) {
        this.myCategories();
        this.copyShowcaseBookmark = bookmark;
        this.modelCopy2Open();
    };
    SettingComponent.prototype.modelCopy2Open = function () {
        document.getElementById('copy2Modal').style.display = 'block';
    };
    SettingComponent.prototype.modelCopy2Close = function () {
        document.getElementById('copy2Modal').style.display = 'none';
    };
    SettingComponent.prototype.categorySelected = function (bookmark, category_id, copyShowcaseBookmarks) {
        this.showcaseField = false;
        this.categorySelectedId = true;
        if (copyShowcaseBookmarks) {
            this.bookmarkData = copyShowcaseBookmarks.filter(function (data) {
                delete data['_id'];
                return data.category_id = category_id;
            });
        }
        if (bookmark) {
            delete bookmark['_id'];
            bookmark.category_id = category_id;
            this.bookmarkData = bookmark;
        }
    };
    SettingComponent.prototype.openNewShowcase = function (bookmark, bookmarks) {
        this.showcaseField = true;
        this.categorySelectedId = false;
        if (bookmarks) {
            this.bookmarkData = bookmarks.filter(function (data) {
                return delete data['_id'];
            });
        }
        if (bookmark) {
            delete bookmark['_id'];
            this.bookmarkData = bookmark;
        }
    };
    SettingComponent.prototype.updateCatIdINBookmark = function (id) {
        if (this.bookmarkData.length > 0) {
            this.bookmarkData = this.bookmarkData.filter(function (data) {
                delete data['_id'];
                return data.category_id = id;
            });
        }
        if (typeof this.bookmarkData.length === 'undefined') {
            this.bookmarkData.category_id = id;
        }
        this.addBoodmark();
    };
    SettingComponent.prototype.addCategoryData = function () {
        var _this = this;
        var position = this.addCategoryForm.value['position'];
        var obj = this.addCategoryForm.value;
        obj.user_id = this.customer._id;
        this.categoryService.categoryPositionUpdate(position).subscribe(function (data) {
            if (!data.error) {
                _this.categoryService.categoryAdd(obj).subscribe(function (data2) {
                    if (!data2.error) {
                        _this.updateCatIdINBookmark(data2.message._id);
                        _this.toastr.success('Board added successfully.', 'Success!');
                        _this.getMyCategories();
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                        _this.addCategoryForm.reset();
                    }
                    else {
                        _this.toastr.error('Erro while adding board, Try again.', 'Oops!');
                        _this.addCategoryForm.reset();
                        _this.getMyCategories();
                    }
                });
            }
        });
    };
    SettingComponent.prototype.addBoodmark = function () {
        var _this = this;
        if (this.bookmarkData.length > 0) {
            this.modelCopy2Close();
            this.toastr.success('Bookmarks copied succesfully.', 'Success!');
            var flag_1 = false;
            for (var index = 0; index < this.bookmarkData.length; index++) {
                this.bookmarkService.bookmarkAdd(this.bookmarkData[index]).subscribe(function (data) {
                    if (!data.error) {
                        flag_1 = true;
                    }
                });
            }
        }
        if (typeof this.bookmarkData.length === 'undefined') {
            this.bookmarkService.bookmarkAdd(this.bookmarkData).subscribe(function (data) {
                if (!data.error) {
                    _this.toastr.success('Bookmarks copied succesfully.', 'Success!');
                    _this.modelCopy2Close();
                }
                else {
                    _this.toastr.error('Error while coping bookmarks, Try again', 'Oops!');
                }
            });
        }
    };
    SettingComponent.prototype.doDeleteBoard = function (id) {
        var _this = this;
        this.categoryService.categoryDelete(id).subscribe(function (data) {
            if (!data.error) {
                _this.toastr.success('Board deleted succesfully.', 'Success!');
                setTimeout(function () {
                    _this.router.navigate(['/dashboard']);
                }, 1000);
            }
            else {
                _this.toastr.error('Error while deleting board, Try again', 'Oops!');
            }
        });
    };
    SettingComponent.prototype.updateCategoryData = function () {
        var _this = this;
        var position = this.updateCategoryForm.value['position'];
        var obj = this.updateCategoryForm.value;
        obj.user_id = this.customer._id;
        if (position !== this.category[0].position) {
            this.categoryService.categoryPositionUpdate(position).subscribe(function (data) {
                if (!data.error) {
                    _this.categoryService.categoryUpdate(obj).subscribe(function (data2) {
                        if (!data2.error) {
                            _this.toastr.success('Category updated succesfully.', 'Success!');
                            $('#' + _this.updateCategoryForm.value['_id']).text(_this.updateCategoryForm.value['name']);
                            ProfileHeaderComponent.updateUserStatus.next(true); // here
                            _this.getMyCategories();
                        }
                        else {
                            _this.toastr.error('Error while updating category. Try again.', 'Oops!');
                            _this.getMyCategories();
                        }
                    });
                }
            });
        }
        else {
            this.categoryService.categoryUpdate(obj).subscribe(function (data2) {
                if (!data2.error) {
                    _this.toastr.success('Category updated succesfully.', 'Success!');
                    $('#' + _this.updateCategoryForm.value['_id']).text(_this.updateCategoryForm.value['name']);
                    _this.getMyCategories();
                }
                else {
                    _this.toastr.error('Error while updating category. Try again.', 'Oops!');
                    _this.getMyCategories();
                }
            });
        }
    };
    return SettingComponent;
}());
SettingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-setting',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/setting.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/setting.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]) === "function" && _w || Object])
], SettingComponent);

/* @Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./frontenddashboard.component.css']
})
export class ViewComponent implements AfterViewInit, OnInit {
    public static updateBookmarkStatus: Subject<boolean> = new Subject();
    bookmarks = [];
    flag: any = true;
    parentMessage: any;
    options: MasonryOptions = {
        transitionDuration: '0.3s',
        itemSelector: '.grid-item'
    };
    curColWidth = 0;
    gridColWidth = '';
    bricks: any[] = [];

    @ViewChild(AngularMasonry) masonry: AngularMasonry;
    @ViewChild(AngularMasonry) masonryBrick: AngularMasonryBrick;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private bookmarkService: BookmarkService,
        private categoryService: CategoryService,
        private sanitizer: DomSanitizer) {
        ViewComponent.updateBookmarkStatus.subscribe(res => {
            this.route.params.subscribe((params: Params) => {
                const id = params['id'];
                this.parentMessage = id;
                this.getbookmark(id);
            });
        });
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    this.parentMessage = id;
                    this.getbookmark(id);
                });
            }
        });
    }

    ngOnInit() {
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    this.parentMessage = id;
                    this.getbookmark(id);
                });
            }
        });
    }

    ngAfterViewInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.parentMessage = id;
            this.getbookmark(id);
        });
    }

    setHeight(type) {
        if (type = 'facebook') {
            return '400';
        } else if (type = 'youtube') {
            return '337';
        }
    }

    setWidth(type) {
        return this.curColWidth;
    }
    manageUI() {
        let cols = 4;
        if ($('body').width() > 1600) {
            cols = 4;
        } else if ($('body').width() > 1000) {
            cols = 3;
        } else if ($('body').width() > 600) {
            cols = 2;
        } else {
            cols = 1;
        }
        const theW = ($('body').width() - ($('body').width() / 50)) / cols;
        this.curColWidth = theW;
        $('iframe').css('width', theW);
        $('twitterwidget').css('width', theW);
        const th = theW + (theW / 50) - 9;
        this.gridColWidth = th + 'px';
        $('.grid-item').css('width', th);
    }

    setStyles() {
        const styles = {
            'width': this.gridColWidth
        };
        return styles;
    }

    getbookmark(id) {
        this.bookmarkService.categoryBookmarks(id).subscribe((data) => {
            if (!data.error) {
                this.bookmarks = data.message;
                setTimeout(() => {
                    instgrm.Embeds.process();
                    twttr.widgets.load();
                    this.manageUI();
                }, 3000);
            }
        });
    }

    videoUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
} */
var ViewPublicComponent = (function () {
    function ViewPublicComponent(router, route, bookmarkService, categoryService, sanitizer) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.bookmarkService = bookmarkService;
        this.categoryService = categoryService;
        this.sanitizer = sanitizer;
        this.bookmarks = [];
        this.flag = true;
        this.curColWidth = 0;
        this.gridColWidth = '';
        this.router.events.subscribe(function (val) {
            if (_this.flag) {
                _this.flag = false;
                _this.route.params.subscribe(function (params) {
                    var id = params['id'];
                    _this.parentMessage = id;
                    _this.getbookmark(id);
                });
            }
        });
    }
    ViewPublicComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manageUI();
        this.router.events.subscribe(function (val) {
            if (_this.flag) {
                _this.flag = false;
                _this.route.params.subscribe(function (params) {
                    var id = params['id'];
                    console.log('on');
                    _this.parentMessage = id;
                    // this.getbookmark(id);
                });
            }
        });
    };
    ViewPublicComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.parentMessage = id;
            _this.getbookmark(id);
            __WEBPACK_IMPORTED_MODULE_12_rxjs_Observable__["Observable"].interval(1000).subscribe(function (x) {
                _this.manageUI();
            });
        });
    };
    ViewPublicComponent.prototype.setHeight = function (type) {
        if (type = 'facebook') {
            return '400';
        }
        else if (type = 'youtube') {
            return '337';
        }
    };
    ViewPublicComponent.prototype.setWidth = function (type) {
        return this.curColWidth;
    };
    ViewPublicComponent.prototype.manageUI = function () {
        var cols = 4;
        if ($('body').width() > 1600) {
            cols = 4;
        }
        else if ($('body').width() > 1000) {
            cols = 3;
        }
        else if ($('body').width() > 600) {
            cols = 2;
        }
        else {
            cols = 1;
        }
        var theW = ($('body').width() - ($('body').width() / 50)) / cols;
        this.curColWidth = theW;
        $('iframe').css('width', theW);
        $('twitterwidget').css('width', theW);
        var th = theW + (theW / 50) - 9;
        this.gridColWidth = th + 'px';
        $('.grid-item').css('width', th);
        var msnry = new Masonry('#showcaseSocialBlock', {
            itemSelector: '.grid-item'
        });
        // $('.grid').masonry();
    };
    ViewPublicComponent.prototype.setStyles = function () {
        var styles = {
            'width': this.gridColWidth
        };
        return styles;
    };
    ViewPublicComponent.prototype.convertToGridItem = function (htmlInc) {
        var html = "<div class='grid-item'>";
        html += " " + htmlInc;
        html += "</div>";
        return html;
    };
    ViewPublicComponent.prototype.getbookmark = function (id) {
        var _this = this;
        this.bookmarkService.categoryBookmarksPublic(id).subscribe(function (data) {
            if (!data.error) {
                _this.bookmarks = data.message;
                if (_this.bookmarks.length > 0) {
                    for (var i = 0; i < _this.bookmarks.length; i++) {
                        // tslint:disable-next-line:max-line-length
                        document.getElementById('showcaseSocialBlock').innerHTML += _this.convertToGridItem(_this.bookmarks[i]['body']);
                    }
                    setTimeout(function () {
                        instgrm.Embeds.process();
                        twttr.widgets.load();
                    }, 3000);
                }
            }
        });
    };
    return ViewPublicComponent;
}());
ViewPublicComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-viewpublic',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/viewpublic.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _x || Object, typeof (_y = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _y || Object, typeof (_z = typeof __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */]) === "function" && _z || Object, typeof (_0 = typeof __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */]) === "function" && _0 || Object, typeof (_1 = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"]) === "function" && _1 || Object])
], ViewPublicComponent);

var ViewComponent = ViewComponent_1 = (function () {
    function ViewComponent(router, route, bookmarkService, categoryService, sanitizer) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.bookmarkService = bookmarkService;
        this.categoryService = categoryService;
        this.sanitizer = sanitizer;
        this.bookmarks = [];
        this.flag = true;
        this.curColWidth = 0;
        this.gridColWidth = '';
        ViewComponent_1.updateBookmarkStatus.subscribe(function (res) {
            _this.route.params.subscribe(function (params) {
                var id = params['id'];
                _this.parentMessage = id;
                _this.getbookmark(id);
            });
        });
        this.router.events.subscribe(function (val) {
            if (_this.flag) {
                _this.flag = false;
                _this.route.params.subscribe(function (params) {
                    var id = params['id'];
                    _this.parentMessage = id;
                    _this.getbookmark(id);
                });
            }
        });
    }
    ViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manageUI();
        this.router.events.subscribe(function (val) {
            if (_this.flag) {
                _this.flag = false;
                _this.route.params.subscribe(function (params) {
                    var id = params['id'];
                    console.log('on');
                    _this.parentMessage = id;
                    // this.getbookmark(id);
                });
            }
        });
    };
    ViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.parentMessage = id;
            _this.getbookmark(id);
            __WEBPACK_IMPORTED_MODULE_12_rxjs_Observable__["Observable"].interval(1000).subscribe(function (x) {
                _this.manageUI();
            });
        });
    };
    ViewComponent.prototype.setHeight = function (type) {
        if (type = 'facebook') {
            return '400';
        }
        else if (type = 'youtube') {
            return '337';
        }
    };
    ViewComponent.prototype.setWidth = function (type) {
        return this.curColWidth;
    };
    ViewComponent.prototype.manageUI = function () {
        var cols = 4;
        if ($('body').width() > 1600) {
            cols = 4;
        }
        else if ($('body').width() > 1000) {
            cols = 3;
        }
        else if ($('body').width() > 600) {
            cols = 2;
        }
        else {
            cols = 1;
        }
        var theW = ($('body').width() - ($('body').width() / 50)) / cols;
        this.curColWidth = theW;
        $('iframe').css('width', theW);
        $('twitterwidget').css('width', theW);
        var th = theW + (theW / 50) - 9;
        this.gridColWidth = th + 'px';
        $('.grid-item').css('width', th);
        var msnry = new Masonry('#showcaseSocialBlock', {
            itemSelector: '.grid-item'
        });
        // $('.grid').masonry();
    };
    ViewComponent.prototype.setStyles = function () {
        var styles = {
            'width': this.gridColWidth
        };
        return styles;
    };
    ViewComponent.prototype.convertToGridItem = function (htmlInc) {
        var html = "<div class='grid-item'>";
        html += " " + htmlInc;
        html += "</div>";
        return html;
    };
    ViewComponent.prototype.getbookmark = function (id) {
        var _this = this;
        this.bookmarkService.categoryBookmarks(id).subscribe(function (data) {
            if (!data.error) {
                _this.bookmarks = data.message;
                if (_this.bookmarks.length > 0) {
                    for (var i = 0; i < _this.bookmarks.length; i++) {
                        // tslint:disable-next-line:max-line-length
                        document.getElementById('showcaseSocialBlock').innerHTML += _this.convertToGridItem(_this.bookmarks[i]['body']);
                    }
                    setTimeout(function () {
                        instgrm.Embeds.process();
                        twttr.widgets.load();
                    }, 3000);
                }
            }
        });
    };
    return ViewComponent;
}());
ViewComponent.updateBookmarkStatus = new __WEBPACK_IMPORTED_MODULE_11_rxjs_Subject__["Subject"]();
ViewComponent = ViewComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view',
        template: __webpack_require__("../../../../../src/app/frontend/dashboard/view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/dashboard/frontenddashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_2 = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _2 || Object, typeof (_3 = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _3 || Object, typeof (_4 = typeof __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_bookmark_service__["a" /* BookmarkService */]) === "function" && _4 || Object, typeof (_5 = typeof __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_category_service__["a" /* CategoryService */]) === "function" && _5 || Object, typeof (_6 = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DomSanitizer"]) === "function" && _6 || Object])
], ViewComponent);

var ProfileHeaderComponent_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, ViewComponent_1, _2, _3, _4, _5, _6;
//# sourceMappingURL=frontenddashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/myprofile.component.html":
/***/ (function(module, exports) {

module.exports = "<app-profileheader></app-profileheader>\r\n<flash-messages></flash-messages>\r\n<div class=\"container-fluid pt-80\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-4 text-center pb-5\">\r\n            <img *ngIf=\"!croppedImage\" [src]=\"imageParse()\" class=\"mx-auto img-circle d-block rounded-circle\" alt=\"avatar\" width=\"150px\"\r\n                height=\"150px\">\r\n            <img *ngIf=\"croppedImage\" [src]=\"croppedImage\" class=\"mx-auto img-circle d-block rounded-circle\" alt=\"avatar\" width=\"150px\"\r\n                height=\"150px\">\r\n            <label class=\"custom-file\">\r\n                <input type=\"file\" class=\"custom-file-input\"  (change)=\"fileChangeEvent($event)\" />\r\n                <span class=\"custom-file-control\">Upload Image</span>\r\n            </label>\r\n    \r\n\r\n        </div>\r\n        <div class=\"col-lg-8 pb-5\">\r\n            <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link active\" id=\"edit-tab\" data-toggle=\"tab\" href=\"#edit\" role=\"tab\" aria-controls=\"edit\" aria-selected=\"true\">Edit Profile</a>\r\n                </li>\r\n                <li class=\"nav-item\" *ngIf=\"customer.provider == 'email'\">\r\n                    <a class=\"nav-link\" id=\"password-tab\" data-toggle=\"tab\" href=\"#password\" role=\"tab\" aria-controls=\"password\" aria-selected=\"false\">Change Password</a>\r\n                </li>\r\n            </ul>\r\n            <div class=\"tab-content pt-3\" id=\"myTabContent\">\r\n                <div class=\"tab-pane fade show active\" id=\"edit\" role=\"tabpanel\" aria-labelledby=\"edit-tab\">\r\n                    <form [formGroup]=\"customerProfileForm\" (ngSubmit)=\"profileUpdate()\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"exampleInputEmail1\">First Name</label>\r\n                            <input type=\"text\" formControlName=\"firstname\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\"\r\n                                placeholder=\"Enter First Name\">\r\n\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"exampleInputEmail1\">Last Name</label>\r\n                            <input type=\"text\" formControlName=\"lastname\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter Last Name\">\r\n\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"exampleInputEmail1\">Email address</label>\r\n                            <input type=\"email\" formControlName=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\r\n\r\n                        </div>\r\n                        <button type=\"submit\" class=\"btn btn-warning\">Update Profile</button>\r\n                    </form>\r\n                </div>\r\n                <div class=\"tab-pane fade\" id=\"password\" role=\"tabpanel\" aria-labelledby=\"password-tab\" *ngIf=\"customer.provider == 'email'\">\r\n                    <form [formGroup]=\"customerPasswordUpdateForm\" (ngSubmit)=\"passwordUpdate()\">\r\n                        <div class=\"form-group\" >\r\n                            <label for=\"exampleInputPassword1\">Old Password</label>\r\n                            <input type=\"password\" formControlName=\"oldpassword\" class=\"form-control\"  placeholder=\"Password\">\r\n                        </div>\r\n                        <div class=\"form-group\" >\r\n                            <label for=\"exampleInputPassword1\">New Password</label>\r\n                            <input type=\"password\" formControlName=\"newpassword\" class=\"form-control\"  placeholder=\"Password\">\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"exampleInputPassword1\">Confirm Password</label>\r\n                            <input type=\"password\" formControlName=\"confirmpassword\" class=\"form-control\"  placeholder=\"Password\">\r\n                        </div>\r\n                        <button type=\"submit\" class=\"btn btn-warning\" [disabled]=\"!customerPasswordUpdateForm.valid\">Update Password</button>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- The imageuploadModal Modal -->\r\n<div id=\"imageuploadModal\" class=\"modal\">\r\n    <span class=\"close\" (click)=\"modelClose()\">&times;</span>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n        <div class=\"col-lg-10 col-xs-12\">\r\n            <div class=\"card rounded-1\">\r\n                <span class=\"close signupclose\" (click)=\"modelClose()\">&times;</span>\r\n                <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                  Image Crop and Upload\r\n                </div>\r\n                <div class=\"card-body\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-3 \">\r\n                            <img *ngIf=\"croppedImage\" [src]=\"croppedImage\" class=\"mx-auto img-circle d-block rounded-circle\" alt=\"avatar\" width=\"150px\"\r\n                                height=\"150px\">\r\n                        </div>\r\n                        <div class=\"col-lg-7 \">\r\n                        <image-cropper [imageChangedEvent]=\"imageChangedEvent\" [maintainAspectRatio]=\"true\" [aspectRatio]=\"4 / 3\" [resizeToWidth]=\"128\"\r\n                            format=\"png\" (imageCropped)=\"imageCropped($event)\"></image-cropper>\r\n                        </div>\r\n                        <div class=\"col-lg-2 text-center\">\r\n                            <button type=\"button\" class=\"btn btn-warning\"  (click)=\"upload()\">Upload Image</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/profileheader.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-navyblue\">\r\n    <div class=\"container-fluid\">\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" [routerLink]=\"['/dashboard']\">Showcase.Social</a>\r\n        <a *ngIf=\"currentCustomer != undefined\" class=\"navbar-brand p-0\" href=\"javascript:void(0)\">\r\n            <img [src]=\"currentCustomer && currentCustomer.image\" class=\"rounded-circle d-none d-sm-block d-md-none d-block d-sm-none\"\r\n                width=\"30\" height=\"30\">\r\n        </a>\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\r\n            <ul class=\"navbar-nav mr-auto category-navbar \" id=\"category-navbar\">\r\n                <span *ngFor=\"let category of categories let i = index\">\r\n\r\n                    <li class=\"nav-item dropdown px-3 \" [ngClass]=\"slugify(category.name)\" style=\"display: -webkit-box;\" *ngIf=\"i < 3\">\r\n                        <a class=\"nav-link text-cap\" [id]=\"category._id\" [routerLink]=\"['/view/',category._id]\"> {{ (category.name.length >= 20) ? (category.name | slice:0:20)+'..':(category.name) }}</a>\r\n                        <a class=\"nav-link dropdown-toggle\" [id]=\"category._id\" id=\"dropdown01\" href=\"\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                            aria-expanded=\"false\"></a>\r\n                        <div class=\"dropdown-menu\" aria-labelledby=\"dropdown01\">\r\n                            <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"doShare(category)\">\r\n                                <i class=\"fa fa-share\"></i> Share</a>\r\n                            <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"doEmbed(category)\">\r\n                                <i class=\"fa fa-code\"></i> Embeded</a>\r\n                            <a class=\"dropdown-item\" [routerLink]=\"['/setting/',category._id]\">\r\n                                <i class=\"fa fa-cog\"></i> Manage</a>\r\n                        </div>\r\n                    </li>\r\n                </span>\r\n                <li class=\"nav-item dropdown px-3\" *ngIf=\"categories?.length > 3\">\r\n                    <a class=\"nav-link dropdown-toggle\" href=\"\" id=\"navbarDropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        More...\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdownMenuLink\">\r\n                        <span *ngFor=\"let category of categories; let i = index\">\r\n                            <li class=\"dropdown-submenu\" *ngIf=\" i >= 3 \">\r\n                                <a class=\"dropdown-item dropdown-toggle text-cap\" href=\"javascript:void(0)\"> {{ (category.name.length >= 20) ? (category.name | slice:0:20)+'..':(category.name) }}</a>\r\n                                <ul class=\"dropdown-menu option-menu\">\r\n                                    <li>\r\n                                        <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"doShare(category)\">\r\n                                            <i class=\"fa fa-share\"></i> Share </a>\r\n                                    </li>\r\n                                    <li>\r\n                                        <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"doEmbed(category)\">\r\n                                            <i class=\"fa fa-code\"></i> Embeded</a>\r\n                                    </li>\r\n                                    <li>\r\n                                        <a class=\"dropdown-item\" [routerLink]=\"['/setting/',category._id]\">\r\n                                            <i class=\"fa fa-cog\"></i> Manage</a>\r\n                                    </li>\r\n                                </ul>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n                </li>\r\n                <li class=\"nav-item pl-3\"  *ngIf=\"categories\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0)\" (click)=\"addCategory()\" > Add new\r\n                        <i class=\"fa fa-plus-circle\"></i>\r\n                    </a>\r\n                </li>\r\n\r\n            </ul>\r\n            <form class=\"form-inline mt-2 mt-md-0\" [formGroup]=\"addLinkForm\" (ngSubmit)=\"addLink()\">\r\n                <input class=\"form-control addlinkfield\" style=\"width:auto\" type=\"text\" formControlName=\"title\" placeholder=\"Paste link here...\"\r\n                    aria-label=\"Search\">\r\n                <button class=\"btn btn-outline-light my-2 my-sm-0 addlinkfieldbtn\" type=\"submit\" [disabled]=\"!addLinkForm.valid\">\r\n                    <i class=\"fa fa-plus\"></i>\r\n                </button>\r\n            </form>\r\n            <ul class=\"navbar-nav d-none d-sm-block \">\r\n                <li class=\"nav-item dropdown pl-2\">\r\n                    <a *ngIf=\"currentCustomer != undefined\" class=\"nav-link dropdown-toggle p-0\" id=\"dropdown01\" href=\"\" data-toggle=\"dropdown\"\r\n                        aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        <img *ngIf=\"currentCustomer.image\" [src]=\"currentCustomer.image\" class=\"rounded-circle\" width=\"30\" height=\"30\">\r\n                        <img *ngIf=\"!currentCustomer.image\" src=\"https://www.w3schools.com/howto/img_avatar.png\" class=\"rounded-circle\" width=\"30\"\r\n                            height=\"30\">\r\n                    </a>\r\n                    <div class=\"dropdown-menu custom-dropdown-menu\" aria-labelledby=\"dropdown01\">\r\n                        <a class=\"dropdown-item\" [routerLink]=\"['/profile']\">Profile</a>\r\n                        <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"logout()\">Logout</a>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n<!-- The category Modal  -->\r\n<div id=\"categoryModal\" class=\"modal dark-bg\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close signupclose\" (click)=\"modelClose()\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                        <i class=\"fa fa-cogs text-warning\"></i> Add Category\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col mb-2\">\r\n                                <form [formGroup]=\"addCategoryForm\" (ngSubmit)=\"addCategoryData('')\">\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"\">Showcase name</label>\r\n                                        <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"type here...\">\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleFormControlSelect1\">Position in menu</label>\r\n                                        <select class=\"form-control\" formControlName=\"position\">\r\n                                            <option [ngValue]=\"1\" selected>Top</option>\r\n                                            <option *ngFor=\"let category of categories; let i = index\" [ngValue]=\"category.position+1\">After {{category.name}}</option>\r\n                                        </select>\r\n                                    </div>\r\n                                    <button type=\"button\" class=\"btn btn-danger float-left px-5 rounded-1\" (click)=\"modelClose()\">Cancel</button>\r\n                                    <button type=\"submit\" class=\"btn btn-warning float-right px-5 rounded-1\" [disabled]=\"!addCategoryForm.valid\">Save</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- The bookmark Modal  -->\r\n<div id=\"bookmarkModal\" class=\"modal dark-bg\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close signupclose\" (click)=\"modelBookmarkCloseEmptyForm()\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                        <i class=\"fa fa-plus text-warning\"></i> Add Bookmark\r\n                    </div>\r\n                    <div class=\"card-body preview-bookmark\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"loading-view text-center\" id=\"loader\">\r\n                                    <img src=\"./assets/loader.svg\">\r\n                                    <br>\r\n                                    <h2>Loading...</h2>\r\n                                </div>\r\n                                <p class=\"text-center\">Preview your link before adding</p>\r\n                                <p class=\"text-center text-danger\">Display not quite right ?</p>\r\n                                <div id=\"bookMark\" class=\"mx-5 text-center\"></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-footer\">\r\n                        <button type=\"button\" class=\"btn btn-danger float-left px-5 rounded-1\" (click)=\"modelBookmarkCloseEmptyForm()\">Cancel</button>\r\n                        <button type=\"button\" class=\"btn btn-warning float-right px-5 rounded-1\" (click)=\"openCopyToModel()\" [disabled]=\"invalidUrl\">Add</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- The copt to showcase Modal  -->\r\n<div id=\"copytokModal\" class=\"modal dark-bg\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <form [formGroup]=\"addCategoryForm\" (ngSubmit)=\"addCategoryData('close')\">\r\n                    <div class=\"card rounded-1\">\r\n                        <span class=\"close signupclose\" (click)=\"modelCopyToClose()\">&times;</span>\r\n                        <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                            <i class=\"fa fa-files-o text-warning\"></i> Copy to showcase\r\n                        </div>\r\n                        <div class=\"card-body preview-bookmark\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-12\">\r\n                                    <div class=\"form-group\">\r\n                                        <select multiple class=\"form-control\" id=\"exampleFormControlSelect2\">\r\n                                            <option *ngFor=\"let category of categories; let i = index\" (click)=\"categorySelected(category._id)\">{{category.name}}</option>\r\n                                            <option (click)=\"openNewShowcase()\">Create new showcase</option>\r\n                                        </select>\r\n                                    </div>\r\n                                    <div class=\"form-group\" *ngIf=\"showcaseField\">\r\n                                        <label for=\"\">Showcase name</label>\r\n                                        <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"type here...\">\r\n                                    </div>\r\n                                    <div class=\"form-group\" *ngIf=\"showcaseField\">\r\n                                        <label for=\"exampleFormControlSelect1\">Position in menu</label>\r\n                                        <select class=\"form-control\" formControlName=\"position\">\r\n                                            <option [ngValue]=\"1\" selected>Top</option>\r\n                                            <option *ngFor=\"let category of categories; let i = index\" [ngValue]=\"category.position+1\">After {{category.name}}</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-footer\">\r\n                            <button type=\"button\" class=\"btn btn-danger float-left px-5 rounded-1\" (click)=\"modelCopyToClose()\">Cancel</button>\r\n                            <button type=\"submit\" class=\"btn btn-warning float-right px-5 rounded-1 addcat\" [disabled]=\"!addCategoryForm.valid\" *ngIf=\"showcaseField\">Add</button>\r\n                            <button type=\"button\" class=\"btn btn-warning float-right px-5 rounded-1\" (click)=\"addBoodmark()\" [disabled]=\"!categorySelectedId\"\r\n                                *ngIf=\"!showcaseField\">Add</button>\r\n                        </div>\r\n\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- The share Modal  -->\r\n<div id=\"shareModal\" class=\"modal dark-bg\">\r\n    <div class=\"container\" *ngIf=\"category\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close signupclose\" (click)=\"modelShareClose()\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1 text-cap\">\r\n                        <i class=\"fa fa-share text-warning\"></i> Share {{category.name}}\r\n                    </div>\r\n                    <div class=\"card-body preview-bookmark\">\r\n                        <p>Share your showcase “{{category.name}}” directly to social</p>\r\n                        <!--  <div class=\"row text-center mb-5\">\r\n                            <div class=\"col-12\">\r\n                                <share-button theme=\"material-dark\" class=\"px-1\" button=\"facebook\" [url]=\"socialShareUrl\" text=\"Facebook\" showText=\"true\"></share-button>\r\n                                <share-button theme=\"material-dark\" button=\"twitter\" text=\"Twitter\"  [url]=\"socialShareUrl\" showText=\"true\"></share-button>\r\n                                <share-button theme=\"material-dark\" button=\"google\" text=\"Google\" [url]=\"socialShareUrl\" showText=\"true\"></share-button>\r\n                            </div>\r\n                            <div class=\"col-12\">\r\n                                <share-button theme=\"material-dark\"  button=\"pinterest\" [url]=\"socialShareUrl\" text=\"Pinterest\" showText=\"true\"></share-button>\r\n                                <share-button theme=\"material-dark\" button=\"linkedin\" [url]=\"socialShareUrl\" text=\"Linkedin\" showText=\"true\"></share-button>\r\n                                <share-button theme=\"material-dark\" button=\"stumble\" [url]=\"socialShareUrl\"  text=\"Stumble\" showText=\"true\"></share-button>\r\n                            </div>\r\n                        </div> -->\r\n                        <share-buttons [url]=\"socialShareUrl\"></share-buttons>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"exampleInputEmail1\">Or copy and paste the following on your favourite social channel:</label>\r\n                            <input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" value=\"{{socialShareUrl}}\" placeholder=\"\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"card-footer text-center\">\r\n                        <button type=\"button\" class=\"btn btn-danger px-5 rounded-1 mb-2\" (click)=\"modelShareClose()\">Close</button>\r\n                        <p class=\"p-0\">Want to embed this showcase on your blog or website?\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- The embed Modal  -->\r\n<div id=\"embedModal\" class=\"modal dark-bg\" >\r\n    <div class=\"container\" *ngIf=\"category\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close signupclose\" (click)=\"modelEmbedClose()\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1 text-cap\">\r\n                        <i class=\"fa fa-code text-warning\"></i> Embed {{category.name}}\r\n                    </div>\r\n                    <div class=\"card-body preview-bookmark\">\r\n                        <form>\r\n                            <div class=\"form-group\">\r\n                                <label for=\"exampleFormControlTextarea1\" class=\"pb-2\">You can embed this showcase on your blog by copying and pasting the following:</label>\r\n                                <p class=\"box\">&lt;div id=&quot;showcaseSocialBlock&quot; data-showcaseID='{{category._id}}'&gt;&lt;/div&gt;&lt;script\r\n                                    src=&quot;https://measuremight.com:3002/embed.min.js&quot;&gt;&lt;/script&gt;\r\n                                </p>\r\n                                <button type=\"button\" class=\"btn btn-primary px-5 rounded-1 float-right\"  ngxClipboard [cbContent]=\"textToCopy\" (click)=\"copyToClipboard()\">Copy to clipboard</button>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"card-footer text-center\">\r\n                        <button type=\"button\" class=\"btn btn-danger px-5 rounded-1\" (click)=\"modelEmbedClose()\">Close</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/setting.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/setting.component.html":
/***/ (function(module, exports) {

module.exports = "<app-profileheader [childMessage]=\"parentMessage\"></app-profileheader>\r\n<div class=\"container-fluid\" *ngIf=\"category\" style=\"padding-top: 75px;\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-7 col-md-6 col-sm-6 mb-5 \">\r\n            <div class=\"row mb-3\" *ngIf=\" bookmarks?.length > 0\">\r\n                <ng-container *ngIf=\"!bookmarks_ids?.length > 0\">\r\n                    <div class=\"col text-center \">\r\n                        <i class=\"fa fa-trash icon-circle\"></i> Deleted selected</div>\r\n                    <div class=\"col text-center \">\r\n                        <i class=\"fa fa-copy icon-circle\"></i> Copy selected to showcase</div>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"bookmarks_ids?.length > 0\">\r\n                    <div class=\"col text-center pointer\" (click)=\"doDelete()\">\r\n                        <i class=\"fa fa-trash icon-circle\"></i> Deleted selected</div>\r\n                    <div class=\"col text-center pointer\" (click)=\"doSelectedCopy()\">\r\n                        <i class=\"fa fa-copy icon-circle\"></i> Copy selected to showcase</div>\r\n                </ng-container>\r\n            </div>\r\n            <h3 *ngIf=\"! bookmarks?.length > 0\" class=\"text-muted text-center pt-5\">No bookmarks available.</h3>\r\n            <ul class=\"list-group\">\r\n                <li class=\"list-group-item custom-list-group-item\" *ngFor=\"let bookmark of bookmarks; let i = index; let last = last;\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-xl-2 col-lg-6 col-md-6 col-sm-6 col-6 text-center\">\r\n                            <div class=\"count-circle\">{{i+1}}</div>\r\n                            <br>\r\n                            <div class=\"form-check text-center\">\r\n                                <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\" (click)=\"doSelect(bookmark)\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-xl-5 col-lg-6 col-md-6 col-sm-6 pl-0  col-6 \">\r\n                            <div *ngIf=\"bookmark.type == 'instagram' || bookmark.type == 'twitter'\" [innerHtml]=\"bookmark.body\"></div>\r\n                            <iframe *ngIf=\"bookmark.type != 'instagram' && bookmark.type != 'twitter'\" [src]=\"videoUrl(bookmark.title)\" width=\"100%\"></iframe>\r\n                        </div>\r\n                        <div class=\"col-xl-3 col-lg-7 col-md-7 col-sm-7 col-8 mt-4 \">\r\n                            <ul>\r\n                                <li class=\"pb-2\">\r\n                                    <a (click)=\"doDeleteBookmark(bookmark._id)\" class=\"pointer\">\r\n                                        <i class=\"fa fa-trash icon-circle icon-opt\"></i>\r\n                                        <span class=\"fs-13\">Delete</span>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a (click)=\"doCopy(bookmark)\" class=\"pointer\">\r\n                                        <i class=\"fa fa-copy icon-circle icon-opt\"></i>\r\n                                        <span class=\"fs-13\">Copy</span>\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n\r\n                        </div>\r\n                        <div class=\"col-xl-2 col-lg-5 col-md-5 col-sm-5 col-4 px-0 mt-4\">\r\n                            <ul>\r\n                                <li class=\"pb-2 float-right\" *ngIf=\"i!=0\">\r\n                                    <a (click)=\"changePosition('up',bookmark._id, bookmark.position)\" class=\"pointer\">\r\n                                        <span class=\"fs-13\">Move up</span>\r\n                                        <i class=\"fa fa-caret-up icon-opt icon-circle\"></i>\r\n                                    </a>\r\n                                </li>\r\n                                <li class=\"pb-2 float-right\" *ngIf=\"bookmarks?.length > 1 && !last\" class=\"pointer\">\r\n                                    <a (click)=\"changePosition('down',bookmark._id, bookmark.position)\">\r\n                                        <span class=\"fs-13\">Move down</span>\r\n                                        <i class=\"fa fa-caret-down icon-opt icon-circle\"></i>\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"col-lg-5 col-md-6 col-sm-6 mb-5 work-box\">\r\n            <h4 class=\"text-center\">\r\n                <i class=\"fa fa-cogs text-warning\"></i> Manage {{category[0].name}}</h4>\r\n            <hr>\r\n            <form [formGroup]=\"updateCategoryForm\" (ngSubmit)=\"updateCategoryData()\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"\">Showcase name</label>\r\n                    <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"tyoe here...\">\r\n\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">Position in menu</label>\r\n                    <select class=\"form-control\" formControlName=\"position\">\r\n                        <option [ngValue]=\"1\">Top</option>\r\n                        <ng-container *ngFor=\"let category of categories; let i = index\">\r\n                            <option [ngValue]=\"category.position+1\" *ngIf=\"parentMessage != category._id\">After {{category.name}}</option>\r\n                        </ng-container>\r\n                    </select>\r\n                </div>\r\n                <a class=\"btn btn-danger float-left px-5 rounded-1 \" href=\"javascript:void(0)\" (click)=\"doDeleteBoard(parentMessage)\">Delete</a>\r\n                <button type=\"submit\" class=\"btn btn-warning float-right px-5 rounded-1\" [disabled]=\"!updateCategoryForm.valid\">Save</button>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- The copy2 to showcase Modal  -->\r\n<div id=\"copy2Modal\" class=\"modal dark-bg\">\r\n    <span class=\"close\" (click)=\"modelCopy2Close()\">&times;</span>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-7 col-xs-12\">\r\n                <form [formGroup]=\"addCategoryForm\" (ngSubmit)=\"addCategoryData()\">\r\n                    <div class=\"card rounded-1\">\r\n                        <span class=\"close signupclose\" (click)=\"modelCopy2Close()\">&times;</span>\r\n                        <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                            <i class=\"fa fa-files-o text-warning\"></i> Copy to showcase\r\n                        </div>\r\n                        <div class=\"card-body preview-bookmark\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-12\">\r\n                                    <div class=\"form-group\">\r\n                                        <select multiple class=\"form-control\" id=\"exampleFormControlSelect2\">\r\n                                            <ng-container *ngFor=\"let category of categories; let i = index\">\r\n                                                <option (click)=\"categorySelected(copyShowcaseBookmark, category._id, copyShowcaseBookmarks)\" *ngIf=\"parentMessage != category._id\">{{category.name}}</option>\r\n                                            </ng-container>\r\n                                            <option (click)=\"openNewShowcase(copyShowcaseBookmark, copyShowcaseBookmarks)\">Create new showcase</option>\r\n                                        </select>\r\n                                    </div>\r\n                                    <div class=\"form-group\" *ngIf=\"showcaseField\">\r\n                                        <label for=\"\">Showcase name</label>\r\n                                        <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"type here...\">\r\n                                    </div>\r\n                                    <div class=\"form-group\" *ngIf=\"showcaseField\">\r\n                                        <label for=\"exampleFormControlSelect1\">Position in menu</label>\r\n                                        <select class=\"form-control\" formControlName=\"position\">\r\n                                            <option [ngValue]=\"1\" selected>Top</option>\r\n                                            <option *ngFor=\"let category of categories; let i = index\" [ngValue]=\"category.position+1\">After {{category.name}}</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-footer\">\r\n                            <button type=\"button\" class=\"btn btn-danger float-left px-5 rounded-1\" (click)=\"modelCopy2Close()\">Cancel</button>\r\n                            <button type=\"submit\" class=\"btn btn-warning float-right px-5 rounded-1 addcat\" [disabled]=\"!addCategoryForm.valid\" *ngIf=\"showcaseField\">Add</button>\r\n                            <button type=\"button\" class=\"btn btn-warning float-right px-5 rounded-1\" (click)=\"addBoodmark()\" [disabled]=\"!categorySelectedId\"\r\n                                *ngIf=\"!showcaseField\">Add</button>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/view.component.html":
/***/ (function(module, exports) {

module.exports = "<app-profileheader [childMessage]=\"parentMessage\"></app-profileheader>\r\n\r\n<div style=\"padding-top: 65px;\">\r\n\t<h1 *ngIf=\"!bookmarks.length > 0\" class=\"text-center text-muted pt-5\">No bookmarks available.</h1>\r\n\t<div id=\"showcaseSocialBlock\" class=\"grid\"></div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/dashboard/viewpublic.component.html":
/***/ (function(module, exports) {

module.exports = "<app-frontendheader></app-frontendheader>\r\n\r\n<div style=\"padding-top: 65px;\">\r\n    <h1 *ngIf=\"!bookmarks.length > 0\" class=\"text-center text-muted pt-5\">No bookmarks available.</h1>\r\n    <div id=\"showcaseSocialBlock\" class=\"grid\"></div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/frontend.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login-page .card-login,\r\n.lock-page .card-profile {\r\n    transition: all 300ms linear;\r\n}\r\n\r\n\r\n.login-page>.content,\r\n.lock-page>.content {\r\n    padding-top: 18vh;\r\n}\r\n\r\n.login-page .card-login {\r\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);\r\n    border-radius: 6px;\r\n    padding-bottom: 20px;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.login-page .card-login.card-hidden {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -60px, 0);\r\n    transform: translate3d(0, -60px, 0);\r\n}\r\n\r\n.login-page .card-login .btn-wd {\r\n    min-width: 180px;\r\n}\r\n\r\n.login-page .card-login .card-header {\r\n    margin-top: -40px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.login-page .card-login .card-header .title {\r\n    margin-top: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/frontend/frontend.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/frontend/frontend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrontendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FrontendComponent = (function () {
    function FrontendComponent(userService) {
        this.userService = userService;
    }
    FrontendComponent.prototype.ngOnInit = function () { };
    return FrontendComponent;
}());
FrontendComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-frontend',
        template: __webpack_require__("../../../../../src/app/frontend/frontend.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/frontend.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object])
], FrontendComponent);

var _a;
//# sourceMappingURL=frontend.component.js.map

/***/ }),

/***/ "../../../../../src/app/frontend/header/frontendheader.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dropdown-menu {\r\n    left: unset;\r\n    right: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/frontend/header/frontendheader.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-navyblue\">\r\n    <div class=\"container\">\r\n        <a class=\"navbar-brand\" [routerLink]=\"['/']\">Showcase.Social</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\r\n            <ul class=\"navbar-nav ml-auto\">\r\n                <li class=\"nav-item px-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\">Home\r\n                        <span class=\"sr-only\">current</span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"nav-item px-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\">Video production work\r\n                        <span class=\"sr-only\">(current</span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"nav-item px-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\">Demonetisation\r\n                        <span class=\"sr-only\">(current)</span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"nav-item px-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\"> Blog </a>\r\n                </li>\r\n                <li class=\"nav-item px-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\">About</a>\r\n                </li>\r\n                <li class=\"nav-item pl-3\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/']\">Contact</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n"

/***/ }),

/***/ "../../../../../src/app/frontend/header/frontendheader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrontendHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FrontendHeaderComponent = (function () {
    function FrontendHeaderComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.isHere = false;
    }
    FrontendHeaderComponent.prototype.ngOnInit = function () {
        this.customer = JSON.parse(localStorage.getItem('customer'));
    };
    return FrontendHeaderComponent;
}());
FrontendHeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-frontendheader',
        template: __webpack_require__("../../../../../src/app/frontend/header/frontendheader.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/header/frontendheader.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], FrontendHeaderComponent);

var _a, _b;
//# sourceMappingURL=frontendheader.component.js.map

/***/ }),

/***/ "../../../../../src/app/frontend/home/account-active.component.html":
/***/ (function(module, exports) {

module.exports = "<app-frontendheader></app-frontendheader>\r\n<flash-messages></flash-messages>\r\n<h3 id=\"login\"><button class=\"btn bg-navyblue btn-wd btn-lg\" (click)=\"goToLogin()\">Login</button></h3>\r\n\r\n<form id=\"resendLink\" [formGroup]=\"emailForm\" (ngSubmit)=\"resendActivationLink()\">\r\n\tEmail : <input type=\"email\" formControlName=\"email\" placeholder=\"Enter Email ID\"><br>\r\n\r\n\t<button class=\"btn btn-success btn-wd btn-lg\" [disabled]=\"!emailForm.valid\">Resend Activation Link</button>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/frontend/home/frontendhome.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#login , #resendLink{\r\n\tdisplay: none;\r\n    text-align: center;\r\n    margin: 15% 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/frontend/home/frontendhome.component.html":
/***/ (function(module, exports) {

module.exports = "<app-frontendheader></app-frontendheader>\r\n<flash-messages></flash-messages>\r\n\r\n<div class=\"main-content bgimage\">\r\n    <h1 class=\"font-weight-bold \">\r\n        <i class=\"fa fa-firefox text-warning\"></i> Showcase.Social\r\n    </h1>\r\n    <p>You make suff</p>\r\n    <p>You put your suff on social media</p>\r\n    <p>And all your<b>stuff is all over the shop.</b></p>\r\n    <div class=\"container mycontainer\">\r\n        <div class=\"row py-3\">\r\n            <div class=\"col\">\r\n                <div class=\"circle text-uppercase\">\r\n                    <i class=\"fa fa-user circle-icon\"></i>\r\n                    <br> Register\r\n                </div>\r\n            </div>\r\n            <div class=\"col\">\r\n                <div class=\"circle text-uppercase\">\r\n                    <i class=\"fa fa-cogs circle-icon\"></i>\r\n                    <br> Setup\r\n                </div>\r\n            </div>\r\n            <div class=\"col\">\r\n                <div class=\"circle text-uppercase\">\r\n                    <i class=\"fa fa-share-alt circle-icon\"></i>\r\n                    <br> share\r\n                </div>\r\n            </div>\r\n            <div class=\"col\">\r\n                <div class=\"circle text-uppercase\">\r\n                    <i class=\"fa fa-code circle-icon\"></i>\r\n                    <br> embed\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-3 col-6 mb-2\">\r\n                <a class=\"mb-3\">For new users</a><br>\r\n                <button type=\"button\" class=\"btn btn-warning btn-lg rounded-1\" id=\"mysignupBtn\" (click)=\"modelOpen('signup')\">GET STARTED</button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-6 mb-2\">\r\n                <a class=\"pb-2\">For existing users</a><br>\r\n                <button type=\"button\" class=\"btn btn-navy btn-lg px-5 rounded-1\" id=\"myloginBtn\" (click)=\"modelOpen('login')\">LOGIN</button>\r\n            </div>\r\n        </div>\r\n        <div class=\"row justify-content-md-center mt-3\">\r\n            <div class=\"col-lg-12 col-xs-12\">\r\n                Organise your social posts in once place Embed your showcase on your own website Share a direct link to your own Showcase.Social\r\n                page\r\n            </div>\r\n        </div>\r\n        <div class=\"row justify-content-md-center mb-3\">\r\n            <div class=\"col-lg-8 col-xs-12\">\r\n                <p class=\"mb-0 mt-3\">Not sure ?</p>\r\n                <p class=\"m-0\">See showcase.social/regularsteven for a real life example.\r\n                </p>\r\n                <p class=\"m-0\">Or see the website embed to see how it fits in anywhere on the web.\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- The login Modal -->\r\n<div id=\"loginModal\" class=\"modal\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-8 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close\" (click)=\"modelClose('login')\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                        Fast login with social or enter email\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-6  col-md-6  col-xs-12 text-center \">\r\n                                <div class=\"btn-vertical \" role=\"group\" aria-label=\"Basic example\">\r\n                                    <button type=\"button\" (click)=\"signIn('facebook')\" class=\"btn rounded-1  btn-fb px-3\">                                    \r\n                                        <i class=\"fa fa-facebook\"></i> Login with Facebook\r\n                                    </button>\r\n                                    <button (click)=\"onLoginWithTwitter()\" type=\"button\" class=\"btn rounded-1  btn-twitter px-4\">\r\n                                        <i class=\"fa fa-twitter\"></i> Login with Twitter\r\n                                    </button>\r\n                                    <button type=\"button\" (click)=\"signIn('google')\" class=\"btn rounded-1  btn-google px-4\">\r\n                                        <i class=\"fa fa-google\"></i> Login with Google\r\n                                    </button>\r\n                                    <button (click)=\"onLoginWithInstagram()\" type=\"button\" class=\"btn rounded-1  btn-insta px-3\">\r\n                                        <i class=\"fa fa-instagram\"></i> Login with Instagram\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <p class=\"ortext d-none d-sm-block d-md-none d-block d-sm-none mt-3\">\r\n                                <span>OR</span>\r\n                            </p>\r\n                            <div class=\"col-lg-6 col-md-6 col-xs-12  \">\r\n                                <form  [formGroup]=\"customerLoginForm\" (ngSubmit)=\"login()\"> \r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleInputEmail1\">Email address</label>\r\n                                        <input type=\"email\"   formControlName=\"email\"  class=\"form-control\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleInputPassword1\">Password</label>\r\n                                        <input type=\"password\"  formControlName=\"password\"  class=\"form-control\" placeholder=\"Password\">\r\n                                    </div>\r\n                                    <a  (click)=\"modelOpen('forget')\" class=\"btn btn-link float-left\">Forgot your password ?</a>\r\n                                    <button type=\"submit\" class=\"btn btn-warning rounded-1 float-right\" [disabled]=\"!customerLoginForm.valid\">Submit</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- The signup Modal -->\r\n<div id=\"signupModal\" class=\"modal\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-8 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close signupclose\" (click)=\"modelClose('signup')\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                        Fast register with social or enter email\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-6  col-md-6  col-xs-12 text-center \">\r\n                                <div class=\"btn-vertical \" role=\"group\" aria-label=\"Basic example\">\r\n                                    <button type=\"button\" (click)=\"signIn('facebook')\" class=\"btn rounded-1  btn-fb px-3\">\r\n                                        <i class=\"fa fa-facebook\"></i> Register with Facebook</button>\r\n                                    <button (click)=\"onLoginWithTwitter()\" type=\"button\" class=\"btn rounded-1  btn-twitter px-4\">\r\n                                        <i class=\"fa fa-twitter\"></i> Register with Twitter</button>\r\n                                    <button type=\"button\" (click)=\"signIn('google')\" class=\"btn rounded-1  btn-google px-4\">\r\n                                        <i class=\"fa fa-google\"></i> Register with Google</button>\r\n                                    <button (click)=\"onLoginWithInstagram()\" type=\"button\" class=\"btn rounded-1  btn-insta px-3\">\r\n                                        <i class=\"fa fa-instagram\"></i> Register with Instagram</button>\r\n                                </div>\r\n                            </div>\r\n                            <p class=\"ortext d-none d-sm-block d-md-none d-block d-sm-none mt-3\">\r\n                                <span>OR</span>\r\n                            </p>\r\n                            <div class=\"col-lg-6 col-md-6 col-xs-12  \">\r\n                                <form  [formGroup]=\"customerSignupForm\" (ngSubmit)=\"signup()\">\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleInputEmail1\">Email address</label>\r\n                                        <input type=\"email\" formControlName=\"email\" class=\"form-control\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleInputPassword1\">Password</label>\r\n                                        <input type=\"password\"  formControlName=\"password\" class=\"form-control\" placeholder=\"Password\">\r\n                                    </div>\r\n                                    <button type=\"submit\" class=\"btn btn-warning rounded-1 float-right\" [disabled]=\"!customerSignupForm.valid\">Submit</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- The Forget Modal -->\r\n<div id=\"forgetPassModal\" class=\"modal\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-lg-8 col-xs-12\">\r\n                <div class=\"card rounded-1\">\r\n                    <span class=\"close\" (click)=\"modelClose('forget')\">&times;</span>\r\n                    <div class=\"card-header text-center bg-white h4 rounded-1 rounded-rl-1\">\r\n                        Fast Recover your password\r\n                    </div>\r\n                    <div class=\"card-body\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-6  col-md-6  col-xs-12 text-center \">\r\n                                <div class=\"btn-vertical \" role=\"group\" aria-label=\"Basic example\">\r\n                                    <button type=\"button\" (click)=\"signIn('facebook')\" class=\"btn rounded-1  btn-fb px-3\">                                    \r\n                                        <i class=\"fa fa-facebook\"></i> Login with Facebook\r\n                                    </button>\r\n                                    <button (click)=\"onLoginWithTwitter()\" type=\"button\" class=\"btn rounded-1  btn-twitter px-4\">\r\n                                        <i class=\"fa fa-twitter\"></i> Login with Twitter\r\n                                    </button>\r\n                                    <button type=\"button\" (click)=\"signIn('google')\" class=\"btn rounded-1  btn-google px-4\">\r\n                                        <i class=\"fa fa-google\"></i> Login with Google\r\n                                    </button>\r\n                                    <button (click)=\"onLoginWithInstagram()\" type=\"button\" class=\"btn rounded-1  btn-insta px-3\">\r\n                                        <i class=\"fa fa-instagram\"></i> Login with Instagram\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <p class=\"ortext d-none d-sm-block d-md-none d-block d-sm-none mt-3\">\r\n                                <span>OR</span>\r\n                            </p>\r\n                            <div class=\"col-lg-6 col-md-6 col-xs-12  \">\r\n                                <form [formGroup]=\"customerForgetForm\" (ngSubmit)=\"forgetPass()\">\r\n                                    <div class=\"form-group\">\r\n                                        <label for=\"exampleInputEmail1\">Email address</label>\r\n                                        <input type=\"email\" class=\"form-control\" aria-describedby=\"emailHelp\" formControlName=\"email\" placeholder=\"Enter email\">\r\n                                    </div>\r\n                                    <a  (click)=\"modelOpen('login')\" class=\"btn btn-link float-left\">Login</a>\r\n                                    <button type=\"submit\" class=\"btn btn-warning rounded-1 float-right\" [disabled]=\"!customerForgetForm.valid\">Submit</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/frontend/home/frontendhome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FrontendHomeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ResetComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountActiveComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__("../../../../angular2-flash-messages/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_social_login__ = __webpack_require__("../../../../angular2-social-login/dist/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FrontendHomeComponent = (function () {
    function FrontendHomeComponent(_auth, router, lf, userService, route, _flashMessagesService) {
        this._auth = _auth;
        this.router = router;
        this.lf = lf;
        this.userService = userService;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        // tslint:disable-next-line:max-line-length
        this.emailp = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.formErrors = {
            'email': '',
            'password': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Email is required.',
                'pattern': 'Email not in well format.'
            },
            'password': {
                'required': 'Phone Number is required.',
            }
        };
    }
    FrontendHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.route.queryParams.subscribe(function (params) {
            _this.token = params['q'];
        });
        if (this.token !== undefined) {
            this.userService.customerVerify(this.token).subscribe(function (data) {
                if (!data.error) {
                    // localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    /*   document.getElementById('login').style.display = 'block'; */
                    /* this.router.navigate(['/']); */
                }
                else {
                    /* this.router.navigate(['/']); */
                    _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    if (data.error && data.message === 'Email Activation Link Expire.') {
                        /*     document.getElementById('resendLink').style.display = 'block'; */
                    }
                }
            }, function (err) {
                console.log('err at activation time');
                console.log(err);
                _this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                // this.router.navigate(['customer/login']);
            });
        }
        this.twitterFetchData();
        this.instaFetchData();
        this.customerSignupForm = this.lf.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
        });
        this.customerLoginForm = this.lf.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
        });
        this.customerForgetForm = this.lf.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.emailp)]],
        });
        this.customerLoginForm.valueChanges.subscribe(function (data) { return _this.onLoginFormValueChanged(data); });
        this.customerSignupForm.valueChanges.subscribe(function (data) { return _this.onLoginFormValueChanged(data); });
    };
    FrontendHomeComponent.prototype.instaFetchData = function () {
        var _this = this;
        var queryParams = this.router.routerState.snapshot.root.queryParams;
        var code = queryParams['code'];
        var error = queryParams['error'];
        var error_description = queryParams['error_description'];
        if (code) {
            console.log(code);
            console.log(error);
            this.userService.instaService(code).subscribe(function (instaResponse) {
                var resObj = JSON.parse(instaResponse);
                console.log(resObj);
                if (typeof resObj.code === 'undefined' && resObj.code !== 400) {
                    var obj_1 = {};
                    obj_1['role'] = 'User';
                    obj_1['status'] = true;
                    obj_1['email'] = resObj['user']['username'];
                    obj_1['password'] = resObj['user']['id'];
                    obj_1['id'] = resObj['user']['id'];
                    obj_1['provider'] = 'instagram';
                    obj_1['image'] = resObj['user']['profile_picture'];
                    obj_1['firstname'] = resObj['user']['full_name'];
                    _this.userService.socialValidateUser(obj_1).subscribe(function (loggedUser) {
                        if (!loggedUser.success) {
                            _this.userService.socialRegisterUser(obj_1).subscribe(function (newUser) {
                                _this.userService.socialValidateUser(obj_1).subscribe(function (loggedUserAuth) {
                                    localStorage.setItem('id_token_customer', loggedUserAuth.token);
                                    localStorage.setItem('customer', JSON.stringify(loggedUserAuth.user));
                                    _this.router.navigate(['dashboard']);
                                });
                            });
                        }
                        if (loggedUser.success) {
                            localStorage.setItem('id_token_customer', loggedUser.token);
                            localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                            _this.router.navigate(['dashboard']);
                        }
                    });
                }
                else {
                    _this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
                    _this.router.navigate(['/']);
                }
            });
        }
    };
    FrontendHomeComponent.prototype.twitterFetchData = function () {
        var _this = this;
        var queryParams = this.router.routerState.snapshot.root.queryParams;
        var oauth_token = queryParams['oauth_token'];
        var oauth_verifier = queryParams['oauth_verifier'];
        if (oauth_verifier && oauth_token) {
            console.log(oauth_verifier, oauth_token);
            var requestSecret = localStorage.getItem('requestSecret');
            var obj = {};
            obj['oauth_verifier'] = oauth_verifier;
            obj['oauth_token'] = oauth_token;
            obj['requestSecret'] = requestSecret;
            this.userService.twitterFetchService(obj).subscribe(function (twitterResponse) {
                console.log(twitterResponse);
                localStorage.removeItem('requestSecret');
                var obj = {};
                obj['role'] = 'User';
                obj['status'] = true;
                obj['email'] = twitterResponse['name'];
                obj['password'] = twitterResponse['id'];
                obj['id'] = twitterResponse['id'];
                obj['provider'] = 'twitter';
                obj['image'] = twitterResponse['profile_image_url_https'];
                obj['firstname'] = twitterResponse['screen_name'];
                _this.userService.socialValidateUser(obj).subscribe(function (loggedUser) {
                    if (!loggedUser.success) {
                        _this.userService.socialRegisterUser(obj).subscribe(function (newUser) {
                            _this.userService.socialValidateUser(obj).subscribe(function (loggedUserOauth) {
                                localStorage.setItem('id_token_customer', loggedUserOauth.token);
                                localStorage.setItem('customer', JSON.stringify(loggedUserOauth.user));
                                _this.router.navigate([_this.returnUrl]);
                            });
                        });
                    }
                    else {
                        localStorage.setItem('id_token_customer', loggedUser.token);
                        localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                        _this.router.navigate([_this.returnUrl]);
                    }
                });
            });
        }
    };
    FrontendHomeComponent.prototype.signIn = function (provider) {
        var _this = this;
        this.sub = this._auth.login(provider).subscribe(function (data) {
            //console.log(data)
            var obj = {};
            obj['role'] = 'User';
            obj['status'] = true;
            obj['email'] = data['email'];
            obj['password'] = data['uid'];
            obj['uid'] = data['uid'];
            obj['provider'] = data['provider'];
            obj['image'] = data['image'];
            var nameArr = data['name'].split(' ');
            obj['lastname'] = nameArr.pop();
            obj['firstname'] = nameArr.join(' ');
            // console.log(obj)
            _this.userService.socialValidateUser(obj).subscribe(function (loggedUser) {
                /*console.log(loggedUser,provider)*/
                if (!loggedUser.success) {
                    _this.userService.socialRegisterUser(obj).subscribe(function (newUser) {
                        _this.userService.socialValidateUser(obj).subscribe(function (loggedUserOauth) {
                            ;
                            localStorage.setItem('id_token_customer', loggedUserOauth.token);
                            localStorage.setItem('customer', JSON.stringify(loggedUserOauth.user));
                            _this.modelClose('login');
                            _this.modelClose('signup');
                            _this.router.navigate([_this.returnUrl]);
                        });
                    });
                }
                if (loggedUser.success) {
                    localStorage.setItem('id_token_customer', loggedUser.token);
                    localStorage.setItem('customer', JSON.stringify(loggedUser.user));
                    _this.modelClose('login');
                    _this.modelClose('signup');
                    _this.router.navigate([_this.returnUrl]);
                }
            });
        });
    };
    FrontendHomeComponent.prototype.onLoginWithTwitter = function () {
        this.userService.twitterService().subscribe(function (data) {
            localStorage.setItem('requestSecret', data.requestSecret);
            window.location.href = data.url;
        });
    };
    FrontendHomeComponent.prototype.onLoginWithInstagram = function () {
        // tslint:disable-next-line:max-line-length
        window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=98349c5779404c6ea9c9aa59e0e3aeeb&redirect_uri=https://measuremight.com:3002/&response_type=code";
    };
    FrontendHomeComponent.prototype.signup = function () {
        var _this = this;
        this.userService.registerUser(this.customerSignupForm.value).subscribe(function (data) {
            _this.modelClose('signup');
            if (!data.error) {
                // tslint:disable-next-line:max-line-length
                _this._flashMessagesService.show('Registered  Successfully, Please check your mail.', { cssClass: 'alert-success', timeout: 5000 });
                // this.router.navigate(['admin/dashboard']);
            }
            else {
                _this._flashMessagesService.show('Email already exist.', { cssClass: 'alert-danger', timeout: 5000 });
            }
        }, function (err) {
            _this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
        });
    };
    FrontendHomeComponent.prototype.login = function () {
        var _this = this;
        this.userService.validateUser(this.customerLoginForm.value).subscribe(function (data) {
            _this.modelClose('login');
            if (!data.success) {
                _this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
            }
            else {
                _this.userService.storeUserData(data.token, data.user);
                _this._flashMessagesService.show('Login  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate([_this.returnUrl]);
            }
        }, function (err) {
            _this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
        });
    };
    FrontendHomeComponent.prototype.forgetPass = function () {
        var _this = this;
        this.userService.forgotPassword(this.customerForgetForm.value).subscribe(function (data) {
            console.log(data);
            _this.modelClose('forget');
            if (!data.success) {
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
            }
            else {
                //this.userService.storeUserData(data.token, data.user);
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
                //this.router.navigate(['dashboard']);
            }
        }, function (err) {
            _this._flashMessagesService.show(err.msg, { cssClass: 'alert-danger', timeout: 5000 });
        });
    };
    FrontendHomeComponent.prototype.onLoginFormValueChanged = function (data) {
        if (!this.customerLoginForm) {
            return;
        }
        var form = this.customerLoginForm;
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
    FrontendHomeComponent.prototype.modelOpen = function (type) {
        if (type == 'login') {
            this.modelClose('forget');
            document.getElementById('loginModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }
        if (type == 'signup') {
            document.getElementById('signupModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }
        if (type == 'forget') {
            this.modelClose('login');
            document.getElementById('forgetPassModal').style.display = "block";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:blur(20px)');
        }
    };
    FrontendHomeComponent.prototype.modelClose = function (type) {
        if (type == 'login') {
            document.getElementById('loginModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
        }
        if (type == 'signup') {
            document.getElementById('signupModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
        }
        if (type == 'forget') {
            document.getElementById('forgetPassModal').style.display = "none";
            document.getElementsByClassName('main-content')[0].setAttribute('style', 'filter:none');
        }
    };
    return FrontendHomeComponent;
}());
FrontendHomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-frontendhome',
        template: __webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_social_login__["b" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular2_social_login__["b" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _f || Object])
], FrontendHomeComponent);

var ResetComponent = (function () {
    function ResetComponent(flashMessage, userService, router, route) {
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
        this.route = route;
    }
    ResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    ResetComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.password == this.cpassword) {
            var usrObj = {};
            usrObj['_id'] = this.id;
            usrObj['password'] = this.password;
            this.userService.resetPassword(usrObj).subscribe(function (data) {
                if (!data.error) {
                    _this.flashMessage.show(data.message, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });
                    _this.router.navigate(['/']);
                }
                else {
                    _this.flashMessage.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }
        else {
            this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 5000 });
            return false;
        }
    };
    return ResetComponent;
}());
ResetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reset',
        template: __webpack_require__("../../../../../src/app/frontend/home/reset.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _k || Object])
], ResetComponent);

var AccountActiveComponent = (function () {
    function AccountActiveComponent(userService, router, route, lf, _flashMessagesService) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.lf = lf;
        this._flashMessagesService = _flashMessagesService;
        this.err = '';
    }
    AccountActiveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.emailForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        // subscribe to router event
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
        });
        this.userService.customerVerify(this.token).subscribe(function (data) {
            if (!data.error) {
                // localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                document.getElementById('login').style.display = 'block';
                /* this.router.navigate(['/']); */
            }
            else {
                /* this.router.navigate(['/']); */
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                if (data.error && data.message == 'Email Activation Link Expire.') {
                    document.getElementById('resendLink').style.display = 'block';
                }
            }
        }, function (err) {
            console.log('err at activation time');
            console.log(err);
            _this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
            // this.router.navigate(['customer/login']);
        });
    };
    AccountActiveComponent.prototype.resendActivationLink = function () {
        var _this = this;
        this.userService.resendActivationLink(this.emailForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(function () {
                    _this.router.navigate(['/']);
                }, 1000);
            }
            else {
                _this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        });
    };
    AccountActiveComponent.prototype.goToLogin = function () {
        this.router.navigate(['/']);
    };
    return AccountActiveComponent;
}());
AccountActiveComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-account-active',
        template: __webpack_require__("../../../../../src/app/frontend/home/account-active.component.html"),
        styles: [__webpack_require__("../../../../../src/app/frontend/home/frontendhome.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _q || Object])
], AccountActiveComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
//# sourceMappingURL=frontendhome.component.js.map

/***/ }),

/***/ "../../../../../src/app/frontend/home/reset.component.html":
/***/ (function(module, exports) {

module.exports = "<app-frontendheader></app-frontendheader>\r\n<flash-messages></flash-messages>\r\n    <header class=\"forgot-header\">\r\n        <div class=\"container\">\r\n            <div class=\"col-md-6 col-lg-5 mx-auto\">\r\n                <div class=\"card card-body\">\r\n                    <h3 class=\"text-center mb-4\">Reset Password</h3>\r\n                    <div>\r\n                        <!-- <flash-messages></flash-messages> -->\r\n                    </div>\r\n                    <form (ngSubmit)=\"resetPassword()\">\r\n                        <div class=\"form-group has-error\">\r\n                            <input class=\"form-control input-lg\" [(ngModel)]=\"password\" placeholder=\"Password\" name=\"password\" type=\"password\">\r\n                        </div>\r\n                        <div class=\"form-group has-error\">\r\n                            <input class=\"form-control input-lg\" [(ngModel)]=\"cpassword\" placeholder=\"Confirm Password\" name=\"cpassword\" type=\"password\">\r\n                        </div>\r\n\r\n                        <input class=\"btn btn-lg bg-navyblue btn-block\" value=\"Reset Password\" type=\"submit\">\r\n                    </form>\r\n                    <a [routerLink]=\"['/login']\" class=\"clr-navyblue mt-4\" style=\"text-transform: uppercase; text-align:center;\">Login</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </header>"

/***/ }),

/***/ "../../../../../src/app/global.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return url; });
/* unused harmony export imageUrl */
var url = 'https://measuremight.com:3002/';
//export const url: string = '/';
//export const url: string = 'http://localhost:3001/';
var imageUrl = '/uploads/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "../../../../../src/app/guards/admin.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__("../../../../../src/app/services/admin.service.ts");
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
    function AuthGuard(adminService, router) {
        this.adminService = adminService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.adminService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/admin/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=admin.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/user.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserGuard = (function () {
    function UserGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    UserGuard.prototype.canActivate = function (route, state) {
        if (this.userService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    };
    return UserGuard;
}());
UserGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], UserGuard);

var _a, _b;
//# sourceMappingURL=user.guard.js.map

/***/ }),

/***/ "../../../../../src/app/public/public.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/public/public.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  public works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/public/public.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicComponent; });
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

var PublicComponent = (function () {
    function PublicComponent() {
    }
    PublicComponent.prototype.ngOnInit = function () {
    };
    return PublicComponent;
}());
PublicComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-public',
        template: __webpack_require__("../../../../../src/app/public/public.component.html"),
        styles: [__webpack_require__("../../../../../src/app/public/public.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PublicComponent);

//# sourceMappingURL=public.component.js.map

/***/ }),

/***/ "../../../../../src/app/safe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustHtml(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    };
    return SafePipe;
}());
SafePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'safe'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]) === "function" && _a || Object])
], SafePipe);

var _a;
//# sourceMappingURL=safe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/services/admin.service.ts":
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
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/login', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.getUserById = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.userUpdate = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.userAdd = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.userList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // user's boards
    AdminService.prototype.boardsList = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'category/adminusercategory/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // user's boards bookmarks
    AdminService.prototype.bookmarkList = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'bookmark/category/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.deleteUserById = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.categoryDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'category/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.bookmarkDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'bookmark/' + id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.changePassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/changePassword/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.resetPassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/resetPassword/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.forgotPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/forgotPassword', data)
            .map(function (res) { return res.json(); });
    };
    AdminService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token_admin', token);
        localStorage.setItem('user', JSON.stringify(user));
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
    return AdminService;
}());
AdminService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AdminService);

var _a;
//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/bookmark.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookmarkService; });
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




var BookmarkService = (function () {
    function BookmarkService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    }
    BookmarkService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_customer')) {
            var token = localStorage.getItem('id_token_customer');
            this.authToken = token;
        }
    };
    BookmarkService.prototype.bookmarkList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.bookmark = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.bookmarkAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.bookmarksAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/multi', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.changePosition = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/change-position/', data, { headers: headers })
            .map(function (response) {
            var bookmark = response.json();
            return bookmark;
        });
    };
    BookmarkService.prototype.bookmarkDeleteSelected = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/delete-selected/', data, { headers: headers })
            .map(function (response) {
            var bookmark = response.json();
            return bookmark;
        });
    };
    BookmarkService.prototype.bookmarkCopySelected = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/copy-selected/', data, { headers: headers })
            .map(function (response) {
            var bookmark = response.json();
            return bookmark;
        });
    };
    BookmarkService.prototype.copyToShowcase = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/copytoshowcase/', data, { headers: headers })
            .map(function (response) {
            var bookmark = response.json();
            return bookmark;
        });
    };
    BookmarkService.prototype.bookmarkUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.bookmarkPositionUpdate = function (position) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/update-position/' + position, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.bookmarkDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    BookmarkService.prototype.categoryBookmarks = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/category/' + id, { headers: headers })
            .map(function (response) {
            var category = response.json();
            return category;
        });
    };
    BookmarkService.prototype.categoryBookmarksPublic = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'bookmark/category/open/' + id, { headers: headers })
            .map(function (response) {
            var category = response.json();
            return category;
        });
    };
    return BookmarkService;
}());
BookmarkService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], BookmarkService);

var _a;
//# sourceMappingURL=bookmark.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/category.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryService; });
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




var CategoryService = (function () {
    function CategoryService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    }
    CategoryService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_customer')) {
            var token = localStorage.getItem('id_token_customer');
            this.authToken = token;
        }
    };
    CategoryService.prototype.categoryList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CategoryService.prototype.category = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CategoryService.prototype.categoryAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CategoryService.prototype.categoryUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CategoryService.prototype.categoryPositionUpdate = function (position) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category/update-position/' + position, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CategoryService.prototype.categoryDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'category/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return CategoryService;
}());
CategoryService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CategoryService);

var _a;
//# sourceMappingURL=category.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/pages.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesService; });
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




var PagesService = (function () {
    function PagesService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    PagesService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    };
    PagesService.prototype.pageList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'page', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.page = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'page/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageAdd = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'page', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageUpdate = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'page/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageDelete = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'page/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return PagesService;
}());
PagesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], PagesService);

var _a;
//# sourceMappingURL=pages.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/plan.service.ts":
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
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    PlanService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    PlanService.prototype.planList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'plan', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.plan = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'plan/' + id, { headers: headers })
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
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'plan', data, { headers: headers })
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
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'plan/' + data._id, data, { headers: headers })
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
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'plan/' + id, { headers: headers })
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

/***/ "../../../../../src/app/services/purchaseplan.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseplanService; });
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




var PurchaseplanService = (function () {
    function PurchaseplanService(http) {
        this.http = http;
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    }
    PurchaseplanService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    PurchaseplanService.prototype.puchaseplan = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'purchaseplan', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PurchaseplanService.prototype.updatepuchaseplan = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'purchaseplan/' + data.id, data, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PurchaseplanService.prototype.paymentplan = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'pay', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PurchaseplanService.prototype.getsuccess = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'pay/success', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PurchaseplanService.prototype.getcancel = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'pay/cancel', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PurchaseplanService.prototype.accountList = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'purchaseplan/' + data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PurchaseplanService.prototype.accountdetailList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["a" /* url */] + 'purchaseplan', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return PurchaseplanService;
}());
PurchaseplanService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], PurchaseplanService);

var _a;
//# sourceMappingURL=purchaseplan.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
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





var UserService = (function () {
    function UserService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    }
    UserService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.instaService = function (code) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/social-insta', { code: code })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.twitterService = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/request-token')
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.twitterFetchService = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/access-token', data)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.socialRegisterUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/social-register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.socialValidateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/social-login', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.storeUserData = function (token, user) {
        localStorage.clear();
        localStorage.setItem('id_token_customer', token);
        localStorage.setItem('customer', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    UserService.prototype.validateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/userlogin', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.customerVerify = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/customer-verify', { 'token': data }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.resendActivationLink = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/resend-activation-link', data)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.mycategory = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'category/usercategory/', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateProfile = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.changePassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/changePassword/' + user.id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.checkPassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/checkpassword/' + user.id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.forgotPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/forgotPassword', data)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.resetPassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.put(__WEBPACK_IMPORTED_MODULE_4__global__["a" /* url */] + 'users/resetPassword/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.storeUser = function (token, user) {
        localStorage.setItem('id_token_customer', token);
        localStorage.setItem('customer', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    UserService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    };
    UserService.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token_customer');
    };
    UserService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/validate.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ValidateService = (function () {
    function ValidateService(jsonp) {
        this.jsonp = jsonp;
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateProfile = function (user) {
        if (user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService.prototype.validateaddplan = function (plan) {
        if (plan.nickName == undefined || plan.exchangeName == undefined || plan.exchangeType == undefined || plan.apiKey == undefined || plan.secretKey == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.getYoutube = function (url) {
        var ur = 'https://www.googleapis.com/youtube/v3/videos?part=id&id=' + url + '&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA&callback=JSONP_CALLBACK';
        return this.jsonp.get(ur)
            .map(function (res) {
            return res.json();
        }, function (error) {
            return error;
        });
    };
    ValidateService.prototype.getInsta = function (url) {
        var ur = 'https://api.instagram.com/oembed?url=' + url + '&callback=JSONP_CALLBACK';
        return this.jsonp.get(ur)
            .map(function (res) {
            return res.json();
        }, function (error) {
            return error;
        });
    };
    ValidateService.prototype.getTwitter = function (url) {
        var ur = 'https://publish.twitter.com/oembed?url=' + encodeURIComponent(url) + '&callback=JSONP_CALLBACK';
        return this.jsonp.get(ur)
            .map(function (res) {
            return res.json();
        }, function (error) {
            return error;
        });
    };
    return ValidateService;
}());
ValidateService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Jsonp"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Jsonp"]) === "function" && _a || Object])
], ValidateService);

var _a;
//# sourceMappingURL=validate.service.js.map

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