import { Component, OnInit } from '@angular/core';
import {AlertService, RestaurantsService } from '../service/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
	currentUser: any = {};
  	constructor() { 
  		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	}

  ngOnInit() {}
}

@Component({
  selector: 'app-headerowner',
  templateUrl: './headerowner.component.html',
  styles: []
})
export class HeaderownerComponent implements OnInit {
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
          console.log(this.restaurants);
        });
    }
}
