import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, RestaurantsService, UsersService, KitchenMenuService, KitchenItemService, MasterService } from '../service/index';
import * as globalVariable from "../global";
import { FlashMessagesService } from 'angular2-flash-messages';
declare var google: any;

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendHeaderComponent implements OnInit {
   @Input() ids: string;
   
  restaurants: any = {};

  constructor(
    private masterService: MasterService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getRestaurants(id);
    });
  }

  private getRestaurants(id) {
    this.restaurantsService.getOne(id).subscribe(users => {
      this.restaurants = users.message;
      console.log(this.restaurants);
    });
  }
}




@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendComponent implements OnInit {
  restaurants: any = {};
  menus: any = [];
  items: any = [];
  addOns: any = [];
  detailShow: String;
  imageURL: string = globalVariable.imageUrl;

  constructor(
    private masterService: MasterService,
    private restaurantsService: RestaurantsService,
    private kitchenMenuService: KitchenMenuService,
    private kitchenMenuItemService: KitchenItemService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getRestaurants(id);
    });
  }

  private loadAllUsers(id) {
    this.kitchenMenuService.getAll(id).subscribe(users => {       
      this.menus = users.message;
      this.menus.image=this.imageURL+this.menus.image;
      console.log("this.menu");
      console.log(this.menus);
    });
  }

  private loadAllItem() {
    this.kitchenMenuItemService.getAll().subscribe(users => { 
      this.items = users.message;
      this.items.image=this.imageURL+this.items.image;
      console.log("this.items");
      console.log(this.items);

      this.kitchenMenuService.getAllAddOn(this.restaurants._id).subscribe(data => {
      this.addOns = data.message;
      console.log("this.addons");
      console.log(this.addOns);
    });


    });
  }

  private showDiv(id) {
    if (this.detailShow == id) {
      return 'block';
    }
  }
  
  private showDetail(id) {
    this.detailShow = id;
    console.log(id)

/*    let appBanners = document.getElementsByClassName('itemDetailDiv'), i;

    for (i = 0; i < appBanners.length; i += 1) {
        appBanners[i].style.display = 'none';
    }
    document.getElementById(id).style.display='block';*/
  }

  private getRestaurants(id) {
    this.restaurantsService.getOne(id).subscribe(users => {
      this.restaurants = users.message;
      this.loadAllUsers(this.restaurants._id);
      this.loadAllItem(); 
    });
  }
}



@Component({
  selector: 'app-frontendDetail',
  templateUrl: './frontendDetail.component.html',
  styleUrls: ['./frontend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendDetailComponent implements OnInit {
  restaurants: any = {};
  delivery: any = {};
  deliverys: any = [];
  mypolygone: any = [];
  mergeCircleShape: any = [];
  lat: any;
  lng: any;


  constructor(
    private masterService: MasterService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getRestaurants(id);
      this.deliveryZone(id);
    });
  }

  private getRestaurants(id) {
    this.restaurantsService.getOne(id).subscribe(users => {
      this.restaurants = users.message;
      this.lat = this.restaurants.lat;
      this.lng = this.restaurants.lng;

      console.log(this.lat);
      console.log(this.lng);
    });
  }

  private deliveryZone(id){
    this.restaurantsService.getAllDeliveryZone(id).subscribe(users => {
      this.delivery = users.message;
      this.deliverys = users.message;
      this.selectCircle();
    });
  }


  private selectCircle() {
    console.log(this.delivery);
    let mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(document.getElementById("gmap"), mapProp);
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP
    });
    for (var key in this.deliverys) {
      // Add the circle for this city to the map.
      if (this.deliverys[key].type == 'Circle') {

        var newCobj = new google.maps.Circle({
          strokeColor: this.deliverys[key].color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: this.deliverys[key].color,
          fillOpacity: 0.6,
          map: map,
          center: { lat: parseFloat(this.lat), lng: parseFloat(this.lng) },
          radius: parseFloat(this.deliverys[key].radius)
        });
        this.mergeCircleShape.push(newCobj);
      }
      else {
        var polygonCord = [];
        var newArr = this.deliverys[key].radius;
        var splitString = newArr.split('@');
        var splitStrlen = splitString.length;
        
        for (var k = 0; k < splitStrlen; k++) {
          var my_lat = splitString[k].split(',');
          polygonCord.push({ lat: parseFloat(my_lat[0]), lng: parseFloat(my_lat[1]) });
        }
      
        this.mypolygone = new google.maps.Polygon({
          paths: polygonCord,
          strokeColor: this.deliverys[key].color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: this.deliverys[key].color,
          fillOpacity: 0.6
        });
        this.mypolygone.setMap(map);
      }
    }
  }
}

@Component({
  selector: 'app-frontendCart',
  templateUrl: './frontendCart.component.html',
  styleUrls: ['./frontend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendCartComponent implements OnInit {

  restaurants: any = {};

  constructor(
    private masterService: MasterService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getRestaurants(id);
    });
  }

  private getRestaurants(id) {
    this.restaurantsService.getOne(id).subscribe(users => {
      this.restaurants = users.message;
      console.log(this.restaurants);
    });
  }
}

