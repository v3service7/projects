import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  paymentType : any;
  public event = {
    startDate: '2018-01-08',
    endDate: '2018-01-30'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.paymentType = 'all';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  doFilter(){
    this.viewCtrl.dismiss();
  }
}
