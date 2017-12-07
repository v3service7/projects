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
import { NavController, Nav, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as globalVariable from "../../app/global";
import { CustomersService } from '../../app/service/index';
import { FileUploader } from 'ng2-file-upload';
import { SettingPage } from '../setting/setting';
import { ProfileUpdatePage } from './profileupdate';
var ProfilePage = (function () {
    function ProfilePage(nav, lf, navCtrl, customerService, alertCtrl, sanitizer) {
        this.nav = nav;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.alertCtrl = alertCtrl;
        this.sanitizer = sanitizer;
        this.gallery = "myPhotos";
        this.url = globalVariable;
        this.profilePrcnt = 20;
        this.uploader = new FileUploader({ url: globalVariable.url + 'upload' });
        this.youtubeUrlForm = this.lf.group({
            videoURL: ['', Validators.required]
        });
        //this.getCustomer();
    }
    ProfilePage.prototype.ionViewDidLoad = function () { };
    ProfilePage.prototype.ionViewDidEnter = function () {
        this.getCustomer();
    };
    ProfilePage.prototype.videoUrl = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    ProfilePage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(function (cust) {
            localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
            _this.currentCustomer = cust.message;
            console.log(_this.currentCustomer);
            _this.currentCustomer.profileCompletePercent = 0;
            _this.profilePrcnt = 20;
            _this.profilePercent(cust.message, _this.profilePrcnt);
            if (typeof cust.message.preferences != 'undefined') {
                _this.profilePercent(cust.message.preferences, _this.profilePrcnt);
            }
            setTimeout(function () {
                _this.customerService.updateCustomer(_this.currentCustomer).subscribe(function (data) {
                    _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust2) {
                        localStorage.setItem('currentCustomer', JSON.stringify(cust2.message));
                        _this.currentCustomer = cust.message;
                        console.log("this.currentCustomer");
                        console.log(_this.currentCustomer);
                    });
                });
            }, 5000);
        });
    };
    ProfilePage.prototype.profilePercent = function (cstmr, prcnt) {
        if (typeof cstmr.height != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.haircolor != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.bodyshape != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.maritalStatus != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.haveChildren != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.smoke != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.drink == 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.qualification != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        if (typeof cstmr.profession != 'undefined') {
            prcnt = prcnt + 5;
            this.currentCustomer.profileCompletePercent = prcnt.toString();
        }
        this.profilePrcnt = prcnt;
        this.currentCustomer.profileCompletePercent = this.profilePrcnt.toString();
    };
    ProfilePage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null || img == "") {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    ProfilePage.prototype.updateCurrentCustomer = function () {
        var _this = this;
        this.customerService.updateCustomer(this.currentCustomer).subscribe(function (data) {
            if (!data.error) {
                _this.getCustomer();
            }
        });
    };
    ProfilePage.prototype.addMedia = function (event, type) {
        var _this = this;
        var files = event.srcElement.files;
        console.log("files");
        console.log(files);
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            if (type == 'pic') {
                _this.currentCustomer['myPhotos'].push(responsePath.filename);
            }
            else {
                _this.currentCustomer['profileVideo'] = responsePath.filename;
                console.log(_this.currentCustomer);
            }
            _this.updateCurrentCustomer();
        };
    };
    ProfilePage.prototype.deleteImage = function (i) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Image?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.currentCustomer['myPhotos'].splice(i, 1);
                        _this.updateCurrentCustomer();
                    }
                }
            ]
        });
        confirm.present();
    };
    ProfilePage.prototype.deleteLink = function (i) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete Youtube Video?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.currentCustomer['videolinks'].splice(i, 1);
                        _this.updateCurrentCustomer();
                    }
                }
            ]
        });
        confirm.present();
    };
    ProfilePage.prototype.goToSettingPage = function () {
        this.navCtrl.push(SettingPage);
    };
    ProfilePage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(ProfileUpdatePage);
    };
    ProfilePage.prototype.addYoutubeVideo = function () {
        this.currentCustomer['videolinks'].push(this.youtubeUrlForm.value['videoURL']);
        this.youtubeUrlForm.reset();
        this.updateCurrentCustomer();
    };
    ProfilePage.prototype.myProfileVideo = function (video) {
        return (this.url.imageUrl + video);
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
    }),
    __metadata("design:paramtypes", [Nav,
        FormBuilder,
        NavController,
        CustomersService,
        AlertController,
        DomSanitizer])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map