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
var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
    }
    FriendService.prototype.addFriend = function (data) {
        return this.http.post(globalVariable.url + 'friend/', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateFriend = function (data) {
        return this.http.put(globalVariable.url + 'friend/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateacceptblockFriend = function (data) {
        return this.http.post(globalVariable.url + 'friend/' + 'accept-block', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.acceptFriendList = function (data) {
        return this.http.post(globalVariable.url + 'friend/' + 'requiest-accept', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.blockFriendList = function (data) {
        return this.http.post(globalVariable.url + 'friend/requiest-block', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'friend/')
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllRequiestNotInSelf = function (id) {
        return this.http.post(globalVariable.url + 'friend/' + 'getAllRequiestNotInSelf/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllSendRequistMe = function (id) {
        return this.http.post(globalVariable.url + 'friend/' + 'getAllSendRequistMe/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllRequiestAcceptSelf = function (id) {
        return this.http.post(globalVariable.url + 'friend/' + 'getAllRequiestAcceptSelf/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllAcceptRequistMe = function (id) {
        return this.http.post(globalVariable.url + 'friend/' + 'getAllAcceptRequistMe/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'friend/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'friend/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllFriendAllow = function (id) {
        return this.http.get(globalVariable.url + 'friend/' + '/customer-list-allow/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.findForDelete = function (data) {
        return this.http.post(globalVariable.url + 'friend/for-delete/', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.myfriends = function (data) {
        return this.http.post(globalVariable.url + 'friend/myfriends', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.mypendingrequest = function (data) {
        return this.http.post(globalVariable.url + 'friend/mypendingrequest', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.myblocked = function (data) {
        return this.http.post(globalVariable.url + 'friend/myblocked', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateFriendunlock = function (data) {
        return this.http.post(globalVariable.url + 'friend/myunblocked', data)
            .map(function (response) { return response.json(); });
    };
    return FriendService;
}());
FriendService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], FriendService);
export { FriendService };
//# sourceMappingURL=friend.service.js.map