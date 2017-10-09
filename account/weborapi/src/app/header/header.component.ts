import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
	currentUser: any = {};
  	constructor() { 
  		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	}

  ngOnInit() {}
}