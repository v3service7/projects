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


    public adminLogin(data){
        return this.http.post(globalVariable.url+'admin-login', data)
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
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.get(globalVariable.url+'admin-get/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public adminUpdate(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.put(globalVariable.url+'admin-update/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public adminChangePassword(data){
        /*let admin = JSON.parse(localStorage.getItem('currentAdmin'))
        let headers = new Headers();
        headers.append('x-access-token', admin['custoken']);, {headers: headers}*/
        return this.http.put(globalVariable.url+'admin-change-password/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
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
