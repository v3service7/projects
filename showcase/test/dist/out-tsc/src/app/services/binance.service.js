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
var BinanceService = (function () {
    function BinanceService(http, socket) {
        this.http = http;
        this.socket = socket;
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    BinanceService.prototype.reConnect = function () {
        var _this = this;
        this.socket.disconnect();
        setTimeout(function () {
            _this.socket.connect();
        }, 3000);
    };
    BinanceService.prototype.getAuthenticate = function (data) {
        return this.http.post(globalVariable.url + 'binance/authenticate', data)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.getBalance = function () {
        return this.http.get(globalVariable.url + 'binance/balances')
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.getCurrency = function () {
        return this.http.get(globalVariable.url + 'binance/prices')
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.buyLimit = function (coin, form) {
        return this.http.get(globalVariable.url + 'binance/trade-buy-limit?symbol=' + coin + '&quantity=' + form.buy + '&price=' + form.price)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.sellLimit = function (coin, form) {
        return this.http.get(globalVariable.url + 'binance/trade-sell-limit?symbol=' + coin + '&quantity=' + form.receive + '&price=' + form.price)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.buy = function (coin, form) {
        return this.http.get(globalVariable.url + 'binance/trade-buy?symbol=' + coin + '&quantity=' + form.buy)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.sell = function (coin, form) {
        return this.http.get(globalVariable.url + 'binance/trade-sell?symbol=' + coin + '&quantity=' + form.receive)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.getOpenOrder = function (coin) {
        return this.http.get(globalVariable.url + 'binance/trade-all-order?symbol=' + coin)
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    BinanceService.prototype.getMarketName = function (data) {
        this.socket.emit('binanceMarketName', data);
    };
    BinanceService.prototype.getMarketSummary = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('binanceMarketSummary', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    BinanceService.prototype.getAlertNotify = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('binanceAlert', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    BinanceService.prototype.getMarketHistory = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('binanceMarketHistory', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return BinanceService;
}());
BinanceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, ng_socket_io_1.Socket])
], BinanceService);
exports.BinanceService = BinanceService;
//# sourceMappingURL=binance.service.js.map