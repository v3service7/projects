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
var globalVariable = require("../global");
var ExchangeService = (function () {
    function ExchangeService(http) {
        this.http = http;
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    }
    ExchangeService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    ExchangeService.prototype.customerexchangeList = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchange/custexchange/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeService.prototype.exchangeList = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchange', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeService.prototype.exchange = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchange/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeService.prototype.exchangeAdd = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'exchange', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeService.prototype.exchangeUpdate = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'exchange/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeService.prototype.exchangeDelete = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'exchange/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return ExchangeService;
}());
ExchangeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ExchangeService);
exports.ExchangeService = ExchangeService;
//# sourceMappingURL=exchange.service.js.map