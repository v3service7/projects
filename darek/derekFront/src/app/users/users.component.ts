import { Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, UsersService } from '../service/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {OrderPipe} from "../order.pipe"

declare var toastr: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
    order: string = 'username';
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
                    console.log(data);
                    this.loadAllUsers();
                    toastr.success('User Deleted successful');
                    //this.alertService.success('User Deleted successful', true);
                    this.router.navigate(['/admin/users']);
             });
        }
    }

    sortBy(data) {
        this.order = data;
        if (this.reverse == false) {
            this.reverse = true;
        }else{
            this.reverse = false;
        }
    }
}
@Component({
  selector: 'app-users',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
    order: string = 'username';
    userFilter: any = { username: '' };
    reverse: boolean = false;
	  users= [];
  	constructor(private usersService: UsersService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {
        this.loadAllAdmin();
  	}

    private loadAllAdmin() {
        this.usersService.getAllAdmin().subscribe(users => { this.users = users.message; });
    }

    private deleteAdmin(id) {
        if(confirm("Are you sure to delete ?")) {
            this.usersService.deleteAdminOne(id).subscribe(data => {
                    console.log(data);
                    this.loadAllAdmin();
                    toastr.success('Admin Deleted successful');
                    //this.alertService.success('Admin Deleted successful', true);
                    this.router.navigate(['/admin/list']);
            });
        }
    }

    sortBy(data) {
        this.order = data;
        if (this.reverse == false) {
            this.reverse = true;
        }else{
            this.reverse = false;
        }
    }
}


@Component({
  selector: 'app-users',
  templateUrl: './adminadd.component.html',
  styles: []
})
export class AdminaddComponent implements OnInit {
  userAddModel: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder,
        private usersService: UsersService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.userAddModel = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

    }

    userAdd() {
        this.usersService.addAdmin(this.userAddModel.value).subscribe(
            (data) => {
                toastr.success('Admin Add successful');
                //this.alertService.success('Admin Add successful', true);
                this.router.navigate(['/admin/list']);
            }
        );
    }
}

@Component({
  selector: 'app-users',
  templateUrl: './adminupdate.component.html',
  styles: []
})
export class AdminupdateComponent implements OnInit {
  users:any;
    userAddModel: FormGroup;
    err:any;

    constructor(private lf: FormBuilder, private alertService: AlertService,private usersService: UsersService,private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getAdmin(id);
        });

        this.userAddModel = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

    }

    
    private getAdmin(id) {
        this.usersService.getAdminOne(id).subscribe(users => { 
          

            this.users = users.message; 
            console.log(this.users);
            this.userAddModel.patchValue(this.users);
            // this.userAddModel.controls['firstname'].setValue(this.users.firstname);
        });
    }

    userUpdate() {
        console.log(this.userAddModel.value);
        this.usersService.updateAdmin(this.userAddModel.value).subscribe(
            (data) => {
                toastr.success('Admin Updated successful');
                //this.alertService.success('Admin Updated successful', true);
                this.router.navigate(['/admin/list']);
            }
        );
    }
}
