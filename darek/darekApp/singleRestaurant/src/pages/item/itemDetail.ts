import { Component } from '@angular/core';
import { AlertController , ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KitchenItemService } from '../../app/service/index';
import * as globalVariable from "../../app/global";

import { ItemPage } from './item';


@Component({
    selector: 'page-itemdetail',
    templateUrl: 'itemDetail.html',
})

export class ItemDetailPage {

    item : any = {};
    imageURL: string = globalVariable.imageUrl;
    loading: any;
    orderItem : any = []

    constructor(
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        private viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        public nav: Nav,
        private kitchenItemService: KitchenItemService,
        public alertCtrl: AlertController,
        public navParams: NavParams
        ) {
        this.item = navParams.get('item');
        /*this.getItems(this.menu._id);*/
    }

    ionViewDidLoad() {
        /*this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/

        this.orderItem['addon'] = [];


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

    /*doRefresh(refresher) {
        setTimeout(() => {
            this.getItems(this.menu._id);
            refresher.complete();
        }, 2000);
    }*/

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    private showAddon(group){
        console.log("group");
        console.log(group);
        console.log("this.orderItem['addon']");
        console.log(this.orderItem['addon']);

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
                label: group.subaddon[i].name + group.subaddon[i].price,
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

                //this.addItem(data1);

                /*if (value == 1 || value == 0) {
                    if (data1.length > 0) {
                        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'mandatory') {
                            if (data1.length >= min && data1.length <= max) {
                                for (var i = 0; i < data1.length; i++) {
                                    this.orderItem['addon'].push(data1[i]);
                                }
                            }else{
                                this.getToast('Can\'t add \n Please ensure Minimum and Maximum you can order');
                            }
                        }

                        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
                            for (var i = 0; i < data1.length; i++) {
                                this.orderItem['addon'].push(data1[i]);
                            }
                        }
                    }

                    if (data1.length == 0) {
                        this.getToast('No Item Selected');
                    }
                }*/
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
        console.log("length");
        console.log(length);

        if (length == 0) {
            this.addItem(data1,group);
        }

        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var index = this.orderItem['addon'].findIndex(mn=> mn.groupId == groupId)

                console.log(index);

                if (index > -1) {
                    this.orderItem['addon'].splice(index , 1);
                }

                if(index == -1 || (i == length-1)){
                    this.addItem(data1,group);
                }
            }
        }
    }

    private addItem(data1,group){
        let max : number;
        let min : number;

        console.log(group);

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
        }

        if (typeof group.groupType != 'undefined' && group.groupType.gType == 'optional') {
            for (var i = 0; i < data1.length; i++) {
                var index1 = this.orderItem['addon'].findIndex(mn=> mn._id == data1[i]._id)
                if (index1 == -1) {
                    this.orderItem['addon'].push(data1[i]);
                }
            }
        }
        console.log(this.orderItem['addon']);
    }

    private index(i){
        if (i == 0) {
            return true;
        }else{
            return false;
        }
    }

    private checkChecked(addon){
        var index2 = this.orderItem['addon'].findIndex(mn=> mn._id == addon._id)
        if (index2 > -1) {
            return true;
        }
    }
}
