import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as globalVariable from '../global';
@Injectable()
export class BookmarkService {
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
    public bookmarkList() {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'bookmark', {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public bookmark(id) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'bookmark/' + id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public bookmarkAdd(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'bookmark', data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public changePosition(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'bookmark/change-position/', data, {headers: headers})
        .map((response: Response) => {
            let bookmark = response.json();
            return bookmark;
        });
    }
    public bookmarkDeleteSelected(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(globalVariable.url + 'bookmark/delete-selected/', data, {headers: headers})
        .map((response: Response) => {
            let bookmark = response.json();
            return bookmark;
        });
    }
    public bookmarkUpdate(data) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(globalVariable.url + 'bookmark/' + data._id, data, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public bookmarkPositionUpdate(position) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'bookmark/update-position/' + position, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public bookmarkDelete(id) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(globalVariable.url + 'bookmark/' + id, {headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    public categoryBookmarks(id) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(globalVariable.url + 'bookmark/category/' + id, { headers: headers })
            .map((response: Response) => {
                let category = response.json();
                return category;
            });
    }
}
