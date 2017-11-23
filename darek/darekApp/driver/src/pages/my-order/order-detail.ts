import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService } from '../../app/service/index';

import { MyOrderPage } from './my-order';

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
    .statusButton{
        height: auto;
        padding: 5%;
        font-size: 10px;
    }
    `],
})
export class OrderDetailPage {

	selectedOrder:any;
    
    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
        this.selectedOrder = navParams.get('item');

        console.log("this.selectedOrder");
        console.log(this.selectedOrder);
    }

	ionViewDidLoad() {}

	private updateStatus(obj,status){
		let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var objUpdate = {};
        objUpdate['_id'] = obj._id;
        objUpdate['status'] = status;
        objUpdate['driverId'] = null;
        this.orderService.getUpdate(objUpdate).subscribe(
            (data) => {
                loading.dismiss();
                this.navCtrl.pop(MyOrderPage);
                if (status == 'Pending') {
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
}
