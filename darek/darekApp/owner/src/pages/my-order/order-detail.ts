import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController,AlertController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService } from '../../app/service/index';

import { MyOrderPage } from './my-order';
import { AssignOrderPage } from './assign-order';
//import {  OrderDetailPage } from './order-detail';
/**
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

	selectedOrder:any;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
        this.selectedOrder = navParams.get('item');

        console.log("this.selectedOrder");
        console.log(this.selectedOrder);
    }
    
    ionViewDidEnter() {
        /*console.log('ionViewDidEnter MyCustomerPage');
        console.log(this.selectedOrder)*/
        this.getOrderDetail(this.selectedOrder);
    }

	ionViewDidLoad() {
	}

    private rejectPrompt(obj,status) {
        let prompt = this.alertCtrl.create({
            title: 'Oreder '+status,
            message: "Enter a message ",
            inputs: [
                {
                    name: 'Message',
                    placeholder: 'Message'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        var objUpdate = {};
                        objUpdate['_id'] = obj._id;
                        objUpdate['status'] = status;
                        objUpdate['custMessage'] = data.Message;
                        this.updateStatus(objUpdate);
                    }
                }
            ]
        });
        prompt.present();
    }

    private acceptPrompt(obj,status) {
        let prompt = this.alertCtrl.create({
            title: 'Oreder '+status,
            message: "Enter a Time ",
            inputs: [
                {
                    name: 'Message',
                    placeholder: 'Message',
                    type:'time'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        var objUpdate = {};
                        objUpdate['_id'] = obj._id;
                        objUpdate['status'] = status;
                        objUpdate['custTime'] = data.Message;
                        this.updateStatus(objUpdate);
                    }
                }
            ]
        });
        prompt.present();
    }

    private updateStatus(obj){
        /*console.log(obj)*/
        this.orderService.getUpdate(obj).subscribe(
            (data) => {
                /*console.log(data.message);*/
                this.getOrderDetail(obj);
                this.getToast('Order '+ obj.status +' successfully');
            }
        );
    }

	private getOrderDetail(obj){
        this.orderService.getDetail(obj._id).subscribe(
            (data) => {
                /*console.log(data.message)*/
                this.selectedOrder = data.message;
                /*console.log(this.selectedOrder)*/
        });
	}

	private assignOrder(event,obj){
		this.navCtrl.push(AssignOrderPage, {
            order: obj
        });
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
