webpackJsonp([1],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_order_my_order__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ItemDetailPage = (function () {
    function ItemDetailPage(loadingCtrl, menuCtrl, viewCtrl, toastCtrl, navCtrl, nav, kitchenItemService, alertCtrl, customerService, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.kitchenItemService = kitchenItemService;
        this.alertCtrl = alertCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.item = {};
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.orderItem = {};
        this.multisizeSelected = {};
        this.mandCount = 0;
        this.mandOptionId = [];
        this.tempCart = [];
        this.promotionItems = {};
        this.totalAmount = 0;
        this.item = navParams.get('item');
        this.itemType = navParams.get('type');
        this.itemGroup = navParams.get('iG');
        this.orderItem['item'] = this.item;
        this.cart = 'cart_' + this.item.kitchenId;
        if (this.itemType == 'promotionItem') {
            this.proId = 'promotion_' + this.item.kitchenId;
            if (localStorage.getItem(this.proId)) {
                this.promotionItems = JSON.parse(localStorage.getItem(this.proId));
            }
        }
        var val = this.navCtrl.last();
        this.previousPage = val.component;
    }
    ItemDetailPage.prototype.ionViewDidEnter = function () {
        this.getCustomer();
    };
    ItemDetailPage.prototype.ionViewDidLoad = function () {
        if (typeof this.item.options != 'undefined' && this.item.options.length > 0) {
            for (var i = 0; i < this.item.options.length; i++) {
                if (typeof this.item.options[i].groupType != 'undefined' && this.item.options[i].groupType.gType == 'mandatory') {
                    this.mandOptionId.push(this.item.options[i]._id);
                }
            }
        }
        if (typeof this.item.multisize != 'undefined' && this.item.multisize.length > 0) {
            this.multisizeSelected = this.item.multisize[0];
            this.orderItem['multisize'] = this.multisizeSelected;
        }
        this.orderItem['addon'] = [];
        this.orderItem['quantity'] = 1;
        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }
        this.totalPrice();
    };
    ItemDetailPage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        if (tempCurrentCustomer) {
            this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(function (cust) {
                _this.currentCustomer = cust.message;
            });
        }
    };
    ItemDetailPage.prototype.isFavOrNot = function (id) {
        if (this.currentCustomer) {
            var wIndex = this.currentCustomer.wishlist.indexOf(id);
            if (wIndex == -1) {
                return { 'color': '#999' };
            }
            else {
                return { 'color': 'red' };
            }
        }
    };
    ItemDetailPage.prototype.makeFav = function (id) {
        console.log(this.multisizeSelected);
        console.log(this.item.multisize);
        var wIndex = this.currentCustomer.wishlist.indexOf(id);
        if (wIndex == -1) {
            this.currentCustomer.wishlist.push(id);
            //this.getItems(this.item._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (cust) {
            });
        }
        else {
            this.currentCustomer.wishlist.splice(wIndex, 1);
            //this.getItems(this.item._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (cust) {
            });
        }
    };
    ItemDetailPage.prototype.itemImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    };
    ItemDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getItems(_this.item._id);
            refresher.complete();
        }, 2000);
    };
    ItemDetailPage.prototype.getItems = function (id) {
        var _this = this;
        this.kitchenItemService.getOne(id).subscribe(function (data) {
            if (!data.error) {
                _this.item = data.message;
                _this.orderItem['item'] = _this.item;
            }
            else {
                _this.getToast('Something Went Wrong!');
            }
        });
    };
    ItemDetailPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ItemDetailPage.prototype.showAddon = function (group) {
        var _this = this;
        var alert = this.alertCtrl.create();
        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'mandatory') {
            alert.setTitle('Min Addon : ' + group.groupType.min + ' ,Max Addon : ' + group.groupType.max);
        }
        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
            alert.setTitle(group.groupType.gType);
        }
        for (var i = 0; i < group.subaddon.length; i++) {
            alert.addInput({
                type: 'checkbox',
                label: '$' + group.subaddon[i].price + ' - ' + group.subaddon[i].name,
                checked: this.checkChecked(group.subaddon[i]),
                value: group.subaddon[i],
            });
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: function (data) {
                var data1 = _this.addGroupId(data, group);
                _this.spliceAddon(data1, group);
            }
        });
        alert.present();
    };
    ItemDetailPage.prototype.addGroupId = function (data, group) {
        var groupId = group._id;
        for (var i = 0; i < data.length; i++) {
            data[i]['groupId'] = groupId;
        }
        return data;
    };
    ItemDetailPage.prototype.spliceAddon = function (data1, group) {
        var groupId = group._id;
        var length = this.orderItem['addon'].length;
        if (length == 0) {
            this.addAddon(data1, group);
        }
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var index = this.orderItem['addon'].findIndex(function (mn) { return mn.groupId == groupId; });
                if (index > -1) {
                    this.orderItem['addon'].splice(index, 1);
                }
                if (index == -1 || (i == length - 1)) {
                    this.addAddon(data1, group);
                    break;
                }
            }
        }
    };
    ItemDetailPage.prototype.addAddon = function (data1, group) {
        var max;
        var min;
        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'mandatory') {
            min = group.groupType.min;
            max = group.groupType.max;
            if (data1.length >= min && data1.length <= max) {
                for (var i = 0; i < data1.length; i++) {
                    var index1 = this.orderItem['addon'].findIndex(function (mn) { return mn._id == data1[i]._id; });
                    if (index1 == -1) {
                        this.orderItem['addon'].push(data1[i]);
                    }
                }
            }
            else {
                this.getToast('Can\'t add \n Please ensure Minimum and Maximum you can order');
            }
            this.checkAddons();
            this.totalPrice();
        }
        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
            for (var i = 0; i < data1.length; i++) {
                var index1 = this.orderItem['addon'].findIndex(function (mn) { return mn._id == data1[i]._id; });
                if (index1 == -1) {
                    this.orderItem['addon'].push(data1[i]);
                }
            }
            this.totalPrice();
        }
    };
    ItemDetailPage.prototype.checkAddons = function () {
        var _this = this;
        this.mandCount = 0;
        for (var i = 0; i < this.mandOptionId.length; i++) {
            var x = this.orderItem['addon'].findIndex(function (mn) { return _this.mandOptionId[i] == mn.groupId; });
            if (x > -1) {
                this.mandCount++;
            }
        }
    };
    ItemDetailPage.prototype.checkDisabled = function () {
        if (this.mandOptionId.length == 0 || this.mandCount == this.mandOptionId.length) {
            return false;
        }
        else {
            return true;
        }
    };
    ItemDetailPage.prototype.checkChecked = function (addon) {
        var index2 = this.orderItem['addon'].findIndex(function (mn) { return mn._id == addon._id; });
        if (index2 > -1) {
            return true;
        }
    };
    ItemDetailPage.prototype.decreaseQuantity = function () {
        var x = document.getElementsByClassName('quantity');
        var y = parseInt(x[0].innerHTML);
        var z;
        if (y > 1) {
            z = y - 1;
            this.orderItem['quantity'] = z;
            this.totalPrice();
            var p = z.toString();
            x[0].innerHTML = p;
        }
        else {
            this.getToast('Choose Atleast 1');
        }
    };
    ItemDetailPage.prototype.increaseQuantity = function () {
        var x = document.getElementsByClassName('quantity');
        var y = parseInt(x[0].innerHTML);
        var z;
        if (y < 10) {
            z = y + 1;
            this.orderItem['quantity'] = z;
            this.totalPrice();
            var p = z.toString();
            x[0].innerHTML = p;
        }
        else {
            this.getToast('You Added Maximum Quantity');
        }
    };
    ItemDetailPage.prototype.countCharacter = function (event) {
        this.orderItem['itemInstruction'] = event.target.value;
    };
    ItemDetailPage.prototype.optionsFn = function () {
        console.log('isChange');
        this.orderItem['multisize'] = this.multisizeSelected;
        this.totalPrice();
    };
    ItemDetailPage.prototype.totalPrice = function () {
        var addonPrice = 0;
        var multisizePrice = 0;
        var total = 0;
        if (typeof this.orderItem['addon'] != 'undefined' && this.orderItem['addon'].length > 0) {
            for (var i = 0; i < this.orderItem['addon'].length; i++) {
                addonPrice = addonPrice + parseInt(this.orderItem['addon'][i].price);
            }
        }
        if (typeof this.orderItem['multisize'] != 'undefined') {
            multisizePrice = parseInt(this.orderItem['multisize'].price);
        }
        total = (this.item.price + multisizePrice + addonPrice) * this.orderItem['quantity'];
        this.totalAmount = total;
        this.orderItem['totalPrice'] = this.totalAmount;
    };
    ItemDetailPage.prototype.addToCart = function () {
        if (this.itemType == 'cartItem') {
            this.tempCart.push(this.orderItem);
            localStorage.setItem(this.cart, JSON.stringify(this.tempCart));
            var cartTotalAmount = 0;
            for (var i = 0; i < this.tempCart.length; i++) {
                cartTotalAmount = cartTotalAmount + this.tempCart[i].totalPrice;
                localStorage.setItem('subTotal_595172e2421a472120e0db5e', JSON.stringify(cartTotalAmount));
            }
        }
        if (this.itemType == 'promotionItem') {
            if (this.itemGroup == 'IG1') {
                this.promotionItems['itemGroup1'] = this.orderItem;
                localStorage.setItem(this.proId, JSON.stringify(this.promotionItems));
            }
            if (this.itemGroup == 'IG2') {
                this.promotionItems['itemGroup2'] = this.orderItem;
                localStorage.setItem(this.proId, JSON.stringify(this.promotionItems));
            }
        }
        this.navCtrl.pop(this.previousPage);
        this.getToast('Item Added');
    };
    ItemDetailPage.prototype.goToCart = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
    };
    ItemDetailPage.prototype.goToMyOrder = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__my_order_my_order__["a" /* MyOrderPage */]);
    };
    ItemDetailPage.prototype.logout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'Please Wait...'
                        });
                        loading.present();
                        localStorage.removeItem('currentCustomer');
                        delete _this.currentCustomer;
                        location.reload();
                        setTimeout(function () {
                            loading.dismiss();
                        }, 500);
                    }
                }
            ]
        });
        prompt.present();
    };
    ItemDetailPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    return ItemDetailPage;
}());
ItemDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-itemdetail',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\item\itemDetail.html"*/'\n\n<ion-header>\n\n\n\n	<ion-navbar>\n\n		<ion-title>{{item.name}}</ion-title>\n\n	</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content *ngIf = "item">\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n\n		<ion-refresher-content></ion-refresher-content>\n\n	</ion-refresher>\n\n\n\n	<ion-fab right bottom>\n\n	    <button ion-fab><ion-icon name="arrow-dropup"></ion-icon></button>\n\n	    <ion-fab-list side="top">\n\n			<button ion-fab (click)="goToCart()"><ion-icon name="cart" ios="ios-cart" md="md-cart"></ion-icon> <span class="numberClass">{{tempCart.length}}</span></button>\n\n			<button *ngIf = "currentCustomer" ion-fab (click)="goToMyOrder()"><ion-icon name="book" ios="ios-book" md="md-book"></ion-icon></button>\n\n			<button *ngIf = "currentCustomer" ion-fab (click)="logout()"><ion-icon name="log-out" ios="ios-log-out" md="md-log-out"></ion-icon></button>\n\n			<button *ngIf = "!currentCustomer" ion-fab (click)="login()"><ion-icon name="log-in" ios="ios-log-in" md="md-log-in"></ion-icon></button>\n\n	    </ion-fab-list>\n\n  </ion-fab>\n\n	\n\n	<ion-row class= "topRow item-img">\n\n		<ion-col col-12 class="itemImage" [ngStyle]="{\'background-image\': \'url(\' + itemImage(item.image) + \')\'}">		\n\n			<ion-row class="itemInfo positionAbsolute padding0px15px">\n\n				<ion-col col-12 class="itemName colorWhite" text-uppercase>\n\n					<ion-col col-10>{{item.name}}</ion-col>\n\n					<ion-col col-2 *ngIf="currentCustomer"><ion-icon (click)="makeFav(item._id)" float-right name="heart" ios="ios-heart" md="md-heart" [ngStyle]="isFavOrNot(item._id)"></ion-icon></ion-col>\n\n				</ion-col>\n\n				<ion-col col-12 class="itemPrice colorGreen">${{item.price}}</ion-col>\n\n			</ion-row>\n\n		</ion-col>\n\n	</ion-row>\n\n\n\n	<ion-card>\n\n		<ion-row class="imageDescription width100 padding0px15px">\n\n			<ion-col>{{item.description}}</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row *ngIf ="item.multisize && item.multisize.length > 0" class="imageDescription width100 padding0px15px">\n\n			<!-- <ion-col col-12> -->\n\n				<ion-label class="fontWeight600">Size</ion-label>\n\n				<ion-select interface="popover" [(ngModel)]="multisizeSelected" (ionChange)="optionsFn()">\n\n					<!-- <div *ngFor="let multisizes of item.multisize; let i = index; "> -->\n\n						<ion-option *ngFor="let multisizes of item.multisize; let i = index; " [value]="multisizes" selected ="{{i== 0}}">\n\n							<ion-row>\n\n								<ion-col col-4 text-right>${{multisizes.price}}&nbsp;&nbsp;&nbsp;&nbsp;</ion-col>\n\n								<ion-col col-8>{{multisizes.size}}</ion-col>\n\n							</ion-row>\n\n						</ion-option>\n\n					<!-- </div> -->\n\n				</ion-select>\n\n			<!-- </ion-col> -->\n\n		</ion-row>\n\n\n\n		<ion-row *ngIf = "item.options && item.options.length > 0" class="width100 padding0px15px">\n\n			<ion-col col-12>\n\n				<ion-label class="fontWeight600">Add-ons</ion-label>\n\n				<ion-row *ngFor = "let group of item.options" class="width100" (click)="showAddon(group)">\n\n					<ion-col col-12 class="fontWeight600">{{group.name}}\n\n						<span *ngIf="group.groupType" class="fontWeight500" text-uppercase>({{group.groupType.gType}})\n\n						</span>\n\n						<ion-icon name="arrow-dropdown" ios="ios-arrow-dropdown" md="md-arrow-dropdown" class="fontWeight600" float-right></ion-icon>\n\n					</ion-col>\n\n				</ion-row>\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row class="width100 padding0px15px">\n\n			<ion-col col-6>\n\n				<ion-label no-margin class="fontWeight600">Quantity</ion-label>\n\n			</ion-col>\n\n			<ion-col col-6 class="displayInherit">\n\n				<ion-col col-4 no-padding>\n\n					<button class="decreaseQuantity width100 height100"  [disabled] = "itemType == \'promotionItem\'" (click)="decreaseQuantity()">\n\n						<ion-icon name="remove" ios="ios-remove" md="md-remove" class="qtyButton"></ion-icon>\n\n					</button>\n\n				</ion-col>\n\n				<ion-col col-4 no-padding>\n\n					<ion-label no-margin class="quantity width100 height100">1</ion-label>\n\n				</ion-col>\n\n				<ion-col col-4 no-padding>\n\n					<button class="increaseQuantity width100 height100"  [disabled] = "itemType == \'promotionItem\'" (click)="increaseQuantity()">\n\n						<ion-icon name="add" ios="ios-add" md="md-add" class="qtyButton"></ion-icon>\n\n					</button>\n\n				</ion-col>\n\n			</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row class="width100 padding0px15px">\n\n			<ion-col col-12>\n\n				<ion-item no-padding class="specialInstruction">\n\n					<ion-label no-margin floating class="siLabel">Special Instruction...</ion-label>\n\n					<ion-input type="text" class="siText" maxlength="100" value="" (keyup)="countCharacter($event)"></ion-input>\n\n					<span> length/100</span>\n\n				</ion-item>\n\n			</ion-col>		\n\n		</ion-row>\n\n\n\n\n\n		<ion-row class="width100 padding0px15px">\n\n			<button class="width100 orderButton padding3" [disabled]="checkDisabled()" (click)="addToCart()">\n\n				<ion-row class="width100">\n\n					<ion-col col-3 text-center class="priceBorder">\n\n						{{this.totalAmount}} \n\n					</ion-col>\n\n					<ion-col col-9 text-center>\n\n						<ion-icon name="cart" ios="ios-cart" md="md-cart"></ion-icon> &nbsp;&nbsp; Add To Cart\n\n					</ion-col>\n\n				</ion-row>\n\n			</button>\n\n		</ion-row>\n\n	</ion-card>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\item\itemDetail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* KitchenItemService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ItemDetailPage);

//# sourceMappingURL=itemDetail.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__changepassword__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profileupdate__ = __webpack_require__(497);
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
    function ProfilePage(nav, navCtrl, loadingCtrl, customerService) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.customerService = customerService;
        this.restaurant = {};
        this.imageURL = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* imageUrl */];
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.loading.present();
        if (localStorage.getItem('currentCustomer')) {
            this.getCustomer();
        }
        else {
            this.loading.dismiss();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () { };
    ProfilePage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(function (cust) {
            _this.loading.dismiss();
            _this.currentCustomer = cust.message;
            console.log("this.currentCustomer");
            console.log(_this.currentCustomer);
        });
    };
    ProfilePage.prototype.restroImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    };
    ProfilePage.prototype.goToChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__changepassword__["a" /* ChangePasswordPage */]);
    };
    ProfilePage.prototype.goToUpdateProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__profileupdate__["a" /* ProfileUpdatePage */]);
    };
    ProfilePage.prototype.customerImage = function (img) {
        if (typeof img != 'undefined' && img != null) {
            var imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            var imgPath = "assets/img/profile.png";
        }
        return imgPath;
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  	<button ion-button menuToggle class="colorWhite">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>profile</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding *ngIf="restaurant" [ngStyle]="{\'background-image\': \'url(\' + restroImage(restaurant.image) + \')\'}">\n\n    <ion-row *ngIf = "currentCustomer"  class="colorWhite">\n\n        <ion-item no-padding class="colorWhite">\n\n            <ion-avatar class="marginBottom4">\n\n                <img [src]="customerImage(currentCustomer.image)">\n\n            </ion-avatar>\n\n            <h2 class="fontWeight600">{{currentCustomer.username}}</h2>\n\n            <p class="colorWhite">{{currentCustomer.email}}</p>\n\n            <span class="editProfile" (click)="goToUpdateProfile()"><ion-icon name="create" ios="ios-create" md="md-create"></ion-icon></span>\n\n        </ion-item>\n\n\n\n        <ion-row class="font14 width100">\n\n            <ion-col col-1>\n\n                <ion-icon name="person" ios="ios-person" md="md-person" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4 class="fontWeight600">Name:</ion-col>\n\n            <ion-col col-7 text-capitalize>{{currentCustomer.firstname}} {{currentCustomer.lastname}}</ion-col>\n\n        </ion-row>\n\n        <ion-row class="font14 width100">\n\n            <ion-col col-1>\n\n                <ion-icon name="call" ios="ios-call" md="md-call" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4 class="fontWeight600">Contact:</ion-col>\n\n            <ion-col col-7>{{currentCustomer.phonenumber}}</ion-col>\n\n        </ion-row>\n\n        \n\n        <!-- <ion-row class="width100 marginTop4 changePass" (click)="goToChangePassword()">\n\n            <ion-col text-right>change password?</ion-col>\n\n        </ion-row> -->\n\n        <ion-label text-right>\n\n            <span class="changePass" (click)="goToChangePassword()">change password?</span>\n\n        </ion-label>\n\n\n\n    </ion-row>\n\n\n\n    <!-- <ion-grid>\n\n        <ion-row *ngIf = "currentCustomer">\n\n            <ion-col col-1>\n\n                <ion-icon name="person" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Username:</ion-col>\n\n            <ion-col col-7>{{currentCustomer.username}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="mail" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Email:</ion-col>\n\n            <ion-col col-7>{{currentCustomer.email}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="person" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Name:</ion-col>\n\n            <ion-col col-7> {{currentCustomer.firstname}} {{currentCustomer.lastname}}</ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="call" item-start></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-4>Contact:</ion-col>\n\n            <ion-col col-7> {{currentCustomer.phonenumber}} </ion-col>\n\n        </ion-row>\n\n\n\n    </ion-grid>\n\n    <ion-list>\n\n        <button ion-button icon-only (click)="goToChangePassword()"><ion-icon name="key" item-start></ion-icon></button>\n\n        <button ion-button icon-only item-end (click)="goToUpdateProfile()"><ion-icon name="create" ></ion-icon></button>\n\n    </ion-list> -->\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return url; });
/* unused harmony export frontUrl */
var imageUrl = 'http://104.236.69.166:4003/uploads/';
var url = 'http://104.236.69.166:4003/';
var frontUrl = 'http://104.236.69.166:3000/';
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestroinfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RestroinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RestroinfoPage = (function () {
    function RestroinfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RestroinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RestroinfoPage');
    };
    return RestroinfoPage;
}());
RestroinfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-restroinfo',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\restroinfo\restroinfo.html"*/'<!--\n\n  Generated template for the RestroinfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>restroinfo</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\restroinfo\restroinfo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], RestroinfoPage);

//# sourceMappingURL=restroinfo.js.map

/***/ }),

/***/ 188:
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
webpackEmptyAsyncContext.id = 188;

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/restroinfo/restroinfo.module": [
		860,
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
webpackAsyncContext.id = 231;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert_service__ = __webpack_require__(850);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(851);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__(852);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_service__ = __webpack_require__(853);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__restaurants_service__ = __webpack_require__(489);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__restaurants_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__promotions_service__ = __webpack_require__(854);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__promotions_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__kitchenmenu_service__ = __webpack_require__(855);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__kitchenmenu_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__kitchenitem_service__ = __webpack_require__(856);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__kitchenitem_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__master_service__ = __webpack_require__(857);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__customer_service__ = __webpack_require__(50);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__customer_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__order_service__ = __webpack_require__(490);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_10__order_service__["a"]; });











//# sourceMappingURL=index.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgetpassword__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_component__ = __webpack_require__(485);
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
    function LoginPage(nav, events, loadingCtrl, menuCtrl, lf, navCtrl, viewCtrl, toastCtrl, customerService, navParams) {
        this.nav = nav;
        this.events = events;
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
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
        this.menuCtrl.enable(false);
        /*var val=this.navCtrl.last();
        this.previousPage = val.component*/
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.createUser = function (user) {
        console.log('User created!');
        this.events.publish('user:created', user, Date.now());
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.getCustomer(this.loginForm.value).subscribe(function (data) {
            loading.dismiss();
            if (data.status) {
                _this.createUser(data.data.email);
                localStorage.setItem('currentCustomer', JSON.stringify(data.data));
                _this.menuCtrl.enable(true);
                //this.nav.setRoot(this.previousPage);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__app_app_component__["a" /* MyApp */]);
            }
            else {
                _this.getToast('Bad Credential');
                _this.loginForm.reset();
            }
        }, function (err) {
            loading.dismiss();
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forgetpassword__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register__["a" /* RegisterPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-list>\n\n		<form role="form" [formGroup]="loginForm" (ngSubmit)="login()" >\n\n			<ion-item class="topRadius">\n\n				<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n				<ion-input formControlName="username" placeholder="Username" type="text"></ion-input>\n\n			</ion-item>\n\n			<ion-item class="bottomRadius">\n\n				<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n				<ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n\n			</ion-item>\n\n			<button ion-button full color="secondary" [disabled]="!loginForm.valid">Login</button>\n\n		</form>	\n\n		<button ion-button clear class="white" (click)="goToForget()">Forget Password ?</button>\n\n		<button ion-button clear class="white" (click)="register()">Sign Up ?</button>\n\n	</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_promotion_promotion__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_profile_wishlist__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_my_order_my_order__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_cart_cart__ = __webpack_require__(59);
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
    function MyApp(platform, events, statusBar, alertCtrl, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.events = events;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* MenuPage */];
        this.restaurant = {};
        events.subscribe('user:created', function (user, time) {
            _this.pages = [];
            _this.pages.push({ iconA: 'flame', iconI: 'ios-flame', iconW: 'md-flame', title: 'Hot Deals', component: __WEBPACK_IMPORTED_MODULE_5__pages_promotion_promotion__["a" /* PromotionPage */] }, { iconA: 'clipboard', iconI: 'ios-clipboard', iconW: 'md-clipboard', title: 'Menu', component: __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* MenuPage */] }, { iconA: 'cart', iconI: 'ios-cart', iconW: 'md-cart', title: 'Shopping Cart', component: __WEBPACK_IMPORTED_MODULE_10__pages_cart_cart__["a" /* CartPage */] }, { iconA: 'book', iconI: 'ios-book', iconW: 'md-book', title: 'My Orders', component: __WEBPACK_IMPORTED_MODULE_9__pages_my_order_my_order__["a" /* MyOrderPage */] }, { iconA: 'heart', iconI: 'ios-heart', iconW: 'md-heart', title: 'My WishList', component: __WEBPACK_IMPORTED_MODULE_7__pages_profile_wishlist__["a" /* WishlistPage */] }, { iconA: 'person', iconI: 'ios-person', iconW: 'md-person', title: 'My Profile', component: __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__["a" /* ProfilePage */] }, { iconA: 'log-out', iconI: 'ios-log-out', iconW: 'md-log-out', title: 'Logout', component: 'logout' });
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', user, 'at', time);
        });
        this.initializeApp();
        // used for an example of ngFor and navigation
    }
    MyApp.prototype.ionViewDidEnter = function () {
        this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.initializeApp();
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        localStorage.removeItem('currentCustomer');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        prompt.present();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.pages = [
            { iconA: 'flame', iconI: 'ios-flame', iconW: 'md-flame', title: 'Hot Deals', component: __WEBPACK_IMPORTED_MODULE_5__pages_promotion_promotion__["a" /* PromotionPage */] },
            { iconA: 'clipboard', iconI: 'ios-clipboard', iconW: 'md-clipboard', title: 'Menu', component: __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* MenuPage */] },
            { iconA: 'cart', iconI: 'ios-cart', iconW: 'md-cart', title: 'Shopping Cart', component: __WEBPACK_IMPORTED_MODULE_10__pages_cart_cart__["a" /* CartPage */] },
            { iconA: 'person', iconI: 'ios-person', iconW: 'md-person', title: 'My Profile', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] }
        ];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
        this.platform.ready().then(function () {
            // Here you can do any higher level native things you might need.
            // Okay, so the platform is ready and our plugins are available.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.component == 'logout') {
            var prompt_1 = this.alertCtrl.create({
                title: 'Logout',
                message: "Are you sure ?",
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'oK',
                        handler: function (data) {
                            localStorage.removeItem('currentCustomer');
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
                        }
                    }
                ]
            });
            prompt_1.present();
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-content class="leftNav">\n\n        <ion-row *ngIf="restaurant" class="restaurantLogo">\n\n            <ion-col col-12 text-center>{{restaurant.name}}</ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row *ngIf = "pages" class="leftNavHeading">\n\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n                <ion-icon name="{{p.iconA}}" ios="{{p.iconI}}" md="{{p.iconW}}" item-start></ion-icon> {{p.title}}\n\n            </button>\n\n        </ion-row>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login__ = __webpack_require__(37);
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
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forget-password',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\forgetpassword.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Forget Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="forgetForm" (ngSubmit)="forgetPass()" >\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="email" placeholder="Enter Email Address" type="text"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!forgetForm.valid">Submit</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\forgetpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ForgetPasswordPage);

//# sourceMappingURL=forgetpassword.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login__ = __webpack_require__(37);
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
        this.signUpForm = this.lf.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    RegisterPage.prototype.importonViewDidLoad = function () {
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.customerService.addCustomer(this.signUpForm.value).subscribe(function (data) {
            if (!data.error) {
                console.log("data");
                console.log(data);
                loading.dismiss();
                _this.getToast('Registered Successfully');
                _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginPage */]);
            }
            else {
                loading.dismiss();
                _this.getToast('Email/Username Already Exist');
            }
        });
    };
    RegisterPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\register.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="signUpForm" (ngSubmit)="register()" >\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="firstname" class="form-control" placeholder="firstname" type="text" autofocus></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="lastname" class="form-control" placeholder="lastname" type="text"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="phonenumber" class="form-control" placeholder="Telephone *" type="number"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="username" class="form-control" placeholder="Choose your Username" type="text"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="email" class="form-control" placeholder="E-mail"  type="email"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="topRadius">\n\n			<ion-label> <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon> </ion-label>\n\n			<ion-input formControlName="password" class="form-control" placeholder="Password" type="password" value=""></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!signUpForm.valid">Submit</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\login\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__promotiondetail__ = __webpack_require__(495);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PromotionPage = (function () {
    function PromotionPage(nav, loadingCtrl, menuCtrl, viewCtrl, toastCtrl, navCtrl, promotionsService, navParams, alertCtrl) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.promotionsService = promotionsService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.restroPromotions = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
    }
    PromotionPage.prototype.ionViewDidLoad = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.loadAllRestroPromotions('595172e2421a472120e0db5e');
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());
        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth() + 1);
        var year = this.currentDate.getFullYear();
        this.currentTime = h + ':' + m;
        this.completeDate = date + '-' + month + '-' + year;
        this.time = h + ':' + m + ':' + s;
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.day = days[this.currentDate.getDay()];
    };
    PromotionPage.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    PromotionPage.prototype.loadAllRestroPromotions = function (id) {
        var _this = this;
        this.restroPromotions = [];
        this.promotionsService.getRestroPromotions(id).subscribe(function (data) {
            if (!data.error) {
                _this.loading.dismiss();
                for (var i = 0; i < data.message.length; i++) {
                    if (data.message[i].status == true) {
                        var returnValue = _this.displayPromotion(data.message[i]);
                        if (returnValue == 'block') {
                            _this.restroPromotions.push(data.message[i]);
                        }
                    }
                    console.log("this.restroPromotions");
                    console.log(_this.restroPromotions);
                }
            }
            else {
                _this.loading.dismiss();
                _this.getToast('Something Went Wrong');
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
            }
        });
    };
    PromotionPage.prototype.displayPromotion = function (promo) {
        if ((this.completeDate >= promo.discountTiming[0].available.from && this.completeDate <= promo.discountTiming[0].available.till) || promo.discountTiming[0].available == 'unlimited') {
            for (var i in promo.discountTiming[0].days) {
                if (this.day == i) {
                    var ch = i + 'time';
                    if (typeof promo.discountTiming[0].days[ch] != 'undefined') {
                        if (promo.discountTiming[0].days[ch]['opentime'] <= this.currentTime && promo.discountTiming[0].days[ch]['closetime'] >= this.currentTime) {
                            return 'block';
                        }
                    }
                    if (typeof promo.discountTiming[0].days[ch] == 'undefined') {
                        return 'block';
                    }
                }
            }
        }
        else {
            return 'none';
        }
    };
    PromotionPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    PromotionPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.loadAllRestroPromotions('595172e2421a472120e0db5e');
            refresher.complete();
        }, 2000);
    };
    PromotionPage.prototype.getDeal = function (promo) {
        var _this = this;
        if (localStorage.getItem('promotion_595172e2421a472120e0db5e') || localStorage.getItem('coupon_595172e2421a472120e0db5e')) {
            var alert = this.alertCtrl.create({
                title: 'Remainder',
                message: 'Adding Another Deal will remove previous deals added',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Ok',
                        handler: function () {
                            localStorage.removeItem('promotion_595172e2421a472120e0db5e');
                            localStorage.removeItem('coupon_595172e2421a472120e0db5e');
                            localStorage.setItem('promo', JSON.stringify(promo));
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__promotiondetail__["a" /* PromotionDetailPage */], {
                                promo: promo
                            });
                        }
                    }
                ]
            });
            alert.present();
        }
        else {
            localStorage.setItem('promo', JSON.stringify(promo));
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__promotiondetail__["a" /* PromotionDetailPage */], {
                promo: promo
            });
        }
    };
    return PromotionPage;
}());
PromotionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-promotion',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\promotion\promotion.html"*/'<ion-header>\n\n	<ion-navbar>\n\n	  	<button ion-button menuToggle class="colorWhite">\n\n	        <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n	    </button>\n\n	    <ion-title>Hot Deals</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content  *ngIf = "restroPromotions" class="card-background-page">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-list *ngFor = "let promo of restroPromotions" [ngStyle]="{\'background-image\': \'url(\' + imageURL + promo.image + \')\'}">\n\n        <div class="card-title positionAbsolute fontWeight500">{{promo.promoname}}</div>\n\n        <div class="card-description positionAbsolute">{{promo.description}}</div>\n\n        <div class="card-getNow positionAbsolute" *ngIf="promo.discountOn != null" (click)="getDeal(promo)">Get it now</div>\n\n        <div class="card-promoCode positionAbsolute" *ngIf="promo.discountOn == null">{{promo.couponcode.code}}</div>\n\n    </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\promotion\promotion.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* PromotionsService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PromotionPage);

//# sourceMappingURL=promotion.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Manvi on 14-Apr-17.
 */



var RestaurantsService = (function () {
    function RestaurantsService(http) {
        this.http = http;
    }
    RestaurantsService.prototype.addRestaurant = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateRestaurant = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUp = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateDelivery = function (data) {
        console.log("data");
        console.log(data);
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'delivery-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateNotification = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant-notification/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteNotification = function (id, index) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getNotification = function (id, index) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/notification/' + id + '/' + index)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editNotification = function (index, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/notification/' + data._id + '/' + index, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updatePickUpHours = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/' + data._id, data.result)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.activateMail = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'owners/mailactivate/' + data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.emailConfirm = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'owners/account-confirm/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.updateLocation = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'location-update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.addDeliveryZone = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'deliveryzone/', data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.removeDeliveryZone = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZone = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'deliveryzone/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.editDeliveryZoneUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'deliveryzone/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAllDeliveryZone = function (id) {
        console.log(id);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'deliveryzones/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/')
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.getOwnerRestaurants = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'owner-restaurants/' + id)
            .map(function (response) { return response.json(); });
    };
    RestaurantsService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant/' + id)
            .map(function (response) { return response.json(); });
    };
    return RestaurantsService;
}());
RestaurantsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], RestaurantsService);

//# sourceMappingURL=restaurants.service.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
    }
    OrderService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/')
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.overview = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/overview/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.shootMailToCustomer = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/shoot-mail/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.client = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/client/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.orders = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/list/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.customerOrders = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/customer/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getMethodChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/method/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getResultChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/results/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getTypeChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/type/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getPaymentChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/payment/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/items/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getAllSaleChart = function (id, days) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/all-sale/' + id + '/' + days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getItemCategoryChart = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'reporting/item-category/' + data.id + '/' + data.menuid + '/' + data.days)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getDetail = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/' + id)
            .map(function (response) { return response.json(); });
    };
    OrderService.prototype.getUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/update/' + data.id, data)
            .map(function (response) { return response.json(); });
    };
    return OrderService;
}());
OrderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], OrderService);

//# sourceMappingURL=order.service.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__itemDetail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_order_my_order__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ItemPage = (function () {
    function ItemPage(loadingCtrl, menuCtrl, viewCtrl, toastCtrl, navCtrl, customerService, alertCtrl, nav, kitchenItemService, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.alertCtrl = alertCtrl;
        this.nav = nav;
        this.kitchenItemService = kitchenItemService;
        this.navParams = navParams;
        this.menu = {};
        this.items = [];
        this.tempCart = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.menu = navParams.get('menu');
    }
    ItemPage.prototype.ionViewDidEnter = function () {
        this.cart = 'cart_595172e2421a472120e0db5e';
        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }
        this.getCustomer();
        this.getItems(this.menu._id);
    };
    ItemPage.prototype.ionViewDidLoad = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());
        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth() + 1);
        var year = this.currentDate.getFullYear();
        this.currentTime = h + ':' + m;
        this.completeDate = date + '-' + month + '-' + year;
        this.time = h + ':' + m + ':' + s;
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.day = days[this.currentDate.getDay()];
    };
    ItemPage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        if (tempCurrentCustomer) {
            this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(function (cust) {
                _this.currentCustomer = cust.message;
            });
        }
    };
    ItemPage.prototype.isFavOrNot = function (id) {
        if (this.currentCustomer) {
            var wIndex = this.currentCustomer.wishlist.indexOf(id);
            if (wIndex == -1) {
                return { 'color': '#999' };
            }
            else {
                return { 'color': 'red' };
            }
        }
    };
    ItemPage.prototype.makeFav = function (id) {
        var wIndex = this.currentCustomer.wishlist.indexOf(id);
        if (wIndex == -1) {
            this.currentCustomer.wishlist.push(id);
            this.getItems(this.menu._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (cust) {
                console.log(cust);
            });
        }
        else {
            this.currentCustomer.wishlist.splice(wIndex, 1);
            this.getItems(this.menu._id);
            console.log(this.currentCustomer);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(function (cust) {
            });
        }
    };
    ItemPage.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    ItemPage.prototype.itemImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    };
    ItemPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getItems(_this.menu._id);
            refresher.complete();
        }, 2000);
    };
    ItemPage.prototype.checkMenuItemShow = function (obj) {
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= this.currentTime && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }
                else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }
                else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }
                else {
                    return 'none';
                }
            }
            else {
                return 'none';
            }
        }
        else {
            return 'block';
        }
    };
    ItemPage.prototype.getItems = function (id) {
        var _this = this;
        this.kitchenItemService.getMenuItem(id).subscribe(function (users) {
            if (!users.error) {
                if (users.message.length > 0) {
                    _this.items = [];
                    for (var i = 0; i < users.message.length; i++) {
                        var display = _this.checkMenuItemShow(users.message[i]);
                        if (display == 'block') {
                            _this.items.push(users.message[i]);
                        }
                    }
                    _this.loading.dismiss();
                }
                else {
                    _this.loading.dismiss();
                    _this.nav.pop(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
                    _this.getToast('No Item Availavle Now!');
                }
            }
            else {
                _this.loading.dismiss();
                _this.nav.pop(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
                _this.getToast('Something Went Wrong!');
            }
        });
    };
    ItemPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    ItemPage.prototype.tapEvent = function ($event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__itemDetail__["a" /* ItemDetailPage */], {
            item: item, type: 'cartItem', iG: null
        });
    };
    ItemPage.prototype.goToCart = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
    };
    ItemPage.prototype.goToMyOrder = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__my_order_my_order__["a" /* MyOrderPage */]);
    };
    ItemPage.prototype.logout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'Please Wait...'
                        });
                        loading.present();
                        localStorage.removeItem('currentCustomer');
                        delete _this.currentCustomer;
                        location.reload();
                        setTimeout(function () {
                            loading.dismiss();
                        }, 500);
                    }
                }
            ]
        });
        prompt.present();
    };
    ItemPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */]);
    };
    return ItemPage;
}());
ItemPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-item',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\item\item.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>{{menu.name}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n	<ion-fab right bottom>\n\n	    <button ion-fab><ion-icon name="arrow-dropup"></ion-icon></button>\n\n	    <ion-fab-list side="top">\n\n			<button ion-fab (click)="goToCart()"><ion-icon name="cart" ios="ios-cart" md="md-cart"></ion-icon> <span class="numberClass">{{tempCart.length}}</span></button>\n\n			<button *ngIf = "currentCustomer" ion-fab (click)="goToMyOrder()"><ion-icon name="book" ios="ios-book" md="md-book"></ion-icon></button>\n\n			<button *ngIf = "currentCustomer" ion-fab (click)="logout()"><ion-icon name="log-out" ios="ios-log-out" md="md-log-out"></ion-icon></button>\n\n			<button *ngIf = "!currentCustomer" ion-fab (click)="login()"><ion-icon name="log-in" ios="ios-log-in" md="md-log-in"></ion-icon></button>\n\n	    </ion-fab-list>\n\n  </ion-fab>\n\n\n\n\n\n	<ion-card *ngFor = "let item of items" class="width100">\n\n		<ion-row class="itemDetail" *ngIf="item">\n\n			<ion-col col-4 class="itemImage" (tap)="tapEvent($event,item)"><img [src]="itemImage(item.image)"/></ion-col>\n\n			<ion-col col-7 (tap)="tapEvent($event,item)">\n\n				<ion-row text-uppercase class="itemName">\n\n					{{item.name}}\n\n				</ion-row>\n\n				<ion-row class="itemPrice fontWeight600 colorGreen">\n\n					${{item.price}}\n\n				</ion-row>\n\n			</ion-col>\n\n			<ion-col col-1 *ngIf="currentCustomer">\n\n				<ion-icon (click)="makeFav(item._id)" float-right name="heart" ios="ios-heart" md="md-heart" [ngStyle]="isFavOrNot(item._id)"></ion-icon>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\item\item.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* KitchenItemService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ItemPage);

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CheckoutPage = (function () {
    function CheckoutPage(navCtrl, nav, loadingCtrl, navParams, restaurantsService, customerService, toastCtrl, lf) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.customerService = customerService;
        this.toastCtrl = toastCtrl;
        this.lf = lf;
        this.cartStorage = {};
        this.restaurants = {};
        this.currentCustomer = {};
        this.orderMethod = {};
        this.orderTime = {};
        this.delivery = {};
        this.zoneObject = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.del = false;
        this.showLater = false;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //this.loadScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyAYQoBlDYqxMVhiiZFTzWljTUi84ZwoA6g&libraries=places,geometry','js');
        this.loading.present();
        if (localStorage.getItem('currentCustomer')) {
            this.loading.dismiss();
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            this.cartStorageString = 'cartStorage_595172e2421a472120e0db5e';
            //this.cartStorage = navParams.get('cart');
            this.cartStorage = JSON.parse(localStorage.getItem(this.cartStorageString));
            if (this.cartStorage['orderMethod']) {
                if (this.cartStorage['orderMethod']['mType'] == 'Pickup') {
                    this.orderMethodSelect = 'pickup';
                    this.orderMethod = this.cartStorage['orderMethod'];
                }
                if (this.cartStorage['orderMethod']['mType'] == 'Delivery') {
                    this.orderMethodSelect = 'delivery';
                    this.del = true;
                    this.oMethod = true;
                    this.enterAddress = false;
                    this.orderMethod = this.cartStorage['orderMethod'];
                }
            }
            if (this.cartStorage['orderPayment']) {
                if (this.cartStorage['orderPayment']['cardinternet'] == true) {
                    this.orderPaymentSelect = 'cardInternet';
                }
                if (this.cartStorage['orderPayment']['cardpickup'] == true) {
                    this.orderPaymentSelect = 'cardPickup';
                }
                if (this.cartStorage['orderPayment']['cash'] == true) {
                    this.orderPaymentSelect = 'cash';
                }
                this.orderPaymentFunction();
            }
            if (this.cartStorage['orderTime']) {
                if (this.cartStorage['orderTime']['tType'] == 'Now') {
                    this.orderTimeSelect = 'now';
                    this.orderTimeFunction();
                }
                if (this.cartStorage['orderTime']['tType'] == 'Later') {
                    this.orderTimeSelect = 'later';
                    this.showLater = true;
                    this.tMethod = false;
                    this.orderTime = this.cartStorage['orderTime'];
                    this.laterDate = this.cartStorage['orderTime']['day'];
                    this.laterTime = this.cartStorage['orderTime']['time'];
                    setTimeout(function () {
                        var x = document.getElementsByTagName('ion-datetime');
                        var day = x[0].getElementsByClassName('datetime-text');
                        var time = x[1].getElementsByClassName('datetime-text');
                        day[0].innerHTML = _this.cartStorage['orderTime']['day'];
                        time[0].innerHTML = _this.cartStorage['orderTime']['time'];
                        _this.tMethod = true;
                    }, 500);
                }
            }
            this.totalAmount = this.cartStorage.gTotal;
            this.cartStorage['customerId'] = this.currentCustomer._id;
            this.getRestaurants(this.cartStorage.restaurantId);
            this.deliveryZone(this.cartStorage.restaurantId);
        }
        else {
            this.loading.dismiss();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }
    }
    CheckoutPage.prototype.initMap = function () {
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
                var city = void 0, state = void 0, country = void 0;
                /*if (place.address_components.length >= 4) {
                    city = place.address_components[place.address_components.length-3].long_name;
                }else{
                    city = place.address_components[place.address_components.length-3].long_name;
                }*/
                if (place.address_components.length >= 4) {
                    city = place.address_components[0].long_name;
                    state = place.address_components[place.address_components.length - 2].long_name;
                    country = place.address_components[place.address_components.length - 1].long_name;
                }
                _this.addressForm.controls['city'].setValue(city);
                _this.addressForm.controls['state'].setValue(state);
                _this.addressForm.controls['country'].setValue(country);
            }
        });
    };
    CheckoutPage.prototype.ionViewDidLoad = function () {
        this.addressForm = this.lf.group({
            streetName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            city: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            state: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            country: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            postcode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    };
    CheckoutPage.prototype.loadScript = function (url, type) {
        if (type == 'js') {
            var node = document.createElement('script');
            node.src = url;
            node.type = 'text/javascript';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    };
    CheckoutPage.prototype.getRestaurants = function (id) {
        var _this = this;
        this.restaurantsService.getOne(id).subscribe(function (users) {
            _this.restaurants = users.message;
        });
    };
    CheckoutPage.prototype.deliveryZone = function (id) {
        var _this = this;
        this.restaurantsService.getAllDeliveryZone(id).subscribe(function (users) {
            _this.delivery = users.message;
        });
    };
    CheckoutPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    CheckoutPage.prototype.customerImage = function (img) {
        if (typeof img != 'undefined' && img != null) {
            var imgPath = this.imageURL + img;
        }
        if (typeof img == 'undefined' || img == null) {
            var imgPath = "assets/img/profile.png";
        }
        return imgPath;
    };
    CheckoutPage.prototype.orderMethodFunction = function () {
        var _this = this;
        var method = this.orderMethodSelect;
        if (method == 'delivery') {
            this.del = true;
            this.oMethod = false;
            this.enterAddress = true;
            this.orderMethod = {};
            this.orderMethod['mType'] = 'Delivery';
            setTimeout(function () {
                _this.initMap();
            }, 2000);
            if (this.cartStorage['orderPayment']) {
                delete this.cartStorage['orderPayment'];
                this.orderPaymentSelect = '';
                this.orderPaymentFunction();
            }
        }
        else {
            this.del = false;
            this.enterAddress = false;
            this.oMethod = true;
            this.orderMethod = {};
            this.orderMethod['mType'] = 'Pickup';
            this.cartStorage['orderMethod'] = this.orderMethod;
            if (this.cartStorage['deliveryfee']) {
                this.cartStorage['gTotal'] = this.cartStorage['gTotal'] - this.cartStorage['deliveryfee'];
                delete this.cartStorage['deliveryfee'];
            }
            if (this.cartStorage['orderPayment']) {
                delete this.cartStorage['orderPayment'];
                this.orderPaymentSelect = '';
                this.orderPaymentFunction();
            }
            this.cartStorage['gTotal'] = this.totalAmount;
        }
    };
    CheckoutPage.prototype.orderTimeFunction = function () {
        var time = this.orderTimeSelect;
        if (time == 'now') {
            this.showLater = false;
            this.tMethod = true;
            this.orderTime = {};
            this.orderTime['tType'] = 'Now';
            this.orderTime['time'] = new Date();
            this.cartStorage['orderTime'] = this.orderTime;
        }
        else {
            this.showLater = true;
            this.tMethod = false;
            this.orderTime = {};
            this.orderTime['tType'] = 'Later';
        }
    };
    CheckoutPage.prototype.orderPaymentFunction = function () {
        var pType = this.orderPaymentSelect;
        if (pType == "cash") {
            this.pMethod = true;
            this.orderPayment = { "ptype": this.orderMethod.mType, "cash": true, "cardpickup": false, "cardinternet": false };
        }
        if (pType == "cardPickup") {
            this.pMethod = true;
            this.orderPayment = { "ptype": this.orderMethod.mType, "cash": false, "cardpickup": true, "cardinternet": false };
        }
        if (pType == "cardInternet") {
            this.pMethod = true;
            this.orderPayment = { "ptype": this.orderMethod.mType, "cash": false, "cardpickup": false, "cardinternet": true };
        }
        if (pType == '') {
            this.pMethod = false;
            delete this.orderPayment;
        }
        if (typeof this.orderPayment != 'undefined') {
            this.cartStorage['orderPayment'] = this.orderPayment;
        }
    };
    CheckoutPage.prototype.laterDateFunction = function () {
        var _this = this;
        setTimeout(function () {
            var dayId = document.getElementById('laterDate1');
            var day = dayId.getElementsByClassName('datetime-text');
            console.log("day");
            console.log(day[0].innerHTML);
            _this.orderTime['day'] = day[0].innerHTML;
            if (typeof _this.orderTime['time'] != 'undefined') {
                _this.cartStorage['orderTime'] = _this.orderTime;
                _this.tMethod = true;
            }
        }, 500);
    };
    CheckoutPage.prototype.laterTimeFunction = function () {
        var _this = this;
        setTimeout(function () {
            var timeId = document.getElementById('laterTime1');
            var time = timeId.getElementsByClassName('datetime-text');
            console.log("time");
            console.log(time[0].innerHTML);
            _this.orderTime['time'] = time[0].innerHTML;
            if (typeof _this.orderTime['day'] != 'undefined') {
                _this.cartStorage['orderTime'] = _this.orderTime;
                _this.tMethod = true;
            }
        }, 500);
    };
    CheckoutPage.prototype.saveAddressInfo = function () {
        this.zoneObject = [];
        this.orderMethod = { "streetName": this.addressForm.value.streetName, "city": this.addressForm.value.city, "state": this.addressForm.value.state, "country": this.addressForm.value.country, "postcode": this.addressForm.value.postcode, "mType": 'Delivery' };
        this.zoneCalculate(this.orderMethod);
    };
    CheckoutPage.prototype.zoneCalculate = function (method) {
        var _this = this;
        this.customerService.getLatLng(method).subscribe(function (data) {
            _this.orderMethod = { "streetName": _this.addressForm.value.streetName, "city": _this.addressForm.value.city, "state": _this.addressForm.value.state, "country": _this.addressForm.value.country, "postcode": _this.addressForm.value.postcode, "lat": data.message.lat, "lng": data.message.lng, "mType": 'Delivery' };
            /*localStorage.setItem(this.orderMethodStorage, JSON.stringify(this.orderMethod));*/
            /*this.orderMethod = JSON.parse(localStorage.getItem(this.orderMethodStorage));*/
            var latLng = new google.maps.LatLng(_this.restaurants.lat, _this.restaurants.lng);
            var latLngDeliveryAddress = new google.maps.LatLng(data.message.lat, data.message.lng);
            var map = new google.maps.Map(document.getElementById('gmap'), {
                zoom: 15,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
            var marker = new google.maps.Marker({
                position: latLng,
                title: 'Location',
                map: map,
                draggable: true
            });
            var markerB = new google.maps.Marker({
                position: latLngDeliveryAddress,
                title: 'Location',
                map: map,
                draggable: true
            });
            if (_this.delivery.length > 0) {
                for (var i = 0; i < _this.delivery.length; i++) {
                    var zones = _this.calculateDeliveryZone(_this.delivery[i], latLngDeliveryAddress, map, marker);
                    if (typeof zones != 'undefined') {
                        _this.zoneObject.push(zones);
                    }
                }
            }
            if (_this.zoneObject.length > 0) {
                _this.deliveryFee = parseInt(_this.zoneObject[0].deliveryfee);
                for (var i = 0; i < _this.zoneObject.length; i++) {
                    if (_this.zoneObject[i].deliveryfee <= _this.deliveryFee) {
                        _this.deliveryFee = parseInt(_this.zoneObject[i].deliveryfee);
                        _this.minAmount = parseInt(_this.zoneObject[i].amount);
                    }
                }
                _this.cartStorage['orderMethod'] = method;
                _this.enterAddress = false;
                _this.oMethod = true;
                _this.cartStorage['deliveryfee'] = _this.deliveryFee;
                _this.cartStorage['gTotal'] = _this.totalAmount + _this.deliveryFee;
            }
            if (_this.zoneObject.length == 0) {
                _this.getToast('Delivery Not Available');
                _this.enterAddress = true;
                _this.oMethod = false;
                _this.addressForm.reset();
            }
        });
    };
    CheckoutPage.prototype.calculateDeliveryZone = function (zoneObj, deliveryAddress, map, marker) {
        if (zoneObj.type == 'Circle') {
            var circle = new google.maps.Circle({
                map: map,
                clickable: false,
                radius: parseFloat(zoneObj.radius),
                //radius: 400,
                fillColor: '#fff',
                fillOpacity: .6,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8
            });
            circle.bindTo('center', marker, 'position');
            var isIn = circle.getBounds().contains(deliveryAddress);
            if (isIn) {
                return zoneObj;
            }
        }
        if (zoneObj.type == 'Shape') {
            var polygonCord = [];
            var newArr = zoneObj.radius;
            var splitString = newArr.split('@');
            var splitStrlen = splitString.length;
            for (var k = 0; k < splitStrlen; k++) {
                var my_lat = splitString[k].split(',');
                polygonCord.push({ lat: parseFloat(my_lat[0]), lng: parseFloat(my_lat[1]) });
            }
            var mypolygone = new google.maps.Polygon({
                paths: polygonCord,
                strokeColor: zoneObj.color,
                fillColor: zoneObj.color,
            });
            mypolygone.setMap(map);
            var isWithinPolygon = google.maps.geometry.poly.containsLocation(deliveryAddress, mypolygone);
            if (isWithinPolygon) {
                return zoneObj;
            }
        }
    };
    CheckoutPage.prototype.editAddress = function () {
        this.enterAddress = true;
        this.addressForm.patchValue(this.orderMethod);
    };
    CheckoutPage.prototype.checkDisabled = function () {
        if (this.oMethod && this.tMethod && this.pMethod) {
            return false;
        }
        else {
            return true;
        }
    };
    CheckoutPage.prototype.updateInfo = function () {
        localStorage.setItem(this.cartStorageString, JSON.stringify(this.cartStorage));
        this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_6__cart__["a" /* CartPage */]);
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-checkout',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\checkout.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<button ion-button menuToggle class="colorWhite">\n\n            <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n        </button>\n\n		<ion-title>Order Detail</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding *ngIf = "restaurants">\n\n\n\n	<ion-row *ngIf = "currentCustomer">\n\n		<ion-item>\n\n			<ion-avatar item-start>\n\n				<img [src]="customerImage(currentCustomer.image)">\n\n			</ion-avatar>\n\n			<h2 text-uppercase>{{currentCustomer.firstname}} {{currentCustomer.lastname}}</h2>\n\n			<p>{{currentCustomer.phonenumber}}</p>\n\n		</ion-item>\n\n	</ion-row>\n\n\n\n	<ion-row class="marginTop10">\n\n		<ion-label class="fontWeight600">Choose Method</ion-label>\n\n		<ion-select [(ngModel)]="orderMethodSelect" submitText="Ok" cancelText="Cancel" (ionChange)="orderMethodFunction()">\n\n			<ion-option *ngIf="restaurants.pickup" value="pickup">Pickup</ion-option>\n\n			<ion-option *ngIf="restaurants.delivery" value="delivery">Delivery</ion-option>\n\n		</ion-select>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf= "del">\n\n		<ion-row class="width100"><ion-label class="fontWeight600">Address : <ion-icon *ngIf = "!enterAddress"  name="create" ios="ios-create" md="md-create" float-right (click)="editAddress()"></ion-icon></ion-label></ion-row>\n\n		<ion-row *ngIf="enterAddress" class="width100">\n\n			<form role="form" [formGroup]="addressForm" (ngSubmit)="saveAddressInfo()" class="width100">\n\n				<!-- <ion-item no-padding> -->\n\n					<!-- <ion-label floating no-margin class="siLabel">Street Name & Number *</ion-label> -->	<!-- Flushing, Queens -->\n\n					<input type="text" class="siText" formControlName="streetName" placeholder="Enter Street Name *">\n\n				<!-- </ion-item> -->\n\n				<!-- <ion-item no-padding> -->\n\n					<!-- <ion-label floating no-margin class="siLabel">Town or City Area *</ion-label> -->	<!-- NY , USA -->\n\n					<input id="pac-input" type="text siText" class="siText" formControlName="city" placeholder="Enter City *">\n\n				<!-- </ion-item> -->\n\n				<!-- <ion-item no-padding> -->\n\n					<!-- <ion-label floating no-margin class="siLabel">Postalcode *</ion-label> -->\n\n					<input type="number" class="siText" formControlName="postcode" placeholder="Enter Postalcode *">	<!-- 11355 -->\n\n				<!-- </ion-item> -->\n\n				<button type="submit" class="width100 orderButton padding3 marginTop5" [disabled]="!addressForm.valid">Save</button>\n\n			</form>\n\n		</ion-row>\n\n		<ion-row *ngIf = "!enterAddress && this.orderMethod.mType == \'Delivery\'" class="width100">\n\n			{{this.orderMethod.streetName}}, {{this.orderMethod.city}}<br>{{this.orderMethod.postcode}}\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n		<ion-label class="fontWeight600">Choose Order Time</ion-label>\n\n		<ion-select [(ngModel)]="orderTimeSelect" submitText="Ok" cancelText="Cancel" (ionChange)="orderTimeFunction()">\n\n			<ion-option value="now">Now</ion-option>\n\n			<ion-option value="later">Later</ion-option>\n\n		</ion-select>\n\n	</ion-row>\n\n	<ion-row *ngIf = "showLater" class="padding010 timeBg">\n\n		<ion-row class="width100">\n\n			<ion-label class="fontWeight600">Date</ion-label>\n\n			<ion-datetime displayFormat="DDDD, DD-MM-YYYY" min="2017" max="2027" id="laterDate1" [(ngModel)]="laterDate" (ionChange)="laterDateFunction()"></ion-datetime>\n\n		</ion-row>\n\n		<ion-row class="width100">\n\n			<ion-label class="fontWeight600">Time</ion-label>\n\n			<ion-datetime displayFormat="hh:mm A" pickerFormat="hh mm A" id="laterTime1" [(ngModel)]="laterTime" (ionChange)="laterTimeFunction()"></ion-datetime>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "orderMethod.mType">\n\n		<ion-label class="fontWeight600">Choose Payment Method</ion-label>\n\n		<ion-select *ngIf = "orderMethod.mType == \'Pickup\'" [(ngModel)]="orderPaymentSelect" submitText="Ok" cancelText="Cancel" (ionChange)="orderPaymentFunction()">\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentpickup.cash" value="cash">Cash</ion-option>\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentpickup.cardpickup" value="cardPickup">Card at Pickup</ion-option>\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentpickup.cardinternet" value="cardInternet">Card via Internet</ion-option>\n\n		</ion-select>\n\n		<ion-select *ngIf = "orderMethod.mType == \'Delivery\'" [(ngModel)]="orderPaymentSelect" submitText="Ok" cancelText="Cancel" (ionChange)="orderPaymentFunction()">\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentdelivery.cash" value="cash">Cash</ion-option>\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentdelivery.cardpickup" value="cardPickup">Card at Pickup</ion-option>\n\n			<ion-option *ngIf = "restaurants.paymentpickup && restaurants.paymentdelivery.cardinternet" value="cardInternet">Card via Internet</ion-option>\n\n		</ion-select>\n\n	</ion-row>\n\n\n\n	<ion-row class="width100 marginTop5">\n\n		<button class="width100 orderButton padding3" [disabled]="checkDisabled()" (click)="updateInfo()">\n\n			<ion-row class="width100">\n\n				<ion-col text-center>\n\n					<ion-icon name="arrow-dropleft-circle" ios="ios-arrow-dropleft-circle" md="md-arrow-dropleft-circle"></ion-icon>   Update\n\n				</ion-col>\n\n			</ion-row>\n\n		</button>\n\n	</ion-row>\n\n\n\n	<div id="gmap" style="display: none;"></div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\checkout.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["f" /* RestaurantsService */],
        __WEBPACK_IMPORTED_MODULE_4__app_service_index__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwaitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_index__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AwaitPage = (function () {
    function AwaitPage(navCtrl, nav, loadingCtrl, navParams, toastCtrl, orderServices) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.orderServices = orderServices;
        this.order = {};
        this.orderMissed = false;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 500);
        /*this.order = navParams.get('order');

        this.getUpdatedOrder(this.order._id);*/
    }
    AwaitPage.prototype.ionViewDidLoad = function () {
    };
    /*private getUpdatedOrder(id){
        var count = 0;
        var loopCount = setInterval(() => {
            count++;
            if(count < 6){
                this.orderServices.getDetail(id).subscribe(data=>{
                    this.order = data.message;
                    if (data.error == false) {
                        if (this.order.status == 'Accepted') {
                            this.loading.dismiss();
                            clearInterval(loopCount);
                            this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                                console.log("data.message");
                                console.log(data.message);
                            })
                        }
                        if (this.order.status == 'Rejected') {
                            this.loading.dismiss();
                            clearInterval(loopCount);
                            this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                                console.log("data.message");
                                console.log(data.message);
                            })
                        }
                    }
                });
            }
            if (count >= 6){
                this.loading.dismiss();
                clearInterval(loopCount);
                var obj = {}
                obj['id'] = this.order._id;
                obj['status'] = 'Missed';
                this.orderMissed = true;
                this.orderServices.getUpdate(obj).subscribe(data=>{
                    if (!data.error) {
                        this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                            console.log("data.message");
                            console.log(data.message);
                        })
                    }
                });
            }
        },30000)
    }*/
    AwaitPage.prototype.goToMenuPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */]);
    };
    return AwaitPage;
}());
AwaitPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-await',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\await.html"*/'\n\n<ion-content padding>\n\n	<ion-row class="orderPlaced">\n\n		<ion-col col-12 text-center class="font40">THANK You <ion-icon name="happy" ios="ios-happy" md="md-happy"></ion-icon></ion-col>\n\n		<ion-col col-12 text-center class="font20">We\'ll notify you via Email shortly</ion-col>\n\n	</ion-row>\n\n	\n\n	<ion-row class="continue font20" (click) = "goToMenuPage()"> Continue... </ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\await.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_index__["d" /* OrderService */]])
], AwaitPage);

//# sourceMappingURL=await.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import {  OrderDetailPage } from './order-detail';
/**
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderDetailPage = (function () {
    function OrderDetailPage(alertCtrl, toastCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.selectedOrder = navParams.get('item');
    }
    OrderDetailPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter MyCustomerPage');
        console.log(this.selectedOrder);
    };
    return OrderDetailPage;
}());
OrderDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-order-detail',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\my-order\order-detail.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <span class="white"># {{selectedOrder._id.substr(18,6)}}</span><br>\n\n        <span class="white">{{selectedOrder.created_at | date:\'medium\' }}\n\n        </span>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order Status\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <h2>{{selectedOrder.status}}</h2>\n\n        </ion-card-content>\n\n    </ion-card>\n\n        \n\n    <ion-card>\n\n        <ion-card-header>\n\n            Customer Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p>\n\n                <ion-icon name="person" ios="ios-person" md="md-person"> Name: {{selectedOrder.customerId.firstname}} {{selectedOrder.customerId.lastname}}</ion-icon>\n\n            </p>\n\n            <p>\n\n                <ion-icon name="call" ios="ios-call" md="md-call"> Phone: {{selectedOrder.customerId.phonenumber}}</ion-icon>\n\n            </p>\n\n            <p>\n\n                <ion-icon name="mail" ios="ios-mail" md="md-mail"> Email: {{selectedOrder.customerId.email}}</ion-icon>\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card *ngIf="selectedOrder.driverId">\n\n        <ion-card-header>\n\n            <ion-list>\n\n                <ion-item style="background: #e7e7e7;">\n\n                    Driver Detail\n\n                    <button  item-end  (click)="assignOrder($event,selectedOrder)">\n\n                        <ion-icon name="create" ios="ios-create" md="md-create"></ion-icon>\n\n                    </button>\n\n                </ion-item>\n\n            </ion-list>\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <h2>{{selectedOrder.driverId.firstname}} {{selectedOrder.driverId.lastname}}</h2>\n\n            <p>{{selectedOrder.driverId.phoneNo}}</p>\n\n            <p>{{selectedOrder.driverId.email}}</p>\n\n            <p>{{selectedOrder.driverId.address}}</p>\n\n            <p>{{selectedOrder.driverId.vehicleType}}</p>\n\n            <p>{{selectedOrder.driverId.vehicleName}} : {{selectedOrder.driverId.vehicleNo}}</p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p *ngIf="selectedOrder.orderMethod">\n\n                <ion-icon name="card" ios="ios-card" md="md-card"> Type: {{selectedOrder.orderMethod.mType}}\n\n                    <span *ngIf="selectedOrder.orderPayment">\n\n                        , <span *ngIf="selectedOrder.orderPayment.cash">Cash</span>\n\n                        <span *ngIf="selectedOrder.orderPayment.cardpickup">Card Pickup</span>\n\n                        <span *ngIf="selectedOrder.orderPayment.cardinternet">Card via Internet</span>\n\n                    </span>\n\n                </ion-icon>\n\n            </p>\n\n            <p *ngIf="selectedOrder.orderTime && selectedOrder.orderTime.tType == \'Now\'">\n\n                <ion-icon name="time">\n\n                Fulfillment date & time : </ion-icon><br>{{selectedOrder.orderTime.time | date : "EEEE, MMMM d, y - h:mm a"}}\n\n            </p>\n\n            <p *ngIf="selectedOrder.orderTime && selectedOrder.orderTime.tType == \'Later\'">\n\n                <ion-icon name="time">\n\n                Fulfillment date & time : </ion-icon><br>{{selectedOrder.orderTime.day}}<br>{{selectedOrder.orderTime.time}}\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Restaurant Detail\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p *ngIf="selectedOrder.restaurantId">\n\n                <ion-icon name="home"> {{selectedOrder.restaurantId.name}}</ion-icon>\n\n                <span *ngIf="selectedOrder.restaurantId">\n\n                    , {{selectedOrder.restaurantId.address}} {{selectedOrder.restaurantId.zipcode}} {{selectedOrder.restaurantId.city}}\n\n                </span>\n\n            </p>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Menu & Item Detail\n\n        </ion-card-header>\n\n        <ion-card-content *ngIf="selectedOrder.orders || selectedOrder.isPromotion">\n\n\n\n            <ion-item *ngFor="let order of selectedOrder.orders" text-left>\n\n                <ion-row *ngIf="order.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{order.quantity}} x </b></span>{{order.item.name}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{order.totalPrice}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.multisize">\n\n                    <ion-col col-6>\n\n                        {{order.multisize.size}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{order.multisize.price}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.addon.length > 0">\n\n                    <ion-item *ngFor="let adn of order.addon">\n\n                        <ion-row>\n\n                            <ion-col col-6>\n\n                                {{adn.name}}\n\n                            </ion-col>\n\n                            <ion-col col-6>\n\n                                <b>{{adn.price}}</b>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </ion-item>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="order.itemInstruction && order.itemInstruction != \'\'">\n\n                    <ion-item>\n\n                        <ion-row >\n\n                            <ion-col col-12>\n\n                                <b>Special Instructions</b>\n\n                            </ion-col>\n\n                            <ion-col col-12>\n\n                                <p class="wrap">{{order.itemInstruction}}</p>\n\n                            </ion-col>\n\n                        </ion-row >\n\n                    </ion-item>\n\n                </ion-row>\n\n\n\n            </ion-item>\n\n\n\n            <hr>\n\n\n\n            <ion-item *ngIf="selectedOrder.promotion">\n\n                <b>Promotion Item</b>\n\n                <ion-row *ngIf="selectedOrder.promotion.itemGroup1 && selectedOrder.promotion.itemGroup1.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{selectedOrder.promotion.itemGroup1.quantity}} x </b></span>{{selectedOrder.promotion.itemGroup1.item.name}}\n\n                    </ion-col>\n\n\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.promotion.itemGroup1.totalPrice}}</b>\n\n                    </ion-col>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.multisize">\n\n                        <ion-col col-6>\n\n                            {{selectedOrder.promotion.itemGroup1.multisize.size}}\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <b>{{selectedOrder.promotion.itemGroup1.multisize.price}}</b>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    \n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.addon.length > 0">\n\n                        <ion-item *ngFor="let adn of selectedOrder.promotion.itemGroup1.addon">\n\n                            <ion-row>\n\n                                <ion-col col-6>\n\n                                    {{adn.name}}\n\n                                </ion-col>\n\n                                <ion-col col-6>\n\n                                    <b>{{adn.price}}</b>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-item>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup1.itemInstruction && selectedOrder.promotion.itemGroup1.itemInstruction != \'\'">\n\n                        <ion-item>\n\n                            <ion-row >\n\n                                <ion-col col-12>\n\n                                    <b>Special Instructions</b>\n\n                                </ion-col>\n\n                                <ion-col col-12>\n\n                                    <p class="wrap">{{selectedOrder.promotion.itemGroup1.itemInstruction}}</p>\n\n                                </ion-col>\n\n                            </ion-row >\n\n                        </ion-item>\n\n                    </ion-row>\n\n                </ion-row>\n\n\n\n                <ion-row *ngIf="selectedOrder.promotion.itemGroup2 && selectedOrder.promotion.itemGroup2.item">\n\n                    <ion-col col-6>\n\n                        <span style="font-size: 14px"> <b>{{selectedOrder.promotion.itemGroup2.quantity}} x </b></span>{{selectedOrder.promotion.itemGroup2.item.name}}\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.promotion.itemGroup2.totalPrice}}</b>\n\n                    </ion-col>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.multisize">\n\n                        <ion-col col-6>\n\n                            {{selectedOrder.promotion.itemGroup2.multisize.size}}\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <b>{{selectedOrder.promotion.itemGroup2.multisize.price}}</b>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.addon.length > 0">\n\n                        <ion-item *ngFor="let adn of selectedOrder.promotion.itemGroup2.addon">\n\n                            <ion-row>\n\n                                <ion-col col-6>\n\n                                    {{adn.name}}\n\n                                </ion-col>\n\n                                <ion-col col-6>\n\n                                    <b>{{adn.price}}</b>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-item>\n\n                    </ion-row>\n\n\n\n                    <ion-row *ngIf="selectedOrder.promotion.itemGroup2.itemInstruction && selectedOrder.promotion.itemGroup2.itemInstruction != \'\'">\n\n                        <ion-item>\n\n                            <ion-row >\n\n                                <ion-col col-12>\n\n                                    <b>Special Instructions</b>\n\n                                </ion-col>\n\n                                <ion-col col-12>\n\n                                    <p class="wrap">{{selectedOrder.promotion.itemGroup2.itemInstruction}}</p>\n\n                                </ion-col>\n\n                            </ion-row >\n\n                        </ion-item>\n\n                    </ion-row>\n\n                </ion-row>\n\n            </ion-item>\n\n            \n\n            <hr>\n\n            \n\n            <ion-item>\n\n                <ion-row>\n\n                    <ion-col col-6>\n\n                        Sub-Total\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.subTotal}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orderMethod && selectedOrder.orderMethod.mType == \'Delivery\'">\n\n                    <ion-col col-6>\n\n                        Delivery Fee\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.deliveryfee}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orders && selectedOrder.orders.length > 0">\n\n                    <ion-col col-6>\n\n                        Tax\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.tax}}%</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row *ngIf="selectedOrder.orders && selectedOrder.orders.length > 0">\n\n                    <ion-col col-6>\n\n                        Total\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <b>{{selectedOrder.gTotal | number : \'1.2-2\'}}</b>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n            \n\n            <hr>\n\n            \n\n            <ion-item *ngIf="selectedOrder.comment">\n\n                <ion-row>\n\n                    <ion-col col-12>\n\n                        <b>Comment</b>\n\n                    </ion-col>\n\n                    <ion-col col-12>\n\n                        <p  class="wrap">{{selectedOrder.comment}}</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-item>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\my-order\order-detail.html"*/,
        styles: [" \n  ion-item{     \n  padding-left: 0px !important ;    \n    } \n    p{\n        margin-bottom: 10px;\n    }\n    .white{\n        color:#fff;\n    }\n    ion-label {\n        margin: 0px !important;\n    }\n    .label-ios {\n        margin: 0px !important;\n    }\n    .label-md {\n        margin: 0px !important;\n    }\n    .wrap{\n        white-space: normal;\n    }\n    "],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["f" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_2__app_service_index__["d" /* OrderService */]])
], OrderDetailPage);

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__item_itemDetail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PromotionDetailPage = (function () {
    function PromotionDetailPage(nav, loadingCtrl, menuCtrl, viewCtrl, toastCtrl, navCtrl, promotionsService, kitchenMenuService, kitchenMenuItemService, navParams, alertCtrl) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.promotionsService = promotionsService;
        this.kitchenMenuService = kitchenMenuService;
        this.kitchenMenuItemService = kitchenMenuItemService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.promo = {};
        this.selectedSegment = 'IG1';
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.menus = [];
        this.items = [];
        this.addOns = [];
        this.itemG1 = [];
        this.itemG2 = [];
        this.promotionItem = {};
        this.itemGroup = [];
        this.promotionItems = {};
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //this.promo = navParams.get('promo')
        this.promo = JSON.parse(localStorage.getItem('promo'));
        this.loadAllPromotions(this.promo['promotionId'][0]);
    }
    PromotionDetailPage.prototype.ionViewDidEnter = function () {
        this.loadAllUsers(this.promo['restaurantId'][0]);
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());
        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth() + 1);
        var year = this.currentDate.getFullYear();
        this.currentTime = h + ':' + m;
        this.completeDate = date + '-' + month + '-' + year;
        this.time = h + ':' + m + ':' + s;
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.day = days[this.currentDate.getDay()];
        this.proId = 'promotion_' + this.promo['restaurantId'][0];
        if (localStorage.getItem(this.proId)) {
            this.promotionItem = JSON.parse(localStorage.getItem(this.proId));
        }
        this.cartSubTotal = 'subTotal_' + this.promo['restaurantId'][0];
        if (localStorage.getItem(this.cartSubTotal)) {
            this.cartTotalAmount = JSON.parse(localStorage.getItem(this.cartSubTotal));
        }
    };
    PromotionDetailPage.prototype.checkDisabled = function () {
        if (this.promo && this.promo.discountOn) {
            if (this.promo.discountOn.length == 1 && typeof this.promotionItem['itemGroup1'] != 'undefined') {
                return false;
            }
            else if (this.promo.discountOn.length == 2 && typeof this.promotionItem['itemGroup1'] != 'undefined' && typeof this.promotionItem['itemGroup2'] != 'undefined') {
                return false;
            }
            else {
                return true;
            }
        }
    };
    PromotionDetailPage.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    PromotionDetailPage.prototype.onSegmentChanged = function (event) {
        this.selectedSegment = event['_value'];
        if (this.selectedSegment == 'IG1') {
            this.itemGroup = this.itemG1;
        }
        if (this.selectedSegment == 'IG2') {
            this.itemGroup = this.itemG2;
        }
    };
    PromotionDetailPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    PromotionDetailPage.prototype.checkMenuItemShow = function (obj) {
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= this.currentTime && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }
                else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }
                else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }
                else {
                    return 'none';
                }
            }
            else {
                return 'none';
            }
        }
        else {
            return 'block';
        }
    };
    PromotionDetailPage.prototype.loadAllUsers = function (id) {
        var _this = this;
        this.menus = [];
        this.kitchenMenuService.getAll(id).subscribe(function (users) {
            if (!users.error) {
                if (users.message.length > 0) {
                    for (var i = 0; i < users.message.length; i++) {
                        if (users.message[i]['isHidden'] == false) {
                            var display = _this.checkMenuItemShow(users.message[i]);
                            if (display == 'block') {
                                _this.menus.push(users.message[i]);
                            }
                        }
                    }
                }
                else {
                    _this.loading.dismiss();
                    _this.getToast('No Menu Availavle Now!');
                }
            }
            else {
                _this.loading.dismiss();
                _this.getToast('Something Went Wrong!');
            }
            _this.loadAllItem(id);
        });
    };
    PromotionDetailPage.prototype.loadAllItem = function (id) {
        var _this = this;
        this.kitchenMenuItemService.getAllItems(id).subscribe(function (users) {
            _this.items = users.message;
            _this.loadAllAddons(id);
        });
    };
    PromotionDetailPage.prototype.loadAllAddons = function (id) {
        var _this = this;
        this.kitchenMenuService.getAllAddOn(id).subscribe(function (data) {
            _this.addOns = data.message;
        });
        this.itemGroup1(this.promo.discountOn[0]);
        if (this.promo.discountOn[1]) {
            this.itemGroup2(this.promo.discountOn[1]);
        }
    };
    PromotionDetailPage.prototype.loadAllPromotions = function (id) {
        var _this = this;
        this.promotionsService.getAll().subscribe(function (pro) {
            _this.index = pro.message.findIndex(function (mn) { return mn._id == id; });
            if (_this.index == 6) {
                if (_this.cartTotalAmount < _this.promo.minCartAmount) {
                    _this.getToast('Cant add this deal now \n Minimum Cart Amount should be ' + _this.promo.minCartAmount);
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
                }
            }
        });
    };
    PromotionDetailPage.prototype.itemGroup1 = function (menuIds) {
        var _this = this;
        var menuObjectsArray = [];
        if (menuIds.itemGroup1) {
            menuIds.itemGroup1.forEach(function (menuObj) {
                var menuObjects = {};
                var x = _this.menus.findIndex(function (mn) { return mn._id == menuObj.id1; });
                if (menuObj.item1.length > 0) {
                    _this.kitchenMenuItemService.promotionsItem(menuObj.item1).subscribe(function (users) {
                        if (x > -1) {
                            menuObjects['menu'] = _this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            _this.itemG1 = menuObjectsArray;
                            _this.itemGroup = _this.itemG1;
                        }
                    });
                }
            });
        }
    };
    PromotionDetailPage.prototype.itemGroup2 = function (menuIds) {
        var _this = this;
        var menuObjectsArray = [];
        var menuObjects = {};
        if (menuIds.itemGroup2) {
            menuIds.itemGroup2.forEach(function (menuObj) {
                var menuObjects = {};
                var x = _this.menus.findIndex(function (mn) { return mn._id == menuObj.id2; });
                if (menuObj.item2.length > 0) {
                    _this.kitchenMenuItemService.promotionsItem(menuObj.item2).subscribe(function (users) {
                        if (x > -1) {
                            menuObjects['menu'] = _this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            _this.itemG2 = menuObjectsArray;
                        }
                    });
                }
            });
        }
    };
    PromotionDetailPage.prototype.showItems = function (itemgrp) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle(itemgrp['menu']['name']);
        if (itemgrp.items) {
            for (var i = 0; i < itemgrp.items.length; i++) {
                alert.addInput({
                    type: 'radio',
                    label: '$' + itemgrp.items[i].price + ' - ' + itemgrp.items[i].name,
                    value: itemgrp.items[i],
                });
            }
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                if (data != 'undefined') {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__item_itemDetail__["a" /* ItemDetailPage */], {
                        item: data, type: 'promotionItem', iG: _this.selectedSegment
                    });
                }
            }
        });
        alert.present();
    };
    PromotionDetailPage.prototype.addDeal = function () {
        var discountOn = this.promo.discountOn;
        this.promotionItem['promotion'] = this.promo;
        if (typeof discountOn[1] == 'undefined') {
            var discountedPrice = ((100 - this.promo['discountPercent']) / 100) * this.promotionItem['itemGroup1']['totalPrice'];
            this.promotionItem['itemGroup1']['totalPrice'] = discountedPrice;
            this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'];
        }
        if (typeof discountOn[1] != 'undefined') {
            if (this.promotionItem['itemGroup1']['totalPrice'] <= this.promotionItem['itemGroup2']['totalPrice']) {
                var discountedPrice = ((100 - this.promo.discountPercent) / 100) * this.promotionItem['itemGroup1']['totalPrice'];
                this.promotionItem['itemGroup1']['totalPrice'] = discountedPrice;
                this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'] + this.promotionItem['itemGroup2']['totalPrice'];
            }
            else {
                var discountedPrice = ((100 - this.promo.discountPercent) / 100) * this.promotionItem['itemGroup2']['totalPrice'];
                this.promotionItem['itemGroup2']['totalPrice'] = discountedPrice;
                this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'] + this.promotionItem['itemGroup2']['totalPrice'];
            }
        }
        console.log("this.promotionItem");
        console.log(this.promotionItem);
        localStorage.setItem(this.proId, JSON.stringify(this.promotionItem));
        localStorage.removeItem('promo');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
    };
    return PromotionDetailPage;
}());
PromotionDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-promotion',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\promotion\promotiondetail.html"*/'<ion-header>\n\n	<ion-navbar>\n\n        <button ion-button menuToggle class="colorWhite">\n\n            <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Deal</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="card-background-page" *ngIf = "itemGroup || promo">\n\n    <!-- <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher> -->\n\n\n\n    <ion-list [ngStyle]="{\'background-image\': \'url(\' + imageURL + promo.image + \')\'}">\n\n        <div class="card-title positionAbsolute fontWeight500">{{promo.promoname}}</div>\n\n        <div class="card-description positionAbsolute">{{promo.description}}</div>\n\n    </ion-list>\n\n\n\n    <ion-segment [(ngModel)]="selectedSegment" (ionChange)="onSegmentChanged($event)">\n\n        <ion-segment-button value="IG1">\n\n            Item Group 1\n\n        </ion-segment-button>\n\n        <ion-segment-button *ngIf="promo && promo.discountOn && promo.discountOn.length == 2 " value="IG2">\n\n            Item Group 2\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n\n\n    <ion-list *ngFor = "let ig of itemGroup" (click) = "showItems(ig)">\n\n        <div  *ngIf = "ig.menu" class="card-title positionAbsolute fontWeight500">{{ig.menu.name}}</div>\n\n    </ion-list>\n\n\n\n\n\n    <ion-row class="padding0px15px margin20-3">\n\n        <button class="width100 orderButton padding3" [disabled]="checkDisabled()" (click)="addDeal()">\n\n            <ion-row class="width100">\n\n                <ion-col col-12 text-center>\n\n                    <ion-icon name="cart" ios="ios-cart" md="md-cart"></ion-icon> &nbsp;&nbsp; Add Deal\n\n                </ion-col>\n\n            </ion-row>\n\n        </button>\n\n    </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\promotion\promotiondetail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* PromotionsService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* KitchenMenuService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["b" /* KitchenItemService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PromotionDetailPage);

//# sourceMappingURL=promotiondetail.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile__ = __webpack_require__(106);
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
            this.resetForm.controls['_id'].setValue(this.currentCustomer['_id']);
        }
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
    };
    ChangePasswordPage.prototype.changePass = function () {
        var _this = this;
        this.customerService.changePassword(this.resetForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getToast(data.message);
                _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust) {
                    localStorage.removeItem('currentCustomer');
                    localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
                    _this.navCtrl.pop(__WEBPACK_IMPORTED_MODULE_4__profile__["a" /* ProfilePage */]);
                });
            }
            else {
                _this.getToast(data.message);
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
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-password',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\changepassword.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Change Password</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form role="form" [formGroup]="resetForm" (ngSubmit)="changePass()">\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="oldpassword" placeholder="Old Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<ion-item class="bottomRadius">\n\n			<ion-label> <ion-icon name="lock" ios="ios-lock" md="md-lock"></ion-icon> </ion-label>\n\n			<ion-input formControlName="newpassword" placeholder="New Password" type="password"></ion-input>\n\n		</ion-item>\n\n		<button ion-button full color="secondary" [disabled]="!resetForm.valid">Change Password</button>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\changepassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */]])
], ChangePasswordPage);

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile__ = __webpack_require__(106);
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
        this.profileForm = this.lf.group({
            _id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phonenumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.profileForm.patchValue(this.currentCustomer);
    }
    ProfileUpdatePage.prototype.ionViewDidLoad = function () { };
    ProfileUpdatePage.prototype.update = function () {
        var _this = this;
        this.customerService.updateCustomer(this.profileForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.getToast("Profile Updated");
                _this.customerService.getOneCustomer(_this.currentCustomer['_id']).subscribe(function (cust) {
                    localStorage.removeItem('currentCustomer');
                    localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__profile__["a" /* ProfilePage */]);
                });
            }
        });
    };
    ProfileUpdatePage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    return ProfileUpdatePage;
}());
ProfileUpdatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile-update',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\profileupdate.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>profile</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <form role="form" [formGroup]="profileForm" (ngSubmit)="update()">\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="mail" ios="ios-mail" md="md-mail"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="email" type="text" disabled="true" placeholder="Email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="username" type="text" disabled="true" placeholder="Username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="firstname" type="text" placeholder="First Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="person" ios="ios-person" md="md-person"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="lastname" type="text" placeholder="Last Name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>\n\n                    <ion-icon name="call" ios="ios-call" md="md-call"></ion-icon>\n\n                </ion-label>\n\n                <ion-input formControlName="phonenumber" type="text" placeholder="Phone no."></ion-input>\n\n            </ion-item>\n\n\n\n            <button ion-button full color="secondary" [disabled]="!profileForm.valid">Submit</button>\n\n        </form>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\profileupdate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_customer_service__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ProfileUpdatePage);

//# sourceMappingURL=profileupdate.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__item_itemDetail__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WishlistPage = (function () {
    function WishlistPage(navCtrl, customerService, navParams) {
        this.navCtrl = navCtrl;
        this.customerService = customerService;
        this.navParams = navParams;
        this.items = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
    }
    WishlistPage.prototype.ionViewDidEnter = function () {
        this.getCustomer();
    };
    WishlistPage.prototype.getCustomer = function () {
        var _this = this;
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.customerService.getOneCustomerWishlist(tempCurrentCustomer['_id']).subscribe(function (cust) {
            _this.items = cust.message.wishlist;
        });
    };
    WishlistPage.prototype.itemImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    };
    WishlistPage.prototype.tapEvent = function ($event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__item_itemDetail__["a" /* ItemDetailPage */], {
            item: item, type: 'cartItem', iG: null
        });
    };
    return WishlistPage;
}());
WishlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-wishlist',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\wishlist.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<button ion-button menuToggle class="colorWhite">\n\n            <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n        </button>\n\n		<ion-title>WishList</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n	<ion-card *ngFor = "let item of items" class="width100">\n\n		<ion-row class="itemDetail" *ngIf="item">\n\n			<ion-col col-4 class="itemImage" (tap)="tapEvent($event,item)"><img [src]="itemImage(item.image)"/></ion-col>\n\n			<ion-col col-7 (tap)="tapEvent($event,item)">\n\n				<ion-row text-uppercase class="itemName">\n\n					{{item.name}}\n\n				</ion-row>\n\n				<ion-row class="itemPrice fontWeight600 colorGreen">\n\n					${{item.price}}\n\n				</ion-row>\n\n			</ion-col>\n\n			<ion-col col-1>\n\n				<ion-icon  float-right name="heart" ios="ios-heart" md="md-heart" [ngStyle]="{\'color\':\'red\'}"></ion-icon>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\profile\wishlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], WishlistPage);

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(504);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
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
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.getOneCustomer = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/' + id)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getLatLng = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/add-lat-lng', data)
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
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/register', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.updateCustomer = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/update/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/forget-pass', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    CustomersService.prototype.addOrder = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/add', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.orderPlaced = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/order-placed', data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.changePassword = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    CustomersService.prototype.getOneCustomerWishlist = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'customer/wishlist/' + id)
            .map(function (response) { return response.json(); });
    };
    return CustomersService;
}());
CustomersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], CustomersService);

//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_register__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_promotion_promotion__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_promotion_promotiondetail__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_my_order_my_order__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_my_order_order_detail__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_profile_profile__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_profile_profileupdate__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_changepassword__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_profile_wishlist__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_menu_menu__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_item_item__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_item_itemDetail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_item_iconText__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_restroinfo_restroinfo__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_cart_cart__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_cart_checkout__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_cart_await__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__service_index__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























/*Services*/

var cloudSettings = {
    'core': {
        'app_id': '6a60f968'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_promotion_promotion__["a" /* PromotionPage */], __WEBPACK_IMPORTED_MODULE_13__pages_promotion_promotiondetail__["a" /* PromotionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_11__pages_login_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_17__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_18__pages_profile_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_19__pages_profile_wishlist__["a" /* WishlistPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_item_item__["a" /* ItemPage */], __WEBPACK_IMPORTED_MODULE_22__pages_item_itemDetail__["a" /* ItemDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_item_iconText__["a" /* IconTextPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_restroinfo_restroinfo__["a" /* RestroinfoPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_cart_cart__["a" /* CartPage */], __WEBPACK_IMPORTED_MODULE_26__pages_cart_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_27__pages_cart_await__["a" /* AwaitPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_my_order_my_order__["a" /* MyOrderPage */], __WEBPACK_IMPORTED_MODULE_15__pages_my_order_order_detail__["a" /* OrderDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/restroinfo/restroinfo.module#RestroinfoPageModule', name: 'RestroinfoPage', segment: 'restroinfo', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5__ionic_cloud_angular__["a" /* CloudModule */].forRoot(cloudSettings),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_promotion_promotion__["a" /* PromotionPage */], __WEBPACK_IMPORTED_MODULE_13__pages_promotion_promotiondetail__["a" /* PromotionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_10__pages_login_forgetpassword__["a" /* ForgetPasswordPage */], __WEBPACK_IMPORTED_MODULE_11__pages_login_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_profile_profile__["a" /* ProfilePage */], __WEBPACK_IMPORTED_MODULE_17__pages_profile_profileupdate__["a" /* ProfileUpdatePage */], __WEBPACK_IMPORTED_MODULE_18__pages_profile_changepassword__["a" /* ChangePasswordPage */], __WEBPACK_IMPORTED_MODULE_19__pages_profile_wishlist__["a" /* WishlistPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_item_item__["a" /* ItemPage */], __WEBPACK_IMPORTED_MODULE_22__pages_item_itemDetail__["a" /* ItemDetailPage */], __WEBPACK_IMPORTED_MODULE_23__pages_item_iconText__["a" /* IconTextPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_restroinfo_restroinfo__["a" /* RestroinfoPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_cart_cart__["a" /* CartPage */], __WEBPACK_IMPORTED_MODULE_26__pages_cart_checkout__["a" /* CheckoutPage */], __WEBPACK_IMPORTED_MODULE_27__pages_cart_await__["a" /* AwaitPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_my_order_my_order__["a" /* MyOrderPage */], __WEBPACK_IMPORTED_MODULE_15__pages_my_order_order_detail__["a" /* OrderDetailPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_28__service_index__["a" /* CustomersService */], __WEBPACK_IMPORTED_MODULE_28__service_index__["c" /* KitchenMenuService */], __WEBPACK_IMPORTED_MODULE_28__service_index__["b" /* KitchenItemService */], __WEBPACK_IMPORTED_MODULE_28__service_index__["f" /* RestaurantsService */], __WEBPACK_IMPORTED_MODULE_28__service_index__["e" /* PromotionsService */], __WEBPACK_IMPORTED_MODULE_28__service_index__["d" /* OrderService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__item_item__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__restroinfo_restroinfo__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_order_my_order__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MenuPage = (function () {
    function MenuPage(nav, loadingCtrl, menuCtrl, viewCtrl, toastCtrl, navCtrl, alertCtrl, kitchenMenuService, restaurantsService, promotionsService, navParams) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.kitchenMenuService = kitchenMenuService;
        this.restaurantsService = restaurantsService;
        this.promotionsService = promotionsService;
        this.navParams = navParams;
        this.menus = [];
        this.tempCart = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());
        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth() + 1);
        var year = this.currentDate.getFullYear();
        this.currentTime = h + ':' + m;
        this.completeDate = date + '-' + month + '-' + year;
        this.time = h + ':' + m + ':' + s;
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.day = days[this.currentDate.getDay()];
        this.loading.present();
        this.loadRestaurant('595172e2421a472120e0db5e');
    };
    MenuPage.prototype.ionViewDidEnter = function () {
        if (localStorage.getItem('currentCustomer')) {
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        }
    };
    MenuPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.loadAllMenu(_this.restaurants._id);
            refresher.complete();
        }, 2000);
    };
    MenuPage.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    MenuPage.prototype.loadRestaurant = function (id) {
        var _this = this;
        this.restaurantsService.getOne(id).subscribe(function (users) {
            _this.restaurants = users.message;
            localStorage.setItem('restaurant', JSON.stringify(_this.restaurants));
            _this.cart = 'cart_' + id;
            _this.loadAllMenu(id);
        });
    };
    MenuPage.prototype.checkMenuItemShow = function (obj) {
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= this.currentTime && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }
                else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }
                else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }
                else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }
                else {
                    return 'none';
                }
            }
            else {
                return 'none';
            }
        }
        else {
            return 'block';
        }
    };
    MenuPage.prototype.loadAllMenu = function (id) {
        var _this = this;
        this.menus = [];
        this.kitchenMenuService.getAll(id).subscribe(function (users) {
            if (!users.error) {
                if (users.message.length > 0) {
                    _this.loading.dismiss();
                    for (var i = 0; i < users.message.length; i++) {
                        if (users.message[i]['isHidden'] == false) {
                            var display = _this.checkMenuItemShow(users.message[i]);
                            if (display == 'block') {
                                _this.menus.push(users.message[i]);
                            }
                        }
                    }
                }
                else {
                    _this.loading.dismiss();
                    _this.getToast('No Menu Availavle Now!');
                }
            }
            else {
                _this.loading.dismiss();
                _this.getToast('Something Went Wrong!');
            }
        });
        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }
        else {
            localStorage.setItem(this.cart, '[]');
        }
    };
    MenuPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    MenuPage.prototype.menuImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/menu.jpg";
        }
        return imgPath;
    };
    MenuPage.prototype.showItems = function (menu) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__item_item__["a" /* ItemPage */], {
            menu: menu
        });
    };
    MenuPage.prototype.restroInfo = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__restroinfo_restroinfo__["a" /* RestroinfoPage */]);
    };
    /*private goToCart(){
        this.nav.setRoot(CartPage, {id : this.restaurants._id});
    }*/
    MenuPage.prototype.goToCart = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
    };
    MenuPage.prototype.goToMyOrder = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__my_order_my_order__["a" /* MyOrderPage */]);
    };
    MenuPage.prototype.logout = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure ?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: function (data) {
                        var loading = _this.loadingCtrl.create({
                            content: 'Please Wait...'
                        });
                        loading.present();
                        localStorage.removeItem('currentCustomer');
                        delete _this.currentCustomer;
                        location.reload();
                        setTimeout(function () {
                            loading.dismiss();
                        }, 500);
                    }
                }
            ]
        });
        prompt.present();
    };
    MenuPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */]);
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\menu\menu.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle class="colorWhite">\n\n            <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n        </button>\n\n        <ion-title *ngIf = "restaurants">{{restaurants.name}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content  *ngIf = "menus" class="card-background-page">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-fab right bottom>\n\n        <button ion-fab><ion-icon name="arrow-dropup"></ion-icon></button>\n\n        <ion-fab-list side="top">\n\n            <button ion-fab (click)="goToCart()"><ion-icon name="cart" ios="ios-cart" md="md-cart"></ion-icon><span class="numberClass">{{tempCart.length}}</span></button>\n\n            <button *ngIf = "currentCustomer" ion-fab (click)="goToMyOrder()"><ion-icon name="book" ios="ios-book" md="md-book"></ion-icon></button>\n\n            <button *ngIf = "currentCustomer" ion-fab (click)="logout()"><ion-icon name="log-out" ios="ios-log-out" md="md-log-out"></ion-icon></button>\n\n            <button *ngIf = "!currentCustomer" ion-fab (click)="login()"><ion-icon name="log-in" ios="ios-log-in" md="md-log-in"></ion-icon></button>\n\n        </ion-fab-list>\n\n  </ion-fab>\n\n\n\n    <ion-row>\n\n        <ion-col col-12 *ngFor = "let menu of menus" (click)="showItems(menu)" [ngStyle]="{\'background-image\': \'url(\' + menuImage(menu.image) + \')\'}">\n\n            <div class="card-title positionAbsolute fontWeight500">{{menu.name}}</div>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\menu\menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["c" /* KitchenMenuService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["f" /* RestaurantsService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* PromotionsService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MenuPage);

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_global__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__checkout__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__await__ = __webpack_require__(493);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CartPage = (function () {
    function CartPage(navCtrl, navParams, nav, loadingCtrl, menuCtrl, viewCtrl, toastCtrl, restaurantsService, promotionsService, customerService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.restaurantsService = restaurantsService;
        this.promotionsService = promotionsService;
        this.customerService = customerService;
        this.alertCtrl = alertCtrl;
        this.cart = [];
        this.cartString = String;
        this.promotionString = String;
        this.cartStorageString = String;
        this.coupon = String;
        this.appliedCode = String;
        this.resId = String;
        this.subTotal = 0;
        this.cartTotal = 0;
        this.deliveryfee = 0;
        this.totalWithTax = 0;
        this.restaurants = {};
        this.cartStorage = {};
        this.allPromotions = [];
        this.restroPromotions = [];
        this.imageURL = __WEBPACK_IMPORTED_MODULE_3__app_global__["a" /* imageUrl */];
        this.noCode = true;
        this.typeCode = false;
        this.haveCode = false;
        this.resId = '595172e2421a472120e0db5e';
    }
    CartPage.prototype.ionViewDidEnter = function () {
        this.currentDateTime();
        this.getRestaurants(this.resId);
        this.cartString = 'cart_' + this.resId;
        this.cartStorageString = 'cartStorage_' + this.resId;
        this.promotionString = 'promotion_' + this.resId;
        this.coupon = 'coupon_' + this.resId;
        if (localStorage.getItem(this.cartString)) {
            this.cart = JSON.parse(localStorage.getItem(this.cartString));
        }
        if (localStorage.getItem(this.promotionString)) {
            this.promotion = JSON.parse(localStorage.getItem(this.promotionString));
        }
        if (localStorage.getItem('subTotal_595172e2421a472120e0db5e')) {
            this.cartTotal = JSON.parse(localStorage.getItem('subTotal_595172e2421a472120e0db5e'));
        }
        if (localStorage.getItem(this.cartStorageString)) {
            this.cartStorage = JSON.parse(localStorage.getItem(this.cartStorageString));
            if (this.cartStorage['deliveryfee']) {
                this.deliveryfee = this.cartStorage['deliveryfee'];
            }
            console.log("this.deliveryfee");
            console.log(this.deliveryfee);
            if (this.cartStorage['customerId']) {
                this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            }
        }
        this.loadAllPromotions();
    };
    CartPage.prototype.currentDateTime = function () {
        this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());
        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth() + 1);
        var year = this.currentDate.getFullYear();
        this.currentTime = h + ':' + m;
        this.completeDate = date + '-' + month + '-' + year;
        this.time = h + ':' + m + ':' + s;
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.day = days[this.currentDate.getDay()];
    };
    CartPage.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    CartPage.prototype.checkDisablePlaceOrderBtn = function () {
        if (this.cart.length == 0 && typeof this.promotion == 'undefined' && this.cartStorage && typeof this.cartStorage['orderPayment'] == 'undefined') {
            return true;
        }
        else {
            return false;
        }
    };
    CartPage.prototype.loadAllPromotions = function () {
        var _this = this;
        this.promotionsService.getAll().subscribe(function (pro) {
            _this.allPromotions = pro.message;
            console.log("this.allPromotions");
            console.log(_this.allPromotions);
            if (_this.promotion) {
                if (_this.promotion.promotion && _this.promotion.promotion['promotionId']) {
                    _this.index = _this.allPromotions.findIndex(function (mn) { return mn._id == _this.promotion.promotion['promotionId'][0]; });
                }
            }
        });
    };
    CartPage.prototype.getRestaurants = function (id) {
        var _this = this;
        this.restaurantsService.getOne(id).subscribe(function (users) {
            _this.restaurants = users.message;
            _this.loadAllRestroPromotions(id);
            _this.calculateTotal();
        });
    };
    CartPage.prototype.loadAllRestroPromotions = function (id) {
        var _this = this;
        this.promotionsService.getRestroPromotions(id).subscribe(function (data) {
            for (var i = 0; i < data.message.length; i++) {
                if (data.message[i].status == true) {
                    var returnValue = _this.displayPromotion(data.message[i]);
                    if (returnValue == 'block') {
                        _this.restroPromotions.push(data.message[i]);
                    }
                }
            }
            if (localStorage.getItem(_this.coupon)) {
                _this.noCode = false;
                _this.haveCode = true;
                _this.appliedCode = JSON.parse(localStorage.getItem(_this.coupon));
                _this.applyCouponCodeonLoad();
            }
        });
    };
    CartPage.prototype.displayPromotion = function (promo) {
        if ((this.completeDate >= promo.discountTiming[0].available.from && this.completeDate <= promo.discountTiming[0].available.till) || promo.discountTiming[0].available == 'unlimited') {
            for (var i in promo.discountTiming[0].days) {
                if (this.day == i) {
                    var ch = i + 'time';
                    if (typeof promo.discountTiming[0].days[ch] != 'undefined') {
                        if (promo.discountTiming[0].days[ch]['opentime'] <= this.currentTime && promo.discountTiming[0].days[ch]['closetime'] >= this.currentTime) {
                            return 'block';
                        }
                    }
                    if (typeof promo.discountTiming[0].days[ch] == 'undefined') {
                        return 'block';
                    }
                }
            }
        }
        else {
            return 'none';
        }
    };
    CartPage.prototype.getToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top' //top,middle,bottom
        });
        toast.present();
    };
    CartPage.prototype.itemImage = function (img) {
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    };
    CartPage.prototype.decreaseQuantity = function (i) {
        var _this = this;
        var singleItemPrice = this.cart[i].totalPrice / this.cart[i].quantity;
        var tempCartPrice = this.cartTotal - singleItemPrice;
        console.log("tempCartPrice");
        console.log(tempCartPrice);
        if (this.promotion) {
            if (this.index == 6) {
                if (tempCartPrice >= this.promotion['promotion']['minCartAmount']) {
                    this.decrease(i, singleItemPrice);
                }
                else {
                    var alert_1 = this.alertCtrl.create({
                        title: 'Alert!',
                        message: 'Decreasing Quantity will remove ur deal!',
                        buttons: [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: 'Confirm',
                                handler: function () {
                                    delete _this.promotion;
                                    delete _this.cartStorage['promotion'];
                                    localStorage.removeItem(_this.promotionString);
                                    _this.decrease(i, singleItemPrice);
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
            }
            else {
                this.decrease(i, singleItemPrice);
            }
        }
        if (typeof this.cartStorage['promotion'] != 'undefined' && typeof this.appliedCode != 'undefined' && typeof this.promotion == 'undefined') {
            var alert_2 = this.alertCtrl.create({
                title: 'Alert!',
                message: 'Decreasing Quantity will remove ur deal!',
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: 'Confirm',
                        handler: function () {
                            _this.removeCode();
                            _this.decrease(i, singleItemPrice);
                        }
                    }
                ]
            });
            alert_2.present();
        }
        if (typeof this.cartStorage['promotion'] == 'undefined' && typeof this.promotion == 'undefined' && typeof this.appliedCode == 'undefined') {
            this.decrease(i, singleItemPrice);
        }
    };
    CartPage.prototype.decrease = function (i, singleItemPrice) {
        if (this.cart[i].quantity > 1) {
            this.cart[i].quantity = this.cart[i].quantity - 1;
            this.cart[i].totalPrice = singleItemPrice * this.cart[i].quantity;
            localStorage.setItem(this.cartString, JSON.stringify(this.cart));
            this.calculateTotal();
        }
        else {
            this.getToast('Already Minimum quantity to buy this item');
        }
    };
    CartPage.prototype.increaseQuantity = function (i) {
        var singleItemPrice = this.cart[i].totalPrice / this.cart[i].quantity;
        if (this.cart[i].quantity < 10) {
            this.cart[i].quantity = this.cart[i].quantity + 1;
            this.cart[i].totalPrice = singleItemPrice * this.cart[i].quantity;
            localStorage.setItem(this.cartString, JSON.stringify(this.cart));
            this.calculateTotal();
        }
        else {
            this.getToast('Maximum quantity to buy this item');
        }
        if (this.cartStorage['promotion'] && typeof this.appliedCode != 'undefined') {
            this.removeCode();
        }
    };
    CartPage.prototype.deleteItem = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Item!',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.cart.splice(index, 1);
                        localStorage.setItem(_this.cartString, JSON.stringify(_this.cart));
                        _this.calculateTotal();
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.deletePromotion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Deal!',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    handler: function () {
                        delete _this.promotion;
                        delete _this.cartStorage['promotion'];
                        localStorage.removeItem(_this.promotionString);
                        _this.calculateTotal();
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.calculateTotal = function () {
        this.cartTotal = 0;
        if (this.promotion) {
            this.cartStorage['promotion'] = this.promotion;
            this.subTotal = this.promotion.total;
        }
        else {
            this.subTotal = 0;
        }
        for (var i = 0; i < this.cart.length; i++) {
            this.subTotal = this.subTotal + this.cart[i].totalPrice;
            this.cartTotal = this.cartTotal + this.cart[i].totalPrice;
            localStorage.setItem('subTotal_595172e2421a472120e0db5e', JSON.stringify(this.cartTotal));
        }
        this.cartStorage['orders'] = this.cart;
        this.cartStorage['subTotal'] = this.subTotal;
        if (typeof this.discountAmount != 'undefined') {
            this.cartStorage['discountAmount'] = this.discountAmount;
        }
        this.cartStorage['restaurantId'] = this.resId;
        if (typeof this.restaurants.taxation != 'undefined') {
            var tax = parseInt(this.restaurants.taxation.taxpercent);
            if (typeof this.cartTotalAfterDiscount != 'undefined') {
                this.cartStorage['tax'] = (tax / 100) * this.cartTotalAfterDiscount;
                this.totalWithTax = ((tax + 100) / 100) * this.cartTotalAfterDiscount + this.deliveryfee;
                this.cartStorage['gTotal'] = this.totalWithTax;
            }
            else {
                this.cartStorage['tax'] = (tax / 100) * this.subTotal;
                this.totalWithTax = ((tax + 100) / 100) * this.subTotal + this.deliveryfee;
                this.cartStorage['gTotal'] = this.totalWithTax;
            }
        }
        else {
            this.cartStorage['tax'] = 0;
            if (typeof this.cartTotalAfterDiscount != 'undefined') {
                this.totalWithTax = this.cartTotalAfterDiscount + this.deliveryfee;
                this.cartStorage['gTotal'] = this.totalWithTax;
            }
            else {
                this.totalWithTax = this.subTotal + this.deliveryfee;
                this.cartStorage['gTotal'] = this.totalWithTax;
            }
        }
        console.log("this.cartStorage");
        console.log(this.cartStorage);
    };
    CartPage.prototype.showField = function () {
        this.noCode = false;
        this.typeCode = true;
    };
    CartPage.prototype.applyCode = function () {
        var _this = this;
        var index = this.restroPromotions.findIndex(function (mn) { return mn.couponcode && mn.couponcode.code == _this.appliedCode; });
        if (index > -1) {
            this.performCodeCalculation(index);
        }
        else {
            this.getToast('Invalid Coupon Code');
        }
    };
    CartPage.prototype.performCodeCalculation = function (index) {
        var _this = this;
        this.minCartAmount = this.restroPromotions[index].minCartAmount;
        if (this.cartStorage['subTotal'] >= this.minCartAmount) {
            this.typeCode = false;
            this.haveCode = true;
            localStorage.setItem(this.coupon, JSON.stringify(this.appliedCode));
            /*this.promotion = this.restroPromotions[index]*/
            this.cartStorage['promotion'] = { 'promotion': this.restroPromotions[index] };
            var promoIndex = this.allPromotions.findIndex(function (abc) { return abc._id == _this.restroPromotions[index].promotionId[0]; });
            if (promoIndex == 4) {
                if (typeof this.deliveryfee != 'undefined') {
                    this.discountAmount = ((this.restroPromotions[index].discountPercent) / 100) * this.deliveryfee;
                }
                else {
                    delete this.appliedCode;
                    this.getToast('Code Applicable on Delivery charges');
                }
            }
            else if (promoIndex == 2) {
                this.discountAmount = this.restroPromotions[index].discountAmount;
                console.log("this.discountAmount");
                console.log(this.discountAmount);
                this.cartTotalAfterDiscount = this.cartStorage['subTotal'] - this.discountAmount;
                this.calculateTotal();
            }
            else {
                this.discountAmount = (this.restroPromotions[index].discountPercent / 100) * this.cartStorage['subTotal'];
                console.log("this.discountAmount");
                console.log(this.discountAmount);
                this.cartTotalAfterDiscount = this.cartStorage['subTotal'] - this.discountAmount;
                this.calculateTotal();
            }
        }
        else {
            delete this.appliedCode;
            this.getToast('To apply this coupon, Min order amount should be ' + this.minCartAmount);
        }
    };
    CartPage.prototype.applyCouponCodeonLoad = function () {
        var _this = this;
        var index = this.restroPromotions.findIndex(function (mn) { return mn.couponcode.code == _this.appliedCode; });
        if (index > -1) {
            this.cartStorage['promotion'] = { 'promotion': this.restroPromotions[index] };
            var promoIndex = this.allPromotions.findIndex(function (abc) { return abc._id == _this.restroPromotions[index].promotionId[0]; });
            if (promoIndex == 4) {
                if (typeof this.deliveryfee != 'undefined') {
                    this.discountAmount = (this.restroPromotions[index].discountPercent / 100) * this.deliveryfee;
                    this.deliveryfee = this.deliveryfee - this.discountAmount;
                    this.cartStorage['deliveryfee'] = this.deliveryfee;
                }
            }
            else if (promoIndex == 2) {
                this.discountAmount = this.restroPromotions[index].discountAmount;
                this.cartTotalAfterDiscount = this.cartStorage.subTotal - this.discountAmount;
                this.calculateTotal();
            }
            else {
                this.discountAmount = (this.restroPromotions[index].discountPercent / 100) * this.cartStorage.subTotal;
                this.cartTotalAfterDiscount = this.cartStorage.subTotal - this.discountAmount;
                this.calculateTotal();
            }
        }
    };
    CartPage.prototype.removeCode = function () {
        this.noCode = true;
        this.typeCode = false;
        this.haveCode = false;
        delete this.appliedCode;
        delete this.cartStorage['promotion'];
        delete this.cartStorage['discountAmount'];
        delete this.cartTotalAfterDiscount;
        delete this.discountAmount;
        localStorage.removeItem(this.coupon);
        this.calculateTotal();
    };
    CartPage.prototype.countCharacter = function (event) {
        this.appliedCode = event.target.value;
        console.log(this.appliedCode);
    };
    CartPage.prototype.comment = function (event) {
        this.cartStorage['comment'] = event.target.value;
    };
    CartPage.prototype.addDetail = function () {
        localStorage.setItem(this.cartStorageString, JSON.stringify(this.cartStorage));
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__checkout__["a" /* CheckoutPage */]);
    };
    CartPage.prototype.placeOrder = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.cartStorage['status'] = 'Received';
        if (this.cartStorage['promotion']) {
            this.cartStorage['isPromotion'] = true;
        }
        else {
            this.cartStorage['isPromotion'] = false;
        }
        if (this.cartStorage['orderPayment']['cardinternet']) {
            console.log("this.cartStorage");
            console.log(this.cartStorage);
        }
        else {
            this.customerService.addOrder(this.cartStorage).subscribe(function (data) {
                if (data.error == false) {
                    localStorage.removeItem('cart_595172e2421a472120e0db5e');
                    localStorage.removeItem('cartStorage_595172e2421a472120e0db5e');
                    localStorage.removeItem('subTotal_595172e2421a472120e0db5e');
                    localStorage.removeItem('promotion_595172e2421a472120e0db5e');
                    localStorage.removeItem('coupon_595172e2421a472120e0db5e');
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__await__["a" /* AwaitPage */]);
                    loading.dismiss();
                }
            });
        }
    };
    return CartPage;
}());
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cart',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\cart.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle class="colorWhite">\n\n            <ion-icon name="menu" ios="ios-menu" md="md-menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Cart</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="cartPage">\n\n	\n\n	<ion-row *ngIf = " cart && cart.length == 0 && promotion == undefined" class="cartDiv">\n\n		<ion-card-header text-center class="width100">\n\n			No Item!\n\n		</ion-card-header>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "cart && cart.length > 0">\n\n		<ion-card *ngFor = "let crt of cart; let i= index; " class="width100 padding3 marginBottom4" no-margin>\n\n			<ion-card-header *ngIf = "crt.item" no-padding>\n\n				<ion-row>\n\n					<ion-col col-4><img [src]="itemImage(crt.item.image)" class="card-img" /></ion-col>\n\n					<ion-col col-8>\n\n						<ion-row>\n\n							<ion-col no-padding>{{crt.item.name}}<ion-icon float-right name="trash" ios="ios-trash" md="md-trash" class="delItem" (click)="deleteItem(i)"></ion-icon></ion-col>\n\n						</ion-row>\n\n						<ion-row>\n\n							<ion-col col-4 class="fontWeight600 cartItemPrice">${{crt.totalPrice}}</ion-col>\n\n						</ion-row>\n\n					</ion-col>\n\n				</ion-row>\n\n			</ion-card-header>\n\n\n\n			<ion-card-content no-padding>\n\n				<ion-row *ngIf="crt.multisize" class="width100">\n\n					<ion-col col-4 class="fontWeight600">Size : </ion-col>\n\n					<ion-col col-4>{{crt.multisize.size}} </ion-col>\n\n					<ion-col col-4> + {{crt.multisize.price}}</ion-col>\n\n				</ion-row>\n\n\n\n				<ion-row *ngIf="crt.addon && crt.addon.length > 0" class="displayFlex">\n\n					<ion-col col-4 class="fontWeight600">Addon : </ion-col>\n\n					<ion-col col-8>\n\n						<ion-row *ngFor = "let addon of crt.addon">\n\n							<ion-col no-padding>{{addon.name}} </ion-col>\n\n							<ion-col no-padding> + {{addon.price}}</ion-col>\n\n						</ion-row>\n\n					</ion-col>\n\n				</ion-row>\n\n\n\n				<ion-row *ngIf = "crt.quantity" class="width100">\n\n					<ion-col col-4 class="fontWeight600">Quantity :</ion-col>\n\n					<ion-col col-4 class="displayInherit">\n\n						<ion-col col-4 no-padding>\n\n							<button class="decreaseQuantity width100" (click)="decreaseQuantity(i)">\n\n								<ion-icon name="remove" ios="ios-remove" md="md-remove" class="qtyButton"></ion-icon>\n\n							</button>\n\n						</ion-col>\n\n						<ion-col col-4 no-padding>\n\n							<ion-label no-margin class="quantity width100">{{crt.quantity}}</ion-label>\n\n						</ion-col>\n\n						<ion-col col-4 no-padding>\n\n							<button class="increaseQuantity width100" (click)="increaseQuantity(i)">\n\n								<ion-icon name="add" ios="ios-add" md="md-add" class="qtyButton"></ion-icon>\n\n							</button>\n\n						</ion-col>\n\n					</ion-col>\n\n					<!-- <ion-col col-4 class="fontWeight600" text-right>${{crt.totalPrice}}</ion-col> -->\n\n				</ion-row>\n\n\n\n				<ion-row *ngIf = "crt.itemInstruction" class="width100 itemInstruction">\n\n					<ion-col col-12>{{crt.itemInstruction}}</ion-col>\n\n				</ion-row>\n\n\n\n			</ion-card-content>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "promotion">\n\n		<ion-card class="width100 padding3 marginBottom4" no-margin>\n\n			<ion-card-header no-padding>\n\n				<ion-row>\n\n					<ion-col col-12 *ngIf = "promotion.promotion">{{promotion.promotion.promoname}}<ion-icon float-right name="trash" ios="ios-trash" md="md-trash" class="delItem" (click)="deletePromotion()"></ion-icon></ion-col>\n\n				</ion-row>\n\n			</ion-card-header>\n\n\n\n			<ion-card-content no-padding *ngIf = "promotion.itemGroup1">\n\n\n\n				<ion-row class="width100">\n\n					<ion-row *ngIf="promotion.itemGroup1.item" class="width100">\n\n						<ion-col col-4><img [src]="itemImage(promotion.itemGroup1.item.image)"  class="card-img" /></ion-col>\n\n						<ion-col col-8>\n\n							<ion-row>\n\n								<ion-col no-padding>{{promotion.itemGroup1.item.name}}</ion-col>\n\n							</ion-row>\n\n							<ion-row>\n\n								<ion-col col-4 class="fontWeight600 cartItemPrice">${{promotion.itemGroup1.totalPrice}}</ion-col>\n\n							</ion-row>\n\n						</ion-col>\n\n					</ion-row>\n\n					\n\n					<ion-row *ngIf="promotion.itemGroup1.multisize" class="width100">\n\n						<ion-col col-4 class="fontWeight600">Size : </ion-col>\n\n						<ion-col col-4>{{promotion.itemGroup1.multisize.size}} </ion-col>\n\n						<ion-col col-4> + {{promotion.itemGroup1.multisize.price}}</ion-col>\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf="promotion.itemGroup1.addon && promotion.itemGroup1.addon.length > 0 " class="displayFlex width100">\n\n						<ion-col col-4 class="fontWeight600">Addon : </ion-col>\n\n						<ion-col col-8>\n\n							<ion-row *ngFor = "let addon of promotion.itemGroup1.addon">\n\n								<ion-col no-padding>{{addon.name}} </ion-col>\n\n								<ion-col no-padding> + {{addon.price}}</ion-col>\n\n							</ion-row>\n\n						</ion-col>\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf = "promotion.itemGroup1.quantity" class="width100">\n\n						<ion-col col-4 class="fontWeight600">Quantity :</ion-col>\n\n						<ion-col col-4 class="displayInherit">\n\n							<ion-col col-4 no-padding>\n\n								<button class="decreaseQuantity width100" disabled>\n\n									<ion-icon name="remove" ios="ios-remove" md="md-remove" class="qtyButton"></ion-icon>\n\n								</button>\n\n							</ion-col>\n\n							<ion-col col-4 no-padding>\n\n								<ion-label no-margin class="quantity width100" disabled>{{promotion.itemGroup1.quantity}}</ion-label>\n\n							</ion-col>\n\n							<ion-col col-4 no-padding>\n\n								<button class="increaseQuantity width100" disabled>\n\n									<ion-icon name="add" ios="ios-add" md="md-add" class="qtyButton"></ion-icon>\n\n								</button>\n\n							</ion-col>\n\n						</ion-col>\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf = "promotion.itemGroup1.itemInstruction" class="width100 itemInstruction">\n\n						<ion-col col-12>{{promotion.itemGroup1.itemInstruction}}</ion-col>\n\n					</ion-row>\n\n				</ion-row>\n\n\n\n				<ion-row *ngIf = "promotion.itemGroup2" class="width100">\n\n					<ion-row *ngIf="promotion.itemGroup2.item" class="width100">\n\n						<ion-col col-4><img [src]="itemImage(promotion.itemGroup2.item.image)" class="cart-img" /></ion-col>\n\n						<ion-col col-8>\n\n							<ion-row>\n\n								<ion-col no-padding>{{promotion.itemGroup2.item.name}}</ion-col>\n\n							</ion-row>\n\n							<ion-row>\n\n								<ion-col col-4 class="fontWeight600 cartItemPrice">${{promotion.itemGroup2.totalPrice}}</ion-col>\n\n							</ion-row>\n\n						</ion-col>\n\n					</ion-row>\n\n					\n\n					<ion-row *ngIf="promotion.itemGroup2.multisize" class="width100">\n\n						<ion-col col-4 class="fontWeight600">Size : </ion-col>\n\n						<ion-col col-4>{{promotion.itemGroup2.multisize.size}} </ion-col>\n\n						<ion-col col-4> + {{promotion.itemGroup2.multisize.price}}</ion-col>\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf="promotion.itemGroup2.addon && promotion.itemGroup2.addon.length > 0" class="displayFlex width100">\n\n						<ion-col col-4 class="fontWeight600">Addon : </ion-col>\n\n						<ion-col col-8>\n\n							<ion-row *ngFor = "let addon of promotion.itemGroup2.addon">\n\n								<ion-col no-padding>{{addon.name}} </ion-col>\n\n								<ion-col no-padding> + {{addon.price}}</ion-col>\n\n							</ion-row>\n\n						</ion-col>\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf = "promotion.itemGroup2.quantity" class="width100">\n\n						<ion-col col-4 class="fontWeight600">Quantity :</ion-col>\n\n						<ion-col col-4 class="displayInherit">\n\n							<ion-col col-4 no-padding>\n\n								<button class="decreaseQuantity width100" disabled>\n\n									<ion-icon name="remove" ios="ios-remove" md="md-remove" class="qtyButton"></ion-icon>\n\n								</button>\n\n							</ion-col>\n\n							<ion-col col-4 no-padding>\n\n								<ion-label no-margin class="quantity width100" disabled>{{promotion.itemGroup2.quantity}}</ion-label>\n\n							</ion-col>\n\n							<ion-col col-4 no-padding>\n\n								<button class="increaseQuantity width100" disabled>\n\n									<ion-icon name="add" ios="ios-add" md="md-add" class="qtyButton"></ion-icon>\n\n								</button>\n\n							</ion-col>\n\n						</ion-col>\n\n						<!-- <ion-col col-4 class="fontWeight600" text-right>${{promotion.itemGroup2.totalPrice}}</ion-col> -->\n\n					</ion-row>\n\n\n\n					<ion-row *ngIf = "promotion.itemGroup2.itemInstruction" class="width100 itemInstruction">\n\n						<ion-col col-12>{{promotion.itemGroup2.itemInstruction}}</ion-col>\n\n					</ion-row>\n\n				</ion-row>\n\n\n\n				<ion-row class="width100">\n\n					<ion-col col-5 >Total :</ion-col>\n\n					<ion-col col-7 text-right class="fontWeight600"> $ {{promotion.total}}</ion-col>\n\n				</ion-row>\n\n\n\n			</ion-card-content>\n\n		</ion-card>		\n\n	</ion-row>	\n\n\n\n	<ion-row  *ngIf = "cart || promotion">\n\n		<ion-card no-margin class="width100 marginBottom4 padding3">\n\n			<ion-row>\n\n				<ion-col col-12>Sub-Total : <span class="fontWeight600" float-right>${{subTotal | number : \'1.2-2\'}}</span></ion-col>\n\n			</ion-row>\n\n		</ion-card>\n\n		<ion-card no-margin class="width100 marginBottom4 padding3" *ngIf = "discountAmount">\n\n			<ion-row>\n\n				<ion-col col-12 >Discount : <span class="fontWeight600" float-right>${{discountAmount | number : \'1.2-2\'}}</span></ion-col>\n\n			</ion-row>\n\n		</ion-card>\n\n		<ion-card  *ngIf="restaurants.taxation" no-margin class="width100 marginBottom4 padding3">\n\n			<ion-row>\n\n				<ion-col col-12>{{restaurants.taxation.name}} : <span class="fontWeight600" float-right>{{restaurants.taxation.taxpercent}} %</span></ion-col>\n\n			</ion-row>\n\n		</ion-card>\n\n		<ion-card  *ngIf = "cartStorage && cartStorage.deliveryfee" no-margin class="width100 marginBottom4 padding3">\n\n			<ion-row>\n\n				<ion-col col-12 >Delivery Fee : <span class="fontWeight600" float-right>${{deliveryfee | number : \'1.2-2\'}}</span></ion-col>\n\n			</ion-row>\n\n		</ion-card>\n\n		<ion-card no-margin class="width100 marginBottom4 padding3">\n\n			<ion-row>\n\n				<ion-col col-12 >Total : <span class="fontWeight600" float-right>${{totalWithTax | number : \'1.2-2\'}}</span></ion-col>\n\n			</ion-row>\n\n		</ion-card>\n\n	</ion-row>\n\n\n\n	<ion-row class="width100" *ngIf = "currentCustomer ">\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">Name</ion-col>\n\n			<ion-col>: {{currentCustomer.firstname}} {{currentCustomer.lastname}}</ion-col>\n\n		</ion-row>\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">Contact No.</ion-col>\n\n			<ion-col>: {{currentCustomer.phonenumber}}</ion-col>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "cartStorage && cartStorage.orderMethod">\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">Type</ion-col>\n\n			<ion-col>: {{cartStorage.orderMethod.mType}}</ion-col>\n\n		</ion-row>\n\n		<ion-row class="width100" *ngIf = "cartStorage.orderMethod.mType == \'Delivery\'">\n\n			<ion-col class="fontWeight600">Address</ion-col> \n\n			<ion-col>: {{cartStorage.orderMethod.streetName}}, {{cartStorage.orderMethod.city}}, {{cartStorage.orderMethod.postcode}}</ion-col>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "cartStorage && cartStorage.orderTime">\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">When</ion-col>\n\n			<ion-col >: {{cartStorage.orderTime.tType}}</ion-col>\n\n		</ion-row>\n\n		<ion-row class="width100" *ngIf = "cartStorage.orderTime.tType == \'Later\'">\n\n			<ion-col class="fontWeight600">Day</ion-col> \n\n			<ion-col>: {{cartStorage.orderTime.day}}</ion-col>\n\n		</ion-row>\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">Time</ion-col> \n\n			<ion-col>: {{cartStorage.orderTime.time}}</ion-col>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row *ngIf = "cartStorage && cartStorage.orderPayment">\n\n		<ion-row class="width100">\n\n			<ion-col class="fontWeight600">Payment Type</ion-col>\n\n			<ion-col *ngIf = "cartStorage.orderPayment.cash">: Cash</ion-col>\n\n			<ion-col *ngIf = "cartStorage.orderPayment.cardpickup">: Card Pickup</ion-col>\n\n			<ion-col *ngIf = "cartStorage.orderPayment.cardinternet">: Card via Internet</ion-col>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row class="width100">\n\n		<ion-item no-padding class="comment">\n\n			<ion-label no-margin floating class="siLabel">Leave a comment...</ion-label>\n\n			<ion-input type="text" class="siText" maxlength="100" value="" (keyup)="comment($event)"></ion-input>\n\n		</ion-item>\n\n	</ion-row>\n\n	\n\n	<ion-row class="couponCode" *ngIf = "promotion == undefined && cart && cart.length > 0">\n\n		<ion-row class="width100" *ngIf = "noCode">\n\n			<ion-col col-5 class="textUnderline" (click)="showField()">Apply Code</ion-col>\n\n		</ion-row>\n\n\n\n		<ion-row class="width100" *ngIf = "typeCode">\n\n			<ion-input type="text" maxlength="10" value="" (keyup)="countCharacter($event)"></ion-input> <button (click)=applyCode()>Apply</button> <button (click)=showField()>Cancel</button>\n\n		</ion-row>\n\n\n\n		<ion-row class="width100" *ngIf = "haveCode">\n\n			<ion-label>{{appliedCode}}</ion-label> <button (click)=removeCode()>Remove</button>\n\n		</ion-row>\n\n	</ion-row>\n\n\n\n	<ion-row class="width100 checkout" *ngIf = "cart || promotion">\n\n		<button class="orderButton padding3" [disabled]="cart.length == 0 && promotion == undefined" (click)="addDetail()"><ion-icon name="arrow-dropright-circle" ios="ios-arrow-dropright-circle" md="md-arrow-dropright-circle"></ion-icon>   Add Detail </button>\n\n\n\n		<button class="orderButton padding3" [disabled]="checkDisablePlaceOrderBtn()" (click)="placeOrder()"><ion-icon name="arrow-dropright-circle" ios="ios-arrow-dropright-circle" md="md-arrow-dropright-circle"></ion-icon> Place Order </button>\n\n	</ion-row>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\cart\cart.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["f" /* RestaurantsService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["e" /* PromotionsService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_index__["a" /* CustomersService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_detail__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyOrderPage = (function () {
    function MyOrderPage(actionSheetCtrl, navCtrl, loadingCtrl, navParams, restaurantsService, orderService) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
        this.currentCustomer = {};
    }
    MyOrderPage.prototype.ionViewDidEnter = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.getOrders(this.currentCustomer._id);
    };
    MyOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCustomerPage');
    };
    MyOrderPage.prototype.getOrders = function (id) {
        var _this = this;
        this.orderService.customerOrders(id).subscribe(function (users) {
            console.log("users.message");
            console.log(users.message);
            _this.orders = users.message;
            _this.loading.dismiss();
        });
    };
    MyOrderPage.prototype.orderDetail = function (obj) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_detail__["a" /* OrderDetailPage */], {
            item: obj
        });
    };
    MyOrderPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getOrders(_this.currentCustomer._id);
            refresher.complete();
        }, 2000);
    };
    return MyOrderPage;
}());
MyOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-order',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\my-order\my-order.html"*/'<ion-header>\n\n    <ion-navbar color="secondary">\n\n        <button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n        <ion-title>\n\n            <ion-icon name="cart" item-start></ion-icon> &nbsp;Orders</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <ion-row *ngIf = "orders" class="width100">\n\n        <ion-row *ngFor="let order of orders" (click)="orderDetail(order)" class="width100 borderBottom">\n\n            <ion-col col-12 class="fontWeight500">\n\n                # {{order._id.substr(18,6)}} <span float-right>${{order.gTotal}}</span> \n\n            </ion-col>\n\n            <ion-col col-12>\n\n                <span class="fontSize12px"><ion-icon name="clock" ios="ios-clock" md="md-clock"></ion-icon> {{order.created_at | date:\'medium\' }}</span>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\my-order\my-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_service_restaurants_service__["a" /* RestaurantsService */],
        __WEBPACK_IMPORTED_MODULE_3__app_service_order_service__["a" /* OrderService */]])
], MyOrderPage);

//# sourceMappingURL=my-order.js.map

/***/ }),

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AlertService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertService = (function () {
    function AlertService() {
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.message = { type: 'success', text: message };
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.message = { type: 'error', text: message };
    };
    AlertService.prototype.getMessage = function () {
        return this.message;
    };
    AlertService.prototype.deleteMessage = function () {
        delete this.message;
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AlertService);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AuthService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(17);
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
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'users/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwner = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'owners/login', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.getOwnerById = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'users/' + id)
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
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'status');
    };
    AuthService.prototype.resetPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'owners/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.resetAdminPassword = function (id, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'users/admin/' + id, data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPassword = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'owners/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthService.prototype.forgetPasswordAdmin = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global__["b" /* url */] + 'users/forget-password', data)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UsersService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersService = (function () {
    //url: string = 'http://34.209.114.118:4003/users/';
    //url: string = 'http://localhost:4003/users/';
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.updateAdmin = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + 'admin/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addAdmin = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + 'admin/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/', data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateUser = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAllAdmin = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + 'admin/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/')
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.updateOwnerPassword = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + 'change-password/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getAdminOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + '/admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteAdminOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + 'admin/' + id)
            .map(function (response) { return response.json(); });
    };
    UsersService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'users/' + id)
            .map(function (response) { return response.json(); });
    };
    return UsersService;
}());
UsersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], UsersService);

//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DriversService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DriversService = (function () {
    function DriversService(http) {
        this.http = http;
    }
    DriversService.prototype.addDriver = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'driver/', data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.updateDriver = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'driver/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'driver/')
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getRestaurantDrivers = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurant-drivers/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.myOrder = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'order/driver/' + id)
            .map(function (response) { return response.json(); });
    };
    DriversService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'driver/' + id)
            .map(function (response) { return response.json(); });
    };
    return DriversService;
}());
DriversService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], DriversService);

//# sourceMappingURL=drivers.service.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Manvi on 14-Apr-17.
 */



var PromotionsService = (function () {
    function PromotionsService(http) {
        this.http = http;
    }
    PromotionsService.prototype.addPromotion = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'promotion/', data)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.updatePromotion = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'promotion/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'promotion/')
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'promotion/' + id)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'promotion/' + id)
            .map(function (response) { return response.json(); });
    };
    PromotionsService.prototype.getRestroPromotions = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'restaurantpromo-list/' + id)
            .map(function (response) { return response.json(); });
    };
    return PromotionsService;
}());
PromotionsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], PromotionsService);

//# sourceMappingURL=promotions.service.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KitchenMenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KitchenMenuService = (function () {
    function KitchenMenuService(http) {
        this.http = http;
    }
    KitchenMenuService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menu/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.updateMenu = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menu/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAll = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menu-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menu/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.adddetailAddOn = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addon/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.getAllAddOn = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addon-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupDetailEditser = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupRemove = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addon/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenMenuService.prototype.groupEditUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenMenuService;
}());
KitchenMenuService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], KitchenMenuService);

//# sourceMappingURL=kitchenmenu.service.js.map

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KitchenItemService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KitchenItemService = (function () {
    function KitchenItemService(http) {
        this.http = http;
    }
    KitchenItemService.prototype.addUser = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item/', data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.promotionsItem = function (data) {
        var obj = { 'items': data };
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item-all/', obj)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenu = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateMenuAddOn = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'itemaddon/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item/')
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getAllItems = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getMenuItem = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'menuitem-list/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getOne = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.deleteOne = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'item/' + id)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeAddOnToSubmenu = function (data) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'itemaddon/' + data._id + '/' + data.indexi)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editAddOnToSubmenu = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'itemaddon/' + data.id + '/' + data.submenuid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.updateEditMenuAddOn = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'itemaddonedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.addChoice = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addonchoice/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.removeChoice = function (data) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addonchoice/' + data._id + '/' + data.index)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.getEditChoice = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addonchoice/' + data.id + '/' + data.cid)
            .map(function (response) { return response.json(); });
    };
    KitchenItemService.prototype.editSubAddOnUpdate = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'addonchoiceedit/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    return KitchenItemService;
}());
KitchenItemService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], KitchenItemService);

//# sourceMappingURL=kitchenitem.service.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MasterService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MasterService = (function () {
    function MasterService(http) {
        this.http = http;
    }
    MasterService.prototype.addLanguage = function (data) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'language/', data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.updateLanguage = function (data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'language/' + data._id, data)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getAllLanguage = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'language/')
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.getOneLanguage = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    MasterService.prototype.deleteOneLanguage = function (id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__global__["b" /* url */] + 'language/' + id)
            .map(function (response) { return response.json(); });
    };
    return MasterService;
}());
MasterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], MasterService);

//# sourceMappingURL=master.service.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconTextPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*import { ProfilePage } from '../profile/profile';*/

var IconTextPage = (function () {
    function IconTextPage() {
        this.tabOne = __WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */];
        this.tabTwo = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tabThree = __WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */];
    }
    return IconTextPage;
}());
IconTextPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: '<ion-tabs><ion-tab tabIcon="call" [root]="tabOne" tabBadge="3" tabBadgeStyle="danger"></ion-tab><ion-tab tabIcon="chatbubbles" [root]="tabTwo" tabBadge="14" tabBadgeStyle="danger"></ion-tab><ion-tab tabIcon="musical-notes" [root]="tabThree"></ion-tab></ion-tabs>',
    })
    /*<ion-header><ion-navbar><button ion-button menuToggle><ion-icon name="menu"></ion-icon></button></ion-navbar></ion-header>*/
], IconTextPage);

//# sourceMappingURL=iconText.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Home</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <h3>Ionic Menu Starter</h3>\n\n\n\n    <p>\n\n        If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n\n    </p>\n\n\n\n    <button ion-button secondary menuToggle>Toggle Menu</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Manvi\v3xperts\Projects\darek\darek\darekApp\singleRestaurant\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[499]);
//# sourceMappingURL=main.js.map