import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as globalVariable from '../global'; 
@Injectable()
export class CategoryService {
    authToken: any;

    constructor(private http: Http) {
        const token = localStorage.getItem('id_token_customer');
        this.authToken = token;
    }
    loadToken() {
        if (localStorage.getItem('id_token_customer')) {
            const token = localStorage.getItem('id_token_customer');
                this.authToken = token;
        }
    }
    public categoryList() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'category', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public category(id) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'category/' + id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public categoryAdd(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'category', data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public categoryUpdate(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'category/' + data._id, data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public categoryPositionUpdate(position) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'category/update-position/' + position, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public categoryDelete(id) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'category/' + id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
