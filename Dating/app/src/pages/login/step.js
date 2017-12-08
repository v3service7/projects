var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { CustomersService } from '../../app/service/customer.service';
import { LoginPage } from '../login/login';
var StepPage = (function () {
    function StepPage(nav, loadingCtrl, menuCtrl, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.user = {};
        this.preference = {};
        this.colorSelect = 'Black';
        this.colorSelectPref = 'Black';
        this.bodySelect = 'Petite';
        this.bodySelectPref = 'Petite';
        this.children = 'true';
        this.childrenPref = 'true';
        this.smoke = 'false';
        this.smokePref = 'false';
        this.drink = 'false';
        this.drinkPref = 'false';
        this.education = 'High School';
        this.educationPref = 'High School';
        this.typeOfWork = 'Aircraft Dispatcher';
        this.typeOfWorkPref = 'Aircraft Dispatcher';
        this.profileCompletePercent = 15;
        this.showNextStep(0);
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        this.stringifyNumber();
    }
    StepPage.prototype.backgroundImage = function () {
        return ("url('assets/images/bgImage.jpg')");
    };
    StepPage.prototype.stringifyNumber = function () {
        this.profileCompletePercent = this.profileCompletePercent + 8;
    };
    StepPage.prototype.showNextStep = function (index) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Saving...'
        });
        this.loading.present();
        setTimeout(function () {
            var step = document.querySelectorAll("[id^=step]");
            for (var i = 0; i < step.length; i++) {
                step[i].style.display = "none";
            }
            step[index].style.display = "block";
            _this.loading.dismiss();
        }, 1000);
    };
    StepPage.prototype.height = function (event) {
        this.user['height'] = event.target.value;
    };
    StepPage.prototype.addData = function (type) {
        if (type == 'height') {
            if (typeof this.user['height'] == 'undefined' || this.user['height'] == "") {
                this.user['height'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(1);
        }
        if (type == 'haircolor') {
            this.hairColorFunction();
            this.stringifyNumber();
            this.showNextStep(2);
        }
        if (type == 'bodyshape') {
            this.bodyFunction();
            this.stringifyNumber();
            this.showNextStep(3);
        }
        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = this.married;
            this.haveChildren();
            this.stringifyNumber();
            this.showNextStep(4);
        }
        if (type == 'smoke') {
            this.smoker();
            this.stringifyNumber();
            this.showNextStep(5);
        }
        if (type == 'drink') {
            this.drinker();
            this.stringifyNumber();
            this.showNextStep(6);
        }
        if (type == 'prof') {
            this.profession();
            this.stringifyNumber();
            this.showNextStep(7);
        }
    };
    StepPage.prototype.skipStep = function (type) {
        if (type == 'height') {
            this.user['height'] = null;
            this.showNextStep(1);
        }
        if (type == 'haircolor') {
            this.user['haircolor'] = null;
            this.showNextStep(2);
        }
        if (type == 'bodyshape') {
            this.user['bodyshape'] = null;
            this.showNextStep(3);
        }
        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = null;
            this.user['haveChildren'] = null;
            this.showNextStep(4);
        }
        if (type == 'smoke') {
            this.user['smoke'] = null;
            this.showNextStep(5);
        }
        if (type == 'drink') {
            this.user['drink'] = null;
            this.showNextStep(6);
        }
        if (type == 'prof') {
            this.user['profession'] = null;
            this.showNextStep(7);
        }
    };
    StepPage.prototype.hairColorFunction = function () {
        console.log(this.colorSelect);
        this.user['haircolor'] = this.colorSelect;
    };
    StepPage.prototype.bodyFunction = function () {
        this.user['bodyshape'] = this.bodySelect;
    };
    StepPage.prototype.maritalS = function (type) {
        this.married = type;
        this.user['maritalStatus'] = this.married;
    };
    StepPage.prototype.haveChildren = function () {
        if (this.married) {
            if (this.children == 'false') {
                this.user['haveChildren'] = false;
            }
            else {
                this.user['haveChildren'] = true;
            }
        }
    };
    StepPage.prototype.smoker = function () {
        if (this.smoke == 'false') {
            this.user['smoke'] = false;
        }
        else {
            this.user['smoke'] = true;
        }
    };
    StepPage.prototype.drinker = function () {
        if (this.drink == 'false') {
            this.user['drink'] = false;
        }
        else {
            this.user['drink'] = true;
        }
    };
    StepPage.prototype.profession = function () {
        this.user['profession'] = this.typeOfWork;
    };
    /* Start Preferences  */
    StepPage.prototype.minheightPref = function (event) {
        this.preference['minheight'] = event.target.value;
    };
    StepPage.prototype.maxheightPref = function (event) {
        this.preference['maxheight'] = event.target.value;
    };
    StepPage.prototype.hairColorFunctionPref = function () {
        this.preference['haircolor'] = this.colorSelectPref;
    };
    StepPage.prototype.bodyFunctionPref = function () {
        this.preference['bodyshape'] = this.bodySelectPref;
    };
    StepPage.prototype.addDataPref = function (type) {
        console.log(type);
        if (type == 'minheight') {
            if (typeof this.preference['minheight'] == 'undefined' || this.preference['minheight'] == "") {
                this.preference['minheight'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(8);
        }
        if (type == 'maxheight') {
            if (typeof this.preference['maxheight'] == 'undefined' || this.preference['maxheight'] == "") {
                this.preference['maxheight'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(8);
        }
        if (type == 'haircolor') {
            this.hairColorFunctionPref();
            this.stringifyNumber();
            this.showNextStep(9);
        }
        if (type == 'bodyshape') {
            this.bodyFunctionPref();
            this.stringifyNumber();
            this.showNextStep(10);
        }
    };
    StepPage.prototype.skipStepPref = function (type) {
        if (type == 'minheight') {
            this.preference['minheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'maxheight') {
            this.preference['maxheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'haircolor') {
            this.preference['haircolor'] = null;
            this.showNextStep(9);
        }
        if (type == 'bodyshape') {
            this.preference['bodyshape'] = null;
            this.showNextStep(10);
        }
    };
    StepPage.prototype.activateAccount = function () {
        var _this = this;
        this.user['preferences'] = this.preference;
        this.user['profileCompletePercent'] = this.profileCompletePercent;
        this.customerService.updateCustomer(this.user).subscribe(function (data) {
            if (!data.error) {
                _this.customerService.addactivate(data.message).subscribe(function (dataq) {
                    console.log("dataq");
                    console.log(dataq);
                    _this.nav.setRoot(LoginPage);
                });
            }
        });
    };
    StepPage.prototype.goToLoginPage = function () {
        this.nav.setRoot(LoginPage);
    };
    return StepPage;
}());
StepPage = __decorate([
    Component({
        selector: 'page-step',
        templateUrl: 'step.html',
    }),
    __metadata("design:paramtypes", [Nav,
        LoadingController,
        MenuController,
        NavController,
        ViewController,
        ToastController,
        CustomersService,
        NavParams])
], StepPage);
export { StepPage };
//# sourceMappingURL=step.js.map