import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';

import { MyCustomerPage } from '../pages/my-customer/my-customer';
import { CustomerDetailPage } from '../pages/my-customer/customer-detail';
import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderDetailPage } from '../pages/my-order/order-detail';
import { AssignOrderPage } from '../pages/my-order/assign-order';
import { MyDriverPage } from '../pages/my-driver/my-driver';
import { DriverDetailPage } from '../pages/my-driver/driver-detail';
import { AddDriverPage } from '../pages/my-driver/add-driver';
import { EditDriverPage } from '../pages/my-driver/driver-edit';
import { MyNotificationPage } from '../pages/my-notification/my-notification';

import { RatingPage } from '../pages/rating/rating';

/*Services*/
import {  AuthService, UsersService, RestaurantsService, OrderService, DriversService, RatingService } from './service/index';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        ForgetPasswordPage,
        ChangePasswordPage,
        ProfilePage,InfoPage,
        MyCustomerPage,
        CustomerDetailPage,
        MyDriverPage,AddDriverPage,DriverDetailPage,EditDriverPage,
        MyOrderPage,
        OrderDetailPage,AssignOrderPage,
        MyNotificationPage,
        RatingPage
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        LoginPageModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage,
        HomePage,
        LoginPage,
        ForgetPasswordPage,
        ChangePasswordPage,
        ProfilePage,InfoPage,
        MyCustomerPage,
        CustomerDetailPage,
        MyDriverPage, AddDriverPage, DriverDetailPage, EditDriverPage,
        MyOrderPage, OrderDetailPage, AssignOrderPage,
        MyNotificationPage,
        RatingPage
    ],
    providers: [
        AuthService,
        DriversService,
        RatingService,
        UsersService,
        RestaurantsService,
        OrderService,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
