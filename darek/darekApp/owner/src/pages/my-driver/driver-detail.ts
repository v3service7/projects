import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
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
  templateUrl: 'driver-detail.html',
})
export class DriverDetailPage {

    selectedDriver:any;
    myOrders:any;
    
    constructor(public alertCtrl: AlertController, public viewCtrl: ViewController,public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private driverService: DriversService) {
        this.selectedDriver = this.navParams.get('driverDetail');
        this.getDriver();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyCustomerPage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    private getDriver() {
        this.driverService.myOrder(this.selectedDriver._id).subscribe(users => {
            this.myOrders = users.message;
        });
    }

    
    private orderDetail(event,obj){
        this.navCtrl.push(OrderDetailPage, {
            item: obj
        });
    }

    private goToDeleteDriver(id) {
        let prompt = this.alertCtrl.create({
            title: 'Delete',
            message: "Are you sure ?",
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
                        //this.driverService.deleteOne(id).subscribe(data => {   
                            this.navCtrl.setRoot(MyDriverPage);
                            this.getToast('Driver Deleted Successfully');
                        //});
                    }
                }
            ]
        });
        prompt.present();
    }


    private goToEditDriver(event,obj){
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