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
	acceptedOrderTotal : Number = 0;
	avgAcceptedOrderTotal : Number;
	lastWeekOrderTotal : Number = 0;
	avglastWeekOrderTotal : Number;

	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
 		
		this.menuCtrl.enable(true);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getRestaurants();
		//console.log(this.currentOwner)		
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
            console.log(this.restaurants);
            this.getOverview(this.restaurants._id);
        });
    }

    private getOverview(id){
        this.orderService.overview(id).subscribe(users => { 
            this.overview = users.data;
            console.log("this.overview");
            console.log(this.overview);
            if (this.overview.totalAcceptedOrder) {
                for (var i = 0; i < this.overview.totalAcceptedOrder.length; i++) {
                    this.acceptedOrderTotal = this.acceptedOrderTotal + this.overview.totalAcceptedOrder[i].gTotal;
                }
                this.avgAcceptedOrderTotal = Number(this.acceptedOrderTotal) / Number(this.overview.totalAcceptedOrder.length);
            }
            console.log("this.overview");
            console.log(this.overview);

            if (this.overview.asPerDayOrder) {
                for (var i = 0; i < this.overview.asPerDayOrder.length; i++) {
                    this.lastWeekOrderTotal = this.lastWeekOrderTotal + this.overview.asPerDayOrder[i].gTotal;
                }
                this.avglastWeekOrderTotal = Number(this.lastWeekOrderTotal) / Number(this.overview.asPerDayOrder.length);
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
