import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService} from '../../services/admin.service';
import { FileUploader } from 'ng2-file-upload';

import * as globalVariable from '../../global';


@Component({
  selector: 'app-admin-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class AdminDriverComponent implements OnInit {
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
  selector: 'app-admin-driver-list',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverListComponent implements OnInit {
    drivers: any = [];
    driversCopy: any = [];
    providers: any = [];
    returnUrl: string;
    err: any;
    p: number[] = [];
    pageSize = 10;
    txtfilter: string;
    providerFilter = 'All Providers';
    key = 'firstname';
    reverse = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(
        private lf: FormBuilder,
        private driverService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getList();
        this.getProviderList();
    }

    getSelectValue() {
        this.drivers = this.driversCopy;
        if (this.providerFilter !== 'All Providers' && this.providerFilter !== '') {
            this.drivers = this.drivers.filter((item) => {
                return item.user.firstname === this.providerFilter;
            });
        }
    }

    getList() {
        this.driverService.userList('Driver').subscribe(
            (data) => {
              if (!data.error) {
                     this.drivers = data.message;
                     this.driversCopy = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getProviderList() {
        this.driverService.userList('Provider').subscribe(
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

    private deleteDriver(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('Driver Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.driverService.deleteUserById(id).subscribe(data => {
                this.getList();
            });
          }
    }
}

@Component({
  selector: 'app-admin-driver-add',
  templateUrl: './driveradd.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverAddComponent implements OnInit {
    driverDocumentForm: FormGroup;
    driverAddForm: FormGroup;
    // tslint:disable-next-line:max-line-length
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[0-9]{2,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp: any = '';
    newo: any = false;
    MutchPassword: any = false;
    users: any = [];

    public uploader:FileUploader = new FileUploader({url: globalVariable.url+'upload'});

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'phonenumber': '',
        'username': '',
        'password': '',
        'newpassword': '',
        'user': '',
        'role': 'Driver',
        'status': true
    };

    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
        },
        'lastname': {
            'required':      'Last Name is required.',
        },
        'email' : {
            'required':      'Email is required.',
            'pattern'   :    'Email not in well format.'
        },
        'phonenumber': {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number',
            'maxlength':     'Enter 10 digit mobile number'
        },
        'username': {
            'required':      'username is required.'
        },
        'password' : {
            'required':      'Password is required.',
            'pattern' :      'Please Enter at least one letter and number',
            'minlength':     'Password should contain minimum 6 characters',
        },
        'newpassword' : {
            'required':      'Confirm Password is required.',
        },
        'user': {
            'required':      'Provider is required.',
        }
    };

    constructor(
        private lf: FormBuilder,
        private driverService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.driverDocumentForm = this.lf.group({
            drivingLicense: ['', Validators.required],
            idProof: ['', Validators.required]
        });


        this.driverAddForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass : ['', Validators.required],
            newpassword: ['', [Validators.required]],
            user: ['', Validators.required]
        });
        this.driverAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getUserList();
    }

    matchpasswordreg() {
        if (this.driverAddForm.value.newpassword !== '') {
            if (this.driverAddForm.value.password === this.driverAddForm.value.newpassword) {
                this.driverAddForm.controls['matchpass'].setValue(true);
                this.MutchPassword = false;
            }else {
                this.driverAddForm.controls['matchpass'].setValue('');
                this.MutchPassword = true;
            }
        }else {
            this.MutchPassword = false;
        }

    }

    driverAdd() {
        this.driverAddForm.value.role = 'Driver';
        this.driverAddForm.value.status = true;
        this.driverService.userAdd(this.driverAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Driver Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/driver']);
                }else {
                    console.log(data);
                    this._flashMessagesService.show('Email/Username already in use', { cssClass: 'danger-alert', timeout: 3000 });
                    // this.driverAddForm.reset();
                }
            },
            (err) => {
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                console.log(err);
            }
        );
    }

    getUserList() {
        this.driverService.userList('Provider').subscribe(
            (data) => {
              if (!data.error) {
                     this.users = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.driverAddForm) {return;  }
        const form = this.driverAddForm;

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

    public onChange(event,type){
        this.uploader.uploadAll();
        this.uploader.onProgressItem = (file: any, progress: any) =>{
            console.log("type, progress");
            console.log(type , progress);
        }

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            /*var responsePath = JSON.parse(response).filename;*/
            console.log("type, item, response, status, headers");
            console.log(type, item, response, status, headers);
        };
    }

}

@Component({
  selector: 'app-admin-driver-edit',
  templateUrl: './driveredit.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverEditComponent implements OnInit {
	currentDriver: any = {};
    driverAddForm: FormGroup;
    users: any = [];
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
        'newpassword' : '',
        'user': '',
        'status':''
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
        }
        ,
        'password' : {
            'required':      'Password is required.'
        },
        'newpassword' : {
            'required':      'Password is required.'
        },
        'user': {
            'required':      'Provider is required.',
        }
    };

    constructor(
        private lf: FormBuilder,
        private driverService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.driverAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            user: ['', Validators.required],
            status: ['', Validators.required]
        });

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.driver(id);
            this.getUserList();
        });

        this.driverAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.driverAddForm.value.password === this.driverAddForm.value.newpassword) {
            this.driverAddForm.controls['matchpass'].setValue(true);
            this.MutchPassword = false;
        }else {
            this.driverAddForm.controls['matchpass'].setValue('');
            this.MutchPassword = true;
        }
    }

    getUserList() {
        this.driverService.userList('Provider').subscribe(
            (data) => {
              if (!data.error) {
                     this.users = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    driverUpdate() {
        this.driverService.userUpdate(this.driverAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Driver Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/driver']);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    driver(id) {
        this.driverService.getUserById(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentDriver = data.message;
                  this.driverAddForm.patchValue(this.currentDriver);
                  if (this.currentDriver['status']) {
                    this.driverAddForm.controls['status'].setValue('true')
                  }else{
                    this.driverAddForm.controls['status'].setValue('false')
                  }
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.driverAddForm) {return;  }
        const form = this.driverAddForm;

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
