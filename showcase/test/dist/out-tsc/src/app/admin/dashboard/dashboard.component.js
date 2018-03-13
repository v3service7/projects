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
var exchange_service_1 = require("../../services/exchange.service");
var admin_service_1 = require("../../services/admin.service");
var pages_service_1 = require("../../services/pages.service");
var plan_service_1 = require("../../services/plan.service");
var DashboardComponent = (function () {
    function DashboardComponent(planService, exchangeService, pagesService, adminService) {
        this.planService = planService;
        this.exchangeService = exchangeService;
        this.pagesService = pagesService;
        this.adminService = adminService;
        this.planCount = 0;
        this.userCount = 0;
        this.pageCount = 0;
        this.exchangeCount = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getPlanList();
        this.getPageList();
        this.getExchangeList();
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
    DashboardComponent.prototype.getExchangeList = function () {
        var _this = this;
        this.exchangeService.exchangeList().subscribe(function (data) {
            if (!data.error) {
                _this.exchangeCount = data.message.length;
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
    core_1.Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [plan_service_1.PlanService,
        exchange_service_1.ExchangeService,
        pages_service_1.PagesService,
        admin_service_1.AdminService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map