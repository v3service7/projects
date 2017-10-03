import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { PromotionsService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

@Component({
  selector: 'page-promotion',
  templateUrl: 'promotiondetail.html',
})
export class PromotionDetailPage {

	constructor(
        public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
		public navCtrl: NavController,
        private promotionsService: PromotionsService,
		public navParams: NavParams
		) {
  	}

	ionViewDidLoad() {}

}
