var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { FileSelectDirective } from 'ng2-file-upload';
import { SocketIoModule } from 'ng-socket-io';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { ChangePasswordPage } from '../pages/setting/changepassword';
import { FriendPage } from '../pages/friend/friend';
import { MessagesPage } from '../pages/messages/messages';
import { MessageDetailPage } from '../pages/messages/messagedetail';
import { PlanPage } from '../pages/setting/plan';
import { FilterPage } from '../pages/home/filter';
import { TabsPage } from '../pages/tabs/tabs';
import { VideoCallIncomingPage } from '../pages/tabs/videocallincoming';
import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { RegisterPage } from '../pages/login/register';
import { StepPage } from '../pages/login/step';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { CustomerPage } from '../pages/customer/customer';
import { CustomerDetailPage } from '../pages/customer/customerdetail';
import { VideoCallOutgoingPage } from '../pages/customer/videocalldetail';
import { VideocallPage } from '../pages/videocall/videocall';
import { SpeedDatingPage } from '../pages/speeddating/speeddating';
import { CustomersService, PackageService, SocketService, FriendService, BannerService } from './service/index';
import * as globalVariable from "./global";
var config = { url: globalVariable.url, options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            FileSelectDirective,
            AboutPage,
            SettingPage,
            ChangePasswordPage,
            PlanPage,
            FilterPage,
            FriendPage,
            MessagesPage,
            MessageDetailPage,
            TabsPage,
            LoginPage,
            ForgetPasswordPage,
            RegisterPage,
            StepPage,
            ProfilePage,
            ProfileUpdatePage,
            CustomerPage,
            CustomerDetailPage,
            VideoCallOutgoingPage,
            VideoCallIncomingPage,
            VideocallPage,
            SpeedDatingPage
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            IonicModule.forRoot(MyApp, { tabsPlacement: 'bottom' }),
            SocketIoModule.forRoot(config)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            AboutPage,
            SettingPage,
            ChangePasswordPage,
            PlanPage,
            FilterPage,
            FriendPage,
            MessagesPage,
            MessageDetailPage,
            TabsPage,
            CustomerPage,
            CustomerDetailPage,
            VideoCallOutgoingPage,
            VideoCallIncomingPage,
            VideocallPage,
            LoginPage,
            ForgetPasswordPage,
            RegisterPage,
            StepPage,
            ProfilePage,
            ProfileUpdatePage
        ],
        providers: [
            Camera,
            StatusBar,
            SplashScreen,
            Diagnostic,
            CustomersService,
            PackageService,
            SocketService,
            FriendService,
            BannerService,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map