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
import { FormBuilder } from '@angular/forms';
import { ToastController, LoadingController, Nav, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { UsersService } from '../../app/service/users.service';
import { ChangePasswordPage } from '../change-password/change-password';
import { ProfilePage } from './profile';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var InfoPage = (function () {
    function InfoPage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.currentOwner = {};
        this.getOwner();
    }
    InfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    InfoPage.prototype.getOwner = function () {
        var _this = this;
        var tempOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.userService.getOne(tempOwner._id).subscribe(function (data) {
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.currentOwner = data.message;
                localStorage.removeItem('currentOwner');
                localStorage.setItem('currentOwner', JSON.stringify(data.message));
            }
        });
    };
    InfoPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    InfoPage.prototype.goToChangePassword = function () {
        this.navCtrl.push(ChangePasswordPage);
    };
    InfoPage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(ProfilePage);
    };
    return InfoPage;
}());
InfoPage = __decorate([
    Component({
        selector: 'page-info',
        templateUrl: 'info.html',
    }),
    __metadata("design:paramtypes", [Nav, LoadingController, MenuController, FormBuilder, UsersService, ToastController, NavController, ViewController, NavParams])
], InfoPage);
export { InfoPage };
//# sourceMappingURL=info.js.map