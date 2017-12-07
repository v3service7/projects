var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import { MessageDetailPage } from '../messages/messagedetail';
var CustomerDetailPage = (function () {
    function CustomerDetailPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.friends = [];
        this.showBasic = false;
        this.url = globalVariable;
        this.myonline = [];
        this.changeSomething = new EventEmitter();
        this.id = navParams.get('id');
        /*this.id = localStorage.getItem('id');*/
    }
    CustomerDetailPage.prototype.ngOnInit = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        this.getAllAllow();
        this.getCustomer(this.id);
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
    };
    CustomerDetailPage.prototype.onlinenew = function () {
        var _this = this;
        this.socketService.onlineList2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 1");
            console.log(_this.myonline);
        });
    };
    CustomerDetailPage.prototype.onlinenew2 = function () {
        var _this = this;
        this.socketService.onlineListon2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 2");
        });
    };
    CustomerDetailPage.prototype.onlinenew3 = function () {
        var _this = this;
        this.socketService.onlineList3().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 3");
        });
    };
    CustomerDetailPage.prototype.offlinenew2 = function () {
        var _this = this;
        this.socketService.offline2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
        });
    };
    CustomerDetailPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            _this.customer = cust.message;
            console.log("this.customer");
            console.log(_this.customer);
        });
    };
    CustomerDetailPage.prototype.getAllAllow = function () {
        var _this = this;
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(function (data) {
            _this.friends = data.message;
            console.log("this.friends");
            console.log(_this.friends);
        });
    };
    CustomerDetailPage.prototype.checkforinvite = function (id) {
        var index1 = this.friends.findIndex(function (item) { return item.FromId._id == id; });
        var index2 = this.friends.findIndex(function (item) { return item.ToId._id == id; });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    CustomerDetailPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    CustomerDetailPage.prototype.showMoreDetail = function () {
        this.showBasic = true;
    };
    CustomerDetailPage.prototype.hideMoreDetail = function () {
        this.showBasic = false;
    };
    CustomerDetailPage.prototype.SomeEvent = function () {
        this.getAllAllow();
        this.changeSomething.emit('complete');
    };
    CustomerDetailPage.prototype.acceptrequest = function (id, pid) {
        var _this = this;
        var friendobj = { _id: id, status: 1 };
        this.friendService.updateFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.deleteBlock = function (id) {
        var _this = this;
        this.friendService.deleteOne(id).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.unblockrequest = function (data, type) {
        var _this = this;
        if (type == 2) {
            var friendobj = { _id: data._id, FromId: data.ToId._id, ToId: data.FromId._id, status: 0 };
            this.friendService.updateFriend(friendobj).subscribe(function (data) {
                _this.SomeEvent();
            });
        }
        else {
            this.SomeEvent();
            this.deleteBlock(data._id);
        }
    };
    CustomerDetailPage.prototype.selectNewChat = function (id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading your messages...'
        });
        loading.present();
        var messageObj = {};
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            messageObj['id'] = data.message;
            localStorage.setItem("currentChat", JSON.stringify(data.message));
            _this.events.publish('messages:badgecounter', Date.now());
            var obj = { fromCustId: data.message, toCustId: _this.customerInfo._id };
            _this.customerService.getmessage(obj).subscribe(function (data1) {
                messageObj['messages'] = data1.message;
                loading.dismiss();
                _this.navCtrl.push(MessageDetailPage, {
                    message: messageObj
                });
            });
        });
    };
    CustomerDetailPage.prototype.requestFromTo = function (from, to, type) {
        var obj = { FromId: from, ToId: to, title: type };
        this.SomeEvent();
    };
    CustomerDetailPage.prototype.sendRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 0 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.checkblock = function (id) {
        var index1 = this.friends.findIndex(function (item) {
            return item.ToId._id == id && item.status == 4;
        });
        var index2 = this.friends.findIndex(function (item) {
            return item.FromId._id == id && item.status == 4;
        });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    CustomerDetailPage.prototype.anyBlockRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 4 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    return CustomerDetailPage;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CustomerDetailPage.prototype, "changeSomething", void 0);
CustomerDetailPage = __decorate([
    Component({
        selector: 'page-customerdetail',
        templateUrl: 'customerdetail.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CustomersService,
        FriendService,
        NavParams,
        SocketService,
        Events,
        LoadingController])
], CustomerDetailPage);
export { CustomerDetailPage };
//# sourceMappingURL=customerdetail.js.map