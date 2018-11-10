import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from '../global';

@Injectable()
export class PanicService {
    authToken: any;
    constructor(private http: Http) {
        if (localStorage.getItem('id_token_admin')) {
            const token = localStorage.getItem('id_token_admin');
                this.authToken = token;
            }
       if (localStorage.getItem('id_token')) {
            const token = localStorage.getItem('id_token');
                this.authToken = token;
            }
    }

    loadToken() {
        if (localStorage.getItem('id_token_admin')) {
            const token = localStorage.getItem('id_token_admin');
                this.authToken = token;
        }
        if (localStorage.getItem('id_token')) {
            const token = localStorage.getItem('id_token');
                this.authToken = token;
        }
    }
     public driverpanicList(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'panics/driverpanic/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public panicList() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'panics', {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public panic(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'panics/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public panicAdd(data) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'panics', data, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public panicUpdate(data) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'panics/' + data._id, data, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public panicDelete(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'panics/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }
}
