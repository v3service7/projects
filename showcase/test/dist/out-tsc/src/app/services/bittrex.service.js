"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Observable_1 = require("rxjs/Observable");
var ng_socket_io_1 = require("ng-socket-io");
var globalVariable = require("../global");
var BittrexService = (function () {
    function BittrexService(http, socket) {
        this.http = http;
        this.socket = socket;
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    BittrexService.prototype.customerOnline = function () {
        if (typeof this.socket.ioSocket.id !== 'undefined') {
            console.log(this.socket.ioSocket);
        }
    };
    BittrexService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    BittrexService.prototype.getMarketName = function (data) {
        this.socket.emit('marketName', data);
    };
    BittrexService.prototype.getMarketSummary = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('getmarketsummary', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    BittrexService.prototype.getMarketHistory = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('getmarkethistory', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    BittrexService.prototype.getMarkets = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchangeapi', { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BittrexService.prototype.getCurrency = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('allCurrency', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    BittrexService.prototype.tradeSell = function () {
        var data = {
            marketName: 'BTC-ZEC',
            quantity: 1.00000000,
            rate: 0.04423432
        };
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'bittrexApi/tradesell', data, { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    return BittrexService;
}());
BittrexService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, ng_socket_io_1.Socket])
], BittrexService);
exports.BittrexService = BittrexService;
//# sourceMappingURL=bittrex.service.js.map