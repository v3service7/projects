import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController,AlertController } from 'ionic-angular';
import { PromotionsService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';

import { PromotionDetailPage } from './promotiondetail';

@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {
	currentDate:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    restroPromotions : any = [];
    imageURL: string = globalVariable.imageUrl;
    resId: string = globalVariable.resId;
    currentTime : string;
    promotionString : string;
    couponString : string;
    loading: any;

	constructor(
        public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
		public navCtrl: NavController,
        private promotionsService: PromotionsService,
		public navParams: NavParams,
        public alertCtrl: AlertController
		) {
  	}

	ionViewDidLoad() {
        this.promotionString = 'promotion_' + this.resId;
        this.couponString = 'coupon_' + this.resId;
  		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.loadAllRestroPromotions();
		this.currentDate = new Date();
        this.date = this.currentDate.toLocaleDateString();
        var h = this.addZero(this.currentDate.getHours());
        var m = this.addZero(this.currentDate.getMinutes());
        var s = this.addZero(this.currentDate.getSeconds());


        var date = this.addZero(this.currentDate.getDate());
        var month = this.addZero(this.currentDate.getMonth()+1);
        var year = this.currentDate.getFullYear();
        
        this.currentTime = h+':'+m;

        this.completeDate = date+'-'+month+'-'+year;


        this.time = h+':'+m +':'+ s;

        var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        this.day = days[this.currentDate.getDay()];
  	}

	private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private loadAllRestroPromotions(){
    	this.restroPromotions = [];
        this.promotionsService.getRestroPromotions(this.resId).subscribe(data => {
        	if (!data.error) {
        		this.loading.dismiss();
	            for (var i = 0; i < data.message.length; i++) {
	                if (data.message[i].status == true) {
	                    var returnValue = this.displayPromotion(data.message[i]);
	                    if (returnValue == 'block') {
	                        this.restroPromotions.push(data.message[i]);
	                    }
	                }
	                console.log("this.restroPromotions");
	                console.log(this.restroPromotions);
	            }
        	}else{
        		this.loading.dismiss();
        		this.getToast('Something Went Wrong');
        		this.nav.setRoot(MenuPage);
        	}
        });
    }

    private displayPromotion(promo){
        if ((this.completeDate >= promo.discountTiming[0].available.from && this.completeDate <= promo.discountTiming[0].available.till) || promo.discountTiming[0].available == 'unlimited') {
            for (var i in promo.discountTiming[0].days) {
                if (this.day == i) {
                    var ch = i+'time';
                    if (typeof promo.discountTiming[0].days[ch] !=  'undefined') {
                        if (promo.discountTiming[0].days[ch]['opentime'] <= this.currentTime && promo.discountTiming[0].days[ch]['closetime'] >= this.currentTime) {
                            return 'block';
                        }
                    }
                    if (typeof promo.discountTiming[0].days[ch] == 'undefined') {
                        return 'block';
                    }
                }
            }
        }else{
            return 'none';
        }
    }

	private getToast(msg){
    	let toast = this.toastCtrl.create({
	        message: msg,
	        duration: 3000,
	        position:'top' //top,middle,bottom
	    });
	    toast.present();
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.loadAllRestroPromotions();
            refresher.complete();
        }, 2000);
    }

    private getDeal(promo){
        console.log("promo");
        console.log(promo);
        if (localStorage.getItem(this.promotionString) || localStorage.getItem(this.couponString)) {
            var alert = this.alertCtrl.create({
                title: 'Remainder',
                message: 'Adding Another Deal will remove previous deals added',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Ok',
                        handler: () => {
                            localStorage.removeItem(this.promotionString);
                            localStorage.removeItem(this.couponString);
                            //localStorage.setItem('promo',JSON.stringify(promo));
                            this.navCtrl.push(PromotionDetailPage,{
                                promo : promo
                            });
                        }
                    }
                ]
            });
            alert.present();
        }else{
            localStorage.setItem('promo',JSON.stringify(promo));
            this.navCtrl.push(PromotionDetailPage,{
                promo : promo
            });
        }
    }

}
