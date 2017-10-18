import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService, AuthService, UsersService,CustomerService, SocketService, PageService} from '../service/index';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as globalVariable from "../global";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {
	  currentUser: any = {};
  	constructor() { 
  		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	}

  ngOnInit() {

  }

}

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styles: []
})
export class CustomerHeaderComponent implements OnInit {

	currentCustomer: any = {};
  loginForm: FormGroup;
  userRegistrationForm: FormGroup;
  notificationsdata : any = {unreadlength : "", unread : []};
  url :any = globalVariable.url+'uploads/';

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
      ) { 
  	  	this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        console.log('sdggs',this.currentCustomer);
  	    }
  ngOnInit() {
    
    this.loginForm = this.lf.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.Initnotifications();
    this.notifications();
  }

  loginCustomer(){
    this.authService.getCustomer(this.loginForm.value).subscribe(
      (data) => {
        
        console.log("login action");        
        console.log(data); 

         if(data.error){
               alert("wrong credentials");
            }else{
        localStorage.setItem('currentCustomer', JSON.stringify(data.data));
        this.socketService.customerOnline();                   
        this.alertService.success('Login successful', true);
        this.router.navigate(['/customer/profile']);
        }
      });
  }
 
  private Initnotifications(){
  this.customerService.initnotifications(this.currentCustomer._id).subscribe(ndata => {

    console.log("ndata.message");
    console.log(ndata.message);

    this.notificationsdata.unreadlength = ndata.message.length;
    this.notificationsdata.unread = ndata.message;

  });
  }
  
  private notifications(){
  this.socketService.viewbyResponse().subscribe(ndata => {
    console.log("ndataresp");
    console.log(ndata.message);
    this.notificationsdata.unreadlength = ndata.length;
    this.notificationsdata.unread = ndata;

    console.log(ndata);
  })
  }

  private readNotifications(){
    if(this.notificationsdata.unreadlength > 0){
     this.customerService.readnotifications(this.currentCustomer._id).subscribe(message => {
     console.log(message.message);
     this.notificationsdata.unreadlength = 0;
   });
    }
  }

  private checktitle(noti){
    var newurl = "";
    if(noti.title == 'view'){
    newurl = '/customer/publicprofile/'+noti.FromId._id;
    }
    if(noti.title == 'request'){
    newurl = '/customer/friend';
    }
    if(noti.title == 'accept'){
    newurl = '/customer/friend';
    }
    return newurl;
  }

}

@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styles: []
})
export class CustomerFooterComponent implements OnInit {
	
  currentUser: any = {};
  pageslist : any = [];

  	constructor(private pageService : PageService) {	}

  ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.pages();
  }
   
   pages(){
     this.pageService.getAll().subscribe(item => {
       this.pageslist = item.message;
       console.log("this.pages");
       console.log(this.pageslist);
     })
   }



}
