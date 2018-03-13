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
var admin_service_1 = require("../../services/admin.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var angular2_flash_messages_1 = require("angular2-flash-messages");
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
            _id: ['', forms_1.Validators.required],
            firstname: ['', forms_1.Validators.required],
            lastname: ['', forms_1.Validators.required],
            phonenumber: ['', forms_1.Validators.required],
            dob: [''],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(this.emailp)]],
        });
        this.cpForm = this.lf.group({
            _id: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            newpassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.pattern(this.passwordRegex)]]
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
    core_1.Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        router_1.Router,
        forms_1.FormBuilder,
        angular2_flash_messages_1.FlashMessagesService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map