import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,ViewController,AlertController, Events   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketService } from './service/socket.service';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { InfoPage } from '../pages/profile/info';
import { MyOrderPage } from '../pages/my-order/my-order';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    /*rootPage: any = MyOrderPage;*/
    rootPage: any = LoginPage;
    currentDriver:any;
    pages: Array<{title: string, icon:string, component: any}>;

    constructor(
        public alertCtrl: AlertController,
        public platform: Platform,
        public statusBar: StatusBar,
        public events: Events,
        public splashScreen: SplashScreen,
        private socketService: SocketService
        ) {
        this.initializeApp();

        this.pages = [
            { title: ' Account', icon: 'contact', component: InfoPage },
            { title: 'Orders', icon: 'cart', component: MyOrderPage },
            { title: 'My Location', icon: 'home', component: HomePage }
        ];

        this.currentDriver = JSON.parse(localStorage.getItem('currentDriver'));

        this.orderReceived();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    orderReceived(){
        this.socketService.orderFromOwnerToDriver().subscribe((data) =>{
            console.log("owner Send Order To driver detail", data);
            this.events.publish('order:receivedorder', data, Date.now());
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
