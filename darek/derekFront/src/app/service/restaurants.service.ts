/**
 * Created by Manvi on 14-Apr-17.
 */
import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) { }

  addRestaurant(data) {
    return this.http.post(globalVariable.url+'restaurant/',data)
      .map(
      (response: Response) => response.json()
    );
  }

  updateRestaurant(data) {
    return this.http.put(globalVariable.url+'restaurant/'+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  updatePickUp(data){
   return this.http.put(globalVariable.url+'restaurant/'+ data._id, data)
      .map(
      (response: Response) => response.json()
    );
  }
  updateDelivery(data){
    console.log("data");
    console.log(data);
   return this.http.put(globalVariable.url+'delivery-update/'+data._id, data)
      .map(
      (response: Response) => response.json()
    );
  } 
  updateNotification(data){
   return this.http.put(globalVariable.url+'restaurant-notification/'+ data._id, data)
      .map(
      (response: Response) => response.json()
    );
  }
  deleteNotification(id,index){
   return this.http.delete(globalVariable.url+'restaurant/notification/'+ id + '/' + index)
      .map(
      (response: Response) => response.json()
    );
  } 

  getNotification(id,index){
   return this.http.get(globalVariable.url+'restaurant/notification/'+ id + '/' + index)
      .map(
      (response: Response) => response.json()
    );
  } 

  editNotification(index,data){
   return this.http.put(globalVariable.url+'restaurant/notification/'+ data._id + '/' + index,data)
      .map(
      (response: Response) => response.json()
    );
  } 

   updatePickUpHours(data){
   return this.http.put(globalVariable.url+'restaurant/'+ data._id, data.result)
      .map(
      (response: Response) => response.json()
    );
  } 

  activateMail(data) {
    return this.http.get(globalVariable.url+'owners/mailactivate/'+data)
      .map(
      (response: Response) => response.json()
    );
  }

  emailConfirm(data) {
    return this.http.post(globalVariable.url+'owners/account-confirm/',data)
      .map(
      (response: Response) => response.json()
    );
  }

  updateLocation(data) {
    return this.http.put(globalVariable.url+'location-update/'+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  addDeliveryZone(data) {
    return this.http.post(globalVariable.url+'deliveryzone/', data)
      .map(
       (response: Response) => response.json()
       );
   }
  removeDeliveryZone(id) {
    return this.http.delete(globalVariable.url+'deliveryzone/'+id)
      .map(
       (response: Response) => response.json()
       );
   }

  editDeliveryZone(id) {
    return this.http.get(globalVariable.url+'deliveryzone/'+id)
      .map((response: Response) => response.json());
   }

   editDeliveryZoneUpdate(data) {
    return this.http.put(globalVariable.url+'deliveryzone/'+data._id, data)
    .map((response: Response) => response.json());
     }

  getAllDeliveryZone(id){
   console.log(id);
   return this.http.get(globalVariable.url+'deliveryzones/'+id)
         .map(
           (response: Response) => response.json()
         );
     }

  getAll() {
    return this.http.get(globalVariable.url+'restaurant/')
      .map(
      (response: Response) => response.json()
    );
  }

  getOne(id) {
    return this.http.get(globalVariable.url+'restaurant/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  getOwnerRestaurants(id) {
    return this.http.get(globalVariable.url+'owner-restaurants/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  deleteOne(id) {
    return this.http.delete(globalVariable.url+'restaurant/'+id)
      .map(
      (response: Response) => response.json()
    );
  }
}
