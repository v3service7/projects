import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globalVariable from "../global";

@Injectable()
export class CustomersService {

  	constructor(private http: Http) { }

    getCustomer(data){
        return this.http.post(globalVariable.url+'customer/login', data)
        .map((response: Response) => {
            let user = response.json();            
                return user;
            });
        }

    getOneCustomer(id){
        return this.http.get(globalVariable.url+'customer/'+id)
            .map(
                (response: Response) => response.json()
            );
        }

  	getLatLng(data){
      return this.http.post(globalVariable.url+'customer/add-lat-lng', data)
        .map((response: Response) => {
            let user = response.json();            
                return user;
            });
        }

    customerLogout(id) {
        localStorage.removeItem(id);
    }

    addCustomer(data){
    	console.log(data);
    	return this.http.post(globalVariable.url+'customer/register',data)
    		.map((response: Response) => response.json()
        );
    }

    updateCustomer(data){
        return this.http.put(globalVariable.url+'customer/update/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    forgetPassword(data){
        return this.http.post(globalVariable.url+'customer/forget-pass', data)
            .map((response: Response) => {
                let user = response.json();
                return user;
            }
        );
    }

    addOrder(data){
        return this.http.post(globalVariable.url+'order/add',data)
        .map((response: Response) => response.json());
    }
    orderPlaced(data){
        return this.http.post(globalVariable.url+'order/order-placed',data)
        .map((response: Response) => response.json());
    }

    changePassword(data){
    return this.http.put(globalVariable.url+'customer/change-password/'+data._id,data)
        .map((response: Response) => response.json());
    }
}
