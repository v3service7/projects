import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    if (this.adminService.loggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.adminService.authenticateUser(user).subscribe(data => {
      if (!data.error) {
        this.adminService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['admin/dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'danger-alert',
          timeout: 5000});
        this.router.navigate(['admin/login']);
      }
    });
  }

}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./login.component.css']
})
export class ResetComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
    
  }


}
