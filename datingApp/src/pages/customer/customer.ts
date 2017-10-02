import { Component, Input,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CustomersService } from '../../app/service/index';

@Component({
	selector: 'page-customer',
	templateUrl: 'customer.html'
})
export class CustomerPage  implements OnInit{
	@Input() _id: string;
	customer:any;

	constructor(public navCtrl: NavController,public customerService: CustomersService) {}

	ngOnInit(){
		console.log(this._id);
		this.getCustomer(this._id);
	}

	private getCustomer(id){
		this.customerService.getOneCustomer(id).subscribe(cust=>{
			this.customer = cust.message;
    	});
	}

}
