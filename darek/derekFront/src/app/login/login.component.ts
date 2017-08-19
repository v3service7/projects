import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { AlertService, AuthService, UsersService } from '../service/index';

declare var toastr: any;

@Component({
  moduleId:module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
  returnUrl: string;
	err:any;

  	constructor(
        private lf: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        //private _flashMessagesService: FlashMessagesService,
    ) { }


  	ngOnInit() {
      this.authService.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
		  this.loginForm = this.lf.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  	}

    login(){
        this.authService.getUser(this.loginForm.value).subscribe(
            (data) => {
              if (data.status) {
                    localStorage.setItem('currentUser', JSON.stringify(data.data));
                    toastr.success('Login successful');
                    //this.alertService.success('Login successful', true);
                    //this._flashMessagesService.show('Login successful', { cssClass: 'alert-success', timeout: 10000 });
                    this.router.navigate([this.returnUrl]);
                }else{
                    toastr.warning('Bad Credential');
                    //this._flashMessagesService.show('Bad Credential', { cssClass: 'alert-danger', timeout: 10000 });
                    //this.alertService.error('Bad Credential', true);
                    this.router.navigate(['admin/login']);
                }
            },
            (err)=>{
              toastr.error('Bad Credential');
              //this._flashMessagesService.show('Bad Credential', { cssClass: 'alert-danger', timeout: 10000 });
              //this.alertService.error('Bad Credential', true);
              //this.router.navigateByUrl('/admin/login', { queryParams: { err: 1 } });              
            }
        );
    }

}
