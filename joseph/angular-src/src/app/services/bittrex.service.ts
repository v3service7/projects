    import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import * as globalVariable from "../global";

@Injectable()
export class BittrexService {
  authToken: any;
  constructor(private http: Http, private socket: Socket) {
    const token = localStorage.getItem('id_token_admin');
    this.authToken = token;
  }
    customerOnline(){ 
        if (typeof this.socket.ioSocket.id !== 'undefined') {
            console.log(this.socket.ioSocket);   
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

  getMarketName(data){    
    this.socket.emit('marketName', data);
  }
  getMarketSummary() {
    let observable = new Observable(observer => {      
      this.socket.on('getmarketsummary', (data) => {       
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
      this.socket.on('getmarkethistory', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getMarkets() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(globalVariable.url + 'exchangeapi', { headers: headers })
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }
  getCurrency() {
    let observable = new Observable(observer => {
      this.socket.on('allCurrency', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

    getOpenOrder(coin){
        return this.http.get(globalVariable.url + 'bittrexApi/trade-all-order?symbol='+coin)
              .map((response: Response) => {
            let data = response.json();
            return data;
        });
    }

  tradeSell() {
    var data={
      marketName: 'BTC-ZEC',
      quantity: 1.00000000,
      rate: 0.04423432
    }
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(globalVariable.url + 'bittrexApi/tradesell',data, { headers: headers })
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }

}
