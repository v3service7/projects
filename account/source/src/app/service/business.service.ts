import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class BusinessService {
    authToken: any;
    constructor(private http: Http) {
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public businessList(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'api/business-list/'+id,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public business(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.get(globalVariable.url+'api/business/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public businessAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.post(globalVariable.url+'api/business',data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public businessUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.put(globalVariable.url+'api/business/'+data._id,data)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public businessDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        return this.http.delete(globalVariable.url+'api/business/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }
}
