import { Component } from '@angular/core';
import { AlertController , ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenItemService,CustomersService } from '../../app/service/index';

import * as globalVariable from "../../app/global";

import { MenuPage } from '../menu/menu';
import { CartPage } from '../cart/cart';

@Component({
    selector: 'page-itemdetail',
    templateUrl: 'itemDetail.html',
})

export class ItemDetailPage {

    item : any = {};
    currentCustomer : any;
    imageURL: string = globalVariable.imageUrl;
    resID: string;
    loading: any;
    orderItem : any = {};
    multisizeSelected : any = {};
    mandCount : number = 0;
    mandOptionId : any = [];
    tempCart : any = [];
    cartLength : number;

    promotionItems : any = {};
    totalAmount : number = 0;
    cart : string;
    proId : string;
    itemType : string;
    itemGroup : string;
    previousPage: any;

    spicyArray : any = [1,2,3];

    constructor(
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        private viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public nav: Nav,
        private kitchenItemService: KitchenItemService,
        public alertCtrl: AlertController,
        public customerService: CustomersService,
        public navParams: NavParams
        ) {
        this.item = navParams.get('item');
        this.itemType = navParams.get('type');
        this.itemGroup = navParams.get('iG');
        this.resID = navParams.get('resId');
        this.orderItem['item'] = this.item;
        this.cart = 'cart_' + this.resID;

        if (this.itemType == 'promotionItem') {
            this.proId = 'promotion_' + this.resID;

            console.log("this.proId hckd fykddury");
            console.log(this.proId);

            if (localStorage.getItem(this.proId)) {
                this.promotionItems = JSON.parse(localStorage.getItem(this.proId));
            }
        }
        var val=this.navCtrl.last();        
        this.previousPage = val.component
    }

    ionViewDidEnter() {
        this.getCustomer()
    }

    ionViewDidLoad() {
        if (typeof this.item.options != 'undefined' && this.item.options.length >0) {
            for (var i = 0; i < this.item.options.length; i++) {
                if (typeof this.item.options[i].groupType != 'undefined' && this.item.options[i].groupType.gType == 'mandatory') {
                    this.mandOptionId.push(this.item.options[i]._id)
                }
            }
        }

        if (typeof this.item.multisize != 'undefined' && this.item.multisize.length > 0) {
            this.multisizeSelected = this.item.multisize[0];
            this.orderItem['multisize'] = this.multisizeSelected;
        }

        this.orderItem['addon'] = [];
        this.orderItem['quantity'] = 1;

        if (localStorage.getItem(this.cart)) {
            this.tempCart = JSON.parse(localStorage.getItem(this.cart));
        }

        if (localStorage.getItem('cartLength')) {
            this.cartLength = parseInt(localStorage.getItem('cartLength'));
        }

        this.totalPrice();
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
        console.log(this.multisizeSelected)
        console.log(this.item.multisize)
        let wIndex = this.currentCustomer.wishlist.indexOf(id);
        if (wIndex == -1) {
            this.currentCustomer.wishlist.push(id);
            //this.getItems(this.item._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(cust=>{
            });
        }else{
            this.currentCustomer.wishlist.splice(wIndex,1);
            //this.getItems(this.item._id);
            this.customerService.updateCustomer(this.currentCustomer).subscribe(cust=>{
            });
        }
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
            this.getItems(this.item._id);
            refresher.complete();
        }, 2000);
    }

    private getItems(id){
        this.kitchenItemService.getOne(id).subscribe(data=> {
            if (!data.error) {
                this.item = data.message;
                this.orderItem['item'] = this.item;
            }else{
                this.getToast('Something Went Wrong!');
            }
        })
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'middle' //top,middle,bottom
        });
        toast.present();
    }

    private showAddon(group){
        let alert = this.alertCtrl.create();
        
        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'mandatory') {
            alert.setTitle('Min Addon : ' + group.groupType.min +' ,Max Addon : ' + group.groupType.max);
        }

        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
            alert.setTitle(group.groupType.gType);
        }

        for (var i = 0; i < group.subaddon.length; i++) {
            alert.addInput({
                type: 'checkbox',
                label: '$'+group.subaddon[i].price + ' - ' + group.subaddon[i].name,
                checked : this.checkChecked(group.subaddon[i]),
                value : group.subaddon[i],
            });
        }

        alert.addButton('Cancel');

        alert.addButton({
            text: 'Okay',
            handler: data => {
                var data1 = this.addGroupId(data,group);
                this.spliceAddon(data1,group)
            }
        });

        alert.present();
    }

    private addGroupId(data,group){
        let groupId = group._id;
        for (var i = 0; i < data.length; i++) {
            data[i]['groupId'] = groupId;
        }
        return data;
    }

    private spliceAddon(data1,group){
        let groupId = group._id;
        let length = this.orderItem['addon'].length;

        if (length == 0) {
            this.addAddon(data1,group);
        }

        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var index = this.orderItem['addon'].findIndex(mn=> mn.groupId == groupId)

                if (index > -1) {
                    this.orderItem['addon'].splice(index , 1);
                }

                if(index == -1 || (i == length-1)){
                    
                    this.addAddon(data1,group);
                    break;
                }
            }
        }
    }

    private addAddon(data1,group){
        let max : number;
        let min : number;

        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'mandatory') {
            min = group.groupType.min;
            max = group.groupType.max;

            if (data1.length >= min && data1.length <= max) {
                for (var i = 0; i < data1.length; i++) {
                    var index1 = this.orderItem['addon'].findIndex(mn=> mn._id == data1[i]._id)
                    if (index1 == -1) {
                        this.orderItem['addon'].push(data1[i]);
                    }
                }
            }else{
                this.getToast('Can\'t add \n Please ensure Minimum and Maximum you can order');
            }

            this.checkAddons();
            this.totalPrice();
        }

        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
            for (var i = 0; i < data1.length; i++) {
                var index1 = this.orderItem['addon'].findIndex(mn=> mn._id == data1[i]._id)
                if (index1 == -1) {
                    this.orderItem['addon'].push(data1[i]);
                }
            }
            this.totalPrice();
        }
    }

    private checkAddons(){
        this.mandCount = 0;
        for (var i = 0; i < this.mandOptionId.length; i++) {
            var x = this.orderItem['addon'].findIndex(mn=> this.mandOptionId[i] == mn.groupId)
            if(x > -1){
                this.mandCount++;
            }
        }
    }

    private checkDisabled(){
        if (this.mandOptionId.length == 0 || this.mandCount == this.mandOptionId.length) {
            return false;
        }else{
            return true;
        }
    }

    private checkChecked(addon){
        var index2 = this.orderItem['addon'].findIndex(mn=> mn._id == addon._id)
        if (index2 > -1) {
            return true;
        }
    }

    private decreaseQuantity(){
        var x = document.getElementsByClassName('quantity');
        var y = parseInt(x[0].innerHTML);
        var z : Number;
        if (y > 1) {
            z = y - 1;
            this.orderItem['quantity'] = z;
            this.totalPrice();
            var p = z.toString()
            x[0].innerHTML = p;
        }else{
            this.getToast('Choose Atleast 1');
        }
    }

    private increaseQuantity(){
        var x = document.getElementsByClassName('quantity');
        var y = parseInt(x[0].innerHTML);
        var z : Number;
        if (y < 10) {
            z = y + 1;
            this.orderItem['quantity'] = z;
            this.totalPrice();
            var p = z.toString();
            x[0].innerHTML = p;
        }else{
            this.getToast('You Added Maximum Quantity')
        }
    }

    private countCharacter(event){
        this.orderItem['itemInstruction'] = event.target.value;
    }

    private optionsFn(){
        console.log('isChange')
        this.orderItem['multisize'] = this.multisizeSelected;
        this.totalPrice();
    }

    private totalPrice(){
        let addonPrice = 0;
        let multisizePrice = 0;
        let total = 0;
        if (typeof this.orderItem['addon'] != 'undefined' && this.orderItem['addon'].length > 0) {
            for (let i = 0; i < this.orderItem['addon'].length; i++) {
                addonPrice = addonPrice + parseInt(this.orderItem['addon'][i].price);
            }
        }
        if (typeof this.orderItem['multisize'] != 'undefined') {
            multisizePrice = parseInt(this.orderItem['multisize'].price);
        }

        total = (this.item.price + multisizePrice + addonPrice)*this.orderItem['quantity'];
        this.totalAmount = total;
        this.orderItem['totalPrice'] = this.totalAmount;
    }

    private addToCart(){
        if (this.itemType == 'cartItem') {
            var restaurantID = JSON.parse(localStorage.getItem('resID'));
            console.log("restaurantID");
            console.log(restaurantID);
            console.log(this.resID);

            if (this.tempCart.length == 0 && restaurantID == null) {
                localStorage.setItem('resID',JSON.stringify(this.resID));
                this.addCart();
            }
            
            if (this.tempCart.length >= 0 && restaurantID != null && restaurantID == this.resID) {
                this.addCart();
            }

            if (this.tempCart.length == 0 && restaurantID != null && restaurantID != this.resID) {
                let confirm = this.alertCtrl.create({
                    title: 'Confirm!',
                    message: 'Adding item from this restaurant will remove your items of previous restaurant',
                    buttons: [
                    {
                        text: 'Cancel',
                        handler: () => {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Ok',
                        handler: () => {
                            localStorage.removeItem('resID');
                            localStorage.removeItem('cart_' + restaurantID);
                            localStorage.removeItem('subTotal_' + restaurantID);
                            localStorage.removeItem('cartStorage_' + restaurantID);
                            localStorage.removeItem('promotion_' + restaurantID);
                            localStorage.removeItem('coupon_' + restaurantID);
                            localStorage.setItem('resID',this.resID);
                            localStorage.setItem('cartLength','0');
                            this.addCart();
                        }
                    }
                    ]
                });
                confirm.present();
            }
        }else{
            this.addCart();
        }
    }

    private cartItem(type){
        var size = 0;
        if (localStorage.getItem('cartLength') == null) {
            localStorage.setItem('cartLength','0');
        }else{
            size = parseInt(localStorage.getItem('cartLength'));
        }

        if (type == 'plus') {
            var sizePlus = size+1;
            localStorage.setItem('cartLength',JSON.stringify(sizePlus));
        }else{
            var sizeMinus = size-1;
            localStorage.setItem('cartLength',JSON.stringify(sizeMinus));
        }
    }

    private addCart(){
        if (this.itemType == 'cartItem') {
            this.tempCart.push(this.orderItem);
            localStorage.setItem(this.cart,JSON.stringify(this.tempCart));
            this.cartItem('plus');
            let cartTotalAmount = 0;

            for (var i = 0; i < this.tempCart.length; i++) {
                cartTotalAmount = cartTotalAmount + this.tempCart[i].totalPrice;
                localStorage.setItem('subTotal_'+this.resID,JSON.stringify(cartTotalAmount))
            }
        }

        if (this.itemType == 'promotionItem') {
            if (this.itemGroup == 'IG1') {            
                this.promotionItems['itemGroup1'] = this.orderItem;
                localStorage.setItem(this.proId,JSON.stringify(this.promotionItems));
            }

            if (this.itemGroup == 'IG2') {
                this.promotionItems['itemGroup2'] = this.orderItem;
                localStorage.setItem(this.proId,JSON.stringify(this.promotionItems));
            }
        }

        this.navCtrl.pop(this.previousPage);
        this.getToast('Item Added');
    }

    private goToCart(){
        var restaurantID = JSON.parse(localStorage.getItem('resID'));
        if (restaurantID != null) {
            this.navCtrl.push(CartPage,{
                resId : restaurantID
            });
        }else{
            let alert = this.alertCtrl.create({
                title: 'No Item!',
                subTitle: 'Your Cart is empty',
                buttons: ['OK']
            });
            alert.present();
        }
    }
}
