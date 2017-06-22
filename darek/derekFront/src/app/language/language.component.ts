import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, MasterService } from '../service/index';
import {OrderPipe} from "../order.pipe"

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styles: []
})
export class LanguageComponent implements OnInit {
  	constructor() { }
  	ngOnInit() {}
}

@Component({
  selector: 'app-languagelist',
  templateUrl: './languagelist.component.html',
  styles: []
})
export class LanguagelistComponent implements OnInit {
	order: string = 'name';
    userFilter: any = { name: '' };
    reverse: boolean = false;
    users= [];
  	constructor(private masterService: MasterService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {
      this.loadAllLanguage();
    }

    private loadAllLanguage() {
        this.masterService.getAllLanguage().subscribe(users => { this.users = users.message; });
    }

    private deleteCountry(id) {
      if(confirm("Are you sure to delete ?")) {
        this.masterService.deleteOneLanguage(id).subscribe(data => { 
                this.alertService.error('Language Deleted Successfully', true);
                this.loadAllLanguage();
         });
      }
    }

    private sortBy(data) {
        this.order = data;
        if (this.reverse == false) {
            this.reverse = true;
        }else{
            this.reverse = false;
        }
    }
}
@Component({
  selector: 'app-languageadd',
  templateUrl: './languageadd.component.html',
  styles: []
})
export class LanguageaddComponent implements OnInit {
    userAddModel: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private masterService: MasterService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.userAddModel = this.lf.group({
            name: ['', Validators.required],
            abbr: ['', Validators.required],
            currency: ['', Validators.required]

        });    
    }

    private userAdd() {
        this.masterService.addLanguage(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Language Added Successfully', true);
                this.router.navigate(['/admin/language']);
            }
        );
    }
}
@Component({
  selector: 'app-languageupdate',
  templateUrl: './languageupdate.component.html',
  styles: []
})
export class LanguageupdateComponent implements OnInit {
    users:any;
    userAddModel: FormGroup;
    err:any;

      constructor(private lf: FormBuilder, private alertService: AlertService,private masterService: MasterService,private router: Router,private activatedRoute: ActivatedRoute) { }

      ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getUsers(id);
        });

        this.userAddModel = this.lf.group({
            _id: ['', Validators.required],
            name: ['', Validators.required],
            abbr: ['', Validators.required],
            currency: ['', Validators.required],

        });

      }

    
      private getUsers(id) {
        this.masterService.getOneLanguage(id).subscribe(users => { 
            this.users = users.message; 
            this.userAddModel.patchValue(this.users);
            // this.userAddModel.controls['firsttitle'].setValue(this.users.firsttitle);
        });
    }

    private languageUpdate() {
        console.log(this.userAddModel.value);
        this.masterService.updateLanguage(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Language Updated Successfully', true);
                this.router.navigate(['/admin/language']);
            }
        );
    }
}

