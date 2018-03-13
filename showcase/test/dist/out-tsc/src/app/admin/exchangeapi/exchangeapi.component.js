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
var exchangeapi_service_1 = require("../../services/exchangeapi.service");
var admin_service_1 = require("../../services/admin.service");
var AdminExchangeapiComponent = (function () {
    function AdminExchangeapiComponent() {
    }
    AdminExchangeapiComponent.prototype.ngOnInit = function () { };
    return AdminExchangeapiComponent;
}());
AdminExchangeapiComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchangeapi',
        templateUrl: './exchangeapi.component.html',
        styleUrls: ['./exchangeapi.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AdminExchangeapiComponent);
exports.AdminExchangeapiComponent = AdminExchangeapiComponent;
var ExchangeapiListComponent = (function () {
    function ExchangeapiListComponent(lf, exchangeapiService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeapiService = exchangeapiService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.plans = [];
    }
    ExchangeapiListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    ExchangeapiListComponent.prototype.getList = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiList().subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiListComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Exchange API Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.exchangeapiService.exchangeapiDelete(id).subscribe(function (data) {
                _this.getList();
            });
        }
    };
    return ExchangeapiListComponent;
}());
ExchangeapiListComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchangeapi-list',
        templateUrl: './exchangeapilist.component.html',
        styleUrls: ['./exchangeapi.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchangeapi_service_1.ExchangeapiService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeapiListComponent);
exports.ExchangeapiListComponent = ExchangeapiListComponent;
var ExchangeapiAddComponent = (function () {
    function ExchangeapiAddComponent(lf, exchangeapiService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeapiService = exchangeapiService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.users = [];
        this.formErrors = {
            'exchangeapiName': '',
            'exchangeUrl': '',
        };
        this.validationMessages = {
            'exchangeapiName': {
                'required': 'Exchangeapi Name is required.',
            },
            'exchangeUrl': {
                'required': 'Exchangeapi Url is required.',
            },
        };
    }
    ExchangeapiAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            exchangeapiName: ['', forms_1.Validators.required],
            exchangeUrl: ['', forms_1.Validators.required]
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.getUserList();
    };
    ExchangeapiAddComponent.prototype.planAdd = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiAdd(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Exchange API Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/exchangeapi']);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiAddComponent.prototype.getUserList = function () {
        var _this = this;
        this.adminService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.users = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiAddComponent.prototype.onValueChanged = function (data) {
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
    return ExchangeapiAddComponent;
}());
ExchangeapiAddComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchangeapi-add',
        templateUrl: './exchangeapiadd.component.html',
        styleUrls: ['./exchangeapi.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchangeapi_service_1.ExchangeapiService,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeapiAddComponent);
exports.ExchangeapiAddComponent = ExchangeapiAddComponent;
var ExchangeapiEditComponent = (function () {
    function ExchangeapiEditComponent(lf, exchangeapiService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeapiService = exchangeapiService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.users = [];
        this.formErrors = {
            'exchangeapiName': '',
            'exchangeUrl': '',
        };
        this.validationMessages = {
            'exchangeapiName': {
                'required': 'Exchangeapi Name is required.',
            },
            'exchangeUrl': {
                'required': 'Exchangeapi Url is required.',
            },
        };
    }
    ExchangeapiEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            exchangeapiName: ['', forms_1.Validators.required],
            exchangeUrl: ['', forms_1.Validators.required],
            _id: ['', forms_1.Validators.required]
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.plan(id);
            _this.getUserList();
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    ExchangeapiEditComponent.prototype.getUserList = function () {
        var _this = this;
        this.adminService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.users = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiEditComponent.prototype.planUpdate = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiUpdate(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Exchange API Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/exchangeapi']);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiEditComponent.prototype.plan = function (id) {
        var _this = this;
        this.exchangeapiService.exchangeapi(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                _this.planAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeapiEditComponent.prototype.onValueChanged = function (data) {
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
    return ExchangeapiEditComponent;
}());
ExchangeapiEditComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchangeapi-edit',
        templateUrl: './exchangeapiedit.component.html',
        styleUrls: ['./exchangeapi.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchangeapi_service_1.ExchangeapiService,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeapiEditComponent);
exports.ExchangeapiEditComponent = ExchangeapiEditComponent;
//# sourceMappingURL=exchangeapi.component.js.map