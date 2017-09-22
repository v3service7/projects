import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class DriversService {

    constructor(private http: Http) { }

    addDriver(data) {
        return this.http.post(globalVariable.url+'driver/', data)
        .map(
            (response: Response) => response.json()
            );
    }


    updateDriver(data) {
        return this.http.put(globalVariable.url+'driver/'+data._id,data)
        .map(
            (response: Response) => response.json()
            );
    }

    getAll() {
        return this.http.get(globalVariable.url+'driver/')
        .map(
            (response: Response) => response.json()
            );
    }

    getRestaurantDrivers(id) {
        return this.http.get(globalVariable.url+'restaurant-drivers/'+id)
        .map(
            (response: Response) => response.json()
            );
    }

    getOne(id) {
        return this.http.get(globalVariable.url+'driver/'+id)
        .map(
            (response: Response) => response.json()
            );
    }

    myOrder(id) {
        return this.http.get(globalVariable.url+'order/driver/'+id)
        .map(
            (response: Response) => response.json()
            );
    }

    deleteOne(id) {
        return this.http.delete(globalVariable.url+'driver/'+id)
        .map(
            (response: Response) => response.json()
            );
    }
}
