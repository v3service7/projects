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
var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
    }
    OrderService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'order/')
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.overview = function (id) {
        return this.http.get(globalVariable.url + 'reporting/overview/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.client = function (id) {
        return this.http.get(globalVariable.url + 'reporting/client/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.orders = function (id) {
        return this.http.get(globalVariable.url + 'reporting/list/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getMethodChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/method/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getResultChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/results/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getTypeChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/type/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getPaymentChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/payment/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/items/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getAllSaleChart = function (id, days) {
        return this.http.get(globalVariable.url + 'reporting/all-sale/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemCategoryChart = function (data) {
        return this.http.get(globalVariable.url + 'reporting/item-category/' + data.id + '/' + data.menuid + '/' + data.days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getDetail = function (id) {
        return this.http.get(globalVariable.url + 'order/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getUpdate = function (data) {
        return this.http.put(globalVariable.url + 'order/update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return OrderService;
}());
OrderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], OrderService);
export { OrderService };
//# sourceMappingURL=order.service.js.map