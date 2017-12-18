import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';

import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';

import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderDetailPage } from '../pages/my-order/order-detail';
import { ModalContentPage } from '../pages/my-order/filter-page';
import { ChangeOrderStatusPage } from '../pages/my-order/change-order-status';


/* Socket */
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import * as globalVariable from "./global";
const config: SocketIoConfig = { url: globalVariable.url, options: {} };


/*Services*/
import {  AuthService, UsersService, RestaurantsService, OrderService, DriversService, SocketService } from './service/index';

/*import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';*/
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        HomePage,
        ForgetPasswordPage,
        ChangePasswordPage,
        ProfilePage,InfoPage,
        MyOrderPage,OrderDetailPage,ModalContentPage,ChangeOrderStatusPage
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
        SocketIoModule.forRoot(config)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        HomePage,
        ForgetPasswordPage,
        ProfilePage,ChangePasswordPage,InfoPage,
        MyOrderPage, OrderDetailPage,ModalContentPage,ChangeOrderStatusPage
    ],
    providers: [
        AuthService,
        DriversService,
        UsersService,
        RestaurantsService,
        OrderService,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        BackgroundMode,
        LocalNotifications,
        /*LocationTrackerProvider,*/
        BackgroundGeolocation,
        SocketService,
        Geolocation,
    ]
})
export class AppModule {}
