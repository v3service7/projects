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
var validate_service_1 = require("../../services/validate.service");
var user_service_1 = require("../../services/user.service");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var router_1 = require("@angular/router");
var SignupComponent = (function () {
    function SignupComponent(validateService, flashMessage, userService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
        this.check = "";
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            username: this.username,
            password: this.password
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Required Fields
        if (!this.cpassword || this.cpassword == "" || this.password != this.cpassword) {
            this.flashMessage.show('Please fill correct Password', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validation for terms of service
        if (!this.check || this.check == "") {
            this.flashMessage.show('Please accept terms of service', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.userService.registerUser(user).subscribe(function (data) {
            if (!data.error) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Email/Username already in use', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/signup']);
            }
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.css']
    }),
    __metadata("design:paramtypes", [validate_service_1.ValidateService,
        angular2_flash_messages_1.FlashMessagesService,
        user_service_1.UserService,
        router_1.Router])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map