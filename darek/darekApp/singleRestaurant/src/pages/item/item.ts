import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenItemService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})

export class ItemPage {

	menu : any = {};
	items : any = [];
	currentDate:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    currentTime : string;
    imageURL: string = globalVariable.imageUrl;
    loading: any;

	constructor(
  		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
      public navCtrl: NavController,
  		public nav: Nav,
  		private kitchenItemService: KitchenItemService,
  		public navParams: NavParams
  	) {
  		this.menu = navParams.get('menu');
  		console.log("this.menu");
  		console.log(this.menu);

  		this.getItems(this.menu._id);
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

	private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

   private itemImage(img){
    	if (img != null) {
           var imgPath = this.imageURL + img;
       	}
       	if (img == null) {
           var imgPath = "../assets/img/itemimage.gif";
       	}
       	return imgPath;
   }


    doRefresh(refresher) {
        setTimeout(() => {
            this.getItems(this.menu._id);
            refresher.complete();
        }, 2000);
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

  	private getItems(id){
		this.kitchenItemService.getMenuItem(id).subscribe(users => {       
			if(!users.error){

				
				if (users.message.length > 0) {
					this.items = [];
					for(var i = 0; i < users.message.length; i++) {
						var display = this.checkMenuItemShow(users.message[i]);
						if (display == 'block') {
		            		this.items.push(users.message[i]);
						}
						console.log("this.items");
						console.log(this.items);
					}
					this.loading.dismiss();
				}else{
					this.loading.dismiss();
          this.nav.pop(MenuPage);
					this.getToast('No Item Availavle Now!');
				}
			}else{
				this.loading.dismiss();
        this.nav.pop(MenuPage);
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
}
