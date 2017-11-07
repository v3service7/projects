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
import 'rxjs/add/operator/map';
import * as globalVariable from "../global";
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.getUser = function (data) {
        return this.http.post(globalVariable.url + 'users/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwner = function (data) {
        return this.http.post(globalVariable.url + 'owners/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwnerById = function (id) {
        return this.http.get(globalVariable.url + 'users/' + id)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.ownerLogout = function () {
        localStorage.removeItem('currentOwner');
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.getStatus = function () {
        return this.http.get(globalVariable.url + 'status');
    };
    AuthService.prototype.resetPassword = function (id, data) {
        return this.http.put(globalVariable.url + 'owners/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.resetAdminPassword = function (id, data) {
        return this.http.put(globalVariable.url + 'users/admin/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPassword = function (data) {
        return this.http.post(globalVariable.url + 'owners/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPasswordAdmin = function (data) {
        return this.http.post(globalVariable.url + 'users/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map