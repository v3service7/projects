import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";
@Injectable()
export class KitchenItemService {  
  	constructor(private http: Http) { }

    addUser(data) {      
        return this.http.post(globalVariable.url+'item/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateMenu(data) {
        return this.http.put(globalVariable.url+'item/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }
    
    updateMenuAddOn(data) {
        return this.http.put(globalVariable.url+'itemaddon/'+data._id, data)
        .map(
            (response: Response) => response.json()
        );
    }

    
    getAll() {
      return this.http.get(globalVariable.url+'item/')
        .map(
          (response: Response) => response.json()
        );
    }

  	getAllItems(id) {
  		return this.http.get(globalVariable.url+'item-list/'+ id)
  			.map(
  				(response: Response) => response.json()
  			);
    }

    getOne(id) {
          return this.http.get(globalVariable.url+'item/'+id)
              .map(
                  (response: Response) => response.json()
              );
    }

    deleteOne(id) {
  		return this.http.delete(globalVariable.url+'item/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }

   removeAddOnToSubmenu(data){      
        return this.http.delete(globalVariable.url+'itemaddon/'+data._id+'/'+data.indexi)
        .map(
             (response: Response) => response.json()
           );
      }

   editAddOnToSubmenu(data){
        return this.http.get(globalVariable.url+'itemaddon/'+data.id+'/'+data.submenuid)
        .map(
             (response: Response) => response.json()
            );
    }

  updateEditMenuAddOn(data){
   return this.http.put(globalVariable.url+'itemaddonedit/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
  }

  addChoice(data){
      return this.http.put(globalVariable.url+'addonchoice/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
       }

   removeChoice(data){
     return this.http.delete(globalVariable.url+'addonchoice/'+data._id+'/'+data.index)
        .map(
            (response: Response) => response.json()
             );
   }
   
   getEditChoice(data){
     return this.http.get(globalVariable.url+'addonchoice/'+data.id+'/'+data.cid)
        .map(
            (response: Response) => response.json()
             );
   }

   editSubAddOnUpdate(data){
   return this.http.put(globalVariable.url+'addonchoiceedit/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
  }


}
