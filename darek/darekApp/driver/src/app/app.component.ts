import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { InfoPage } from '../pages/profile/info';
import { MyOrderPage } from '../pages/my-order/my-order';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    currentDriver:any;
    pages: Array<{title: string, icon:string, component: any}>;

    constructor(public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        this.pages = [
            { title: 'Home', icon: 'home', component: HomePage },
            { title: ' Account', icon: 'contact', component: InfoPage },
            { title: 'Orders', icon: 'cart', component: MyOrderPage },
        ];

        this.currentDriver = JSON.parse(localStorage.getItem('currentDriver'));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
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
                    localStorage.removeItem('currentDriver');
                    this.nav.setRoot(LoginPage);
                    console.log('Saved clicked');
                }
            }
            ]
        });
        prompt.present();
    }
}
