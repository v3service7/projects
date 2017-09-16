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
var KitchenItemService = (function () {
    function KitchenItemService(http) {
        this.http = http;
    }
    KitchenItemService.prototype.addUser = function (data) {
        return this.http.post(globalVariable.url + 'item/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenu = function (data) {
        return this.http.put(globalVariable.url + 'item/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenuAddOn = function (data) {
        return this.http.put(globalVariable.url + 'itemaddon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'item/')
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAllItems = function (id) {
        return this.http.get(globalVariable.url + 'item-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeAddOnToSubmenu = function (data) {
        return this.http.delete(globalVariable.url + 'itemaddon/' + data._id + '/' + data.indexi)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editAddOnToSubmenu = function (data) {
        return this.http.get(globalVariable.url + 'itemaddon/' + data.id + '/' + data.submenuid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateEditMenuAddOn = function (data) {
        return this.http.put(globalVariable.url + 'itemaddonedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.addChoice = function (data) {
        return this.http.put(globalVariable.url + 'addonchoice/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeChoice = function (data) {
        return this.http.delete(globalVariable.url + 'addonchoice/' + data._id + '/' + data.index)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getEditChoice = function (data) {
        return this.http.get(globalVariable.url + 'addonchoice/' + data.id + '/' + data.cid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editSubAddOnUpdate = function (data) {
        return this.http.put(globalVariable.url + 'addonchoiceedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenItemService;
}());
KitchenItemService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], KitchenItemService);
export { KitchenItemService };
//# sourceMappingURL=kitchenitem.service.js.map