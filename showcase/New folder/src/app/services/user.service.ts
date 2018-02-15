import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";

@Injectable()
export class UserService {
	authToken: any;
  user: any;

  constructor(private http:Http) { 
  	const token = localStorage.getItem('id_token_customer');
    this.authToken = token;
  }

  registerUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/', user, {headers: headers})
      .map(res => res.json());
  }
    
    storeUserData(token, user){
        localStorage.removeItem('id_token_customer');
        localStorage.removeItem('user');
        localStorage.setItem('id_token_customer', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage.getItem('user'))
        this.authToken = token;
        this.user = user;
    }

  validateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/userlogin', user,{headers: headers})
      .map(res => res.json());
  }

  public customerVerify(data) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/customer-verify', {'token':data},{headers: headers})
        .map(res => res.json());
    }

    public resendActivationLink(data){
        return this.http.post(globalVariable.url+'users/resend-activation-link',data)
        .map(response => response.json());
    }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/profile',{headers: headers})
      .map(res => res.json());
  }

  updateProfile(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.put(globalVariable.url+'users/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  changePassword(user){
    let headers = new Headers();
    this.loadToken();
    console.log(this.authToken)
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json'); 
    return this.http.put(globalVariable.url+'users/changePassword/'+user.id, user, {headers: headers})
      .map(res => res.json());
  }

  forgotPassword(data){
    return this.http.post(globalVariable.url+'users/forgotPassword', data)
    .map(res =>  res.json());
  }

  resetPassword(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json'); 
    headers.append('Authorization', this.authToken);
    return this.http.put(globalVariable.url+'users/resetPassword/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  storeUser(token, user){
    localStorage.setItem('id_token_customer', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

	loadToken(){
    const token = localStorage.getItem('id_token_customer');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token_customer');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }     


}
