import { Component } from '@angular/core';
import {SocketService} from './service/socket.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';
	constructor(public socketService : SocketService){
		this.onReloadPage();
		this.orderResponseReceived();
	}

	orderResponseReceived(){
		this.socketService.orderResponseOwnerToCustomer().subscribe((data) =>{
			if(localStorage.getItem('currentCustomer')){
				console.log("orderResponseOwnerToCustomer Status", data);	
			}
		})	
	}  

	onReloadPage(){
		if(localStorage.getItem('currentCustomer')){
			var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
			this.socketService.assignSocketIdToCustomer(currentCustomer);
		}
	}
}
