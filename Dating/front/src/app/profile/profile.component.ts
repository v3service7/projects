import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, UsersService } from '../service/index';
import {OrderPipe} from "../order.pipe"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  profile:any;
  profileUpdateModel: FormGroup;
  err:any;

  constructor(
    private lf: FormBuilder, 
    private usersService: UsersService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser'))
    {
      var usersValue = localStorage.getItem('currentUser');
      //console.log(JSON.parse(usersValue));
      this.getuser(JSON.parse(usersValue)._id);
    }
    this.profileUpdateModel = this.lf.group({
      _id : ['', Validators.required],
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      username : ['', Validators.required],
      email : ['', Validators.required],
      phone : [],
      age : [],
      gender : [],
    });

    }


    private getuser(id) {
      this.usersService.getOne(id).subscribe(customers => { 
        this.profile = customers.message;

        console.log("this.profile");
        console.log(this.profile);

        this.profileUpdateModel.controls['_id'].setValue(this.profile._id);
        this.profileUpdateModel.patchValue(this.profile);

        console.log("this.profileUpdateModel.value");
        console.log(this.profileUpdateModel.value);
      });
    }

    private profileUpdate() {
      this.usersService.updateUser(this.profileUpdateModel.value).subscribe(
        (data) => {
          this.alertService.success('Profile Updated successful', true);
          this.router.navigate(['/admin/dashboard'])
        }
      );
    }
  }



@Component({
  selector: 'app-cngpass',
  templateUrl: './changepassword.component.html',
  styles: []
})
export class AdminChangePasswordComponent implements OnInit {

  //profile:any;
  changePasswordModel: FormGroup;
  fulldetail : any;
  Match : any = false;
  oldmatch : any = false;

  constructor(
    private lf: FormBuilder, 
    private usersService: UsersService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {

    if(localStorage.getItem('currentUser'))
    {
    this.fulldetail = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.changePasswordModel = this.lf.group({
            oldpassword: ['', Validators.required],
            password: ['', Validators.required],
            confirmpassword : ['', Validators.required],
            matchpass : ['', Validators.required],
            oldmatch : ['', Validators.required]
            });

        
    }
   

   private oldpassword(){
            console.log(this.fulldetail.password, this.changePasswordModel.value);
            if(this.fulldetail.password == this.changePasswordModel.value.oldpassword){         
            this.changePasswordModel.controls["oldmatch"].setValue(true);
            this.oldmatch = false;
            }else{
            this.changePasswordModel.controls["oldmatch"].setValue("");
            this.oldmatch = true;
            }
         }

   private matchpassword(){  
   console.log();   
    if(this.changePasswordModel.value.password == this.changePasswordModel.value.confirmpassword){        
     this.changePasswordModel.controls["matchpass"].setValue(true);
     this.Match = false;
    }else{
     this.changePasswordModel.controls["matchpass"].setValue("");
     this.Match = true;
    }
    }  
   
  private updatepassword() {
      var obj = {username : this.fulldetail.username, id : this.fulldetail._id, password : this.changePasswordModel.value.password};
      this.usersService.updatePassword(obj).subscribe(update => {  
          alert("password change");
          update.message.password = this.changePasswordModel.value.password;
          this.fulldetail = update.message;
          console.log(update);
          localStorage.setItem('currentUser', JSON.stringify(update.message)); 
          this.changePasswordModel.reset();
          this.router.navigate(['/admin/dashboard']);
          
       });

    }


    
  }


