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
import { NavController, AlertController, Nav } from 'ionic-angular';
import { ChangePasswordPage } from './changepassword';
import { PlanPage } from './plan';
import { LoginPage } from '../login/login';
import { SocketService } from '../../app/service/socket.service';
var SettingPage = (function () {
    function SettingPage(socketService, nav, navCtrl, alertCtrl) {
        this.socketService = socketService;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.pages = [
            { icon: 'person', title: 'Change Password', component: ChangePasswordPage },
            { icon: 'person', title: 'My Plan', component: PlanPage },
        ];
    }
    SettingPage.prototype.openPage = function (page) {
        this.navCtrl.push(page.component);
    };
    SettingPage.prototype.logout = function () {
        this.socketService.customerOffline();
        this.nav.setRoot(LoginPage);
        console.log('sdfjhbsdjh');
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Component({
        selector: 'page-setting',
        templateUrl: 'setting.html'
    }),
    __metadata("design:paramtypes", [SocketService, Nav, NavController, AlertController])
], SettingPage);
export { SettingPage };
//# sourceMappingURL=setting.js.map