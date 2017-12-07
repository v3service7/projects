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
import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../../app/global";
import { StepPage } from './step';
var RegisterPage = (function () {
    function RegisterPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.haveImage = false;
        this.haveAddress = false;
        this.userRegistered = false;
        this.event = { month: '1990-02-19' };
        this.uploader = new FileUploader({ url: globalVariable.url + 'upload' });
        this.signUpForm = this.lf.group({
            gender: ['', Validators.required],
            dateofbirth: ['', Validators.required],
            interestedin: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            cityName: [],
            countryName: [],
            lat: [],
            lng: [],
            profilePic: []
        });
        //this.moveForward();
        this.signUpForm.controls['dateofbirth'].setValue(this.event.month);
    }
    RegisterPage.prototype.importonViewDidLoad = function () {
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        /*localStorage.setItem('user',JSON.stringify(this.signUpForm.value));
        loading.dismiss();
        this.navCtrl.push(StepPage);*/
        this.customerService.addCustomer(this.signUpForm.value).subscribe(function (data) {
            if (!data.error) {
                localStorage.setItem('user', JSON.stringify(data.message));
                loading.dismiss();
                _this.getToast('Registered Successfully');
                _this.navCtrl.push(StepPage);
            }
            else {
                loading.dismiss();
                _this.getToast('Email/Username Already Exist');
                _this.signUpForm.reset();
            }
        });
    };
    RegisterPage.prototype.moveForward = function () {
        var _this = this;
        this.userRegistered = true;
        setTimeout(function () {
            _this.initMap();
        }, 1000);
    };
    RegisterPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    RegisterPage.prototype.selectGender = function (type) {
        if (type == 'male') {
            this.mMale = true;
            this.mFemale = false;
            this.signUpForm.controls['gender'].setValue('male');
        }
        if (type == 'female') {
            this.mMale = false;
            this.mFemale = true;
            this.signUpForm.controls['gender'].setValue('female');
        }
        if (type == 'maleP') {
            this.looking4Male = true;
            this.looking4Female = false;
            this.signUpForm.controls['interestedin'].setValue('male');
        }
        if (type == 'femaleP') {
            this.looking4Male = false;
            this.looking4Female = true;
            this.signUpForm.controls['interestedin'].setValue('female');
        }
    };
    RegisterPage.prototype.selectedMale = function (type) {
        if (type == 'chooseGender') {
            if (this.mMale) {
                var imgPath = "assets/images/male-orange.svg";
                return imgPath;
            }
            else {
                var imgPath = "assets/images/male-black.svg";
                return imgPath;
            }
        }
        else {
            if (this.looking4Male) {
                var imgPath = "assets/images/male-orange.svg";
                return imgPath;
            }
            else {
                var imgPath = "assets/images/male-black.svg";
                return imgPath;
            }
        }
    };
    RegisterPage.prototype.selectedFemale = function (type) {
        if (type == 'chooseGender') {
            if (this.mFemale) {
                var imgPath = "assets/images/woman-orange.svg";
                return imgPath;
            }
            else {
                var imgPath = "assets/images/woman-black.svg";
                return imgPath;
            }
        }
        else {
            if (this.looking4Female) {
                var imgPath = "assets/images/woman-orange.svg";
                return imgPath;
            }
            else {
                var imgPath = "assets/images/woman-black.svg";
                return imgPath;
            }
        }
    };
    RegisterPage.prototype.chooseDOB = function () {
        this.signUpForm.controls['dateofbirth'].setValue(this.event.month);
    };
    RegisterPage.prototype.onChange = function (event) {
        var _this = this;
        var files = event.srcElement.files;
        console.log("files");
        console.log(files);
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            var responsePath = JSON.parse(response);
            //console.log(responsePath.filename);
            _this.signUpForm.controls['profilePic'].setValue(responsePath.filename);
            _this.haveImage = true;
        };
    };
    RegisterPage.prototype.initMap = function () {
        var _this = this;
        var input = document.getElementById('pac-input');
        var options = { types: ['(cities)'] };
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.address_components) {
                var city = void 0, country = void 0, lat = void 0, lng = void 0;
                if (place.address_components.length >= 4) {
                    city = place.address_components[place.address_components.length - 3].long_name;
                }
                else {
                    city = place.address_components[place.address_components.length - 2].long_name;
                }
                country = place.address_components[place.address_components.length - 1].long_name;
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();
                _this.signUpForm.controls['cityName'].setValue(city);
                _this.signUpForm.controls['countryName'].setValue(country);
                _this.signUpForm.controls['lat'].setValue(lat);
                _this.signUpForm.controls['lng'].setValue(lng);
            }
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Component({
        selector: 'page-register',
        templateUrl: 'register.html',
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
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.js.map