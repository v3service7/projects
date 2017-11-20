import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {UserService} from '../../services/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	firstname: String;
  lastname: String;
  email: String; 
  username: String; 
  password: String; 
  cpassword: String; 
  check: any=""; 
  
  constructor(
  	private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
		  firstname: this.firstname,
		  lastname: this.lastname,
		  email: this.email,
		  username: this.username,
		  password: this.password 
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Required Fields
    if(!this.cpassword || this.cpassword=="" || this.password!=this.cpassword){
      this.flashMessage.show('Please fill correct Password', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validation for terms of service
    if(!this.check || this.check==""){
      this.flashMessage.show('Please accept terms of service', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.userService.registerUser(user).subscribe(data => {
      if(!data.error){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Email/Username already in use', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/signup']);
      }
    });

  }

}
