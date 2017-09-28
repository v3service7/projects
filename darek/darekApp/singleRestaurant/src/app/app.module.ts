import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule, Nav, Platform, NavController,ViewController,AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { RegisterPage } from '../pages/login/register';

import { HomePage } from '../pages/home/home';

import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { ChangePasswordPage } from '../pages/profile/changepassword';

import { MenuPage } from '../pages/menu/menu';

import { ItemPage } from '../pages/item/item';
import { ItemDetailPage } from '../pages/item/itemDetail';
import { IconTextPage } from '../pages/item/iconText';

import { RestroinfoPage } from '../pages/restroinfo/restroinfo';

import { CartPage } from '../pages/cart/cart';

import { CheckoutPage } from '../pages/cart/checkout';

/*Services*/
import {  CustomersService, KitchenMenuService, KitchenItemService, RestaurantsService } from './service/index';


@NgModule({
    declarations: [
    MyApp,
    HomePage,
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfilePage,ProfileUpdatePage,ChangePasswordPage,
    MenuPage,
    ItemPage,ItemDetailPage,IconTextPage,
    RestroinfoPage,
    CartPage,
    CheckoutPage
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
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfilePage,ProfileUpdatePage,ChangePasswordPage,
    MenuPage,
    ItemPage,ItemDetailPage,IconTextPage,
    RestroinfoPage,
    CartPage,
    CheckoutPage
    ],
    providers: [
    CustomersService,KitchenMenuService, KitchenItemService, RestaurantsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
