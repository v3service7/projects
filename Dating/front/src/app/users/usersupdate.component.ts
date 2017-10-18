import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UsersService } from '../service/index';

@Component({
  selector: 'app-users',
  templateUrl: './usersupdate.component.html',
  styles: []
})
export class UsersupdateComponent implements OnInit {
	users:any;
    userAddModel: FormGroup;
    err:any;

  	constructor(private lf: FormBuilder, private alertService: AlertService,private usersService: UsersService,private router: Router,private activatedRoute: ActivatedRoute) { }

  	ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getUsers(id);
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

    
  	private getUsers(id) {
        this.usersService.getOne(id).subscribe(users => { 
            this.users = users.message; 
            this.userAddModel.patchValue(this.users);
            // this.userAddModel.controls['firstname'].setValue(this.users.firstname);
        });
    }

    private userUpdate() {
        console.log(this.userAddModel.value);
        this.usersService.updateUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('User Updated successful', true);
                this.router.navigate(['/admin/users']);
            }
        );
    }
}
