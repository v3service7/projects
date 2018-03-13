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
var exchange_service_1 = require("../../services/exchange.service");
var admin_service_1 = require("../../services/admin.service");
var exchangeapi_service_1 = require("../../services/exchangeapi.service");
var AdminExchangeComponent = (function () {
    function AdminExchangeComponent() {
    }
    AdminExchangeComponent.prototype.ngOnInit = function () { };
    return AdminExchangeComponent;
}());
AdminExchangeComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchange',
        templateUrl: './exchange.component.html',
        styleUrls: ['./exchange.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AdminExchangeComponent);
exports.AdminExchangeComponent = AdminExchangeComponent;
var ExchangeListComponent = (function () {
    function ExchangeListComponent(lf, exchangeService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeService = exchangeService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.plans = [];
    }
    ExchangeListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    ExchangeListComponent.prototype.getList = function () {
        var _this = this;
        this.exchangeService.exchangeList().subscribe(function (data) {
            console.log(data);
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeListComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this._flashMessagesService.show('Exchange Account Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.exchangeService.exchangeDelete(id).subscribe(function (data) {
                _this.getList();
            });
        }
    };
    return ExchangeListComponent;
}());
ExchangeListComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchange-list',
        templateUrl: './exchangelist.component.html',
        styleUrls: ['./exchange.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchange_service_1.ExchangeService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeListComponent);
exports.ExchangeListComponent = ExchangeListComponent;
var ExchangeAddComponent = (function () {
    function ExchangeAddComponent(lf, exchangeService, exchangeapiService, adminService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeService = exchangeService;
        this.exchangeapiService = exchangeapiService;
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.users = [];
        this.exchangeNames = [];
        this.exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
        this.formErrors = {
            'exchangeName': '',
            'exchangeType': '',
            'nickName': '',
            'apiKey': '',
            'secretKey': '',
            'user': '',
        };
        this.validationMessages = {
            'exchangeName': {
                'required': 'Exchange Name is required.',
            },
            'exchangeType': {
                'required': 'Exchange Type is required.',
            },
            'nickName': {
                'required': 'Nick Name is required.',
            },
            'apiKey': {
                'required': 'API Key is required.',
            },
            'secretKey': {
                'required': 'Secret Key is required.',
            },
            'user': {
                'required': 'User is required.',
            },
        };
    }
    ExchangeAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            exchangeName: ['', forms_1.Validators.required],
            exchangeType: ['', forms_1.Validators.required],
            nickName: ['', forms_1.Validators.required],
            apiKey: ['', forms_1.Validators.required],
            secretKey: ['', forms_1.Validators.required],
            user: ['', forms_1.Validators.required]
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        this.getUserList();
        this.getApiList();
    };
    ExchangeAddComponent.prototype.planAdd = function () {
        var _this = this;
        console.log(this.planAddForm.value);
        this.exchangeService.exchangeAdd(this.planAddForm.value).subscribe(function (data) {
            console.log(data);
            if (!data.error) {
                _this._flashMessagesService.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/exchange']);
            }
            else {
                _this._flashMessagesService.show('Exchange API Already exists', { cssClass: 'danger-alert', timeout: 3000 });
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeAddComponent.prototype.getUserList = function () {
        var _this = this;
        this.adminService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.users = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeAddComponent.prototype.getApiList = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiList().subscribe(function (data) {
            if (!data.error) {
                _this.exchangeNames = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeAddComponent.prototype.onValueChanged = function (data) {
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
    return ExchangeAddComponent;
}());
ExchangeAddComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchange-add',
        templateUrl: './exchangeadd.component.html',
        styleUrls: ['./exchange.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchange_service_1.ExchangeService,
        exchangeapi_service_1.ExchangeapiService,
        admin_service_1.AdminService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeAddComponent);
exports.ExchangeAddComponent = ExchangeAddComponent;
var ExchangeEditComponent = (function () {
    function ExchangeEditComponent(lf, exchangeService, router, exchangeapiService, adminService, route, _flashMessagesService) {
        this.lf = lf;
        this.exchangeService = exchangeService;
        this.router = router;
        this.exchangeapiService = exchangeapiService;
        this.adminService = adminService;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.currentCustomer = {};
        this.users = [];
        this.exchangeNames = [];
        this.exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
        this.formErrors = {
            'exchangeName': '',
            'exchangeType': '',
            'nickName': '',
            'apiKey': '',
            'secretKey': '',
            'user': '',
        };
        this.validationMessages = {
            'exchangeName': {
                'required': 'Exchange Name is required.',
            },
            'exchangeType': {
                'required': 'Exchange Type is required.',
            },
            'nickName': {
                'required': 'Nick Name is required.',
            },
            'apiKey': {
                'required': 'API Key is required.',
            },
            'secretKey': {
                'required': 'Secret Key is required.',
            },
            'user': {
                'required': 'User is required.',
            },
        };
    }
    ExchangeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.planAddForm = this.lf.group({
            _id: ['', forms_1.Validators.required],
            exchangeName: ['', forms_1.Validators.required],
            exchangeType: ['', forms_1.Validators.required],
            nickName: ['', forms_1.Validators.required],
            apiKey: ['', forms_1.Validators.required],
            secretKey: ['', forms_1.Validators.required],
            user: ['', forms_1.Validators.required]
        });
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.plan(id);
            _this.getUserList();
            _this.getApiList();
        });
        this.planAddForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    ExchangeEditComponent.prototype.getUserList = function () {
        var _this = this;
        this.adminService.userList().subscribe(function (data) {
            if (!data.error) {
                _this.users = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeEditComponent.prototype.getApiList = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiList().subscribe(function (data) {
            if (!data.error) {
                _this.exchangeNames = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeEditComponent.prototype.planUpdate = function () {
        var _this = this;
        console.log(this.planAddForm.value);
        this.exchangeService.exchangeUpdate(this.planAddForm.value).subscribe(function (data) {
            if (!data.error) {
                _this._flashMessagesService.show('Exchange Account Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['admin/exchange']);
            }
            else {
                _this._flashMessagesService.show('Exchange API Already Exists', { cssClass: 'danger-alert', timeout: 3000 });
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeEditComponent.prototype.plan = function (id) {
        var _this = this;
        this.exchangeService.exchange(id).subscribe(function (data) {
            if (!data.error) {
                _this.currentCustomer = data.message;
                _this.planAddForm.patchValue(_this.currentCustomer);
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    ExchangeEditComponent.prototype.onValueChanged = function (data) {
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
    return ExchangeEditComponent;
}());
ExchangeEditComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-exchange-edit',
        templateUrl: './exchangeedit.component.html',
        styleUrls: ['./exchange.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        exchange_service_1.ExchangeService,
        router_1.Router,
        exchangeapi_service_1.ExchangeapiService,
        admin_service_1.AdminService,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], ExchangeEditComponent);
exports.ExchangeEditComponent = ExchangeEditComponent;
//# sourceMappingURL=exchange.component.js.map