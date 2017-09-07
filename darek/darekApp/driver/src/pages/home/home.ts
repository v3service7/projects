import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { RestaurantsService } from '../../app/service/restaurants.service';
import { OrderService } from '../../app/service/order.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public navParams: NavParams,private restaurantsService: RestaurantsService,private orderService: OrderService) {
/* 		this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();*/
		this.menuCtrl.enable(true);
		//console.log(this.currentOwner)
	}

}
