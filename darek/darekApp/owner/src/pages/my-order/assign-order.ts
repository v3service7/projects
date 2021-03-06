import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService, DriversService, SocketService } from '../../app/service/index';

import { MyOrderPage } from './my-order';
import { OrderDetailPage } from './order-detail';

/**
* Generated class for the MyDriverPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
    selector: 'page-assign-order',
    templateUrl: 'assign-order.html',
})
export class AssignOrderPage {

    currentOwner:any={};
    restaurants:any ={};
    selectedOrder:any ={};
    drivers: Array<{}>;
    loading:any;
    driverForm: FormGroup;

    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public orderService: OrderService,
        private lf: FormBuilder,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private driversService: DriversService,
        public socketService : SocketService
        ) {
        this.selectedOrder = navParams.get('order');

        //this.getOrders();

        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getDrivers(this.selectedOrder.restaurantId._id);
        this.driverForm = this.lf.group({
            driverId: ['', Validators.required],
        });
    }

    private getOrders(){
        this.orderService.getDetail(this.selectedOrder._id).subscribe(users => {
            this.selectedOrder = users.message;

            this.socketService.orderActionbyOwnerForDriver(this.selectedOrder);
            this.navCtrl.pop();
            this.getToast('Order Assigned to Driver successfully');
        });
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getDrivers(this.restaurants._id);
        });
    }

    private driverAssign(event,driver) {
        console.log(driver);
        console.log(this.selectedOrder);
    }

    doSubmit(event) {
        var objUpdate = {};
        objUpdate['_id'] = this.selectedOrder._id;
        objUpdate['driverId'] = this.driverForm.value.driverId;
        objUpdate['driverStatus'] = 'Assigned';

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.orderService.getUpdate(objUpdate).subscribe((data) => {
            loading.dismiss();
            this.getOrders();
            
        });
        /*console.log('Submitting form', objUpdate);*/
    }

    private getDrivers(resID){
        this.driversService.getRestaurantDrivers(resID).subscribe(
            (users) => { 
                this.drivers = users.message; 
                this.loading.dismiss();
            },
            (err)=>{
                this.loading.dismiss();
                this.getToast('Some thing went wrong! Try Later.');
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


    ionViewDidLoad() {
        console.log('ionViewDidLoad MyDriverPage');
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getDrivers(this.restaurants._id);
            refresher.complete();
        }, 2000);
    }

}
