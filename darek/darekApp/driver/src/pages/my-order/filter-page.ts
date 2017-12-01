import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController ,ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService, OrderService, DriversService  } from '../../app/service/index';


/**
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-order',
  templateUrl: 'filter-page.html',
})
export class ModalContentPage {
    result : any;
    paymentType : any = 'any';
    public event = { startDate: '', endDate: ''}
    currentDate : any;
    startDate : any;
    
    constructor(
        public actionSheetCtrl: ActionSheetController,
        public menuCtrl: MenuController,
        public driversService: DriversService,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private orderService: OrderService,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController
        ) {
        let startDate = navParams.get('firstDate');
        let startDate1 = startDate.split('T');
        var currenttime = new Date();

        var date = this.addZero(currenttime.getDate());
        var month = this.addZero(currenttime.getMonth()+1);
        var year = currenttime.getFullYear();

        this.currentDate = year+'-'+month+'-'+date;
        this.startDate = startDate1[0];
        this.event['startDate'] = this.startDate;
        this.event['endDate'] = this.currentDate;
    }

    private addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    chooseStart(type){
        /*if (type == 'start') {*/
            console.log(this.event);
        /*}*/
    }

    choosePaymentMethod(){
        console.log("this.paymentType");
        console.log(this.paymentType);
    }

    dismiss(type) {
        if (type == 'cancel') {
            this.viewCtrl.dismiss();
        }else{
            this.event['paymentType'] = this.paymentType;
            this.result = this.event;
            this.viewCtrl.dismiss(this.result);
        }
    }
}
