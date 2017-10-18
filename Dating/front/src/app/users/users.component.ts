import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AlertService, UsersService ,FriendService} from '../service/index';
import {OrderPipe} from "../order.pipe"
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
    order: string = 'firstname';
    userFilter: any = { username: '' };
    reverse: boolean = false;
	  users= [];
  	constructor(private usersService: UsersService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {
        this.loadAllUsers();
  	}

    private loadAllUsers() {
        this.usersService.getAll().subscribe(users => { this.users = users.message; });
    }

    private deleteUser(id) {
      if(confirm("Are you sure to delete ?")) {
        this.usersService.deleteOne(id).subscribe(data => { 
                console.log(data)
                this.loadAllUsers();
                this.alertService.success('User Deleted successful', true);
                this.router.navigate(['/admin/users']);
         });
      }
    }

    private sortBy(data) {
        this.order = data;
        if (this.reverse == false) {
            this.reverse = true;
        }else{
            this.reverse = false;
        }
    }

    
}
