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
var plan_service_1 = require("../../services/plan.service");
var AdminPlanComponent = (function () {
    function AdminPlanComponent() {
    }
    AdminPlanComponent.prototype.ngOnInit = function () { };
    return AdminPlanComponent;
}());
AdminPlanComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-plan',
        templateUrl: './plan.component.html',
        styleUrls: ['./plan.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AdminPlanComponent);
exports.AdminPlanComponent = AdminPlanComponent;
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
    core_1.Component({
        selector: 'app-admin-plan-list',
        templateUrl: './planlist.component.html',
        styleUrls: ['./plan.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        plan_service_1.PlanService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PlanListComponent);
exports.PlanListComponent = PlanListComponent;
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
            name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            planType: ['', forms_1.Validators.required],
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
    core_1.Component({
        selector: 'app-admin-plan-add',
        templateUrl: './planadd.component.html',
        styleUrls: ['./plan.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        plan_service_1.PlanService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PlanAddComponent);
exports.PlanAddComponent = PlanAddComponent;
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
            _id: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            planType: ['', forms_1.Validators.required],
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
    core_1.Component({
        selector: 'app-admin-plan-edit',
        templateUrl: './planedit.component.html',
        styleUrls: ['./plan.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        plan_service_1.PlanService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], PlanEditComponent);
exports.PlanEditComponent = PlanEditComponent;
//# sourceMappingURL=plan.component.js.map