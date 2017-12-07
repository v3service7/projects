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
import { NavController, LoadingController, Events } from 'ionic-angular';
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import * as globalVariable from "../../app/global";
import { MessageDetailPage } from "./messagedetail";
var MessagesPage = (function () {
    function MessagesPage(friendService, navCtrl, customerService, loadingCtrl, socketService, events) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.socketService = socketService;
        this.events = events;
        this.unreadMessages = [];
        this.url = globalVariable;
    }
    MessagesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myMessage();
        }
        this.events.subscribe('messages:receivedmsg', function (msg, time) {
            _this.myMessage();
        });
    };
    MessagesPage.prototype.myMessage = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.unreadMessage(this.customerInfo._id).subscribe(function (messages) {
            _this.unreadMessages = messages.message;
            _this.loading.dismiss();
            if (_this.unreadMessages.length > 0) {
                for (var i = 0; i < _this.unreadMessages.length; i++) {
                    var unread = 0;
                    for (var j = 0; j < _this.unreadMessages[i]['messages'].length; j++) {
                        if (!_this.unreadMessages[i]['messages'][j].isread) {
                            unread++;
                        }
                        _this.unreadMessages[i]['unreadMessage'] = unread;
                    }
                }
            }
        });
    };
    MessagesPage.prototype.background = function (unreadMessage) {
        if (unreadMessage > 0) {
            return { 'background': '#d6ecff', 'font-weight': '600' };
        }
        else {
            return { 'background': 'white' };
        }
    };
    MessagesPage.prototype.doRefresh = function (refresher) {
        this.myMessage();
        refresher.complete();
    };
    MessagesPage.prototype.senderPic = function (pic) {
        var imagePath;
        if (typeof pic == "undefined") {
            imagePath = "assets/images/face3.png";
        }
        else {
            imagePath = this.url + pic;
        }
        return imagePath;
    };
    MessagesPage.prototype.selectChat = function (message) {
        var _this = this;
        var messageObj = {};
        this.customerService.getOneCustomer(message.id._id).subscribe(function (data) {
            messageObj['id'] = data.message;
            localStorage.setItem("currentChat", JSON.stringify(data.message));
            _this.events.publish('messages:badgecounter', Date.now());
            var obj = { fromCustId: data.message, toCustId: _this.customerInfo._id };
            _this.customerService.getmessage(obj).subscribe(function (data1) {
                messageObj['messages'] = data1.message;
                _this.navCtrl.push(MessageDetailPage, {
                    message: messageObj
                });
            });
        });
    };
    return MessagesPage;
}());
MessagesPage = __decorate([
    Component({
        selector: 'page-messages',
        templateUrl: 'messages.html'
    }),
    __metadata("design:paramtypes", [FriendService,
        NavController,
        CustomersService,
        LoadingController,
        SocketService,
        Events])
], MessagesPage);
export { MessagesPage };
//# sourceMappingURL=messages.js.map