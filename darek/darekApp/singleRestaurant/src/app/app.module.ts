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

import { PromotionPage } from '../pages/promotion/promotion';
import { PromotionDetailPage } from '../pages/promotion/promotiondetail';

import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderDetailPage } from '../pages/my-order/order-detail';

import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { ChangePasswordPage } from '../pages/profile/changepassword';
import { WishlistPage } from '../pages/profile/wishlist';

import { MenuPage } from '../pages/menu/menu';

import { ItemPage } from '../pages/item/item';
import { ItemDetailPage } from '../pages/item/itemDetail';
import { IconTextPage } from '../pages/item/iconText';

import { RestroinfoPage } from '../pages/restroinfo/restroinfo';

import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/cart/checkout';
import { AwaitPage } from '../pages/cart/await';

/*Services*/
import {  CustomersService, KitchenMenuService, KitchenItemService, RestaurantsService, PromotionsService, OrderService } from './service/index';


@NgModule({
    declarations: [
        MyApp,
        PromotionPage, PromotionDetailPage,
        LoginPage,ForgetPasswordPage,RegisterPage,
        ProfilePage,ProfileUpdatePage,ChangePasswordPage,WishlistPage,
        MenuPage,
        ItemPage,ItemDetailPage,IconTextPage,
        RestroinfoPage,
        CartPage,CheckoutPage,AwaitPage,
        MyOrderPage,OrderDetailPage
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
        PromotionPage, PromotionDetailPage,
        LoginPage,ForgetPasswordPage,RegisterPage,
        ProfilePage,ProfileUpdatePage,ChangePasswordPage,WishlistPage,
        MenuPage,
        ItemPage,ItemDetailPage,IconTextPage,
        RestroinfoPage,
        CartPage,CheckoutPage,AwaitPage,
        MyOrderPage,OrderDetailPage
    ],
    providers: [
        CustomersService,KitchenMenuService, KitchenItemService, RestaurantsService,PromotionsService,OrderService,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
