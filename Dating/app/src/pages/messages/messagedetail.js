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
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import * as globalVariable from "../../app/global";
var MessageDetailPage = (function () {
    function MessageDetailPage(friendService, navCtrl, customerService, loadingCtrl, navParams, socketService, events) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.url = globalVariable;
        this.message = navParams.get('message');
        setTimeout(function () {
            var x = document.getElementById('focusRow');
            x.focus();
        }, 1000);
    }
    MessageDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        this.events.subscribe('messages:receivedmsg', function (msg, time) {
            var toCustomer = JSON.parse(localStorage.getItem('currentChat'));
            if (msg.fromCustId == toCustomer._id) {
                _this.message.messages.push(msg);
                setTimeout(function () {
                    _this.currentMsg = "";
                    var x = document.getElementById('focusRow');
                    x.focus();
                }, 500);
            }
        });
    };
    MessageDetailPage.prototype.doRefresh = function (refresher) {
        refresher.complete();
    };
    MessageDetailPage.prototype.senderPic = function (pic) {
        var imagePath;
        if (typeof pic == "undefined") {
            imagePath = "assets/images/face3.png";
        }
        else {
            imagePath = this.url + pic;
        }
        return imagePath;
    };
    MessageDetailPage.prototype.senderORreceiver = function (msg) {
        if (this.customerInfo) {
            if (msg.fromCustId == this.customerInfo._id) {
                return { 'background': '#c7eafc', 'left': '25%', 'color': '#45829b' };
            }
            else {
                return { 'background': '#ffe6cb', 'left': '0', 'color': '#c48843' };
            }
        }
    };
    MessageDetailPage.prototype.sendMessage = function () {
        var _this = this;
        if (localStorage.getItem('currentCustomer') && localStorage.getItem('currentChat')) {
            var current_user = JSON.parse(localStorage.getItem('currentCustomer'));
            this.customerService.getOneCustomer(current_user._id).subscribe(function (cst) {
                var fromCustomer = cst.message;
                var toCustomer = JSON.parse(localStorage.getItem('currentChat'));
                var data = {
                    fromCustId: fromCustomer._id,
                    fromSocketId: fromCustomer.socketId,
                    message: _this.currentMsg.trim(),
                    toCustId: toCustomer._id,
                    toSocketId: toCustomer.socketId
                };
                _this.socketService.sendMessage(data);
                _this.message.messages.push(data);
                setTimeout(function () {
                    _this.currentMsg = "";
                    var x = document.getElementById('focusRow');
                    x.focus();
                }, 500);
            });
        }
    };
    return MessageDetailPage;
}());
MessageDetailPage = __decorate([
    Component({
        selector: 'page-messagedetail',
        templateUrl: 'messagedetail.html'
    }),
    __metadata("design:paramtypes", [FriendService,
        NavController,
        CustomersService,
        LoadingController,
        NavParams,
        SocketService,
        Events])
], MessageDetailPage);
export { MessageDetailPage };
//# sourceMappingURL=messagedetail.js.map