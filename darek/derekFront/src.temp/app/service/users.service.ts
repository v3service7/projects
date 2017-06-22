import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';

@Injectable()
export class UsersService {
    url: string = 'http://34.209.114.118:4003/users/';
    //url: string = 'http://localhost:4003/users/';
  	constructor(private http: Http) { }

    updateAdmin(data) {
        return this.http.put(this.url+'admin/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    addAdmin(data) {
        return this.http.post(this.url+'admin/',data)
        .map(
            (response: Response) => response.json()
        );
    }

    addUser(data) {
        return this.http.post(this.url,data)
        .map(
            (response: Response) => response.json()
        );
    }

    updateUser(data) {
        return this.http.put(this.url+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    getAllAdmin() {
      return this.http.get(this.url+'admin/')
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

    updateOwnerPassword(data) {
        return this.http.put(this.url+'change-password/'+data._id,data)
        .map(
            (response: Response) => response.json()
        );
    }

    getAdminOne(id) {
          return this.http.get(this.url+'/admin/'+id)
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

    deleteAdminOne(id) {
      return this.http.delete(this.url+'admin/'+id)
        .map(
          (response: Response) => response.json()
        );}
    deleteOne(id) {
  		return this.http.delete(this.url+id)
  			.map(
  				(response: Response) => response.json()
  			);
    }
}
