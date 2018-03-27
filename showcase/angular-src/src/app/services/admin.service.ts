import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from "../global";

@Injectable()
export class AdminService {
  // tslint:disable-next-line:max-line-length
  validateToken: any = 'showcase eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSIsIkN1c3RvbWVyVGVsbm8iOiIxMTExMTExMTExIiwiQ3VzdG9tZXJFbWFpbCI6IlQxQHppaXB0cmFuc2l0LmNvbSIsIkN1c3RvbWVyUGFzc3dvcmQiOiIkMmEkMTAkUG81R0JRUlRHWUpPYU9yaU9OZXE3T1lSeTI0Y1hPZktuQ0NMMy4xaFVTaE56WS9hMDVEQS4iLCJDdXN0b21lckdlbmRlciI6Ik5VTEwiLCJDdXN0b21lckZhY2Vib29rSWQiOiJOVUxMIiwiQ3VzdG9tZXJQaWN0dXJlUGF0aCI6IjAuMDAiLCJDdXN0b21lcklzU3R1ZGVudCI6MCwiQ3VzdG9tZXJWZXJpZnlUZWxubyI6MCwiQ3VzdG9tZXJWZXJpZnlFbWFpbCI6MSwiQ3VzdG9tZXJJc0luYWN0aXZlIjowLCJDdXN0b21lclZlcmlmaWNhdGlvblRva2VuIjpudWxsLCJpYXQiOjE1MDA0MTAyMzQsImV4cCI6MTUwMzAwMjIzNH0.mPlmkuFDISGyjUl6GzELjKTCrAfmdjtuSdtrF45yLvY';
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/login', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/profile',{headers: headers})
      .map(res => res.json());
  }

  getUserById(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/'+id, {headers: headers})
      .map(res => res.json());
  }  

  userUpdate(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.put(globalVariable.url+'users/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  userAdd(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('auth', this.validateToken);
    headers.append('Content-Type','application/json');    
    return this.http.post(globalVariable.url+'users/', user, {headers: headers})
      .map(res => res.json());
  }

  userList(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.get(globalVariable.url+'users/', {headers: headers})
      .map(res => res.json());
  }

  // user's boards
  boardsList(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'category/adminusercategory/' + id, { headers: headers })
      .map(res => res.json());
  }

  // user's boards bookmarks
  bookmarkList(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'bookmark/category/' + id, { headers: headers })
      .map(res => res.json());
  }

  deleteUserById(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');    
    return this.http.delete(globalVariable.url+'users/'+id, {headers: headers})
      .map(res => res.json());
  } 

  public categoryDelete(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(globalVariable.url + 'category/' + id, { headers: headers })
      .map(res => res.json());
  }

  public bookmarkDelete(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(globalVariable.url + 'bookmark/' + id, { headers: headers })
      .map(res => res.json());
  }

  changePassword(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json'); 
    return this.http.put(globalVariable.url+'users/changePassword/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  resetPassword(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json'); 
    return this.http.put(globalVariable.url+'users/resetPassword/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  forgotPassword(data){
    return this.http.post(globalVariable.url+'users/forgotPassword', data)
    .map(res =>  res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token_admin', token);
    localStorage.setItem('user', JSON.stringify(user));
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

}
