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
var admin_service_1 = require("../../services/admin.service");
var angular2_flash_messages_1 = require("angular2-flash-messages");
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
            email: ['', forms_1.Validators.required]
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
    core_1.Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        admin_service_1.AdminService,
        angular2_flash_messages_1.FlashMessagesService,
        router_1.Router,
        router_1.ActivatedRoute])
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
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
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            newpassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
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
    core_1.Component({
        selector: 'app-admin-resetPassword',
        templateUrl: './adminresetpassword.component.html',
        styleUrls: ['./forgot-password.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        admin_service_1.AdminService,
        angular2_flash_messages_1.FlashMessagesService,
        forms_1.FormBuilder])
], AdminResetPasswordComponent);
exports.AdminResetPasswordComponent = AdminResetPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map