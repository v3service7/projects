/**
 * Created by Manvi on 14-Apr-17.
 */
import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';

@Injectable()
export class RestaurantsService {
  url: string = 'http://34.209.114.118:4003/';
  //url: string = 'http://localhost:4003/';
  constructor(private http: Http) { }

  addRestaurant(data) {
    return this.http.post(this.url+'restaurant/',data)
      .map(
      (response: Response) => response.json()
    );
  }

  updateRestaurant(data) {
    return this.http.put(this.url+'restaurant/'+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  activateMail(data) {
    return this.http.get(this.url+'owners/mailactivate/'+data)
      .map(
      (response: Response) => response.json()
    );
  }

  emailConfirm(data) {
    return this.http.post(this.url+'owners/account-confirm/',data)
      .map(
      (response: Response) => response.json()
    );
  }

  updateLocation(data) {
    return this.http.put(this.url+'location-update/'+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  getAll() {
    return this.http.get(this.url+'restaurant/')
      .map(
      (response: Response) => response.json()
    );
  }

  getOne(id) {
    return this.http.get(this.url+'restaurant/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  getOwnerRestaurants(id) {
    return this.http.get(this.url+'owner-restaurants/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  deleteOne(id) {
    return this.http.delete(this.url+'restaurant/'+id)
      .map(
      (response: Response) => response.json()
    );
  }
}
