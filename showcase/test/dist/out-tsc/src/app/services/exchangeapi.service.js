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
var ExchangeapiService = (function () {
    function ExchangeapiService(http) {
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
    ExchangeapiService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    ExchangeapiService.prototype.exchangeapiList = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchangeapi', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeapiService.prototype.exchangeapi = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'exchangeapi/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeapiService.prototype.exchangeapiAdd = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'exchangeapi', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeapiService.prototype.exchangeapiUpdate = function (data) {
        console.log(data);
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'exchangeapi/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    ExchangeapiService.prototype.exchangeapiDelete = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'exchangeapi/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return ExchangeapiService;
}());
ExchangeapiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ExchangeapiService);
exports.ExchangeapiService = ExchangeapiService;
//# sourceMappingURL=exchangeapi.service.js.map