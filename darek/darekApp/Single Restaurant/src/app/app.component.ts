import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

import { RatingPage } from '../pages/rating/rating';

import { RestaurantsService, SocketService } from './service/index';

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
        public splashScreen: SplashScreen,
        public socketService : SocketService,
        public localNotifications: LocalNotifications,
        public backgroundMode: BackgroundMode
        ) {
            events.subscribe('user:created', (user, time) => {
            this.pages = [];
            this.pages.push(
                { iconA : 'flame' , iconI : 'ios-flame' , iconW : 'md-flame' , title: 'Hot Deals', component: PromotionPage },
                { iconA : 'clipboard' , iconI : 'ios-clipboard' , iconW : 'md-clipboard' , title: 'Menu', component: MenuPage },
                { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: CartPage },
                { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'My Orders', component: MyOrderPage },
                { iconA : 'star-half' , iconI : 'ios-star-half' , iconW : 'md-star-half' , title: 'Rating', component: RatingPage },
                { iconA : 'heart' , iconI : 'ios-heart' , iconW : 'md-heart' , title: 'My WishList', component: WishlistPage },
                { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: ProfilePage },
                { iconA : 'log-out' , iconI : 'ios-log-out' , iconW : 'md-log-out' , title: 'Logout', component: 'logout' }
            )
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', user, 'at', time);
            });
        this.initializeApp();

        //this.onReloadPage();
        this.orderResponseReceived();

        // used for an example of ngFor and navigation
    }

    ionViewDidEnter() {
        this.loadRestaurant();
        this.initializeApp();
    }

    pushNot(status){
        this.platform.ready().then(() => {
            this.localNotifications.schedule({
                id:1,
                title:'Order Status',
                text: 'Your Order is '+ status
            });
        });
    }

    orderResponseReceived(){
        this.socketService.orderResponseOwnerToCustomer().subscribe((data) =>{
            
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));

            console.log("data --- ", JSON.stringify(data));
            console.log("this.currentCustomer  ",this.currentCustomer)

            if((data) && (data['status']['customerId']['_id'] == this.currentCustomer['_id'])){
                this.pushNot(data['status']['status']);
            }
        })
    }

    /*onReloadPage(){
        if(localStorage.getItem('currentCustomer')){
            var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            this.socketService.assignSocketIdToCustomer(currentCustomer);
        }
    }*/

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
            { iconA : 'star-half' , iconI : 'ios-star-half' , iconW : 'md-star-half' , title: 'Rating', component: RatingPage },
            { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: LoginPage }
        ];
        //this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.loadRestaurant();
        //this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
        
        this.platform.ready().then(() => {
            // Here you can do any higher level native things you might need.
            // Okay, so the platform is ready and our plugins are available.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.backgroundMode.enable();
            // if(localStorage.getItem("currentCustomer")){
            //     this.rootPage = MenuPage;
            // }else{
            //     this.rootPage = LoginPage;
            // }
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
                        //this.events.unsubscribe('user:created',null);
                        console.log("logout")
                        this.pages = [];
                        this.pages = [
                            { iconA : 'flame' , iconI : 'ios-flame' , iconW : 'md-flame' , title: 'Hot Deals', component: PromotionPage },
                            { iconA : 'clipboard' , iconI : 'ios-clipboard' , iconW : 'md-clipboard' , title: 'Menu', component: MenuPage },
                            { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: CartPage },
                            { iconA : 'star-half' , iconI : 'ios-star-half' , iconW : 'md-star-half' , title: 'Rating', component: RatingPage },
                            { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: LoginPage }
                        ]
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
