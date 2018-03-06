import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService } from '../../services/admin.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-admin-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css'],
})
export class AdminCustomerComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    err: any;

    constructor(
        private lf: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        this.loginForm = this.lf.group({
            email: ['', Validators.required]
        });
    }
}

@Component({
    selector: 'app-admin-customer-list',
    templateUrl: './customerlist.component.html',
    styleUrls: ['./customer.component.css'],
})
export class CustomerListComponent implements OnInit {
    customers: any = [];
    returnUrl: string;
    err: any;

    constructor(
        private lf: FormBuilder,
        private customerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.getList();
    }
    setUsername(fname, lname) {
        var username;
        if (typeof fname === 'undefined' &&  typeof lname === 'undefined') {
            username = 'User';
       }else {
            username = fname + ' ' + lname;
       }
        localStorage.setItem('boardusername', username);
    }
    getList() {
        this.customerService.userList().subscribe(
            (data) => {
                if (!data.error) {
                    this.customers = data.message;
                }
            },
            (err) => {
                console.log('kfgbhj')
            }
        );
    }

    private deleteCustomer(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('User Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.customerService.deleteUserById(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
    selector: 'app-admin-customer-add',
    templateUrl: './customeradd.component.html',
    styleUrls: ['./customer.component.css'],
})
export class CustomerAddComponent implements OnInit {
    customerAddForm: FormGroup;
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordRegex = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    phoneRegex = /^[(]{0,1}[0-9]{2,3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    passwordp: any = '';
    newo: any = false;
    MutchPassword: any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'phonenumber': '',
        'password': '',
        'newpassword': ''
    };

    validationMessages = {
        'firstname': {
            'required': 'First Name is required.',
        },
        'lastname': {
            'required': 'Last Name is required.',
        },
        'phonenumber': {
            'required': 'Phone Number is required.',
            'minlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'maxlength': 'Enter 10 digit mobile number or phone number (with operator code) along with country code.',
            'pattern': "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Email not in well format.'
        },
        'password': {
            'required': 'Password is required.',
            'pattern': 'Please Enter at least one letter and number',
            'minlength': 'Password should contain minimum 6 characters',
        },
        'newpassword': {
            'required': 'Confirm Password is required.',
            'pattern': 'Please Enter at least one letter and number',
            'minlength': 'Password should contain minimum 6 characters',
        }
    };

    constructor(
        private lf: FormBuilder,
        private customerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.customerAddForm = this.lf.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]],
            matchpass: ['', Validators.required],
            newpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordRegex)]]
        });
        this.customerAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.customerAddForm.value.newpassword != "") {
            if (this.customerAddForm.value.password == this.customerAddForm.value.newpassword) {
                this.customerAddForm.controls["matchpass"].setValue(true);
                this.MutchPassword = false;
            } else {
                this.customerAddForm.controls["matchpass"].setValue("");
                this.MutchPassword = true;
            }
        } else {
            this.MutchPassword = false;
        }

    }

    customerAdd() {
        this.customerService.userAdd(this.customerAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('User Created Successfully', { cssClass: 'alert-success', timeout: 3000 });
                    this.router.navigate(['admin/user']);
                } else {
                    this._flashMessagesService.show('Email/Username already in use', { cssClass: 'danger-alert', timeout: 3000 });
                    //this.customerAddForm.reset();
                }
            },
            (err) => {
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.customerAddForm) { return; }
        const form = this.customerAddForm;

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

@Component({
    selector: 'app-admin-customer-edit',
    templateUrl: './customeredit.component.html',
    styleUrls: ['./customer.component.css'],
})
export class CustomerEditComponent implements OnInit {
    currentCustomer: any = {};
    customerAddForm: FormGroup;
    emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    passwordp: any = '';
    newo: any = false;
    MutchPassword: any = false;

    formErrors = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'phonenumber': '',
        'password': '',
        'newpassword': ''
    };

    validationMessages = {
        'firstname': {
            'required': 'First Name is required.',
        },
        'lastname': {
            'required': 'Last Name is required.',
        },
        'phonenumber': {
            'required': 'Phone Number is required.',
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Email not in well format.'
        },
        'password': {
            'required': 'Password is required.'
        },
        'newpassword': {
            'required': 'Password is required.'
        }
    };

    constructor(
        private lf: FormBuilder,
        private customerService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.customerAddForm = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            phonenumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailp)]]
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];
            this.customer(id);
        });

        this.customerAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    matchpasswordreg() {
        if (this.customerAddForm.value.password == this.customerAddForm.value.newpassword) {
            this.customerAddForm.controls["matchpass"].setValue(true);
            this.MutchPassword = false;
        } else {
            this.customerAddForm.controls["matchpass"].setValue("");
            this.MutchPassword = true;
        }
    }

    customerUpdate() {
        this.customerService.userUpdate(this.customerAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('User Profile Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                    this.router.navigate(['admin/user']);
                }
            },
            (err) => {
                console.log('kfgbhj')
            }
        );
    }

    customer(id) {
        this.customerService.getUserById(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.currentCustomer = data.message;
                    console.log(this.currentCustomer)
                    this.customerAddForm.patchValue(this.currentCustomer);
                }
            },
            (err) => {
                console.log(err)
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.customerAddForm) { return; }
        const form = this.customerAddForm;

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

@Component({
    selector: 'app-admin-userboards',
    templateUrl: './userboards.component.html',
    styleUrls: ['./userboards.component.css'],
})
export class AdminUserBoardsComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    err: any;
    user_id: any;
    boards: any;
    username: any;
    constructor(
        private lf: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminService,
        private categoryService: CategoryService,
        private _flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.username = localStorage.getItem('boardusername');
        this.route.params.subscribe((params: Params) => {
            this.user_id = params['id'];
            this.getBoards();
        });
    }
    setBoardName(bname) {
        localStorage.setItem('boardname', bname);
    }
    getBoards() {
        this.adminService.boardsList(this.user_id).subscribe((data) => {
            if (!data.error) {
                this.boards = data.message;
            }
        });
    }
    deleteboard(id) {
        this.adminService.categoryDelete(id).subscribe((data) => {
            if (!data.error) {
                this._flashMessagesService.show('Board deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
                this.getBoards();
            }
        });
    }
}
@Component({
    selector: 'app-admin-userboardsbookmark',
    templateUrl: './userboardsbookmark.component.html',
    styleUrls: ['./userboardsbookmark.component.css'],
})
export class AdminUserBoardsBookmarkComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    err: any;
    board_id: any;
    bookmarks: any;
    boardname: any;
    username: any;
    constructor(
        private lf: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminService,
        public sanitizer: DomSanitizer,
        private _flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.boardname = localStorage.getItem('boardname');
        this.username = localStorage.getItem('boardusername');
        this.route.params.subscribe((params: Params) => {
            this.board_id = params['id'];
            this.getBookmarks();
        });
    }
    getBookmarks() {
        this.adminService.bookmarkList(this.board_id).subscribe((data) => {
            if (!data.error) {
                this.bookmarks = data.message;
            }
        });
    }
   
    deletebookmark(id) {
        this.adminService.bookmarkList(id).subscribe((data) => {
            if (!data.error) {
                this._flashMessagesService.show('Bookmark deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
                this.getBookmarks();
            }
        });
    }
    videoUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}