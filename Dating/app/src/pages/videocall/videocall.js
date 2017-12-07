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
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import * as globalVariable from "../../app/global";
import { CustomersService, SocketService, BannerService } from '../../app/service/index';
import { HomePage } from "../home/home";
var VideocallPage = (function () {
    function VideocallPage(navCtrl, diagnostic, navParams, nav, customerService, bannerService, socketService) {
        this.navCtrl = navCtrl;
        this.diagnostic = diagnostic;
        this.navParams = navParams;
        this.nav = nav;
        this.customerService = customerService;
        this.bannerService = bannerService;
        this.socketService = socketService;
        this.cameraSource = 0;
        this.apiKey = "46010992";
        this.url = globalVariable.url + 'uploads/';
        // banner variables
        this.banner = [];
        this.bannerImage = [];
        this.timeslot = [];
        this.timeslotImage = [];
        this.itemplayed = 0;
        this.itemplayedImage = 0;
        this.donebanner = [];
        this.donebannerImage = [];
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        //console.log(this.cid);  
        // Replace these values with those generated in your TokBox Account
        /*this.apiKey = "46010992";
          this.sessionId = "2_MX40NjAxMDk5Mn5-MTUxMjM4MjYxMTQxNn5JdVE5UmJYRnBlaFlQNEVzQU5hMVBQN3B-UH4";
          this.token = "T1==cGFydG5lcl9pZD00NjAxMDk5MiZzaWc9M2E2MWRjNTFiMmQ0ZTUwMWVkMjE3MTE2ODk4ZmU1MmYzZGUwYzMxNjpzZXNzaW9uX2lkPTJfTVg0ME5qQXhNRGs1TW41LU1UVXhNak00TWpZeE1UUXhObjVKZFZFNVVtSllSbkJsYUZsUU5FVnpRVTVoTVZCUU4zQi1VSDQmY3JlYXRlX3RpbWU9MTUxMjM4MjYxMSZub25jZT0wLjgwODcxNzg0MjgzMDM5OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTEyNDY5MDExJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";*/
        this.currentcall = this.navParams.get('response');
        this.sessionId = this.currentcall.share.sessionid;
        this.token = this.currentcall.share.tokenid;
        this.connectedTo = this.currentcall.share.connectedTo;
        this.loadAllTime();
        this.loadAllTimeImage();
        this.getCustomer();
    }
    VideocallPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var requestCameraCallback = function (isAvailable) { if (!isAvailable) {
            _this.diagnostic.requestCameraAuthorization();
        } };
        var requestMicrophoneaCallback = function (isAvailable) { if (!isAvailable) {
            _this.diagnostic.requestMicrophoneAuthorization();
        } };
        var errorCallback = function (e) { return console.error(e); };
        // Checks camera permissions
        this.diagnostic.isCameraAvailable().then(requestCameraCallback, errorCallback);
        // Checks microphone permissions
        this.diagnostic.isMicrophoneAuthorized().then(requestMicrophoneaCallback, errorCallback);
    };
    VideocallPage.prototype.ionViewWillUnload = function () {
        this.endCall();
    };
    VideocallPage.prototype.ngOnDestroy = function () {
        this.endCall();
        this.setNewTokboxToken();
    };
    VideocallPage.prototype.setNewTokboxToken = function () {
        this.customerService.changeTokboxToken(this.cid).subscribe(function (item) {
        });
    };
    VideocallPage.prototype.getCustomer = function () {
        var _this = this;
        this.customerService.getOneCustomer(this.cid).subscribe(function (customers) {
            // this.profile = customers.message; 
            //  this.token = customers.message.tokboxtoken;
            //console.log(customers.message.tokboxsessionid);
            _this.initializeSession();
        });
    };
    // Starts Call
    VideocallPage.prototype.initializeSession = function () {
        var _this = this;
        this.session = OT.initSession(this.apiKey, this.sessionId);
        // Subscribe to a newly created stream
        this.session.on('streamCreated', function (event) {
            _this.session.subscribe(event.stream, 'subscriber', {
                insertMode: 'append',
                resolution: '1280x720',
                showControls: false,
                width: '100%',
                height: '100%'
            });
        });
        var connectionCount = 0;
        this.session.on('connectionCreated', function (event) {
            _this.session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
            connectionCount++;
            console.log(connectionCount + ' connections.');
            if (event.connection.connectionId != _this.session.connection.connectionId) {
                _this.deductPackageCalls();
                _this.opencall();
                _this.opencallImage();
                console.log('Another client connected connectionCreated. ' + connectionCount + ' total.');
            }
            else {
                console.log('not any client connected. ');
            }
        });
        this.session.on('connectionDestroyed', function (event) {
            connectionCount--;
            _this.endCall();
            console.log(connectionCount + ' connections.');
        });
        this.session.on('sessionDisconnected', function (event) {
            console.log('Disconnected from the this.session.');
            document.getElementById('disconnectBtn').style.display = 'none';
            if (event.reason == 'networkDisconnected') {
                alert('Your network connection terminated.');
            }
        });
        this.session.on('streamCreated', function (event, error) {
            if (error) {
                console.log(error);
            }
            else {
                event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                //console.log(event)
                console.log('Subscriber added.');
            }
        });
        this.session.on('streamDestroyed', function (event) {
        });
        this.session.on('signal', function (event) {
            console.log("Signal event sent from connection " + event.from.id);
            console.log(event);
            var cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
            var nameAndMsg = event.data.split("@@");
            var name = '';
            if (nameAndMsg[0] == cusObj.firstname) {
                name = 'Me';
            }
            else {
                name = nameAndMsg[0];
            }
            var classs = event.from.connectionId === _this.session.connection.connectionId ? 'mine' : 'theirs';
            var nameAndMessage = '<div class="msg-panel ' + classs + '"><div class="username-text">' + name + ' : </div><div class="msg-text">' + nameAndMsg[1] + '</div></div>';
            var msgHistory = document.getElementById('msgHistory');
            msgHistory.innerHTML += nameAndMessage;
            //msgHistory.appendChild(nameAndMessage);
            //console.log(nameAndMessage);
            var list = document.querySelector("div#msgHistory");
            list.scrollTop = list.scrollHeight;
            document.getElementsByClassName("text-input")[0].value = "";
            document.getElementById("input-msg-text").value = "";
            _this.textMsg = "";
            //data.value = "";
        });
        // Connect to the session
        this.session.connect(this.token, function (error) {
            if (!error) {
                // Create a publisher
                _this.publisher = OT.initPublisher('publisher', {
                    insertMode: 'append',
                    resolution: '1280x720',
                    width: '100%',
                    height: '100%'
                });
                _this.session.publish(_this.publisher, function (error) {
                    if (error) {
                        console.log("Publisher error: " + error);
                    }
                });
            }
            else {
                alert('There was an error connecting to the session' + error.message);
            }
        });
    };
    VideocallPage.prototype.deductPackageCalls = function () {
        /* if(this.currentcall.share.connected == 'yes'){
             this.customerService.getOneCustomer(this.cid).subscribe(customers => {
                 console.log("customers caals");
                 if(customers.message.mypackage){
                     var calls = customers.message.mypackage.remaincalls - 1;
                     customers.message.mypackage.remaincalls = calls;
                     var newob = {_id : this.cid, mypackage : customers.message.mypackage}
                     this.customerService.updateCustomer(newob).subscribe((data) => {
                         console.log("data 22");
                     })
                 }
             });
         }     */
    };
    // Ends call
    VideocallPage.prototype.endCall = function () {
        if (!!this.session) {
            this.session.disconnect();
            this.nav.setRoot(HomePage);
        }
    };
    // Banner section
    VideocallPage.prototype.loadAllTime = function () {
        var _this = this;
        this.bannerService.getAllTime().subscribe(function (users) {
            console.log("users.message[0]");
            console.log(users.message[0]);
            if (users.message[0].bannertiming.length > 0) {
                _this.timeslot = users.message[0].bannertiming;
                _this.loadbanners('video');
            }
            else {
                _this.timeslot = [];
            }
        });
    };
    VideocallPage.prototype.loadAllTimeImage = function () {
        var _this = this;
        this.bannerService.getAllTimeImage().subscribe(function (users) {
            console.log("users.message[0] Image");
            console.log(users.message[0]);
            if (users.message[0].bannertiming.length > 0) {
                _this.timeslotImage = users.message[0].bannertiming;
                _this.loadbanners('image');
            }
            else {
                _this.timeslotImage = [];
            }
        });
    };
    VideocallPage.prototype.loadbanners = function (type) {
        var _this = this;
        var obj = { type: type };
        this.bannerService.getAllTypeBanner(obj).subscribe(function (banner) {
            console.log("banner" + type);
            console.log(banner);
            if (type == 'video') {
                _this.banner = banner.message;
            }
            else {
                _this.bannerImage = banner.message;
            }
        });
    };
    VideocallPage.prototype.openImage = function (random) {
        this.bannerImg = '';
        document.getElementById('mybannerimage').style.display = 'block';
        this.bannerImg = this.bannerImage[random];
    };
    VideocallPage.prototype.opencall = function () {
        console.log("opencall");
        var random = this.randno();
        console.log(this.donebanner.indexOf(random));
        /*if(this.donebanner.indexIf(random) != -1){}*/
        if (this.donebanner.length < this.timeslot.length) {
            //alert();
            this.setitem(random);
        }
    };
    VideocallPage.prototype.opencallImage = function () {
        console.log("bopencallqqqqq");
        if (this.donebannerImage.length < this.timeslotImage.length) {
            var random = this.randnoImage();
            this.setitemImage(random);
        }
    };
    VideocallPage.prototype.setitem = function (temp) {
        console.log("setItem");
        var random = temp;
        var find1 = this.donebanner.indexOf(random);
        if ((find1 != -1) && (this.donebanner.length != this.timeslot.length)) {
            random = this.opencall();
        }
        else {
            this.donebanner.push(random);
            this.repeatset(random);
        }
    };
    VideocallPage.prototype.setitemImage = function (temp) {
        var random = temp;
        var find1 = this.donebannerImage.indexOf(random);
        if ((find1 != -1) && (this.donebannerImage.length != this.timeslotImage.length)) {
            random = this.opencallImage();
        }
        else {
            this.donebannerImage.push(random);
            this.repeatsetImage(random);
        }
    };
    VideocallPage.prototype.repeatset = function (random) {
        var _this = this;
        console.log("repeat set");
        this.itemplayed = this.itemplayed + 1;
        var timesetout1 = (this.timeslot[this.itemplayed - 1].time * 1000);
        setTimeout(function () {
            _this.modelOpen(random);
            _this.vi();
        }, timesetout1);
    };
    VideocallPage.prototype.repeatsetImage = function (random) {
        var _this = this;
        console.log("repeat set image");
        this.itemplayedImage = this.itemplayedImage + 1;
        var timesetout = (this.timeslotImage[this.itemplayedImage - 1].time * 1000);
        setTimeout(function () {
            _this.openImage(random);
            // this.viImage();
            console.log(100);
        }, timesetout);
    };
    VideocallPage.prototype.randno = function () {
        var random = Math.floor(Math.random() * this.banner.length);
        console.log("randno" + random);
        return random;
    };
    VideocallPage.prototype.randnoImage = function () {
        var random = Math.floor(Math.random() * this.bannerImage.length);
        console.log("randno" + random);
        return random;
    };
    VideocallPage.prototype.sendMessageOnCall = function () {
        //alert("msg send");
        var data = this.textMsg;
        var username = JSON.parse(localStorage.getItem('currentCustomer')).username;
        console.log('name', username);
        this.session.signal({
            type: 'msg',
            data: username + '@@' + data
        }, function (error) {
            if (error) {
                console.log('Error sending signal:', error.name, error.message);
            }
            else {
                data = '';
            }
        });
        // this.msgList();
        /*(<HTMLInputElement>document.getElementById('btn-input')).value = "";
        data.value = "";*/
    };
    VideocallPage.prototype.close = function () {
        // Get the modal
        document.getElementById('myModalbanner').style.display = 'none';
    };
    VideocallPage.prototype.closeImage = function () {
        // Get the modal
        document.getElementById('mybannerimage').style.display = 'none';
    };
    VideocallPage.prototype.modelOpen = function (random) {
        this.bannervideo = '';
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        this.bannervideo = this.banner[random];
    };
    VideocallPage.prototype.modelClose = function () {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    };
    VideocallPage.prototype.vi = function () {
        var _this = this;
        setTimeout(function () {
            var vid = document.getElementById("myVideo");
            vid.onended = function () {
                _this.bannervideo = '';
                _this.modelClose();
                console.log(_this.donebanner.length, _this.timeslot.length);
                if (_this.donebanner.length < _this.timeslot.length) {
                    _this.opencall();
                }
            };
        }, 500);
    };
    VideocallPage.prototype.closeviImage = function () {
        var _this = this;
        setTimeout(function () {
            var vid = document.getElementById("mybannerimage");
            _this.bannerImg = '';
            _this.closeImage();
            if (_this.donebannerImage.length < _this.timeslotImage.length) {
                _this.opencallImage();
            }
        }, 500);
    };
    return VideocallPage;
}());
VideocallPage = __decorate([
    Component({
        selector: 'page-videocall',
        templateUrl: 'videocall.html',
        styleUrls: ["/videocall.scss"]
    }),
    __metadata("design:paramtypes", [NavController,
        Diagnostic,
        NavParams,
        Nav,
        CustomersService,
        BannerService,
        SocketService])
], VideocallPage);
export { VideocallPage };
//# sourceMappingURL=videocall.js.map