import { Component, Input } from '@angular/core';
import { NavController,LoadingController, AlertController, Nav, NavParams, Events } from 'ionic-angular';

import { CustomersService } from '../../app/service/index';

import { TabsPage } from '../tabs/tabs'

@Component({
	selector: 'page-filter',
	templateUrl: 'filter.html'
})
export class FilterPage {

	maritalstatus : any;
	havechildren : any;
	colorselect : any;
	bodyselect : any;
	smoke : any;
	drink : any;
	qualification : any;
	profession : any;
	sexorientation : any;
	gender : any;
	country : any;
	countries : any;
	minfeet : any;
	mininch : any;
	maxfeet : any;
	maxinch : any;
	filterBy : any = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []};
    activeTab: any;


	constructor(
		public events : Events,
		public navCtrl: NavController,
		public nav: Nav,
		public navParams: NavParams,
		public customerService: CustomersService,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
		) {

	   this.getuserCountry();        
	   this.activeTab = this.navParams.get('type');
	   console.log("this.navParams.get('filter')");
	   console.log(this.navParams.get('filterBy')); 

	   if(this.navParams.get('filterBy')){this.filterBy = this.navParams.get('filterBy')};
	   }


	ionViewDidEnter() {		
		//this.navParams
	}


	resetFilter(){
        if(this.navParams.get('filterBy')){
             this.filterBy = this.navParams.get('filterBy');
        }else{
             this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification:[], profession: []};	
        }

		setTimeout(()=>{
			this.navCtrl.push(TabsPage, {
	        	filterBy : this.filterBy,
	            });
		},1000);		
	  }

	private getuserCountry(){
        this.customerService.getUserCountry().subscribe((country) =>{  
          this.countries = country.message;
        });
    }

     private selectOption(type){
     	console.log(type);
     }
	
	private showAfterFilter(){
		console.log("hhh1", this.filterBy);
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();

		setTimeout(()=>{
			loading.dismiss();	
			let obj:any = {
				filterBy : this.filterBy
			};						
			this.events.publish("filter:data", obj);
		},1000);
	}

}
