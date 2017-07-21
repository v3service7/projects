import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';

@Injectable()
export class DriversService {
    url: string = 'http://34.209.114.118:4003/driver/';
    //url: string = 'http://localhost:4003/driver/';
  	constructor(private http: Http) { }

    addDriver(data) {
        return this.http.post(this.url,data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateDriver(data) {
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