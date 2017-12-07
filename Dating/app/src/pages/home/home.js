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
import { NavController, LoadingController, NavParams, Nav } from 'ionic-angular';
import { CustomersService, FriendService } from '../../app/service/index';
import { FilterPage } from './filter';
var HomePage = (function () {
    function HomePage(navCtrl, nav, customerService, loadingCtrl, navParams, friendService) {
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.friendService = friendService;
        this.customerList = [];
        this.friends = [];
        this.activeTab1 = 'activeTab1';
        this.activeTab2 = 'activeTab2';
        this.activeTab3 = 'activeTab3';
        this.activeTab4 = 'activeTab4';
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
    }
    HomePage.prototype.ionViewDidEnter = function () {
        /*this.getCustomer();*/
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        var filter = this.navParams.get('filterBy');
        var filterResult = this.navParams.get('customerList');
        if (typeof filter !== 'undefined') {
            this.filterBy = filter;
            this.profiles_list('all');
        }
        if (typeof filter == 'undefined') {
            this.profiles_list('all');
        }
        this.getAllAllow();
        console.log("this.filterBy");
        console.log(this.filterBy);
        this.getLocal();
    };
    HomePage.prototype.someEvent = function () {
        console.log("someEvent");
    };
    HomePage.prototype.getGlobal = function () {
        this.profiles_list('global');
        console.log("this.customerList.length");
        console.log(this.customerList);
    };
    HomePage.prototype.getLocal = function () {
        this.profiles_list('local');
        console.log(this.customerList.length);
    };
    HomePage.prototype.getMatch = function () {
        //this.profiles_list('match');
        this.getCustomer();
    };
    HomePage.prototype.getCustomer = function () {
        var _this = this;
        var fltr = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification: [], profession: [] };
        if (typeof this.customerInfo['preferences'] != 'undefined') {
            var pref = this.customerInfo['preferences'];
            if (pref.haircolor) {
                fltr['haircolor'].push(pref.haircolor);
            }
            if (pref.bodyshape) {
                fltr['bodyshape'].push(pref.bodyshape);
            }
            if (typeof pref.maritalStatus != 'undefined') {
                fltr['maritalstatus'].push(pref.maritalStatus);
            }
            if (typeof pref.smoke != 'undefined') {
                fltr['smoke'].push(pref.smoke);
            }
            if (typeof pref.drink != 'undefined') {
                fltr['drink'].push(pref.drink);
            }
            if (pref.qualification) {
                fltr['qualification'].push(pref.qualification);
            }
            if (pref.profession) {
                fltr['profession'].push(pref.profession);
            }
        }
        if (this.activeTab4 != 'activeTab1') {
            this.activeTab4 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
            this.activeTab1 = 'activeTab4';
        }
        setTimeout(function () {
            _this.loading = _this.loadingCtrl.create({
                content: 'Please wait...'
            });
            _this.loading.present();
            _this.customerService.filter(fltr).subscribe(function (data) {
                console.log("data");
                console.log(data);
                _this.customerList = [];
                var x = data.message.findIndex(function (mn) { return mn._id == _this.customerInfo._id; });
                if (x > -1) {
                    data.message.splice(x, 1);
                    _this.customerList = data.message;
                }
                else {
                    _this.customerList = data.message;
                }
                _this.loading.dismiss();
            });
        }, 1000);
    };
    HomePage.prototype.profiles_list = function (type) {
        var _this = this;
        if (type == 'local') {
            this.filterBy.country = [];
            this.filterBy.country.push(this.customerInfo.countryName);
            if (this.activeTab3 != 'activeTab1') {
                this.activeTab3 = 'activeTab1';
                this.activeTab2 = 'activeTab2';
                this.activeTab1 = 'activeTab3';
                this.activeTab4 = 'activeTab4';
            }
            this.getAllCustomers();
        }
        if (type == 'global') {
            this.filterBy.country = [];
            this.customerService.getUserCountry().subscribe(function (country) {
                var countrys = country.message.filter(function (item, index, array) {
                    return (item != _this.customerInfo.countryName) && (item != "");
                });
                _this.filterBy.country = countrys;
                _this.getAllCustomers();
            });
            if (this.activeTab2 != 'activeTab1') {
                this.activeTab2 = 'activeTab1';
                this.activeTab1 = 'activeTab2';
                this.activeTab3 = 'activeTab3';
                this.activeTab4 = 'activeTab4';
            }
        }
        if (type == 'match') {
            // this.filterBy.country = [];
            this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", city: [],
                haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [], any: false, searchtype: "match" };
            if (this.customerInfo.preferences) {
                if ((typeof this.customerInfo.preferences.minheight !== 'undefined') && (this.customerInfo.preferences.minheight != "")) {
                    this.filterBy.minheight = this.customerInfo.preferences.minheight;
                }
                if ((typeof this.customerInfo.preferences.maxheight !== 'undefined') && (this.customerInfo.preferences.maxheight != "")) {
                    this.filterBy.maxheight = this.customerInfo.preferences.maxheight;
                }
                if ((typeof this.customerInfo.preferences.haircolor !== 'undefined') && (this.customerInfo.preferences.haircolor != "")) {
                    this.filterBy.haircolor.push(this.customerInfo.preferences.haircolor);
                }
                if ((this.customerInfo.preferences.bodyshape !== 'undefined') && (this.customerInfo.preferences.bodyshape != "")) {
                    this.filterBy.bodyshape.push(this.customerInfo.preferences.bodyshape);
                }
                if ((this.customerInfo.preferences.maritalStatus !== 'undefined') && (this.customerInfo.preferences.maritalStatus != "")) {
                    this.filterBy.maritalStatus.push(this.customerInfo.preferences.maritalStatus);
                }
                if ((this.customerInfo.preferences.smoke !== 'undefined') && (this.customerInfo.preferences.smoke != "")) {
                    this.filterBy.smoke.push(this.customerInfo.preferences.smoke);
                }
                if ((this.customerInfo.preferences.drink !== 'undefined') && (this.customerInfo.preferences.drink != "")) {
                    this.filterBy.drink.push(this.customerInfo.preferences.drink);
                }
                if ((this.customerInfo.preferences.profession !== 'undefined') && (this.customerInfo.preferences.profession != "")) {
                    this.filterBy.profession.push(this.customerInfo.preferences.profession);
                }
                if ((typeof this.customerInfo.preferences.sexualorient !== 'undefined') && (this.customerInfo.preferences.sexualorient != "")) {
                    this.filterBy.sexualorient.push(this.customerInfo.preferences.sexualorient);
                }
                if ((typeof this.customerInfo.preferences.interestedin !== 'undefined') && (this.customerInfo.preferences.interestedin != "")) {
                    this.filterBy.gender.push(this.customerInfo.preferences.interestedin);
                }
                this.getAllCustomers();
            }
            if (this.activeTab4 != 'activeTab1') {
                this.activeTab4 = 'activeTab1';
                this.activeTab2 = 'activeTab2';
                this.activeTab3 = 'activeTab3';
                this.activeTab1 = 'activeTab4';
            }
            /*if (this.activeTab4 != 'activeTab1') {
                this.activeTab4 = 'activeTab1';
                this.activeTab1 = 'activeTab2';
                this.activeTab2 = 'activeTab3';
                this.activeTab3 = 'activeTab4';
            }*/
        }
    };
    HomePage.prototype.getAllCustomers = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.filter(this.filterBy).subscribe(function (data) {
            console.log("data");
            console.log(data);
            _this.customerList = [];
            var x = data.message.findIndex(function (mn) { return mn._id == _this.customerInfo._id; });
            if (x > -1) {
                data.message.splice(x, 1);
                _this.customerList = data.message;
            }
            else {
                _this.customerList = data.message;
            }
            for (var i = 0; i < _this.blockCount; i++) {
                var y = _this.friends.findIndex(function (user) { return user.FromId._id == _this.customerInfo._id && user.status == 4; });
                if (y > -1) {
                    var z = _this.customerList.findIndex(function (blk) { return blk._id == _this.friends[y].ToId._id; });
                    if (z > -1) {
                        _this.customerList.splice(z, 1);
                    }
                }
            }
            _this.loading.dismiss();
            //this.customerList = data.message; 
        });
    };
    HomePage.prototype.getAllAllow = function () {
        var _this = this;
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(function (data) {
            _this.friends = data.message;
            _this.blockCount = 0;
            for (var i = 0; i < _this.friends.length; i++) {
                if (_this.friends[i].status == 4) {
                    _this.blockCount++;
                }
            }
            console.log("this.friends");
            console.log(_this.friends);
        });
    };
    HomePage.prototype.checkblock = function (id) {
        var index1 = this.friends.findIndex(function (item) {
            return item.ToId._id == id && item.status == 4;
        });
        var index2 = this.friends.findIndex(function (item) {
            return item.FromId._id == id && item.status == 4;
        });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    HomePage.prototype.doRefresh = function (refresher) {
        this.profiles_list('all');
        refresher.complete();
    };
    HomePage.prototype.sortUsers = function () {
        this.nav.setRoot(FilterPage);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Nav,
        CustomersService,
        LoadingController,
        NavParams,
        FriendService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map