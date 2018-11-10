import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AmbulanceService} from '../../services/ambulance.service';
import { AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css'],
})
export class AdminAmbulanceComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-ambulance-list',
  templateUrl: './ambulancelist.component.html',
  styleUrls: ['./ambulance.component.css'],
})
export class AmbulanceListComponent implements OnInit {
    ambulances: any = [];
    ambulancesCopy: any = [];
    providers: any = [];
    returnUrl: string;
    err: any;
    p: number[] = [];
    pageSize = 10;
    txtfilter: string;
    providerFilter = 'All Providers';
    key = 'provider.firstname';
    reverse = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    constructor(
        private lf: FormBuilder,
        private ambulanceService: AmbulanceService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getList();
        this.getProviderList();
    }

    getSelectValue() {
        this.ambulances = this.ambulancesCopy;
        if (this.providerFilter !== 'All Providers' && this.providerFilter !== '') {
            this.ambulances = this.ambulances.filter((item) => {
                return item.provider.firstname === this.providerFilter;
            });
        }
    }

    getList() {
        this.ambulanceService.ambulanceList().subscribe(
            (data) => {
                console.log(data);
              if (!data.error) {
                     this.ambulances = data.message;
                     this.ambulancesCopy = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getProviderList() {
        this.adminService.userList('Provider').subscribe(
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

    private deleteAmbulance(id) {
        if (confirm('Are you sure to delete ?')) {
            this._flashMessagesService.show('Ambulance Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
            this.ambulanceService.ambulanceDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }
}

@Component({
  selector: 'app-admin-ambulance-add',
  templateUrl: './ambulanceadd.component.html',
  styleUrls: ['./ambulance.component.css'],
})
export class AmbulanceAddComponent implements OnInit {
    providers: any = [];
    drivers: any = [];
    ambulanceNumber: any = [];
    ambulanceDesc: any = [];
    ambulanceAddForm: FormGroup;

    formErrors = {
        'ambulanceNumber': '',
        'ambulanceDesc': '',
        'provider': '',
        'driver': ''
    };

    validationMessages = {
        'ambulanceNumber': {
            'required':      'Ambulance Number is required.',
        },
        'ambulanceDesc': {
            'required':      'Ambulance Description is required.',
        },
        'provider': {
            'required':      'Provider is required.',
        },
        'driver': {
            'required':      'Driver is required.',
        }
    };

    constructor(
        private lf: FormBuilder,
        private ambulanceService: AmbulanceService,
        private adminService: AdminService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.ambulanceAddForm = this.lf.group({
            ambulanceNumber: ['', Validators.required],
            ambulanceDesc: ['', Validators.required],
            provider: ['', Validators.required],
            driver: ['', Validators.required]
        });
        this.ambulanceAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getProviderList();
        this.getDriverList();
    }

    ambulanceAdd() {
        this.ambulanceService.ambulanceAdd(this.ambulanceAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Ambulance Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/ambulance']);
                }else {
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getProviderList() {
        this.adminService.userList('Provider').subscribe(
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

    getDriverList() {
        this.adminService.userList('Driver').subscribe(
            (data) => {
              if (!data.error) {
                     this.drivers = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.ambulanceAddForm) {return;  }
        const form = this.ambulanceAddForm;

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
  selector: 'app-admin-ambulance-edit',
  templateUrl: './ambulanceedit.component.html',
  styleUrls: ['./ambulance.component.css'],
})
export class AmbulanceEditComponent implements OnInit {
    currentAmbulance: any = {};
    ambulanceAddForm: FormGroup;
    providers: any = [];
    drivers: any = [];
    ambulanceNames: any = [];
    ambulanceTypes = ['Ambulance', 'Margin Trading', 'Deposit'];

    formErrors = {
        'ambulanceNumber': '',
        'ambulanceDesc': '',
        'provider': '',
        'driver': '',
    };

    validationMessages = {
        'ambulanceNumber': {
            'required':      'Ambulance Number is required.',
        },
        'ambulanceDesc': {
            'required':      'Ambulance Description is required.',
        },
        'provider': {
            'required':      'Provider is required.',
        },
        'driver': {
            'required':      'Driver is required.',
        }
    };

    constructor(
        private lf: FormBuilder,
        private ambulanceService: AmbulanceService,
        private router: Router,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ) {}

    ngOnInit() {
        this.ambulanceAddForm = this.lf.group({
            _id: ['', Validators.required],
            ambulanceNumber: ['', Validators.required],
            ambulanceDesc: ['', Validators.required],
            provider: ['', Validators.required],
            driver: ['', Validators.required]
        });

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.ambulance(id);
            this.getProviderList();
            this.getDriverList();
        });

        this.ambulanceAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    getProviderList() {
        this.adminService.userList('Provider').subscribe(
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

    getDriverList() {
        this.adminService.userList('Driver').subscribe(
            (data) => {
              if (!data.error) {
                     this.drivers = data.message;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ambulanceUpdate() { console.log(this.ambulanceAddForm.value);
        this.ambulanceService.ambulanceUpdate(this.ambulanceAddForm.value).subscribe(
            (data) => {
              if (!data.error) {
                  this._flashMessagesService.show('Ambulance Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['admin/ambulance']);
                }else {
                   this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 3000 });
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ambulance(id) {
        this.ambulanceService.ambulance(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentAmbulance = data.message;
                  this.ambulanceAddForm.patchValue(this.currentAmbulance);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.ambulanceAddForm) {return;  }
        const form = this.ambulanceAddForm;
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
