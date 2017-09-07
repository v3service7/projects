import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';

import { CustomerDetailPage } from './customer-detail';

/**
 * Generated class for the MyCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-customer',
  templateUrl: 'my-customer.html',
})
export class MyCustomerPage {

	currentOwner:any={};
	restaurants:any ={};
	client: Array<{}>;
	loading:any;
    
    constructor(public modalCtrl: ModalController,public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
 		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad MyCustomerPage');
	}

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getClient(this.restaurants._id);
        });
    }

    private getClient(id){
        this.orderService.client(id).subscribe(users => { 
            this.client = users.message;
            this.loading.dismiss();
        });
    }

    private cleintDetail(event,obj){
    	let modal = this.modalCtrl.create(CustomerDetailPage, {'cusDetail':obj});
    	modal.present();
    }

	doRefresh(refresher) {
		setTimeout(() => {
			this.getClient(this.restaurants._id);
			refresher.complete();
		}, 2000);
	}
}
