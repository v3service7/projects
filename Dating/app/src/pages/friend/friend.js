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
import { CustomersService, FriendService } from '../../app/service/index';
var FriendPage = (function () {
    function FriendPage(friendService, navCtrl, customerService, loadingCtrl) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.customerList = [];
        this.activeTab1 = 'activeTab1';
        this.activeTab2 = 'activeTab2';
        this.activeTab3 = 'activeTab3';
    }
    FriendPage.prototype.ionViewDidEnter = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myFriends();
        }
    };
    FriendPage.prototype.someEvent = function () {
        console.log("someEvent");
    };
    FriendPage.prototype.myFriends = function () {
        var _this = this;
        if (this.activeTab1 != 'activeTab1') {
            this.activeTab1 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.friendService.myfriends({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("myFriends");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.myPendingRequests = function () {
        var _this = this;
        if (this.activeTab2 != 'activeTab1') {
            this.activeTab2 = 'activeTab1';
            this.activeTab1 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.friendService.mypendingrequest({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("pendingreq");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.myBlocked = function () {
        var _this = this;
        if (this.activeTab3 != 'activeTab1') {
            this.activeTab3 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab1 = 'activeTab3';
        }
        this.friendService.myblocked({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("myBlocked");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.doRefresh = function (refresher) {
        this.myFriends();
        refresher.complete();
    };
    return FriendPage;
}());
FriendPage = __decorate([
    Component({
        selector: 'page-friend',
        templateUrl: 'friend.html'
    }),
    __metadata("design:paramtypes", [FriendService, NavController, CustomersService, LoadingController])
], FriendPage);
export { FriendPage };
//# sourceMappingURL=friend.js.map