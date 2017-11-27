import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController,AlertController } from 'ionic-angular';
import { PromotionsService, KitchenMenuService, KitchenItemService } from '../../app/service/index';

import * as globalVariable from "../../app/global";

import { ItemDetailPage } from '../item/itemDetail';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-promotion',
  templateUrl: 'promotiondetail.html',
})
export class PromotionDetailPage {

	promo : any = {};
	selectedSegment : string = 'IG1';
    imageURL: string = globalVariable.imageUrl;
	resId: string;
	menus : any = [];
	items : any = [];
	addOns : any = [];
    itemG1: any = [];
    itemG2: any = [];
	promotionItem : any = {};
	itemGroup : any = [];
	index : number;
	loading: any;
	currentDate:any;
    date : any;
    time : any;
    day : any;
    completeDate : string;
    currentTime : string;
    promotionItems : any = {};
    proId : string;
    cartSubTotal : string;
    cartTotalAmount : number = 0;

	constructor(
        public nav: Nav,
		public loadingCtrl: LoadingController,
    	public menuCtrl: MenuController,
    	private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
		public navCtrl: NavController,
        private promotionsService: PromotionsService,
        private kitchenMenuService: KitchenMenuService,
        private kitchenMenuItemService: KitchenItemService,
		public navParams: NavParams,
		public alertCtrl: AlertController
		) {


        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.promo = navParams.get('promo');
        this.resId = navParams.get('resId')
		//this.promo = JSON.parse(localStorage.getItem('promo'));
  	}

	ionViewDidEnter() {
		this.loadAllUsers(this.resId);
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

        this.proId = 'promotion_' + this.resId;
        if (localStorage.getItem(this.proId)) {
            this.promotionItem = JSON.parse(localStorage.getItem(this.proId));
        }

        this.cartSubTotal = 'subTotal_' + this.resId;

        if (localStorage.getItem(this.cartSubTotal)) {
        	this.cartTotalAmount = JSON.parse(localStorage.getItem(this.cartSubTotal));
        }

        this.loadAllPromotions(this.promo['promotionId'][0]);
	}

	private checkDisabled(){
		if (this.promo && this.promo.discountOn){
			if (this.promo.discountOn.length == 1 && typeof this.promotionItem['itemGroup1'] != 'undefined') {
				return false;
			}else if (this.promo.discountOn.length == 2 && typeof this.promotionItem['itemGroup1'] != 'undefined' && typeof this.promotionItem['itemGroup2'] != 'undefined') {
				return false;
			}else{
				return true;
			}
		}
	}

	private addZero(i) {
        if (i < 10) {
            i = "0" + i;
            }
        return i;
    }

	private onSegmentChanged(event){
		this.selectedSegment = event['_value'];

		if (this.selectedSegment == 'IG1') {
			this.itemGroup = this.itemG1;
		}
		if (this.selectedSegment == 'IG2') {
			this.itemGroup = this.itemG2;
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

	private loadAllUsers(id) {
		this.menus = [];
        this.kitchenMenuService.getAll(id).subscribe(users => {       
            if(!users.error){
				if (users.message.length > 0) {
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
            this.loadAllItem(id);
        });
    }

    private loadAllItem(id) {
        this.kitchenMenuItemService.getAllItems(id).subscribe(users => { 
            this.items = users.message;
            this.loadAllAddons(id);
        });
    }

    private loadAllAddons(id){
        this.kitchenMenuService.getAllAddOn(id).subscribe(data => {
            this.addOns = data.message;
        });

        this.itemGroup1(this.promo.discountOn[0]);
        if (this.promo.discountOn[1]) {
            this.itemGroup2(this.promo.discountOn[1]);
        }
    }

    private loadAllPromotions(id) {
        this.promotionsService.getAll().subscribe(pro => {
            this.index = pro.message.findIndex(mn => mn._id == id);
            if (this.index == 6) {
                if (this.cartTotalAmount < this.promo.minCartAmount) {
                    this.getToast('Cant add this deal now \n Minimum Cart Amount should be ' + this.promo.minCartAmount);
                    this.nav.setRoot(MenuPage,{
                        resId : this.resId
                    });
                }
            }
        });
    }

    private itemGroup1(menuIds){
        var menuObjectsArray = [];
        if (menuIds.itemGroup1) {        
            menuIds.itemGroup1.forEach((menuObj) => {
                var menuObjects = {}
                var x = this.menus.findIndex(mn => mn._id == menuObj.id1);
                if (menuObj.item1.length > 0) {
                    this.kitchenMenuItemService.promotionsItem(menuObj.item1).subscribe(users => {
                        if (x > -1) {
                            menuObjects['menu'] = this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            this.itemG1 = menuObjectsArray;

                            this.itemGroup = this.itemG1;
                        }
                    });
                }
            });
        }
    }

    private itemGroup2(menuIds){
        var menuObjectsArray = [];
        var menuObjects = {}
        if (menuIds.itemGroup2) {        
            menuIds.itemGroup2.forEach((menuObj) => {
                var menuObjects = {}
                var x = this.menus.findIndex(mn => mn._id == menuObj.id2);
                if (menuObj.item2.length > 0) {
                    this.kitchenMenuItemService.promotionsItem(menuObj.item2).subscribe(users => {
                        if (x > -1) {
                            menuObjects['menu'] = this.menus[x];
                            menuObjects['items'] = users.message;
                            menuObjectsArray.push(menuObjects);
                            this.itemG2 = menuObjectsArray;
                        }
                    });
                }
            });
        }
    }

    private showItems(itemgrp){
    	let alert = this.alertCtrl.create();
    	alert.setTitle(itemgrp['menu']['name']);
    	if (itemgrp.items) {
	    	for (var i = 0; i < itemgrp.items.length; i++) {
		    	alert.addInput({
		    		type: 'radio',
		    		label: '$' + itemgrp.items[i].price + ' - ' + itemgrp.items[i].name,
		    		value: itemgrp.items[i],
		    	});
	    	}
    	}

    	alert.addButton('Cancel');
    	alert.addButton({
    		text: 'OK',
    		handler: data => {
    			if (data != 'undefined') {
    				this.navCtrl.push(ItemDetailPage, {
			            item : data, type : 'promotionItem', iG : this.selectedSegment, resId : this.resId
			        });
    			}
    		}
    	});
    	alert.present();
    }

    private addDeal(){
    	var discountOn = this.promo.discountOn;
        this.promotionItem['promotion'] = this.promo;

    	if (typeof discountOn[1] == 'undefined') {
    		var discountedPrice = ((100 - this.promo['discountPercent'])/100)*this.promotionItem['itemGroup1']['totalPrice'];
    		this.promotionItem['itemGroup1']['totalPrice'] = discountedPrice;
    		this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'];
    	}

    	if (typeof discountOn[1] != 'undefined') {
    		if (this.promotionItem['itemGroup1']['totalPrice'] <= this.promotionItem['itemGroup2']['totalPrice']) {
                var discountedPrice = ((100 - this.promo.discountPercent)/100)*this.promotionItem['itemGroup1']['totalPrice'];
                this.promotionItem['itemGroup1']['totalPrice'] = discountedPrice;
                this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'] + this.promotionItem['itemGroup2']['totalPrice'];
            }else{
                var discountedPrice = ((100 - this.promo.discountPercent)/100)*this.promotionItem['itemGroup2']['totalPrice'];
                this.promotionItem['itemGroup2']['totalPrice'] = discountedPrice;
                this.promotionItem['total'] = this.promotionItem['itemGroup1']['totalPrice'] + this.promotionItem['itemGroup2']['totalPrice'];
            }
    	}

    	console.log("this.promotionItem");
    	console.log(this.promotionItem);

        localStorage.removeItem(this.proId);
    	localStorage.setItem(this.proId,JSON.stringify(this.promotionItem));
    	localStorage.removeItem('promo');
    	this.nav.setRoot(MenuPage,{
            resId : this.resId
        });
    }
}
