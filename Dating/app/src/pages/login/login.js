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
import { CustomersService, SocketService } from '../../app/service/index';
import { TabsPage } from '../tabs/tabs';
import { ForgetPasswordPage } from './forgetpassword';
import { RegisterPage } from './register';
var LoginPage = (function () {
    function LoginPage(nav, socketService, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.socketService = socketService;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.formErrors = {
            'password': ''
        };
        this.validationMessages = {
            'password': {
                'required': 'Password is required.',
                'pattern': 'Password must contain 8-25 characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Charecter'
            }
        };
        this.loginForm = this.lf.group({
            email: ['', Validators.required],
            password: ['', [Validators.required]],
        });
        this.menuCtrl.enable(false);
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.socketService.customerOffline();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.getCustomer(this.loginForm.value).subscribe(function (data) {
            _this.loading.dismiss();
            if (!data.error) {
                _this.socketService.customerOnline();
                console.log('data', data);
                //localStorage.setItem('currentCustomer', JSON.stringify(data.data));
                _this.menuCtrl.enable(true);
                _this.nav.setRoot(TabsPage);
            }
            else {
                _this.getToast('Bad Credential');
                _this.loginForm.reset();
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.getToast('Bad Credential');
            _this.loginForm.reset();
        });
    };
    LoginPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    LoginPage.prototype.goToForget = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(RegisterPage);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [Nav,
        SocketService,
        LoadingController,
        MenuController,
        FormBuilder,
        NavController,
        ViewController,
        ToastController,
        CustomersService,
        NavParams])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map