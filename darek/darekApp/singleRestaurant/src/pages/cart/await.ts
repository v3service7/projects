import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';

import { OrderService } from '../../app/service/index';

@Component({
	selector: 'page-await',
	templateUrl: 'await.html',
})
export class AwaitPage {
    order : any = {};
	restaurant : any = {};
	loading: any;
	orderMissed: boolean = false;
    imageURL: string = globalVariable.imageUrl;

	constructor(
		public navCtrl: NavController,
        public nav: Nav,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public orderServices: OrderService,
		) {

		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        setTimeout(()=>{
            this.loading.dismiss();
        },500)
        this.restaurant = JSON.parse(localStorage.getItem('restaurant'));
		/*this.order = navParams.get('order');

		this.getUpdatedOrder(this.order._id);*/
	}

	ionViewDidLoad() {
	}

    private restroImage(img){
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "../assets/img/itemimage.gif";
        }
        return imgPath;
    }

	/*private getUpdatedOrder(id){
		var count = 0;
        var loopCount = setInterval(() => {
            count++;
            if(count < 6){
                this.orderServices.getDetail(id).subscribe(data=>{
                    this.order = data.message;
                    if (data.error == false) {
                        if (this.order.status == 'Accepted') {
                        	this.loading.dismiss();
                            clearInterval(loopCount);
                            this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                                console.log("data.message");
                                console.log(data.message);
                            })
                        }
                        if (this.order.status == 'Rejected') {
                            this.loading.dismiss();
                            clearInterval(loopCount);
                            this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                                console.log("data.message");
                                console.log(data.message);
                            })
                        }
                    }
                });
            }
            if (count >= 6){
                this.loading.dismiss();
                clearInterval(loopCount);
                var obj = {}
                obj['id'] = this.order._id;
                obj['status'] = 'Missed';
                this.orderMissed = true;
                this.orderServices.getUpdate(obj).subscribe(data=>{
                    if (!data.error) {
                        this.orderServices.shootMailToCustomer(this.order._id).subscribe((data)=>{
                            console.log("data.message");
                            console.log(data.message);
                        })
                    }
                });
            }
        },30000)
	}*/

	private goToMenuPage(){
		this.nav.setRoot(MenuPage);
	}

}
