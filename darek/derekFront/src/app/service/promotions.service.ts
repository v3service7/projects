/**
 * Created by Manvi on 14-Apr-17.
 */
import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class PromotionsService {
  constructor(private http: Http) { }

  addPromotion(data) {
    return this.http.post(globalVariable.url+'promotion/',data)
      .map(
      (response: Response) => response.json()
    );
  }

  updatePromotion(data) {
    return this.http.put(globalVariable.url+'promotion/'+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  getAll() {
    return this.http.get(globalVariable.url+'promotion/')
      .map(
      (response: Response) => response.json()
    );
  }

  getOne(id) {
    return this.http.get(globalVariable.url+'promotion/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  deleteOne(id) {
    return this.http.delete(globalVariable.url+'promotion/'+id)
      .map(
      (response: Response) => response.json()
    );
  }
}
