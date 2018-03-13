"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var admin_service_1 = require("../../services/admin.service");
var AdminCustomerComponent = (function () {
    function AdminCustomerComponent(lf, router, route) {
        this.lf = lf;
        this.router = router;
        this.route = route;
    }
    AdminCustomerComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', forms_1.Validators.required]
        });
    };
    return AdminCustomerComponent;
}());
AdminCustomerComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-customer',
        templateUrl: './customer.component.html',
        styleUrls: ['./customer.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        router_1.ActivatedRoute])
], AdminCustomerComponent);
exports.AdminCustomerComponent = AdminCustomerComponent;
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
        if (confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('User Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.customerService.deleteUserById(id).subscribe(function (data) {
                _this.getList();
            });
        }
    };
    return CustomerListComponent;
}());
CustomerListComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-customer-list',
        templateUrl: './customerlist.component.html',
        styleUrls: ['./customer.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], CustomerListComponent);
exports.CustomerListComponent = CustomerListComponent;
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
            'username': '',
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
            'username': {
                'required': 'Username is required.',
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
            firstname: ['', forms_1.Validators.required],
            lastname: ['', forms_1.Validators.required],
            username: ['', forms_1.Validators.required],
            phonenumber: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(15)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.emailp)]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern(this.passwordRegex)]],
            matchpass: ['', forms_1.Validators.required],
            newpassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern(this.passwordRegex)]]
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
    core_1.Component({
        selector: 'app-admin-customer-add',
        templateUrl: './customeradd.component.html',
        styleUrls: ['./customer.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], CustomerAddComponent);
exports.CustomerAddComponent = CustomerAddComponent;
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
            _id: ['', forms_1.Validators.required],
            firstname: ['', forms_1.Validators.required],
            lastname: ['', forms_1.Validators.required],
            phonenumber: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.emailp)]]
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
    core_1.Component({
        selector: 'app-admin-customer-edit',
        templateUrl: './customeredit.component.html',
        styleUrls: ['./customer.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], CustomerEditComponent);
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customer.component.js.map