import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
//import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/profile/info';
import { MyCustomerPage } from '../pages/my-customer/my-customer';
import { MyOrderPage } from '../pages/my-order/my-order';
import { MyDriverPage } from '../pages/my-driver/my-driver';
import { MyNotificationPage } from '../pages/my-notification/my-notification';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    //rootPage: any = LoginPage;
    currentOwner:any;
    pages: Array<{title: string, component: any}>;

    constructor(public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            /*{ title: 'List', component: ListPage },*/
            { title: 'My Account', component: InfoPage },
            { title: 'Customers', component: MyCustomerPage },
            { title: 'Orders', component: MyOrderPage },
            { title: 'Drivers', component: MyDriverPage },
            { title: 'Notifications', component: MyNotificationPage },
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
