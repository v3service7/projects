import { Component, Input } from '@angular/core';
import { NavController,LoadingController,NavParams, Nav } from 'ionic-angular';

import { CustomersService, FriendService } from '../../app/service/index';

import { FilterPage } from './filter'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	customerList:any=[];
	friends:any=[];
	loading:any;
	customerInfo:any;
	blockCount:number;

    activeTab1 = 'activeTab1';
    activeTab2 = 'activeTab2';
    activeTab3 = 'activeTab3';
    activeTab4 = 'activeTab4';
	filterBy : any = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []};

	constructor(
		public navCtrl: NavController,
		public nav: Nav,
		public customerService: CustomersService,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		private friendService : FriendService
		) {
	}

	ionViewDidEnter() {
		/*this.getCustomer();*/
		if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }
   		var filter = this.navParams.get('filterBy');
   		var filterResult = this.navParams.get('customerList');

   		if (typeof filter !== 'undefined') {
   			this.filterBy = filter;
	   		this.profiles_list('all');
   		}

   		if (typeof filter == 'undefined') {
	   		this.profiles_list('all');
   		}

   		this.getAllAllow();

   		console.log("this.filterBy");
   		console.log(this.filterBy);
   		this.getLocal();

	}

	someEvent(){
		console.log("someEvent");
	}

	private getGlobal(){

		this.profiles_list('global');

        console.log("this.customerList.length");
		console.log(this.customerList);

	    }

	private getLocal(){
        this.profiles_list('local');
		console.log(this.customerList.length);
	    }

	private getMatch(){
		//this.profiles_list('match');
		this.getCustomer();
	    }

	private getCustomer(){

		let fltr = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], qualification:[], profession: []};

		if (typeof this.customerInfo['preferences'] != 'undefined') {

			let pref = this.customerInfo['preferences'];

			if (pref.haircolor) {
				fltr['haircolor'].push(pref.haircolor);
			}
			if (pref.bodyshape) {
				fltr['bodyshape'].push(pref.bodyshape);
			}
			if (typeof pref.maritalStatus != 'undefined') {
				fltr['maritalstatus'].push(pref.maritalStatus);
			}
			if (typeof pref.smoke != 'undefined') {
				fltr['smoke'].push(pref.smoke);
			}
			if (typeof pref.drink != 'undefined') {
				fltr['drink'].push(pref.drink);
			}
			if (pref.qualification) {
				fltr['qualification'].push(pref.qualification);
			}
			if (pref.profession) {
				fltr['profession'].push(pref.profession);
			}


		}

		if (this.activeTab4 != 'activeTab1') {
			this.activeTab4 = 'activeTab1';
			this.activeTab2 = 'activeTab2';
			this.activeTab3 = 'activeTab3';
			this.activeTab1 = 'activeTab4';
		}

		   setTimeout(()=>{
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();

	        this.customerService.filter(fltr).subscribe((data) => {

	        	console.log("data");
	        	console.log(data);

	            this.customerList = [];
	            var x = data.message.findIndex(mn=>mn._id == this.customerInfo._id);
				if (x > -1) {
					data.message.splice(x,1);
					this.customerList = data.message;
				}else{
					this.customerList = data.message;
				}	            
				this.loading.dismiss();

	        });
		    },1000);

	}


    private profiles_list(type){

        if (type == 'local') {
            this.filterBy.country = [];
	        this.filterBy.country.push(this.customerInfo.countryName);
    		if (this.activeTab3 != 'activeTab1') {
    			this.activeTab3 = 'activeTab1';
    			this.activeTab2 = 'activeTab2';
    			this.activeTab1 = 'activeTab3';
    			this.activeTab4 = 'activeTab4';
    		    }
            this.getAllCustomers();
    	}

    	if (type == 'global') {

				this.filterBy.country = [];
				this.customerService.getUserCountry().subscribe(country =>{

				var countrys = country.message.filter((item, index, array) => {
				return (item != this.customerInfo.countryName) && (item != "");
				});
				this.filterBy.country = countrys;
				this.getAllCustomers();
				});

    		if (this.activeTab2 != 'activeTab1') {
    			this.activeTab2 = 'activeTab1';
    			this.activeTab1 = 'activeTab2';
    			this.activeTab3 = 'activeTab3';
    			this.activeTab4 = 'activeTab4';
    		}

    	  }


    	  if (type == 'match') {
		  // this.filterBy.country = [];

		   this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", city: []
          ,haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: [], any: false, searchtype : "match"};

          if(this.customerInfo.preferences){
          if((typeof this.customerInfo.preferences.minheight !== 'undefined') && (this.customerInfo.preferences.minheight != "")){  
          this.filterBy.minheight = this.customerInfo.preferences.minheight;
          }
          if((typeof this.customerInfo.preferences.maxheight !== 'undefined') && (this.customerInfo.preferences.maxheight != "")){  
          this.filterBy.maxheight = this.customerInfo.preferences.maxheight;
          }
          if((typeof this.customerInfo.preferences.haircolor !== 'undefined') && (this.customerInfo.preferences.haircolor != "")){  
          this.filterBy.haircolor.push(this.customerInfo.preferences.haircolor);
          }
          if((this.customerInfo.preferences.bodyshape !== 'undefined') && (this.customerInfo.preferences.bodyshape != "")){  
          this.filterBy.bodyshape.push(this.customerInfo.preferences.bodyshape);
          }
          if((this.customerInfo.preferences.maritalStatus !== 'undefined') && (this.customerInfo.preferences.maritalStatus != "")){  
          this.filterBy.maritalStatus.push(this.customerInfo.preferences.maritalStatus);
          }
          if((this.customerInfo.preferences.smoke !== 'undefined') && (this.customerInfo.preferences.smoke != "")){  
          this.filterBy.smoke.push(this.customerInfo.preferences.smoke);
          }
          if((this.customerInfo.preferences.drink !== 'undefined') && (this.customerInfo.preferences.drink != "")){  
          this.filterBy.drink.push(this.customerInfo.preferences.drink);
          }
          if((this.customerInfo.preferences.profession !== 'undefined') && (this.customerInfo.preferences.profession != "")){  
          this.filterBy.profession.push(this.customerInfo.preferences.profession);
          }
          if((typeof this.customerInfo.preferences.sexualorient !== 'undefined') && (this.customerInfo.preferences.sexualorient != "")){
            this.filterBy.sexualorient.push(this.customerInfo.preferences.sexualorient);
          }          
          if((typeof this.customerInfo.preferences.interestedin !== 'undefined') && (this.customerInfo.preferences.interestedin != "")){
            this.filterBy.gender.push(this.customerInfo.preferences.interestedin);
          }
           this.getAllCustomers();
          }
          
          if (this.activeTab4 != 'activeTab1') {
			this.activeTab4 = 'activeTab1';
			this.activeTab2 = 'activeTab2';
			this.activeTab3 = 'activeTab3';
			this.activeTab1 = 'activeTab4';
			}

			/*if (this.activeTab4 != 'activeTab1') {
				this.activeTab4 = 'activeTab1';
				this.activeTab1 = 'activeTab2';
				this.activeTab2 = 'activeTab3';
				this.activeTab3 = 'activeTab4';
			}*/

    	  }

    }


	private getAllCustomers(){
		    this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		    });
            this.loading.present();

			this.customerService.filter(this.filterBy).subscribe((data) => {
			console.log("data");
			console.log(data);
			this.customerList = [];	
			var x = data.message.findIndex(mn=>mn._id == this.customerInfo._id);
			if (x > -1) {
			data.message.splice(x,1);
			this.customerList = data.message;
			}else{
			this.customerList = data.message;
			}
			for (var i = 0; i < this.blockCount; i++) {
			var y = this.friends.findIndex(user => user.FromId._id == this.customerInfo._id && user.status == 4);
			if (y > -1) {
			var z = this.customerList.findIndex(blk => blk._id == this.friends[y].ToId._id);
			if (z > -1) {
			this.customerList.splice(z,1)
			}
			}
			}
		    this.loading.dismiss();
			//this.customerList = data.message; 
		

			});
	}


    private getAllAllow(){
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(data => {
            this.friends = data.message;
            this.blockCount = 0;

            for (var i = 0; i < this.friends.length; i++) {
            	if (this.friends[i].status == 4) {
            		this.blockCount++;
            	}
            }

            console.log("this.friends");
            console.log(this.friends);
        });
       }

    private checkblock(id){
        var index1 = this.friends.findIndex(item => {
            return item.ToId._id == id && item.status == 4 
        });
        var index2 = this.friends.findIndex(item => {
            return item.FromId._id == id && item.status == 4 
        });
        if(index1 != -1 || index2 != -1){
            return false;
        } else{
            return true;
        }
    }


	private doRefresh(refresher) {
		this.profiles_list('all');
		refresher.complete();
	}


	private sortUsers(){
		this.nav.setRoot(FilterPage);

	}
}
