import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController,AlertController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService } from '../../app/service/index';

import { MyOrderPage } from './my-order';
import { CartPage } from '../cart/cart';

import * as globalVariable from "../../app/global";

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
  styles: [` 
  ion-item{     
  padding-left: 0px !important ;    
    } 
    p{
        margin-bottom: 10px;
    }
    .white{
        color:#fff;
    }
    ion-label {
        margin: 0px !important;
    }
    .label-ios {
        margin: 0px !important;
    }
    .label-md {
        margin: 0px !important;
    }
    .wrap{
        white-space: normal;
    }
    .statusButton{
        height: auto;
        padding: 5%;
        font-size: 10px;
    }
    `],
})
export class OrderDetailPage {

	selectedOrder:any;
    cartString : string;
    subTotalString : string;
    cartStorageString : string;
    promotionString : string;
    coupon : string;
    resId: string = globalVariable.resId;
    
    constructor(
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public nav: Nav,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {
        this.selectedOrder = navParams.get('item');
        this.getOrderDetail();
        this.cartString = 'cart_' + this.resId;
        this.subTotalString = 'subTotal_' + this.resId;
        this.cartStorageString = 'cartStorage_' + this.resId;
        this.promotionString = 'promotion_' + this.resId;
        this.coupon = 'coupon_' + this.resId;
    }

    getOrderDetail(){
        this.orderService.getDetail(this.selectedOrder._id).subscribe((data)=>{
            if (!data.error) {
                this.selectedOrder = data.message;
            }
        })
    }
    
    ionViewDidEnter() {
        console.log('ionViewDidEnter MyCustomerPage');
        console.log(this.selectedOrder)
    }

    reorder(selectedOrder){
        let ordrs = JSON.parse(localStorage.getItem(this.cartString));
        let promotion = JSON.parse(localStorage.getItem(this.promotionString));
        if((ordrs && ordrs.length > 0) || promotion){
            let confirm = this.alertCtrl.create({
                title: 'Confirm!',
                message: 'Reordering will Remove your current cart items!',
                buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        localStorage.removeItem(this.cartString);
                        localStorage.removeItem(this.subTotalString);
                        localStorage.removeItem(this.promotionString);
                        localStorage.removeItem(this.cartStorageString);
                        localStorage.removeItem(this.coupon);
                        
                        localStorage.setItem(this.cartString, JSON.stringify(this.selectedOrder.orders));
                        this.addOrder();
                    }
                }
                ]
            });
            confirm.present();
        }else{
            let confirm = this.alertCtrl.create({
            title: 'Confirm!',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        localStorage.setItem(this.cartString, JSON.stringify(this.selectedOrder.orders))
                        this.addOrder();
                    }
                }]
            });

            confirm.present();
        }
    }

    addOrder(){
        let cartTotalAmount = 0;
        for (var i = 0; i < this.selectedOrder.orders.length; i++) {
            cartTotalAmount = cartTotalAmount + this.selectedOrder.orders[i].totalPrice;
            localStorage.setItem(this.subTotalString,JSON.stringify(cartTotalAmount))
        }
        this.getToast('Order Added to your Cart');
        /*this.navCtrl.pop(MyOrderPage);*/
        this.nav.setRoot(CartPage);
    }

    cancelOrder(id){
        let confirm = this.alertCtrl.create({
            title: 'Confirm!',
            /*message: 'Reordering will Remove your current cart items!',*/
            buttons: [
            {
                text: 'Cancel',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    let obj4Update = {};
                    obj4Update['id'] = id;
                    obj4Update['status'] = 'Canceled';
                    this.orderService.getUpdate(obj4Update).subscribe((data)=>{
                        if (!data.error) {
                            this.getOrderDetail();
                            this.getToast('Order Canceled!');
                        }
                    })
                }
            }
            ]
        });
        confirm.present();
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }
}
