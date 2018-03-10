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

    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
    ){}
    ngOnInit() {}
}

@Component({
  selector: 'app-admin-business-list',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./business.component.css'],
})
export class CustomerBusinessListComponent implements OnInit {
    currentCustomer: any = {};
    businesses: any;
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
                    this.businesses = data.message;
                }else{
                    this.businesses = [];
                    this._flashMessagesService.show('Unable to load Business!', { cssClass: 'danger-alert', timeout: 5000 });
                }
            },
            (err)=>{
                this.businesses = [];
                this._flashMessagesService.show('Server Error. Try Later!', { cssClass: 'danger-alert', timeout: 5000 });
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
    mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{2}[-\s\.]{0,1}[0-9]{7}$/;
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
            'pattern'   :    "eg : (971)-55-1234567 including or excluding '(', ')' or '-'. "
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

        this._flashMessagesService.show('Upload Documents to add Business', { cssClass: 'alert-success', timeout: 5000 });
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
    currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    businesses: any={};
    returnUrl: string;
    processCompletePercent: number = 0;
    err:any;
    businessAddForm: FormGroup;
    imgUrl = globalVariable.imageUrl;
    bID = 'business_'+this.currentCustomer._id;
    bData = JSON.parse(localStorage.getItem(this.bID));
    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
    public s3Uploader: FileUploader = new FileUploader({ url: globalVariable.url+'s3upload/'+this.bData.businessName });;
    
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
            tradeLicenseFile: [],
            articleAndPartnershipFile: [],
            certificateOfIncorporationFile: [],
            bankStatementFile: [],
            /*test: ['', Validators.required],*/
        });
        let bID = 'business_'+this.currentCustomer._id
        this.businessAddForm.patchValue(JSON.parse(localStorage.getItem(bID)));
        console.log(this.businessAddForm.value.businessName)
        
        
    }

    onChange(event,fileType) {
        //console.log(this.s3Uploader)
        this.s3Uploader.uploadAll();
        this.s3Uploader.onProgressItem = (file: any, progress: any) =>{
            this.processCompletePercent = progress;
        }
        this.s3Uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            //console.log('responsePath',responsePath.filename.location);
            /*this.businessAddForm.controls['test'].setValue(1);*/
            this.businessAddForm.controls[fileType].setValue(responsePath.filename.location);
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
    currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    plans: any = [];
    isVisit = false;
    businessAddForm: FormGroup;
    mobileRegex = /^[(]{0,1}[2-9]{1}[0-9]{1,2}[)]{0,1}[-\s\.]{0,1}[0-9]{2}[-\s\.]{0,1}[0-9]{7}$/;
    phoneRegex = /^[0-9]*$/;
    imgUrl = globalVariable.imageUrl;
    processCompletePercent: number = 0;

    public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
    s3Uploader: FileUploader ;
    

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
            'pattern'   :    "eg : (971)-55-1234567 including or excluding '(', ')' or '-'. "
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
            tradeLicenseFile: [],
            articleAndPartnershipFile: [],
            certificateOfIncorporationFile: [],
            bankStatementFile: [],
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
        this.s3Uploader.uploadAll();
        this.s3Uploader.onProgressItem = (file: any, progress: any) =>{
            this.processCompletePercent = progress;
        }
        this.s3Uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.businessAddForm.controls[fileType].setValue(responsePath.filename.location);
            /*this.businesses[fileType]= responsePath.filename;*/
        };
    }

    business(id){
        this.businessService.business(id).subscribe(
            (data) => {
            if (!data.error) {
                //console.log(data)
                this.businessAddForm.patchValue(data.message);
                this.s3Uploader = new FileUploader({ url: globalVariable.url+'s3upload/'+this.businessAddForm.value.businessName })
                /*console.log("this.businessAddForm.value");
                console.log(this.businessAddForm.value);*/
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