/**
 * Created by Manvi on 14-Apr-17.
 */
import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';

@Injectable()
export class PromotionsService {
  url: string = 'http://34.209.114.118:4003/promotion/';
  //url: string = 'http://localhost:4003/promotion/';
  constructor(private http: Http) { }

  addPromotion(data) {
    return this.http.post(this.url,data)
      .map(
      (response: Response) => response.json()
    );
  }

  updatePromotion(data) {
    return this.http.put(this.url+data._id,data)
      .map(
      (response: Response) => response.json()
    );
  }

  getAll() {
    return this.http.get(this.url)
      .map(
      (response: Response) => response.json()
    );
  }

  getOne(id) {
    return this.http.get(this.url+id)
      .map(
      (response: Response) => response.json()
    );
  }

  deleteOne(id) {
    return this.http.delete(this.url+id)
      .map(
      (response: Response) => response.json()
    );
  }
}
