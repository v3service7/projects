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
import { NavController, LoadingController } from 'ionic-angular';
import { CustomersService } from '../../app/service/index';
var AboutPage = (function () {
    function AboutPage(navCtrl, customerService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.customerList = [];
    }
    AboutPage.prototype.ionViewDidEnter = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.getCustomer(this.customerInfo._id);
        }
    };
    AboutPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            console.log(_this.customerList.length);
            _this.customerList = cust.message.visitors;
            _this.loading.dismiss();
        });
    };
    AboutPage.prototype.doRefresh = function (refresher) {
        this.getCustomer(this.customerInfo._id);
        refresher.complete();
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Component({
        selector: 'page-about',
        templateUrl: 'about.html'
    }),
    __metadata("design:paramtypes", [NavController, CustomersService, LoadingController])
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.js.map