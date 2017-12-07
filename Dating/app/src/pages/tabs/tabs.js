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
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { FriendPage } from '../friend/friend';
import { MessagesPage } from '../messages/messages';
import { ProfilePage } from '../profile/profile';
import { VideoCallIncomingPage } from './videocallincoming';
import { NavController } from 'ionic-angular';
import { SocketService, CustomersService } from '../../app/service/index';
var TabsPage = (function () {
    function TabsPage(socketService, customerService, events, navCtrl) {
        this.socketService = socketService;
        this.customerService = customerService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.unreadMessages = [];
        this.unreadMessagesCount = 0;
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = MessagesPage;
        this.tab4Root = FriendPage;
        this.tab5Root = ProfilePage;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
    }
    TabsPage.prototype.ionViewDidLoad = function () { };
    TabsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.initfuntion();
        this.events.subscribe('messages:badgecounter', function (time) {
            setTimeout(function () {
                _this.initfuntion();
            }, 3000);
        });
    };
    TabsPage.prototype.initfuntion = function () {
        this.myMessage();
        this.messageReceived();
        this.tokboxNewReqReceive();
    };
    TabsPage.prototype.myMessage = function () {
        var _this = this;
        this.unreadMessagesCount = 0;
        this.unreadMessages = [];
        this.customerService.unreadMessage(this.customerInfo._id).subscribe(function (messages) {
            _this.unreadMessages = messages.message;
            if (_this.unreadMessages.length > 0) {
                for (var i = 0; i < _this.unreadMessages.length; i++) {
                    var unread = 0;
                    for (var j = 0; j < _this.unreadMessages[i]['messages'].length; j++) {
                        if (!_this.unreadMessages[i]['messages'][j].isread) {
                            _this.unreadMessagesCount += 1;
                            unread++;
                        }
                        _this.unreadMessages[i]['unreadMessage'] = unread;
                    }
                }
            }
            console.log("messages unreda");
            console.log(_this.unreadMessages);
        });
    };
    TabsPage.prototype.messageReceived = function () {
        var _this = this;
        this.socketService.receiveMessages().subscribe(function (response) {
            console.log("received message on tab");
            console.log(response);
            _this.unreadMessagesCount += 1;
            _this.events.publish('messages:receivedmsg', response, Date.now());
        });
    };
    TabsPage.prototype.tokboxNewReqReceive = function () {
        var _this = this;
        this.socketService.vedioResponse().subscribe(function (response) {
            console.log('New Video Call');
            _this.call_resp = response;
            _this.navCtrl.push(VideoCallIncomingPage, { callingto: _this.call_resp });
        });
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [SocketService,
        CustomersService,
        Events,
        NavController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map