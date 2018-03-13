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
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var ForgotComponent = (function () {
    function ForgotComponent(flashMessage, userService, router) {
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
    }
    ForgotComponent.prototype.ngOnInit = function () {
        if (this.userService.loggedIn()) {
            this.router.navigate(['profile']);
        }
    };
    ForgotComponent.prototype.forgotPassword = function () {
        var _this = this;
        var user = {
            email: this.email
        };
        this.userService.forgotPassword(user).subscribe(function (data) {
            if (!data.error) {
                _this.flashMessage.show("Please check your email to reset the password", { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    return ForgotComponent;
}());
ForgotComponent = __decorate([
    core_1.Component({
        selector: 'app-forgot',
        templateUrl: './forgot.component.html',
        styleUrls: ['./forgot.component.css']
    }),
    __metadata("design:paramtypes", [angular2_flash_messages_1.FlashMessagesService,
        user_service_1.UserService,
        router_1.Router])
], ForgotComponent);
exports.ForgotComponent = ForgotComponent;
var ResetComponent = (function () {
    function ResetComponent(flashMessage, userService, router, route) {
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
        this.route = route;
    }
    ResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    ResetComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.password == this.cpassword) {
            var usrObj = {};
            usrObj['_id'] = this.id;
            usrObj['password'] = this.password;
            this.userService.resetPassword(usrObj).subscribe(function (data) {
                if (!data.error) {
                    _this.flashMessage.show(data.message, {
                        cssClass: 'alert-success',
                        timeout: 5000
                    });
                    _this.router.navigate(['/login']);
                }
                else {
                    _this.flashMessage.show('Something Went Wrong', { cssClass: 'alert-danger', timeout: 5000 });
                }
            });
        }
        else {
            this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 5000 });
            return false;
        }
    };
    return ResetComponent;
}());
ResetComponent = __decorate([
    core_1.Component({
        selector: 'app-reset',
        templateUrl: './reset.component.html',
        styleUrls: ['./forgot.component.css']
    }),
    __metadata("design:paramtypes", [angular2_flash_messages_1.FlashMessagesService,
        user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute])
], ResetComponent);
exports.ResetComponent = ResetComponent;
//# sourceMappingURL=forgot.component.js.map