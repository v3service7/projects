import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SocketService } from './service/socket.service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
//import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';
import { MyCustomerPage } from '../pages/my-customer/my-customer';
import { MyOrderPage } from '../pages/my-order/my-order';
import { MyDriverPage } from '../pages/my-driver/my-driver';
import { RatingPage } from '../pages/rating/rating';
import { MyNotificationPage } from '../pages/my-notification/my-notification';




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
        public backgroundMode: BackgroundMode
        ) {
        this.initializeApp();

        // Schedule multiple notifications
        /*this.localNotifications.schedule([{
                id: 1,
                text: 'Multi ILocalNotification 1',
                //sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
                //data: { secret:key }
            },{
                id: 2,
                title: 'Local ILocalNotification Example',
                text: 'Multi ILocalNotification 2',
                icon: 'http://example.com/icon.png'
            }
        ]);*/

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', icon: 'home', component: HomePage },
            { title: 'Account', icon: 'contact', component: InfoPage },
            { title: 'Customers', icon: 'people', component: MyCustomerPage },
            { title: 'Orders', icon: 'cart', component: MyOrderPage },
            { title: 'Drivers', icon: 'people', component: MyDriverPage },
            { title: 'Rating', icon: 'star-half', component: RatingPage },
            { title: 'Notifications', icon: 'notifications', component: MyNotificationPage },
        ];

        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.orderReceivedToCustomer();
        this.orderResponseDriverToOwner();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
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
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    orderReceivedToCustomer(){
        this.socketService.orderReceivedToCustomer().subscribe((data) =>{
            console.log("customer Send Order", data);
            
            if(data){
                this.pushNot('Order recieved','one new order revived');
                this.events.publish('order:receivedorder', data, Date.now());
                this.orders = 1;    
            }
        });
    }

    orderResponseDriverToOwner(){
        this.socketService.orderResponseDriverToOwner().subscribe((data) =>{
            console.log("Driver response for Order", data);
            this.pushNot('Driver response','Driver send response');
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
