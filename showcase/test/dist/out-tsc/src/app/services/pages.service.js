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
var PagesService = (function () {
    function PagesService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    PagesService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    };
    PagesService.prototype.pageList = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'page', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.page = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'page/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageAdd = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'page', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageUpdate = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'page/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PagesService.prototype.pageDelete = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'page/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return PagesService;
}());
PagesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PagesService);
exports.PagesService = PagesService;
//# sourceMappingURL=pages.service.js.map