import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CustomerService} from '../service/index';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-account-active',
  templateUrl: './account-active.component.html',
  styleUrls: ['./account-active.component.css']
})
export class AccountActiveComponent implements OnInit {
token: any;
err= '';
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
      // subscribe to router event
      this.activatedRoute.params.subscribe((params: Params) => {
        this.token = params['token'];
      });
      this.customerService.customerVerify(this.token).subscribe((data) => {
          if (!data.error) {
            //localStorage.setItem('currentCustomer', JSON.stringify(data.message));
            this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
            this.router.navigate(['customer/login']);
          }else {
            this.router.navigate(['customer/login']);
            this._flashMessagesService.show('Email already in use', { cssClass: 'danger-alert', timeout: 5000 });
          }
        },
        (err) => {
          this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
          this.router.navigate(['customer/login']);
        }
      );
  }
}

