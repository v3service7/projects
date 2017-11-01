import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as globalVariable from "../../global";
/*service*/
import { AdminService, CustomerService, BusinessService, PlanService} from '../../service/index';

@Component({
  selector: 'app-admin-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class AdminBusinessComponent implements OnInit {
    currentAdmin: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

      ngOnInit() {
      }
}

@Component({
  selector: 'app-admin-business-list',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessListComponent implements OnInit {
    currentAdmin: any = {};
    currentCustomer: any = {};
    businesses: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private adminService: AdminService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
    ){ 
          this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
      }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.getList(id);
            this.customer(id);
        }); 
    }
    
    private deleteBusiness(id) {
        if(confirm("Are you sure to delete ?")) {
            this.businessService.businessDelete(id).subscribe(data => {
                if (!data.error) {
                    this._flashMessagesService.show('Business deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.getList(this.currentCustomer._id);
                }else{
                    this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'alert-success', timeout: 5000 });
                }
            });
        }
    }

    customer(id){
        this.adminService.customer(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentCustomer = data.message;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getList(id){
        this.businessService.businessList(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.businesses = data.message;
                    console.log("this.businesses");
                    console.log(this.businesses);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    goToCustomerList(){
        this.router.navigate(['/admin/customer']);
    }
}

@Component({
  selector: 'app-admin-business-view',
  templateUrl: './businessview.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessViewComponent implements OnInit {
    currentAdmin: any = {};
    business: any = {};
    id : any;

    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private businessService: BusinessService,
        private route: ActivatedRoute
    ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];  
            this.getBusiness(this.id);
        }); 
    }

    getBusiness(id){
        this.businessService.business(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.business = data.message;
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    goToBusinessList(){
        this.router.navigate(['/admin/business',this.id]);
    }
}

@Component({
  selector: 'app-admin-business-edit',
  templateUrl: './businessedit.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessEditComponent implements OnInit {
    currentAdmin: any = {};
    businessDetail: any = {};
    plans: any = [];
    isVisit = false;
    businessEditForm: FormGroup;
    mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    phoneRegex = /^[0-9]*$/;
    imgUrl = globalVariable.imageUrl;

    processCompletePercent: number = 0;

    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

    formErrors = {
        'businessName': '',
        'tradeLicenseNumber': '',
        'tradeLicenseExpiry' : '',
        'emiRate' : '',
        'phoneNumber' : '',
        'ownerName' : '',
        'mobileNumber' : '',
        'nationality' : '',
        'emiRateIdNumber' : '',
    };

    validationMessages = {
        'businessName': {
            'required':      'Name is required.',
        },
        'tradeLicenseNumber': {
            'required':      'Trade License Number is required.',
        },
        'emiRate': {
            'required':      'Emi Rate is required.',
        },
        'tradeLicenseExpiry' : {
            'required':      'Trade License Expiry is required.',
        }, 
        'phoneNumber' : {
            'required':      'Phone Number is required.',
            'pattern'   :    "Invalid Phone Number"
        },
        'ownerName' : {
            'required':      'Owner Name is required.'
        },
        'mobileNumber' : {
            'required':      'Phone Number is required.',
            'minlength':     'Enter 10 digit mobile number along with country code.',
            'maxlength':     'Enter 10 digit mobile number along with country code.',
            'pattern'   :    "eg : (971)-055-1234567 including or excluding '(', ')' or '-'. "
        },   
        'nationality' : {
            'required':      'Nationality is required.'
        },   
        'emiRateIdNumber' : {
            'required':      'Emirate Id Number is required.'
        },           
    };

    constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private adminService: AdminService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){}

    ngOnInit() {
        this.businessEditForm = this.lf.group({
            _id: ['', Validators.required],
            businessName: ['', Validators.required],
            typeOfOrg: [''],
            tradeLicenseNumber: ['', Validators.required],
            issuingAuthority: [''],
            tradeLicenseExpiry: ['', Validators.required],
            emiRate: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
            ownerName: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.mobileRegex)]],
            passportNumber: ['', Validators.required],
            nationality: ['', Validators.required],
            emiRateIdNumber: ['', Validators.required],
            ownerId: ['', Validators.required],
            plan: ['', Validators.required],
            bankName: [''],
            bankBranch: [''],
            bankAccountNumber: [''],
            certificateOfIncorporationNo: [''],
            vattrn: [''],
            siteVisit: [''],
            noDaysRequired: [''],

            passportFile: ['', Validators.required],
            visaFile: ['', Validators.required],
            emiRatesIdFile: ['', Validators.required],
            tradeLicenseFile: ['', Validators.required],
            articleAndPartnershipFile: ['', Validators.required],
            certificateOfIncorporationFile: ['', Validators.required],
            bankStatementFile: ['', Validators.required],
        });
        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.business(id);
        });

        this.businessEditForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getPlanList();
    }

    checkIsVisit(){
        if (this.businessEditForm.value.siteVisit != 'AED 0') {
            this.isVisit = true;
        }else{
            this.isVisit = false;
        }
    }

    getPlanList(){
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                     this.plans = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    businessUpdate(){
        this.businessService.businessUpdate(this.businessEditForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Business Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/business/',this.businessEditForm.value.ownerId]);
                }else{
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                    this.businessEditForm.reset();
                    this.businessEditForm.patchValue(this.businessDetail);
                    //this.router.navigate(['admin/business/',this.businessEditForm.value.ownerId]);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                this.businessEditForm.reset();
                this.businessEditForm.patchValue(this.businessDetail);
            }
        );
    }

    onChange(event,fileType) {
        this.uploader.uploadAll();
        this.uploader.onProgressItem = (file: any, progress: any) =>{
            this.processCompletePercent = progress;
        }
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.businessEditForm.controls[fileType].setValue(responsePath.filename);
            /*this.businesses[fileType]= responsePath.filename;*/
        };
    }

    business(id){
        this.businessService.business(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.businessDetail = data.message;
                    this.businessEditForm.patchValue(data.message);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.businessEditForm) {return;  }
        const form = this.businessEditForm;
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

    goToBusinessList(){
        this.router.navigate(['/admin/business',this.businessEditForm.value.ownerId]);
    }
}