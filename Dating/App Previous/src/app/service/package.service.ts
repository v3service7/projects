import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";

@Injectable()
export class PackageService {
    //url: string = 'http://localhost:4005/package/';

    constructor(private http: Http) { }
    getAll() {
        return this.http.get(globalVariable.url+'package/')
        .map(
            (response: Response) => response.json()
        );
    }

    getOne(id) {
        return this.http.get(globalVariable.url+'package/'+id)
        .map(
            (response: Response) => response.json()
        );
    }
}
