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
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { AuthService } from '../../app/service/auth.service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(nav, loadingCtrl, menuCtrl, lf, authService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.forgetForm = this.lf.group({
            email: ['', Validators.required],
        });
        this.menuCtrl.enable(false);
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.forgetPassword = function () {
        var _this = this;
        console.log(this.forgetForm.value);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.forgetPassword(this.forgetForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.status) {
                _this.getToast(data.message);
                _this.forgetForm.reset();
            }
            else {
                _this.getToast('Email Sent Successfully');
                _this.nav.setRoot(LoginPage);
            }
        }, function (err) {
            loading.dismiss();
            _this.getToast('Somthing went wrong');
            _this.forgetForm.reset();
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
    ForgetPasswordPage.prototype.goToLogin = function () {
        this.nav.setRoot(LoginPage);
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    Component({
        selector: 'page-forget-password',
        templateUrl: 'forget-password.html',
    }),
    __metadata("design:paramtypes", [Nav, LoadingController, MenuController, FormBuilder, AuthService, ToastController, NavController, ViewController, NavParams])
], ForgetPasswordPage);
export { ForgetPasswordPage };
//# sourceMappingURL=forget-password.js.map