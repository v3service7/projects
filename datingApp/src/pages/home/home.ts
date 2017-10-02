import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CustomersService } from '../../app/service/index';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	customerList:any;
	constructor(public navCtrl: NavController,public customerService: CustomersService) {
		this.getCustomer()
	}

	private getCustomer(){
		this.customerService.getCustomerList().subscribe(cust=>{
			this.customerList = cust.message;
    	});
	}

}
