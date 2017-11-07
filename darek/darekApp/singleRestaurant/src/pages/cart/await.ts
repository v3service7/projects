import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';

import { OrderService , RestaurantsService} from '../../app/service/index';

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
    resID: string = globalVariable.resId;

	constructor(
		public navCtrl: NavController,
        public nav: Nav,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public orderServices: OrderService,
        private restaurantsService: RestaurantsService,
		) {

        this.loadRestaurant();

		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        setTimeout(()=>{
            this.loading.dismiss();
        },500)
	}

	ionViewDidLoad() {
	}

    private loadRestaurant(){
        this.restaurantsService.getOne(this.resID).subscribe(users => {
            this.restaurant = users.message;
        });
    }

    private restroImage(img){
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "assets/img/itemimage.gif";
        }
        return imgPath;
    }

	private goToMenuPage(){
		this.nav.setRoot(MenuPage);
	}

}
