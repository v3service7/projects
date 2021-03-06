import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class AdminUserComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    err: any;

    constructor(
        private lf: FormBuilder,
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
  selector: 'app-admin-user-list',
  templateUrl: './userlist.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserListComponent implements OnInit {
    users: any = [];
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
        private userService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.userService.userList('User').subscribe(
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

    private deleteUser(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('User Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.userService.deleteUserById(id).subscribe(data => {
                this.getList();
            });
          }
    }
}

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './useradd.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserAddComponent implements OnInit {
    userAddForm: FormGroup;
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
            'minlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength':     'Enter 10 digit mobile number or phone number (with operator code) along with country code.'
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
            'required':      'Confirm Password is required.',
            'pattern' :      'Please Enter at least one letter and number',
            'minlength':     'Password should contain minimum 6 characters',
        }
    };

    constructor(
        private lf: FormBuilder,
        private userService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.userAddForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass : ['', Validators.required],
            newpassword: ['', [Validators.required]]
        });
        this.userAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.userAddForm.value.newpassword !== '') {
            if (this.userAddForm.value.password === this.userAddForm.value.newpassword) {
                this.userAddForm.controls['matchpass'].setValue(true);
                this.MutchPassword = false;
            }else {
                this.userAddForm.controls['matchpass'].setValue('');
                this.MutchPassword = true;
            }
        }else {
            this.MutchPassword = false;
        }

    }

    userAdd() {
        this.userAddForm.value.role = 'User';
        this.userAddForm.value.status = true;
        this.userService.userAdd(this.userAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('User Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/user']);
                }else {
                    console.log(data.error);
                    this._flashMessagesService.show('Username/Phone already in use', { cssClass: 'danger-alert', timeout: 3000 });
                    // this.userAddForm.reset();
                }
            },
            (err) => {
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.userAddForm) {return;  }
        const form = this.userAddForm;

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
  selector: 'app-admin-user-edit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserEditComponent implements OnInit {
	currentUser: any = {};
    userAddForm: FormGroup;
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
        private userService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.userAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]]
        });

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.user(id);
        });

        this.userAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.userAddForm.value.password === this.userAddForm.value.newpassword) {
            this.userAddForm.controls['matchpass'].setValue(true);
            this.MutchPassword = false;
        }else {
            this.userAddForm.controls['matchpass'].setValue('');
            this.MutchPassword = true;
        }
    }

    userUpdate() {
        this.userAddForm.value.role = 'User';
        this.userAddForm.value.status = true;
        this.userService.userUpdate(this.userAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('User Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/user']);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    user(id) {
        this.userService.getUserById(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentUser = data.message;
                  console.log(this.currentUser);
                  this.userAddForm.patchValue(this.currentUser);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.userAddForm) {return;  }
        const form = this.userAddForm;

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
  selector: 'app-admin-user-edit',
  templateUrl: './userchangepass.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserChangepssditComponent implements OnInit {
    currentAdmin: any = {};
    currentCustomer: any = {};
    userAddForm: FormGroup;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    passwordp : any = '';
    newo : any = false;
    MutchPassword : any = false;
    username: string;

    formErrors = {
        'password': '',
        'newpassword': '',
        'cnewpassword': '',
    };

    validationMessages = {
        'newpassword' : {
            'required':      'New Password is required.',
            'pattern' :      'Please Enter at least one letter and number',
            'minlength':     'New Password should contain minimum 6 characters',
        },
        'cnewpassword' : {
            'required':      'Please Confirm New Password.',
            'pattern' :      'Please Enter at least one letter and number',
            'minlength':     'Confirm Password should contain minimum 6 characters',
        } 
    };

    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
        private adminService:AdminService,
        private flashMessage:FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userAddForm = this.lf.group({
            password: ['', Validators.required],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            cnewpassword: ['', [Validators.required]],
            matchpass : ['', Validators.required],
        }); 

        this.route.params.subscribe((params: Params) => {
            this.username = params['username'];
        });
        this.userAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();  
    }

     matchnewpasswordreg(){
        if (this.userAddForm.value.cnewpassword != "") {
            if(this.userAddForm.value.newpassword == this.userAddForm.value.cnewpassword){
                this.userAddForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;   
            }else{
                this.userAddForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        }else{
            this.MutchPassword = false;
        }

    }

    UserChangePassword(){
        this.route.params.subscribe((params: Params) => {
          let obj = {};
            obj['password'] = this.userAddForm.value.password;
            obj['newpassword'] = this.userAddForm.value.newpassword;
            obj['_id'] = params['id'];
            obj['adminID'] = this.currentAdmin._id;
            console.log(obj);
            this.adminService.adminchangePassword(obj).subscribe(
                (data) => {                
                  if (!data._error) {
                      this.flashMessage.show(data.message.status, { cssClass: 'alert-success', timeout: 5000 });
                      this.router.navigate(['admin/user']);
                    }else{
                        this.flashMessage.show("Admin Password Incorrect", { cssClass: 'alert-danger', timeout: 5000 });
                    }
                },
                (err)=>{
                    this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
                    console.log('kfgbhj');
                }
            );
        });
    }

    onValueChanged(data?: any) {
        if (!this.userAddForm) {return;  }
        const form = this.userAddForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }
}
