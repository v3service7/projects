import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";


@Injectable()
export class AuthService {
    constructor(private http: Http) { }    
    
    getUser(data){
        return this.http.post(globalVariable.url+'users/login', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    getOwner(data){
        return this.http.post(globalVariable.url+'owners/login', data)
        .map((response: Response) => {
            let user = response.json();            
            return user;
        });
    }

    getOwnerById(id){
        return this.http.get(globalVariable.url+'users/'+id)
        .map((response: Response) => {
            let user = response.json();            
            return user;
        });
    }

    ownerLogout() {
        localStorage.removeItem('currentOwner');
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getStatus(){
        return this.http.get(globalVariable.url+'status');
    }
    
    resetPassword(id,data){

        return this.http.put(globalVariable.url+'owners/'+id, data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        }); 
    }
    resetAdminPassword(id,data){

        return this.http.put(globalVariable.url+'users/admin/'+id, data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        }); 
    }
    forgetPassword(data){
        return this.http.post(globalVariable.url+'owners/forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    forgetPasswordAdmin(data){
        return this.http.post(globalVariable.url+'users/forget-password', data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
