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
import { LoadingController, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';
import { LoginPage } from '../login/login';
var HomePage = (function () {
    function HomePage(navCtrl, menuCtrl, viewCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.overview = {};
        this.acceptedOrderTotal = 0;
        this.lastWeekOrderTotal = 0;
        this.menuCtrl.enable(true);
        //console.log(this.currentOwner)
    }
    HomePage.prototype.ionViewDidEnter = function () {
        //this.isLogin();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    HomePage.prototype.isLogin = function () {
        var isLog = localStorage.getItem('currentOwner');
        if (!isLog) {
            this.logout();
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
            this.getRestaurants();
        }
    };
    HomePage.prototype.getRestaurants = function () {
        var _this = this;
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.restaurantsService.getOwnerRestaurants(this.currentOwner._id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.getOverview(_this.restaurants._id);
        });
    };
    HomePage.prototype.getOverview = function (id) {
        var _this = this;
        this.orderService.overview(id).subscribe(function (users) {
            _this.overview = users.data;
            if (_this.overview.totalAcceptedOrder) {
                for (var i = 0; i < _this.overview.totalAcceptedOrder.length; i++) {
                    _this.acceptedOrderTotal = _this.acceptedOrderTotal + _this.overview.totalAcceptedOrder[i].gTotal;
                }
                _this.avgAcceptedOrderTotal = Number(_this.acceptedOrderTotal) / Number(_this.overview.totalAcceptedOrder.length);
            }
            console.log("this.overview");
            console.log(_this.overview);
            if (_this.overview.asPerDayOrder) {
                for (var i = 0; i < _this.overview.asPerDayOrder.length; i++) {
                    _this.lastWeekOrderTotal = _this.lastWeekOrderTotal + _this.overview.asPerDayOrder[i].gTotal;
                }
                _this.avglastWeekOrderTotal = Number(_this.lastWeekOrderTotal) / Number(_this.overview.asPerDayOrder.length);
            }
            _this.loading.dismiss();
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        localStorage.removeItem('currentOwner');
        this.navCtrl.push(LoginPage)
            .then(function () {
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, MenuController, ViewController, LoadingController, NavParams, RestaurantsService, OrderService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map