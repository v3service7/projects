import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController ,ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
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
        public orderService: OrderService
    ){}

    ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
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
         this.orderService.orders(id).subscribe(users => { 
             console.log("users.message");
             console.log(users.message);
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
             this.getOrders(this.restaurants._id);
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
                     console.log(this.orders);
                 }
             },{
                 text: 'Rejected',
                 handler: () => {
                     this.filterItems('Rejected');
                     console.log(this.orders);
                 }
             },{
                 text: 'Missed',
                 handler: () => {
                     this.filterItems('Missed');
                     console.log(this.orders);
                 }
             }
             ]
         });
         actionSheet.present();
     }

    private filterItems(searchTerm){
        this.orders = this.tempOrdr
        let ordr = this.orders.filter((item) => {
            console.log(item['status'].toLowerCase() == searchTerm.toLowerCase());
            return item['status'].toLowerCase() == searchTerm.toLowerCase();
        });
        this.orders = ordr;
    }
 }
