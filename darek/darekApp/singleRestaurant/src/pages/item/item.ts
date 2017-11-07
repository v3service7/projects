import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenItemService,CustomersService } from '../../app/service/index';

import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';
import { ItemDetailPage } from './itemDetail';
import { CartPage } from '../cart/cart';

@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
})

export class ItemPage {

    currentCustomer : any;
    menu : any = {};
    items : any = [];
    tempCart : any = [];
    currentDate:any;
    date : any;
    time : any;
    day : any;
    cart : string;
    completeDate : string;
    currentTime : string;
    imageURL: string = globalVariable.imageUrl;
    resID: string = globalVariable.resId;
    loading: any;

    spicyArray : any = [1,2,3];

    constructor(
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        private viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public customerService: CustomersService,
        public alertCtrl: AlertController,
        public nav: Nav,
        private kitchenItemService: KitchenItemService,
        public navParams: NavParams
        ) {
        this.menu = navParams.get('menu');
    }

    ionViewDidEnter() {
        this.cart = 'cart_' + this.resID;
        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }
        this.getCustomer();
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

    private getCustomer(){
        var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        if (tempCurrentCustomer) {
            this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(cust=>{
                this.currentCustomer = cust.message;
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer',JSON.stringify(this.currentCustomer));
            });
        }
    }

    private isFavOrNot(id){
        if (this.currentCustomer) {
            let wIndex = this.currentCustomer.wishlist.indexOf(id);
            if (wIndex == -1) {
                return {'color':'#999'};
            }else{
                return {'color':'red'};
            }
        }
    }

    private makeFav(id){
        let wIndex = this.currentCustomer.wishlist.indexOf(id);
        if (wIndex == -1) {
            this.currentCustomer.wishlist.push(id);
            this.getItems(this.menu._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(cust=>{
                console.log(cust)
            });
        }else{
            this.currentCustomer.wishlist.splice(wIndex,1);
            this.getItems(this.menu._id);
            console.log(this.currentCustomer)
            this.customerService.updateCustomer(this.currentCustomer).subscribe(cust=>{
            });
        }
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
            var imgPath = "assets/img/itemimage.gif";
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

    private tapEvent($event,item){
        this.navCtrl.push(ItemDetailPage, {
            item : item, type : 'cartItem', iG : null
        });
    }

    private goToCart(){
        this.nav.setRoot(CartPage);
    }
}
