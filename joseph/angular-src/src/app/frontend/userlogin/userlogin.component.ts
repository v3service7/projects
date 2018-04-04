import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

	username: String;
  	password: String;
  	otp: String;
  	authfactor : any = false;
  	authOpen : any = false;
  	authFactor:any={};
  	user:any={};

	constructor(
	    private flashMessage:FlashMessagesService,
	    private userService:UserService,
	    private router: Router
    ) { }

	ngOnInit() {
		if(this.userService.loggedIn()){
	      this.router.navigate(['profile']);
	    }
	}

    onLoginSubmit(){
	    const user = {
	      username: this.username,
	      password: this.password
	    }

	    this.userService.validateUser(user).subscribe(data => {
	      if(data.success){
	      	localStorage.setItem('market', 'Binance');
			localStorage.setItem('currency', 'ETHBTC');
	        this.userService.storeUser(data.token, data.user);
	        this.getProfile();
	        //this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
	        //this.router.navigate(['dashboard']);
	      } else {
	        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
	        this.router.navigate(['login']);
	      }
	    });
  	}

  	getProfile(){
	  	this.userService.getProfile().subscribe(profile => {
			this.authfactor = profile.user.authfactor;
			this.user = profile.user;
			if (!this.authfactor) {
				this.router.navigate(['dashboard']);
			}
	    },
	    err => {
	      console.log(err);
	      return false;
	    });
    }

    verifyAuth(){
    	let obj = {};
    	obj['token'] = this.otp;
    	obj['tempSecret'] = this.user.twofactor.tempSecret;
        this.userService.verifyAuth(obj).subscribe(data => {
        	this.otp = '';
    		this.authOpen = false;
        	if (data.status) {
			    this.flashMessage.show('2 Factor Authentication Successfully', {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['dashboard']);
        	}else{
        		this.flashMessage.show('2 Factor Authentication Wrong', {cssClass: 'alert-danger', timeout: 3000});
        	}
        	console.log(data)
        },error => {
        	this.otp = '';
    		this.authOpen = false;
			this.flashMessage.show('2 Factor Authentication Wrong', {cssClass: 'alert-danger', timeout: 3000});        	
        });
    }

}
