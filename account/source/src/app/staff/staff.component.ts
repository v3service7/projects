import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffsComponent implements OnInit {
	currentCustomer: any = {};
  	constructor() { 
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  ngOnInit() {}
}