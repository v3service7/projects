import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';


@Injectable()
export class SocketService {

	constructor(private http: Http , private socket: Socket) {
		console.log("sds");
		console.log("dd",this.socket.ioSocket.id);
	}

	assignSocketIdToOwner(data){
		if(this.socket.ioSocket.id){
			var sid = this.socket.ioSocket.id;
			data["socketId"] = sid;
			console.log("owner",data );			          
			localStorage.setItem('currentOwner', JSON.stringify(data));
			this.socket.emit('assignSocketIdToOwner', data);
		}
	}

	orderReceivedToCustomer() {
		return this.socket
		.fromEvent("orderFromCustomerToOwner")
		.map( data => data );
	}


	orderActionbyOwnerForCustomer(data){
		if(this.socket.ioSocket.id){
			this.socket.emit('orderActionbyOwnerForCustomer', data);
		}
	}

	orderActionbyOwnerForDriver(data){
		if(this.socket.ioSocket.id){
			this.socket.emit('orderActionbyOwnerForDriver', data);
		}
	}

	orderResponseDriverToOwner() {
		return this.socket
		.fromEvent("orderResponseDriverToOwner")
		.map( data => data );
	}


}