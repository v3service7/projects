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
    `],
})
export class OrderDetailPage {

	selectedOrder:any;
    
    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
        this.selectedOrder = navParams.get('item')        
    }
    
    ionViewDidEnter() {
        console.log('ionViewDidEnter MyCustomerPage');
        console.log(this.selectedOrder)
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
        console.log(obj)
        this.orderService.getUpdate(obj).subscribe(
            (data) => {
                this.getOrderDetail(data.message);
                this.getToast('Order '+status+' successfully');
            }
        );
    }

	private getOrderDetail(obj){
        this.orderService.getDetail(obj._id).subscribe(
            (data) => {
                this.selectedOrder = data.message;
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
