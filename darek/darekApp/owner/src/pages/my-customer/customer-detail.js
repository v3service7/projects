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
import { LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/index';
import { OrderDetailPage } from './../my-order/order-detail';
/**
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerDetailPage = (function () {
    function CustomerDetailPage(viewCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.selectedCustomer = this.navParams.get('cusDetail');
        this.getCustomers();
    }
    CustomerDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    CustomerDetailPage.prototype.getCustomers = function () {
        var _this = this;
        this.orderService.customerOrders(this.selectedCustomer._id).subscribe(function (users) {
            _this.myOrders = users.message;
        });
    };
    CustomerDetailPage.prototype.orderDetail = function (event, obj) {
        this.navCtrl.push(OrderDetailPage, {
            item: obj
        });
    };
    CustomerDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return CustomerDetailPage;
}());
CustomerDetailPage = __decorate([
    Component({
        selector: 'page-customer-detail',
        templateUrl: 'customer-detail.html',
    }),
    __metadata("design:paramtypes", [ViewController, NavController, LoadingController, NavParams, RestaurantsService, OrderService])
], CustomerDetailPage);
export { CustomerDetailPage };
//# sourceMappingURL=customer-detail.js.map