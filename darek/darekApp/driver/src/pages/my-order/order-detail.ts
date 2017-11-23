import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService } from '../../app/service/index';

import { MyOrderPage } from './my-order';
import { ChangeOrderStatusPage } from './change-order-status';

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
    
    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
        this.selectedOrder = navParams.get('item');
        this.getOrders();
    }

    ionViewDidEnter() {
        this.getOrders();
    }

    private getOrders(){
        this.orderService.getDetail(this.selectedOrder._id).subscribe(users => {
            this.selectedOrder = users.message;
        });
    }

	private updateStatus(obj,driverStatus){
		let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var objUpdate = {};
        objUpdate['_id'] = obj._id;
        objUpdate['driverStatus'] = driverStatus;
        if (driverStatus == 'Accepted') {
            objUpdate['status'] = 'Pending';
        }else{
            objUpdate['driverId'] = null;
        }
        this.orderService.getUpdate(objUpdate).subscribe(
            (data) => {
                loading.dismiss();
                this.navCtrl.pop(MyOrderPage);
                if (driverStatus == 'Accepted') {
                    this.getToast('Order Accepted successfully');
                }else{
                    this.getToast('Order Rejected successfully');
                }
            }
        );
	}

    private getToast(msg){
 		let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 3000,
	      position:'top' //top,middle,bottom
	    });
	    toast.present();
 	}

    private changeStatus(){
        this.navCtrl.push(ChangeOrderStatusPage,{
            order : this.selectedOrder
        });
        /*console.log("change clicked");*/
    }
}
