import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as globalVariable from "../../../global";

@Injectable()
export class WizardApiService {

  headerDetail: any;
  constructor(private http:Http) { }
  
  loadToken(){
    const token = localStorage.getItem('token');
    let header = new Headers();
    header.append('Authorization', token);
    header.append('Content-Type','application/json');
    this.headerDetail = header;
    }

    imgloadToken(){
    const token = localStorage.getItem('token');
    let header = new Headers();
    header.append('Authorization', token);
    header.append('Content-Type','multipart/form-data');
    this.headerDetail = header;
    }
 

    getSectorsAndIndustries(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getSectorsAndIndustries',{headers: this.headerDetail})
    .map(res => res.json());
    }

    getUnits(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getUnits',{headers: this.headerDetail})
    .map(res => res.json());
    }

    saveSectorIndustryDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveSectorIndustryDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductProfile(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductProfile', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductSpecs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductSpecs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getIndustriesBySector(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'rfqs/buyer/getIndustriesBySector', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    createProductProfile(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/createProductProfile', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveSampleDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveSampleDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveIncoTermCostDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveIncoTermCostDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getIncoTermCostDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getIncoTermCostDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }
  
    saveTradeDetails(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveTradeDetails', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    ProductKeywords(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductKeywords', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    uploadProductImage(data){
    this.imgloadToken();
    return this.http.post(globalVariable.url+'listing/uploadProductImage', data, {headers: this.headerDetail})
    .map(res => res.json());
    }
}