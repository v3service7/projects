import { Component, Input } from '@angular/core';
import { NavController,LoadingController, AlertController, Nav, NavParams } from 'ionic-angular';

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

	constructor(
		public navCtrl: NavController,
		public nav: Nav,
		public navParams: NavParams,
		public customerService: CustomersService,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
		) {

		/*let fltr = navParams.get('filter');

		if (typeof fltr !== 'undefined') {
			this.filterBy = fltr;;
		}*/

		console.log("this.filterBy");
		console.log(this.filterBy);
	}


	ionViewDidEnter() {
		this.getuserCountry();
	}


	resetFilter(){

		this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification:[], profession: []};

		setTimeout(()=>{
			this.navCtrl.push(TabsPage,{
	        	filterBy : this.filterBy,
	        })
		},1000);
		
	  }

	private getuserCountry(){
        this.customerService.getUserCountry().subscribe((country) =>{  
          this.countries = country.message;
        });
    }


	private selectOption(type){

		console.log("Select Option", type);

		if (type == 'maritalstatus') {
			console.log("this.maritalstatus");
			console.log(this.maritalstatus);
			this.filterBy['maritalstatus'] = this.maritalstatus;
		}
		if (type == 'colorselect') {
			console.log("this.colorselect");
			console.log(this.colorselect);
			this.filterBy['haircolor'] = this.colorselect;
		}
		if (type == 'bodyselect') {
			console.log("this.bodyselect");
			console.log(this.bodyselect);
			this.filterBy['bodyshape'] = this.bodyselect;
		}
		if (type == 'smoke') {
			console.log("this.smoke");
			console.log(this.smoke);
			this.filterBy['smoke'] = this.smoke;
		}
		if (type == 'drink') {
			console.log("this.drink");
			console.log(this.drink);
			this.filterBy['drink'] = this.drink;
		}
		if (type == 'qualification') {
			console.log("this.qualification");
			console.log(this.qualification);
			this.filterBy['qualification'] = this.qualification;
		}
		if (type == 'profession') {
			console.log("this.profession");
			console.log(this.profession);
			this.filterBy['profession'] = this.profession;
		}
		if (type == 'sexorientation') {
			console.log("this.sexorientation");
			console.log(this.sexorientation);
			this.filterBy['sexualorient'] = this.sexorientation;
		}
		if (type == 'gender') {
			console.log("this.gender");
			console.log(this.gender);
			this.filterBy['gender'] = this.gender;
		}
		if (type == 'country') {
			console.log("this.country");
			console.log(this.country);
			this.filterBy['country'] = this.country;
		}
		if (type == 'minfeet') {
			console.log("this.minfeet");
			console.log(this.minfeet);
		}
		if (type == 'mininch') {
			console.log("this.mininch");
			console.log(this.mininch);
		}
		if (type == 'maxfeet') {
			console.log("this.maxfeet");
			console.log(this.maxfeet);
		}
		if (type == 'maxinch') {
			console.log("this.maxinch");
			console.log(this.maxinch);
		}
	}


	/*private age(event,type){

		if (type == 'min') {
			this.filterBy['minage'] = event.target.value;
		}

		if (type == 'max') {
			this.filterBy['maxage'] = event.target.value;
		}

	}*/


	private showAfterFilter(){

		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		
		setTimeout(()=>{
			loading.dismiss();
			this.nav.setRoot(TabsPage,{
	        	filterBy : this.filterBy,
	        })
		},1000);

		/*if (typeof this.minfeet != 'undefined') {
			if (typeof this.mininch == 'undefined') {
				this.filterBy['minheight'] = this.minfeet + '.0';
			}else{
				this.filterBy['minheight'] = this.minfeet + '.' + this.mininch;
			}
		}

		if (typeof this.maxfeet != 'undefined') {
			if (typeof this.maxinch == 'undefined') {
				this.filterBy['maxheight'] = this.maxfeet + '.0';
			}else{
				this.filterBy['maxheight'] = this.maxfeet + '.' + this.maxinch;
			}
		}*/

	}

}
