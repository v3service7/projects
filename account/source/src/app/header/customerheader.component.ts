import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { CustomerService} from '../service/index';

@Component({
  	selector: 'app-customer-sidebar',
  	templateUrl: './customersidebar.component.html',
  	styles: []
})
export class CustomerSidebarComponent implements OnInit {
	currentCustomer: any = {};
  	constructor(
        private customerService: CustomerService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,
        ) {
  		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  	}

  	ngOnInit() {}

    customerLogout(){
      this._flashMessagesService.show('Logout Successfully', { cssClass: 'alert-success', timeout: 5000 });
      localStorage.removeItem('currentCustomer');
      localStorage.removeItem('id_token_customer');
      this.router.navigate(['customer/login']);
        /*this.customerService.customerLogout().subscribe(
            (data) => {
              if (!data.error) {
                    this._flashMessagesService.show('Logout Successfull', { cssClass: 'alert-success', timeout: 5000 });
                    localStorage.removeItem('currentCustomer');
                    this.router.navigate(['customer/login']);
                }else{

                }
            },
            (err)=>{
                this.router.navigate(['customer/login']);
            }
        );*/
    }
}

@Component({
      selector: 'app-customer-header',
      templateUrl: './customerheader.component.html',
      styles: []
})
export class CustomerHeaderComponent implements OnInit {
    currentCustomer: any = {};
      constructor() { 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }
      ngOnInit() {}
}