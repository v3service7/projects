import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globalVariable from "../global";

@Injectable()
export class OrderService {

  	constructor(private http: Http) { }
  	
  	getAll() {
		return this.http.get(globalVariable.url+'order/')
		.map(
			(response: Response) => response.json()
		);
	}

  	overview(id) {
		return this.http.get(globalVariable.url+'reporting/overview/'+id)
		.map(
			(response: Response) => response.json()
		);
	}

	client(id) {
  		return this.http.get(globalVariable.url+'reporting/client/'+id)
		.map(
			(response: Response) => response.json()
		);
	}

	orders(id) {
  		return this.http.get(globalVariable.url+'reporting/list/'+id)
		.map(
			(response: Response) => response.json()
		);
	}

    customerOrders(id) {
        return this.http.get(globalVariable.url+'order/customer/'+id)
        .map(
            (response: Response) => response.json()
            );
    }

	getMethodChart(id, days) {
  		return this.http.get(globalVariable.url+'reporting/method/'+id + '/'+ days)
			.map(
				(response: Response) => response.json()
			);
	}

	getResultChart(id, days) {
  		return this.http.get(globalVariable.url+'reporting/results/'+id+'/'+days)
			.map(
				(response: Response) => response.json()
			);
	}

	getTypeChart(id , days) {
  		return this.http.get(globalVariable.url+'reporting/type/'+id + '/' +days)
			.map(
				(response: Response) => response.json()
			);
	}

	getPaymentChart(id, days) {
  		return this.http.get(globalVariable.url+'reporting/payment/'+id+'/'+days)
			.map(
				(response: Response) => response.json()
			);
	}

	getItemChart(id,days) {
  		return this.http.get(globalVariable.url+'reporting/items/'+id + '/'+days)
		.map(
			(response: Response) => response.json()
		);
	}

	getAllSaleChart(id,days) {
  		return this.http.get(globalVariable.url+'reporting/all-sale/'+id +'/' +days)
		.map(
			(response: Response) => response.json()
		);
	}

	getItemCategoryChart(data) {
  		return this.http.get(globalVariable.url+'reporting/item-category/'+data.id+'/'+data.menuid + '/' + data.days)
		.map(
			(response: Response) => response.json()
		);
	}

	getDetail(id) {
  		return this.http.get(globalVariable.url+'order/'+id)
		.map(
			(response: Response) => response.json()
		);
	}

	getUpdate(data) {
  		return this.http.put(globalVariable.url+'order/update/'+data._id, data)
		.map(
			(response: Response) => response.json()
		);
	}
}
