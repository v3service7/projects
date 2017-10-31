import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as globalVariable from "../global";

@Injectable()
export class PlanService {
    
    constructor(private http: Http) { }

    authToken: any;
    user: any;

    loadToken(){
        const token = localStorage.getItem('id_token_admin');
        this.authToken = token;
    }

    public planList(){
        return this.http.get(globalVariable.url+'api/plan')
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public plan(id){
        return this.http.get(globalVariable.url+'api/plan/'+id)
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public planAdd(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');

        return this.http.post(globalVariable.url+'api/plan',data,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }

    public planUpdate(data){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');

        return this.http.put(globalVariable.url+'api/plan/'+data._id,data,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
    
    public planDelete(id){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        
        return this.http.delete(globalVariable.url+'api/plan/'+id,{headers: headers})
        .map((response: Response) => {
            let user = response.json();
            return user;
        });
    }
}
