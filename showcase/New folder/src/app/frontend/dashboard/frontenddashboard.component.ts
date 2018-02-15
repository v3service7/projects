import { Component, OnInit, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as globalVariable from "../../global";

@Component({
  selector: 'app-frontenddashboard',
  templateUrl: './frontenddashboard.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class FrontendDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class MyProfileComponent implements OnInit {
	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
  	
  	customer:any={}
  	customerProfileForm: FormGroup;
  	customerPasswordUpdateForm: FormGroup;

  	constructor(private lf: FormBuilder, public userService : UserService, private _flashMessagesService: FlashMessagesService) {}

  	ngOnInit() {
  		this.customer = JSON.parse(localStorage.getItem('user'));
  		this.customerProfileForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
        });

  		this.customerPasswordUpdateForm = this.lf.group({
            _id: ['', Validators.required],
            oldpassword: ['', Validators.required],
            newpassword: ['', Validators.required],
            confirmpassword: ['', Validators.required],
        });

  		this.getProfile()
  	}

  	getProfile(){
  		this.userService.getProfile().subscribe((data)=>{
  			if (data.user) {
				this.customerProfileForm.patchValue(data.user)
  			}
  		})
  	}

  	profileUpdate(){
  		this.userService.updateProfile(this.customerProfileForm.value).subscribe((data)=>{
  			if (data.User) {
				this._flashMessagesService.show('Profile Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
  			}else{
  				this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
  			}
  		})
  	}

  	passwordUpdate(){
  		if (this.customerPasswordUpdateForm.value['newpassword'] == this.customerPasswordUpdateForm.value['confirmpassword']) {
	  		let obj = {};
	  		obj['_id'] = this.customer['_id'];
	  		obj['password'] = this.customerPasswordUpdateForm.value['newpassword']
	  		this.userService.resetPassword(obj).subscribe((data)=>{
	  			console.log(data)
	  			if (!data.error) {
					this._flashMessagesService.show('Password Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
	  			}
	  		})
  		}else{
  			this._flashMessagesService.show('Password does not match', { cssClass: 'alert-danger', timeout: 5000 });
  		}
  	}

  	onChange(event) {
	    this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			console.log(responsePath)
		};
	}
}
