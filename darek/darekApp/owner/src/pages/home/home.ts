import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	currentOwner:any;
	restaurants:any;
	orders: Array<{}>;
	loading:any;
	overview:any = {};
	acceptedOrderTotal = 0;
	avgAcceptedOrderTotal = 0;
	lastWeekOrderTotal = 0;
	avglastWeekOrderTotal =0;

	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
 		
		this.menuCtrl.enable(true);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getRestaurants();
	}

	ionViewWillEnter() {           
		this.viewCtrl.showBackButton(false);
	}

    private isLogin(){
        let isLog = localStorage.getItem('currentOwner');
        if (!isLog) {
            this.logout();
        }else{
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
            this.getRestaurants();
        }
    }
	private getRestaurants() {
		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.restaurantsService.getOwnerRestaurants(this.currentOwner._id).subscribe(users => {
            this.restaurants = users.message;
            this.getOverview(this.restaurants._id);
        });
    }

    private getOverview(id){
        this.orderService.overview(id).subscribe(users => { 
            this.overview = users.data;
            if (this.overview.totalAcceptedOrder && this.overview.totalAcceptedOrder.length > 0) {
                for (var i = 0; i < this.overview.totalAcceptedOrder.length; i++) {
                    this.acceptedOrderTotal = this.acceptedOrderTotal + this.overview.totalAcceptedOrder[i].gTotal;
                }
                this.avgAcceptedOrderTotal = this.acceptedOrderTotal / this.overview.totalAcceptedOrder.length;
            }

            if (this.overview.asPerDayOrder && this.overview.asPerDayOrder.length > 0) {
                for (var i = 0; i < this.overview.asPerDayOrder.length; i++) {
                    this.lastWeekOrderTotal = this.lastWeekOrderTotal + this.overview.asPerDayOrder[i].gTotal;
                }
                this.avglastWeekOrderTotal = this.lastWeekOrderTotal / this.overview.asPerDayOrder.length;
            }
            this.loading.dismiss();
        });
    }

	private logout(){
		localStorage.removeItem('currentOwner');
		this.navCtrl.push(LoginPage)
        .then(() => {
        	this.navCtrl.remove(this.viewCtrl.index); 
        });
	}

}
