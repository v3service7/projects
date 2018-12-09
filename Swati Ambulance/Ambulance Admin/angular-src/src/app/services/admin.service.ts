import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from '../global';

@Injectable()
export class AdminService {

  // tslint:disable-next-line:max-line-length
  validateToken: any = 'JWTeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSI';
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/login', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    var userData = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'users/' + userData._id, {headers: headers})
      .map(res => res.json());
  }

  getUserById(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'users/' + id, {headers: headers})
      .map(res => res.json());
  }

  userUpdate(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/' + user._id, user, {headers: headers})
      .map(res => res.json());
  }

  userAdd(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('auth', this.validateToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/', user, {headers: headers})
      .map(res => res.json());
  }

  userList(role) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'users/?role=' + role, {headers: headers})
      .map(res => res.json());
  }

  deleteUserById(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(globalVariable.url + 'users/' + id, {headers: headers})
      .map(res => res.json());
  }

  changePassword(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/changePassword/' + user._id, user, {headers: headers})
      .map(res => res.json());
  }

  adminchangePassword(user){
    let headers = new Headers();   
    this.loadToken();
    headers.append('x-access-token', this.authToken);
    headers.append('Content-Type','application/json'); 
    return this.http.put(globalVariable.url+'users/adminchangePassword/'+user._id, user, {headers: headers})
      .map(res => res.json());
  }

  resetPassword(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/resetPassword/' + user._id, user, {headers: headers})
      .map(res => res.json());
  }

  forgotPassword(data) {
    data.role = "Admin";
    return this.http.post(globalVariable.url + 'users/forgotPassword', data)
    .map(res =>  res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token_admin', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token_admin');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
