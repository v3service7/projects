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
import { ToastController, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';
import { ProfilePage } from '../profile/profile';
var ChangePasswordPage = (function () {
    function ChangePasswordPage(lf, navCtrl, toastCtrl, customerService) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.resetForm = this.lf.group({
            _id: ['', Validators.required],
            oldpassword: ['', Validators.required],
            newpassword: ['', Validators.required],
        });
        if (localStorage.getItem('currentCustomer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            console.log("this.currentCustomer");
            console.log(this.currentCustomer);
            this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
        }
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
    };
    ChangePasswordPage.prototype.changePass = function () {
        var _this = this;
        if (this.currentCustomer['password'] == this.resetForm.value['oldpassword']) {
            var obj = {};
            obj['_id'] = this.currentCustomer['_id'];
            obj['password'] = this.resetForm.value['newpassword'];
            this.customerService.updateCustomer(obj).subscribe(function (data) {
                if (!data.error) {
                    _this.getToast('Password Updated');
                    _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust) {
                        console.log("cust.message");
                        console.log(cust.message);
                        localStorage.removeItem('currentCustomer');
                        localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
                        /*hide for error*/
                        _this.navCtrl.popTo(ProfilePage);
                    });
                }
                else {
                    _this.getToast('Something went Wrong');
                }
            });
        }
        else {
            this.getToast('Incorrect Current Password');
            this.resetForm.reset();
            this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
        }
    };
    ChangePasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Component({
        selector: 'page-change-password',
        templateUrl: 'changepassword.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        ToastController,
        CustomersService])
], ChangePasswordPage);
export { ChangePasswordPage };
//# sourceMappingURL=changepassword.js.map