import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, CountryService } from '../service/index';
import {OrderPipe} from "../order.pipe"

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: []
})
export class CountryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
}


@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styles: []
})
export class CountrylistComponent implements OnInit {
	  
    order: string = 'name';
    userFilter: any = { name: '' };
    reverse: boolean = false;
    users= [];

  	constructor(private countryService: CountryService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {     
      this.loadAllUsers();
    }

    private loadAllUsers() {
        this.countryService.getAll().subscribe(users => { 
          console.log(users);
          this.users = users.message;
           });
    }

    private deleteUser(id) {
      if(confirm("Are you sure to delete ?")) {
        this.countryService.deleteOne(id).subscribe(data => { 
                console.log(data)
                this.loadAllUsers();
                this.alertService.success('Country Deleted successful', true);
                this.router.navigate(['/admin/country/list']);
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
  selector: 'app-countryadd',
  templateUrl: './countryadd.component.html',
  styles: []
})
export class CountryaddComponent implements OnInit {
    userAddModel: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private countryService: CountryService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
    ) { }

      ngOnInit() {
        this.userAddModel = this.lf.group({
            name: ['', Validators.required]
        });
        
    }

      private userAdd() {
      
        this.countryService.addUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Country Add successful', true);
                this.router.navigate(['/admin/country/list']);
            }
        );
    }
}


@Component({
  selector: 'app-countryupdate',
  templateUrl: './countryupdate.component.html',
  styles: []
})
export class CountryupdateComponent implements OnInit {

    users:any;
    userAddModel: FormGroup;
    err:any;

      constructor(private lf: FormBuilder, private alertService: AlertService,private countryService: CountryService,private router: Router,private activatedRoute: ActivatedRoute) { }

      ngOnInit() {
/*
        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            //this.getUsers(id);
        });
*/
       /* this.userAddModel = this.lf.group({
            _id: ['', Validators.required],
            title: ['', Validators.required],
            url : ['', Validators.required],
            description: ['', Validators.required],
        });*/

      }

    
     /* private getUsers(id) {
        this.pageService.getOne(id).subscribe(users => { 
            this.users = users.message; 
            this.userAddModel.patchValue(this.users);
            // this.userAddModel.controls['firsttitle'].setValue(this.users.firsttitle);
        });
    }

    private userUpdate() {
        console.log(this.userAddModel.value);
        this.pageService.updateUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Page Updated successful', true);
                this.router.navigate(['/admin/page/list']);
            }
        );
    }*/
}

