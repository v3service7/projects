import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as globalVariable from "./global";
import 'rxjs/add/operator/map';

@Injectable()
export class ThreeService {
    constructor(private http: Http) { }
    getOrders(data) {
        return this.http.post(globalVariable.url3 + 'driverorders/', data).map((response: Response) => response.json());
    }
    getCustomersOrdersList(id) {
        return this.http.get(globalVariable.url3 + 'customerorder/' + id).map((response: Response) => response.json());
    }
    updateOrdersStatus(data) {
        return this.http.put(globalVariable.url3 + 'order/' + data.id, data).map((response: Response) => response.json());
    }

}