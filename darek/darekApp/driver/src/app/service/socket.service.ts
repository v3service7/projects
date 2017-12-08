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

	assignSocketIdToDriver(data){
		if(this.socket.ioSocket.id){
			var sid = this.socket.ioSocket.id;
			data["socketId"] = sid;
			console.log("currentDriver",data );
			localStorage.setItem('currentDriver', JSON.stringify(data));
			this.socket.emit('assignSocketIdToDriver', data);
		}
	}

	orderFromOwnerToDriver() {
		return this.socket
		.fromEvent("orderFromOwnerToDriver")
		.map( data => data );
	}



	orderActionbyDriverToOwner(data){
		if(this.socket.ioSocket.id){
			this.socket.emit('orderActionbyDriverToOwner', data);
		}
	}


}