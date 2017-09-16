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
import * as globalVariable from "../global";
var UsersService = (function () {
    //url: string = 'http://34.209.114.118:4003/users/';
    //url: string = 'http://localhost:4003/users/';
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.updateAdmin = function (data) {
        return this.http.put(globalVariable.url + 'users/' + 'admin/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addAdmin = function (data) {
        return this.http.post(globalVariable.url + 'users/' + 'admin/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addUser = function (data) {
        return this.http.post(globalVariable.url + 'users/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateUser = function (data) {
        return this.http.put(globalVariable.url + 'users/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAllAdmin = function () {
        return this.http.get(globalVariable.url + 'users/' + 'admin/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'users/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateOwnerPassword = function (data) {
        return this.http.put(globalVariable.url + 'users/' + 'change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAdminOne = function (id) {
        return this.http.get(globalVariable.url + 'users/' + '/admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteAdminOne = function (id) {
        return this.http.delete(globalVariable.url + 'users/' + 'admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    return UsersService;
}());
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map