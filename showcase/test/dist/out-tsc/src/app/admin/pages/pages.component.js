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
var pages_service_1 = require("../../services/pages.service");
var AdminPagesComponent = (function () {
    function AdminPagesComponent() {
    }
    AdminPagesComponent.prototype.ngOnInit = function () { };
    return AdminPagesComponent;
}());
AdminPagesComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-pages',
        templateUrl: './pages.component.html',
        styleUrls: ['./pages.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AdminPagesComponent);
exports.AdminPagesComponent = AdminPagesComponent;
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
    core_1.Component({
        selector: 'app-admin-pages-list',
        templateUrl: './pageslist.component.html',
        styleUrls: ['./pages.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        pages_service_1.PagesService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PagesListComponent);
exports.PagesListComponent = PagesListComponent;
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
            title: ['', forms_1.Validators.required],
            url: ['', forms_1.Validators.required],
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
    core_1.Component({
        selector: 'app-admin-pages-add',
        templateUrl: './pagesadd.component.html',
        styleUrls: ['./pages.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        pages_service_1.PagesService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PagesAddComponent);
exports.PagesAddComponent = PagesAddComponent;
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
            _id: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            url: ['', forms_1.Validators.required],
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
    core_1.Component({
        selector: 'app-admin-pages-edit',
        templateUrl: './pagesedit.component.html',
        styleUrls: ['./pages.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        pages_service_1.PagesService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PagesEditComponent);
exports.PagesEditComponent = PagesEditComponent;
//# sourceMappingURL=pages.component.js.map