import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController ,ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService, DriversService  } from '../../app/service/index';

import { OrderDetailPage } from './order-detail';
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

	currentDriver:any={};
	restaurants:any ={};
    orders: Array<{}>;
	tempOrdr: Array<{}>;
	loading:any;
    totalCash : Number = 0;
    totalTip : Number = 0;
    
    constructor(public actionSheetCtrl: ActionSheetController, public menuCtrl: MenuController,public driversService: DriversService,public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
 		/*this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/
		this.currentDriver = JSON.parse(localStorage.getItem('currentDriver'));
        /*this.getOrders();*/
        this.menuCtrl.enable(true);
    }

	ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getOrders();
    }

    private getOrders(){
        this.driversService.myOrder(JSON.parse(localStorage.getItem('currentDriver'))._id).subscribe(users => {
            this.orders = users.message;
            this.tempOrdr = users.message;

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
        });
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

    private presentActionSheet() {
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
        this.orders = this.tempOrdr;
        if (searchTerm == 'any') {
            this.orders = this.tempOrdr;
        }
        if (searchTerm == 'cash') {
            let ordr = this.orders.filter((item) => {
                return item['orderPayment']['cash'] == true;
            });
            this.orders = ordr;
        }
        if (searchTerm == 'cardinternet') {
            let ordr = this.orders.filter((item) => {
                return item['orderPayment']['cardinternet'] == true;
            });
            this.orders = ordr;
        }
        if (searchTerm == 'cardpickup') {
            let ordr = this.orders.filter((item) => {
                return item['orderPayment']['cardpickup'] == true;
            });
            this.orders = ordr;
        }

    }
}
