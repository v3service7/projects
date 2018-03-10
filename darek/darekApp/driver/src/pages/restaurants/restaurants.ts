import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OneService } from './../../services/one.service';
import { OrderPage } from './../order/order';


@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {
  driver: any;
  restaurants: any;
  allowresids: any;
  kitchenIds:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private oneService: OneService) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    if (JSON.parse(localStorage.getItem('driver'))) {
      this.driver = JSON.parse(localStorage.getItem('driver'));  
    }
      this.oneService.getRestaurants().subscribe((data)=> {
        if(!data.error){
          var allrestaurants = data.message.filter((item) => {
            return item.activestatus == true;
          });
          var trestaurants = data.message.filter((item) => {
              return item.activestatus == true;
          });
          var allowrestrodetail = [];
          this.driver.kitchensallow.forEach((item)=>{
          var index = trestaurants.findIndex((it) => {return it._id == item.resId;})
            if(index != -1){
              trestaurants.splice(index, 1);
            }
          });

          this.driver.kitchensallow.forEach((item)=>{
            var index = allrestaurants.findIndex((it) => {return it._id == item.resId;})
            if(index != -1){
              var deta = { restaurantname: allrestaurants[index].restaurantname, status: item.status };
              allowrestrodetail.push(deta);
            }
          });
          this.restaurants = trestaurants;
          this.allowresids = allowrestrodetail;
          loading.dismiss();
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantsPage');
    this.getDriverInfo();
  }

  getDriverInfo(){
    this.oneService.getDriver(this.driver._id).subscribe((data) => {
      if (!data.error) {
        localStorage.removeItem('driver');
        localStorage.setItem('driver', JSON.stringify(data.message));
        this.driver = data.message; 
        this.kitchenIds = data.message.kitchensallow;
      }
    });
  }

  submitRestaurant(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
     var obj = {
      id: this.driver._id,
      kitchensallow: this.kitchenIds
    }
    this.oneService.updateRestaurantId(obj).subscribe((data) => {
      if (!data.error) {
        this.getDriverInfo();
        loading.dismiss();
        this.getToast('Restaurants added successfully.');
        /*this.navCtrl.setRoot(OrderPage);*/
      }
    });
  }

  updataRestaurant(id){
    let obj ={resId:id,status:false};

    var index = this.kitchenIds.findIndex(x => x.resId == id);
    if (index == -1){
      this.kitchenIds.push(obj);
    }else{
      this.kitchenIds.splice(index, 1);
    }
    
  }
  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom' //top,middle,bottom
    });
    toast.present();
  }

}
 