import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import * as globalVariable from "../global";

@Injectable()
export class GdaxService  {
	authToken: any;
  	constructor(private http: Http, private socket: Socket) {
    	const token = localStorage.getItem('id_token_admin');
    	this.authToken = token;
  	}

  	reConnect(){
  		this.socket.disconnect();
  		setTimeout(()=>{
  			this.socket.connect();
  		},3000)

  	}

  	getAuthenticate(data){
  		return this.http.post(globalVariable.url + 'binance/authenticate',data)
      		.map((response: Response) => {
        	let data = response.json();
        	return data;
      	});
  	}

    getBalance(){
      return this.http.get(globalVariable.url + 'poloniex/coin-balances')
          .map((response: Response) => {
          let data = response.json();
          return data;
        });
    }

  	getCurrency(){
  		return this.http.get(globalVariable.url + 'gdax/markets')
      		.map((response: Response) => {
        	let data = response.json();
        	return data;
      	});
  	}

    buyLimit(coin,form){
      return this.http.get(globalVariable.url + 'binance/trade-buy-limit?symbol='+coin+'&quantity='+form.buy+'&price='+form.price)
          .map((response: Response) => {
          let data = response.json();
          return data;
        });
    }

    sellLimit(coin,form){
      return this.http.get(globalVariable.url + 'binance/trade-sell-limit?symbol='+coin+'&quantity='+form.sell+'&price='+form.price)
          .map((response: Response) => {
          let data = response.json();
          return data;
        });
    }

    buy(coin,form){
      return this.http.get(globalVariable.url + 'binance/trade-buy?symbol='+coin+'&quantity='+form.buy)
          .map((response: Response) => {
          let data = response.json();
          return data;
        });
    }

    sell(coin,form){
      return this.http.get(globalVariable.url + 'binance/trade-sell?symbol='+coin+'&quantity='+form.sell)
          .map((response: Response) => {
          let data = response.json();
          return data;
        });
    }

  	getOpenOrder(coin){
  		return this.http.get(globalVariable.url + 'binance/trade-all-order?symbol='+coin)
      		.map((response: Response) => {
        	let data = response.json();
        	return data;
      	});
  	}
	
	getMarketName(data){
		this.socket.emit('gdaxMarketName', data);
	}

	getMarketSummary() {
		let observable = new Observable(observer => {      
			this.socket.on('gdaxMarketSummary', (data) => {       
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}

    getAlertNotify() {
        let observable = new Observable(observer => {      
            this.socket.on('binanceAlert', (data) => {
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
			this.socket.on('gdaxMarketHistory', (data) => {
        		observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
		return observable;
	}
}