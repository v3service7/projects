import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/index';

import { OrderDetailPage } from './../my-order/order-detail';
/**
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-customer-detail',
     templateUrl: 'customer-detail.html',
 })
 export class CustomerDetailPage {

     selectedCustomer:any;
     myOrders:any;

     constructor(public viewCtrl: ViewController,public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
         this.selectedCustomer = this.navParams.get('cusDetail');
         this.getCustomers();
     }

    ionViewDidLoad() {
     console.log('ionViewDidLoad MyCustomerPage');
    }

    private getCustomers() {
        this.orderService.customerOrders(this.selectedCustomer._id).subscribe(users => {
            this.myOrders = users.message;
        });
    }

    private orderDetail(event,obj){
        this.navCtrl.push(OrderDetailPage, {
            item: obj
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
 }
