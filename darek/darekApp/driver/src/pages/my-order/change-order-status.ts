import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, NavController, NavParams,ViewController,MenuController,AlertController } from 'ionic-angular';
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
    templateUrl: 'change-order-status.html',
})
export class ChangeOrderStatusPage {

	selectedOrder:any;
    tipForm : FormGroup;
    
    constructor(
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private orderService: OrderService,
        public alertCtrl: AlertController,
        private lf: FormBuilder
        ) {
        this.selectedOrder = navParams.get('order');
        
        this.tipForm = this.lf.group({
            _id: ['', Validators.required],
            tip: ['', [Validators.required]],
         });
        this.getOrders();
    }

    private getOrders(){
        this.orderService.getDetail(this.selectedOrder._id).subscribe(users => {
            this.selectedOrder = users.message;

            this.tipForm.controls['_id'].setValue(this.selectedOrder._id)
        });
    }

	ionViewDidLoad() {}

	private changeStatus(){
        let confirm = this.alertCtrl.create({
            title: 'Order Delivered?',
            message: "Update Order Status from 'Pending' to 'Completed'?",
            buttons: [
            {
                text: 'Disagree',
                handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'Agree',
                handler: () => {
                    var objUpdate = {};
                    objUpdate['_id'] = this.selectedOrder._id;
                    objUpdate['driverStatus'] = 'Delivered';
                    objUpdate['status'] = 'Completed';
                    this.orderService.getUpdate(objUpdate).subscribe(
                        (data) => {
                            this.getOrders();
                            this.getToast('Order Status Updated successfully');
                        }
                    );
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

    private addTip(){
        this.orderService.getUpdate(this.tipForm.value).subscribe(
            (data) => {
                this.getOrders();
                this.getToast('Tip Updated!');
            }
        );
    }
}
