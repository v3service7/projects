import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import * as globalVariable from "../global";

@Injectable()
export class HoubiService  {
	authToken: any;
    baseURL = 'https://api.huobi.pro/';
    headers = new Headers();
    constructor(private http: Http, private socket: Socket) {}


    getCurrency(){
        this.headers.append('Content-Type','application/x-www-form-urlencoded');
  		return this.http.get(this.baseURL + 'v1/common/symbols', {headers: this.headers})
      		.map((response: Response) => {
        	let data = response.json();
        	return data;
      	});
  	}
	
	getMarketName(data){
		this.socket.emit('gdaxMarketName', data);
	}

	getMarketSummary(data) {
        this.headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.get(this.baseURL + 'market/detail/merged?symbol='+data, {headers: this.headers})
            .map((response: Response) => {
                let data = response.json();
                return data;
            });
	}

	getMarketHistory(data) {
        this.headers.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.get(this.baseURL + 'market/depth?type=step1&symbol='+data, {headers: this.headers})
            .map((response: Response) => {
                let data = response.json();
                return data;
            });
	}
}