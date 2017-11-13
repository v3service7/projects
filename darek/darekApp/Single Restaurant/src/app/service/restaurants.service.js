var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Manvi on 14-Apr-17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as globalVariable from "../global";
var RestaurantsService = (function () {
    function RestaurantsService(http) {
        this.http = http;
    }
    RestaurantsService.prototype.addRestaurant = function (data) {
        return this.http.post(globalVariable.url + 'restaurant/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateRestaurant = function (data) {
        return this.http.put(globalVariable.url + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUp = function (data) {
        return this.http.put(globalVariable.url + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateDelivery = function (data) {
        console.log("data");
        console.log(data);
        return this.http.put(globalVariable.url + 'delivery-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateNotification = function (data) {
        return this.http.put(globalVariable.url + 'restaurant-notification/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteNotification = function (id, index) {
        return this.http.delete(globalVariable.url + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getNotification = function (id, index) {
        return this.http.get(globalVariable.url + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editNotification = function (index, data) {
        return this.http.put(globalVariable.url + 'restaurant/notification/' + data._id + '/' + index, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUpHours = function (data) {
        return this.http.put(globalVariable.url + 'restaurant/' + data._id, data.result)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.activateMail = function (data) {
        return this.http.get(globalVariable.url + 'owners/mailactivate/' + data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.emailConfirm = function (data) {
        return this.http.post(globalVariable.url + 'owners/account-confirm/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateLocation = function (data) {
        return this.http.put(globalVariable.url + 'location-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.addDeliveryZone = function (data) {
        return this.http.post(globalVariable.url + 'deliveryzone/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.removeDeliveryZone = function (id) {
        return this.http.delete(globalVariable.url + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZone = function (id) {
        return this.http.get(globalVariable.url + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZoneUpdate = function (data) {
        return this.http.put(globalVariable.url + 'deliveryzone/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAllDeliveryZone = function (id) {
        console.log(id);
        return this.http.get(globalVariable.url + 'deliveryzones/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAll = function () {
        return this.http.get(globalVariable.url + 'restaurant/')
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOne = function (id) {
        return this.http.get(globalVariable.url + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOwnerRestaurants = function (id) {
        return this.http.get(globalVariable.url + 'owner-restaurants/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteOne = function (id) {
        return this.http.delete(globalVariable.url + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    return RestaurantsService;
}());
RestaurantsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RestaurantsService);
export { RestaurantsService };
//# sourceMappingURL=restaurants.service.js.map