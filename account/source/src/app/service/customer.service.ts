import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";

@Injectable()
export class CustomerService {
    constructor(private http: Http) { }

    authToken: any;
    user: any;

  storeUserData(token, user){
    localStorage.setItem('id_token_admin', token);
    localStorage.setItem('currentCustomer', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token_admin');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


    public customerVerify(data) {
        return this.http.post(globalVariable.url+'customer-verify', {'token':data})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public customerLogin(data){
        return this.http.post(globalVariable.url+'customer-login', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerRegister(data){
        return this.http.post(globalVariable.url+'customer-register', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerForgetPassword(data){
        return this.http.post(globalVariable.url+'customer-forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'api/customer',{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customer(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'api/customer/'+id,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerAdd(data){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);
        , {headers: headers}*/
        return this.http.post(globalVariable.url+'api/customer',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }


    public resendActivationLink(data){
        return this.http.post(globalVariable.url+'api/resend-activation-link',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerUpdate(data){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);, {headers: headers}*/

        return this.http.put(globalVariable.url+'api/customer/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public customerDelete(id){
        /*let customer = JSON.parse(localStorage.getItem('currentCustomer'))
        let headers = new Headers();
        headers.append('x-access-token', customer['custoken']);, {headers: headers}*/
        return this.http.delete(globalVariable.url+'api/customer/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerChangePassword(data){
        return this.http.put(globalVariable.url+'customer-change-password/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerLogout(){
       /* let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);
        , {headers: headers}*/

        return this.http.get(globalVariable.url+'customer-logout')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
