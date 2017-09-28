import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenMenuService,RestaurantsService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { ItemPage } from "../item/item"
import { RestroinfoPage } from '../restroinfo/restroinfo';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

    menus : any = [];
	tempCart : any = [];
	currentDate:any;
	restaurants:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    currentTime : string;
    imageURL: string = globalVariable.imageUrl;
    loading: any;
    cart : string;

	constructor(
        public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
		public navCtrl: NavController,
		private kitchenMenuService: KitchenMenuService,
		private restaurantsService: RestaurantsService,
		public navParams: NavParams
	){
		this.loadRestaurant('595172e2421a472120e0db5e');
	}

	ionViewDidLoad() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();

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
            this.cart = 'cart_' + id;
            this.loadAllMenu(id);
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

        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }else{
            localStorage.setItem(this.cart,'[]');
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

   private restroInfo(){
       this.nav.setRoot(RestroinfoPage);
   }

   private goToCart(){
       this.nav.setRoot(CartPage, {id : this.restaurants._id});
   }

}
