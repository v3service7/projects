var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, Events, LoadingController, Nav, AlertController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import { CustomerDetailPage } from './customerdetail';
import { VideoCallOutgoingPage } from './videocalldetail';
import { MessageDetailPage } from '../messages/messagedetail';
var CustomerPage = (function () {
    function CustomerPage(navCtrl, customerService, friendService, socketService, events, nav, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.socketService = socketService;
        this.events = events;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.url = globalVariable;
        this.friends = [];
        this.customersL = [];
        this.customers = [];
        this.changeSomething = new EventEmitter();
        this.myonline = [];
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            console.log(this.customerInfo);
        }
        this.getAllAllow();
    }
    CustomerPage.prototype.ngOnInit = function () {
        this.customersL = this.customers;
        console.log("this.customers");
        console.log(this.customers);
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
        //this.getCustomer(this._id);
    };
    CustomerPage.prototype.ionViewDidEnter = function () {
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
    };
    CustomerPage.prototype.onlinenew = function () {
        var _this = this;
        this.socketService.onlineList2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 1");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.onlinenew2 = function () {
        var _this = this;
        this.socketService.onlineListon2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 2");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.onlinenew3 = function () {
        var _this = this;
        this.socketService.onlineList3().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 3");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.offlinenew2 = function () {
        var _this = this;
        this.socketService.offline2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 4");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.getAllAllow = function () {
        var _this = this;
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(function (data) {
            _this.friends = data.message;
        });
    };
    CustomerPage.prototype.SomeEvent = function () {
        this.getAllAllow();
        this.changeSomething.emit('complete');
    };
    CustomerPage.prototype.checkforinvite = function (id) {
        var index1 = this.friends.findIndex(function (item) { return item.FromId._id == id; });
        var index2 = this.friends.findIndex(function (item) { return item.ToId._id == id; });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    /* Some Action on list Accept  */
    CustomerPage.prototype.acceptrequest = function (id, pid) {
        var _this = this;
        var friendobj = { _id: id, status: 1 };
        this.friendService.updateFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.deleteBlock = function (id) {
        var _this = this;
        this.friendService.deleteOne(id).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.unblockrequest = function (data, type) {
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
    CustomerPage.prototype.selectNewChat = function (id) {
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
    CustomerPage.prototype.requestFromTo = function (from, to, type) {
        var obj = { FromId: from, ToId: to, title: type };
        this.SomeEvent();
    };
    CustomerPage.prototype.sendRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 0 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.checkblock = function (id) {
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
    CustomerPage.prototype.anyBlockRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 4 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    /*private getCustomer(id){
    this.customerService.getOneCustomer(id).subscribe(cust=>{
    this.customer = cust.message;
    });
    }*/
    CustomerPage.prototype.deatilPage = function (id) {
        /*localStorage.setItem('id',id);*/
        this.navCtrl.push(CustomerDetailPage, {
            id: id
        });
    };
    CustomerPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null || img == "") {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    CustomerPage.prototype.videoCallConfirmbox = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Video Call',
            message: "Are you agree to make Video call?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.vediocall(id);
                    }
                }
            ]
        });
        prompt.present();
    };
    /* Video call */
    CustomerPage.prototype.vediocall = function (id) {
        console.log("vediocall send");
        this.currentcall = { _id: id, cid: this.customerInfo._id };
        this.socketService.video(this.currentcall);
        this.navCtrl.push(VideoCallOutgoingPage, {
            callingto: this.currentcall
        });
    };
    return CustomerPage;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], CustomerPage.prototype, "customers", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CustomerPage.prototype, "changeSomething", void 0);
CustomerPage = __decorate([
    Component({
        selector: 'page-customer',
        templateUrl: 'customer.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CustomersService,
        FriendService,
        SocketService,
        Events,
        Nav,
        LoadingController,
        AlertController])
], CustomerPage);
export { CustomerPage };
//# sourceMappingURL=customer.js.map