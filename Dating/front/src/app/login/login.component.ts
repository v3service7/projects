import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AlertService, AuthService, UsersService,CustomerService, SocketService, PageService} from '../service/index';
declare var $ : any;
declare var toastr : any;
toastr.options.timeOut = 500;

import * as globalVariable from "../global";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userRegistrationForm: FormGroup;
  forgetForm: FormGroup;
  returnUrl: string;
  err:any;
  pageslist : any = [];
  profiles : any = [];
  url : any = globalVariable.imageUrl;

  
  constructor(
    private lf: FormBuilder, 
    private authService: AuthService,
    private usersService: UsersService,
    private customerService:CustomerService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private socketService : SocketService,
    private pageService : PageService
    ) { }


  ngOnInit() {
    this.pages();
    if(localStorage.getItem('currentCustomer')){
      this.initlivenow();     
      this.socketService.customerOffline();
    }
    this.authService.logout();
    
    localStorage.removeItem('currentCustomer');
    localStorage.removeItem('currentChats');      
    localStorage.removeItem('ChatList');     

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/profile';

    this.loginForm = this.lf.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userRegistrationForm = this.lf.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.forgetForm = this.lf.group({
            email: ['', [Validators.required]]
        });
    this.setFeatured();

  }

  private setFeatured(){
      this.customerService.featuredImage().subscribe((data) => {
       // console.log(data);
        var dataarray = [];
        dataarray = data.message;
        if(data.message.length < 6){
          var data1 = (6 - data.message.length);
          var finallen = (data1 + data.message.length)
          for(var i=0; i<data1; i++){
          dataarray.push({profilePic : "",firstname: "", lastname: "",age: "", country :"" });
          } 
          this.profiles = dataarray; 
          }else{
           this.profiles = data.message;      
          }
      
      });
  }


  private initlivenow(){

    console.log("initlivenow");

    if(localStorage.getItem('currentCustomer') != 'undefined' || (typeof localStorage.getItem('currentCustomer') != 'undefined')){
      
      console.log(typeof localStorage.getItem('currentCustomer'));

      var datat  = {_id : JSON.parse(localStorage.getItem('currentCustomer'))._id, islive: false, isbusy : false};
      this.customerService.updateCustomer(datat).subscribe(update => {              
             console.log(update);        
          });

    }
  }  


  forgetPass(){
    console.log(this.forgetForm.value.email);
    this.customerService.forgetPassword(this.forgetForm.value).subscribe((data) => {
      if (data.error){
      
       toastr.remove();
         toastr.error("wrong email address"); 
      }else{     
      $(function () {
      $('#myModal').modal('toggle');
      });
       
         toastr.remove();
         toastr.success("check you email"); 

      }
    });
  }


  login(){
    this.authService.getUser(this.loginForm.value).subscribe(
      (data) => {
        this.alertService.success('Login successful', true);
        this.router.navigate([this.returnUrl]);
      }
    );
  }

  pages(){
    this.pageService.getAll().subscribe(item => {
      this.pageslist = item.message;
      console.log("this.pages");
      console.log(item.message);
    })
  }

  loginCustomer(){
    
    //console.log(this.loginForm.value);

    this.authService.getCustomer(this.loginForm.value).subscribe(
      (data) => {
         if(data.error){
                toastr.remove();
                toastr.error('Wrong credentials');
            }else{
        localStorage.setItem('currentCustomer', JSON.stringify(data.data));
        this.socketService.customerOnline();   
         toastr.remove();
         toastr.success('Login successful');                
        //this.alertService.success('Login successful', true);
        console.log("data.data");
        console.log(data.data.preferences);

        if(typeof data.data.preferences == 'undefined'){
          this.router.navigate([this.returnUrl]);
        }else{
          this.router.navigate(['/customer/allprofile'], { queryParams: { gender: data.data.preferences.gender, country : data.data.preferences.country, age:  data.data.preferences.age, sexualorient : data.data.preferences.sexualorient}});
        }

        }
      });
  }

  userRegistration(){
    this.customerService.addCustomer(this.userRegistrationForm.value).subscribe(
      (data) => {        
        if(data.error){
         //alert(data.message);
          toastr.remove();
         toastr.error(data.message);
        }else{
        this.customerService.addactivate(data.message).subscribe((dataq) => {
        this.userRegistrationForm.reset();  
        //this.alertService.success('User Registration successful', true);
         toastr.remove();
         toastr.success("Registration Successfully check Your email for  account activation");
        this.router.navigate(['/']);
        });   
        }      
      });
  }
}


@Component({
  selector: 'app-userRegistration',
  templateUrl: './userRegistration.component.html',
  styles: []
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  err:any;

  constructor(
    private lf: FormBuilder, 
    private usersService: UsersService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    ){}

  ngOnInit() {
    this.userRegistrationForm = this.lf.group({
      password: ['', Validators.required],
      email: ['', Validators.required],
    });        
  }


  userRegistration(){

    this.usersService.userRegistration(this.userRegistrationForm.value).subscribe(
      (data) => {
        this.ngOnInit();
        this.alertService.success('User Registration successful', true);
        this.router.navigate(['/']);
      });
  }
}

