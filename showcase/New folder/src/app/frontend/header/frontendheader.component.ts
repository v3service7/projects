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


    checkCustomer(){
      this.customer = JSON.parse(localStorage.getItem('customer'))
      if (this.customer) {
          if (!this.isHere) {
            this.userService.getProfile().subscribe((data)=>{
                if (data.user) {
                    this.isHere = true;
                    this.currentCustomer = data.user
                }
            })
          }
        return true;
      }else{
        return false;
      }
    }


  	logout(){
    	localStorage.clear();
    	this.router.navigate(['/']);

  	}

}
