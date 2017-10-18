import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, PromotionService } from '../service/index';
import {OrderPipe} from "../order.pipe"

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styles: []
})
export class PromotionComponent implements OnInit {
	userFilter: any = { username: '' };
  	constructor() { }

  	ngOnInit() {}
}

@Component({
  selector: 'app-promotionlist',
  templateUrl: './promotionlist.component.html',
  styles: []
})
export class PromotionlistComponent implements OnInit {
	  order: string = 'name';
    userFilter: any = { name: '' };
    reverse: boolean = false;
  users= [];
  	constructor(private promotionService: PromotionService,private router: Router,private alertService: AlertService) { }

  	ngOnInit() {
      this.loadAllUsers();
    }

    private loadAllUsers() {
        this.promotionService.getAll().subscribe(users => { this.users = users.message; });
    }

    private deleteUser(id) {
      if(confirm("Are you sure to delete ?")) {
        this.promotionService.deleteOne(id).subscribe(data => { 
                console.log(data)
                this.loadAllUsers();
                this.alertService.success('User Deleted successful', true);
                this.router.navigate(['/admin/promotion/list']);
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
  selector: 'app-promotionadd',
  templateUrl: './promotionadd.component.html',
  styles: []
})
export class PromotionaddComponent implements OnInit {
    userAddModel: FormGroup;
    err:any;

    constructor(
        private lf: FormBuilder, 
        private promotionService: PromotionService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
    ) { }

      ngOnInit() {
        this.userAddModel = this.lf.group({
            name: ['', Validators.required],
        });
        
    }

      private userAdd() {
        this.promotionService.addUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('Pacakage Add successful', true);
                this.router.navigate(['/admin/promotion/list']);
            }
        );
    }
}


@Component({
  selector: 'app-promotionupdate',
  templateUrl: './promotionupdate.component.html',
  styles: []
})
export class PromotionupdateComponent implements OnInit {
    users:any;
    userAddModel: FormGroup;
    err:any;

      constructor(private lf: FormBuilder, private alertService: AlertService,private promotionService: PromotionService,private router: Router,private activatedRoute: ActivatedRoute) { }

      ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.getUsers(id);
        });

        this.userAddModel = this.lf.group({
            _id: ['', Validators.required],
            name: ['', Validators.required]
        });

      }

    
      private getUsers(id) {
        this.promotionService.getOne(id).subscribe(users => { 
            this.users = users.message; 
            this.userAddModel.patchValue(this.users);
            // this.userAddModel.controls['firstname'].setValue(this.users.firstname);
        });
    }

    private userUpdate() {
        console.log(this.userAddModel.value);
        this.promotionService.updateUser(this.userAddModel.value).subscribe(
            (data) => {
                this.alertService.success('User Updated successful', true);
                this.router.navigate(['admin/promotion/list']);
            }
        );
    }
}
