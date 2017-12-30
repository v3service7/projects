import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import * as globalVariable from "../global";

@Injectable()
export class BinanceService  {
	authToken: any;
  	constructor(private http: Http, private socket: Socket) {
    	const token = localStorage.getItem('id_token_admin');
    	this.authToken = token;
  	}

  	reConnect(){
  		//console.log(this.socket)
  		this.socket.disconnect();
  		//console.log(this.socket)
  		setTimeout(()=>{

  		this.socket.connect();
  		//console.log(this.socket)
  		},3000)

  	}

  	getCurrency(){
  		return this.http.get(globalVariable.url + 'binance/prices')
      		.map((response: Response) => {
        	let data = response.json();
        	return data;
      	});
  	}
	
	getMarketName(data){
		this.socket.emit('binanceMarketName', data);
	}

	getMarketSummary() {
		let observable = new Observable(observer => {      
			this.socket.on('binanceMarketSummary', (data) => {       
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}

	getMarketHistory() {
		let observable = new Observable(observer => {      
			this.socket.on('binanceMarketHistory', (data) => {
        		observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}
}