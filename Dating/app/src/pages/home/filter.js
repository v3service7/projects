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
import { NavController, LoadingController, AlertController, Nav, NavParams } from 'ionic-angular';
import { CustomersService } from '../../app/service/index';
import { TabsPage } from '../tabs/tabs';
var FilterPage = (function () {
    function FilterPage(navCtrl, nav, navParams, customerService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        console.log("nnnnn");
        var fltr = navParams.get('filter');
        console.log(fltr);
        /*let fltr = navParams.get('filter');

        if (typeof fltr !== 'undefined') {
            this.filterBy = fltr;;
        }*/
        console.log("this.filterBy");
        console.log(this.filterBy);
    }
    FilterPage.prototype.ionViewDidEnter = function () {
        this.getuserCountry();
    };
    FilterPage.prototype.resetFilter = function () {
        var _this = this;
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification: [], profession: [] };
        setTimeout(function () {
            _this.navCtrl.push(TabsPage, {
                filterBy: _this.filterBy,
            });
        }, 1000);
    };
    FilterPage.prototype.getuserCountry = function () {
        var _this = this;
        this.customerService.getUserCountry().subscribe(function (country) {
            _this.countries = country.message;
        });
    };
    FilterPage.prototype.selectOption = function (type) {
        console.log("Select Option", type);
        if (type == 'maritalstatus') {
            console.log("this.maritalstatus");
            console.log(this.maritalstatus);
            this.filterBy['maritalstatus'] = this.maritalstatus;
        }
        if (type == 'colorselect') {
            console.log("this.colorselect");
            console.log(this.colorselect);
            this.filterBy['haircolor'] = this.colorselect;
        }
        if (type == 'bodyselect') {
            console.log("this.bodyselect");
            console.log(this.bodyselect);
            this.filterBy['bodyshape'] = this.bodyselect;
        }
        if (type == 'smoke') {
            console.log("this.smoke");
            console.log(this.smoke);
            this.filterBy['smoke'] = this.smoke;
        }
        if (type == 'drink') {
            console.log("this.drink");
            console.log(this.drink);
            this.filterBy['drink'] = this.drink;
        }
        if (type == 'qualification') {
            console.log("this.qualification");
            console.log(this.qualification);
            this.filterBy['qualification'] = this.qualification;
        }
        if (type == 'profession') {
            console.log("this.profession");
            console.log(this.profession);
            this.filterBy['profession'] = this.profession;
        }
        if (type == 'sexorientation') {
            console.log("this.sexorientation");
            console.log(this.sexorientation);
            this.filterBy['sexualorient'] = this.sexorientation;
        }
        if (type == 'gender') {
            console.log("this.gender");
            console.log(this.gender);
            this.filterBy['gender'] = this.gender;
        }
        if (type == 'country') {
            console.log("this.country");
            console.log(this.country);
            this.filterBy['country'] = this.country;
        }
        if (type == 'minfeet') {
            console.log("this.minfeet");
            console.log(this.minfeet);
        }
        if (type == 'mininch') {
            console.log("this.mininch");
            console.log(this.mininch);
        }
        if (type == 'maxfeet') {
            console.log("this.maxfeet");
            console.log(this.maxfeet);
        }
        if (type == 'maxinch') {
            console.log("this.maxinch");
            console.log(this.maxinch);
        }
    };
    /*private age(event,type){

        if (type == 'min') {
            this.filterBy['minage'] = event.target.value;
        }

        if (type == 'max') {
            this.filterBy['maxage'] = event.target.value;
        }

    }*/
    FilterPage.prototype.showAfterFilter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
            _this.nav.setRoot(TabsPage, {
                filterBy: _this.filterBy,
            });
        }, 1000);
        /*if (typeof this.minfeet != 'undefined') {
            if (typeof this.mininch == 'undefined') {
                this.filterBy['minheight'] = this.minfeet + '.0';
            }else{
                this.filterBy['minheight'] = this.minfeet + '.' + this.mininch;
            }
        }

        if (typeof this.maxfeet != 'undefined') {
            if (typeof this.maxinch == 'undefined') {
                this.filterBy['maxheight'] = this.maxfeet + '.0';
            }else{
                this.filterBy['maxheight'] = this.maxfeet + '.' + this.maxinch;
            }
        }*/
    };
    return FilterPage;
}());
FilterPage = __decorate([
    Component({
        selector: 'page-filter',
        templateUrl: 'filter.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Nav,
        NavParams,
        CustomersService,
        LoadingController,
        AlertController])
], FilterPage);
export { FilterPage };
//# sourceMappingURL=filter.js.map