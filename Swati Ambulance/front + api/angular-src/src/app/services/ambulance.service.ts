import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from '../global';

@Injectable()
export class AmbulanceService {
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
     public customerambulanceList(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'ambulances/custambulance/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public ambulanceList() {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'ambulances', {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public ambulance(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'ambulances/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public ambulanceAdd(data) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'ambulances', data, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public ambulanceUpdate(data) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'ambulances/' + data._id, data, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }

    public ambulanceDelete(id) {
        const headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'ambulances/' + id, {headers: headers})
        .map((response: Response) => {
            const user = response.json();
            return user;
        });
    }
}
