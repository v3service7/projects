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
var UserloginComponent = (function () {
    function UserloginComponent(flashMessage, userService, router) {
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
    }
    UserloginComponent.prototype.ngOnInit = function () {
        if (this.userService.loggedIn()) {
            this.router.navigate(['profile']);
        }
    };
    UserloginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.userService.validateUser(user).subscribe(function (data) {
            if (data.success) {
                localStorage.setItem('market', 'Binance');
                localStorage.setItem('currency', 'ETHBTC');
                _this.userService.storeUser(data.token, data.user);
                _this.flashMessage.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
                _this.router.navigate(['login']);
            }
        });
    };
    return UserloginComponent;
}());
UserloginComponent = __decorate([
    core_1.Component({
        selector: 'app-userlogin',
        templateUrl: './userlogin.component.html',
        styleUrls: ['./userlogin.component.css']
    }),
    __metadata("design:paramtypes", [angular2_flash_messages_1.FlashMessagesService,
        user_service_1.UserService,
        router_1.Router])
], UserloginComponent);
exports.UserloginComponent = UserloginComponent;
//# sourceMappingURL=userlogin.component.js.map