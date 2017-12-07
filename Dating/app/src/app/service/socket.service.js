var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
/*npm install @types/socket.io-client --save*/
//import * as io from 'socket.io-client';
import { Socket } from 'ng-socket-io';
var SocketService = (function () {
    function SocketService(http, socket) {
        this.http = http;
        this.socket = socket;
    }
    SocketService.prototype.customerOnline = function () {
        console.log(this.socket.ioSocket.id);
        if (this.socket.ioSocket.id) {
            if (localStorage.getItem('currentCustomer')) {
                var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
                var sid = this.socket.ioSocket.id;
                var obj = { fromId: currentCustomer._id, fromSocketId: sid };
                console.log('obj', obj);
                this.socket.emit('iamonline', obj);
            }
        }
    };
    SocketService.prototype.checkconnection = function () {
        return this.socket.ioSocket.connected;
    };
    /*before customerOnline2*/
    SocketService.prototype.onReloadCustomerOnline = function () {
        var _this = this;
        setTimeout(function () {
            if (localStorage.getItem('currentCustomer')) {
                var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
                var sid = _this.socket.ioSocket.id;
                var obj = { fromId: currentCustomer._id, fromSocketId: sid };
                _this.socket.emit('iamonline2', obj);
            }
        }, 2000);
    };
    SocketService.prototype.customerOffline = function () {
        if (localStorage.getItem("currentCustomer")) {
            var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            var sid = this.socket.ioSocket.id;
            var obj = { fromId: currentCustomer._id, fromSocketId: sid };
            this.socket.emit('iamoffline', obj);
            localStorage.removeItem('currentCustomer');
        }
    };
    SocketService.prototype.onlineList = function () {
        var _this = this;
        this.removelisner();
        var observable = new Observable(function (observer) {
            _this.socket.on('chat-list-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineListon2 = function () {
        var _this = this;
        //this.removelisner5();     
        var observable = new Observable(function (observer) {
            _this.socket.on('chat-list-response-online2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.offline2 = function () {
        var _this = this;
        this.removelisner6();
        var observable = new Observable(function (observer) {
            _this.socket.on('offline2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineList2emit = function () {
        var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        var obj1 = { cid: currentCustomer };
        this.socket.emit('getAllonline', obj1);
    };
    SocketService.prototype.onlineList2 = function () {
        var _this = this;
        this.removelisner2();
        var observable = new Observable(function (observer) {
            _this.socket.on('chat-list-response2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineList3emit = function () {
        var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        var obj1 = { cid: currentCustomer };
        this.socket.emit('getAllonline3', obj1);
    };
    SocketService.prototype.onlineList3 = function () {
        var _this = this;
        this.removelisner7();
        var observable = new Observable(function (observer) {
            _this.socket.on('chat-list-response3', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.disconnect = function () {
        if (this.socket.ioSocket.connected == true) {
            this.socket.disconnect();
        }
    };
    SocketService.prototype.selectForChat = function (userId, myid) {
        this.socket.emit('select-for-chat', { cid: userId, resid: myid });
    };
    SocketService.prototype.selectForChatResponse = function () {
        var _this = this;
        this.removelisner3();
        var observable = new Observable(function (observer) {
            _this.socket.on('select-for-chat-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    SocketService.prototype.receiveMessages = function () {
        var _this = this;
        this.removelisner4();
        var observable = new Observable(function (observer) {
            _this.socket.on('add-message-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.video = function (data) {
        this.socket.emit('add-vedio', data);
    };
    SocketService.prototype.vedioResponse = function () {
        var _this = this;
        this.removelisner9();
        var observable = new Observable(function (observer) {
            _this.socket.on('vedio-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.vediocallaccept = function (data) {
        this.socket.emit('add-vedio-accept', data);
    };
    SocketService.prototype.callrecivedresponse = function () {
        var _this = this;
        this.removelisner8();
        var observable = new Observable(function (observer) {
            _this.socket.on('callrecivedresponse', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.callcancel = function (data) {
        console.log("callcaneccallcanec");
        console.log(data);
        this.socket.emit('cancel-vedio-call', data);
    };
    SocketService.prototype.cancalvediocallresponse = function () {
        var _this = this;
        this.removelisner10();
        var observable = new Observable(function (observer) {
            _this.socket.on('cancel-vedio-call-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.liveBrodcast = function (data) {
        console.log("liveBrodcast");
        this.socket.emit("live-broadcast", data);
    };
    SocketService.prototype.viewby = function (data) {
        this.socket.emit("viewby", data);
    };
    SocketService.prototype.viewbyResponse = function () {
        var _this = this;
        this.removelisner14();
        var observable = new Observable(function (observer) {
            _this.socket.on('viewby-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.liveBrodcastResponse = function () {
        var _this = this;
        this.removelisner11();
        var observable = new Observable(function (observer) {
            _this.socket.on('live-broadcast-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.speeddatingvideo = function (data) {
        this.socket.emit('speed-dating-video', data);
    };
    SocketService.prototype.speeddatingResponse = function () {
        var _this = this;
        this.removelisner13();
        var observable = new Observable(function (observer) {
            _this.socket.on('speed-dating-video-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.removelisner = function () {
        this.socket.removeAllListeners("chat-list-response");
    };
    SocketService.prototype.removelisner2 = function () {
        this.socket.removeAllListeners("chat-list-response2");
    };
    SocketService.prototype.removelisner3 = function () {
        this.socket.removeAllListeners("select-for-chat-response");
    };
    SocketService.prototype.removelisner4 = function () {
        this.socket.removeListener("add-message-response");
    };
    SocketService.prototype.removelisner5 = function () {
        this.socket.removeAllListeners("chat-list-response-online2");
    };
    SocketService.prototype.removelisner6 = function () {
        this.socket.removeAllListeners("offline2");
    };
    SocketService.prototype.removelisner7 = function () {
        this.socket.removeAllListeners("chat-list-response3");
    };
    SocketService.prototype.removelisner8 = function () {
        this.socket.removeAllListeners("callrecivedresponse");
    };
    SocketService.prototype.removelisner9 = function () {
        this.socket.removeAllListeners("vedio-response");
    };
    SocketService.prototype.removelisner10 = function () {
        this.socket.removeAllListeners("cancel-vedio-call-response");
    };
    SocketService.prototype.removelisner11 = function () {
        this.socket.removeAllListeners("live-broadcast-response");
    };
    SocketService.prototype.removelisner12 = function () {
        this.socket.removeAllListeners("disconnect-to-other-response");
    };
    SocketService.prototype.removelisner13 = function () {
        this.socket.removeAllListeners("speed-dating-video-response");
    };
    SocketService.prototype.removelisner14 = function () {
        this.socket.removeAllListeners("viewby-response");
    };
    return SocketService;
}());
SocketService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Socket])
], SocketService);
export { SocketService };
//# sourceMappingURL=socket.service.js.map