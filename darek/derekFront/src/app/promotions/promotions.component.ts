import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {PromotionsService, RestaurantsService } from '../service/index';
import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../global";

declare var toastr: any;

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

  imageUrl: string = globalVariable.url+'uploads/';

  constructor(
    private promotionsService: PromotionsService,
    private router: Router) { }

  ngOnInit() {
    this.loadAllPromotions();
  }

  private loadAllPromotions() {
    this.promotionsService.getAll().subscribe(users => { this.promotions = users.message;});
  }

  private deletePromotions(id) {
    if(confirm("Are you sure to delete ?")) {
      this.promotionsService.deleteOne(id).subscribe(data => {
        console.log(data);
        this.loadAllPromotions();
        toastr.success('Promotion Deleted successful');
      });
    }
  }

  sortBy(data) {
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
  restaurants = [];

  restaurantOption : any = [];

  imageUrl: string = globalVariable.url+'uploads/';

  public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

  constructor(
    private promotionsService: PromotionsService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private lf: FormBuilder
  ) { }

  ngOnInit() {
    this.promotionAddModel = this.lf.group({
      image: [],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      restaurantOptions : []
    });
    this.loadAllRestaurants();
  }

  private loadAllRestaurants() {
      this.restaurantsService.getAll().subscribe(
        restaurants => { this.restaurants = restaurants.message;
          console.log(this.restaurants);
      });
    }

  private onClicked(event){
    if (!event.target.checked) {
      this.restaurantOption.splice(this.restaurantOption.indexOf(event.target.value),1);
    }
    if ((event.target.checked) && (this.restaurantOption.indexOf(event.target.value) == -1)) {
      this.restaurantOption.push(event.target.value);
    }
  }

  promotionAdd() {
    this.promotionAddModel.controls['restaurantOptions'].setValue(this.restaurantOption);
    this.promotionsService.addPromotion(this.promotionAddModel.value).subscribe(
      (data) => {
        toastr.success('Promotion Add successful');
        this.router.navigate(['/admin/promotions']);
      }
    );
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.promotionAddModel.controls['image'].setValue(responsePath.filename);
      toastr.success('Image Uploaded Successfully');
    };
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
  restaurants = [];

  restaurantOption : any = [];

  imageUrl: string = globalVariable.url+'uploads/';

  public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });

  constructor(
    private lf: FormBuilder,
    private promotionsService: PromotionsService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getPromotions(id);
    });

    this.promotionAddModel = this.lf.group({
      _id: ['', Validators.required],
      image: [],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      restaurantOptions : []
    });

    this.loadAllRestaurants();
  }

  private loadAllRestaurants() {
    this.restaurantsService.getAll().subscribe(
      restaurants => { this.restaurants = restaurants.message;
    });
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.promotionAddModel.controls['image'].setValue(responsePath.filename);
      toastr.success('Image Uploaded Successfully');
    };
  }


  private onClicked(event){
    if (!event.target.checked) {
      this.restaurantOption.splice(this.restaurantOption.indexOf(event.target.value),1);
    }
    if ((event.target.checked) && (this.restaurantOption.indexOf(event.target.value) == -1)) {
      this.restaurantOption.push(event.target.value);
    }
  }

  private getPromotions(id) {
    this.promotionsService.getOne(id).subscribe(users => {
      this.promotions = users.message;
      this.promotionAddModel.patchValue(this.promotions);
      this.restaurantOption = users.message['restaurantOptions'];
      // this.userAddModel.controls['firstname'].setValue(this.users.firstname);
    });
  }

  private checkChecked(id){
    if (this.restaurantOption.indexOf(id) > -1) {
      return true;
    }
  }

  promotionUpdate() {
    this.promotionAddModel.controls['restaurantOptions'].setValue(this.restaurantOption);
    console.log(this.promotionAddModel.value);
    this.promotionsService.updatePromotion(this.promotionAddModel.value).subscribe(
      (data) => {
        toastr.success('Promotion Updated successful');
        this.router.navigate(['/admin/promotions']);
      }
    );
  }
}

