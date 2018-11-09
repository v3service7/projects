import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import * as globalVariable from '../global';

@Injectable()
export class UserService {
  validateToken: any = 'JWTeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSI';
  authToken: any;
  user: any;

  constructor(private http: Http) {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  registerUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('auth', this.validateToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/', user, {headers: headers})
      .map(res => res.json());
  }

  validateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/driverlogin', user, {headers: headers})
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

  updateProfile(user) {
    const headers = new Headers();
    this.loadToken();
    var userData = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/' + userData._id, user, {headers: headers})
      .map(res => res.json());
  }

  changePassword(user) {
    const headers = new Headers();
    this.loadToken();
    var userData = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/changePassword/' + userData._id, user, {headers: headers})
      .map(res => res.json());
  }

  forgotPassword(data) {
    return this.http.post(globalVariable.url + 'users/forgotPassword', data)
    .map(res =>  res.json());
  }

  resetPassword(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/resetPassword/' + user._id, user, {headers: headers})
      .map(res => res.json());
  }

  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
