import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontendheader.component.css']
})
export class FrontendHeaderComponent implements OnInit {

    customer:any;
    currentCustomer:any;
	isHere = false;

  	constructor(public userService : UserService,private router:Router) { }

  	ngOnInit() {
  		this.customer = JSON.parse(localStorage.getItem('customer'));
  	}




}
