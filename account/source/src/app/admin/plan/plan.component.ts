import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

/*service*/
import { PlanService} from '../../service/index';

@Component({
    selector: 'app-admin-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.css'],
})
export class AdminPlanComponent implements OnInit {
    constructor(
        private lf: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute
        )
    {}
    ngOnInit() {}
}

@Component({
    selector: 'app-admin-plan-list',
    templateUrl: './planlist.component.html',
    styleUrls: ['./plan.component.css'],
})
export class PlanListComponent implements OnInit {
    plans: any;

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){
        this.getList()
    }

    ngOnInit() {}

    getList(){
        this.planService.planList().subscribe(
            (data) => {
                if (!data.error) {
                    this.plans = data.message;
                }else{
                    this.plans = [];
                    this._flashMessagesService.show('Unable to load Plans!', { cssClass: 'danger-alert', timeout: 5000 });
                }
            },
            (err)=>{
                this.plans = [];
                this._flashMessagesService.show('Server Error. Try Later!', { cssClass: 'danger-alert', timeout: 5000 });
            }
            );
    }

    private deletePlan(id) {
        if(confirm("Are you sure to delete ?")) {
            this.planService.planDelete(id).subscribe(data => {
                if (!data.error) {
                    this._flashMessagesService.show('Plan Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
                }
                this.getList();
            });
        }
    }
}

@Component({
    selector: 'app-admin-plan-add',
    templateUrl: './planadd.component.html',
    styleUrls: ['./plan.component.css'],
})
export class PlanAddComponent implements OnInit {
    currentAdmin: any = {};
    planAddForm: FormGroup;
    amountRegx = /^[0-9]*[.]{0,1}[0-9]{1,2}$/

    formErrors = {
        'name': '',
        'amount': '',
        'type' : '',
        'duration' : ''     
    };

    validationMessages = {
        'name': {
            'required':      'Name is required.',
        },
        'amount': {
            'required':    'Amount is required.',
            'pattern' :    'Invalid Amount/accepts 2 digit after decimal',
        },
        'type' : {
            'required':      'Select Plan Type.'
        },
        'duration' : {
            'required':      'Select Duration.'
        }
    };

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.planAddForm = this.lf.group({
            name: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(this.amountRegx)]],
            desc: [''],
            type: ['', Validators.required],
            duration: ['', Validators.required],
        });
        this.planAddForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    planAdd(){
        this.planService.planAdd(this.planAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Plan added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/plan']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj')
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.planAddForm) {return;  }
        const form = this.planAddForm;

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
    selector: 'app-admin-plan-edit',
    templateUrl: './planedit.component.html',
    styleUrls: ['./plan.component.css'],
})
export class PlanEditComponent implements OnInit {
    currentAdmin: any = {};
    currentCustomer: any = {};
    planAddForm: FormGroup;
    amountRegx = /^[0-9]*[.]{0,1}[0-9]{1,2}$/

    formErrors = {
        'name': '',
        'amount': '',
        'type' : '',
        'duration' : ''     
    };

    validationMessages = {
        'name': {
            'required':      'Name is required.',
        },
        'amount': {
            'required':    'Amount is required.',
            'pattern' :    'Invalid Amount/accepts 2 digit after decimal',
        },
        'type' : {
            'required':      'Select Plan Type.'
        },
        'duration' : {
            'required':      'Select Duration.'
        }
    };

    constructor(
        private lf: FormBuilder, 
        private planService: PlanService,
        private router: Router,
        private route: ActivatedRoute,
        private _flashMessagesService: FlashMessagesService
        ){ 
        this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    }

    ngOnInit() {
        this.planAddForm = this.lf.group({
            _id: ['', Validators.required],
            name: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(this.amountRegx)]],
            desc: [''],
            type: ['', Validators.required],
            duration: ['', Validators.required],
        });

        this.route.params.subscribe((params: Params) => {
            let id = params['id'];  
            this.plan(id);
        });    

        this.planAddForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    planUpdate(){
        this.planService.planUpdate(this.planAddForm.value).subscribe(
            (data) => {
                if (!data.error) {
                    this._flashMessagesService.show('Plan Updated successfully', { cssClass: 'alert-success', timeout: 5000 });
                    this.router.navigate(['admin/plan']);
                }
            },
            (err)=>{
                this._flashMessagesService.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                console.log('kfgbhj')
            }
        );
    }

    plan(id){
        this.planService.plan(id).subscribe(
            (data) => {
                if (!data.error) {
                    this.currentCustomer = data.message;
                    this.planAddForm.patchValue(this.currentCustomer);
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
            );
    }

    onValueChanged(data?: any) {
        if (!this.planAddForm) {return;  }
        const form = this.planAddForm;

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