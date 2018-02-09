import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, Nav, NavController, NavParams,ViewController,MenuController, Events,ToastController } from 'ionic-angular';
import { RestaurantsService, OrderService, DriversService  } from '../../app/service/index';

import { OrderDetailPage } from './order-detail';

import { ModalContentPage } from './filter-page';


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

	currentDriver:any;
	restaurants:any ={};
    orders: Array<{}>;
	tempOrdr: Array<{}>;
    loading:any;
	filterObj:any;
    totalCash : Number = 0;
    totalTip : Number = 0;
    
    constructor(
        public menuCtrl: MenuController,
        public driversService: DriversService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private orderService: OrderService,
        public events: Events,
        public toastCtrl: ToastController,
        public modalCtrl: ModalController
        ) {
 		/*this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/

        this.getOrderAgain();
        /*this.getOrders();*/
        this.menuCtrl.enable(true);
    }

    getOrderAgain(){
        this.events.subscribe('order:receivedorder', (order,time) => {
            this.getOrders();
        });
    }

    presentActionSheet() {
        let modal = this.modalCtrl.create(ModalContentPage, {
            firstDate : this.tempOrdr[this.tempOrdr.length-1]['created_at']
        });
        modal.onDidDismiss(data => {
            console.log(data);
            if (typeof data  != 'undefined') {
                this.filterObj = data;
                this.filterItems(this.filterObj);
            }
            console.log("this.filterObj");
            console.log(this.filterObj);
        });
        modal.present();
    }

	ionViewDidEnter() {
        this.currentDriver = JSON.parse(localStorage.getItem('currentDriver'));
        this.getOrders();
    }

    private getOrders(){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

        this.driversService.myOrder(this.currentDriver['_id']).subscribe(users => {
            if (!users.error) {
                this.orders = users.message;
                this.tempOrdr = users.message;

                if (this.orders.length > 0) {
                    for (var i = 0; i < this.orders.length; i++) {
                        let startDate = this.tempOrdr[i]['created_at'];
                        let startDate1 = startDate.split('T');
                        this.tempOrdr[i]['created_at'] =  startDate1[0];
                    }

                    this.getCalculation();
                }else{
                    this.loading.dismiss();
                }
            }else{
                this.loading.dismiss();
                this.getToast('No Orders Yet!');
            }
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


    private detailBackground(order){
        if (order.driverStatus) {
            if (order.driverStatus == 'Assigned') {
                return {'background' : '#c7eafc'};
            }

            if (order.driverStatus == 'Accepted' || order.status == 'Pending') {
                return {'background' : 'rgba(5, 245, 76, 0.13)'};
            }

            if (order.driverStatus == 'Delivered' || order.status == 'Completed') {
                return {'background' : 'white'};
            }
        }else{
            return {'background' : 'white'};
        }
    }

    private cleintDetail(obj){
    	this.navCtrl.push(OrderDetailPage, {
	    	item: obj
	    });
    }

	doRefresh(refresher) {
		setTimeout(() => {
			this.getOrders();
			refresher.complete();
		}, 2000);
	}

    /*private presentActionSheet() {
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
    }*/

    getCalculation(){
        this.totalCash = 0;
        this.totalTip = 0;

        console.log("this.orders");
        console.log(this.orders);

        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i]['driverStatus'] == 'Delivered') {  /*|| this.orders[i]['driverStatus'] == 'Accepted'*/
                if (typeof this.orders[i]['orderPayment'] != 'undefined' && this.orders[i]['orderPayment'].cash) {
                    this.totalCash = this.totalCash + this.orders[i]['gTotal'];
                }

                if (typeof this.orders[i]['tip'] != 'undefined') {
                    this.totalTip = this.totalTip + this.orders[i]['tip'];
                }
            }
        }
        this.loading.dismiss();
    }

    private filterItems(searchTerm){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        
        this.orders = this.tempOrdr;

        let withinDate = this.orders.filter((item) => {
            return item['created_at'] >= searchTerm.startDate && item['created_at'] <= searchTerm.endDate;
        });

        if (withinDate.length > 0) {
            if (searchTerm.paymentType == 'any') {
                this.orders = withinDate;
            }
            if (searchTerm.paymentType == 'cash') {
                let ordr = withinDate.filter((item) => {
                    return item['orderPayment']['cash'] == true;
                });
                this.orders = ordr;
            }
            if (searchTerm.paymentType == 'cardinternet') {
                let ordr = withinDate.filter((item) => {
                    return item['orderPayment']['cardinternet'] == true;
                });
                this.orders = ordr;
            }
            if (searchTerm.paymentType == 'cardpickup') {
                let ordr = withinDate.filter((item) => {
                    return item['orderPayment']['cardpickup'] == true;
                });
                this.orders = ordr;
            }
            this.getCalculation();
        }else{
            this.orders = [];
            this.totalCash = 0;
            this.totalTip = 0;
            this.loading.dismiss();
        }
    }
}
