import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AlertService, PromotionsService } from '../service/index';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styles: []
})
export class PromotionsComponent implements OnInit {
  order: string = 'name';
  userFilter: any = { name: '' };
  reverse: boolean = false;
  promotions= [];
  constructor(
    private promotionsService: PromotionsService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loadAllPromotions();
  }

  private loadAllPromotions() {
    this.promotionsService.getAll().subscribe(users => { this.promotions = users.message; });
  }

  private deletePromotions(id) {
    if(confirm("Are you sure to delete ?")) {
      this.promotionsService.deleteOne(id).subscribe(data => {
        console.log(data);
        this.loadAllPromotions();
        this.alertService.success('Promotion Deleted successful', true);
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
  selector: 'app-addpromotions',
  templateUrl: './promotionadd.component.html',
  styles: []
})
export class PromotionaddComponent implements OnInit {
  promotionAddModel: FormGroup;
  constructor(
    private promotionsService: PromotionsService,
    private router: Router,
    private alertService: AlertService,
    private lf: FormBuilder
  ) { }

  ngOnInit() {
    this.promotionAddModel = this.lf.group({
      name: ['', Validators.required],
    });
  }

  private promotionAdd() {
    this.promotionsService.addPromotion(this.promotionAddModel.value).subscribe(
      (data) => {
        this.alertService.success('Promotion Add successful', true);
        this.router.navigate(['/admin/promotions']);
      }
    );
  }
}


@Component({
  selector: 'app-updatepromotions',
  templateUrl: './promotionupdate.component.html',
  styles: []
})
export class PromotionupdateComponent implements OnInit {
  promotions:any;
  promotionAddModel: FormGroup;
  err:any;

  constructor(
    private lf: FormBuilder,
    private alertService: AlertService,
    private promotionsService: PromotionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getPromotions(id);
    });

    this.promotionAddModel = this.lf.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }


  private getPromotions(id) {
    this.promotionsService.getOne(id).subscribe(users => {
      this.promotions = users.message;
      this.promotionAddModel.patchValue(this.promotions);
      // this.userAddModel.controls['firstname'].setValue(this.users.firstname);
    });
  }

  private promotionUpdate() {
    console.log(this.promotionAddModel.value);
    this.promotionsService.updatePromotion(this.promotionAddModel.value).subscribe(
      (data) => {
        this.alertService.success('Promotion Updated successful', true);
        this.router.navigate(['/admin/promotions']);
      }
    );
  }
}

