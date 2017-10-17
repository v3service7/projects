import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UsersService } from '../service/index';

@Component({
  selector: 'app-users',
  templateUrl: './usersadd.component.html',
  styles: []
})
export class UsersaddComponent implements OnInit {
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

  	private userAdd() {
        this.usersService.addUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Owner Added Successfully', true);
                this.router.navigate(['/admin/users']);
            }
        );
    }
}
