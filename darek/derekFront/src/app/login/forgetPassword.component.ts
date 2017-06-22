import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AlertService, AuthService, UsersService } from '../service/index';

@Component({
  selector: 'app-forget',
  templateUrl: './forgetPassword.component.html',
  styles: []
})
export class ForgetComponent implements OnInit {
	forgetForm: FormGroup;
	returnUrl: string;
	err:any;

	constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute){}
	ngOnInit() {
		this.forgetForm = this.lf.group({
	        email: ['', Validators.required]
	      });
	}

	forgetPass(){
        console.log(this.forgetForm.value);
		this.authService.forgetPasswordAdmin(this.forgetForm.value).subscribe(
            (data) => {
                console.log(data);
            }
        );

        this.alertService.success('Check your email to reset password', true);
        this.router.navigate(['/admin/login']);
	}
}

@Component({
  selector: 'app-adminforget',
  templateUrl: './resetPasswordOwner.component.html',
  styles: []
})
export class ResetPasswordAdminComponent implements OnInit {
    forgetForm: FormGroup;
    returnUrl: string;
    err:any;
    id:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute){}
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.forgetForm = this.lf.group({
            password: ['', Validators.required],
            newpassword: ['', Validators.required]
          });
    }

    forgetPass(){
        console.log(this.forgetForm.value);
        this.authService.resetAdminPassword(this.id,this.forgetForm.value).subscribe(
            (data) => {
                this.alertService.success('Password update successfully', true);
                this.router.navigate(['/admin/login']);
            }
        );
    }
}