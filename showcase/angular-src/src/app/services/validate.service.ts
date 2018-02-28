import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
@Injectable()
export class ValidateService {

  constructor(private jsonp: Jsonp) { }

  validateRegister(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined || user.password == undefined ){
      return false;
    } else {
      return true;
    }
  }

  validateProfile(user){
    if(user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateaddplan(plan){
    if(plan.nickName == undefined || plan.exchangeName == undefined || plan.exchangeType == undefined || plan.apiKey == undefined || plan.secretKey == undefined){
      return false;
    } else {
      return true;
    }
  }


    getYoutube(url){
        let ur = 'https://www.googleapis.com/youtube/v3/videos?part=id&id='+url+'&key=AIzaSyB1IsrsMN22HB_fgAxG0i3Twes60dPF2EA&callback=JSONP_CALLBACK'
        return this.jsonp.get(ur)  
        .map(res => {
          return res.json();
        },error => {
            return error;
        });
    }
}
