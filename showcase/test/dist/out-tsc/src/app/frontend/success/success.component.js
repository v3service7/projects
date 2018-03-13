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
var router_1 = require("@angular/router");
var purchaseplan_service_1 = require("../../services/purchaseplan.service");
var SuccessComponent = (function () {
    function SuccessComponent(purchaseplanService, router, activatedRoute) {
        this.purchaseplanService = purchaseplanService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    SuccessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user._id);
        this.activatedRoute.queryParams.subscribe(function (params) {
            /*					 let paymentId = params['paymentId'];
                                let PayerID = params['PayerID'];
                                let token = params['token'];
                                console.log(paymentId);
                                console.log(PayerID);
                                console.log(token);*/
            var obj = {};
            obj['paymentId'] = params['paymentId'];
            obj['PayerID'] = params['PayerID'];
            obj['status'] = 'Success';
            obj['id'] = _this.user._id;
            if (params['paymentId'] != 'undefined' && params['PayerID'] != 'undefined' && params['token'] != 'undefined') {
                _this.purchaseplanService.getsuccess(params).subscribe(function (data) {
                    if (!data.error) {
                        _this.purchaseplanService.updatepuchaseplan(obj).subscribe(function (data) {
                            //console.log(data);
                        });
                    }
                }, function (err) {
                    console.log('kfgbhj');
                });
            }
        });
    };
    return SuccessComponent;
}());
SuccessComponent = __decorate([
    core_1.Component({
        selector: 'app-success',
        templateUrl: './success.component.html',
        styleUrls: ['./success.component.css']
    }),
    __metadata("design:paramtypes", [purchaseplan_service_1.PurchaseplanService,
        router_1.Router,
        router_1.ActivatedRoute])
], SuccessComponent);
exports.SuccessComponent = SuccessComponent;
//# sourceMappingURL=success.component.js.map