import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontendheader.component.css']
})
export class FrontendHeaderComponent implements OnInit {

	customer:any;

  	constructor(
        private router:Router) { }

  	ngOnInit() {
  		this.customer = JSON.parse(localStorage.getItem('user'));
  	}

  	logout(){
    	localStorage.clear();
    	this.router.navigate(['/']);

  	}

}
