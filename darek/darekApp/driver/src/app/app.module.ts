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
/*import { LoginPageModule } from '../pages/login/login.module';*/
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';
import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderDetailPage } from '../pages/my-order/order-detail';
import { AssignOrderPage } from '../pages/my-order/assign-order';

/*Services*/
import {  AuthService, UsersService, RestaurantsService, OrderService, DriversService } from './service/index';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        ForgetPasswordPage,
        ChangePasswordPage,
        ProfilePage,InfoPage,
        MyOrderPage,OrderDetailPage,AssignOrderPage,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,ForgetPasswordPage,
        ProfilePage,ChangePasswordPage,InfoPage,
        MyOrderPage, OrderDetailPage, AssignOrderPage,
    ],
    providers: [
        AuthService,
        DriversService,
        UsersService,
        RestaurantsService,
        OrderService,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
