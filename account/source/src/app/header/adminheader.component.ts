import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { AdminService} from '../service/index';

@Component({
  	selector: 'app-admin-sidebar',
  	templateUrl: './adminsidebar.component.html',
  	styles: []
})
export class AdminSidebarComponent implements OnInit {
	currentAdmin: any = {};
  	constructor(
        private adminService: AdminService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        ) { 
  		this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  	}

  	ngOnInit() {}

    adminLogout(){
      this._flashMessagesService.show('Logout Successfully', { cssClass: 'alert-success', timeout: 5000 });
      localStorage.removeItem('currentAdmin');
      localStorage.removeItem('id_token_admin');
      this.router.navigate(['admin/login']);
        /*this.adminService.adminLogout().subscribe(
            (data) => {
              if (!data.error) {
                    localStorage.removeItem('currentAdmin')
                    this.router.navigate(['admin/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['admin/login']);
            }
        );*/
    }
}

@Component({
      selector: 'app-admin-header',
      templateUrl: './adminheader.component.html',
      styles: []
})
export class AdminHeaderComponent implements OnInit {
    currentAdmin: any = {};
      constructor() { 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }
      ngOnInit() {}
}