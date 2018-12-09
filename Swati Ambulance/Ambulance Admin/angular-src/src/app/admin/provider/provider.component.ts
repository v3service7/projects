import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class AdminProviderComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    err: any;

    constructor(
        private lf: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            username: ['', Validators.required]
        });
    }
}

@Component({
  selector: 'app-admin-provider-list',
  templateUrl: './providerlist.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderListComponent implements OnInit {
    providers: any = [];
    returnUrl: string;
    err: any;
    p: number[] = [];
    pageSize = 10;
    txtfilter: string;
    key = 'firstname';
    reverse = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(
        private lf: FormBuilder,
        private providerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.providerService.userList('Provider').subscribe(
            (data) => {
              if (!data.error) {
                     this.providers = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    private deleteProvider(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('Provider Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.providerService.deleteUserById(id).subscribe(data => {
                this.getList();
            });
          }
    }
}

@Component({
  selector: 'app-admin-provider-add',
  templateUrl: './provideradd.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderAddComponent implements OnInit {
    providerAddForm: FormGroup;
    // tslint:disable-next-line:max-line-length
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[0-9]{2,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp: any = '';
    newo: any = false;
    MutchPassword: any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'phonenumber' : '',
        'email' : '',
        'username' : '',
        'password' : '',
        'newpassword' : '',
        'role' : 'Provider'
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber': {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number.',
            'maxlength':     'Enter 10 digit mobile number.'
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email not in well format.'
        },
        'username' : {
            'required':      'username is required.',
        },
        'password' : {
            'required':      'Password is required.',
            'pattern' :      'Please Enter at least one letter and number',
            'minlength':     'Password should contain minimum 6 characters',
        },
        'newpassword' : {
            'required':      'Confirm Password is required.'
        }
    };

    constructor(
        private lf: FormBuilder,
        private providerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.providerAddForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass : ['', Validators.required],
            newpassword: ['', [Validators.required]]
        });
        this.providerAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.providerAddForm.value.newpassword !== '') {
            if (this.providerAddForm.value.password === this.providerAddForm.value.newpassword) {
                this.providerAddForm.controls['matchpass'].setValue(true);
                this.MutchPassword = false;
            }else {
                this.providerAddForm.controls['matchpass'].setValue('');
                this.MutchPassword = true;
            }
        }else {
            this.MutchPassword = false;
        }

    }

    providerAdd() {
        this.providerAddForm.value.role = 'Provider';
        this.providerAddForm.value.status = true;
        console.log(this.providerAddForm.value);
        this.providerService.userAdd(this.providerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Provider Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/provider']);
                }else {
                    console.log(data.error);
                    this._flashMessagesService.show('Email/Username already in use', { cssClass: 'danger-alert', timeout: 3000 });
                    // this.providerAddForm.reset();
                }
            },
            (err) => {
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.providerAddForm) {return;  }
        const form = this.providerAddForm;

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}

@Component({
  selector: 'app-admin-provider-edit',
  templateUrl: './provideredit.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderEditComponent implements OnInit {
	currentProvider: any = {};
    providerAddForm: FormGroup;
    // tslint:disable-next-line:max-line-length
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordp: any = '';
    newo: any = false;
    MutchPassword: any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'phonenumber' : '',
        'email' : '',
        'username' : '',
        'password' : '',
        'newpassword' : ''
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'phonenumber': {
            'required':      'Phone Number is required.',
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email not in well format.'
        },
        'username' : {
            'required':      'username is required.',
        },
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        }
    };

    constructor(
        private lf: FormBuilder,
        private providerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.providerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            username: ['', Validators.required],
        });

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.provider(id);
        });

        this.providerAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.providerAddForm.value.password === this.providerAddForm.value.newpassword) {
            this.providerAddForm.controls['matchpass'].setValue(true);
            this.MutchPassword = false;
        }else {
            this.providerAddForm.controls['matchpass'].setValue('');
            this.MutchPassword = true;
        }
    }

    providerUpdate() {
        this.providerService.userUpdate(this.providerAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Provider Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/provider']);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    provider(id) {
        this.providerService.getUserById(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentProvider = data.message;
                  // console.log(this.currentProvider);
                  this.providerAddForm.patchValue(this.currentProvider);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.providerAddForm) {return;  }
        const form = this.providerAddForm;

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}
