import { Component, Input } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

import { CustomersService } from '../../app/service/index';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	customerList:any=[];
	loading:any;
	customerInfo:any;
	
  constructor(public navCtrl: NavController,public customerService: CustomersService, public loadingCtrl: LoadingController) {

  }
  ionViewDidEnter() {
		if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
			this.getCustomer(this.customerInfo._id);
        }
	}

	private getCustomer(id){
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
		this.customerService.getOneCustomer(id).subscribe(cust=>{
			console.log(this.customerList.length)
			this.customerList = cust.message.visitors;
			this.loading.dismiss();
		});
	}

	private doRefresh(refresher) {
		this.getCustomer(this.customerInfo._id);
		refresher.complete();
	}

}
