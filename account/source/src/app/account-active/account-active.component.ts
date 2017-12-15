import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CustomerService} from '../service/index';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-account-active',
    templateUrl: './account-active.component.html',
    styleUrls: ['./account-active.component.css']
})
export class AccountActiveComponent implements OnInit {
    token: any;
    err= '';
    emailForm : FormGroup;


    constructor(
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private lf: FormBuilder,
        private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {

        this.emailForm = this.lf.group({
            email : ['', Validators.required]
        });


        // subscribe to router event
        this.route.params.subscribe((params: Params) => {
            this.token = params['token'];
        });
        this.customerService.customerVerify(this.token).subscribe(
            (data) => {
                console.log("data at activation time");
                console.log(data);

                if (!data.error) {
                    //localStorage.setItem('currentCustomer', JSON.stringify(data.message));
                    this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                    document.getElementById('login').style.display = 'block';
                    //this.router.navigate(['customer/login']);
                }else {
                    //this.router.navigate(['customer/login']);
                    this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
                    if (data.error && data.message == 'Email Activation Link Expire.') {
                        document.getElementById('resendLink').style.display = 'block';
                    }
                }
            },
            (err) => {

                console.log("err at activation time");
                console.log(err);

                this._flashMessagesService.show(err.message, { cssClass: 'danger-alert', timeout: 5000 });
                //this.router.navigate(['customer/login']);
            }
        );
    }

    public resendActivationLink(){
        this.customerService.resendActivationLink(this.emailForm.value).subscribe((data)=>{
            if (!data.error) {
                this._flashMessagesService.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
                setTimeout(()=>{
                    this.router.navigate(['customer/login']);
                },1000)
            }else{
                this._flashMessagesService.show(data.message, { cssClass: 'danger-alert', timeout: 5000 });
            }
        })
    }

    public goToLogin(){
        this.router.navigate(['customer/login']);
    }
}

