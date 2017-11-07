import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class KitchenMenuService {    
  	constructor(private http: Http) { }

    addUser(data) {
        return this.http.post(globalVariable.url+'menu/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateMenu(data) {
      return this.http.put(globalVariable.url+'menu/'+data._id,data)
      .map(
          (response: Response) => response.json()
      );
    }
    
  	getAll(id) {
  		return this.http.get(globalVariable.url+'menu-list/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }

    getOne(id) {
          return this.http.get(globalVariable.url+'menu/'+id)
              .map(
                  (response: Response) => response.json()
              );
    }

    deleteOne(id) {
  		return this.http.delete(globalVariable.url+'menu/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }

    adddetailAddOn(data){
      return this.http.post(globalVariable.url+'addon/',data)
        .map(
          (response: Response) => response.json()
        );
    }

    getAllAddOn(id) {
      return this.http.get(globalVariable.url+'addon-list/'+id)
        .map(
          (response: Response) => response.json()
        );
    }

    groupDetailEditser(id){
        return this.http.get(globalVariable.url+'addon/'+id)
        .map(
          (response: Response) => response.json()
           );
       }

    groupRemove(id){
         return this.http.delete(globalVariable.url+'addon/'+id)
        .map(
          (response: Response) => response.json()
        );
    }

    groupEditUpdate(data){
          return this.http.put(globalVariable.url+'addon/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );      
    }  
    

}
