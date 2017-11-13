import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { PromotionPage } from '../pages/promotion/promotion';
import { PromotionDetailPage } from '../pages/promotion/promotiondetail';

import { ProfilePage } from '../pages/profile/profile';
import { WishlistPage } from '../pages/profile/wishlist';
import { MenuPage } from '../pages/menu/menu';
import { MyOrderPage } from '../pages/my-order/my-order';

import { IconTextPage } from '../pages/item/iconText';

import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/cart/checkout';

import { PaymentinfoPage } from '../pages/paymentinfo/paymentinfo';


import { RestaurantsService } from './service/index';

import * as globalVariable from "./global";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MenuPage;
    currentCustomer : any;
    resID: string = globalVariable.resId;
    restaurant : any = {};
    pages: Array<{iconA: string, iconI : string, iconW : string ,title: string, component: any}>;

    constructor(
        public platform: Platform,
        public events: Events,
        public statusBar: StatusBar,
        public alertCtrl: AlertController,
        private restaurantsService: RestaurantsService,
        public splashScreen: SplashScreen
        ) {
            events.subscribe('user:created', (user, time) => {
            this.pages = [];
            this.pages.push(
                { iconA : 'flame' , iconI : 'ios-flame' , iconW : 'md-flame' , title: 'Hot Deals', component: PromotionPage },
                { iconA : 'clipboard' , iconI : 'ios-clipboard' , iconW : 'md-clipboard' , title: 'Menu', component: MenuPage },
                { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: CartPage },            
                { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'My Orders', component: MyOrderPage },
                { iconA : 'heart' , iconI : 'ios-heart' , iconW : 'md-heart' , title: 'My WishList', component: WishlistPage },
                { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: ProfilePage },
                { iconA : 'log-out' , iconI : 'ios-log-out' , iconW : 'md-log-out' , title: 'Logout', component: 'logout' }
            )
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', user, 'at', time);
            });
        this.initializeApp();

        // used for an example of ngFor and navigation
    }

    ionViewDidEnter() {

        this.loadRestaurant();
        this.initializeApp();
    }

    loadRestaurant(){
        this.restaurantsService.getOne(this.resID).subscribe(users => {
            this.restaurant = users.message;

            console.log("this.restaurant in app");
            console.log(this.restaurant);
        });
    }

    initializeApp() {
        this.pages = [
            { iconA : 'flame' , iconI : 'ios-flame' , iconW : 'md-flame' , title: 'Hot Deals', component: PromotionPage },
            { iconA : 'clipboard' , iconI : 'ios-clipboard' , iconW : 'md-clipboard' , title: 'Menu', component: MenuPage },
            { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: CartPage },
            { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: LoginPage }
        ];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.loadRestaurant();
        //this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
        
        this.platform.ready().then(() => {
            // Here you can do any higher level native things you might need.
            // Okay, so the platform is ready and our plugins are available.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        if (page.component == 'logout') {
            let prompt = this.alertCtrl.create({
                title: 'Logout',
                message: "Are you sure ?",
                buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: data => {
                        this.events.unsubscribe('user:created',null);
                        this.pages = [];
                        this.initializeApp();
                        localStorage.removeItem('currentCustomer');
                        this.nav.setRoot(MenuPage);
                    }
                }
                ]
            });
            prompt.present();
        }else{
            this.nav.setRoot(page.component);
        }
    }
}
