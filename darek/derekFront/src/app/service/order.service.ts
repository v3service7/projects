import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globalVariable from "../global";

@Injectable()
export class OrderService {

  	constructor(private http: Http) { }

}
