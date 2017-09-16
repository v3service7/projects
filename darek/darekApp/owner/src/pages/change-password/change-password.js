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
import { UsersService } from '../../app/service/users.service';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.ownerProfile = this.lf.group({
            _id: ['', Validators.required],
            oldpassword: ['', Validators.required],
            newpassword: ['', Validators.required]
        });
        this.ownerProfile.patchValue(JSON.parse(localStorage.getItem('currentOwner')));
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.ownerPasswordUpdate = function () {
        var _this = this;
        this.userService.updateOwnerPassword(this.ownerProfile.value).subscribe(function (data) {
            if (data.error) {
                _this.getToast(data.message);
            }
            else {
                _this.getToast('Password Has been changed Successfully');
                _this.nav.setRoot(ProfilePage);
            }
        });
    };
    ChangePasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ChangePasswordPage.prototype.goToChangePassword = function () {
        this.navCtrl.push(ProfilePage);
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Component({
        selector: 'page-change-password',
        templateUrl: 'change-password.html',
    }),
    __metadata("design:paramtypes", [Nav, LoadingController, MenuController, FormBuilder, UsersService, ToastController, NavController, ViewController, NavParams])
], ChangePasswordPage);
export { ChangePasswordPage };
//# sourceMappingURL=change-password.js.map