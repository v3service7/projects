import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AlertService, AuthService, UsersService } from '../service/index';
declare var $: any ;
@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styles: []
})
export class AdminLoginComponent implements OnInit {

    forgetForm: FormGroup; 
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private usersService: UsersService

        ) { }


    ngOnInit() {
        //this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.forgetForm = this.lf.group({
            email: ['', [Validators.required]]
        });
    }

    login(){
        this.authService.getUser(this.loginForm.value).subscribe(
            (data) => {
                console.log(data);
                this.alertService.success('Login successful', true);
                this.router.navigate([this.returnUrl]);
            });
    }     
    
    private  forgetPass(){
    console.log(this.forgetForm.value.email);
    this.usersService.forgetPassword(this.forgetForm.value).subscribe((data) => {
      if (data.error){
      alert("wrong email address");  
      }else{     
      $(function () {
      $('#myModal').modal('toggle');
      });
      alert("check you email");  
      }
    });
  }

}

@Component({
    selector: 'app-admin-Registration',
    templateUrl: './admin-Registration.component.html',
    styles: []
})
export class AdminRegistrationComponent implements OnInit {
    adminRegistrationForm: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private usersService: UsersService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        ) { }

    ngOnInit() {
        this.adminRegistrationForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: [''],
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    adminRegistration(){
        this.usersService.adminRegistration(this.adminRegistrationForm.value).subscribe(
            (data) => {
                this.ngOnInit();
                this.alertService.success('Admin Registration successful', true);
                this.router.navigate(['/admin/login']);
            });
    }
}


@Component({
 selector: 'app-resetpassword',
 templateUrl: './resetpassword.component.html',
})
export class AdminResetPasswordComponent implements OnInit {
 changePasswordModel : FormGroup;       
 Match : any = false;   
 cid : any;
 userdetail : any;

 constructor(private lf: FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private usersService: UsersService) { }

 ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.cid = params['id'];
        this.getuserdetail();
        }); 
         this.changePasswordModel = this.lf.group({            
            password: ['', Validators.required],
            confirmpassword : ['', Validators.required],
            matchpass : ['', Validators.required]            
            });
 }


  private getuserdetail(){
   this.usersService.getOne(this.cid).subscribe((data) => {
     this.userdetail = data.message;
     console.log(data);
   })
  }

  private matchpassword(){  
   
    if(this.changePasswordModel.value.password == this.changePasswordModel.value.confirmpassword){        
     this.changePasswordModel.controls["matchpass"].setValue(true);
     this.Match = false;
    }else{
     this.changePasswordModel.controls["matchpass"].setValue("");
     this.Match = true;
    }
    }  
   
  private updatepassword() {
      var obj = {username : this.userdetail.username, id : this.cid, password : this.changePasswordModel.value.password};
      this.usersService.updatePassword(obj).subscribe(update => {  
          alert("password change");
          this.router.navigate(['/']);

       });

    }

}


