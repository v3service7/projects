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
var exchange_service_1 = require("../../services/exchange.service");
var plan_service_1 = require("../../services/plan.service");
var tradealert_service_1 = require("../../services/tradealert.service");
var purchaseplan_service_1 = require("../../services/purchaseplan.service");
var exchangeapi_service_1 = require("../../services/exchangeapi.service");
var binance_service_1 = require("../../services/binance.service");
var MyprofileComponent = (function () {
    function MyprofileComponent(validateService, flashMessage, exchangeService, exchangeapiService, userService, planService, binanceService, purchaseplanService, tradeAlertService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.exchangeService = exchangeService;
        this.exchangeapiService = exchangeapiService;
        this.userService = userService;
        this.planService = planService;
        this.binanceService = binanceService;
        this.purchaseplanService = purchaseplanService;
        this.tradeAlertService = tradeAlertService;
        this.router = router;
        this.exchangeNames = [];
        this.exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
        this.plans = [];
        this.plansType = [];
        this.accountplansType = [];
        this.password = "";
        this.newpassword = "";
        this.newex = false;
        this.isActive = 'profile';
        this.isChildActive = 'alertRequest';
        this.alertRequestList = [];
        this.alertHistoryList = [];
    }
    MyprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getProfile().subscribe(function (profile) {
            _this.id = profile.user._id;
            _this.user = profile.user;
            _this.firstname = _this.user.firstname;
            _this.lastname = _this.user.lastname;
            _this.email = _this.user.email;
            _this.username = _this.user.username;
            _this.phonenumber = _this.user.phonenumber;
            _this.plangetList();
            _this.accountgetList();
            _this.getList();
            _this.getApiList();
            _this.myAlertList();
        }, function (err) {
            console.log(err);
            return false;
        });
        this.user = JSON.parse(localStorage.getItem('user'));
    };
    MyprofileComponent.prototype.myAlertList = function () {
        var _this = this;
        this.tradeAlertService.tradeAlertList(JSON.parse(localStorage.getItem('user'))['_id']).subscribe(function (data) {
            var alertList;
            alertList = data['message'];
            _this.alertRequestList = alertList.filter(function (item) { return item['isOpen'] == true; });
            _this.alertHistoryList = alertList.filter(function (item) { return item['isOpen'] == false; });
            //console.log(this.alertList)
        });
    };
    MyprofileComponent.prototype.setActiveChild = function (current, my) {
        if (current == my) {
            return 'activeClass';
        }
    };
    MyprofileComponent.prototype.setActive = function (current, my) {
        if (current == my) {
            return 'activeClass';
        }
    };
    MyprofileComponent.prototype.setActiveChildClass = function (name) {
        this.isChildActive = name;
    };
    MyprofileComponent.prototype.setActiveClass = function (name) {
        this.isActive = name;
    };
    MyprofileComponent.prototype.onProfileSubmit = function () {
        var _this = this;
        var userProfile = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            username: this.username,
            phonenumber: this.phonenumber,
            _id: this.id
        };
        // Required Fields
        if (!this.validateService.validateProfile(userProfile)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(userProfile.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Update User Profile
        this.userService.updateProfile(userProfile).subscribe(function (data) {
            if (!data.error) {
                _this.flashMessage.show('Profile Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/profile']);
            }
            else {
                _this.flashMessage.show('Email/Username already in use', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/profile']);
            }
        });
    };
    MyprofileComponent.prototype.userChangePassword = function () {
        var _this = this;
        var obj = {};
        obj['password'] = this.password;
        obj['newpassword'] = this.newpassword;
        obj['id'] = this.id;
        if (this.password != "" && this.newpassword != "") {
            this.userService.changePassword(obj).subscribe(function (data) {
                if (!data.error) {
                    _this.flashMessage.show('Password Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/profile']);
                    _this.password = "";
                    _this.newpassword = "";
                }
                else {
                    _this.flashMessage.show('Current password is wrong', { cssClass: 'alert-danger', timeout: 3000 });
                    _this.router.navigate(['/profile']);
                    _this.password = "";
                    _this.newpassword = "";
                }
            }, function (err) {
                _this.flashMessage.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj');
            });
        }
        else {
            this.flashMessage.show('Please fill current/change password', { cssClass: 'alert-danger', timeout: 3000 });
        }
    };
    MyprofileComponent.prototype.getList = function () {
        var _this = this;
        this.exchangeService.customerexchangeList(this.id).subscribe(function (data) {
            if (!data.error) {
                _this.plans = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    MyprofileComponent.prototype.getApiList = function () {
        var _this = this;
        this.exchangeapiService.exchangeapiList().subscribe(function (data) {
            if (!data.error) {
                _this.exchangeNames = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    MyprofileComponent.prototype.apiValidate = function (name, data1) {
        var _this = this;
        if (name == 'Binance') {
            console.log(data1);
            this.binanceService.getAuthenticate(data1).subscribe(function (data) {
                if (data['orders'].length >= 0) {
                    _this.exchangeService.exchangeAdd(data1).subscribe(function (data) {
                        if (!data.error) {
                            _this.getList();
                            document.getElementById('v-pills-exchange-tab').click();
                            _this.flashMessage.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                            _this.router.navigate(['/profile']);
                        }
                        else {
                            _this.flashMessage.show('Exchange API Already exists', { cssClass: 'alert-danger', timeout: 3000 });
                        }
                    }, function (err) {
                        console.log('kfgbhj');
                    });
                }
                else {
                    _this.flashMessage.show('Invalid API Key', { cssClass: 'alert-danger', timeout: 3000 });
                }
            });
        }
    };
    MyprofileComponent.prototype.planAdd = function () {
        var _this = this;
        var Addplan = {
            nickName: this.nickName,
            exchangeName: this.exchangeName,
            exchangeType: this.exchangeType,
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            user: this.id
        };
        if (!this.validateService.validateaddplan(Addplan)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        this.exchangeapiService.exchangeapi(this.exchangeName).subscribe(function (data) {
            _this.apiValidate(data.message.exchangeapiName, Addplan);
        }, function (err) {
            console.log('kfgbhj');
        });
        /**/
    };
    MyprofileComponent.prototype.editPlan = function (data) {
        if (data) {
            this.sid = data._id;
            this.nickName = data.nickName;
            this.exchangeName = data.exchangeName._id;
            this.exchangeType = data.exchangeType;
            this.apiKey = data.apiKey;
            this.secretKey = data.secretKey;
        }
    };
    MyprofileComponent.prototype.clearform = function () {
        this.nickName = "";
        this.exchangeName = "";
        this.exchangeType = "";
        this.apiKey = "";
        this.secretKey = "";
    };
    MyprofileComponent.prototype.planUpdate = function () {
        var _this = this;
        var updateplan = {
            _id: this.sid,
            nickName: this.nickName,
            exchangeName: this.exchangeName,
            exchangeType: this.exchangeType,
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            user: this.id
        };
        if (!this.validateService.validateaddplan(updateplan) && !updateplan) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        this.exchangeService.exchangeUpdate(updateplan).subscribe(function (data) {
            if (!data.error) {
                _this.getList();
                document.getElementById('v-pills-exchange-tab').click();
                _this.flashMessage.show('Exchange Account Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/profile']);
            }
            else {
                _this.flashMessage.show('Exchange API Already Exists', { cssClass: 'alert-danger', timeout: 3000 });
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    MyprofileComponent.prototype.deletePlan = function (id) {
        var _this = this;
        if (confirm("Are you sure to delete ?")) {
            this.flashMessage.show('Exchange Account Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.exchangeService.exchangeDelete(id).subscribe(function (data) {
                _this.getList();
            });
        }
    };
    MyprofileComponent.prototype.plangetList = function () {
        var _this = this;
        this.planService.planList().subscribe(function (data) {
            if (!data.error) {
                _this.plansType = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    MyprofileComponent.prototype.purchasePlan = function (data) {
        var _this = this;
        var obj = {};
        var x = parseInt(data.planType);
        var current = new Date();
        var threeMonthsInTheFuture = new Date(new Date(current).setMonth(current.getMonth() + x));
        obj['plan'] = data._id;
        obj['expireddate'] = threeMonthsInTheFuture;
        obj['user'] = this.id;
        if (confirm("Are you sure to purchase plan?")) {
            this.purchaseplanService.paymentplan(data).subscribe(function (data) {
                if (!data.error) {
                    window.location.href = data.paymentlink;
                    _this.purchaseplanService.puchaseplan(obj).subscribe(function (data) {
                    });
                }
            }, function (err) {
                console.log('kfgbhj');
            });
        }
    };
    MyprofileComponent.prototype.accountgetList = function () {
        var _this = this;
        this.purchaseplanService.accountList(this.id).subscribe(function (data) {
            if (!data.error) {
                _this.accountplansType = data.message;
            }
        }, function (err) {
            console.log('kfgbhj');
        });
    };
    return MyprofileComponent;
}());
MyprofileComponent = __decorate([
    core_1.Component({
        selector: 'app-myprofile',
        templateUrl: './myprofile.component.html',
        styleUrls: ['./myprofile.component.css']
    }),
    __metadata("design:paramtypes", [validate_service_1.ValidateService,
        angular2_flash_messages_1.FlashMessagesService,
        exchange_service_1.ExchangeService,
        exchangeapi_service_1.ExchangeapiService,
        user_service_1.UserService,
        plan_service_1.PlanService,
        binance_service_1.BinanceService,
        purchaseplan_service_1.PurchaseplanService,
        tradealert_service_1.TradeAlertService,
        router_1.Router])
], MyprofileComponent);
exports.MyprofileComponent = MyprofileComponent;
//# sourceMappingURL=myprofile.component.js.map