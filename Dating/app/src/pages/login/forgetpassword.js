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
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';
import { LoginPage } from '../login/login';
var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.forgetForm = this.lf.group({
            email: ['', Validators.required]
        });
    }
    ForgetPasswordPage.prototype.importonViewDidLoad = function () {
    };
    ForgetPasswordPage.prototype.forgetPass = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.forgetPassword(this.forgetForm.value).subscribe(function (data) {
            if (!data.error) {
                loading.dismiss();
                _this.getToast('Email Sent Successfully');
                /*hide for error*/
                _this.navCtrl.popTo(LoginPage);
            }
            else {
                loading.dismiss();
                _this.getToast(data.data);
            }
        });
    };
    ForgetPasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    Component({
        selector: 'page-forget-password',
        templateUrl: 'forgetpassword.html',
    }),
    __metadata("design:paramtypes", [Nav,
        LoadingController,
        MenuController,
        FormBuilder,
        NavController,
        ViewController,
        ToastController,
        CustomersService,
        NavParams])
], ForgetPasswordPage);
export { ForgetPasswordPage };
//# sourceMappingURL=forgetpassword.js.map