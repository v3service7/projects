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
import { CustomerPage } from './customer';
import { VideocallPage } from '../videocall/videocall';
var VideoCallOutgoingPage = (function () {
    function VideoCallOutgoingPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl, nav) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.url = globalVariable;
        this.publishedUser = {};
        this.apiKey = '46002262';
        this.currentcall = navParams.get('callingto');
        console.log("ff this.currentcall", this.currentcall);
    }
    VideoCallOutgoingPage.prototype.ngOnInit = function () {
        this.getCustomer(this.currentcall._id);
        this.callReceivedResponse();
    };
    VideoCallOutgoingPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            _this.customer = data.message;
            var sessionId = _this.customer.tokboxsessionid;
            var tokenId = _this.customer.tokboxtoken;
            var socketId = _this.customer.socketId;
            console.log(JSON.stringify(_this.customer));
        });
    };
    VideoCallOutgoingPage.prototype.callReceivedResponse = function () {
        var _this = this;
        this.socketService.callrecivedresponse().subscribe(function (resp) {
            console.log("callReceivedResponse", resp);
            if (resp["status"] == true) {
                _this.nav.setRoot(VideocallPage, { response: resp });
            }
            else {
                _this.navCtrl.popTo(CustomerPage);
            }
        });
    };
    VideoCallOutgoingPage.prototype.videocallcancel = function () {
        console.log("videocallcancel()");
        this.socketService.callcancel(this.currentcall);
        this.currentcall = {};
        /*Hide for Error*/
        this.navCtrl.popTo(CustomerPage);
        // this.navCtrl.pop(CustomerPage); 
    };
    VideoCallOutgoingPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    VideoCallOutgoingPage.prototype.initializeSession = function (sessionId, token) {
        var _this = this;
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, function (error) {
            if (!error) {
                var publisherProperties = { insertMode: "append" };
                var publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Publishing a stream.');
                    }
                });
            }
            else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: function (event) {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    /*this.deductPackageCalls();
                    this.opencall();
                    this.opencallImage();  */
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }
                else {
                    console.log('not any client connected. ');
                }
                /*session.signal(
                {
                    data:"hello"
                },
                (error) => {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");
                    }
                }
                );*/
            },
            connectionDestroyed: function (event) {
                connectionCount--;
                _this.disconnectcall();
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.');
                }
            },
            streamCreated: function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = { width: '100%', height: '100%', insertMode: "append" };
                var subscriber = session.subscribe(event.stream, 'subscriberContainer', subscriberProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                        //console.log(event)
                        console.log('Subscriber added.');
                    }
                });
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                            + 'or because the other party lost their connection.';
                        event.preventDefault(); // Prevent the Subscriber from being removed
                    }
                }
            },
            signal: function (event) {
                console.log("Signal sent from connection " + event.from.id);
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
                var msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name + ' : ' + msgggg;
                    msgHis.appendChild(msg);
                }
                var list = document.querySelector("div#msgHistory");
                list.scrollTop = list.scrollHeight;
            }
        });
    };
    VideoCallOutgoingPage.prototype.disconnectcall = function () {
        if (this.sessionOBJ) {
            this.sessionOBJ.disconnect();
            // this.disconnectOther(); 
            //this.router.navigate(['customer/allprofile']);    
        }
    };
    return VideoCallOutgoingPage;
}());
VideoCallOutgoingPage = __decorate([
    Component({
        selector: 'page-videocalldetail',
        templateUrl: 'videocalldetail.html'
    }),
    __metadata("design:paramtypes", [NavController,
        CustomersService,
        FriendService,
        NavParams,
        SocketService,
        Events,
        LoadingController,
        Nav])
], VideoCallOutgoingPage);
export { VideoCallOutgoingPage };
//# sourceMappingURL=videocalldetail.js.map