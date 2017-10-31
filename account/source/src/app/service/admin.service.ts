import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";


@Injectable()
export class AdminService {

    constructor(private http: Http) { }
    authToken: any;
    user: any;

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'admin-login', user,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token_admin', token);
    localStorage.setItem('currentAdmin', JSON.stringify(user));
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

    public customerUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');

        return this.http.put(globalVariable.url+'api/customer/'+data._id,data,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public staffList(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'api/staff',{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public customerDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'api/customer/'+id,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public adminForgetPassword(data){
        return this.http.post(globalVariable.url+'admin-forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public admin(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        
        return this.http.get(globalVariable.url+'admin-get/'+id,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public adminUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');

        return this.http.put(globalVariable.url+'admin-update/'+data._id,data,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public adminChangePassword(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');

        return this.http.put(globalVariable.url+'admin-change-password/'+data._id,data,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public resetPassword(user){
        /*let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json'); */
        return this.http.put(globalVariable.url+'admin-reset-password/'+user._id, user)
          .map(res => res.json());
    }







    public adminLogout(){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/

        return this.http.get(globalVariable.url+'admin-logout')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
