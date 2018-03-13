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
var CancelComponent = (function () {
    function CancelComponent(purchaseplanService, router, activatedRoute) {
        this.purchaseplanService = purchaseplanService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    CancelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.activatedRoute.params.subscribe(function (params) {
            var obj = {};
            obj['status'] = 'Failed';
            obj['id'] = _this.user._id;
            _this.purchaseplanService.getsuccess(params).subscribe(function (data) {
                if (!data.error) {
                    _this.purchaseplanService.updatepuchaseplan(obj).subscribe(function (data) {
                        //console.log(data);
                    });
                }
            }, function (err) {
                console.log('kfgbhj');
            });
        });
    };
    return CancelComponent;
}());
CancelComponent = __decorate([
    core_1.Component({
        selector: 'app-cancel',
        templateUrl: './cancel.component.html',
        styleUrls: ['./cancel.component.css']
    }),
    __metadata("design:paramtypes", [purchaseplan_service_1.PurchaseplanService,
        router_1.Router,
        router_1.ActivatedRoute])
], CancelComponent);
exports.CancelComponent = CancelComponent;
//# sourceMappingURL=cancel.component.js.map