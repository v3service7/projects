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
var MasterService = (function () {
    function MasterService(http) {
        this.http = http;
    }
    MasterService.prototype.addLanguage = function (data) {
        return this.http.post(globalVariable.url + 'language/', data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.updateLanguage = function (data) {
        return this.http.put(globalVariable.url + 'language/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getAllLanguage = function () {
        return this.http.get(globalVariable.url + 'language/')
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getOneLanguage = function (id) {
        return this.http.get(globalVariable.url + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.deleteOneLanguage = function (id) {
        return this.http.delete(globalVariable.url + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    return MasterService;
}());
MasterService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], MasterService);
export { MasterService };
//# sourceMappingURL=master.service.js.map