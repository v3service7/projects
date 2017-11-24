import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';

@Injectable()
export class BittrexService {
  constructor(private http: Http, private socket: Socket) {}
    customerOnline(){ 
        if (typeof this.socket.ioSocket.id !== 'undefined') {
            console.log(this.socket.ioSocket);   
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
    let observable = new Observable(observer => {
      this.socket.on('allmarketname', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
