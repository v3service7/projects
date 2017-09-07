import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import * as globalVariable from "../global";
@Injectable()
export class UsersService {
    //url: string = 'http://34.209.114.118:4003/users/';
    //url: string = 'http://localhost:4003/users/';
  	constructor(private http: Http) { }

    updateAdmin(data) {
        return this.http.put(globalVariable.url+'users/'+'admin/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    addAdmin(data) {
        return this.http.post(globalVariable.url+'users/'+'admin/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    addUser(data) {
        return this.http.post(globalVariable.url+'users/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateUser(data) {
        return this.http.put(globalVariable.url+'users/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    getAllAdmin() {
      return this.http.get(globalVariable.url+'users/'+'admin/')
        .map(
          (response: Response) => response.json()
        );
    }
  	getAll() {
  		return this.http.get(globalVariable.url+'users/')
  			.map(
  				(response: Response) => response.json()
  			);
    }

    updateOwnerPassword(data) {
        return this.http.put(globalVariable.url+'users/'+'change-password/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    getAdminOne(id) {
          return this.http.get(globalVariable.url+'users/'+'/admin/'+id)
              .map(
                  (response: Response) => response.json()
              );
    }

    getOne(id) {
          return this.http.get(globalVariable.url+'users/'+id)
              .map(
                  (response: Response) => response.json()
              );
    }

    deleteAdminOne(id) {
      return this.http.delete(globalVariable.url+'users/'+'admin/'+id)
        .map(
          (response: Response) => response.json()
        );}
    deleteOne(id) {
  		return this.http.delete(globalVariable.url+'users/'+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }
}
