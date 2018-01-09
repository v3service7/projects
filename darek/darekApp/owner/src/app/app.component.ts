import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SocketService } from './service/socket.service';
import { RestaurantsService } from './service/restaurants.service';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';
import { MyCustomerPage } from '../pages/my-customer/my-customer';
import { MyOrderPage } from '../pages/my-order/my-order';
import { MyDriverPage } from '../pages/my-driver/my-driver';
import { RatingPage } from '../pages/rating/rating';

@Component({
    templateUrl: 'app.html',
    styles: [`
        .list-md .item-block .item-inner {
            border-bottom: 0px solid #dedede !important;
        }
    `]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    /*rootPage: any = MyDriverPage;*/
    rootPage: any ;
    currentOwner:any;
    pages: Array<{title: string, icon:string, component: any}>;
    orders: any;

    constructor(
        public alertCtrl: AlertController,
        public platform: Platform,
        public statusBar: StatusBar,
        public events: Events,
        public splashScreen: SplashScreen,
        private localNotifications: LocalNotifications,
        private socketService: SocketService,
        private restaurantsService: RestaurantsService,
        public backgroundMode: BackgroundMode
        ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', icon: 'home', component: HomePage },
            { title: 'Account', icon: 'contact', component: InfoPage },
            { title: 'Customers', icon: 'people', component: MyCustomerPage },
            { title: 'Orders', icon: 'cart', component: MyOrderPage },
            { title: 'Drivers', icon: 'people', component: MyDriverPage },
            { title: 'Rating', icon: 'star-half', component: RatingPage }
        ];

        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.orderReceivedToCustomer();
        this.orderResponseDriverToOwner();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.backgroundMode.enable();
            if(localStorage.getItem("currentOwner")){
                this.rootPage = HomePage;
            }else{
                this.rootPage = LoginPage;
            }
        });
    }

    pushNot(title,text){
        this.platform.ready().then(() => {
            this.localNotifications.schedule({
                id:1,
                title:title,
                text: text
            });
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    orderReceivedToCustomer(){
        this.socketService.orderReceivedToCustomer().subscribe((data) =>{
            this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
            this.restaurantsService.getOwnerRestaurants(this.currentOwner._id).subscribe(users => {
                let restaurants = users.message;
                if((data) && (data['customerdetail']['restaurantId'] == restaurants['_id'])){
                    console.log("customer Send Order", data);
                    this.pushNot(restaurants.name,'Order Recieved');
                    this.events.publish('order:receivedorder', data, Date.now());
                    this.orders = 1;    
                }
            });
        });
    }

    orderResponseDriverToOwner(){
        this.socketService.orderResponseDriverToOwner().subscribe((data) =>{
            console.log("Driver response for Order", data);
            this.pushNot(data['Driverstatus']['restaurantId']['name'],'Driver ' +data['Driverstatus']['driverStatus']+ ' Order');
            this.events.publish('driver:receivedstatus', data, Date.now());
        });
    }

    logout(){
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
                    localStorage.removeItem('currentOwner');
                    this.nav.setRoot(LoginPage);
                    console.log('Saved clicked');
                }
            }
            ]
        });
        prompt.present();
    }
}
