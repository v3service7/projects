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
    
    constructor(public actionSheetCtrl: ActionSheetController, public menuCtrl: MenuController,public driversService: DriversService,public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
 		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
		this.currentDriver = JSON.parse(localStorage.getItem('currentDriver'));
        this.getOrders();
        this.menuCtrl.enable(true);
    }

	ionViewDidLoad() {}

    private getOrders(){
        this.driversService.myOrder(JSON.parse(localStorage.getItem('currentDriver'))._id).subscribe(users => {
          this.orders = users.message;
          this.tempOrdr = users.message;
          this.loading.dismiss();
        });
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
             title: 'Status',
             buttons: [
             {
                 text: 'Accepted',
                 handler: () => {
                     this.filterItems('Accepted');
                 }
             },{
                 text: 'Rejected',
                 handler: () => {
                     this.filterItems('Rejected');
                 }
             },{
                 text: 'Missed',
                 handler: () => {
                     this.filterItems('Missed');
                 }
             }
             ]
         });
         actionSheet.present();
     }

    private filterItems(searchTerm){
        this.orders = this.tempOrdr;
        let ordr = this.orders.filter((item) => {
            return item['status'].toLowerCase() == searchTerm.toLowerCase();
        });
        this.orders = ordr;
    }
}
