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
var CustomersService = (function () {
    function CustomersService(http) {
        this.http = http;
    }
    CustomersService.prototype.getCustomer = function (data) {
        return this.http.post(globalVariable.url + 'customer/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.getOneCustomer = function (id) {
        return this.http.get(globalVariable.url + 'customer/' + id)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getLatLng = function (data) {
        return this.http.post(globalVariable.url + 'customer/add-lat-lng', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.customerLogout = function (id) {
        localStorage.removeItem(id);
    };
    CustomersService.prototype.addCustomer = function (data) {
        console.log(data);
        return this.http.post(globalVariable.url + 'customer/register', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.updateCustomer = function (data) {
        return this.http.put(globalVariable.url + 'customer/update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.forgetPassword = function (data) {
        return this.http.post(globalVariable.url + 'customer/forget-pass', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.addOrder = function (data) {
        return this.http.post(globalVariable.url + 'order/add', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.orderPlaced = function (data) {
        return this.http.post(globalVariable.url + 'order/order-placed', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.changePassword = function (data) {
        return this.http.put(globalVariable.url + 'customer/change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return CustomersService;
}());
CustomersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], CustomersService);
export { CustomersService };
//# sourceMappingURL=customer.service.js.map