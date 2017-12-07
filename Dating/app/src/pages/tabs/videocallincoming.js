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
import { NavController, NavParams, Events, LoadingController, Nav } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import { VideocallPage } from '../videocall/videocall';
import { CustomerPage } from '../customer/customer';
var VideoCallIncomingPage = (function () {
    function VideoCallIncomingPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl, nav) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.url = globalVariable;
        this.currentcall = navParams.get('callingto');
        this.call_resp = this.currentcall;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
    }
    VideoCallIncomingPage.prototype.ngOnInit = function () {
        this.getCustomer(this.currentcall.connectedTo);
        this.callAccepted();
        this.declineCall();
    };
    VideoCallIncomingPage.prototype.callAccepted = function () {
        this.socketService.callrecivedresponse().subscribe(function (data) {
            console.log("call Accepted user", data);
            //this.nav.setRoot(VideocallPage, {response : data});
        });
    };
    VideoCallIncomingPage.prototype.declineCall = function () {
        var _this = this;
        this.socketService.cancalvediocallresponse().subscribe(function (data) {
            console.log("call declined");
            _this.navCtrl.popTo(CustomerPage);
        });
    };
    VideoCallIncomingPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            _this.customer = data.message;
        });
    };
    VideoCallIncomingPage.prototype.customerImage = function (img) {
        var imgPath = "";
        if (img != null) {
            imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    VideoCallIncomingPage.prototype.receivemodel = function (action) {
        if (action == 'yes') {
            var obj1 = { status: true, share: this.call_resp };
            this.callreceived(obj1);
            this.call_resp = {};
            //this.close();
        }
        else {
            var obj2 = { status: false, share: this.call_resp };
            this.callreceived(obj2);
            this.call_resp = {};
            // this.close();
        }
    };
    VideoCallIncomingPage.prototype.callreceived = function (response) {
        if (response.status) {
            var nid = response.share.connectedTo;
            response.share.connectedTo = this.customerInfo._id;
            this.socketService.vediocallaccept(response);
            console.log("Connected user", response);
            //localStorage.setItem("searchedlist", JSON.stringify(window.location.href));
            //this.router.navigate(['customer/video-call/', response.share.sessionid, response.share.tokenid, nid]);           
            this.nav.setRoot(VideocallPage, { response: response });
        }
        else {
            response.share.connectedTo = this.customerInfo._id;
            this.socketService.vediocallaccept(response);
            this.navCtrl.popTo(CustomerPage);
        }
    };
    return VideoCallIncomingPage;
}());
VideoCallIncomingPage = __decorate([
    Component({
        selector: 'page-videocallincoming',
        templateUrl: 'videocallincoming.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CustomersService,
        FriendService,
        NavParams,
        SocketService,
        Events,
        LoadingController,
        Nav])
], VideoCallIncomingPage);
export { VideoCallIncomingPage };
//# sourceMappingURL=videocallincoming.js.map