import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
    rootPage: any = LoginPage;
    currentOwner:any;
    pages: Array<{title: string, icon:string, component: any}>;

    constructor(
        public alertCtrl: AlertController,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private localNotifications: LocalNotifications
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

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
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
