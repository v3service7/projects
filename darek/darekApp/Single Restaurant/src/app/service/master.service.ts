import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class MasterService {
  	
  	constructor(private http: Http) { }

  	addLanguage(data) {
        return this.http.post(globalVariable.url+'language/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateLanguage(data) {
        return this.http.put(globalVariable.url+'language/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

  	getAllLanguage() {
  		return this.http.get(globalVariable.url+'language/')
  			.map(
  				(response: Response) => response.json()
  			);
    }

    getOneLanguage(id) {
          return this.http.get(globalVariable.url+'language/'+id)
              .map(
                  (response: Response) => response.json()
              );
    }

    deleteOneLanguage(id) {
  		return this.http.delete(globalVariable.url+'language/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }
}
