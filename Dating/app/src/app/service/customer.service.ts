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

                    localStorage.setItem('currentCustomer', JSON.stringify(user.data));         
            return user;
        });
    }

    getCustomerList(){
        return this.http.get(globalVariable.url+'customer')
        .map((response: Response) => {
            let user = response.json();            
            return user;
        });
    }


    unreadMessage(id){
        var obj = {id : id};
        return this.http.post(globalVariable.url+'customer/unreadmessage',obj)
        .map(
            (response: Response) => response.json()
        );
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
    	return this.http.post(globalVariable.url+'customer/',data)
        .map((response: Response) => response.json()
            );
    }

    updateCustomer(data){
        return this.http.put(globalVariable.url+'customer/'+data._id,data)
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

    changePassword(data){
        return this.http.put(globalVariable.url+'customer/change-password/'+data._id,data)
        .map((response: Response) => response.json());
    }

    addactivate(data){
        return this.http.post(globalVariable.url+'customer/account-confirms',data)
        .map(
            (response: Response) => response.json()
        );
    }

    filter(data){
        return this.http.post(globalVariable.url+'customer/filters',data)
        .map(
            (response: Response) => response.json());
    } 

    getUserCountry(){
        return this.http.get(globalVariable.url+'customer/userscountry')
        .map(
            (response: Response) => response.json()
        );
    }

    getmessage(data) {
        return this.http.post(globalVariable.url+'customer/chat',data)
        .map(
            (response: Response) => response.json()
        );
    }

       changeTokboxToken(id){
            return this.http.get(globalVariable.url+'customer/change-tokbox-token/'+id)
            .map(
              (response: Response) => response.json()
              );
          }  

            allSpeedCustomerAvail(data) {
            return this.http.post(globalVariable.url+'customer/all-speed-avail',data)
            .map(
              (response: Response) => response.json()
              );
             }

              getOne(id) {
            return this.http.get(globalVariable.url+'customer/'+id)
            .map(
              (response: Response) => response.json()
              );
          }
}
