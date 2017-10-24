import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenMenuService,RestaurantsService, PromotionsService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { ItemPage } from "../item/item";
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

    menus : any = [];
    tempCart : any = [];
    restaurants:any;
    currentCustomer:any;
    imageURL: string = globalVariable.imageUrl;
    cart : string;
    loading: any;
    currentDate:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    currentTime : string;

	constructor(
        public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
		public navCtrl: NavController,
        public alertCtrl: AlertController,
		private kitchenMenuService: KitchenMenuService,
		private restaurantsService: RestaurantsService,
        private promotionsService: PromotionsService,
		public navParams: NavParams
	){}

	ionViewDidLoad() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
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
        this.loading.present();
        this.loadRestaurant('595172e2421a472120e0db5e');
	}

    ionViewDidEnter(){
        if(localStorage.getItem('currentCustomer')){
            this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        }
        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }else{
            localStorage.setItem(this.cart,'[]');
        }
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.loadAllMenu(this.restaurants._id);
            refresher.complete();
        }, 2000);
    }

	private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

    private loadRestaurant(id){
    	this.restaurantsService.getOne(id).subscribe(users => {
            this.restaurants = users.message;
            localStorage.setItem('restaurant',JSON.stringify(this.restaurants));
            this.cart = 'cart_' + id;
            this.loadAllMenu(id);

            if (localStorage.getItem(this.cart)) {
                this.tempCart = JSON.parse(localStorage.getItem(this.cart));
            }else{
                localStorage.setItem(this.cart,'[]');
            }
        });
    }

	private checkMenuItemShow(obj){
        if (obj.isSpecific) {
            if (obj.openinghours.opentime <= this.currentTime && obj.openinghours.closetime >= this.time) {
                if ((obj.openinghours.monday == true) && ('monday' == this.day)) {
                    return 'block';
                }else if ((obj.openinghours.tuesday == true) && ('tuesday' == this.day)) {
                    return 'block';
                }else if (obj.openinghours.wednesday == true && 'wednesday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.thursday == true && 'thursday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.friday == true && 'friday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.saturday == true && 'saturday' == this.day) {
                    return 'block';
                }else if (obj.openinghours.sunday == true && 'sunday' == this.day) {
                    return 'block';
                }else{
                    return 'none';
                }
            }else{
                return 'none';
            }
        }else{
            return 'block';
        }
    }

	private loadAllMenu(id){
        this.menus = [];
		this.kitchenMenuService.getAll(id).subscribe(users => {       
			if(!users.error){
				if (users.message.length > 0) {
					this.loading.dismiss();
					for(var i = 0; i < users.message.length; i++) {
						if (users.message[i]['isHidden'] == false ) {
							var display = this.checkMenuItemShow(users.message[i]);
							if (display == 'block') {
			            		this.menus.push(users.message[i]);
							}
						}
					}
				}else{
					this.loading.dismiss();
					this.getToast('No Menu Availavle Now!');
				}
			}else{
				this.loading.dismiss();
				this.getToast('Something Went Wrong!');
			}
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

    private menuImage(img){
       if (img != null) {
           var imgPath = this.imageURL + img;
       }
       if (img == null) {
           var imgPath = "../assets/img/menu.jpg";
       }
       return imgPath;
    }

    private showItems(menu){
        this.navCtrl.push(ItemPage, {
            menu : menu
        });
    }
    private goToCart(){
        this.nav.setRoot(CartPage);
    }
}
