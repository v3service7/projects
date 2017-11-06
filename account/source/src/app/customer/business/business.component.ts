import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as globalVariable from "../../global";

/*service*/
import { CustomerService, BusinessService, PlanService} from '../../service/index';

@Component({
  selector: 'app-customer-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessComponent implements OnInit {
    currentCustomer: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
    ){ 
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {}
}

@Component({
  selector: 'app-admin-business-list',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessListComponent implements OnInit {
    currentCustomer: any = {};
    businesses: any=[];
    returnUrl: string;
    err:any;

      constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.customer(this.currentCustomer._id);
        }); 
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
              if (!data.error) {
                  this.currentCustomer = data.message;
                  this.getList(this.currentCustomer._id);
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
                     this.businesses = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
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
}

@Component({
  selector: 'app-customer-business-add',
  templateUrl: './businessadd.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessAddComponent implements OnInit {
    currentCustomer: any = {};
    plans: any = [];
    isVisit = false;
    businessAddForm: FormGroup;
    mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{7}$/;
    phoneRegex = /^[0-9]*$/;
    /*passportRegex = /^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$/;*/

    formErrors = {
        'businessName': '',
        'tradeLicenseNumber': '',
        'tradeLicenseExpiry' : '',
        'emiRate' : '',
        'phoneNumber' : '',
        'ownerName' : '',
        'mobileNumber' : '',
        'passportNumber' : '',
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
        /*'passportNumber' : {
            'required':    'Passport Number is required.',
            'pattern' :    'eg : G0308084<1ITY9999999Q0410056<<<<<<<<<<<<<<39'
        },*/   
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
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
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

            /*passportFile: [''],
            visaFile: [''],
            emiRatesIdFile: [''],
            tradeLicenseFile: [''],
            articleAndPartnershipFile: [''],
            certificateOfIncorporationFile: [''],
            bankStatementFile: [''],*/
        });

        this.customer(this.currentCustomer._id);

        this.businessAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getPlanList();
    }

    checkIsVisit(){
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
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

    businessAdd(){
        /*this.businessService.businessAdd(this.businessAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Business Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['customer/business/document-update',data.message._id]);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'danger-alert', timeout: 5000 });
            }
        );*/

        console.log("this.businessAddForm.value");
        console.log(this.businessAddForm.value);

        this._flashMessagesService.show('Upload Documents to add Business', { cssClass: 'alert-warning', timeout: 5000 });
        let bID = 'business_'+this.currentCustomer._id;
        localStorage.setItem(bID, JSON.stringify(this.businessAddForm.value));
        this.router.navigate(['customer/business/document-update']);
    }

    customer(id){
        this.customerService.customer(id).subscribe(
            (data) => {
            if (!data.error) {
                this.currentCustomer = data.message;
                let name = this.currentCustomer.firstname+' '+this.currentCustomer.lastname
                this.businessAddForm.controls["ownerName"].setValue(name);
                this.businessAddForm.controls["mobileNumber"].setValue(this.currentCustomer.phonenumber);
                this.businessAddForm.controls["ownerId"].setValue(data.message._id);
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.businessAddForm) {return;  }
        const form = this.businessAddForm;
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
  selector: 'app-admin-business-document',
  templateUrl: './businessdocument.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessDocumentComponent implements OnInit {
    currentCustomer: any = {};
    businesses: any={};
    returnUrl: string;
    processCompletePercent: number = 0;
    err:any;
    businessAddForm: FormGroup;
    imgUrl = globalVariable.imageUrl;

    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

    constructor(
        private lf: FormBuilder, 
        private businessService: BusinessService,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){ 
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
            businessName: [],
            typeOfOrg: [],
            tradeLicenseNumber: [],
            issuingAuthority: [],
            tradeLicenseExpiry: [],
            emiRate: [],
            phoneNumber: [],
            ownerName: [],
            mobileNumber: [],
            passportNumber: [],
            nationality: [],
            emiRateIdNumber: [],
            ownerId: [],
            plan: [],
            bankName: [],
            bankBranch: [],
            bankAccountNumber: [],
            certificateOfIncorporationNo: [],
            vattrn: [],
            siteVisit: [],
            noDaysRequired: [],


            passportFile: ['', Validators.required],
            visaFile: ['', Validators.required],
            emiRatesIdFile: ['', Validators.required],
            tradeLicenseFile: ['', Validators.required],
            articleAndPartnershipFile: ['', Validators.required],
            certificateOfIncorporationFile: ['', Validators.required],
            bankStatementFile: ['', Validators.required],
        });

        let bID = 'business_'+this.currentCustomer._id
        this.businessAddForm.patchValue(JSON.parse(localStorage.getItem(bID)));
    }

    onChange(event,fileType) {
        this.uploader.uploadAll();
        this.uploader.onProgressItem = (file: any, progress: any) =>{
            this.processCompletePercent = progress;
        }
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            console.log(fileType,responsePath.filename);
            this.businessAddForm.controls[fileType].setValue(responsePath.filename);
        };
    }

    businessDocument(){
        this.businessService.businessAdd(this.businessAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Business Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['customer/business']);
                    localStorage.removeItem('business_'+this.currentCustomer._id);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Network/ Server Issue. Please Try Again!', { cssClass: 'danger-alert', timeout: 5000 });
            }
        );
    }
}

@Component({
  selector: 'app-admin-business-edit',
  templateUrl: './businessedit.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessEditComponent implements OnInit {
    currentCustomer: any = {};
    plans: any = [];
    isVisit = false;
    businessAddForm: FormGroup;
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
        'passportNumber' : '',
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
        private customerService: CustomerService,
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService,
    ){ 
          this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    }

    ngOnInit() {
        this.businessAddForm = this.lf.group({
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

        this.businessAddForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        this.getPlanList();
    }

    checkIsVisit(){
        if (this.businessAddForm.value.siteVisit != 'AED 0') {
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
        this.businessService.businessUpdate(this.businessAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Business Updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['customer/business']);
                }else{
                    this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                    this.router.navigate(['customer/business']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj');
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
            this.businessAddForm.controls[fileType].setValue(responsePath.filename);
            /*this.businesses[fileType]= responsePath.filename;*/
        };
    }

    business(id){
        this.businessService.business(id).subscribe(
            (data) => {
            if (!data.error) {
                console.log(data)
                this.businessAddForm.patchValue(data.message);
                console.log("this.businessAddForm.value");
                console.log(this.businessAddForm.value);
            }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.businessAddForm) {return;  }
        const form = this.businessAddForm;
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