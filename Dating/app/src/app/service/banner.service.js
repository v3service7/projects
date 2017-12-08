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
var BannerService = (function () {
    function BannerService(http) {
        this.http = http;
        this.url = 'http://localhost:4005/banner/';
    }
    BannerService.prototype.addUser = function (data) {
        return this.http.post(globalVariable.url + 'banner/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.updateUser = function (data) {
        return this.http.put(globalVariable.url + 'banner/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'banner/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'banner/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'banner/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTime = function () {
        return this.http.get(globalVariable.url + 'bannertime/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.addTiming = function (data) {
        return this.http.post(globalVariable.url + 'bannertime/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOneTime = function (id) {
        return this.http.delete(globalVariable.url + 'bannertime/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllrand = function (len) {
        return this.http.get(globalVariable.url + 'banner-rand/' + len)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.addTimingImage = function (data) {
        return this.http.post(globalVariable.url + 'bannertimeimage/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOneTimeImage = function (id) {
        return this.http.delete(globalVariable.url + 'bannertimeimage/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTimeImage = function () {
        return this.http.get(globalVariable.url + 'bannertimeimage/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTypeBanner = function (data) {
        return this.http.post(globalVariable.url + 'bannertype/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.updateBannerTime = function (data) {
        return this.http.put(globalVariable.url + 'bannertimeupdate/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return BannerService;
}());
BannerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BannerService);
export { BannerService };
//# sourceMappingURL=banner.service.js.map