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
var angular2_jwt_1 = require("angular2-jwt");
var globalVariable = require("../global");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    UserService.prototype.registerUser = function (user) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'users/', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.validateUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'users/userlogin', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getProfile = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.updateProfile = function (user) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'users/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.changePassword = function (user) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'users/changePassword/' + user.id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.forgotPassword = function (data) {
        return this.http.post(globalVariable.url + 'users/forgotPassword', data)
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.resetPassword = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'users/resetPassword/' + user._id, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.storeUser = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    UserService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    UserService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired('id_token');
    };
    UserService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map