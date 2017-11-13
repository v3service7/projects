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
var DriversService = (function () {
    function DriversService(http) {
        this.http = http;
    }
    DriversService.prototype.addDriver = function (data) {
        return this.http.post(globalVariable.url + 'driver/', data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.updateDriver = function (data) {
        return this.http.put(globalVariable.url + 'driver/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'driver/')
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getRestaurantDrivers = function (id) {
        return this.http.get(globalVariable.url + 'restaurant-drivers/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.myOrder = function (id) {
        return this.http.get(globalVariable.url + 'order/driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    return DriversService;
}());
DriversService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DriversService);
export { DriversService };
//# sourceMappingURL=drivers.service.js.map