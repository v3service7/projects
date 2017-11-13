import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CustomersService } from '../../app/service/index';
import * as globalVariable from "../../app/global";
import { ItemDetailPage } from './../item/itemDetail';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

	items=[];
	imageURL: string = globalVariable.imageUrl;

  	constructor(
  		public navCtrl: NavController, 
        public customerService: CustomersService,
        public navParams: NavParams) {
  	}


    ionViewDidEnter() {
        this.getCustomer();
    }

    private getCustomer(){
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        this.customerService.getOneCustomerWishlist(tempCurrentCustomer['_id']).subscribe(cust=>{
            this.items = cust.message.wishlist
           
        });
    }

    private itemImage(img){
        if (img != null) {
            var imgPath = this.imageURL + img;
        }
        if (img == null) {
            var imgPath = "assets/img/itemimage.gif";
        }
        return imgPath;
    }

    private tapEvent($event,item){
        this.navCtrl.push(ItemDetailPage, {
            item : item, type : 'cartItem', iG : null
        });
    }
}
