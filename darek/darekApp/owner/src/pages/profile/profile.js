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
import { HomePage } from '../home/home';
import { ChangePasswordPage } from '../change-password/change-password';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(nav, loadingCtrl, menuCtrl, lf, userService, toastCtrl, navCtrl, viewCtrl, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.profileForm = this.lf.group({
            _id: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            phoneNo: ['', [Validators.required]],
        });
        this.getOwner();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.getOwner = function () {
        var _this = this;
        var tempOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.userService.getOne(tempOwner._id).subscribe(function (data) {
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.currentOwner = data.message;
                _this.profileForm.patchValue(_this.currentOwner);
                localStorage.removeItem('currentOwner');
                localStorage.setItem('currentOwner', JSON.stringify(data.message));
            }
        });
    };
    ProfilePage.prototype.update = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.userService.updateUser(this.profileForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.error) {
                _this.getToast('Some thing went wrong');
            }
            else {
                _this.getOwner();
                _this.getToast('Profile updated successfully');
                _this.nav.setRoot(HomePage);
            }
        });
    };
    ProfilePage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ProfilePage.prototype.goToChangePassword = function () {
        this.navCtrl.push(ChangePasswordPage);
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
    }),
    __metadata("design:paramtypes", [Nav, LoadingController, MenuController, FormBuilder, UsersService, ToastController, NavController, ViewController, NavParams])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map