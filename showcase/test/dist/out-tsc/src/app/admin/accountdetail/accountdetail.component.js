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
var purchaseplan_service_1 = require("../../services/purchaseplan.service");
var AdminAccountdetailComponent = (function () {
    function AdminAccountdetailComponent() {
    }
    AdminAccountdetailComponent.prototype.ngOnInit = function () { };
    return AdminAccountdetailComponent;
}());
AdminAccountdetailComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-accountdetail',
        templateUrl: './accountdetail.component.html',
        styleUrls: ['./accountdetail.component.css'],
    }),
    __metadata("design:paramtypes", [])
], AdminAccountdetailComponent);
exports.AdminAccountdetailComponent = AdminAccountdetailComponent;
var AccountdetailListComponent = (function () {
    function AccountdetailListComponent(lf, purchaseplanService, router, route, _flashMessagesService) {
        this.lf = lf;
        this.purchaseplanService = purchaseplanService;
        this.router = router;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.plans = [];
    }
    AccountdetailListComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    AccountdetailListComponent.prototype.getList = function () {
        var _this = this;
        this.purchaseplanService.accountdetailList().subscribe(function (data) {
            console.log(data);
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    return AccountdetailListComponent;
}());
AccountdetailListComponent = __decorate([
    core_1.Component({
        selector: 'app-admin-accountdetail-list',
        templateUrl: './accountdetaillist.component.html',
        styleUrls: ['./accountdetail.component.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        purchaseplan_service_1.PurchaseplanService,
        router_1.Router,
        router_1.ActivatedRoute,
        angular2_flash_messages_1.FlashMessagesService])
], AccountdetailListComponent);
exports.AccountdetailListComponent = AccountdetailListComponent;
//# sourceMappingURL=accountdetail.component.js.map