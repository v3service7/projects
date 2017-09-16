var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
/*Services*/
import { AuthService, UsersService, RestaurantsService, OrderService, DriversService } from './service/index';
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
            ListPage,
            LoginPage,
            ForgetPasswordPage,
            ChangePasswordPage,
            ProfilePage, InfoPage,
            MyCustomerPage,
            CustomerDetailPage,
            MyDriverPage, AddDriverPage, DriverDetailPage, EditDriverPage,
            MyOrderPage,
            OrderDetailPage, AssignOrderPage,
            MyNotificationPage,
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            /*LoginPageModule,*/
            ReactiveFormsModule,
            IonicModule.forRoot(MyApp),
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            ListPage,
            LoginPage,
            ForgetPasswordPage,
            ChangePasswordPage,
            ProfilePage, InfoPage,
            MyCustomerPage,
            CustomerDetailPage,
            MyDriverPage, AddDriverPage, DriverDetailPage, EditDriverPage,
            MyOrderPage, OrderDetailPage, AssignOrderPage,
            MyNotificationPage,
        ],
        providers: [
            AuthService,
            DriversService,
            UsersService,
            RestaurantsService,
            OrderService,
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map