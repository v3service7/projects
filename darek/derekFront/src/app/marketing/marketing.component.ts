import { Component, OnInit } from '@angular/core';
import {AlertService, RestaurantsService } from '../service/index';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-marketing',
  templateUrl: './marketingnav.component.html',
  styles: []
})
export class MarketingNavComponent implements OnInit {
currentOwner:any={};
  restaurants:any ={};
  	constructor(private restaurantsService: RestaurantsService) { 

  		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
      this.getRestaurants();
  	}

  ngOnInit() {}

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
          this.restaurants = users.message;
        });
    }
}
