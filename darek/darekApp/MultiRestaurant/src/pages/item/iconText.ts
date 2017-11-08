import { Component } from '@angular/core';
import { AlertController , ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';

/*import { ProfilePage } from '../profile/profile';*/
import { MenuPage } from '../menu/menu';

@Component({
    template: '<ion-tabs><ion-tab tabIcon="call" [root]="tabOne" tabBadge="3" tabBadgeStyle="danger"></ion-tab><ion-tab tabIcon="chatbubbles" [root]="tabTwo" tabBadge="14" tabBadgeStyle="danger"></ion-tab><ion-tab tabIcon="musical-notes" [root]="tabThree"></ion-tab></ion-tabs>',
})



/*<ion-header><ion-navbar><button ion-button menuToggle><ion-icon name="menu"></ion-icon></button></ion-navbar></ion-header>*/




export class IconTextPage {
  tabOne = MenuPage;
  tabThree = MenuPage;
}

