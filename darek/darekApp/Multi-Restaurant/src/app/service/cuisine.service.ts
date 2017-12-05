import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import * as globalVariable from "../global";

@Injectable()
export class CuisinesService {
  constructor(private http: Http) { }

  addCuisine(data) {
    return this.http.post(globalVariable.url+'cuisine/',data)
    .map(
      (response: Response) => response.json()
      );
  }

  getAll() {
    return this.http.get(globalVariable.url+'cuisine/')
    .map(
      (response: Response) => response.json()
      );
  }

  updateCuisine(data) {
    return this.http.put(globalVariable.url+'cuisine/'+data.id,data)
    .map(
      (response: Response) => response.json()
      );
  }

  deleteOne(id) {
    return this.http.delete(globalVariable.url+'cuisine/'+id)
    .map(
      (response: Response) => response.json()
      );
  }

  

  /*getOne(id) {
    return this.http.get(globalVariable.url+'promotion/'+id)
    .map(
      (response: Response) => response.json()
      );
  }

  getPromotionChart(id, days) {
    return this.http.get(globalVariable.url+'reporting/promotion-stats/'+id + '/'+ days)
    .map(
      (response: Response) => response.json()
      );
  }

  getCustom = (): Observable<Response> => {
    console.log("In getConfiguration of ConfigurationService");
    return this.http.get('assets/custom.json').map(
      res => res.json()
      );
  }*/

  /*promotionDetail services*/
  

  /*addPromotionDetail(data){
    return this.http.post(globalVariable.url+'promodetail',data)
    .map(
      (response: Response) => response.json()
      );
  }

  getRestroPromotions(id) {
    return this.http.get(globalVariable.url+'restaurantpromo-list/'+id)
    .map(
      (response: Response) => response.json()
      );
  }

  deleteRestroPromotion(id){
    return this.http.delete(globalVariable.url+'promodetail/'+id)
    .map(
      (response: Response) => response.json()
      );
  }

  getOnePromo(id){
    return this.http.get(globalVariable.url+'promodetail/'+id)
    .map(
      (response: Response) => response.json()
      );
  }

  updateRestroPromotion(data) {
    return this.http.put(globalVariable.url+'promodetail/'+data._id,data)
    .map(
      (response: Response) => response.json()
      );
    }*/
}
