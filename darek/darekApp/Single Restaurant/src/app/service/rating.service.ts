import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class RatingService {
  constructor(private http: Http) { }

  getAllRating(){
    return this.http.get(globalVariable.url+'rating')
      .map(
      (response: Response) => response.json()
    );
  }

  getAllRatingById(id){
    return this.http.get(globalVariable.url+'rating/'+id)
      .map(
      (response: Response) => response.json()
    );
  }

  addRating(data) {
    return this.http.post(globalVariable.url+'rating',data)
      .map(
      (response: Response) => response.json()
    );
  }

  /*updateRating(data){
    return this.http.put(globalVariable.url+'rating/'+data._id,data)
    .map(
      (response: Response) => response.json()
    );
  }*/
}
