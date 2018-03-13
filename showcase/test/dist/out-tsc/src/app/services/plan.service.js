"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var globalVariable = require("../global");
var PlanService = (function () {
    function PlanService(http) {
        this.http = http;
        var token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
    PlanService.prototype.loadToken = function () {
        if (localStorage.getItem('id_token_admin')) {
            var token = localStorage.getItem('id_token_admin');
            this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            var token = localStorage.getItem('id_token');
            this.authToken = token;
        }
    };
    PlanService.prototype.planList = function () {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'plan', { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.plan = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'plan/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planAdd = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'plan', data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planUpdate = function (data) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'plan/' + data._id, data, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    PlanService.prototype.planDelete = function (id) {
        var headers = new http_1.Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'plan/' + id, { headers: headers })
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return PlanService;
}());
PlanService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PlanService);
exports.PlanService = PlanService;
//# sourceMappingURL=plan.service.js.map