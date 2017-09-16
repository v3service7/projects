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
import { ModalController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';
import { CustomerDetailPage } from './customer-detail';
/**
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyCustomerPage = (function () {
    function MyCustomerPage(modalCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.currentOwner = {};
        this.restaurants = {};
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }
    MyCustomerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    MyCustomerPage.prototype.getRestaurants = function () {
        var _this = this;
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getClient(_this.restaurants._id);
        });
    };
    MyCustomerPage.prototype.getClient = function (id) {
        var _this = this;
        this.orderService.client(id).subscribe(function (users) {
            _this.client = users.message;
            _this.loading.dismiss();
        });
    };
    MyCustomerPage.prototype.cleintDetail = function (event, obj) {
        var modal = this.modalCtrl.create(CustomerDetailPage, { 'cusDetail': obj });
        modal.present();
    };
    MyCustomerPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getClient(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    return MyCustomerPage;
}());
MyCustomerPage = __decorate([
    Component({
        selector: 'page-my-customer',
        templateUrl: 'my-customer.html',
    }),
    __metadata("design:paramtypes", [ModalController, NavController, LoadingController, NavParams, RestaurantsService, OrderService])
], MyCustomerPage);
export { MyCustomerPage };
//# sourceMappingURL=my-customer.js.map