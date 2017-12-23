webpackJsonp([1],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_about__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__friend_friend__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__messages_messages__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__videocallincoming__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TabsPage = (function () {
    function TabsPage(socketService, customerService, events, navCtrl) {
        this.socketService = socketService;
        this.customerService = customerService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.unreadMessages = [];
        this.unreadMessagesCount = 0;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__messages_messages__["a" /* MessagesPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__friend_friend__["a" /* FriendPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_6__profile_profile__["a" /* ProfilePage */];
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
    }
    TabsPage.prototype.ionViewDidLoad = function () { };
    TabsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.initfuntion();
        this.events.subscribe('messages:badgecounter', function (time) {
            setTimeout(function () {
                _this.initfuntion();
            }, 3000);
        });
    };
    TabsPage.prototype.initfuntion = function () {
        this.myMessage();
        this.messageReceived();
        this.tokboxNewReqReceive();
    };
    TabsPage.prototype.myMessage = function () {
        var _this = this;
        this.unreadMessagesCount = 0;
        this.unreadMessages = [];
        this.customerService.unreadMessage(this.customerInfo._id).subscribe(function (messages) {
            _this.unreadMessages = messages.message;
            if (_this.unreadMessages.length > 0) {
                for (var i = 0; i < _this.unreadMessages.length; i++) {
                    var unread = 0;
                    for (var j = 0; j < _this.unreadMessages[i]['messages'].length; j++) {
                        if (!_this.unreadMessages[i]['messages'][j].isread) {
                            _this.unreadMessagesCount += 1;
                            unread++;
                        }
                        _this.unreadMessages[i]['unreadMessage'] = unread;
                    }
                }
            }
            console.log("messages unreda");
            console.log(_this.unreadMessages);
        });
    };
    TabsPage.prototype.messageReceived = function () {
        var _this = this;
        this.socketService.receiveMessages().subscribe(function (response) {
            console.log("received message on tab");
            console.log(response);
            _this.unreadMessagesCount += 1;
            _this.events.publish('messages:receivedmsg', response, Date.now());
        });
    };
    TabsPage.prototype.tokboxNewReqReceive = function () {
        var _this = this;
        this.socketService.vedioResponse().subscribe(function (response) {
            console.log('New Video Call');
            _this.call_resp = response;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__videocallincoming__["a" /* VideoCallIncomingPage */], { callingto: _this.call_resp });
        });
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"E:\newdating\app\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Viewed" tabIcon="information-circle"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Messages" tabIcon="search" [tabBadge]="unreadMessagesCount"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabTitle="Friends" tabIcon="heart"></ion-tab>\n\n  <ion-tab [root]="tab5Root" tabTitle="Me" tabIcon="person"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_8__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setting_setting__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profileupdate__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProfilePage = (function () {
    function ProfilePage(nav, lf, navCtrl, customerService, alertCtrl, sanitizer) {
        this.nav = nav;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.alertCtrl = alertCtrl;
        this.sanitizer = sanitizer;
        this.gallery = "myPhotos";
        this.url = __WEBPACK_IMPORTED_MODULE_4__app_global__;
        this.profilePrcnt = 20;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_6_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_4__app_global__["url"] + 'upload' });
        this.youtubeUrlForm = this.lf.group({
            videoURL: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__setting_setting__["a" /* SettingPage */]);
    };
    ProfilePage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__profileupdate__["a" /* ProfileUpdatePage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"E:\newdating\app\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  	<button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Profile</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content *ngIf = "currentCustomer">\n\n    <ion-row class="colorWhite bcColor customerDetail">\n\n        <ion-item class="bcColor">\n\n            <ion-avatar item-start>\n\n                <img [src]="customerImage(currentCustomer.image)">\n\n            </ion-avatar>\n\n            <h2>{{currentCustomer.username}}</h2>\n\n            <h2 *ngIf = "!currentCustomer.username">{{currentCustomer.username}}</h2>\n\n            <div>\n\n                <span class="editProfile" (click)="goToUpdateProfile()"><ion-icon name="create" ios="ios-create" md="md-create"></ion-icon></span>\n\n                <span class="setting" (click)="goToSettingPage()"><ion-icon name="settings" ios="ios-settings" md="md-settings"></ion-icon></span>\n\n            </div>\n\n        </ion-item>\n\n    </ion-row>\n\n   \n\n    <!-- <ion-row>\n\n        <ion-col text-center class="margin5-0">\n\n            <label class="fileContainer">\n\n                Add Photo\n\n                <input type="file" name="single" ng2FileSelect [uploader]="uploader" (change)="addPhoto($event)"/>\n\n            </label>\n\n        </ion-col>\n\n    </ion-row> -->\n\n\n\n    <ion-row class="padding6-12">\n\n        <ion-col no-padding col-12 padding-bottom>Profile Complete : {{currentCustomer.profileCompletePercent}} %</ion-col>\n\n        <ion-col no-padding col-12 class="profile100">\n\n            <div  class="profilePercent" [style.width] = "currentCustomer.profileCompletePercent + \'%\'"></div>\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n        <ion-col text-center col-12 class="headingMyPhotos">Gallery</ion-col>\n\n    </ion-row>\n\n    <ion-segment [(ngModel)]="gallery">\n\n        <ion-segment-button value="myPhotos">\n\n            My Photos\n\n        </ion-segment-button>\n\n        <ion-segment-button value="profileVideo">\n\n            My Video\n\n        </ion-segment-button>\n\n        <ion-segment-button value="videoLinks">\n\n            Video Links\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n    <div class="gallery" [ngSwitch]="gallery">\n\n        <ion-list *ngSwitchCase="\'myPhotos\'">\n\n            <ion-row *ngIf = "currentCustomer.myPhotos">\n\n                <ion-col col-3 text-center class="height60px">\n\n                    <ion-row class="fileContainer">\n\n                        <ion-icon class="addButton" name="add-circle" ios="ios-add-circle" md="md-add-circle"></ion-icon>\n\n                        <input type="file" accept="image/*" name="single" ng2FileSelect [uploader]="uploader" (change)="addMedia($event,\'pic\')"/>\n\n                    </ion-row>\n\n                </ion-col>\n\n                \n\n                <ion-col col-3 class="height60px" *ngFor = "let pic of currentCustomer.myPhotos; let i = index ">\n\n                    <img src="{{url.imageUrl}}{{pic}}">\n\n                    <span (click)="deleteImage(i)">x</span>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-list>\n\n\n\n        <ion-list *ngSwitchCase="\'profileVideo\'">\n\n            <ion-row class="fileContainer">\n\n                <ion-icon class="addButton" name="add-circle" ios="ios-add-circle" md="md-add-circle"></ion-icon>\n\n                <input type="file" accept="video/*" name="single" ng2FileSelect [uploader]="uploader" (change)="addMedia($event,\'video\')"/>\n\n            </ion-row>\n\n\n\n            <ion-row *ngIf = "currentCustomer.profileVideo">\n\n                <ion-col col-12 text-center class="height60px">\n\n                    <!-- <video width="100%" controls>\n\n                        <source src="{{url.imageUrl}}{{currentCustomer.profileVideo}}" type="video/mp4">\n\n                    </video> -->\n\n                    <!-- <video  class="video-player" controls [src]="myProfileVideo(currentCustomer.profileVideo)"></video> -->\n\n\n\n                    <video width="400" controls>\n\n                        <source src="{{url.imageUrl}}{{currentCustomer.profileVideo}}" type="video/wmv">\n\n                      Your browser does not support HTML5 video.\n\n                    </video>\n\n\n\n                    <span (click)="deleteVideo(i)">x</span>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-list>\n\n\n\n        <ion-list class="youtubeVideos" *ngSwitchCase="\'videoLinks\'">\n\n            <ion-row *ngIf = "currentCustomer.videolinks">\n\n                <form role="form" [formGroup]="youtubeUrlForm" (ngSubmit)="addYoutubeVideo()">\n\n                    <ion-row>\n\n                        <ion-col col-12 text-center>\n\n                            Add URL : \n\n                        </ion-col>\n\n                        <ion-col col-12>\n\n                            <input formControlName = "videoURL" class="form-control" type="text" value="" name="">\n\n                        </ion-col>\n\n                        <ion-col col-12 text-center>\n\n                            <button class="bcColor textWhite padding3-5" [disabled]="!youtubeUrlForm.valid">Add Video</button>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </form>\n\n\n\n                <ion-col class="video-utube" col-12 *ngFor = "let videoLink of currentCustomer.videolinks; let i = index ">\n\n                    <ion-item no-padding>\n\n                        <div class="video-container">\n\n                            <iframe [src]="videoUrl(videoLink)" frameborder="0" width="560" height="315"></iframe>\n\n                        </div>\n\n                    </ion-item>\n\n                    <span (click)="deleteLink(i)">x</span>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-list>\n\n    </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__changepassword__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plan__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service_socket_service__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingPage = (function () {
    function SettingPage(socketService, nav, navCtrl, alertCtrl) {
        this.socketService = socketService;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.pages = [
            { icon: 'person', title: 'Change Password', component: __WEBPACK_IMPORTED_MODULE_2__changepassword__["a" /* ChangePasswordPage */] },
            { icon: 'person', title: 'My Plan', component: __WEBPACK_IMPORTED_MODULE_3__plan__["a" /* PlanPage */] },
        ];
    }
    SettingPage.prototype.openPage = function (page) {
        this.navCtrl.push(page.component);
    };
    SettingPage.prototype.logout = function () {
        this.socketService.customerOffline();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        console.log('sdfjhbsdjh');
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-setting',template:/*ion-inline-start:"E:\newdating\app\src\pages\setting\setting.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            Setting\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list>\n\n        <button  ion-item ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n            <ion-icon name="{{p.icon}}" item-start></ion-icon> {{p.title}}\n\n        </button>\n\n        <button  ion-item ion-item  (click)="logout()">\n\n            <ion-icon name="power" item-start></ion-icon> Logout\n\n        </button>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\setting\setting.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideocallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VideocallPage = (function () {
    function VideocallPage(navCtrl, navParams, nav, customerService, bannerService, socketService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.customerService = customerService;
        this.bannerService = bannerService;
        this.socketService = socketService;
        this.profile = {};
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_global__["url"] + 'uploads/';
        this.profiles = [];
        this.publishedUser = {};
        this.apiKey = '46002262';
        this.banner = [];
        this.bannerImage = [];
        this.timeslot = [];
        this.timeslotImage = [];
        this.itemplayed = 0;
        this.itemplayedImage = 0;
        this.donebanner = [];
        this.donebannerImage = [];
        this.disconnectcall();
    }
    VideocallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideocallPage');
    };
    VideocallPage.prototype.ngOnInit = function () {
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        console.log(this.cid);
        this.currentcall = this.navParams.get('response');
        this.callsessionid = this.currentcall.share.sessionid;
        this.tokenid = this.currentcall.share.tokenid;
        this.connectedTo = this.currentcall.share.connectedTo;
        this.loadAllTime();
        this.loadAllTimeImage();
        this.getCustomer();
        this.donebanner = [];
    };
    VideocallPage.prototype.ngOnDestroy = function () {
        this.disconnectcall();
        this.setNewTokboxToken();
    };
    /*private whenothervideodisconnect(){
         this.socketService.disconnectToOtherResponse().subscribe(response => {
             this.disconnectcall();
             console.log("dicconed to other");
         });
    }*/
    VideocallPage.prototype.setNewTokboxToken = function () {
        this.customerService.changeTokboxToken(this.cid).subscribe(function (item) {
            console.log(item);
        });
    };
    VideocallPage.prototype.loadAllTime = function () {
        var _this = this;
        this.bannerService.getAllTime().subscribe(function (users) {
            console.log("users.message[0]");
            console.log(users.message[0]);
            if (users.message[0].bannertiming.length > 0) {
                _this.timeslot = users.message[0].bannertiming;
                _this.loadbanners('video');
            }
            else {
                _this.timeslot = [];
            }
        });
    };
    VideocallPage.prototype.loadAllTimeImage = function () {
        var _this = this;
        this.bannerService.getAllTimeImage().subscribe(function (users) {
            console.log("users.message[0] Image");
            console.log(users.message[0]);
            if (users.message[0].bannertiming.length > 0) {
                _this.timeslotImage = users.message[0].bannertiming;
                _this.loadbanners('image');
            }
            else {
                _this.timeslotImage = [];
            }
        });
    };
    VideocallPage.prototype.loadbanners = function (type) {
        var _this = this;
        var obj = { type: type };
        this.bannerService.getAllTypeBanner(obj).subscribe(function (banner) {
            console.log("banner" + type);
            console.log(banner);
            if (type == 'video') {
                _this.banner = banner.message;
            }
            else {
                _this.bannerImage = banner.message;
            }
        });
    };
    VideocallPage.prototype.open = function (random) {
        this.bannervideo = '';
        document.getElementById('myModalbanner').style.display = 'block';
        this.bannervideo = this.banner[random];
    };
    VideocallPage.prototype.openImage = function (random) {
        this.bannerImg = '';
        document.getElementById('mybannerimage').style.display = 'block';
        this.bannerImg = this.bannerImage[random];
    };
    VideocallPage.prototype.opencall = function () {
        console.log("qopencallqqqqq index");
        var random = this.randno();
        console.log(this.donebanner.indexOf(random));
        /*if(this.donebanner.indexIf(random) != -1){}*/
        if (this.donebanner.length < this.timeslot.length) {
            //alert();
            this.setitem(random);
        }
    };
    VideocallPage.prototype.opencallImage = function () {
        console.log("bopencallqqqqq");
        if (this.donebannerImage.length < this.timeslotImage.length) {
            var random = this.randnoImage();
            this.setitemImage(random);
        }
    };
    VideocallPage.prototype.setitem = function (temp) {
        var random = temp;
        var find1 = this.donebanner.indexOf(random);
        if ((find1 != -1) && (this.donebanner.length != this.timeslot.length)) {
            random = this.opencall();
        }
        else {
            this.donebanner.push(random);
            this.repeatset(random);
        }
    };
    VideocallPage.prototype.setitemImage = function (temp) {
        var random = temp;
        var find1 = this.donebannerImage.indexOf(random);
        if ((find1 != -1) && (this.donebannerImage.length != this.timeslotImage.length)) {
            random = this.opencallImage();
        }
        else {
            this.donebannerImage.push(random);
            this.repeatsetImage(random);
        }
    };
    VideocallPage.prototype.repeatset = function (random) {
        var _this = this;
        console.log("repeatsetqqqqqqq");
        this.itemplayed = this.itemplayed + 1;
        var timesetout1 = (this.timeslot[this.itemplayed - 1].time * 1000);
        setTimeout(function () {
            _this.open(random);
            _this.vi();
        }, timesetout1);
    };
    VideocallPage.prototype.repeatsetImage = function (random) {
        var _this = this;
        console.log("repeatsetqqqqqqq");
        this.itemplayedImage = this.itemplayedImage + 1;
        var timesetout = (this.timeslotImage[this.itemplayedImage - 1].time * 1000);
        setTimeout(function () {
            _this.openImage(random);
            // this.viImage();
            console.log(100);
        }, timesetout);
    };
    VideocallPage.prototype.randno = function () {
        var random = Math.floor(Math.random() * this.banner.length);
        console.log("randno" + random);
        return random;
    };
    VideocallPage.prototype.randnoImage = function () {
        var random = Math.floor(Math.random() * this.bannerImage.length);
        console.log("randno" + random);
        return random;
    };
    VideocallPage.prototype.sendMessageOnCall = function (data) {
        var nme = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
        console.log('name', nme);
        this.sessionOBJ.signal({
            type: 'msg',
            data: nme + '@@' + data
        }, function (error) {
            if (error) {
                console.log('Error sending signal:', error.name, error.message);
            }
            else {
                data = '';
            }
        });
        // this.msgList();
        document.getElementById('btn-input').value = "";
    };
    VideocallPage.prototype.close = function () {
        // Get the modal
        document.getElementById('myModalbanner').style.display = 'none';
    };
    VideocallPage.prototype.closeImage = function () {
        // Get the modal
        document.getElementById('mybannerimage').style.display = 'none';
    };
    VideocallPage.prototype.vi = function () {
        var _this = this;
        setTimeout(function () {
            var vid = document.getElementById("myVideo");
            vid.onended = function () {
                _this.bannervideo = '';
                _this.close();
                console.log(_this.donebanner.length, _this.timeslot.length);
                if (_this.donebanner.length < _this.timeslot.length) {
                    //alert();
                    _this.opencall();
                }
            };
        }, 500);
    };
    VideocallPage.prototype.closeviImage = function () {
        var _this = this;
        setTimeout(function () {
            var vid = document.getElementById("mybannerimage");
            _this.bannerImg = '';
            _this.closeImage();
            if (_this.donebannerImage.length < _this.timeslotImage.length) {
                _this.opencallImage();
            }
        }, 500);
    };
    /* private msgList(){
        this.sessionOBJ.on('signal:msg', function(event) {
            var msgHis = document.getElementById('msgHistory');
            var msg = document.createElement('p');
            msg.innerText = event.data;
            msgHis.appendChild(msg);
            msg.scrollIntoView();
        });
    }*/
    VideocallPage.prototype.getCustomer = function () {
        var _this = this;
        this.customerService.getOneCustomer(this.cid).subscribe(function (customers) {
            _this.profile = customers.message;
            _this.token = customers.message.tokboxtoken;
            console.log(customers.message.tokboxsessionid);
            _this.initializeSession(_this.callsessionid, _this.tokenid);
        });
    };
    VideocallPage.prototype.deductPackageCalls = function () {
        /* if(this.currentcall.share.connected == 'yes'){
             this.customerService.getOneCustomer(this.cid).subscribe(customers => {
                 console.log("customers caals");
                 if(customers.message.mypackage){
                     var calls = customers.message.mypackage.remaincalls - 1;
                     customers.message.mypackage.remaincalls = calls;
                     var newob = {_id : this.cid, mypackage : customers.message.mypackage}
                     this.customerService.updateCustomer(newob).subscribe((data) => {
                         console.log("data 22");
                     })
                 }
             });
         }     */
    };
    VideocallPage.prototype.initializeSession = function (sessionId, token) {
        var _this = this;
        console.log("sessionId, token, this.apiKey");
        console.log(sessionId, token, this.apiKey);
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, function (error) {
            if (!error) {
                var publisherProperties = { insertMode: "append" };
                var publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Publishing a stream.');
                    }
                });
            }
            else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: function (event) {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    _this.deductPackageCalls();
                    _this.opencall();
                    _this.opencallImage();
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }
                else {
                    console.log('not any client connected. ');
                }
                /*session.signal(
                {
                    data:"hello"
                },
                (error) => {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");
                    }
                }
                );*/
            },
            connectionDestroyed: function (event) {
                connectionCount--;
                _this.disconnectcall();
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.');
                }
            },
            streamCreated: function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = { width: '100%', height: '100%', insertMode: "append" };
                var subscriber = session.subscribe(event.stream, 'subscriberContainer', subscriberProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                        //console.log(event)
                        console.log('Subscriber added.');
                    }
                });
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                            + 'or because the other party lost their connection.';
                        event.preventDefault(); // Prevent the Subscriber from being removed
                    }
                }
            },
            signal: function (event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                var cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                var nameAndMsg = event.data.split("@@");
                var name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }
                else {
                    name = nameAndMsg[0];
                }
                var msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name + ' : ' + msgggg;
                    msgHis.appendChild(msg);
                }
                var list = document.querySelector("div#msgHistory");
                list.scrollTop = list.scrollHeight;
            }
        });
    };
    VideocallPage.prototype.handleError = function (error) {
        if (error) {
            alert(error.message);
        }
    };
    VideocallPage.prototype.disconnectcall = function () {
        if (this.sessionOBJ) {
            this.sessionOBJ.disconnect();
            if (localStorage.getItem("searchedlist")) {
                var url1 = JSON.parse(localStorage.getItem("searchedlist"));
                localStorage.removeItem("searchedlist");
                console.log("urlo", url1, window.location.origin);
                var ori = window.location.origin;
                var urlretrun = url1.replace(ori, "");
                console.log("urlretrun");
                console.log(urlretrun);
                setTimeout(function () {
                    console.log("coll disonet");
                    //this.router.navigate([urlretrun]);     
                }, 500);
            }
            else {
                console.log("coll disonet");
                //this.router.navigate(['customer/profile']); 
            }
        }
    };
    return VideocallPage;
}());
VideocallPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videocall',template:/*ion-inline-start:"E:\newdating\app\src\pages\videocall\videocall.html"*/'<!--\n\n  Generated template for the VideocallPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<style type="text/css">\n\ndiv {  width: 100%;  }  \n\n   .video_height{\n\n    min-height: 480px;\n\n   } \n\n    .modelcontentcustom{\n\n\n\n        border: 0px !important;\n\n        background-color: rgba(255, 255, 255, 0) !important;\n\n        box-shadow: none !important;\n\n\n\n    }\n\n\n\n   div {  \n\n    width: 100%;  \n\n  }  \n\n   .video_height{\n\n    min-height: 480px;\n\n   } \n\n\n\n   .navbar-inverse{\n\n     margin-bottom: 0px;\n\n   }\n\n   .msgHistory_msgvideo::-webkit-scrollbar {\n\n    width: 12px;\n\n}\n\n\n\n.msgHistory_msgvideo::-webkit-scrollbar-track {\n\n    -webkit-box-shadow: inset 0 0 6px white; \n\n    border-radius: 10px;\n\n}\n\n\n\n.msgHistory_msgvideo::-webkit-scrollbar-thumb {\n\n    border-radius: 10px;\n\n    -webkit-box-shadow: inset 0 0 6px white; \n\n}\n\n\n\n #subscriberContainer{ position: absolute; height: 100%; padding: 0px 0px; } \n\n #subscriberContainer.large { width: 640px; height: 480px; }\n\n #subscriberContainer.small{ width:100px; height: 100px; }\n\n @media screen and (max-width: 650px) \n\n {\n\n  #subscriberContainer{\n\n   width: 89px; height: 50px; \n\n  }\n\n\n\n  }\n\n\n\n\n\n/* Live List*/\n\n\n\n  #msgviewport{\n\n    height: 300px;\n\n    background: transparent;\n\n    position: absolute;\n\n    bottom: -27px;\n\n    padding-left: 0px;\n\n    padding-right: 0px;\n\n    }   \n\n    .inputsi \n\n    {\n\n           padding: 3px;\n\n    }   \n\n    #btn-chat{\n\n        padding: 11px;\n\n    }\n\n    .disbtn{\n\n       text-align: right;\n\n       margin-bottom: 5px;\n\n    }\n\n\n\n\n\n/* The Modal (background) */\n\n.modalb {\n\n    display: none; /* Hidden by default */\n\n    position: fixed; /* Stay in place */\n\n    z-index: 1; /* Sit on top */\n\n    padding-top: 52px; /* Location of the box */\n\n    left: 0;\n\n    top: 0;\n\n    width: 100%; /* Full width */\n\n    height: 100%; /* Full height */\n\n    overflow: auto; /* Enable scroll if needed */\n\n    background-color: rgb(0,0,0); /* Fallback color */\n\n    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n\n        border-radius: 0px;\n\n}\n\n\n\n/* Modal Content */\n\n.modalb-content {\n\n    position: relative;\n\n    background-color: transparent;\n\n    margin: auto;\n\n    padding: 0;   \n\n    width: 97%;\n\n    height: calc(100% - (67px));\n\n    box-shadow: 0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12);\n\n    -webkit-animation-name: animatetop;\n\n    -webkit-animation-duration: 0.4s;\n\n    animation-name: animatetop;\n\n    animation-duration: 0.4s\n\n}\n\n\n\n/* Add Animation */\n\n@-webkit-keyframes animatetop {\n\n    from {top:-300px; opacity:0} \n\n    to {top:0; opacity:1}\n\n}\n\n\n\n@keyframes animatetop {\n\n    from {top:-300px; opacity:0}\n\n    to {top:0; opacity:1}\n\n}\n\n\n\n/* The Close Button */\n\n.closeb {\n\n    color: white;\n\n    float: right;\n\n    font-size: 28px;\n\n    font-weight: bold;\n\n}\n\n\n\n.closeb:hover,\n\n.closeb:focus {\n\n    color: #000;\n\n    text-decoration: none;\n\n    cursor: pointer;\n\n}\n\n\n\n.modalb-header {\n\n    padding: 2px 16px;\n\n    background-color: white;\n\n    color: black;\n\n}\n\n\n\n.modalb-body {padding: 2px 16px;}\n\n\n\n.modalb-footer {\n\n    padding: 2px 16px;\n\n    background-color: #5cb85c;\n\n    color: white;\n\n}\n\n.mybv{\n\n  padding-left: 20px;\n\n  padding-right: 10px;\n\n}\n\n.pull-rightr{\n\n  text-align: right;\n\n}\n\n.myconnect{\n\n  padding: 30px;\n\n}\n\n.new_process{\n\n  text-align: center;\n\n}\n\n\n\n.new_processv{\n\nmargin-right: 10px;\n\n}\n\n.contain-list{\n\n  min-height: 500px;margin-right: 0px; margin-left: 0px;\n\n}\n\n.input-grop{\n\n  margin-left: -15px; padding-bottom: 10px;\n\n}\n\n\n\n\n\n/*All Profile*/\n\n\n\n.newmainconainer {min-height: 700px;}\n\n\n\n.mypackw{\n\n    color:#4285f4; \n\n    background: white; \n\n    border: 1px solid #4285f4;\n\n    }\n\n\n\n\n\n\n\n/*Live Now*/\n\n\n\n  #msgviewport{\n\n    height: 300px;\n\n    background: transparent;\n\n    position: absolute;\n\n    bottom: -27px;\n\n    padding-left: 14px;\n\n    padding-right: 14px;\n\n    }   \n\n    .inputsi \n\n    {\n\n           padding: 3px;\n\n    }   \n\n    #btn-chat{\n\n        padding: 11px;\n\n    }\n\n    .disbtn{\n\n       text-align: right;\n\n       margin-bottom: 5px;\n\n    }\n\n\n\n\n\n    /*Video Call*/\n\n\n\n\n\n      #msgviewportv{\n\n    height: 500px;\n\n    background: transparent;\n\n    position: absolute;\n\n    bottom: -27px;\n\n    padding-left: 14px;\n\n    padding-right: 14px;\n\n    }   \n\n    .inputsi \n\n    {\n\n           padding: 3px;\n\n    }   \n\n    #btn-chat{\n\n        padding: 11px;\n\n    }\n\n    .disbtn{\n\n       text-align: right;\n\n       margin-bottom: 5px;\n\n    }\n\n\n\n\n\n    /*Page show*/\n\n\n\n    .title-show1 {padding-bottom: 10px; border-bottom: 1px solid lightgrey; text-transform: capitalize;    }\n\n\n\n    .namecls{\n\n        font-size: 12px;\n\n    }\n\n\n\n\n\n   \n\n[class*=\'closep-\'] {\n\n  color: #777;\n\n  font: 14px/100% arial, sans-serif;\n\n  position: absolute;\n\n  right: 5px;\n\n  text-decoration: none;\n\n  text-shadow: 0 1px 0 #fff;\n\n  top: 5px;\n\n}\n\n\n\n\n\n.closep-thik:after {\n\n  content: \'✖\'; /* UTF-8 symbol */\n\n}\n\n\n\n/* Dialog */\n\n\n\n.dialogg {\n\n  background: #ddd;\n\n  \n\n  border-radius: 5px;\n\n  float: right;\n\n  width: 411px;\n\n  height: 100px;\n\n  margin: 20px;\n\n  position: relative;\n\n  \n\n  \n\n}\n\n\n\n/* Container */\n\n\n\n\n\n.containerad:after {\n\n  content: \'\';\n\n  display: block;\n\n  clear: both;\n\n}\n\n.imgadv{\n\n width: 411px;\n\n height: 100px;\n\n}\n\n\n\n.modalb-content11{\n\n    width:500px;\n\n    height: 300px;\n\n}\n\n\n\n.msgHistory_msglive{\n\n    min-height: 220px; max-height: 221px; overflow-y: hidden; font-size: 16px; color:white;\n\n}\n\n\n\n.msgHistory_msgvideo{\n\n    min-height: 220px; max-height: 221px; overflow-y: scroll; font-size: 16px; color:white;\n\n}\n\n.panelselected{\n\n    background-color: rgba(221, 221, 221, 0.59);\n\n}\n\n.navbar{\n\n    margin-bottom: 0px !important;\n\n}\n\n\n\n.myPanelHeading{\n\n padding:0px !important;\n\n }\n\n ul#menu {\n\n margin-bottom: 0px !important;\n\n padding-left: 0px !important;\n\n }\n\n ul#menu li {\n\n display:inline;\n\n padding: 8px; \n\n }\n\n .myPanelBody{\n\n  padding:5px !important;\n\n }\n\n\n\n .panel-body.myPanelBody.myBoxHeading {\n\n  background: rgba(0, 0, 0, 0.41);\n\n  position: absolute;\n\n  bottom: 52px;\n\n  color: #fff;\n\n  width: 139px; \n\n }\n\n\n\n .panel-body.myPanelBody.myBoxHeading > p\n\n {\n\n margin-bottom:0px !important;}\n\n .text-online {\n\n color: #8cde8e;\n\n }\n\n .img-responsivenot\n\n {\n\n    width: 139px;\n\n    height: 141px;\n\n\n\n }\n\n .newvideocls{\n\n    text-align: center;\n\n }\n\n div#subscriberContainer> div.OT_subscriber {\n\n    height: 100% !important;\n\n}\n\n.OT_publisher, .OT_subscriber {\n\n    position: absolute !important;\n\n}\n\n.OT_publisher{\n\n    z-index: 1;\n\n}\n\n#publisherContainer{\n\n    position: absolute;\n\n    z-index: 10;\n\n}\n\n#subscriberContainer {\n\n    padding-top: 0px !important;\n\n}\n\n\n\n.publisherContainerp1{\n\n	position: absolute;\n\n}\n\n\n\n</style>\n\n\n\n\n\n<ion-header> \n\n  <ion-navbar>\n\n    <ion-title>Video Call</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n\n\n<div class="mainContainer" style="padding-top: 60px; box-shadow:none; height: calc(100% - (38px)); position: relative;">\n\n	<div id="videos"  class="video_height">\n\n\n\n       <div id="publisherContainer" class="publisherContainerp1">\n\n\n\n       </div> \n\n       <div id="subscriberContainer">\n\n\n\n       </div>\n\n        <div id="mybannerimage" class="containerad pull-right" style="float:right;">\n\n            <div class="dialogg" *ngIf="bannerImg">\n\n              <a href="javascript:void(0)" class="closep-thik" (click)="closeviImage()"></a>\n\n              <img class="imgadv" src="{{url}}{{bannerImg.path}}" />\n\n          </div>\n\n        </div>\n\n       <div id="msgviewport">\n\n      <!-- <img src="" width="400px" height="200px" /> -->\n\n      <form id="textChatForm">           \n\n      <div id="msgHistory" class="msgHistory_msgvideo"></div>\n\n          <div class="disbtn" style="margin-top: 5px;">\n\n             <a class="btn btn-danger" (click)="disconnectcall()"> Disconnect </a>\n\n         </div>	\n\n         <div class="input-group">\n\n             <input id="btn-input" #textMsg type="text" class="form-control input-sm inputsi" placeholder="Type your message here..."  (keyup.enter)="sendMessageOnCall(textMsg.value)" style="color:black; height: 42px;padding: 3px" >\n\n             <span class="input-group-btn">\n\n                 <button class="btn btn-warning btn-sm" id="btn-chat" (click)="sendMessageOnCall(textMsg.value)">Send</button>\n\n             </span>\n\n         </div>\n\n     </form>\n\n </div>\n\n</div> \n\n</div>\n\n</ion-content>\n\n\n\n\n\n<!-- The Modal -->\n\n<div id="myModalbanner" class="modal">\n\n  <!-- Modal content -->\n\n  <div class="modal-content modelcontentcustom"> \n\n\n\n    <div class="modal-body">\n\n       <div id="newvideo" class="newvideocls" *ngIf="bannervideo">    \n\n         <video id="myVideo" width="520" height="440" autoplay="autoplay">\n\n           <source id="" src="{{url}}{{bannervideo.path}}" type="video/mp4">\n\n           </video>\n\n       </div>\n\n      <!--  <div class="text-center"><a  class="btn btn-danger" (click)="disconnectcall()"> Disconnect </a></div> -->\n\n   </div>\n\n\n\n</div>\n\n</div>'/*ion-inline-end:"E:\newdating\app\src\pages\videocall\videocall.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["a" /* BannerService */], __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */]])
], VideocallPage);

//# sourceMappingURL=videocall.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(287);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customer_service__ = __webpack_require__(36);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__customer_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__(171);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__socket_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__friend_service__ = __webpack_require__(312);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__friend_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__package_service__ = __webpack_require__(313);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__package_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__banner_service__ = __webpack_require__(314);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__banner_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageUrl", function() { return imageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url", function() { return url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frontUrl", function() { return frontUrl; });
var imageUrl = 'http://34.209.114.118:4005/uploads/';
var url = 'http://34.209.114.118:4005/';
var frontUrl = 'http://34.209.114.118:3000/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/videocall/videocall.module": [
		345,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*npm install @types/socket.io-client --save*/
//import * as io from 'socket.io-client';

var SocketService = (function () {
    function SocketService(http, socket) {
        this.http = http;
        this.socket = socket;
    }
    SocketService.prototype.customerOnline = function () {
        console.log(this.socket.ioSocket.id);
        if (this.socket.ioSocket.id) {
            if (localStorage.getItem('currentCustomer')) {
                var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
                var sid = this.socket.ioSocket.id;
                var obj = { fromId: currentCustomer._id, fromSocketId: sid };
                console.log('obj', obj);
                this.socket.emit('iamonline', obj);
            }
        }
    };
    SocketService.prototype.checkconnection = function () {
        return this.socket.ioSocket.connected;
    };
    /*before customerOnline2*/
    SocketService.prototype.onReloadCustomerOnline = function () {
        var _this = this;
        setTimeout(function () {
            if (localStorage.getItem('currentCustomer')) {
                var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
                var sid = _this.socket.ioSocket.id;
                var obj = { fromId: currentCustomer._id, fromSocketId: sid };
                _this.socket.emit('iamonline2', obj);
            }
        }, 2000);
    };
    SocketService.prototype.customerOffline = function () {
        if (localStorage.getItem("currentCustomer")) {
            var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            var sid = this.socket.ioSocket.id;
            var obj = { fromId: currentCustomer._id, fromSocketId: sid };
            this.socket.emit('iamoffline', obj);
            localStorage.removeItem('currentCustomer');
        }
    };
    SocketService.prototype.onlineList = function () {
        var _this = this;
        this.removelisner();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('chat-list-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineListon2 = function () {
        var _this = this;
        //this.removelisner5();     
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('chat-list-response-online2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.offline2 = function () {
        var _this = this;
        this.removelisner6();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('offline2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineList2emit = function () {
        var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        var obj1 = { cid: currentCustomer };
        this.socket.emit('getAllonline', obj1);
    };
    SocketService.prototype.onlineList2 = function () {
        var _this = this;
        this.removelisner2();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('chat-list-response2', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.onlineList3emit = function () {
        var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        var obj1 = { cid: currentCustomer };
        this.socket.emit('getAllonline3', obj1);
    };
    SocketService.prototype.onlineList3 = function () {
        var _this = this;
        this.removelisner7();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('chat-list-response3', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.disconnect = function () {
        if (this.socket.ioSocket.connected == true) {
            this.socket.disconnect();
        }
    };
    SocketService.prototype.selectForChat = function (userId, myid) {
        this.socket.emit('select-for-chat', { cid: userId, resid: myid });
    };
    SocketService.prototype.selectForChatResponse = function () {
        var _this = this;
        this.removelisner3();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('select-for-chat-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.sendMessage = function (message) {
        this.socket.emit('add-message', message);
    };
    SocketService.prototype.receiveMessages = function () {
        var _this = this;
        this.removelisner4();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('add-message-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.video = function (data) {
        this.socket.emit('add-vedio', data);
    };
    SocketService.prototype.vedioResponse = function () {
        var _this = this;
        this.removelisner9();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('vedio-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.vediocallaccept = function (data) {
        this.socket.emit('add-vedio-accept', data);
    };
    SocketService.prototype.callrecivedresponse = function () {
        var _this = this;
        this.removelisner8();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('callrecivedresponse', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.callcancel = function (data) {
        console.log("callcaneccallcanec");
        console.log(data);
        this.socket.emit('cancel-vedio-call', data);
    };
    SocketService.prototype.cancalvediocallresponse = function () {
        var _this = this;
        this.removelisner10();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('cancel-vedio-call-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.liveBrodcast = function (data) {
        console.log("liveBrodcast");
        this.socket.emit("live-broadcast", data);
    };
    SocketService.prototype.viewby = function (data) {
        this.socket.emit("viewby", data);
    };
    SocketService.prototype.viewbyResponse = function () {
        var _this = this;
        this.removelisner14();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('viewby-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.liveBrodcastResponse = function () {
        var _this = this;
        this.removelisner11();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('live-broadcast-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.speeddatingvideo = function (data) {
        this.socket.emit('speed-dating-video', data);
    };
    SocketService.prototype.speeddatingResponse = function () {
        var _this = this;
        this.removelisner13();
        var observable = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('speed-dating-video-response', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    SocketService.prototype.removelisner = function () {
        this.socket.removeAllListeners("chat-list-response");
    };
    SocketService.prototype.removelisner2 = function () {
        this.socket.removeAllListeners("chat-list-response2");
    };
    SocketService.prototype.removelisner3 = function () {
        this.socket.removeAllListeners("select-for-chat-response");
    };
    SocketService.prototype.removelisner4 = function () {
        this.socket.removeListener("add-message-response");
    };
    SocketService.prototype.removelisner5 = function () {
        this.socket.removeAllListeners("chat-list-response-online2");
    };
    SocketService.prototype.removelisner6 = function () {
        this.socket.removeAllListeners("offline2");
    };
    SocketService.prototype.removelisner7 = function () {
        this.socket.removeAllListeners("chat-list-response3");
    };
    SocketService.prototype.removelisner8 = function () {
        this.socket.removeAllListeners("callrecivedresponse");
    };
    SocketService.prototype.removelisner9 = function () {
        this.socket.removeAllListeners("vedio-response");
    };
    SocketService.prototype.removelisner10 = function () {
        this.socket.removeAllListeners("cancel-vedio-call-response");
    };
    SocketService.prototype.removelisner11 = function () {
        this.socket.removeAllListeners("live-broadcast-response");
    };
    SocketService.prototype.removelisner12 = function () {
        this.socket.removeAllListeners("disconnect-to-other-response");
    };
    SocketService.prototype.removelisner13 = function () {
        this.socket.removeAllListeners("speed-dating-video-response");
    };
    SocketService.prototype.removelisner14 = function () {
        this.socket.removeAllListeners("viewby-response");
    };
    return SocketService;
}());
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__["Socket"]])
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ModalContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(events, navCtrl, nav, customerService, loadingCtrl, navParams, friendService, modalCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.friendService = friendService;
        this.modalCtrl = modalCtrl;
        this.customerList = [];
        this.friends = [];
        this.activeTab1 = 'activeTab1';
        this.activeTab2 = 'activeTab2';
        this.activeTab3 = 'activeTab3';
        this.activeTab4 = 'activeTab4';
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        this.activeTab = "";
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.getAllAllow();
            this.getLocal();
        }
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.subscribe("filter:data", function (data) {
            var filter = data.filterBy;
            _this.filterSearch(filter);
        });
    };
    HomePage.prototype.progressOn = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    HomePage.prototype.someEvent = function () {
        console.log("someEvent");
    };
    /* Local */
    HomePage.prototype.getLocal = function () {
        this.progressOn();
        this.activeTab = 'local';
        if (this.activeTab3 != 'activeTab1') {
            this.activeTab3 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab1 = 'activeTab3';
            this.activeTab4 = 'activeTab4';
        }
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        this.filterBy.country = [];
        if (this.filterBy.country.indexOf(this.customerInfo.countryName) == -1) {
            this.filterBy.country.push(this.customerInfo.countryName);
        }
        this.getAllCustomers();
    };
    /* GLobal */
    HomePage.prototype.getGlobal = function (type) {
        var _this = this;
        this.progressOn();
        this.activeTab = 'global';
        if (this.activeTab2 != 'activeTab1') {
            this.activeTab2 = 'activeTab1';
            this.activeTab1 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
            this.activeTab4 = 'activeTab4';
        }
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        this.customerService.getUserCountry().subscribe(function (country) {
            var countrys = country.message.filter(function (item, index, array) {
                return (item != _this.customerInfo.countryName) && (item != "");
            });
            if (countrys.length == 0) {
                _this.filterBy.country.push("no");
            }
            else {
                _this.filterBy.country = countrys;
            }
            _this.getAllCustomers();
        });
    };
    /* Match */
    HomePage.prototype.getMatch = function (type) {
        this.progressOn();
        this.activeTab = 'match';
        if (this.activeTab4 != 'activeTab1') {
            this.activeTab4 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        if (typeof this.customerInfo['preferences'] != 'undefined') {
            if ((typeof this.customerInfo.preferences.haircolor !== 'undefined') && (this.customerInfo.preferences.haircolor != "")) {
                this.filterBy['haircolor'].push(this.customerInfo.preferences.haircolor);
            }
            if ((typeof this.customerInfo.preferences.bodyshape != "undefined") && (this.customerInfo.preferences.bodyshape != "")) {
                this.filterBy['bodyshape'].push(this.customerInfo.preferences.bodyshape);
            }
            if ((typeof this.customerInfo.preferences.maritalStatus != 'undefined') && (this.customerInfo.preferences.maritalStatus != "")) {
                this.filterBy['maritalstatus'].push(this.customerInfo.preferences.maritalStatus);
            }
            if ((typeof this.customerInfo.preferences.smoke !== 'undefined') && (this.customerInfo.preferences.smoke != '')) {
                this.filterBy['smoke'].push(this.customerInfo.preferences.smoke);
            }
            if ((typeof this.customerInfo.preferences.drink !== 'undefined') && (this.customerInfo.preferences.drink != '')) {
                this.filterBy['drink'].push(this.customerInfo.preferences.drink);
            }
            if ((typeof this.customerInfo.preferences.profession !== 'undefined') && (this.customerInfo.preferences.profession != "")) {
                this.filterBy['profession'].push(this.customerInfo.preferences.profession);
            }
            if ((typeof this.customerInfo.preferences.sexualorient !== 'undefined') && (this.customerInfo.preferences.sexualorient != "")) {
                this.filterBy.sexualorient.push(this.customerInfo.preferences.sexualorient);
            }
            if ((typeof this.customerInfo.preferences.interestedin !== 'undefined') && (this.customerInfo.preferences.interestedin != "")) {
                this.filterBy.gender.push(this.customerInfo.preferences.interestedin);
            }
            if ((typeof this.customerInfo.preferences.minheight !== 'undefined') && (this.customerInfo.preferences.minheight != "")) {
                this.filterBy.minheight = this.customerInfo.preferences.minheight;
            }
            if ((typeof this.customerInfo.preferences.maxheight !== 'undefined') && (this.customerInfo.preferences.maxheight != "")) {
                this.filterBy.maxheight = this.customerInfo.preferences.maxheight;
            }
        }
        this.getAllCustomers();
    };
    /* Filter */
    HomePage.prototype.filterSearch = function (filter) {
        console.log("filter");
        console.log(filter);
        this.filterBy = filter;
        this.getAllCustomers();
    };
    HomePage.prototype.getAllCustomers = function () {
        var _this = this;
        console.log("this.filterBy for customers");
        console.log(this.filterBy);
        this.customerService.filter(this.filterBy).subscribe(function (data) {
            //console.log("data match");
            //console.log(data);
            _this.loading.dismiss();
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
        this.getAllCustomers();
        refresher.complete();
    };
    HomePage.prototype.filterResults = function () {
        var modal = this.modalCtrl.create(ModalContentPage, {
            filterBy: this.filterBy
        });
        modal.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"E:\newdating\app\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Home</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    <ion-row class="bcColor">\n\n        \n\n        <!--<ion-col text-center [ngClass] = "activeTab1" (click)="getGlobal()">All</ion-col>-->\n\n        <ion-col text-center [ngClass] = "activeTab3" (click)="getLocal(\'default\')"> LOCAL </ion-col>\n\n        <ion-col text-center [ngClass] = "activeTab2" (click)="getGlobal(\'default\')"> GLOBAL </ion-col>\n\n        <ion-col text-center [ngClass] = "activeTab4" (click)="getMatch(\'default\')"> MATCH </ion-col>\n\n\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n        <ion-col text-left padding-left>Filter By</ion-col>\n\n        <ion-col text-right padding-right><ion-icon name="funnel" ios="ios-funnel" md="md-funnel" (click)="filterResults()"></ion-icon></ion-col>\n\n    </ion-row>\n\n\n\n     <page-customer [customers]="customerList" (changeSomething)="someEvent($event)"></page-customer>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], HomePage);

var ModalContentPage = (function () {
    function ModalContentPage(events, platform, params, viewCtrl, customerService) {
        this.events = events;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.customerService = customerService;
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        this.countries = [];
        this.getuserCountry();
        this.filterBy = this.params.get('filterBy');
    }
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalContentPage.prototype.selectOption = function (type) {
        console.log(type);
    };
    ModalContentPage.prototype.getuserCountry = function () {
        var _this = this;
        this.customerService.getUserCountry().subscribe(function (country) {
            _this.countries = country.message;
        });
    };
    ModalContentPage.prototype.showAfterFilter = function () {
        var obj = {
            filterBy: this.filterBy
        };
        this.events.publish("filter:data", obj);
        this.dismiss();
    };
    return ModalContentPage;
}());
ModalContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Filter By\n    </ion-title>\n    <ion-buttons End\t>\n      <button ion-button (click)=\"dismiss()\">\n        <span item-right ion-text color=\"primary\" showWhen=\"ios\">Cancel</span>\n        <ion-icon item-right name=\"md-close\" showWhen=\"android, windows\"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n      \n    <ion-item>\n        <ion-label>Hair Color</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.haircolor\" multiple=\"true\" submitText=\"Ok\" cancelText=\"Cancel\" (ionChange)=\"selectOption('haircolor')\">\n            <ion-option value=\"Black\">Black</ion-option>\n            <ion-option value=\"Light Brown\">Light Brown</ion-option>\n            <ion-option value=\"Brunette/Brown\">Brunette/Brown</ion-option>\n            <ion-option value=\"Red\">Red</ion-option>\n            <ion-option value=\"Blonde\">Blonde</ion-option>\n            <ion-option value=\"Bald/Shaven\">Bald/Shaven</ion-option>\n            <ion-option value=\"Other\">Other</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Body Type</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.bodyshape\" multiple=\"true\" submitText=\"Ok\" cancelText=\"Cancel\" (ionChange)=\"selectOption('bodyshape')\">\n            <ion-option value=\"Petite\">Petite</ion-option>\n            <ion-option value=\"Slender\">Slender</ion-option>\n            <ion-option value=\"Medium\">Medium</ion-option>\n            <ion-option value=\"Few Extra Pounds\">Few Extra Pounds</ion-option>\n            <ion-option value=\"Well Built\">Well Built</ion-option>\n            <ion-option value=\"Overweight\">Overweight</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Smoke</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.smoke\" multiple=\"true\" submitText=\"Ok\" cancelText=\"Cancel\" (ionChange)=\"selectOption('smoke')\">\n            <ion-option value =\"occasionally\">Occasionally</ion-option>\n            <ion-option value =\"never\">Never</ion-option>\n            <ion-option value =\"rarely\">Rarely</ion-option>\n            <ion-option value =\"regularly\">Regularly</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Drink</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.drink\" multiple=\"true\" submitText=\"Ok\" cancelText=\"Cancel\" (ionChange)=\"selectOption('drink')\">\n             <ion-option value =\"occasionally\">Occasionally</ion-option>\n            <ion-option value =\"never\">Never</ion-option>\n            <ion-option value =\"rarely\">Rarely</ion-option>\n            <ion-option value =\"regularly\">Regularly</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Profession</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.profession\" multiple=\"true\" submitText=\"Ok\" cancelText=\"Cancel\" (ionChange)=\"selectOption('profession')\">\n            <ion-option value = \"Aircraft Dispatcher\">Aircraft Dispatcher</ion-option>\n            <ion-option value = \"Aircraft Mechanic\">Aircraft Mechanic</ion-option>\n            <ion-option value = \"Airline Pilot\">Airline Pilot</ion-option>\n            <ion-option value = \"Flight Attendant\">Flight Attendant</ion-option>\n            <ion-option value = \"Arts\">Arts</ion-option>\n            <ion-option value = \"Actor\">Actor</ion-option>\n            <ion-option value = \"Architecture\">Architecture</ion-option>\n            <ion-option value = \"Art Appraiser\">Art Appraiser</ion-option>\n            <ion-option value = \"Art Auctioneer\">Art Auctioneer</ion-option>\n            <ion-option value = \"Artist\">Artist</ion-option>\n            <ion-option value = \"Museum Jobs\">Museum Jobs</ion-option>\n            <ion-option value = \"Music Conductor\">Music Conductor</ion-option>\n            <ion-option value = \"Business\">Business</ion-option>\n            <ion-option value = \"Accountant\">Accountant</ion-option>\n            <ion-option value = \"Administrative Assistant/Secretary\">Administrative Assistant/Secretary</ion-option>\n            <ion-option value = \"Advertising\">Advertising</ion-option>\n            <ion-option value = \"Consultant\">Consultant</ion-option>\n            <ion-option value = \"Financial Advisor\">Financial Advisor</ion-option>\n            <ion-option value = \"Fundraiser\">Fundraiser</ion-option>\n            <ion-option value = \"Government Jobs\">Government Jobs</ion-option>\n            <ion-option value = \"Human Resources\">Human Resources</ion-option>\n            <ion-option value = \"Insurance Agent\">Insurance Agent</ion-option>\n            <ion-option value = \"Investment Banker\">Investment Banker</ion-option>\n            <ion-option value = \"Lawyer\">Lawyer</ion-option>\n            <ion-option value = \"Management\">Management</ion-option>\n            <ion-option value = \"Market Research Analyst\">Market Research Analyst</ion-option>\n            <ion-option value = \"Nonprofit Job\">Nonprofit Job</ion-option>\n            <ion-option value = \"Law Enforcement\">Law Enforcement</ion-option>\n            <ion-option value = \"Criminal Justice\">Criminal Justice</ion-option>\n            <ion-option value = \"Federal Law Enforcement\">Federal Law Enforcement</ion-option>\n            <ion-option value = \"Police Officer\">Police Officer</ion-option>\n            <ion-option value = \"Media\">Media</ion-option>\n            <ion-option value = \"Book Publishing\">Book Publishing</ion-option>\n            <ion-option value = \"Freelance Editor\">Freelance Editor</ion-option>\n            <ion-option value = \"Freelance Writer\">Freelance Writer</ion-option>\n            <ion-option value = \"Public Relations\">Public Relations</ion-option>\n            <ion-option value = \"Web Developer\">Web Developer</ion-option>\n            <ion-option value = \"Writer/Editor\">Writer/Editor</ion-option>\n            <ion-option value = \"Medical\">Medical</ion-option>\n            <ion-option value = \"Doctor\">Doctor</ion-option>\n            <ion-option value = \"Nurse\">Nurse</ion-option>\n            <ion-option value = \"Paramedic\">Paramedic</ion-option>\n            <ion-option value = \"Psychologist\">Psychologist</ion-option>\n            <ion-option value = \"Social Worker\">Social Worker</ion-option>\n            <ion-option value = \"Veterinarian\">Veterinarian</ion-option>\n            <ion-option value = \"Service Industry\">Service Industry</ion-option>\n            <ion-option value = \"Bank Teller\">Bank Teller</ion-option>\n            <ion-option value = \"Call Center\">Call Center</ion-option>\n            <ion-option value = \"Funeral Director\">Funeral Director</ion-option>\n            <ion-option value = \"Hair Stylist\">Hair Stylist</ion-option>\n            <ion-option value = \"Personal Fitness Trainer\">Personal Fitness Trainer</ion-option>\n            <ion-option value = \"Retail\">Retail</ion-option>\n            <ion-option value = \"Sales\">Sales</ion-option>\n            <ion-option value = \"Ski Instructor\">Ski Instructor</ion-option>\n            <ion-option value = \"Waiter\">Waiter</ion-option>\n            <ion-option value = \"Wedding Planner\">Wedding Planner</ion-option>\n            <ion-option value = \"Career Counselor\">Career Counselor</ion-option>\n            <ion-option value = \"School Jobs\">School Jobs</ion-option>\n            <ion-option value = \"Substitute Teacher\">Substitute Teacher</ion-option>\n            <ion-option value = \"Teacher\">Teacher</ion-option>\n            <ion-option value = \"Teaching Abroad\">Teaching Abroad</ion-option>\n            <ion-option value = \"Teaching Online\">Teaching Online</ion-option>\n            <ion-option value = \"Technology\">Technology</ion-option>\n            <ion-option value = \"App Developer\">App Developer</ion-option>\n            <ion-option value = \"Computer Programmer\">Computer Programmer</ion-option>\n            <ion-option value = \"Database Administrator\">Database Administrator</ion-option>\n            <ion-option value = \"Assistant/Secretary\">Assistant/Secretary</ion-option>\n            <ion-option value = \"Programmer\">Programmer</ion-option>\n            <ion-option value = \"Software Developer\">Software Developer</ion-option>\n            <ion-option value = \"Web Developer\">Web Developer</ion-option>\n            <ion-option value = \"Other\">Other</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Marital Status</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.maritalstatus\" multiple=\"true\" cancelText=\"Cancel\" okText=\"Ok\" (ionChange)=\"selectOption('maritalstatus')\">\n            <ion-option value = true>Yes</ion-option>\n            <ion-option value = false>No</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Sex Orientation</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.sexualorient\" multiple=\"true\" cancelText=\"Cancel\" okText=\"Ok\" (ionChange)=\"selectOption('sexualorient')\">\n            <ion-option value = \"Straight\">Straight</ion-option>\n            <ion-option value = \"Bisexual\">Bisexual</ion-option>\n            <ion-option value = \"Lesbian\">Lesbian</ion-option>\n            <ion-option value = \"Gay\">Gay</ion-option>\n            <ion-option value = \"Other\">Other</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Gender</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.gender\" multiple=\"true\" cancelText=\"Cancel\" okText=\"Ok\" (ionChange)=\"selectOption('gender')\">\n            <ion-option value = \"male\">Male</ion-option>\n            <ion-option value = \"female\">Female</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Country</ion-label>\n        <ion-select [(ngModel)]=\"filterBy.country\" multiple=\"true\" cancelText=\"Cancel\" okText=\"Ok\" (ionChange)=\"selectOption('country')\">\n            <ion-option *ngFor=\"let cntry of countries\" value = {{cntry}}>{{cntry}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n   <ion-item class=\"heightSelect\">\n        <ion-label>\n            Min Height:\n        </ion-label>\n        <ion-label> \n            <ion-item>\n            <ion-input type=\"number\" [(ngModel)]=\"filterBy.minheight\"  placeholder=\"Min height\"></ion-input>\n            </ion-item>            \n            </ion-label>\n            </ion-item>\n\n    <ion-item class=\"heightSelect\">\n            <ion-label>\n                Max Height:\n            </ion-label>\n            <ion-label>\n            <ion-item>\n            <ion-input type=\"number\" [(ngModel)]=\"filterBy.maxheight\"  placeholder=\"Max height\"></ion-input>\n            </ion-item> \n            </ion-label>       \n    </ion-item>\n\n    <ion-item class=\"heightSelect\">\n        <ion-label>\n            Min Age:\n        </ion-label>\n        <ion-label> \n            <ion-item>\n            <ion-input type=\"number\" [(ngModel)]=\"filterBy.minage\"  placeholder=\"Min age\"></ion-input>\n            </ion-item>            \n            </ion-label>\n            </ion-item>\n\n            <ion-item class=\"heightSelect\">\n        <ion-label>\n            Max Age:\n        </ion-label>\n        <ion-label> \n            <ion-item>\n            <ion-input type=\"number\" [(ngModel)]=\"filterBy.maxage\"  placeholder=\"Max age\"></ion-input>\n            </ion-item>            \n            </ion-label>\n            </ion-item>\n\n    <ion-item>\n        <ion-label text-center><button  ion-button class=\"bcColor\" (click) = \"showAfterFilter()\"> Search </button></ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */]])
], ModalContentPage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = (function () {
    function AboutPage(navCtrl, customerService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.customerList = [];
    }
    AboutPage.prototype.ionViewDidEnter = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.getCustomer(this.customerInfo._id);
        }
    };
    AboutPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            console.log(_this.customerList.length);
            _this.customerList = cust.message.visitors;
            _this.loading.dismiss();
        });
    };
    AboutPage.prototype.doRefresh = function (refresher) {
        this.getCustomer(this.customerInfo._id);
        refresher.complete();
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-about',template:/*ion-inline-start:"E:\newdating\app\src\pages\about\about.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Viewed</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n     <page-customer [customers]="customerList" (changeSomething)="someEvent($event)"></page-customer>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendPage = (function () {
    function FriendPage(friendService, navCtrl, customerService, loadingCtrl) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.customerList = [];
        this.activeTab1 = 'activeTab1';
        this.activeTab2 = 'activeTab2';
        this.activeTab3 = 'activeTab3';
    }
    FriendPage.prototype.ionViewDidEnter = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myFriends();
        }
    };
    FriendPage.prototype.someEvent = function () {
        console.log("someEvent");
    };
    FriendPage.prototype.myFriends = function () {
        var _this = this;
        if (this.activeTab1 != 'activeTab1') {
            this.activeTab1 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.friendService.myfriends({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("myFriends");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.myPendingRequests = function () {
        var _this = this;
        if (this.activeTab2 != 'activeTab1') {
            this.activeTab2 = 'activeTab1';
            this.activeTab1 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.friendService.mypendingrequest({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("pendingreq");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.myBlocked = function () {
        var _this = this;
        if (this.activeTab3 != 'activeTab1') {
            this.activeTab3 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab1 = 'activeTab3';
        }
        this.friendService.myblocked({ id: this.customerInfo._id }).subscribe(function (data) {
            console.log("myBlocked");
            console.log(data);
            _this.customerList = [];
            _this.customerList = data.message;
        });
    };
    FriendPage.prototype.doRefresh = function (refresher) {
        this.myFriends();
        refresher.complete();
    };
    return FriendPage;
}());
FriendPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-friend',template:/*ion-inline-start:"E:\newdating\app\src\pages\friend\friend.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Friends</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n    <ion-row class="bcColor">\n\n        <ion-col text-center [ngClass] = "activeTab1" (click)="myFriends()">Friends</ion-col>\n\n        <ion-col col-6 text-center [ngClass] = "activeTab2" (click)="myPendingRequests()">Pending Request</ion-col>\n\n        <ion-col text-center [ngClass] = "activeTab3" (click)="myBlocked()">Blocked</ion-col>\n\n    </ion-row>\n\n    <page-customer [customers]="customerList" (changeSomething)="someEvent($event)"></page-customer>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\friend\friend.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* FriendService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], FriendPage);

//# sourceMappingURL=friend.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messagedetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesPage = (function () {
    function MessagesPage(friendService, navCtrl, customerService, loadingCtrl, socketService, events) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.socketService = socketService;
        this.events = events;
        this.unreadMessages = [];
        this.url = __WEBPACK_IMPORTED_MODULE_3__app_global__;
    }
    MessagesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myMessage();
        }
        this.events.subscribe('messages:receivedmsg', function (msg, time) {
            _this.myMessage();
        });
    };
    MessagesPage.prototype.myMessage = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.unreadMessage(this.customerInfo._id).subscribe(function (messages) {
            _this.unreadMessages = messages.message;
            _this.loading.dismiss();
            if (_this.unreadMessages.length > 0) {
                for (var i = 0; i < _this.unreadMessages.length; i++) {
                    var unread = 0;
                    for (var j = 0; j < _this.unreadMessages[i]['messages'].length; j++) {
                        if (!_this.unreadMessages[i]['messages'][j].isread) {
                            unread++;
                        }
                        _this.unreadMessages[i]['unreadMessage'] = unread;
                    }
                }
            }
        });
    };
    MessagesPage.prototype.background = function (unreadMessage) {
        if (unreadMessage > 0) {
            return { 'background': '#d6ecff', 'font-weight': '600' };
        }
        else {
            return { 'background': 'white' };
        }
    };
    MessagesPage.prototype.doRefresh = function (refresher) {
        this.myMessage();
        refresher.complete();
    };
    MessagesPage.prototype.senderPic = function (pic) {
        var imagePath;
        if (typeof pic == "undefined") {
            imagePath = "assets/images/face3.png";
        }
        else {
            imagePath = this.url + pic;
        }
        return imagePath;
    };
    MessagesPage.prototype.selectChat = function (message) {
        var _this = this;
        var messageObj = {};
        this.customerService.getOneCustomer(message.id._id).subscribe(function (data) {
            messageObj['id'] = data.message;
            localStorage.setItem("currentChat", JSON.stringify(data.message));
            _this.events.publish('messages:badgecounter', Date.now());
            var obj = { fromCustId: data.message, toCustId: _this.customerInfo._id };
            _this.customerService.getmessage(obj).subscribe(function (data1) {
                messageObj['messages'] = data1.message;
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__messagedetail__["a" /* MessageDetailPage */], {
                    message: messageObj
                });
            });
        });
    };
    return MessagesPage;
}());
MessagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-messages',template:/*ion-inline-start:"E:\newdating\app\src\pages\messages\messages.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Messages</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n        <ion-row class="borderClass" *ngFor="let message of unreadMessages" (click)="selectChat(message)" [ngStyle]="background(message.unreadMessage)">\n\n            <ion-col col-2>\n\n                <img [src]="senderPic(message.id.profilePic)">\n\n            </ion-col>\n\n            <ion-col col-9 no-padding>\n\n                <ion-row>\n\n                    <ion-col col-12 class="paddingBottom0"><b>{{message.id.firstname}}</b> <span *ngIf = "message.unreadMessage > 0" class="unreadMsgLength" float-right>{{message.unreadMessage}}</span></ion-col>\n\n                    <ion-col col-12 no-padding class="paddingClass" *ngIf="message.messages[message.messages.length-1].message.length > 70">{{message.messages[message.messages.length-1].message.substr(0,70)}}...</ion-col>\n\n\n\n                    <ion-col col-12 no-padding class="paddingClass" *ngIf="message.messages[message.messages.length-1].message.length <=70 ">{{message.messages[message.messages.length-1].message}}</ion-col>\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col col-1 class="forwardIconCol">\n\n                <ion-icon name="arrow-forward" ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\messages\messages.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], MessagesPage);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__setting__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordPage = (function () {
    function ChangePasswordPage(lf, navCtrl, toastCtrl, customerService) {
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.resetForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            oldpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            newpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
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
                        _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__setting__["a" /* SettingPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-change-password',template:/*ion-inline-start:"E:\newdating\app\src\pages\setting\changepassword.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="resetForm" (ngSubmit)="changePass()">\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="oldpassword" placeholder="Old Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="newpassword" placeholder="New Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full class="bcColor" [disabled]="!resetForm.valid">Change Password</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\setting\changepassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */]])
], ChangePasswordPage);

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlanPage = (function () {
    function PlanPage(nav, navCtrl, alertCtrl, customerService, packageService, toastCtrl) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.customerService = customerService;
        this.packageService = packageService;
        this.toastCtrl = toastCtrl;
        this.plan = 'myPlan';
        this.currentCustomer = {};
        this.packages = [];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.getOne(this.currentCustomer._id);
        this.getAllPackages();
    }
    PlanPage.prototype.getOne = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
            _this.currentCustomer = cust.message;
            console.log(_this.currentCustomer);
        });
    };
    PlanPage.prototype.getAllPackages = function () {
        var _this = this;
        this.packageService.getAll().subscribe(function (pkg) {
            console.log("pkg.message");
            console.log(pkg.message);
            _this.packages = pkg.message;
        });
    };
    PlanPage.prototype.buyPackage = function (pkg) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Buy Package?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        if (typeof _this.currentCustomer['mypackage'] != 'undefined') {
                            _this.currentCustomer['packagesPurchased'].push(_this.currentCustomer['mypackage']);
                        }
                        _this.currentCustomer['mypackage'] = pkg;
                        _this.currentCustomer['mypackage']['remaincalls'] = pkg.noofcalls;
                        _this.updateCurrentCustomer();
                        setTimeout(function () {
                            _this.plan = 'myPlan';
                        }, 1000);
                    }
                }
            ]
        });
        confirm.present();
    };
    PlanPage.prototype.updateCurrentCustomer = function () {
        var _this = this;
        this.customerService.updateCustomer(this.currentCustomer).subscribe(function (data) {
            if (!data.error) {
                _this.getToast("Package Added Successfully");
                _this.getOne(_this.currentCustomer._id);
            }
        });
    };
    PlanPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return PlanPage;
}());
PlanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-plan',template:/*ion-inline-start:"E:\newdating\app\src\pages\setting\plan.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            My Plan\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content *ngIf = "currentCustomer">\n\n\n\n    <ion-segment [(ngModel)]="plan">\n\n        <ion-segment-button value="myPlan">\n\n            My Plan\n\n        </ion-segment-button>\n\n        <ion-segment-button value="browsePlan">\n\n            Browse Plan\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n    <div [ngSwitch]="plan">\n\n        <ion-list *ngSwitchCase="\'myPlan\'">\n\n        	<ion-card class="pkg" *ngIf = "currentCustomer.mypackage">\n\n        		<ion-card-header text-capitalize>\n\n        			{{currentCustomer.mypackage.name}}<span float-right>${{currentCustomer.mypackage.price}}</span>\n\n        		</ion-card-header>\n\n        		<ion-card-content>\n\n        			<ion-row><strong>Description : </strong></ion-row>\n\n        			<ion-row><ion-col>{{currentCustomer.mypackage.description}}</ion-col></ion-row>\n\n        			<ion-row>\n\n        				<ion-col><strong>Calls : </strong></ion-col>\n\n        				<ion-col><strong>{{currentCustomer.mypackage.noofcalls}}</strong></ion-col>\n\n        			</ion-row>\n\n        		</ion-card-content>\n\n        		<!-- <span class="deletePkg" (click) = "deletePkg(currentCustomer.mypackage)">x</span> -->\n\n        	</ion-card>\n\n\n\n            <ion-card class="noPckg" *ngIf = "!currentCustomer.mypackage">\n\n        		<ion-card-content text-center>\n\n        			No Package\n\n        		</ion-card-content>\n\n        	</ion-card>\n\n\n\n        	<ion-row class="width90">\n\n        		<ion-col><b>Package History : </b></ion-col>\n\n        	</ion-row>\n\n\n\n        	<ion-row class="width90" *ngIf = "currentCustomer.packagesPurchased">\n\n	        	<ion-row class="width100">\n\n	        		<ion-col col-6><b>Name</b></ion-col>\n\n	        		<ion-col col-3><b>Calls</b></ion-col>\n\n	        		<ion-col col-3><b>Price</b></ion-col>\n\n	        	</ion-row>\n\n\n\n	        	<ion-row class="width100" *ngIf = "currentCustomer.packagesPurchased.length == 0">\n\n		        	<ion-col class="border" padding text-center>No History Available</ion-col>\n\n		        </ion-row>\n\n	        	\n\n	        	<ion-row class="width100" *ngIf = "currentCustomer.packagesPurchased.length > 0">\n\n		        	<ion-row class="width100" *ngFor = "let pkg of currentCustomer.packagesPurchased">\n\n		        		<ion-col col-6>{{pkg.name}}</ion-col>\n\n		        		<ion-col col-3>{{pkg.noofcalls}}</ion-col>\n\n		        		<ion-col col-3>${{pkg.price}}</ion-col>\n\n		        	</ion-row>\n\n		        </ion-row>\n\n	        </ion-row>\n\n        </ion-list>\n\n\n\n        <ion-list *ngSwitchCase="\'browsePlan\'">\n\n        	<ion-card *ngFor = "let pkg of packages">\n\n        		<ion-card-header text-capitalize>\n\n        			{{pkg.name}}<span float-right>${{pkg.price}}</span>\n\n        		</ion-card-header>\n\n        		<ion-card-content>\n\n        			<ion-row><strong>Description : </strong></ion-row>\n\n        			<ion-row><ion-col>{{pkg.description}}</ion-col></ion-row>\n\n        			<ion-row>\n\n        				<ion-col><strong>Calls : </strong></ion-col>\n\n        				<ion-col><strong>{{pkg.noofcalls}}</strong></ion-col>\n\n        			</ion-row>\n\n        			<ion-row text-center>\n\n        				<ion-col><button class="bcColor" (click) = "buyPackage(pkg)">Buy Now</button></ion-col>\n\n        			</ion-row>\n\n        		</ion-card-content>\n\n        	</ion-card>\n\n        </ion-list>\n\n\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\setting\plan.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* PackageService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], PlanPage);

//# sourceMappingURL=plan.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
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
            this.currentCustomer['smoke'] = this.smoke;
        }
        else {
            if (this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['smoke'] = this.smokePref;
            }
            else {
                this.preferences['smoke'] = this.smokePref;
            }
        }
    };
    ProfileUpdatePage.prototype.drinker = function (type) {
        if (type == 'self') {
            this.currentCustomer['drink'] = this.drink;
        }
        else {
            if (this.currentCustomer['preferences']) {
                this.currentCustomer['preferences']['drink'] = this.drinkPref;
            }
            else {
                this.preferences['drink'] = this.drinkPref;
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
        this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__profile__["a" /* ProfilePage */]);
    };
    return ProfileUpdatePage;
}());
ProfileUpdatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile-update',template:/*ion-inline-start:"E:\newdating\app\src\pages\profile\profileupdate.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Profile</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <ion-row class="heading">\n\n            <ion-col col-12>\n\n                Basic Detail\n\n                <span float-right (click)="editBasicInfo()"><ion-icon name="create" ios="ios-create" md="md-create"></ion-icon></span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngIf = "!editBasic" class="width100">\n\n            <ion-row class="width100">\n\n                <ion-col col-4>Name : </ion-col>\n\n                <ion-col>{{currentCustomer.name}}</ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4>Email : </ion-col>\n\n                <ion-col>{{currentCustomer.email}}</ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4>Username : </ion-col>\n\n                <ion-col>{{currentCustomer.username}}</ion-col>\n\n            </ion-row>          \n\n            <ion-row class="width100">\n\n                <ion-col col-4>Address : </ion-col>\n\n                <ion-col> {{currentCustomer.cityName}}, {{currentCustomer.countryName}} </ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4>DOB : </ion-col>\n\n                <ion-col>{{currentCustomer.dateofbirth}}</ion-col>\n\n            </ion-row> \n\n            <ion-row class="width100">\n\n                <ion-col col-4>Gender : </ion-col>\n\n                <ion-col>{{currentCustomer.gender}}</ion-col>\n\n            </ion-row>            \n\n            <ion-row class="width100">\n\n                <ion-col col-4> Interests : </ion-col>\n\n                <ion-col>{{currentCustomer.interests}}</ion-col>\n\n            </ion-row>\n\n            <ion-row class="width100">\n\n                <ion-col col-4> Interests In : </ion-col>\n\n                <ion-col>{{currentCustomer.interestedin}}</ion-col>\n\n            </ion-row>\n\n             <ion-row class="width100">\n\n                <ion-col col-4>Description : </ion-col>\n\n                <ion-col>{{currentCustomer.description}}</ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n        <ion-row class="padding1" *ngIf = "editBasic">\n\n            <form role="form" [formGroup]="BasicInfoForm" (ngSubmit)="update()" class="width100">\n\n                \n\n                <ion-item>\n\n                    <ion-label>\n\n                        <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                    </ion-label>\n\n                    <ion-input formControlName="name" type="text" placeholder="Name"></ion-input>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                    <ion-label>\n\n                        <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                    </ion-label>\n\n                    <ion-input formControlName="username" type="text" disabled="true" placeholder="Username"></ion-input>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                    <ion-label>\n\n                        <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                    </ion-label>\n\n                    <ion-input formControlName="email" type="text" disabled="true" placeholder="Email"></ion-input>\n\n                </ion-item>\n\n              \n\n                <ion-row padding-left>\n\n                <ion-col>Date of Birth</ion-col>\n\n                <ion-col text-right><ion-datetime no-padding displayFormat="MMM DD YYYY" [(ngModel)]="dob" (ionChange)="chooseDOB()" [ngModelOptions]="{standalone: true}"></ion-datetime></ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row class="colorWhite" padding-left>\n\n                <ion-label> Gender : </ion-label>\n\n                <ion-select formControlName="gender" submitText="Ok" cancelText="Cancel">\n\n                <ion-option value="male">Male</ion-option>\n\n                <ion-option value="female">Female</ion-option>                  \n\n                </ion-select>\n\n                </ion-row>\n\n\n\n                <ion-row class="colorWhite" padding-left>\n\n                <ion-label> Interests : </ion-label>\n\n                <ion-select formControlName="interests" submitText="Ok" cancelText="Cancel" multiple="true">\n\n                <ion-option value="Sports">Sports</ion-option>\n\n                <ion-option value="Shopping">Shopping</ion-option>\n\n                <ion-option value="Book">Book</ion-option>\n\n                <ion-option value="Movies">Movies</ion-option>\n\n                <ion-option value="Others">Others</ion-option>                    \n\n                </ion-select>\n\n                </ion-row>\n\n\n\n                <ion-row class="colorWhite" padding-left>\n\n                <ion-label> Interest In : </ion-label>\n\n                <ion-select formControlName="sexualorient" submitText="Ok" cancelText="Cancel">\n\n                    <ion-option value="straight">Straight</ion-option>  \n\n                    <ion-option value="lesbian">Lesbian</ion-option>  \n\n                    <ion-option value="gay">Gay</ion-option>  \n\n                    <ion-option value="other">Other</ion-option>\n\n                </ion-select>\n\n                </ion-row>\n\n\n\n                <ion-row class="colorWhite">\n\n                <ion-item>\n\n                <ion-label>Description</ion-label>\n\n                <ion-textarea formControlName="description"></ion-textarea>\n\n                </ion-item>\n\n                </ion-row>\n\n                <ion-item>\n\n                    <input id="pac-input" type="text" placeholder="Enter your city" [(ngModel)]="citycountry" [ngModelOptions]="{ standalone: true }">\n\n                </ion-item>\n\n                <button ion-button full class="bcColor" [disabled]="!BasicInfoForm.valid">Submit</button>\n\n            </form>\n\n        </ion-row>\n\n    </ion-list>\n\n\n\n    <ion-list>\n\n        <ion-row class="heading">\n\n            <ion-col col-12>\n\n                About\n\n                <span float-right (click)="editAboutSelf()"><ion-icon name="create" ios="ios-create" md="md-create"></ion-icon></span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngIf = "!editSelf" class="width100">\n\n            <ion-row *ngIf = "currentCustomer.height" class="width100">\n\n                <ion-col col-5>Height : </ion-col>\n\n                <ion-col>{{currentCustomer.height}} cm</ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row *ngIf = "currentCustomer.haircolor" class="width100">\n\n                <ion-col col-5>Hair Color : </ion-col>\n\n                <ion-col>{{currentCustomer.haircolor}}</ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row *ngIf = "currentCustomer.bodyshape" class="width100">\n\n                <ion-col col-5>Body Shape : </ion-col>\n\n                <ion-col>{{currentCustomer.bodyshape}}</ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Marital Status : </ion-col>\n\n                <ion-col><span *ngIf = "currentCustomer.maritalStatus">Married</span><span *ngIf = "!currentCustomer.maritalStatus">Never Married</span></ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100" *ngIf = "currentCustomer.maritalStatus">\n\n                <ion-col col-5>Have Children : </ion-col>\n\n                <ion-col><span *ngIf = "currentCustomer.haveChildren">Yes</span><span *ngIf = "!currentCustomer.haveChildren">No</span></ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5> Smoke : </ion-col>\n\n                <ion-col><span *ngIf="currentCustomer.smoke">{{currentCustomer.smoke}}</span>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5> Drink : </ion-col>\n\n                <ion-col>\n\n                    <span *ngIf="currentCustomer.drink"> {{currentCustomer.drink}} </span> \n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row *ngIf = "currentCustomer.profession" class="width100">\n\n                <ion-col col-5>Profession : </ion-col>\n\n                <ion-col>{{currentCustomer.profession}}</ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n        <ion-row class="padding1" *ngIf = "editSelf">\n\n            <ion-item no-padding>\n\n                <ion-label>Height : </ion-label>\n\n                <ion-input type="text" placeholder="Height" value="{{currentCustomer.height}}" (keyup)="height($event,\'self\')"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Choose Hair Color : </ion-label>\n\n                <ion-select [(ngModel)]="colorSelect" submitText="Ok" cancelText="Cancel" (ionChange)="hairColorFunction(\'self\')">\n\n                    <ion-option value="Black">Black</ion-option>\n\n                    <ion-option value="Light Brown">Light Brown</ion-option>\n\n                    <ion-option value="Brunette/Brown">Brunette/Brown</ion-option>\n\n                    <ion-option value="Red">Red</ion-option>\n\n                    <ion-option value="Blonde">Blonde</ion-option>\n\n                    <ion-option value="Bald/Shaven">Bald/Shaven</ion-option>\n\n                    <ion-option value="Other">Other</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Choose Color : </ion-label>\n\n                <ion-select [(ngModel)]="bodySelect" submitText="Ok" cancelText="Cancel" (ionChange)="bodyFunction(\'self\')">\n\n                    <ion-option value="Petite">Petite</ion-option>\n\n                    <ion-option value="Slender">Slender</ion-option>\n\n                    <ion-option value="Medium">Medium</ion-option>\n\n                    <ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>\n\n                    <ion-option value="Well Built">Well Built</ion-option>\n\n                    <ion-option value="Overweight">Overweight</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Marital Status : </ion-label>\n\n                <ion-select [(ngModel)]="maritalStatus" (ionChange)="marriage(\'self\')">\n\n                    <ion-option value=true>Yes</ion-option>\n\n                    <ion-option value=false>No</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Have Children : </ion-label>\n\n                <ion-select [(ngModel)]="haveChildren" (ionChange)="haveChild(\'self\')">\n\n                    <ion-option value=true>Yes</ion-option>\n\n                    <ion-option value=false>No</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Smoke : </ion-label>\n\n                <ion-select [(ngModel)]="smoke" (ionChange)="smoker(\'self\')">\n\n                    <ion-option value ="occasionally">Occasionally</ion-option>\n\n                    <ion-option value ="never">Never</ion-option>\n\n                    <ion-option value ="rarely">Rarely</ion-option>\n\n                    <ion-option value ="regularly">Regularly</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Drink : </ion-label>\n\n                <ion-select [(ngModel)]="drink" (ionChange)="drinker(\'self\')">\n\n                    <ion-option value ="occasionally">Occasionally</ion-option>\n\n                    <ion-option value ="never">Never</ion-option>\n\n                    <ion-option value ="rarely">Rarely</ion-option>\n\n                    <ion-option value ="regularly">Regularly</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Profession</ion-label>\n\n                <ion-select [(ngModel)]="typeOfWork" (ionChange)="profession(\'self\')">\n\n                    <ion-option value = "Aircraft Dispatcher">Aircraft Dispatcher</ion-option>\n\n                    <ion-option value = "Aircraft Mechanic">Aircraft Mechanic</ion-option>\n\n                    <ion-option value = "Airline Pilot">Airline Pilot</ion-option>\n\n                    <ion-option value = "Flight Attendant">Flight Attendant</ion-option>\n\n                    <ion-option value = "Arts">Arts</ion-option>\n\n                    <ion-option value = "Actor">Actor</ion-option>\n\n                    <ion-option value = "Architecture">Architecture</ion-option>\n\n                    <ion-option value = "Art Appraiser">Art Appraiser</ion-option>\n\n                    <ion-option value = "Art Auctioneer">Art Auctioneer</ion-option>\n\n                    <ion-option value = "Artist">Artist</ion-option>\n\n                    <ion-option value = "Museum Jobs">Museum Jobs</ion-option>\n\n                    <ion-option value = "Music Conductor">Music Conductor</ion-option>\n\n                    <ion-option value = "Business">Business</ion-option>\n\n                    <ion-option value = "Accountant">Accountant</ion-option>\n\n                    <ion-option value = "Administrative Assistant/Secretary">Administrative Assistant/Secretary</ion-option>\n\n                    <ion-option value = "Advertising">Advertising</ion-option>\n\n                    <ion-option value = "Consultant">Consultant</ion-option>\n\n                    <ion-option value = "Financial Advisor">Financial Advisor</ion-option>\n\n                    <ion-option value = "Fundraiser">Fundraiser</ion-option>\n\n                    <ion-option value = "Government Jobs">Government Jobs</ion-option>\n\n                    <ion-option value = "Human Resources">Human Resources</ion-option>\n\n                    <ion-option value = "Insurance Agent">Insurance Agent</ion-option>\n\n                    <ion-option value = "Investment Banker">Investment Banker</ion-option>\n\n                    <ion-option value = "Lawyer">Lawyer</ion-option>\n\n                    <ion-option value = "Management">Management</ion-option>\n\n                    <ion-option value = "Market Research Analyst">Market Research Analyst</ion-option>\n\n                    <ion-option value = "Nonprofit Job">Nonprofit Job</ion-option>\n\n                    <ion-option value = "Law Enforcement">Law Enforcement</ion-option>\n\n                    <ion-option value = "Criminal Justice">Criminal Justice</ion-option>\n\n                    <ion-option value = "Federal Law Enforcement">Federal Law Enforcement</ion-option>\n\n                    <ion-option value = "Police Officer">Police Officer</ion-option>\n\n                    <ion-option value = "Media">Media</ion-option>\n\n                    <ion-option value = "Book Publishing">Book Publishing</ion-option>\n\n                    <ion-option value = "Freelance Editor">Freelance Editor</ion-option>\n\n                    <ion-option value = "Freelance Writer">Freelance Writer</ion-option>\n\n                    <ion-option value = "Public Relations">Public Relations</ion-option>\n\n                    <ion-option value = "Web Developer">Web Developer</ion-option>\n\n                    <ion-option value = "Writer/Editor">Writer/Editor</ion-option>\n\n                    <ion-option value = "Medical">Medical</ion-option>\n\n                    <ion-option value = "Doctor">Doctor</ion-option>\n\n                    <ion-option value = "Nurse">Nurse</ion-option>\n\n                    <ion-option value = "Paramedic">Paramedic</ion-option>\n\n                    <ion-option value = "Psychologist">Psychologist</ion-option>\n\n                    <ion-option value = "Social Worker">Social Worker</ion-option>\n\n                    <ion-option value = "Veterinarian">Veterinarian</ion-option>\n\n                    <ion-option value = "Service Industry">Service Industry</ion-option>\n\n                    <ion-option value = "Bank Teller">Bank Teller</ion-option>\n\n                    <ion-option value = "Call Center">Call Center</ion-option>\n\n                    <ion-option value = "Funeral Director">Funeral Director</ion-option>\n\n                    <ion-option value = "Hair Stylist">Hair Stylist</ion-option>\n\n                    <ion-option value = "Personal Fitness Trainer">Personal Fitness Trainer</ion-option>\n\n                    <ion-option value = "Retail">Retail</ion-option>\n\n                    <ion-option value = "Sales">Sales</ion-option>\n\n                    <ion-option value = "Ski Instructor">Ski Instructor</ion-option>\n\n                    <ion-option value = "Waiter">Waiter</ion-option>\n\n                    <ion-option value = "Wedding Planner">Wedding Planner</ion-option>\n\n                    <ion-option value = "Career Counselor">Career Counselor</ion-option>\n\n                    <ion-option value = "School Jobs">School Jobs</ion-option>\n\n                    <ion-option value = "Substitute Teacher">Substitute Teacher</ion-option>\n\n                    <ion-option value = "Teacher">Teacher</ion-option>\n\n                    <ion-option value = "Teaching Abroad">Teaching Abroad</ion-option>\n\n                    <ion-option value = "Teaching Online">Teaching Online</ion-option>\n\n                    <ion-option value = "Technology">Technology</ion-option>\n\n                    <ion-option value = "App Developer">App Developer</ion-option>\n\n                    <ion-option value = "Computer Programmer">Computer Programmer</ion-option>\n\n                    <ion-option value = "Database Administrator">Database Administrator</ion-option>\n\n                    <ion-option value = "Programmer">Programmer</ion-option>\n\n                    <ion-option value = "Software Developer">Software Developer</ion-option>\n\n                    <ion-option value = "Web Developer">Web Developer</ion-option>\n\n                    <ion-option value = "Other">Other</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <button ion-button full class="bcColor" (click)="updateInfo()">Submit</button>\n\n        </ion-row>\n\n    </ion-list>\n\n\n\n    <ion-list>\n\n        <ion-row class="heading">\n\n            <ion-col col-12>\n\n                About Preference\n\n                <span float-right (click)="editAboutPref()"><ion-icon name="create" ios="ios-create" md="md-create"></ion-icon></span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngIf = "!editPref" class="width100">\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Height : </ion-col>\n\n                <ion-col *ngIf = "currentCustomer.preferences">\n\n                ({{currentCustomer.preferences.minheight}} cm &nbsp; -  \n\n                &nbsp; {{currentCustomer.preferences.maxheight}} cm)\n\n               </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Hair Color : </ion-col>\n\n                <ion-col *ngIf = "currentCustomer.preferences && currentCustomer.preferences.haircolor">{{currentCustomer.preferences.haircolor}}</ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Body Shape : </ion-col>\n\n                <ion-col *ngIf = "currentCustomer.preferences && currentCustomer.preferences.bodyshape">{{currentCustomer.preferences.bodyshape}}</ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Marital Status : </ion-col>\n\n                <ion-col><span *ngIf = "currentCustomer.preferences && currentCustomer.preferences.maritalStatus">Married</span><span *ngIf = "currentCustomer.preferences && !currentCustomer.preferences.maritalStatus">Never Married</span></ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100" *ngIf = "currentCustomer.preferences && currentCustomer.preferences.maritalStatus">\n\n                <ion-col col-5>Have Children : </ion-col>\n\n                <ion-col><span *ngIf = "currentCustomer.preferences && currentCustomer.preferences.haveChildren">Yes</span><span *ngIf = "currentCustomer.preferences && !currentCustomer.preferences.haveChildren">No</span></ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Smoke : </ion-col>\n\n                <ion-col>\n\n                    <span *ngIf = "currentCustomer.preferences && currentCustomer.preferences.smoke">{{currentCustomer.preferences.smoke}}</span>\n\n                    </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Drink : </ion-col>\n\n                <ion-col>\n\n                    <span *ngIf = "currentCustomer.preferences && currentCustomer.preferences.drink">{{currentCustomer.preferences.drink}}</span>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n            <ion-row class="width100">\n\n                <ion-col col-5>Profession : </ion-col>\n\n                <ion-col *ngIf = "currentCustomer.preferences && currentCustomer.preferences.profession">{{currentCustomer.preferences.profession}}</ion-col>\n\n            </ion-row>\n\n        </ion-row>\n\n\n\n        <ion-row class="padding1" *ngIf="editPref">\n\n\n\n            <ion-item no-padding>\n\n                <ion-label> Min Height : </ion-label>\n\n                <ion-input *ngIf="currentCustomer.preferences" type="text" placeholder="Height" value="{{currentCustomer.preferences.minheight}}" (keyup)="height($event,\'Pref\', \'min\')"></ion-input>\n\n                <ion-input *ngIf="!currentCustomer.preferences" type="text" placeholder="Height" value="" (keyup)="height($event,\'Pref\')"></ion-input>\n\n            </ion-item>\n\n\n\n             <ion-item no-padding>\n\n                <ion-label> Max Height : </ion-label>\n\n                <ion-input *ngIf="currentCustomer.preferences" type="text" placeholder="Height" value="{{currentCustomer.preferences.maxheight}}" (keyup)="height($event,\'Pref\',\'max\')"></ion-input>\n\n                <ion-input *ngIf="!currentCustomer.preferences" type="text" placeholder="Height" value="" (keyup)="height($event,\'Pref\')"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Choose Hair Color : </ion-label>\n\n                <ion-select [(ngModel)]="colorSelectPref" submitText="Ok" cancelText="Cancel" (ionChange)="hairColorFunction(\'Pref\')">\n\n                    <ion-option value="Black">Black</ion-option>\n\n                    <ion-option value="Light Brown">Light Brown</ion-option>\n\n                    <ion-option value="Brunette/Brown">Brunette/Brown</ion-option>\n\n                    <ion-option value="Red">Red</ion-option>\n\n                    <ion-option value="Blonde">Blonde</ion-option>\n\n                    <ion-option value="Bald/Shaven">Bald/Shaven</ion-option>\n\n                    <ion-option value="Other">Other</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Choose Color : </ion-label>\n\n                <ion-select [(ngModel)]="bodySelectPref" submitText="Ok" cancelText="Cancel" (ionChange)="bodyFunction(\'Pref\')">\n\n                    <ion-option value="Petite">Petite</ion-option>\n\n                    <ion-option value="Slender">Slender</ion-option>\n\n                    <ion-option value="Medium">Medium</ion-option>\n\n                    <ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>\n\n                    <ion-option value="Well Built">Well Built</ion-option>\n\n                    <ion-option value="Overweight">Overweight</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Marital Status : </ion-label>\n\n                <ion-select [(ngModel)]="maritalStatusPref" (ionChange)="marriage(\'Pref\')">\n\n                    <ion-option value=true>Yes</ion-option>\n\n                    <ion-option value=false>No</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding *ngIf = "(currentCustomer[\'preferences\'] && currentCustomer[\'preferences\'][\'maritalStatus\']) || preferences[\'maritalStatus\']">\n\n                <ion-label>Have Children : </ion-label>\n\n                <ion-select [(ngModel)]="haveChildrenPref" (ionChange)="haveChild(\'Pref\')">\n\n                    <ion-option value=true>Yes</ion-option>\n\n                    <ion-option value=false>No</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Smoke : </ion-label>\n\n                <ion-select [(ngModel)]="smokePref" (ionChange)="smoker(\'Pref\')">\n\n                    <ion-option value ="occasionally">Occasionally</ion-option>\n\n                    <ion-option value ="never">Never</ion-option>\n\n                    <ion-option value ="rarely">Rarely</ion-option>\n\n                    <ion-option value ="regularly">Regularly</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Drink : </ion-label>\n\n                <ion-select [(ngModel)]="drinkPref" (ionChange)="drinker(\'Pref\')">\n\n                    <ion-option value ="occasionally">Occasionally</ion-option>\n\n                    <ion-option value ="never">Never</ion-option>\n\n                    <ion-option value ="rarely">Rarely</ion-option>\n\n                    <ion-option value ="regularly">Regularly</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n            <ion-label>Sex Orientation : </ion-label>\n\n            <ion-select [(ngModel)]="sexualorient" (ionChange)="sexualorientf()">\n\n                <ion-option value="straight">Straight</ion-option>\n\n                <ion-option value="lesbian">Lesbian</ion-option>  \n\n                <ion-option value="gay">Gay</ion-option>  \n\n                <ion-option value="other">Other</ion-option>\n\n            </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item no-padding>\n\n                <ion-label>Profession</ion-label>\n\n                <ion-select [(ngModel)]="typeOfWorkPref" (ionChange)="profession(\'Pref\')">\n\n                    <ion-option value = "Aircraft Dispatcher">Aircraft Dispatcher</ion-option>\n\n                    <ion-option value = "Aircraft Mechanic">Aircraft Mechanic</ion-option>\n\n                    <ion-option value = "Airline Pilot">Airline Pilot</ion-option>\n\n                    <ion-option value = "Flight Attendant">Flight Attendant</ion-option>\n\n                    <ion-option value = "Arts">Arts</ion-option>\n\n                    <ion-option value = "Actor">Actor</ion-option>\n\n                    <ion-option value = "Architecture">Architecture</ion-option>\n\n                    <ion-option value = "Art Appraiser">Art Appraiser</ion-option>\n\n                    <ion-option value = "Art Auctioneer">Art Auctioneer</ion-option>\n\n                    <ion-option value = "Artist">Artist</ion-option>\n\n                    <ion-option value = "Museum Jobs">Museum Jobs</ion-option>\n\n                    <ion-option value = "Music Conductor">Music Conductor</ion-option>\n\n                    <ion-option value = "Business">Business</ion-option>\n\n                    <ion-option value = "Accountant">Accountant</ion-option>\n\n                    <ion-option value = "Administrative Assistant/Secretary">Administrative Assistant/Secretary</ion-option>\n\n                    <ion-option value = "Advertising">Advertising</ion-option>\n\n                    <ion-option value = "Consultant">Consultant</ion-option>\n\n                    <ion-option value = "Financial Advisor">Financial Advisor</ion-option>\n\n                    <ion-option value = "Fundraiser">Fundraiser</ion-option>\n\n                    <ion-option value = "Government Jobs">Government Jobs</ion-option>\n\n                    <ion-option value = "Human Resources">Human Resources</ion-option>\n\n                    <ion-option value = "Insurance Agent">Insurance Agent</ion-option>\n\n                    <ion-option value = "Investment Banker">Investment Banker</ion-option>\n\n                    <ion-option value = "Lawyer">Lawyer</ion-option>\n\n                    <ion-option value = "Management">Management</ion-option>\n\n                    <ion-option value = "Market Research Analyst">Market Research Analyst</ion-option>\n\n                    <ion-option value = "Nonprofit Job">Nonprofit Job</ion-option>\n\n                    <ion-option value = "Law Enforcement">Law Enforcement</ion-option>\n\n                    <ion-option value = "Criminal Justice">Criminal Justice</ion-option>\n\n                    <ion-option value = "Federal Law Enforcement">Federal Law Enforcement</ion-option>\n\n                    <ion-option value = "Police Officer">Police Officer</ion-option>\n\n                    <ion-option value = "Media">Media</ion-option>\n\n                    <ion-option value = "Book Publishing">Book Publishing</ion-option>\n\n                    <ion-option value = "Freelance Editor">Freelance Editor</ion-option>\n\n                    <ion-option value = "Freelance Writer">Freelance Writer</ion-option>\n\n                    <ion-option value = "Public Relations">Public Relations</ion-option>\n\n                    <ion-option value = "Web Developer">Web Developer</ion-option>\n\n                    <ion-option value = "Writer/Editor">Writer/Editor</ion-option>\n\n                    <ion-option value = "Medical">Medical</ion-option>\n\n                    <ion-option value = "Doctor">Doctor</ion-option>\n\n                    <ion-option value = "Nurse">Nurse</ion-option>\n\n                    <ion-option value = "Paramedic">Paramedic</ion-option>\n\n                    <ion-option value = "Psychologist">Psychologist</ion-option>\n\n                    <ion-option value = "Social Worker">Social Worker</ion-option>\n\n                    <ion-option value = "Veterinarian">Veterinarian</ion-option>\n\n                    <ion-option value = "Service Industry">Service Industry</ion-option>\n\n                    <ion-option value = "Bank Teller">Bank Teller</ion-option>\n\n                    <ion-option value = "Call Center">Call Center</ion-option>\n\n                    <ion-option value = "Funeral Director">Funeral Director</ion-option>\n\n                    <ion-option value = "Hair Stylist">Hair Stylist</ion-option>\n\n                    <ion-option value = "Personal Fitness Trainer">Personal Fitness Trainer</ion-option>\n\n                    <ion-option value = "Retail">Retail</ion-option>\n\n                    <ion-option value = "Sales">Sales</ion-option>\n\n                    <ion-option value = "Ski Instructor">Ski Instructor</ion-option>\n\n                    <ion-option value = "Waiter">Waiter</ion-option>\n\n                    <ion-option value = "Wedding Planner">Wedding Planner</ion-option>\n\n                    <ion-option value = "Career Counselor">Career Counselor</ion-option>\n\n                    <ion-option value = "School Jobs">School Jobs</ion-option>\n\n                    <ion-option value = "Substitute Teacher">Substitute Teacher</ion-option>\n\n                    <ion-option value = "Teacher">Teacher</ion-option>\n\n                    <ion-option value = "Teaching Abroad">Teaching Abroad</ion-option>\n\n                    <ion-option value = "Teaching Online">Teaching Online</ion-option>\n\n                    <ion-option value = "Technology">Technology</ion-option>\n\n                    <ion-option value = "App Developer">App Developer</ion-option>\n\n                    <ion-option value = "Computer Programmer">Computer Programmer</ion-option>\n\n                    <ion-option value = "Database Administrator">Database Administrator</ion-option>\n\n                    <ion-option value = "Programmer">Programmer</ion-option>\n\n                    <ion-option value = "Software Developer">Software Developer</ion-option>\n\n                    <ion-option value = "Web Developer">Web Developer</ion-option>\n\n                    <ion-option value = "Other">Other</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n\n\n            <button ion-button full class="bcColor" (click)="updateInfo()">Submit</button>\n\n        </ion-row>\n\n    </ion-list>\n\n\n\n    <ion-list>\n\n        <button ion-button full class="bcColor" (click)="backToProfile()">Finish</button>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\newdating\app\src\pages\profile\profileupdate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ProfileUpdatePage);

//# sourceMappingURL=profileupdate.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoCallIncomingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__videocall_videocall__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VideoCallIncomingPage = (function () {
    function VideoCallIncomingPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl, nav) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_global__;
        this.currentcall = navParams.get('callingto');
        this.call_resp = this.currentcall;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
    }
    VideoCallIncomingPage.prototype.ngOnInit = function () {
        this.getCustomer(this.currentcall.connectedTo);
    };
    VideoCallIncomingPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            _this.customer = data.message;
        });
    };
    VideoCallIncomingPage.prototype.customerImage = function (img) {
        var imgPath = "";
        if (img != null) {
            imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    VideoCallIncomingPage.prototype.receivemodel = function (action) {
        if (action == 'yes') {
            var obj1 = { status: true, share: this.call_resp };
            this.callreceived(obj1);
            this.call_resp = {};
            //this.close();
        }
        else {
            var obj2 = { status: false, share: this.call_resp };
            this.callreceived(obj2);
            this.call_resp = {};
            // this.close();
        }
    };
    VideoCallIncomingPage.prototype.callreceived = function (response) {
        if (response.status) {
            var nid = response.share.connectedTo;
            response.share.connectedTo = this.customerInfo._id;
            this.socketService.vediocallaccept(response);
            console.log("Connected user", response);
            //localStorage.setItem("searchedlist", JSON.stringify(window.location.href));
            //this.router.navigate(['customer/video-call/', response.share.sessionid, response.share.tokenid, nid]);           
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__videocall_videocall__["a" /* VideocallPage */], { response: response });
        }
        else {
            response.share.connectedTo = this.customerInfo._id;
            this.socketService.vediocallaccept(response);
        }
    };
    return VideoCallIncomingPage;
}());
VideoCallIncomingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videocallincoming',template:/*ion-inline-start:"E:\newdating\app\src\pages\tabs\videocallincoming.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  	<ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon class="whiteButton" name="more" ios="ios-more" md="md-more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<ion-row *ngIf="customer" no-margin class="width100">\n\n		<ion-row class="width100">\n\n			<ion-row class="width100">\n\n				<img class="customerImage width100" [src]="customerImage(customer.profilePic)"/>\n\n			</ion-row>\n\n			<ion-row text-capitalize class="custDetail white padding5px0px width100">\n\n				<ion-col col-12 no-padding padding-horizontal>{{customer.firstname}} {{customer.lastname}} 				\n\n				</ion-col>\n\n				<ion-col col-12 no-padding padding-horizontal>\n\n					<span>{{customer.age}}, </span><span>{{customer.countryName}}</span>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-row>\n\n		<ion-row>\n\n			<button ion-button color="Cancel" outline (click)="receivemodel(\'yes\')"> Receive </button>\n\n			<button ion-button color="Received" outline (click)="receivemodel(\'no\')"> Cancel </button>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\newdating\app\src\pages\tabs\videocallincoming.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]])
], VideoCallIncomingPage);

//# sourceMappingURL=videocallincoming.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(nav, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.lf = lf;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.forgetForm = this.lf.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    ForgetPasswordPage.prototype.importonViewDidLoad = function () {
    };
    ForgetPasswordPage.prototype.forgetPass = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.forgetPassword(this.forgetForm.value).subscribe(function (data) {
            if (!data.error) {
                loading.dismiss();
                _this.getToast('Email Sent Successfully');
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
            else {
                loading.dismiss();
                _this.getToast(data.data);
            }
        });
    };
    ForgetPasswordPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ForgetPasswordPage;
}());
ForgetPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-forget-password',template:/*ion-inline-start:"E:\newdating\app\src\pages\login\forgetpassword.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Forget Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="forgetForm" (ngSubmit)="forgetPass()" >\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="email" placeholder="Enter Email Address" type="text"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full class="bcColor" [disabled]="!forgetForm.valid">Submit</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\login\forgetpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ForgetPasswordPage);

//# sourceMappingURL=forgetpassword.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__step__ = __webpack_require__(243);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







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
        this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileUploader"]({ url: __WEBPACK_IMPORTED_MODULE_5__app_global__["url"] + 'upload' });
        this.signUpForm = this.lf.group({
            gender: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            dateofbirth: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            interestedin: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
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
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__step__["a" /* StepPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-register',template:/*ion-inline-start:"E:\newdating\app\src\pages\login\register.html"*/'<ion-content padding>\n\n	<h3 text-center class="labelColorOrange margin8">Registration</h3>\n\n	<div *ngIf ="!userRegistered">\n\n		<ion-row>\n\n			<ion-col padding-top col-6>I am :</ion-col>\n\n			<ion-col text-center (click)="selectGender(\'male\')">\n\n				<img [src]="selectedMale(\'chooseGender\')">\n\n			</ion-col>\n\n			<ion-col text-center (click)="selectGender(\'female\')">\n\n				<img [src]="selectedFemale(\'chooseGender\')">\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row>\n\n			<ion-col padding-top col-6>Looking For :</ion-col>\n\n			<ion-col text-center (click)="selectGender(\'maleP\')">\n\n				<img [src]="selectedMale(\'choosePreference\')">\n\n			</ion-col>\n\n			<ion-col text-center (click)="selectGender(\'femaleP\')">\n\n				<img [src]="selectedFemale(\'choosePreference\')">\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row padding-top>\n\n			<ion-col>Date of Birth</ion-col>\n\n			<ion-col text-right><ion-datetime no-padding displayFormat="MMM DD YYYY" [(ngModel)]="event.month" (ionChange)="chooseDOB()"></ion-datetime></ion-col>\n\n		</ion-row>\n\n\n\n		<form role="form" [formGroup]="signUpForm" (ngSubmit)="moveForward()">\n\n			<ion-item no-padding>\n\n				<ion-label floating>Username</ion-label>\n\n				<ion-input formControlName="username" class="form-control" type="text" autofocus></ion-input>\n\n			</ion-item>\n\n			<ion-item no-padding>\n\n				<ion-label floating>Email</ion-label>\n\n				<ion-input formControlName="email" class="form-control" type="email"></ion-input>\n\n			</ion-item>\n\n			<ion-item no-padding>\n\n				<ion-label floating>Password </ion-label>\n\n				<ion-input formControlName="password" class="form-control" type="password"></ion-input>\n\n			</ion-item>\n\n			<button margin-top ion-button full class="bcColor" [disabled]="!signUpForm.valid">Submit</button>\n\n		</form>\n\n		\n\n	</div>\n\n\n\n	<div *ngIf = "userRegistered">\n\n		<ion-row>\n\n			<ion-label>Choose Location :</ion-label>\n\n			<ion-col no-padding col-12 class="locationField"><input id="pac-input" type="text" placeholder="Enter your city"></ion-col>\n\n		</ion-row>\n\n		<ion-row>\n\n			<ion-label>Upload Profile Photo :</ion-label>\n\n			<ion-col col-12 class="profilePic">\n\n				<input type="file" class="form-control" name="single" ng2FileSelect [uploader]="uploader" (change)="onChange($event)"/>\n\n			</ion-col>\n\n		</ion-row>\n\n		<button margin-top ion-button full class="bcColor" [disabled]="!haveImage && !haveAddress" (click)="register()">Submit</button>\n\n	</div>\n\n	\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\login\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StepPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_customer_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StepPage = (function () {
    function StepPage(nav, loadingCtrl, menuCtrl, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.user = {};
        this.preference = {};
        this.colorSelect = 'Black';
        this.colorSelectPref = 'Black';
        this.bodySelect = 'Petite';
        this.bodySelectPref = 'Petite';
        this.children = 'true';
        this.childrenPref = 'true';
        this.smoke = 'false';
        this.smokePref = 'false';
        this.drink = 'false';
        this.drinkPref = 'false';
        this.education = 'High School';
        this.educationPref = 'High School';
        this.typeOfWork = 'Aircraft Dispatcher';
        this.typeOfWorkPref = 'Aircraft Dispatcher';
        this.profileCompletePercent = 15;
        this.showNextStep(0);
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        this.stringifyNumber();
    }
    StepPage.prototype.backgroundImage = function () {
        return ("url('assets/images/bgImage.jpg')");
    };
    StepPage.prototype.stringifyNumber = function () {
        this.profileCompletePercent = this.profileCompletePercent + 8;
    };
    StepPage.prototype.showNextStep = function (index) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Saving...'
        });
        this.loading.present();
        setTimeout(function () {
            var step = document.querySelectorAll("[id^=step]");
            for (var i = 0; i < step.length; i++) {
                step[i].style.display = "none";
            }
            step[index].style.display = "block";
            _this.loading.dismiss();
        }, 1000);
    };
    StepPage.prototype.height = function (event) {
        this.user['height'] = event.target.value;
    };
    StepPage.prototype.addData = function (type) {
        if (type == 'height') {
            if (typeof this.user['height'] == 'undefined' || this.user['height'] == "") {
                this.user['height'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(1);
        }
        if (type == 'haircolor') {
            this.hairColorFunction();
            this.stringifyNumber();
            this.showNextStep(2);
        }
        if (type == 'bodyshape') {
            this.bodyFunction();
            this.stringifyNumber();
            this.showNextStep(3);
        }
        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = this.married;
            this.haveChildren();
            this.stringifyNumber();
            this.showNextStep(4);
        }
        if (type == 'smoke') {
            this.smoker();
            this.stringifyNumber();
            this.showNextStep(5);
        }
        if (type == 'drink') {
            this.drinker();
            this.stringifyNumber();
            this.showNextStep(6);
        }
        if (type == 'prof') {
            this.profession();
            this.stringifyNumber();
            this.showNextStep(7);
        }
    };
    StepPage.prototype.skipStep = function (type) {
        if (type == 'height') {
            this.user['height'] = null;
            this.showNextStep(1);
        }
        if (type == 'haircolor') {
            this.user['haircolor'] = null;
            this.showNextStep(2);
        }
        if (type == 'bodyshape') {
            this.user['bodyshape'] = null;
            this.showNextStep(3);
        }
        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = null;
            this.user['haveChildren'] = null;
            this.showNextStep(4);
        }
        if (type == 'smoke') {
            this.user['smoke'] = null;
            this.showNextStep(5);
        }
        if (type == 'drink') {
            this.user['drink'] = null;
            this.showNextStep(6);
        }
        if (type == 'prof') {
            this.user['profession'] = null;
            this.showNextStep(7);
        }
    };
    StepPage.prototype.hairColorFunction = function () {
        console.log(this.colorSelect);
        this.user['haircolor'] = this.colorSelect;
    };
    StepPage.prototype.bodyFunction = function () {
        this.user['bodyshape'] = this.bodySelect;
    };
    StepPage.prototype.maritalS = function (type) {
        this.married = type;
        this.user['maritalStatus'] = this.married;
    };
    StepPage.prototype.haveChildren = function () {
        if (this.married) {
            if (this.children == 'false') {
                this.user['haveChildren'] = false;
            }
            else {
                this.user['haveChildren'] = true;
            }
        }
    };
    StepPage.prototype.smoker = function () {
        if (this.smoke == 'false') {
            this.user['smoke'] = false;
        }
        else {
            this.user['smoke'] = true;
        }
    };
    StepPage.prototype.drinker = function () {
        if (this.drink == 'false') {
            this.user['drink'] = false;
        }
        else {
            this.user['drink'] = true;
        }
    };
    StepPage.prototype.profession = function () {
        this.user['profession'] = this.typeOfWork;
    };
    /* Start Preferences  */
    StepPage.prototype.minheightPref = function (event) {
        this.preference['minheight'] = event.target.value;
    };
    StepPage.prototype.maxheightPref = function (event) {
        this.preference['maxheight'] = event.target.value;
    };
    StepPage.prototype.hairColorFunctionPref = function () {
        this.preference['haircolor'] = this.colorSelectPref;
    };
    StepPage.prototype.bodyFunctionPref = function () {
        this.preference['bodyshape'] = this.bodySelectPref;
    };
    StepPage.prototype.addDataPref = function (type) {
        console.log(type);
        if (type == 'minheight') {
            if (typeof this.preference['minheight'] == 'undefined' || this.preference['minheight'] == "") {
                this.preference['minheight'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(8);
        }
        if (type == 'maxheight') {
            if (typeof this.preference['maxheight'] == 'undefined' || this.preference['maxheight'] == "") {
                this.preference['maxheight'] = null;
            }
            else {
                this.stringifyNumber();
            }
            this.showNextStep(8);
        }
        if (type == 'haircolor') {
            this.hairColorFunctionPref();
            this.stringifyNumber();
            this.showNextStep(9);
        }
        if (type == 'bodyshape') {
            this.bodyFunctionPref();
            this.stringifyNumber();
            this.showNextStep(10);
        }
    };
    StepPage.prototype.skipStepPref = function (type) {
        if (type == 'minheight') {
            this.preference['minheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'maxheight') {
            this.preference['maxheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'haircolor') {
            this.preference['haircolor'] = null;
            this.showNextStep(9);
        }
        if (type == 'bodyshape') {
            this.preference['bodyshape'] = null;
            this.showNextStep(10);
        }
    };
    StepPage.prototype.activateAccount = function () {
        var _this = this;
        this.user['preferences'] = this.preference;
        this.user['profileCompletePercent'] = this.profileCompletePercent;
        this.customerService.updateCustomer(this.user).subscribe(function (data) {
            if (!data.error) {
                _this.customerService.addactivate(data.message).subscribe(function (dataq) {
                    console.log("dataq");
                    console.log(dataq);
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                });
            }
        });
    };
    StepPage.prototype.goToLoginPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    return StepPage;
}());
StepPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-step',template:/*ion-inline-start:"E:\newdating\app\src\pages\login\step.html"*/'\n\n<ion-content padding [style.background-image] = "backgroundImage()">\n\n	<div>\n\n	    <ion-row class="progress">\n\n		    <ion-row class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" [style.width] = "profileCompletePercent + \'%\'">\n\n		    	<span text-center>{{profileCompletePercent}}%</span>\n\n		    </ion-row>\n\n	    </ion-row>\n\n	</div>\n\n\n\n	<div class="stepsDiv">\n\n		\n\n		<div id="step1" class="colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">How tall You Are?</h3>\n\n			<ion-row *ngIf="user.gender == \'male\'" class="heightIcon">\n\n				<img class="ruler" src="assets/images/ruler.png">\n\n				<ion-icon name="man" ios="ios-man" md="md-man" class="tallHeight"></ion-icon>\n\n			</ion-row>\n\n			<ion-row *ngIf="user.gender == \'female\'" class="heightIcon">\n\n				<img class="ruler" src="assets/images/ruler.png">\n\n				<ion-icon name="woman" ios="ios-woman" md="md-woman" class="tallHeight"></ion-icon>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-item no-padding>\n\n					<ion-label floating>Height</ion-label>\n\n					<ion-input id="heightField" class="form-control" type="text" (keyup)="height($event)" autofocus></ion-input>\n\n				</ion-item>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'height\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'height\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step2" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What is Your hair Color?</h3>\n\n			<ion-row *ngIf="user.gender == \'male\'" class="heightIcon">\n\n				<img src="assets/images/boy-hair1.svg" *ngIf="colorSelect == \'Black\'">				\n\n				<img src="assets/images/boy-hair2.svg" *ngIf="(colorSelect == \'White\') || (colorSelect == \'\')">				\n\n				<img src="assets/images/boy-hair3.svg" *ngIf="colorSelect == \'Light Brown\'">				\n\n				<img src="assets/images/boy-hair4.svg" *ngIf="colorSelect == \'Brunette/Brown\'">				\n\n				<img src="assets/images/boy-hair5.svg" *ngIf="colorSelect == \'Red\'">				\n\n				<img src="assets/images/boy-hair6.svg" *ngIf="colorSelect == \'Blonde\'">				\n\n				<img src="assets/images/boy-hair7.svg" *ngIf="colorSelect == \'Other\'">				\n\n				<img src="assets/images/bald.svg" *ngIf="colorSelect == \'Bald/Shaven\'">	\n\n			</ion-row>\n\n			<ion-row *ngIf="user.gender == \'female\'" class="heightIcon">\n\n				<img src="assets/images/girl-hair1.svg" *ngIf="colorSelect == \'Black\'">\n\n				<img src="assets/images/girl-hair2.svg" *ngIf="(colorSelect == \'White\') || (colorSelect == \'\')">\n\n				<img src="assets/images/girl-hair3.svg" *ngIf="colorSelect == \'Light Brown\'">\n\n				<img src="assets/images/girl-hair4.svg" *ngIf="colorSelect == \'Brunette/Brown\'">\n\n				<img src="assets/images/girl-hair5.svg" *ngIf="colorSelect == \'Red\'">\n\n				<img src="assets/images/girl-hair6.svg" *ngIf="colorSelect == \'Blonde\'">\n\n				<img src="assets/images/girl-hair7.svg" *ngIf="colorSelect == \'Other\'">				\n\n				<img src="assets/images/bald.svg" *ngIf="colorSelect == \'Bald/Shaven\'">\n\n			</ion-row>\n\n\n\n			<ion-row class="colorWhite">\n\n				<ion-label>Choose Color</ion-label>\n\n				<ion-select [(ngModel)]="colorSelect" submitText="Ok" cancelText="Cancel" (ionChange)="hairColorFunction()">\n\n					<ion-option value="Black">Black</ion-option>\n\n					<ion-option value="Light Brown">Light Brown</ion-option>\n\n					<ion-option value="Brunette/Brown">Brunette/Brown</ion-option>\n\n					<ion-option value="Red">Red</ion-option>\n\n					<ion-option value="Blonde">Blonde</ion-option>\n\n					<ion-option value="Bald/Shaven">Bald/Shaven</ion-option>\n\n					<ion-option value="Other">Other</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'haircolor\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'haircolor\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step3" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What is your body type?</h3>\n\n			<ion-row *ngIf="user.gender == \'male\'" class="heightIcon">\n\n				<img src="assets/images/male-body.svg">\n\n			</ion-row>\n\n			<ion-row *ngIf="user.gender == \'female\'" class="heightIcon">\n\n				<img src="assets/images/female-body.svg">\n\n			</ion-row>\n\n\n\n			<ion-row class="colorWhite">\n\n				<ion-label>Choose Color</ion-label>\n\n				<ion-select [(ngModel)]="bodySelect" submitText="Ok" cancelText="Cancel" (ionChange)="bodyFunction()">\n\n					<ion-option value="Petite">Petite</ion-option>\n\n					<ion-option value="Slender">Slender</ion-option>\n\n					<ion-option value="Medium">Medium</ion-option>\n\n					<ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>\n\n					<ion-option value="Well Built">Well Built</ion-option>\n\n					<ion-option value="Overweight">Overweight</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'bodyshape\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'bodyshape\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step4" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">Choose your Marital Status</h3>\n\n			<ion-row class="heightIcon">\n\n				<ion-col text-center *ngIf="user.gender == \'male\'" (click)="maritalS(false)">\n\n					<!-- <img class="maleBody" src="assets/images/male-body.svg"> -->\n\n					<ion-icon class="font100" name="man" ios="ios-man" md="md-man"></ion-icon>\n\n					<ion-row text-center>\n\n						<ion-col>Single</ion-col>\n\n					</ion-row>\n\n				</ion-col>\n\n				<ion-col text-center *ngIf="user.gender == \'female\'" (click)="maritalS(false)">\n\n					<!-- <img src="assets/images/female-body.svg"> -->\n\n					<ion-icon class="font100" name="woman" ios="ios-woman" md="md-woman"></ion-icon>\n\n					<ion-row text-center>\n\n						<ion-col>Single</ion-col>\n\n					</ion-row>\n\n				</ion-col>\n\n				<ion-col (click)="maritalS(true)">\n\n					<img src="assets/images/marriage-couple.svg" class="height100">\n\n					<ion-row text-center>\n\n						<ion-col>Married</ion-col>\n\n					</ion-row>\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-label>Have Children</ion-label>\n\n				<ion-select [(ngModel)]="children" (ionChange)="haveChildren()">\n\n					<ion-option value=true>Yes</ion-option>\n\n					<ion-option value=false>No</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'maritalStatus\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'maritalStatus\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step5" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">Do You Smoke?</h3>\n\n			<ion-row class="heightIcon">				\n\n				<ion-col>\n\n					<img src="assets/images/smoking.svg">\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-label>Choose</ion-label>\n\n				<ion-select [(ngModel)]="smoke" (ionChange)="smoker()">\n\n					<ion-option value ="occasionally">Occasionally</ion-option>\n\n					<ion-option value ="never">Never</ion-option>\n\n					<ion-option value ="rarely">Rarely</ion-option>\n\n					<ion-option value ="regularly">Regularly</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'smoke\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'smoke\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step6" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">Do You Drink?</h3>\n\n			<ion-row class="heightIcon">\n\n				<ion-col>\n\n					<img src="assets/images/drinking.svg">\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-label>Choose</ion-label>\n\n				<ion-select [(ngModel)]="drink" (ionChange)="drinker()">\n\n					<ion-option value ="occasionally">Occasionally</ion-option>\n\n					<ion-option value ="never">Never</ion-option>\n\n					<ion-option value ="rarely">Rarely</ion-option>\n\n					<ion-option value ="regularly">Regularly</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'drink\')">Continue</button>\n\n			</ion-row>\n\n			<span class="skipStep" (click)="skipStep(\'drink\')">Skip</span>\n\n		</div>\n\n		<div id="step7" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What is You ProFession?</h3>\n\n			<ion-row class="heightIcon">\n\n				<ion-col *ngIf="user.gender == \'male\'">\n\n					<img src="assets/images/businessman.svg">\n\n				</ion-col>\n\n				<ion-col *ngIf="user.gender == \'female\'">\n\n					<img src="assets/images/businesswoman.svg">\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-label>Profession</ion-label>\n\n				<ion-select [(ngModel)]="typeOfWork" (ionChange)="profession()">\n\n					<ion-option value = "Aircraft Dispatcher">Aircraft Dispatcher</ion-option>\n\n					<ion-option value = "Aircraft Mechanic">Aircraft Mechanic</ion-option>\n\n					<ion-option value = "Airline Pilot">Airline Pilot</ion-option>\n\n					<ion-option value = "Flight Attendant">Flight Attendant</ion-option>\n\n					<ion-option value = "Arts">Arts</ion-option>\n\n					<ion-option value = "Actor">Actor</ion-option>\n\n					<ion-option value = "Architecture">Architecture</ion-option>\n\n					<ion-option value = "Art Appraiser">Art Appraiser</ion-option>\n\n					<ion-option value = "Art Auctioneer">Art Auctioneer</ion-option>\n\n					<ion-option value = "Artist">Artist</ion-option>\n\n					<ion-option value = "Museum Jobs">Museum Jobs</ion-option>\n\n					<ion-option value = "Music Conductor">Music Conductor</ion-option>\n\n					<ion-option value = "Business">Business</ion-option>\n\n					<ion-option value = "Accountant">Accountant</ion-option>\n\n					<ion-option value = "Administrative Assistant/Secretary">Administrative Assistant/Secretary</ion-option>\n\n					<ion-option value = "Advertising">Advertising</ion-option>\n\n					<ion-option value = "Consultant">Consultant</ion-option>\n\n					<ion-option value = "Financial Advisor">Financial Advisor</ion-option>\n\n					<ion-option value = "Fundraiser">Fundraiser</ion-option>\n\n					<ion-option value = "Government Jobs">Government Jobs</ion-option>\n\n					<ion-option value = "Human Resources">Human Resources</ion-option>\n\n					<ion-option value = "Insurance Agent">Insurance Agent</ion-option>\n\n					<ion-option value = "Investment Banker">Investment Banker</ion-option>\n\n					<ion-option value = "Lawyer">Lawyer</ion-option>\n\n					<ion-option value = "Management">Management</ion-option>\n\n					<ion-option value = "Market Research Analyst">Market Research Analyst</ion-option>\n\n					<ion-option value = "Nonprofit Job">Nonprofit Job</ion-option>\n\n					<ion-option value = "Law Enforcement">Law Enforcement</ion-option>\n\n					<ion-option value = "Criminal Justice">Criminal Justice</ion-option>\n\n					<ion-option value = "Federal Law Enforcement">Federal Law Enforcement</ion-option>\n\n					<ion-option value = "Police Officer">Police Officer</ion-option>\n\n					<ion-option value = "Media">Media</ion-option>\n\n					<ion-option value = "Book Publishing">Book Publishing</ion-option>\n\n					<ion-option value = "Freelance Editor">Freelance Editor</ion-option>\n\n					<ion-option value = "Freelance Writer">Freelance Writer</ion-option>\n\n					<ion-option value = "Public Relations">Public Relations</ion-option>\n\n					<ion-option value = "Web Developer">Web Developer</ion-option>\n\n					<ion-option value = "Writer/Editor">Writer/Editor</ion-option>\n\n					<ion-option value = "Medical">Medical</ion-option>\n\n					<ion-option value = "Doctor">Doctor</ion-option>\n\n					<ion-option value = "Nurse">Nurse</ion-option>\n\n					<ion-option value = "Paramedic">Paramedic</ion-option>\n\n					<ion-option value = "Psychologist">Psychologist</ion-option>\n\n					<ion-option value = "Social Worker">Social Worker</ion-option>\n\n					<ion-option value = "Veterinarian">Veterinarian</ion-option>\n\n					<ion-option value = "Service Industry">Service Industry</ion-option>\n\n					<ion-option value = "Bank Teller">Bank Teller</ion-option>\n\n					<ion-option value = "Call Center">Call Center</ion-option>\n\n					<ion-option value = "Funeral Director">Funeral Director</ion-option>\n\n					<ion-option value = "Hair Stylist">Hair Stylist</ion-option>\n\n					<ion-option value = "Personal Fitness Trainer">Personal Fitness Trainer</ion-option>\n\n					<ion-option value = "Retail">Retail</ion-option>\n\n					<ion-option value = "Sales">Sales</ion-option>\n\n					<ion-option value = "Ski Instructor">Ski Instructor</ion-option>\n\n					<ion-option value = "Waiter">Waiter</ion-option>\n\n					<ion-option value = "Wedding Planner">Wedding Planner</ion-option>					\n\n					<ion-option value = "Career Counselor">Career Counselor</ion-option>\n\n					<ion-option value = "School Jobs">School Jobs</ion-option>\n\n					<ion-option value = "Substitute Teacher">Substitute Teacher</ion-option>\n\n					<ion-option value = "Teacher">Teacher</ion-option>\n\n					<ion-option value = "Teaching Abroad">Teaching Abroad</ion-option>\n\n					<ion-option value = "Teaching Online">Teaching Online</ion-option>\n\n					<ion-option value = "Technology">Technology</ion-option>\n\n					<ion-option value = "App Developer">App Developer</ion-option>\n\n					<ion-option value = "Computer Programmer">Computer Programmer</ion-option>\n\n					<ion-option value = "Database Administrator">Database Administrator</ion-option>\n\n					<ion-option value = "Programmer">Programmer</ion-option>\n\n					<ion-option value = "Software Developer">Software Developer</ion-option>\n\n					<ion-option value = "Web Developer">Web Developer</ion-option>\n\n					<ion-option value = "Other">Other</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addData(\'prof\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStep(\'prof\')">Skip</span>\n\n		</div>\n\n\n\n\n\n\n\n\n\n		<div id="step8" class="colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What’s his/her height?</h3>\n\n\n\n			<ion-row *ngIf="user.interestedin == \'male\'" class="heightIcon">\n\n				<img class="ruler" src="assets/images/ruler.png">\n\n				<ion-icon name="man" ios="ios-man" md="md-man" class="tallHeight"></ion-icon>\n\n			</ion-row>\n\n\n\n			<ion-row *ngIf="user.interestedin == \'female\'" class="heightIcon">\n\n				<img class="ruler" src="assets/images/ruler.png">\n\n				<ion-icon name="woman" ios="ios-woman" md="md-woman" class="tallHeight"></ion-icon>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<ion-item no-padding>\n\n					<ion-label floating>Min Height in cm</ion-label>\n\n					<ion-input id="heightField" class="form-control" type="text" (keyup)="minheightPref($event)" autofocus></ion-input>\n\n				</ion-item>\n\n				<ion-item no-padding>\n\n					<ion-label floating>Max Height in cm</ion-label>\n\n					<ion-input id="heightField" class="form-control" type="text" (keyup)="maxheightPref($event)" autofocus></ion-input>\n\n				</ion-item>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addDataPref(\'maxheight\')">Continue</button>\n\n			</ion-row>\n\n            <ion-row>\n\n			<span class="skipStep" (click)="skipStepPref(\'minheight\')">Skip</span>\n\n		    </ion-row>\n\n		</div>\n\n\n\n		<div id="step9" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What’s his/her hair color?</h3>\n\n\n\n			<ion-row *ngIf="user.interestedin == \'male\'" class="heightIcon">\n\n				<img src="assets/images/boy-hair1.svg" class="img-height" *ngIf="colorSelectPref == \'Black\'">				\n\n				<img src="assets/images/boy-hair2.svg" class="img-height" *ngIf="(colorSelectPref == \'White\') || (colorSelectPref == \'\')">	\n\n				<img src="assets/images/boy-hair3.svg" class="img-height" *ngIf="colorSelectPref == \'Light Brown\'">				\n\n				<img src="assets/images/boy-hair4.svg" class="img-height" *ngIf="colorSelectPref == \'Brunette/Brown\'">				\n\n				<img src="assets/images/boy-hair5.svg" class="img-height" *ngIf="colorSelectPref == \'Red\'">				\n\n				<img src="assets/images/boy-hair6.svg" class="img-height" *ngIf="colorSelectPref == \'Blonde\'">				\n\n				<img src="assets/images/boy-hair7.svg" class="img-height" *ngIf="colorSelectPref == \'Other\'">				\n\n				<img src="assets/images/bald.svg" class="img-height" *ngIf="colorSelectPref == \'Bald/Shaven\'">	\n\n			</ion-row>\n\n			<ion-row *ngIf="user.interestedin == \'female\'" class="heightIcon">\n\n				<img src="assets/images/girl-hair1.svg" class="img-height" *ngIf="colorSelectPref == \'Black\'">\n\n				<img src="assets/images/girl-hair2.svg" class="img-height" *ngIf="(colorSelectPref == \'White\') || (colorSelectPref == \'\')">\n\n				<img src="assets/images/girl-hair3.svg" class="img-height" *ngIf="colorSelectPref == \'Light Brown\'">\n\n				<img src="assets/images/girl-hair4.svg" class="img-height" *ngIf="colorSelectPref == \'Brunette/Brown\'">\n\n				<img src="assets/images/girl-hair5.svg" class="img-height" *ngIf="colorSelectPref == \'Red\'">\n\n				<img src="assets/images/girl-hair6.svg" class="img-height" *ngIf="colorSelectPref == \'Blonde\'">\n\n				<img src="assets/images/girl-hair7.svg" class="img-height" *ngIf="colorSelectPref == \'Other\'">				\n\n				<img src="assets/images/bald.svg" class="img-height" *ngIf="colorSelectPref == \'Bald/Shaven\'">\n\n			</ion-row>\n\n\n\n			<ion-row class="colorWhite">\n\n				<ion-label>Choose Color</ion-label>\n\n				<ion-select [(ngModel)]="colorSelectPref" submitText="Ok" cancelText="Cancel" (ionChange)="hairColorFunctionPref()">\n\n					<ion-option value="Black">Black</ion-option>\n\n					<ion-option value="Light Brown">Light Brown</ion-option>\n\n					<ion-option value="Brunette/Brown">Brunette/Brown</ion-option>\n\n					<ion-option value="Red">Red</ion-option>\n\n					<ion-option value="Blonde">Blonde</ion-option>\n\n					<ion-option value="Bald/Shaven">Bald/Shaven</ion-option>\n\n					<ion-option value="Other">Other</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addDataPref(\'haircolor\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStepPref(\'haircolor\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step10" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin8">What’s his/her body type?</h3>\n\n			<ion-row *ngIf="user.interestedin == \'male\'" class="heightIcon">\n\n				<img src="assets/images/male-body.svg">\n\n			</ion-row>\n\n			<ion-row *ngIf="user.interestedin == \'female\'" class="heightIcon">\n\n				<img src="assets/images/female-body.svg">\n\n			</ion-row>\n\n\n\n			<ion-row class="colorWhite">\n\n				<ion-label>Choose Color</ion-label>\n\n				<ion-select [(ngModel)]="bodySelectPref" submitText="Ok" cancelText="Cancel" (ionChange)="bodyFunctionPref()">\n\n					<ion-option value="Petite">Petite</ion-option>\n\n					<ion-option value="Slender">Slender</ion-option>\n\n					<ion-option value="Medium">Medium</ion-option>\n\n					<ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>\n\n					<ion-option value="Well Built">Well Built</ion-option>\n\n					<ion-option value="Overweight">Overweight</ion-option>\n\n				</ion-select>\n\n			</ion-row>\n\n\n\n			<ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="addDataPref(\'bodyshape\')">Continue</button>\n\n			</ion-row>\n\n\n\n			<span class="skipStep" (click)="skipStepPref(\'bodyshape\')">Skip</span>\n\n		</div>\n\n\n\n		<div id="step11" class=" colorWhite hideStep">\n\n			<h3 text-center class="labelColorOrange margin60-8">Check your mail to Activate your Account</h3>			\n\n		    <ion-row>\n\n				<button margin-top ion-button full class="bcColor" (click)="goToLoginPage()">Finish</button>\n\n			</ion-row>\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\login\step.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], StepPage);

//# sourceMappingURL=step.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages_messagedetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomerDetailPage = (function () {
    function CustomerDetailPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.friends = [];
        this.showBasic = false;
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_global__;
        this.myonline = [];
        this.changeSomething = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.id = navParams.get('id');
        /*this.id = localStorage.getItem('id');*/
    }
    CustomerDetailPage.prototype.ngOnInit = function () {
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        this.getAllAllow();
        this.getCustomer(this.id);
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
    };
    CustomerDetailPage.prototype.onlinenew = function () {
        var _this = this;
        this.socketService.onlineList2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 1");
            console.log(_this.myonline);
        });
    };
    CustomerDetailPage.prototype.onlinenew2 = function () {
        var _this = this;
        this.socketService.onlineListon2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 2");
        });
    };
    CustomerDetailPage.prototype.onlinenew3 = function () {
        var _this = this;
        this.socketService.onlineList3().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("main 3");
        });
    };
    CustomerDetailPage.prototype.offlinenew2 = function () {
        var _this = this;
        this.socketService.offline2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
        });
    };
    CustomerDetailPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (cust) {
            _this.customer = cust.message;
            console.log("this.customer");
            console.log(_this.customer);
        });
    };
    CustomerDetailPage.prototype.getAllAllow = function () {
        var _this = this;
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(function (data) {
            _this.friends = data.message;
            console.log("this.friends");
            console.log(_this.friends);
        });
    };
    CustomerDetailPage.prototype.checkforinvite = function (id) {
        var index1 = this.friends.findIndex(function (item) { return item.FromId._id == id; });
        var index2 = this.friends.findIndex(function (item) { return item.ToId._id == id; });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    CustomerDetailPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    CustomerDetailPage.prototype.showMoreDetail = function () {
        this.showBasic = true;
    };
    CustomerDetailPage.prototype.hideMoreDetail = function () {
        this.showBasic = false;
    };
    CustomerDetailPage.prototype.SomeEvent = function () {
        this.getAllAllow();
        this.changeSomething.emit('complete');
    };
    CustomerDetailPage.prototype.acceptrequest = function (id, pid) {
        var _this = this;
        var friendobj = { _id: id, status: 1 };
        this.friendService.updateFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.deleteBlock = function (id) {
        var _this = this;
        this.friendService.deleteOne(id).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.unblockrequest = function (data, type) {
        var _this = this;
        if (type == 2) {
            var friendobj = { _id: data._id, FromId: data.ToId._id, ToId: data.FromId._id, status: 0 };
            this.friendService.updateFriend(friendobj).subscribe(function (data) {
                _this.SomeEvent();
            });
        }
        else {
            this.SomeEvent();
            this.deleteBlock(data._id);
        }
    };
    CustomerDetailPage.prototype.selectNewChat = function (id) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading your messages...'
        });
        loading.present();
        var messageObj = {};
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            messageObj['id'] = data.message;
            localStorage.setItem("currentChat", JSON.stringify(data.message));
            _this.events.publish('messages:badgecounter', Date.now());
            var obj = { fromCustId: data.message, toCustId: _this.customerInfo._id };
            _this.customerService.getmessage(obj).subscribe(function (data1) {
                messageObj['messages'] = data1.message;
                loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__messages_messagedetail__["a" /* MessageDetailPage */], {
                    message: messageObj
                });
            });
        });
    };
    CustomerDetailPage.prototype.requestFromTo = function (from, to, type) {
        var obj = { FromId: from, ToId: to, title: type };
        this.SomeEvent();
    };
    CustomerDetailPage.prototype.sendRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 0 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerDetailPage.prototype.checkblock = function (id) {
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
    CustomerDetailPage.prototype.anyBlockRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 4 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    return CustomerDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CustomerDetailPage.prototype, "changeSomething", void 0);
CustomerDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-customerdetail',template:/*ion-inline-start:"E:\newdating\app\src\pages\customer\customerdetail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  	<ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon class="whiteButton" name="more" ios="ios-more" md="md-more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<ion-row *ngIf="customer" no-margin class="width100">\n\n		<ion-row class="width100">\n\n			<ion-row class="width100">\n\n				<img class="customerImage width100" [src]="customerImage(customer.profilePic)"/>\n\n			</ion-row>\n\n			<ion-row text-capitalize class="custDetail white padding5px0px width100">\n\n				<ion-col col-12 no-padding padding-horizontal>\n\n\n\n					<ion-icon float-right class="onlineMark" *ngIf="customer.online == \'Y\'" name="checkmark-circle" color="secondary"></ion-icon>\n\n					<ion-icon float-right class="onlineMark" *ngIf="customer.online != \'Y\'" name="checkmark-circle" style="color:#9c9797;" clear></ion-icon>\n\n\n\n				</ion-col>\n\n				<ion-col col-12 no-padding padding-horizontal>\n\n					<span> {{customer.username}} , {{customer.age}}, </span><span>{{customer.countryName}}</span>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-row>\n\n\n\n		<ion-row class="width100 bgWhite" *ngIf="customer.myPhotos">\n\n			<ion-col no-padding class="paddingRight5px" col-2 *ngFor = "let pic of customer.myPhotos">\n\n				<img src="{{url.imageUrl}}{{pic}}">\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<!-- <ion-row class="padding5px0px"> -->\n\n			<ul class="ulIcon">\n\n				<span *ngFor="let friend of friends" class="spanIcon">\n\n					\n\n					<li *ngIf="(customer._id == friend.FromId._id) && friend.status == 0">\n\n						<ion-icon class="font20 fontWeight600 purple" name="code-download" ios="ios-code-download" md="md-code-download" (click)="acceptrequest(friend._id, customer._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n\n\n					<li *ngIf="(customer._id == friend.FromId._id)  && friend.status == 0" >\n\n						<ion-icon class="font20 fontWeight600 red" name="close" ios="ios-close" md="md-close" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n					<li *ngIf="(customer._id == friend.FromId._id || customer._id == friend.ToId._id) && friend.status == 1">\n\n						<ion-icon class="font20 orange" name="contacts" ios="ios-contacts" md="md-contacts" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n\n\n					<li *ngIf="(this.customerInfo._id == friend.FromId._id && customer._id == friend.ToId._id) && friend.status == 0">\n\n						<ion-icon class="font20 green" name="send" ios="ios-send" md="md-send"></ion-icon>\n\n					</li>\n\n\n\n\n\n					<li *ngIf="(this.customerInfo._id == friend.FromId._id && customer._id == friend.ToId._id) && friend.status == 0">\n\n						<ion-icon class="font20 purple" name="trash" ios="ios-trash" md="md-trash" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n\n\n					<li  *ngIf="(this.customerInfo._id == friend.FromId._id && customer._id == friend.ToId._id) && friend.status == 2">\n\n						<ion-icon class="font20 red" name="remove-circle" ios="ios-remove-circle" md="md-remove-circle" (click)="unblockrequest(friend, 2)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n					<li  *ngIf="(this.customerInfo._id == friend.FromId._id && customer._id == friend.ToId._id) && friend.status == 4">\n\n						<ion-icon class="font20 purple" name="unlock" ios="ios-unlock" md="md-unlock" (click)="unblockrequest(friend, 4)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n				</span> \n\n\n\n\n\n				<li *ngIf="checkforinvite(customer._id)">\n\n					<ion-icon class="font20 purple" name="person-add" ios="ios-person-add" md="md-person-add" (click)="sendRequest(customer._id)">\n\n					</ion-icon>\n\n				</li>\n\n\n\n\n\n				<li *ngIf="checkforinvite(customer._id)" >\n\n					<ion-icon class="font20 red" name="remove-circle" ios="ios-remove-circle" md="md-remove-circle" (click)="anyBlockRequest(customer._id)">\n\n					</ion-icon>\n\n				</li>\n\n\n\n				<li>\n\n					<ion-icon class="font20 blue"  name="chatbubbles" ios="ios-chatbubbles" md="md-chatbubbles" (click)="selectNewChat(customer._id);">\n\n					</ion-icon>\n\n				</li>\n\n				\n\n				<li *ngIf="customerInfo.mypackage && (customerInfo.mypackage.remaincalls > 0) && (myonline.indexOf(customer._id) != -1)">\n\n					<ion-icon class="font20 green" name="videocam" ios="ios-videocam" md="md-videocam" (click)="vediocall(customer._id,customerInfo._id)">\n\n					</ion-icon >\n\n				</li>\n\n			</ul>\n\n\n\n			<!-- </ion-row> -->\n\n\n\n\n\n\n\n\n\n		<ion-row padding class="basicDetail width100 bgWhite marginBottom4">\n\n			<ion-col col-12><h5>About</h5></ion-col>\n\n			<ion-col col-12>\n\n				<img src="/assets/images/ring.png" class="height10">\n\n				<span *ngIf = "customer.maritalStatus">Married</span>\n\n				<span *ngIf = "!customer.maritalStatus">Never Married</span>\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.height">\n\n				<img src="/assets/images/arrow.png" class="height10"> {{customer.height}}\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.bodyshape">\n\n				<ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> {{customer.bodyshape}}\n\n			</ion-col>\n\n			<ion-col *ngIf = "!showBasic" col-12 text-center (click) = "showMoreDetail()">\n\n				<ion-icon name="arrow-dropdown-circle" ios="ios-arrow-dropdown-circle" md="md-arrow-dropdown-circle"></ion-icon>\n\n			</ion-col>\n\n			<ion-row *ngIf = "showBasic" class="width100">\n\n				<ion-col col-12 *ngIf = "customer.profession">\n\n					<img src="/assets/images/profession.png" class="height10"> {{customer.profession}}\n\n				</ion-col>\n\n				<ion-col col-12 *ngIf = "customer.haircolor">\n\n					<ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> {{customer.haircolor}}\n\n				</ion-col>\n\n				<ion-col col-12>\n\n					<ion-icon name="beer" ios="ios-beer" md="md-beer"></ion-icon>  <span *ngIf = "!customer.drink"> Drink : {{customer.drink}}</span>\n\n				</ion-col>\n\n				<ion-col col-12>\n\n					<ion-icon name="no-smoking" ios="ios-no-smoking" md="md-no-smoking"><span *ngIf = "customer.smoke"> Smoke : \n\n					{{customer.smoke}} </span>\n\n				</ion-col>\n\n				<ion-col col-12 text-center (click) = "hideMoreDetail()">\n\n					<ion-icon name="arrow-dropup-circle" ios="ios-arrow-dropup-circle" md="md-arrow-dropup-circle"></ion-icon>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-row>\n\n\n\n		<ion-row *ngIf = "customer.description" padding class="basicDetail width100 bgWhite marginBottom4">\n\n			<ion-col col-12><h5>Summary</h5></ion-col>\n\n			<ion-col col-12>\n\n		    {{customer.description}}\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row padding class="basicDetail width100 bgWhite marginBottom4" *ngIf = "customer.preferences">\n\n			<ion-col col-12><h5>Whom <span *ngIf = "customer.gender==\'female\'">She</span><span *ngIf = "customer.gender==\'male\'">He</span> is looking for</h5></ion-col>\n\n			<ion-col col-12>\n\n				<img src="/assets/images/ring.png" class="height10"> <span *ngIf = "customer.preferences.maritalStatus">Married</span><span *ngIf = "!customer.preferences.maritalStatus">Never Married</span>\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.preferences.height">\n\n				<img src="/assets/images/arrow.png" class="height10">({{customer.preferences.minheight}} - {{customer.preferences.maxheight}})\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.preferences.bodyshape">\n\n				<ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> {{customer.preferences.bodyshape}}\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.preferences.profession">\n\n				<img src="/assets/images/profession.png" class="height10"> {{customer.preferences.profession}}\n\n			</ion-col>\n\n			<ion-col col-12 *ngIf = "customer.preferences.haircolor">\n\n				<ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> {{customer.preferences.haircolor}}\n\n			</ion-col>\n\n			<ion-col col-12>\n\n				<ion-icon name="beer" ios="ios-beer" md="md-beer"></ion-icon> <span *ngIf = "customer.preferences.drink"> Drink : {{customer.preferences.drink}} </span> \n\n			</ion-col>\n\n			<ion-col col-12>\n\n				<ion-icon name="no-smoking" ios="ios-no-smoking" md="md-no-smoking"></ion-icon> <span *ngIf = "customer.preferences.smoke"> Smoke :  {{customer.preferences.drink}} </span> \n\n			</ion-col>\n\n		</ion-row>\n\n\n\n	</ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\newdating\app\src\pages\customer\customerdetail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], CustomerDetailPage);

//# sourceMappingURL=customerdetail.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoCallOutgoingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VideoCallOutgoingPage = VideoCallOutgoingPage_1 = (function () {
    function VideoCallOutgoingPage(navCtrl, customerService, friendService, navParams, socketService, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_global__;
        this.publishedUser = {};
        this.apiKey = '45956382';
        this.currentcall = navParams.get('callingto');
    }
    VideoCallOutgoingPage.prototype.ngOnInit = function () {
        this.getCustomer(this.currentcall._id);
    };
    VideoCallOutgoingPage.prototype.getCustomer = function (id) {
        var _this = this;
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            _this.customer = data.message;
            var sessionId = _this.customer.tokboxsessionid;
            var tokenId = _this.customer.tokboxtoken;
            var socketId = _this.customer.socketId;
            _this.initializeSession(sessionId, tokenId);
            console.log(JSON.stringify(_this.customer));
        });
    };
    VideoCallOutgoingPage.prototype.videocallcancel = function () {
        this.socketService.callcancel(this.currentcall);
        this.currentcall = {};
        this.navCtrl.pop(VideoCallOutgoingPage_1);
    };
    VideoCallOutgoingPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    VideoCallOutgoingPage.prototype.initializeSession = function (sessionId, token) {
        var _this = this;
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, function (error) {
            if (!error) {
                var publisherProperties = { insertMode: "append" };
                var publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Publishing a stream.');
                    }
                });
            }
            else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: function (event) {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    /*this.deductPackageCalls();
                    this.opencall();
                    this.opencallImage();  */
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }
                else {
                    console.log('not any client connected. ');
                }
                /*session.signal(
                {
                    data:"hello"
                },
                (error) => {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");
                    }
                }
                );*/
            },
            connectionDestroyed: function (event) {
                connectionCount--;
                _this.disconnectcall();
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.');
                }
            },
            streamCreated: function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = { width: '100%', height: '100%', insertMode: "append" };
                var subscriber = session.subscribe(event.stream, 'subscriberContainer', subscriberProperties, function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
                        //console.log(event)
                        console.log('Subscriber added.');
                    }
                });
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                            + 'or because the other party lost their connection.';
                        event.preventDefault(); // Prevent the Subscriber from being removed
                    }
                }
            },
            signal: function (event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                var cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                var nameAndMsg = event.data.split("@@");
                var name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }
                else {
                    name = nameAndMsg[0];
                }
                var msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name + ' : ' + msgggg;
                    msgHis.appendChild(msg);
                }
                var list = document.querySelector("div#msgHistory");
                list.scrollTop = list.scrollHeight;
            }
        });
    };
    VideoCallOutgoingPage.prototype.disconnectcall = function () {
        if (this.sessionOBJ) {
            this.sessionOBJ.disconnect();
            // this.disconnectOther(); 
            //this.router.navigate(['customer/allprofile']);    
        }
    };
    return VideoCallOutgoingPage;
}());
VideoCallOutgoingPage = VideoCallOutgoingPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videocalldetail',template:/*ion-inline-start:"E:\newdating\app\src\pages\customer\videocalldetail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  	<ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon class="whiteButton" name="more" ios="ios-more" md="md-more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n	<ion-row *ngIf="customer" no-margin class="width100">\n\n		<ion-row class="width100">\n\n			<ion-row class="width100">\n\n				<img class="customerImage width100" [src]="customerImage(customer.profilePic)"/>\n\n			</ion-row>\n\n			<ion-row text-capitalize class="custDetail white padding5px0px width100">\n\n				<div id="publisherContainer" class="publisherContainerp1"></div> \n\n				<div id="subscriberContainer" style="padding-top: 13px;"></div>\n\n			</ion-row>\n\n			<ion-row text-capitalize class="custDetail white padding5px0px width100">\n\n				<ion-col col-12 no-padding padding-horizontal>{{customer.firstname}} {{customer.lastname}} 				\n\n				</ion-col>\n\n				<ion-col col-12 no-padding padding-horizontal>\n\n					<span>{{customer.age}}, </span><span>{{customer.countryName}}</span>\n\n				</ion-col>\n\n			</ion-row>\n\n		</ion-row>\n\n		<ion-row>\n\n			<button ion-button color="Cancel" outline (click)="videocallcancel()">Cancel</button>\n\n		</ion-row>\n\n	</ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\newdating\app\src\pages\customer\videocalldetail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], VideoCallOutgoingPage);

var VideoCallOutgoingPage_1;
//# sourceMappingURL=videocalldetail.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(264);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_about_about__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_setting_changepassword__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_friend_friend__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_messages_messages__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_messages_messagedetail__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_setting_plan__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_filter__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tabs_videocallincoming__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_login_forgetpassword__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_register__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_step__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_profile_profileupdate__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_customer_customer__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_customer_customerdetail__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_customer_videocalldetail__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_videocall_videocall__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































var config = { url: __WEBPACK_IMPORTED_MODULE_32__global__["url"], options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_7_ng2_file_upload__["FileSelectDirective"],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__["a" /* SettingPage */], __WEBPACK_IMPORTED_MODULE_10__pages_setting_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_14__pages_setting_plan__["a" /* PlanPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_16__pages_home_filter__["a" /* FilterPage */], __WEBPACK_IMPORTED_MODULE_11__pages_friend_friend__["a" /* FriendPage */], __WEBPACK_IMPORTED_MODULE_12__pages_messages_messages__["a" /* MessagesPage */], __WEBPACK_IMPORTED_MODULE_13__pages_messages_messagedetail__["a" /* MessageDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_20__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_21__pages_login_register__["a" /* RegisterPage */], __WEBPACK_IMPORTED_MODULE_22__pages_login_step__["a" /* StepPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_25__pages_customer_customer__["a" /* CustomerPage */], __WEBPACK_IMPORTED_MODULE_26__pages_customer_customerdetail__["a" /* CustomerDetailPage */], __WEBPACK_IMPORTED_MODULE_27__pages_customer_videocalldetail__["a" /* VideoCallOutgoingPage */], __WEBPACK_IMPORTED_MODULE_18__pages_tabs_videocallincoming__["a" /* VideoCallIncomingPage */], __WEBPACK_IMPORTED_MODULE_30__pages_videocall_videocall__["a" /* VideocallPage */], __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["b" /* ModalContentPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], { tabsPlacement: 'bottom' }, {
                links: [
                    { loadChildren: '../pages/videocall/videocall.module#VideocallPageModule', name: 'VideocallPage', segment: 'videocall', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__["SocketIoModule"].forRoot(config)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_setting_setting__["a" /* SettingPage */], __WEBPACK_IMPORTED_MODULE_10__pages_setting_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_14__pages_setting_plan__["a" /* PlanPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_16__pages_home_filter__["a" /* FilterPage */], __WEBPACK_IMPORTED_MODULE_11__pages_friend_friend__["a" /* FriendPage */], __WEBPACK_IMPORTED_MODULE_12__pages_messages_messages__["a" /* MessagesPage */], __WEBPACK_IMPORTED_MODULE_13__pages_messages_messagedetail__["a" /* MessageDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__["a" /* TabsPage */], __WEBPACK_IMPORTED_MODULE_25__pages_customer_customer__["a" /* CustomerPage */], __WEBPACK_IMPORTED_MODULE_26__pages_customer_customerdetail__["a" /* CustomerDetailPage */], __WEBPACK_IMPORTED_MODULE_27__pages_customer_videocalldetail__["a" /* VideoCallOutgoingPage */], __WEBPACK_IMPORTED_MODULE_18__pages_tabs_videocallincoming__["a" /* VideoCallIncomingPage */], __WEBPACK_IMPORTED_MODULE_30__pages_videocall_videocall__["a" /* VideocallPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_20__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_21__pages_login_register__["a" /* RegisterPage */], __WEBPACK_IMPORTED_MODULE_22__pages_login_step__["a" /* StepPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["b" /* ModalContentPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_31__service_index__["b" /* CustomersService */], __WEBPACK_IMPORTED_MODULE_31__service_index__["d" /* PackageService */], __WEBPACK_IMPORTED_MODULE_31__service_index__["e" /* SocketService */], __WEBPACK_IMPORTED_MODULE_31__service_index__["c" /* FriendService */], __WEBPACK_IMPORTED_MODULE_31__service_index__["a" /* BannerService */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AuthService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.getUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'users/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwner = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'owners/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwnerById = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'users/' + id)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.ownerLogout = function () {
        localStorage.removeItem('currentOwner');
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.getStatus = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'status');
    };
    AuthService.prototype.resetPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'owners/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.resetAdminPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'users/admin/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'owners/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPasswordAdmin = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["url"] + 'users/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
    }
    FriendService.prototype.addFriend = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateFriend = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateacceptblockFriend = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'accept-block', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.acceptFriendList = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'requiest-accept', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.blockFriendList = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/requiest-block', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/')
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllRequiestNotInSelf = function (id) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'getAllRequiestNotInSelf/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllSendRequistMe = function (id) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'getAllSendRequistMe/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllRequiestAcceptSelf = function (id) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'getAllRequiestAcceptSelf/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllAcceptRequistMe = function (id) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + 'getAllAcceptRequistMe/', { uData: id })
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.getAllFriendAllow = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/' + '/customer-list-allow/' + id)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.findForDelete = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/for-delete/', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.myfriends = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/myfriends', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.mypendingrequest = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/mypendingrequest', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.myblocked = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/myblocked', data)
            .map(function (response) { return response.json(); });
    };
    FriendService.prototype.updateFriendunlock = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'friend/myunblocked', data)
            .map(function (response) { return response.json(); });
    };
    return FriendService;
}());
FriendService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], FriendService);

//# sourceMappingURL=friend.service.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PackageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PackageService = (function () {
    //url: string = 'http://localhost:4005/package/';
    function PackageService(http) {
        this.http = http;
    }
    PackageService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'package/')
            .map(function (response) { return response.json(); });
    };
    PackageService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'package/' + id)
            .map(function (response) { return response.json(); });
    };
    return PackageService;
}());
PackageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], PackageService);

//# sourceMappingURL=package.service.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BannerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BannerService = (function () {
    function BannerService(http) {
        this.http = http;
        this.url = 'http://localhost:4005/banner/';
    }
    BannerService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.updateUser = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTime = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertime/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.addTiming = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertime/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOneTime = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertime/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllrand = function (len) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'banner-rand/' + len)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.addTimingImage = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertimeimage/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.deleteOneTimeImage = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertimeimage/' + id)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTimeImage = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertimeimage/')
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.getAllTypeBanner = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertype/', data)
            .map(function (response) { return response.json(); });
    };
    BannerService.prototype.updateBannerTime = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'bannertimeupdate/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return BannerService;
}());
BannerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], BannerService);

//# sourceMappingURL=banner.service.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    //rootPage:any = MessagesPage;
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"E:\newdating\app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"E:\newdating\app\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FilterPage = (function () {
    function FilterPage(events, navCtrl, nav, navParams, customerService, loadingCtrl, alertCtrl) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [] };
        this.getuserCountry();
        this.activeTab = this.navParams.get('type');
        console.log("this.navParams.get('filter')");
        console.log(this.navParams.get('filterBy'));
        if (this.navParams.get('filterBy')) {
            this.filterBy = this.navParams.get('filterBy');
        }
        ;
    }
    FilterPage.prototype.ionViewDidEnter = function () {
        //this.navParams
    };
    FilterPage.prototype.resetFilter = function () {
        var _this = this;
        if (this.navParams.get('filterBy')) {
            this.filterBy = this.navParams.get('filterBy');
        }
        else {
            this.filterBy = { gender: [], online: "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification: [], profession: [] };
        }
        setTimeout(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */], {
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
        console.log(type);
    };
    FilterPage.prototype.showAfterFilter = function () {
        var _this = this;
        console.log("hhh1", this.filterBy);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
            var obj = {
                filterBy: _this.filterBy
            };
            _this.events.publish("filter:data", obj);
        }, 1000);
    };
    return FilterPage;
}());
FilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-filter',template:/*ion-inline-start:"E:\newdating\app\src\pages\home\filter.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Filter</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n<ion-list>\n\n\n\n\n\n\n\n    <ion-item>\n\n        <ion-label text-right><span float-right class="resetButton" (click)="resetFilter()"> Reset </span></ion-label>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item>\n\n        <ion-label>Hair Color</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.haircolor" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption(\'haircolor\')">\n\n            <ion-option value="Black">Black</ion-option>\n\n            <ion-option value="Light Brown">Light Brown</ion-option>\n\n            <ion-option value="Brunette/Brown">Brunette/Brown</ion-option>\n\n            <ion-option value="Red">Red</ion-option>\n\n            <ion-option value="Blonde">Blonde</ion-option>\n\n            <ion-option value="Bald/Shaven">Bald/Shaven</ion-option>\n\n            <ion-option value="Other">Other</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Body Type</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.bodyshape" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption(\'bodyshape\')">\n\n            <ion-option value="Petite">Petite</ion-option>\n\n            <ion-option value="Slender">Slender</ion-option>\n\n            <ion-option value="Medium">Medium</ion-option>\n\n            <ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>\n\n            <ion-option value="Well Built">Well Built</ion-option>\n\n            <ion-option value="Overweight">Overweight</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Smoke</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.smoke" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption(\'smoke\')">\n\n            <ion-option value ="occasionally">Occasionally</ion-option>\n\n            <ion-option value ="never">Never</ion-option>\n\n            <ion-option value ="rarely">Rarely</ion-option>\n\n            <ion-option value ="regularly">Regularly</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Drink</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.drink" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption(\'drink\')">\n\n             <ion-option value ="occasionally">Occasionally</ion-option>\n\n            <ion-option value ="never">Never</ion-option>\n\n            <ion-option value ="rarely">Rarely</ion-option>\n\n            <ion-option value ="regularly">Regularly</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Profession</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.profession" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption(\'profession\')">\n\n            <ion-option value = "Aircraft Dispatcher">Aircraft Dispatcher</ion-option>\n\n            <ion-option value = "Aircraft Mechanic">Aircraft Mechanic</ion-option>\n\n            <ion-option value = "Airline Pilot">Airline Pilot</ion-option>\n\n            <ion-option value = "Flight Attendant">Flight Attendant</ion-option>\n\n            <ion-option value = "Arts">Arts</ion-option>\n\n            <ion-option value = "Actor">Actor</ion-option>\n\n            <ion-option value = "Architecture">Architecture</ion-option>\n\n            <ion-option value = "Art Appraiser">Art Appraiser</ion-option>\n\n            <ion-option value = "Art Auctioneer">Art Auctioneer</ion-option>\n\n            <ion-option value = "Artist">Artist</ion-option>\n\n            <ion-option value = "Museum Jobs">Museum Jobs</ion-option>\n\n            <ion-option value = "Music Conductor">Music Conductor</ion-option>\n\n            <ion-option value = "Business">Business</ion-option>\n\n            <ion-option value = "Accountant">Accountant</ion-option>\n\n            <ion-option value = "Administrative Assistant/Secretary">Administrative Assistant/Secretary</ion-option>\n\n            <ion-option value = "Advertising">Advertising</ion-option>\n\n            <ion-option value = "Consultant">Consultant</ion-option>\n\n            <ion-option value = "Financial Advisor">Financial Advisor</ion-option>\n\n            <ion-option value = "Fundraiser">Fundraiser</ion-option>\n\n            <ion-option value = "Government Jobs">Government Jobs</ion-option>\n\n            <ion-option value = "Human Resources">Human Resources</ion-option>\n\n            <ion-option value = "Insurance Agent">Insurance Agent</ion-option>\n\n            <ion-option value = "Investment Banker">Investment Banker</ion-option>\n\n            <ion-option value = "Lawyer">Lawyer</ion-option>\n\n            <ion-option value = "Management">Management</ion-option>\n\n            <ion-option value = "Market Research Analyst">Market Research Analyst</ion-option>\n\n            <ion-option value = "Nonprofit Job">Nonprofit Job</ion-option>\n\n            <ion-option value = "Law Enforcement">Law Enforcement</ion-option>\n\n            <ion-option value = "Criminal Justice">Criminal Justice</ion-option>\n\n            <ion-option value = "Federal Law Enforcement">Federal Law Enforcement</ion-option>\n\n            <ion-option value = "Police Officer">Police Officer</ion-option>\n\n            <ion-option value = "Media">Media</ion-option>\n\n            <ion-option value = "Book Publishing">Book Publishing</ion-option>\n\n            <ion-option value = "Freelance Editor">Freelance Editor</ion-option>\n\n            <ion-option value = "Freelance Writer">Freelance Writer</ion-option>\n\n            <ion-option value = "Public Relations">Public Relations</ion-option>\n\n            <ion-option value = "Web Developer">Web Developer</ion-option>\n\n            <ion-option value = "Writer/Editor">Writer/Editor</ion-option>\n\n            <ion-option value = "Medical">Medical</ion-option>\n\n            <ion-option value = "Doctor">Doctor</ion-option>\n\n            <ion-option value = "Nurse">Nurse</ion-option>\n\n            <ion-option value = "Paramedic">Paramedic</ion-option>\n\n            <ion-option value = "Psychologist">Psychologist</ion-option>\n\n            <ion-option value = "Social Worker">Social Worker</ion-option>\n\n            <ion-option value = "Veterinarian">Veterinarian</ion-option>\n\n            <ion-option value = "Service Industry">Service Industry</ion-option>\n\n            <ion-option value = "Bank Teller">Bank Teller</ion-option>\n\n            <ion-option value = "Call Center">Call Center</ion-option>\n\n            <ion-option value = "Funeral Director">Funeral Director</ion-option>\n\n            <ion-option value = "Hair Stylist">Hair Stylist</ion-option>\n\n            <ion-option value = "Personal Fitness Trainer">Personal Fitness Trainer</ion-option>\n\n            <ion-option value = "Retail">Retail</ion-option>\n\n            <ion-option value = "Sales">Sales</ion-option>\n\n            <ion-option value = "Ski Instructor">Ski Instructor</ion-option>\n\n            <ion-option value = "Waiter">Waiter</ion-option>\n\n            <ion-option value = "Wedding Planner">Wedding Planner</ion-option>\n\n            <ion-option value = "Career Counselor">Career Counselor</ion-option>\n\n            <ion-option value = "School Jobs">School Jobs</ion-option>\n\n            <ion-option value = "Substitute Teacher">Substitute Teacher</ion-option>\n\n            <ion-option value = "Teacher">Teacher</ion-option>\n\n            <ion-option value = "Teaching Abroad">Teaching Abroad</ion-option>\n\n            <ion-option value = "Teaching Online">Teaching Online</ion-option>\n\n            <ion-option value = "Technology">Technology</ion-option>\n\n            <ion-option value = "App Developer">App Developer</ion-option>\n\n            <ion-option value = "Computer Programmer">Computer Programmer</ion-option>\n\n            <ion-option value = "Database Administrator">Database Administrator</ion-option>\n\n            <ion-option value = "Programmer">Programmer</ion-option>\n\n            <ion-option value = "Software Developer">Software Developer</ion-option>\n\n            <ion-option value = "Web Developer">Web Developer</ion-option>\n\n            <ion-option value = "Other">Other</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Marital Status</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.maritalstatus" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption(\'maritalstatus\')">\n\n            <ion-option value = true>Yes</ion-option>\n\n            <ion-option value = false>No</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Sex Orientation</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.sexualorient" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption(\'sexualorient\')">\n\n            <ion-option value = "Straight">Straight</ion-option>\n\n            <ion-option value = "Bisexual">Bisexual</ion-option>\n\n            <ion-option value = "Lesbian">Lesbian</ion-option>\n\n            <ion-option value = "Gay">Gay</ion-option>\n\n            <ion-option value = "Other">Other</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Gender</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.gender" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption(\'gender\')">\n\n            <ion-option value = "male">Male</ion-option>\n\n            <ion-option value = "female">Female</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label>Country</ion-label>\n\n        <ion-select [(ngModel)]="filterBy.country" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption(\'country\')">\n\n            <ion-option *ngFor="let cntry of countries" value = {{cntry}}>{{cntry}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n   <ion-item class="heightSelect">\n\n        <ion-label>\n\n            Min Height:\n\n        </ion-label>\n\n        <ion-label> \n\n            <ion-item>\n\n            <ion-input type="number" [(ngModel)]="filterBy.minheight"  placeholder="Min height"></ion-input>\n\n            </ion-item>            \n\n            </ion-label>\n\n            </ion-item>\n\n\n\n    <ion-item class="heightSelect">\n\n            <ion-label>\n\n                Max Height:\n\n            </ion-label>\n\n            <ion-label>\n\n            <ion-item>\n\n            <ion-input type="number" [(ngModel)]="filterBy.maxheight"  placeholder="Max height"></ion-input>\n\n            </ion-item> \n\n            </ion-label>       \n\n    </ion-item>\n\n\n\n    <ion-item class="heightSelect">\n\n        <ion-label>\n\n            Min Age:\n\n        </ion-label>\n\n        <ion-label> \n\n            <ion-item>\n\n            <ion-input type="number" [(ngModel)]="filterBy.minage"  placeholder="Min age"></ion-input>\n\n            </ion-item>            \n\n            </ion-label>\n\n            </ion-item>\n\n\n\n            <ion-item class="heightSelect">\n\n        <ion-label>\n\n            Max Age:\n\n        </ion-label>\n\n        <ion-label> \n\n            <ion-item>\n\n            <ion-input type="number" [(ngModel)]="filterBy.maxage"  placeholder="Max age"></ion-input>\n\n            </ion-item>            \n\n            </ion-label>\n\n            </ion-item>\n\n\n\n    <ion-item>\n\n        <ion-label text-center><button class="bcColor" (click) = "showAfterFilter()"> Search </button></ion-label>\n\n    </ion-item>\n\n\n\n</ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\home\filter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], FilterPage);

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__customerdetail__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__videocalldetail__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_messagedetail__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CustomerPage = (function () {
    function CustomerPage(navCtrl, customerService, friendService, socketService, events, nav, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.friendService = friendService;
        this.socketService = socketService;
        this.events = events;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.url = __WEBPACK_IMPORTED_MODULE_2__app_global__;
        this.friends = [];
        this.customersL = [];
        this.customers = [];
        this.changeSomething = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.myonline = [];
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            console.log(this.customerInfo);
            this.getAllAllow();
        }
    }
    CustomerPage.prototype.ngOnInit = function () {
        this.customersL = this.customers;
        console.log("this.customers");
        console.log(this.customers);
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
        //this.getCustomer(this._id);
    };
    CustomerPage.prototype.ionViewDidEnter = function () {
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        this.socketService.onlineList2emit();
        this.socketService.onlineList3emit();
        this.offlinenew2();
    };
    CustomerPage.prototype.onlinenew = function () {
        var _this = this;
        this.socketService.onlineList2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 1");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.onlinenew2 = function () {
        var _this = this;
        this.socketService.onlineListon2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 2");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.onlinenew3 = function () {
        var _this = this;
        this.socketService.onlineList3().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 3");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.offlinenew2 = function () {
        var _this = this;
        this.socketService.offline2().subscribe(function (response) {
            _this.myonline = response.chatList.map(function (a) { return a._id; });
            console.log("this.myonline 4");
            console.log(_this.myonline);
        });
    };
    CustomerPage.prototype.getAllAllow = function () {
        var _this = this;
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(function (data) {
            _this.friends = data.message;
        });
    };
    CustomerPage.prototype.SomeEvent = function () {
        this.getAllAllow();
        this.changeSomething.emit('complete');
    };
    CustomerPage.prototype.checkforinvite = function (id) {
        var index1 = this.friends.findIndex(function (item) { return item.FromId._id == id; });
        var index2 = this.friends.findIndex(function (item) { return item.ToId._id == id; });
        if (index1 != -1 || index2 != -1) {
            return false;
        }
        else {
            return true;
        }
    };
    /* Some Action on list Accept  */
    CustomerPage.prototype.acceptrequest = function (id, pid) {
        var _this = this;
        var friendobj = { _id: id, status: 1 };
        this.friendService.updateFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.deleteBlock = function (id) {
        var _this = this;
        this.friendService.deleteOne(id).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.unblockrequest = function (data, type) {
        var _this = this;
        if (type == 2) {
            var friendobj = { _id: data._id, FromId: data.ToId._id, ToId: data.FromId._id, status: 0 };
            this.friendService.updateFriend(friendobj).subscribe(function (data) {
                _this.SomeEvent();
            });
        }
        else {
            this.SomeEvent();
            this.deleteBlock(data._id);
        }
    };
    CustomerPage.prototype.selectNewChat = function (id) {
        var _this = this;
        /*let loading = this.loadingCtrl.create({
            content : 'Loading your messages...'
        });

        loading.present();*/
        var messageObj = {};
        this.customerService.getOneCustomer(id).subscribe(function (data) {
            messageObj['id'] = data.message;
            localStorage.setItem("currentChat", JSON.stringify(data.message));
            _this.events.publish('messages:badgecounter', Date.now());
            var obj = { fromCustId: data.message, toCustId: _this.customerInfo._id };
            _this.customerService.getmessage(obj).subscribe(function (data1) {
                messageObj['messages'] = data1.message;
                //loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__messages_messagedetail__["a" /* MessageDetailPage */], {
                    message: messageObj
                });
            });
        });
    };
    CustomerPage.prototype.requestFromTo = function (from, to, type) {
        var obj = { FromId: from, ToId: to, title: type };
        this.SomeEvent();
    };
    CustomerPage.prototype.sendRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 0 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    CustomerPage.prototype.checkblock = function (id) {
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
    CustomerPage.prototype.anyBlockRequest = function (id) {
        var _this = this;
        var friendobj = { FromId: this.customerInfo._id, ToId: id, status: 4 };
        this.friendService.addFriend(friendobj).subscribe(function (data) {
            _this.SomeEvent();
        });
    };
    /*private getCustomer(id){
    this.customerService.getOneCustomer(id).subscribe(cust=>{
    this.customer = cust.message;
    });
    }*/
    CustomerPage.prototype.deatilPage = function (id) {
        /*localStorage.setItem('id',id);*/
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__customerdetail__["a" /* CustomerDetailPage */], {
            id: id
        });
    };
    CustomerPage.prototype.customerImage = function (img) {
        if (img != null) {
            var imgPath = this.url.imageUrl + img;
        }
        if (img == null || img == "") {
            var imgPath = "/assets/images/face3.png";
        }
        return imgPath;
    };
    CustomerPage.prototype.videoCallConfirmbox = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Video Call',
            message: "Are you agree to make Video call?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.vediocall(id);
                    }
                }
            ]
        });
        prompt.present();
    };
    /* Video call */
    CustomerPage.prototype.vediocall = function (id) {
        console.log("vediocall send");
        this.currentcall = { _id: id, cid: this.customerInfo._id };
        this.socketService.video(this.currentcall);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__videocalldetail__["a" /* VideoCallOutgoingPage */], {
            callingto: this.currentcall
        });
    };
    return CustomerPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CustomerPage.prototype, "customers", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CustomerPage.prototype, "changeSomething", void 0);
CustomerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-customer',template:/*ion-inline-start:"E:\newdating\app\src\pages\customer\customer.html"*/'<ion-row *ngIf="customers.length > 0">\n\n\n\n	<ion-col *ngFor="let profile of customers" col-6>\n\n		<ion-card no-margin class="width100">\n\n			<ion-row (click)="deatilPage(profile._id)">\n\n				<ion-row>\n\n					<img class="customerImage" [src]="customerImage(profile.profilePic)"/>\n\n				</ion-row>\n\n				<ion-row text-capitalize class="custDetail white padding2-0">\n\n				<ion-col col-12 no-padding padding-horizontal>                    {{profile.username}} \n\n				<ion-icon float-right class="onlineMark" *ngIf="myonline.indexOf(profile._id) != -1" name="checkmark-circle" color="secondary"></ion-icon>\n\n			    </ion-col>\n\n					<ion-col col-12 no-padding padding-horizontal>\n\n						<span>{{profile.age}}, </span><span>{{profile.countryName}}</span>\n\n					</ion-col>\n\n				</ion-row>\n\n			</ion-row>\n\n\n\n\n\n			<!-- <ion-row class="padding5px0px"> -->\n\n			<ul class="ulIcon">\n\n				<span *ngFor="let friend of friends" class="spanIcon">\n\n					\n\n					<li *ngIf="(profile._id == friend.FromId._id) && friend.status == 0">\n\n						<ion-icon class="font20 fontWeight600 purple" name="code-download" ios="ios-code-download" md="md-code-download" (click)="acceptrequest(friend._id, profile._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n\n\n					<li *ngIf="(profile._id == friend.FromId._id)  && friend.status == 0" >\n\n						<ion-icon class="font20 fontWeight600 red" name="close" ios="ios-close" md="md-close" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n					<li *ngIf="(profile._id == friend.FromId._id || profile._id == friend.ToId._id) && friend.status == 1">\n\n						<ion-icon class="font20 orange" name="contacts" ios="ios-contacts" md="md-contacts" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n					<li *ngIf="(this.customerInfo._id == friend.FromId._id && profile._id == friend.ToId._id) && friend.status == 0">\n\n						<ion-icon class="font20 green" name="send" ios="ios-send" md="md-send"></ion-icon>\n\n					</li>\n\n\n\n\n\n					<li *ngIf="(this.customerInfo._id == friend.FromId._id && profile._id == friend.ToId._id) && friend.status == 0">\n\n						<ion-icon class="font20 purple" name="trash" ios="ios-trash" md="md-trash" (click)="deleteBlock(friend._id)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n\n\n					<li  *ngIf="(this.customerInfo._id == friend.FromId._id && profile._id == friend.ToId._id) && friend.status == 2">\n\n						<ion-icon class="font20 red" name="remove-circle" ios="ios-remove-circle" md="md-remove-circle" (click)="unblockrequest(friend, 2)">\n\n						</ion-icon>\n\n					</li>\n\n\n\n					<li  *ngIf="(this.customerInfo._id == friend.FromId._id && profile._id == friend.ToId._id) && friend.status == 4">\n\n						<ion-icon class="font20 purple" name="unlock" ios="ios-unlock" md="md-unlock" (click)="unblockrequest(friend, 4)">\n\n						</ion-icon>\n\n					</li>\n\n					\n\n				</span> \n\n\n\n\n\n				<li *ngIf="checkforinvite(profile._id)">\n\n					<ion-icon class="font20 purple" name="person-add" ios="ios-person-add" md="md-person-add" (click)="sendRequest(profile._id)">\n\n					</ion-icon>\n\n				</li>\n\n\n\n\n\n				<li *ngIf="checkforinvite(profile._id)" >\n\n					<ion-icon class="font20 red" name="remove-circle" ios="ios-remove-circle" md="md-remove-circle" (click)="anyBlockRequest(profile._id)">\n\n					</ion-icon>\n\n				</li>\n\n				<li>\n\n					<ion-icon class="font20 blue" name="chatbubbles" ios="ios-chatbubbles" md="md-chatbubbles" (click)="selectNewChat(profile._id);">\n\n					</ion-icon>\n\n				</li>\n\n				<!-- *ngIf="customerInfo.mypackage && (customerInfo.mypackage.remaincalls > 0) && (myonline.indexOf(profile._id) != -1)" -->\n\n				<li>\n\n					<ion-icon class="font20 green" name="videocam" ios="ios-videocam" md="md-videocam" (click)="videoCallConfirmbox(profile._id)">\n\n					</ion-icon >\n\n				</li>\n\n\n\n			</ul>\n\n\n\n			<!-- </ion-row> -->\n\n		</ion-card>\n\n	</ion-col>\n\n\n\n</ion-row>'/*ion-inline-end:"E:\newdating\app\src\pages\customer\customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], CustomerPage);

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomersService = (function () {
    function CustomersService(http) {
        this.http = http;
    }
    CustomersService.prototype.getCustomer = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/login', data)
            .map(function (response) {
            var user = response.json();
            localStorage.setItem('currentCustomer', JSON.stringify(user.data));
            return user;
        });
    };
    CustomersService.prototype.getCustomerList = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer')
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.unreadMessage = function (id) {
        var obj = { id: id };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/unreadmessage', obj)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getOneCustomer = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/' + id)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getLatLng = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/add-lat-lng', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.customerLogout = function (id) {
        localStorage.removeItem(id);
    };
    CustomersService.prototype.addCustomer = function (data) {
        console.log(data);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.updateCustomer = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/forget-pass', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.changePassword = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.addactivate = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/account-confirms', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.filter = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/filters', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getUserCountry = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/userscountry')
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getmessage = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/chat', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.changeTokboxToken = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["url"] + 'customer/change-tokbox-token/' + id)
            .map(function (response) { return response.json(); });
    };
    return CustomersService;
}());
CustomersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], CustomersService);

//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgetpassword__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register__ = __webpack_require__(242);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







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
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
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
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__forgetpassword__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__register__["a" /* RegisterPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"E:\newdating\app\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-list>\n\n		<form role="form" [formGroup]="loginForm" (ngSubmit)="login()" >\n\n			<ion-item class="topRadius">\n\n				<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n				<ion-input formControlName="email" placeholder="Username" type="text"></ion-input>\n\n			</ion-item>\n\n			<ion-item class="bottomRadius">\n\n				<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n				<ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n\n			</ion-item>\n\n			<button ion-button full class="bcColor" [disabled]="!loginForm.valid">Login</button>\n\n		</form>	\n\n		<button ion-button clear class="white labelColorOrange" (click)="goToForget()">Forget Password ?</button>\n\n		<button ion-button clear class="white labelColorOrange" (click)="register()">Sign Up ?</button>\n\n	</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessageDetailPage = (function () {
    function MessageDetailPage(friendService, navCtrl, customerService, loadingCtrl, navParams, socketService, events) {
        this.friendService = friendService;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.socketService = socketService;
        this.events = events;
        this.url = __WEBPACK_IMPORTED_MODULE_3__app_global__;
        this.message = navParams.get('message');
        setTimeout(function () {
            var x = document.getElementById('focusRow');
            x.focus();
        }, 1000);
    }
    MessageDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (localStorage.getItem("currentCustomer")) {
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        this.events.subscribe('messages:receivedmsg', function (msg, time) {
            var toCustomer = JSON.parse(localStorage.getItem('currentChat'));
            if (msg.fromCustId == toCustomer._id) {
                _this.message.messages.push(msg);
                setTimeout(function () {
                    _this.currentMsg = "";
                    var x = document.getElementById('focusRow');
                    x.focus();
                }, 500);
            }
        });
    };
    MessageDetailPage.prototype.doRefresh = function (refresher) {
        refresher.complete();
    };
    MessageDetailPage.prototype.senderPic = function (pic) {
        var imagePath;
        if (typeof pic == "undefined") {
            imagePath = "assets/images/face3.png";
        }
        else {
            imagePath = this.url + pic;
        }
        return imagePath;
    };
    MessageDetailPage.prototype.senderORreceiver = function (msg) {
        if (this.customerInfo) {
            if (msg.fromCustId == this.customerInfo._id) {
                return { 'background': '#c7eafc', 'left': '25%', 'color': '#45829b' };
            }
            else {
                return { 'background': '#ffe6cb', 'left': '0', 'color': '#c48843' };
            }
        }
    };
    MessageDetailPage.prototype.sendMessage = function () {
        var _this = this;
        if (localStorage.getItem('currentCustomer') && localStorage.getItem('currentChat')) {
            var current_user = JSON.parse(localStorage.getItem('currentCustomer'));
            this.customerService.getOneCustomer(current_user._id).subscribe(function (cst) {
                var fromCustomer = cst.message;
                var toCustomer = JSON.parse(localStorage.getItem('currentChat'));
                var data = {
                    fromCustId: fromCustomer._id,
                    fromSocketId: fromCustomer.socketId,
                    message: _this.currentMsg.trim(),
                    toCustId: toCustomer._id,
                    toSocketId: toCustomer.socketId
                };
                _this.socketService.sendMessage(data);
                _this.message.messages.push(data);
                setTimeout(function () {
                    _this.currentMsg = "";
                    var x = document.getElementById('focusRow');
                    x.focus();
                }, 500);
            });
        }
    };
    return MessageDetailPage;
}());
MessageDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-messagedetail',template:/*ion-inline-start:"E:\newdating\app\src\pages\messages\messagedetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            <ion-row>\n\n                <ion-col col-3 text-right><img [src]="senderPic(message.id.profilePic)"></ion-col>\n\n                <ion-col class="senderName" text-capitalize>{{message.id.firstname}}</ion-col>\n\n            </ion-row>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-row *ngIf = "customerInfo" class="marginBottom15">\n\n        <ion-row *ngFor = "let msg of message.messages" class="width100 margin1">\n\n            <ion-col class="messageBox" col-9 [ngStyle]="senderORreceiver(msg)">\n\n                {{msg.message}}\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n        <div id="focusRow" tabindex="-1"></div>\n\n\n\n        <!-- <ion-input #input type="text" placeholder="..." autofocus></ion-input> -->\n\n\n\n\n\n        <!-- <ion-row id="focusRow" autofocus></ion-row> -->\n\n    </ion-row>\n\n\n\n    <ion-row class="sendRow">\n\n        <ion-col col-9>\n\n            <textarea id="message" class="width100 height70" [(ngModel)]="currentMsg"></textarea>\n\n        </ion-col>\n\n        <ion-col><button class="bcColor height70" (click)="sendMessage()">Send</button></ion-col>\n\n    </ion-row>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\newdating\app\src\pages\messages\messagedetail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* FriendService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], MessageDetailPage);

//# sourceMappingURL=messagedetail.js.map

/***/ })

},[246]);
//# sourceMappingURL=main.js.map