import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events, ActionSheetController ,ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController, AlertController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';

import { OrderDetailPage } from './order-detail';
/**
* Generated class for the MyOrderPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
    selector: 'page-my-order',
    templateUrl: 'my-order.html',
})
export class MyOrderPage {

    currentOwner:any={};
    restaurants:any ={};
    orders: Array<{}>;
    tempOrdr: Array<{}>;
    loading:any;

    constructor(
        public actionSheetCtrl: ActionSheetController,
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController, 
        public navParams: NavParams,
        public restaurantsService: RestaurantsService,
        public orderService: OrderService,
        public alertCtrl: AlertController,
        public events: Events
        ){
        this.getOrderAgain();
    }

    getOrderAgain(){
        this.events.subscribe('order:receivedorder', (order,time) => {
            this.getRestaurants();
        });

        this.events.subscribe('driver:receivedstatus', (order,time) => {
            console.log("order");
            console.log(order);
            console.log(order.Driverstatus['_id']);

            let alert = this.alertCtrl.create({
                title: 'Message',
                subTitle: '<p> Order Id : ' + order['Driverstatus']['_id'].substr(18,6) + '</p> <p> Order Status : ' + order['Driverstatus']['status'] + '</p> <p> Driver Status : ' + order['Driverstatus']['driverStatus'],
                buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.getRestaurants();
                    }
                }]
            });
            alert.present();
        });
    }

    ionViewDidEnter() {
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyCustomerPage');
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getOrders(this.restaurants._id);
        });
    }

    private getOrders(id){

        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();


        this.orderService.orders(id).subscribe(users => {
            this.orders = users.message;
            this.tempOrdr = users.message;
            this.loading.dismiss();
        });
    }

    private cleintDetail(event,obj){
        this.navCtrl.push(OrderDetailPage, {
            item: obj
        });
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getRestaurants();
            refresher.complete();
        }, 2000);
    }

    private presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Status',
            buttons: [
            {
                text: 'Accepted',
                handler: () => {
                    this.filterItems('Accepted');
                }
            },{
                text: 'Rejected',
                handler: () => {
                    this.filterItems('Rejected');
                }
            },{
                text: 'Missed',
                handler: () => {
                    this.filterItems('Missed');
                }
            }
            ]
        });
        actionSheet.present();
    }

    private filterItems(searchTerm){
        this.orders = this.tempOrdr
        let ordr = this.orders.filter((item) => {
            /*console.log(item['status'].toLowerCase() == searchTerm.toLowerCase());*/
            return item['status'].toLowerCase() == searchTerm.toLowerCase();
        });
        this.orders = ordr;
    }
}
