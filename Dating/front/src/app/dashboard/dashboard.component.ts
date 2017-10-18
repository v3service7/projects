import { Component, OnInit } from '@angular/core';
import { UsersService,CustomerService,PackageService,BannerService,PageService } from '../service/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  users : any = [];
  customers : any = [];
  packages :any = [];
  banners :any = [];
  pages : any = [];

  constructor(private usersService: UsersService ,private customerService : CustomerService, private packageService : PackageService, private bannerService : BannerService, private pageService : PageService) {}

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllcustomers();
    this.loadAllpackages();
    this.loadAllbanners();
    this.loadAllpages();
  }

  private loadAllUsers() {
    this.usersService.getAll().subscribe(users => {
      this.users = users.message;       
    });
  }
  
   private loadAllcustomers() {
    this.customerService.getAll().subscribe(users => {
      this.customers = users.message;
    });
  }

   private loadAllpackages() {
    this.packageService.getAll().subscribe(users => {
      this.packages = users.message; 
    
    });
   }

  private loadAllbanners() {
    this.bannerService.getAll().subscribe(users => {
      this.banners = users.message; 
    
    });
  }

   private loadAllpages() {
    this.pageService.getAll().subscribe(users => {
      this.pages = users.message; 
    
    });
  }


}
