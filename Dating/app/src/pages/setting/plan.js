var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ToastController, NavController, AlertController, Nav } from 'ionic-angular';
import { CustomersService, PackageService } from '../../app/service/index';
var PlanPage = (function () {
    function PlanPage(nav, navCtrl, alertCtrl, customerService, packageService, toastCtrl) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.customerService = customerService;
        this.packageService = packageService;
        this.toastCtrl = toastCtrl;
        this.plan = 'myPlan';
        this.currentCustomer = {};
        this.packages = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.getOne(this.currentCustomer._id);
        this.getAllPackages();
    }
    PlanPage.prototype.getOne = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
            _this.currentCustomer = cust.message;
            console.log(_this.currentCustomer);
        });
    };
    PlanPage.prototype.getAllPackages = function () {
        var _this = this;
        this.packageService.getAll().subscribe(function (pkg) {
            console.log("pkg.message");
            console.log(pkg.message);
            _this.packages = pkg.message;
        });
    };
    PlanPage.prototype.buyPackage = function (pkg) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Buy Package?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        if (typeof _this.currentCustomer['mypackage'] != 'undefined') {
                            _this.currentCustomer['packagesPurchased'].push(_this.currentCustomer['mypackage']);
                        }
                        _this.currentCustomer['mypackage'] = pkg;
                        _this.currentCustomer['mypackage']['remaincalls'] = pkg.noofcalls;
                        _this.updateCurrentCustomer();
                        setTimeout(function () {
                            _this.plan = 'myPlan';
                        }, 1000);
                    }
                }
            ]
        });
        confirm.present();
    };
    PlanPage.prototype.updateCurrentCustomer = function () {
        var _this = this;
        this.customerService.updateCustomer(this.currentCustomer).subscribe(function (data) {
            if (!data.error) {
                _this.getToast("Package Added Successfully");
                _this.getOne(_this.currentCustomer._id);
            }
        });
    };
    PlanPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return PlanPage;
}());
PlanPage = __decorate([
    Component({
        selector: 'page-plan',
        templateUrl: 'plan.html'
    }),
    __metadata("design:paramtypes", [Nav,
        NavController,
        AlertController,
        CustomersService,
        PackageService,
        ToastController])
], PlanPage);
export { PlanPage };
//# sourceMappingURL=plan.js.map