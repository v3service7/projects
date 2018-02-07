import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';


@Injectable()
export class SocketService {        
	constructor(private http: Http , private socket: Socket) {}

	/*assignSocketIdToCustomer(data){
		if(this.socket.ioSocket.id){
			var sid = this.socket.ioSocket.id;
			data["socketId"] = sid;
			//console.log("customer",data );			          
			localStorage.setItem('currentCustomer', JSON.stringify(data));
			this.socket.emit('assignSocketIdToCustomer', data);
		}
	}*/

	orderFromCustomer(obj){		
		console.log("orderFromCustomer", obj)   
		if(this.socket.ioSocket.id){ 
			this.socket.emit('orderFromCustomer', obj);
		}					
	}

	orderResponseOwnerToCustomer() {
		return this.socket
		.fromEvent("orderResponseOwnerToCustomer")
		.map( data => data );
	}

	orderResponseOwnerToFrom() {
		return this.socket
		.fromEvent('orderResponseOwnerToFrom')
		.map( data => data );
	}

}