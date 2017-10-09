import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.css']
})
export class CustomerLoginComponent implements OnInit {
	currentCustomer: any = {};
  	constructor() { 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  ngOnInit() {}
}