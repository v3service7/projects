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
var KitchenMenuService = (function () {
    function KitchenMenuService(http) {
        this.http = http;
    }
    KitchenMenuService.prototype.addUser = function (data) {
        return this.http.post(globalVariable.url + 'menu/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.updateMenu = function (data) {
        return this.http.put(globalVariable.url + 'menu/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAll = function (id) {
        return this.http.get(globalVariable.url + 'menu-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.adddetailAddOn = function (data) {
        return this.http.post(globalVariable.url + 'addon/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAllAddOn = function (id) {
        return this.http.get(globalVariable.url + 'addon-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupDetailEditser = function (id) {
        return this.http.get(globalVariable.url + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupRemove = function (id) {
        return this.http.delete(globalVariable.url + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupEditUpdate = function (data) {
        return this.http.put(globalVariable.url + 'addon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenMenuService;
}());
KitchenMenuService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], KitchenMenuService);
export { KitchenMenuService };
//# sourceMappingURL=kitchenmenu.service.js.map