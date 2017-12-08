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
import { ProfilePage } from './profile';
var ProfileUpdatePage = (function () {
    function ProfileUpdatePage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.preferences = {};
        this.editBasic = false;
        this.editSelf = false;
        this.editPref = false;
        this.dob = '1990-02-19';
        this.BasicInfoForm = this.lf.group({
            _id: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            name: ['', Validators.required],
            cityName: [],
            dateofbirth: [],
            countryName: [],
            description: [],
            interests: [],
            sexualorient: [],
            gender: [],
            lat: [],
            lng: []
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.BasicInfoForm.patchValue(this.currentCustomer);
        console.log(this.currentCustomer);
    }
    ProfileUpdatePage.prototype.ionViewDidLoad = function () { };
    ProfileUpdatePage.prototype.getOne = function () {
        var _this = this;
        this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(function (cust) {
            localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
            _this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            console.log(_this.currentCustomer);
            _this.citycountry = _this.currentCustomer.cityName + ',' + _this.currentCustomer.countryName;
        });
    };
    ProfileUpdatePage.prototype.chooseDOB = function () {
        this.BasicInfoForm.controls['dateofbirth'].setValue(this.dob);
    };
    ProfileUpdatePage.prototype.editBasicInfo = function () {
        var _this = this;
        this.editBasic = true;
        this.citycountry = this.currentCustomer.cityName + ',' + this.currentCustomer.countryName;
        setTimeout(function () {
            _this.initMap();
        }, 1000);
    };
    ProfileUpdatePage.prototype.initMap = function () {
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
                _this.BasicInfoForm.controls['cityName'].setValue(city);
                _this.BasicInfoForm.controls['countryName'].setValue(country);
                _this.BasicInfoForm.controls['lat'].setValue(lat);
                _this.BasicInfoForm.controls['lng'].setValue(lng);
                console.log("this.BasicInfoForm.value");
                console.log(_this.BasicInfoForm.value);
            }
        });
    };
    ProfileUpdatePage.prototype.editAboutSelf = function () {
        this.editSelf = true;
        this.colorSelect = this.currentCustomer['haircolor'];
        this.bodySelect = this.currentCustomer['bodyshape'];
        this.maritalStatus = this.currentCustomer['maritalStatus'];
        if (this.currentCustomer['maritalStatus']) {
            this.haveChildren = this.currentCustomer['haveChildren'];
        }
        this.smoke = this.currentCustomer['smoke'];
        this.drink = this.currentCustomer['drink'];
        this.typeOfWork = this.currentCustomer['profession'];
    };
    ProfileUpdatePage.prototype.editAboutPref = function () {
        this.editPref = true;
        if (this.currentCustomer['preferences']) {
            this.colorSelectPref = this.currentCustomer['preferences']['haircolor'];
            this.bodySelectPref = this.currentCustomer['preferences']['bodyshape'];
            this.maritalStatusPref = this.currentCustomer['preferences']['maritalStatus'];
            this.haveChildrenPref = this.currentCustomer['preferences']['haveChildren'];
            this.sexualorient = this.currentCustomer["preferences"]["sexualorient"];
            this.smokePref = this.currentCustomer['preferences']['smoke'];
            this.drinkPref = this.currentCustomer['preferences']['drink'];
            //this.Pref = this.currentCustomer['preferences']['drink'];
            this.typeOfWorkPref = this.currentCustomer['preferences']['profession'];
        }
        else {
            this.colorSelectPref = "";
            this.bodySelectPref = "";
            this.maritalStatusPref = "";
            this.haveChildrenPref = "";
            this.smokePref = "";
            this.drinkPref = "";
            this.typeOfWorkPref = "";
        }
    };
    ProfileUpdatePage.prototype.update = function () {
        var _this = this;
        console.log(this.BasicInfoForm.value);
        this.customerService.updateCustomer(this.BasicInfoForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getToast("Information Updated");
                _this.editBasic = false;
                _this.getOne();
            }
        });
    };
    ProfileUpdatePage.prototype.updateInfo = function () {
        var _this = this;
        if (this.currentCustomer['preferences']) {
            console.log("preff");
            console.log(this.currentCustomer['preferences']);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (data) {
                if (!data.error) {
                    _this.getToast("Information Updated");
                    _this.getOne();
                    _this.editSelf = false;
                    _this.editPref = false;
                }
            });
        }
        else {
            this.currentCustomer['preferences'] = this.preferences;
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (data) {
                if (!data.error) {
                    _this.getToast("Information Updated");
                    _this.getOne();
                    _this.editSelf = false;
                    _this.editPref = false;
                }
            });
        }
    };
    ProfileUpdatePage.prototype.height = function (event, type, mm) {
        if (type == 'self') {
            this.currentCustomer['height'] = event.target.value;
        }
        else {
            console.log("event,type");
            console.log(event, type, mm);
            if (mm == 'min' && this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['minheight'] = event.target.value;
            }
            else {
                this.currentCustomer['preferences']['maxheight'] = event.target.value;
            }
            //	this.preferences['height'] = event.target.value;
        }
    };
    ProfileUpdatePage.prototype.hairColorFunction = function (type) {
        if (type == 'self') {
            this.currentCustomer['haircolor'] = this.colorSelect;
        }
        else {
            if (this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['haircolor'] = this.colorSelectPref;
            }
            else {
                this.preferences['haircolor'] = this.colorSelectPref;
            }
        }
    };
    ProfileUpdatePage.prototype.bodyFunction = function (type) {
        if (type == 'self') {
            this.currentCustomer['bodyshape'] = this.bodySelect;
        }
        else {
            if (this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['bodyshape'] = this.bodySelectPref;
            }
            else {
                this.preferences['bodyshape'] = this.bodySelectPref;
            }
        }
    };
    ProfileUpdatePage.prototype.marriage = function (type) {
        if (type == 'self') {
            if (this.maritalStatus == 'false') {
                this.currentCustomer['maritalStatus'] = false;
                this.currentCustomer['haveChildren'] = false;
            }
            else {
                this.currentCustomer['maritalStatus'] = true;
            }
        }
        else {
            if (this.currentCustomer['preferences']) {
                if (this.maritalStatusPref == 'false') {
                    this.currentCustomer['preferences']['maritalStatus'] = false;
                    this.currentCustomer['preferences']['haveChildren'] = false;
                }
                else {
                    this.currentCustomer['preferences']['maritalStatus'] = true;
                }
            }
            else {
                if (this.maritalStatusPref == 'false') {
                    this.preferences['maritalStatus'] = false;
                    this.preferences['haveChildren'] = false;
                }
                else {
                    this.preferences['maritalStatus'] = true;
                }
            }
        }
    };
    ProfileUpdatePage.prototype.haveChild = function (type) {
        if (type == 'self') {
            if (this.haveChildren == 'false') {
                this.currentCustomer['haveChildren'] = false;
            }
            else {
                this.currentCustomer['haveChildren'] = true;
            }
        }
        else {
            if (this.currentCustomer['preferences']) {
                if (this.haveChildrenPref == 'false') {
                    this.currentCustomer['preferences']['haveChildren'] = false;
                }
                else {
                    this.currentCustomer['preferences']['haveChildren'] = true;
                }
            }
            else {
                if (this.haveChildrenPref == 'false') {
                    this.preferences['haveChildren'] = false;
                }
                else {
                    this.preferences['haveChildren'] = true;
                }
            }
        }
    };
    ProfileUpdatePage.prototype.smoker = function (type) {
        if (type == 'self') {
            if (this.smoke == 'false') {
                this.currentCustomer['smoke'] = false;
            }
            else {
                this.currentCustomer['smoke'] = true;
            }
        }
        else {
            if (this.currentCustomer['preferences']) {
                if (this.smoke == 'false') {
                    this.currentCustomer['preferences']['smoke'] = false;
                }
                else {
                    this.currentCustomer['preferences']['smoke'] = true;
                }
            }
            else {
                if (this.smoke == 'false') {
                    this.preferences['smoke'] = false;
                }
                else {
                    this.preferences['smoke'] = true;
                }
            }
        }
    };
    ProfileUpdatePage.prototype.drinker = function (type) {
        if (type == 'self') {
            if (this.drink == 'false') {
                this.currentCustomer['drink'] = false;
            }
            else {
                this.currentCustomer['drink'] = true;
            }
        }
        else {
            if (this.currentCustomer['preferences']) {
                if (this.drinkPref == 'false') {
                    this.currentCustomer['preferences']['drink'] = false;
                }
                else {
                    this.currentCustomer['preferences']['drink'] = true;
                }
            }
            else {
                if (this.drinkPref == 'false') {
                    this.preferences['drink'] = false;
                }
                else {
                    this.preferences['drink'] = true;
                }
            }
        }
    };
    ProfileUpdatePage.prototype.profession = function (type) {
        if (type == 'self') {
            this.currentCustomer['profession'] = this.typeOfWork;
        }
        else {
            if (this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['profession'] = this.typeOfWorkPref;
            }
            else {
                this.preferences['profession'] = this.typeOfWorkPref;
            }
        }
    };
    ProfileUpdatePage.prototype.sexualorientf = function () {
        this.preferences['sexualorient'] = this.sexualorient;
    };
    ProfileUpdatePage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ProfileUpdatePage.prototype.backToProfile = function () {
        this.navCtrl.popTo(ProfilePage);
    };
    return ProfileUpdatePage;
}());
ProfileUpdatePage = __decorate([
    Component({
        selector: 'page-profile-update',
        templateUrl: 'profileupdate.html',
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
], ProfileUpdatePage);
export { ProfileUpdatePage };
//# sourceMappingURL=profileupdate.js.map