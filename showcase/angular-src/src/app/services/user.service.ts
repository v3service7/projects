import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import * as globalVariable from '../global';

@Injectable()
export class UserService {
  authToken: any;
  user: any;
  // tslint:disable-next-line:max-line-length
  validateToken: any = 'showcase eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSIsIkN1c3RvbWVyVGVsbm8iOiIxMTExMTExMTExIiwiQ3VzdG9tZXJFbWFpbCI6IlQxQHppaXB0cmFuc2l0LmNvbSIsIkN1c3RvbWVyUGFzc3dvcmQiOiIkMmEkMTAkUG81R0JRUlRHWUpPYU9yaU9OZXE3T1lSeTI0Y1hPZktuQ0NMMy4xaFVTaE56WS9hMDVEQS4iLCJDdXN0b21lckdlbmRlciI6Ik5VTEwiLCJDdXN0b21lckZhY2Vib29rSWQiOiJOVUxMIiwiQ3VzdG9tZXJQaWN0dXJlUGF0aCI6IjAuMDAiLCJDdXN0b21lcklzU3R1ZGVudCI6MCwiQ3VzdG9tZXJWZXJpZnlUZWxubyI6MCwiQ3VzdG9tZXJWZXJpZnlFbWFpbCI6MSwiQ3VzdG9tZXJJc0luYWN0aXZlIjowLCJDdXN0b21lclZlcmlmaWNhdGlvblRva2VuIjpudWxsLCJpYXQiOjE1MDA0MTAyMzQsImV4cCI6MTUwMzAwMjIzNH0.mPlmkuFDISGyjUl6GzELjKTCrAfmdjtuSdtrF45yLvY';
  constructor(private http: Http) {
    const token = localStorage.getItem('id_token_customer');
    this.authToken = token;
  }

  registerUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('auth', this.validateToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/', user, { headers: headers })
      .map(res => res.json());
  }

  instaService(code) {
    return this.http.post(globalVariable.url + 'users/social-insta', { code: code })
      .map(res => res.json());
  }


  twitterService() {
    return this.http.get(globalVariable.url + 'users/request-token')
      .map(res => res.json());
  }


  twitterFetchService(data) {
    return this.http.post(globalVariable.url + 'users/access-token', data)
      .map(res => res.json());
  }

  socialRegisterUser(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/social-register', user, { headers: headers })
      .map(res => res.json());
  }

  socialValidateUser(user) {
    console.log('user');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/social-login', user, { headers: headers })
      .map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.clear();
    localStorage.setItem('id_token_customer', token);
    localStorage.setItem('customer', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  validateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/userlogin', user, { headers: headers })
      .map(res => res.json());
  }

  public customerVerify(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/customer-verify', { 'token': data }, { headers: headers })
      .map(res => res.json());
  }

  public resendActivationLink(data) {
    return this.http.post(globalVariable.url + 'users/resend-activation-link', data)
      .map(response => response.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'users/profile', { headers: headers })
      .map(res => res.json());
  }

  mycategory() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'category/usercategory/', { headers: headers })
      .map(res => res.json());
  }

  updateProfile(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/' + user._id, user, { headers: headers })
      .map(res => res.json());
  }

  changePassword(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(globalVariable.url + 'users/changePassword/' + user.id, user, { headers: headers })
      .map(res => res.json());
  }
  checkPassword(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'users/checkpassword/' + user.id, user, { headers: headers })
      .map(res => res.json());
  }

  forgotPassword(data) {
    return this.http.post(globalVariable.url + 'users/forgotPassword', data)
      .map(res => res.json());
  }

  resetPassword(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.put(globalVariable.url + 'users/resetPassword/' + user._id, user, { headers: headers })
      .map(res => res.json());
  }

  storeUser(token, user) {
    localStorage.setItem('id_token_customer', token);
    localStorage.setItem('customer', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token_customer');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token_customer');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
