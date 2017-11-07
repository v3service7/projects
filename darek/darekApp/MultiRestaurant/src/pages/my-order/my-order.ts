import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController ,ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';

import { OrderDetailPage } from './order-detail';


 @Component({
     selector: 'page-my-order',
     templateUrl: 'my-order.html',
 })
 export class MyOrderPage {

     currentCustomer:any={};
     orders: Array<{}>;
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
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.getOrders(this.currentCustomer._id);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyCustomerPage');
    }

     private getOrders(id){
         this.orderService.customerOrders(id).subscribe(users => { 
             console.log("users.message");
             console.log(users.message);
             this.orders = users.message;
             this.loading.dismiss();
         });
     }

     private orderDetail(obj){
         this.navCtrl.push(OrderDetailPage, {
             item: obj
         });
     }

     doRefresh(refresher) {
         setTimeout(() => {
             this.getOrders(this.currentCustomer._id);
             refresher.complete();
         }, 2000);
     }
 }
