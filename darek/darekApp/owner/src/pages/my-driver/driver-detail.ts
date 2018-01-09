import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController,AlertController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, DriversService } from '../../app/service/index';

import { MyDriverPage } from './my-driver';
import { EditDriverPage } from './driver-edit';
import { OrderDetailPage } from './../my-order/order-detail';

/**
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-driver-detail',
  templateUrl: 'driver-detail.html'
})
export class DriverDetailPage {

    selectedDriver:any;
    myOrders:any;
    tempOrdr:any;

    totalCash : Number = 0;
    totalTip : Number = 0;
    
    constructor(
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private driverService: DriversService,
        public actionSheetCtrl: ActionSheetController
        ) {
        this.selectedDriver = this.navParams.get('driverDetail');
        this.getDriver();
        this.getDriverOrders();
    }

    ionViewDidEnter() {
        this.selectedDriver = this.navParams.get('driverDetail');
        this.getDriver();
        this.getDriverOrders();
    }

    getDriver(){
        this.driverService.getOne(this.selectedDriver._id).subscribe((data)=>{
            this.selectedDriver = data.message;
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getDriver();
            this.getDriverOrders();
            refresher.complete();
        }, 2000);
    }


    private getDriverOrders() {
        this.driverService.myOrder(this.selectedDriver._id).subscribe(users => {
            this.myOrders = users.message;
            this.tempOrdr = users.message;

            this.totalCash = 0;
            this.totalTip = 0;

            for (var i = 0; i < this.myOrders.length; i++) {
                if (this.myOrders[i]['driverStatus'] == 'Delivered') {  /*|| this.myOrders[i]['driverStatus'] == 'Accepted'*/
                    if (typeof this.myOrders[i]['orderPayment'] != 'undefined' && this.myOrders[i]['orderPayment'].cash) {
                        this.totalCash = this.totalCash + this.myOrders[i]['gTotal'];
                    }

                    if (typeof this.myOrders[i]['tip'] != 'undefined') {
                        this.totalTip = this.totalTip + this.myOrders[i]['tip'];
                    }
                }
            }
        });
    }

    detailBackground(order){
        if (order.driverStatus) {
            if (order.driverStatus == 'Assigned') {
                return {'background' : '#c7eafc'};
            }

            if (order.driverStatus == 'Accepted' || order.status == 'Pending') {
                return {'background' : 'rgba(5, 245, 76, 0.13)'};
            }

            if (order.driverStatus == 'Delivered' || order.status == 'Delivered') {
                return {'background' : 'white'};
            }
        }else{
            return {'background' : 'white'};
        }
    }
    
    orderDetail(event,obj){
        this.navCtrl.push(OrderDetailPage, {
            item: obj
        });
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Payment Type',
            buttons: [
            {
                text: 'All',
                handler: () => {
                    this.filterItems('any');
                }
            },{
                text: 'Cash',
                handler: () => {
                    this.filterItems('cash');
                }
            },{
                text: 'Card via Internet',
                handler: () => {
                    this.filterItems('cardinternet');
                }
            },{
                text: 'Card at Delivery',
                handler: () => {
                    this.filterItems('cardpickup');
                }
            }
            ]
        });
        actionSheet.present();
    }

    private filterItems(searchTerm){
        this.myOrders = this.tempOrdr;
        if (searchTerm == 'any') {
            this.myOrders = this.tempOrdr;
        }
        if (searchTerm == 'cash') {
            let ordr = this.myOrders.filter((item) => {
                return item['orderPayment']['cash'] == true;
            });
            this.myOrders = ordr;
        }
        if (searchTerm == 'cardinternet') {
            let ordr = this.myOrders.filter((item) => {
                return item['orderPayment']['cardinternet'] == true;
            });
            this.myOrders = ordr;
        }
        if (searchTerm == 'cardpickup') {
            let ordr = this.myOrders.filter((item) => {
                return item['orderPayment']['cardpickup'] == true;
            });
            this.myOrders = ordr;
        }
    }

    goToDeleteDriver(id) {
        let prompt = this.alertCtrl.create({
            title: 'Delete Driver!',
            message: "Are you sure?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'oK',
                    handler: data => {
                        this.driverService.deleteOne(id).subscribe(data => {   
                            this.navCtrl.pop();
                            this.getToast('Driver Deleted Successfully');
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    goToEditDriver(event,obj){
        this.navCtrl.push(EditDriverPage, {
            driver: obj
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