import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RestaurantPage } from '../pages/restaurant/restaurant';
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


import { RestaurantsService, SocketService } from './service/index';

import * as globalVariable from "./global";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RestaurantPage;
  currentCustomer : any;
  pages: Array<{iconA: string, iconI : string, iconW : string ,title: string, component: any}>;
  
  constructor(
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen,
     public socketService : SocketService
    ) {
    // used for an example of ngFor and navigation
      events.subscribe('user:created', (user, time) => {
        this.pages = [];
        this.pages.push(
          { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'Restaurants', component: RestaurantPage },
          { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: 'CartPage' },            
          { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'My Orders', component: MyOrderPage },
          { iconA : 'heart' , iconI : 'ios-heart' , iconW : 'md-heart' , title: 'My WishList', component: WishlistPage },
          { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: ProfilePage },
          { iconA : 'log-out' , iconI : 'ios-log-out' , iconW : 'md-log-out' , title: 'Logout', component: 'logout' }
        )
        // user and time are the same arguments passed in `events.publish(user, time)
        console.log('Welcome', user, 'at', time);
        });
        this.initializeApp();

        this.onReloadPage();
        this.orderResponseReceived();

  }

    ionViewDidEnter() {
      this.initializeApp();
    }

    orderResponseReceived(){
        this.socketService.orderResponseOwnerToCustomer().subscribe((data) =>{
            if(localStorage.getItem('currentCustomer')){
                console.log("orderResponseOwnerToCustomer Status", data);    
            }
        })    
    }  

    onReloadPage(){
        if(localStorage.getItem('currentCustomer')){
            var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
            this.socketService.assignSocketIdToCustomer(currentCustomer);
        }
    }

    initializeApp() {
        this.pages = [
          { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'Restaurants', component: RestaurantPage },
          { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: 'CartPage' },
          { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: LoginPage }
        ];
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        
        this.platform.ready().then(() => {
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
                      console.log("logout")
                      this.pages = [];
                      this.pages = [
                        { iconA : 'book' , iconI : 'ios-book' , iconW : 'md-book' , title: 'Restaurants', component: RestaurantPage },
                        { iconA : 'cart' , iconI : 'ios-cart' , iconW : 'md-cart' , title: 'Shopping Cart', component: 'CartPage' },
                        { iconA : 'person' , iconI : 'ios-person' , iconW : 'md-person' , title: 'My Profile', component: LoginPage }
                      ];
                      localStorage.removeItem('currentCustomer');
                      this.nav.setRoot(RestaurantPage);
                    }
                }
                ]
            });
            prompt.present();
        }else if(page.component == 'CartPage'){
          var restaurantID = localStorage.getItem('resID');
          console.log("restaurantID gjhzxdfju dfdhf");
          console.log(restaurantID);
          if (restaurantID != null) {
            this.nav.setRoot(CartPage,{
                resId : restaurantID
            });
          }else{
              let alert = this.alertCtrl.create({
                  title: 'No Item!',
                  subTitle: 'Your Cart is empty',
                  buttons: [{
                    text : 'OK',
                    handler: data => {
                        this.nav.setRoot(RestaurantPage);
                    }

                  }]
              });
              alert.present();
          }

        }else{
            this.nav.setRoot(page.component);
        }
    }
}
