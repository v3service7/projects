import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    url: string = 'http://34.209.114.118:4003/';
    //url: string = 'http://localhost:4003/';
  	
    constructor(private http: Http) { }

    
    
    getUser(data){
          return this.http.post(this.url+'users/login', data)
              .map((response: Response) => {
                      let user = response.json();
                      return user;
                });
    }

  	getOwner(data){
  		return this.http.post(this.url+'owners/login', data)
  			.map((response: Response) => {
  					let user = response.json();
                    return user;
                });
	}


    ownerLogout() {
        localStorage.removeItem('currentOwner');
    }

	logout() {
        localStorage.removeItem('currentUser');
    }

    getStatus(){
      return this.http.get(this.url+'status');
  }
  
  resetPassword(id,data){

      return this.http.put(this.url+'owners/'+id, data)
              .map((response: Response) => {
                      let user = response.json();
                    return user;
                }); 
  }
  resetAdminPassword(id,data){

      return this.http.put(this.url+'users/admin/'+id, data)
              .map((response: Response) => {
                      let user = response.json();
                    return user;
                }); 
  }
  forgetPassword(data){
      return this.http.post(this.url+'owners/forget-password', data)
              .map((response: Response) => {
                      let user = response.json();
                    return user;
                });
  }
  forgetPasswordAdmin(data){
  		return this.http.post(this.url+'users/forget-password', data)
              .map((response: Response) => {
                      let user = response.json();
                    return user;
                });
	}
}
