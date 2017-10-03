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
	loading: any;
	orderMissed: boolean = false;

	constructor(
		public navCtrl: NavController,
        public nav: Nav,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public orderServices: OrderService,
		) {

		this.loading = this.loadingCtrl.create({
            content: 'Please dont refresh or press back button...'
        });
        this.loading.present();
		this.order = navParams.get('order');

		this.getUpdatedOrder(this.order._id);
	}

	ionViewDidLoad() {
	}

	private getUpdatedOrder(id){
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
                        }
                        if (this.order.status == 'Rejected') {
                            this.loading.dismiss();
                            clearInterval(loopCount);
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
                    console.log('order Missed');
                });
            }
        },30000)
	}

	private goToMenuPage(){
		this.nav.setRoot(MenuPage);
	}

}
