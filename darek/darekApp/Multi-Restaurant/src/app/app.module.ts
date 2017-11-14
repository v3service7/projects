import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule, Nav, Platform, NavController,ViewController,AlertController } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { RestaurantPage } from '../pages/restaurant/restaurant';

import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/login/forgetpassword';
import { RegisterPage } from '../pages/login/register';

import { PromotionPage } from '../pages/promotion/promotion';
import { PromotionPageModule } from '../pages/promotion/promotion.module';
import { PromotionDetailPage } from '../pages/promotion/promotiondetail';

import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderDetailPage } from '../pages/my-order/order-detail';

import { ProfilePage } from '../pages/profile/profile';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ProfileUpdatePage } from '../pages/profile/profileupdate';
import { ChangePasswordPage } from '../pages/profile/changepassword';
import { WishlistPage } from '../pages/profile/wishlist';

import { MenuPage } from '../pages/menu/menu';
import { MenuPageModule } from '../pages/menu/menu.module';

import { PaymentinfoPage } from '../pages/paymentinfo/paymentinfo';

import { ItemPage } from '../pages/item/item';
import { ItemPageModule } from '../pages/item/item.module';
import { ItemDetailPage } from '../pages/item/itemDetail';
import { ItemDetailPageModule } from '../pages/item/itemDetail.module';
import { IconTextPage } from '../pages/item/iconText';

import { CartPage } from '../pages/cart/cart';
import { CartPageModule } from '../pages/cart/cart.module';
import { CheckoutPage } from '../pages/cart/checkout';
import { CheckoutPageModule } from '../pages/cart/checkout.module';
import { AwaitPage } from '../pages/cart/await';

import {  CustomersService, KitchenMenuService, KitchenItemService, RestaurantsService, PromotionsService, OrderService } from './service/index';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '6a60f968'
    }
};

@NgModule({
  declarations: [
    MyApp,
    RestaurantPage,
    PromotionDetailPage,
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfileUpdatePage,ChangePasswordPage,WishlistPage,
    PaymentinfoPage,
    IconTextPage,
    AwaitPage,
    MyOrderPage,OrderDetailPage
  ],
  imports: [
    PromotionPageModule,ProfilePageModule,MenuPageModule,ItemPageModule,ItemDetailPageModule,CartPageModule,CheckoutPageModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RestaurantPage,
    PromotionPage, PromotionDetailPage,
    LoginPage,ForgetPasswordPage,RegisterPage,
    ProfilePage,ProfileUpdatePage,ChangePasswordPage,WishlistPage,
    MenuPage,PaymentinfoPage,
    ItemPage,ItemDetailPage,IconTextPage,
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