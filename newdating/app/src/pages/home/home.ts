import { Component, Input } from '@angular/core';
import { NavController,LoadingController,NavParams, Nav, Events,  ModalController, Platform, ViewController, } from 'ionic-angular';


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
    activeTab: any = "";

	constructor(
		public events: Events,
		public navCtrl: NavController,
		public nav: Nav,
		public customerService: CustomersService,
		public loadingCtrl: LoadingController,
		public navParams: NavParams,
		private friendService : FriendService,
		public modalCtrl: ModalController
		) {
		if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.getAllAllow();
	   		this.getLocal();
        }
	}

	ionViewDidEnter() {   	
    this.events.subscribe("filter:data", (data) => {    	
    	let filter = data.filterBy;  
        this.filterSearch(filter);
	});
    }

    private progressOn(){
    	this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
    }


	private someEvent(){
		console.log("someEvent");
	}

/* Local */ 
	private getLocal(){
		this.progressOn();
        this.activeTab = 'local';
		if (this.activeTab3 != 'activeTab1') {
		this.activeTab3 = 'activeTab1';
		this.activeTab2 = 'activeTab2';
		this.activeTab1 = 'activeTab3';
		this.activeTab4 = 'activeTab4';	
    	}

	        this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []}; 	
	        this.filterBy.country = []; 	
	        if(this.filterBy.country.indexOf(this.customerInfo.countryName) == -1){
				this.filterBy.country.push(this.customerInfo.countryName); 

			} 
		this.getAllCustomers();
		
        }
	


/* GLobal */ 
	private getGlobal(type){
		this.progressOn();
    	this.activeTab = 'global';
		if (this.activeTab2 != 'activeTab1') {
			this.activeTab2 = 'activeTab1';
			this.activeTab1 = 'activeTab2';
			this.activeTab3 = 'activeTab3';
			this.activeTab4 = 'activeTab4';
		}	

		    this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []}; 			
			this.customerService.getUserCountry().subscribe(country =>{
			var countrys = country.message.filter((item, index, array) => {
			return (item != this.customerInfo.countryName) && (item != "");
			});
			
			if(countrys.length == 0){            
	            this.filterBy.country.push("no");
	          }else{
	            this.filterBy.country = countrys;
	          }
			this.getAllCustomers();
			});

	       }

/* Match */ 
	private getMatch(type){
		this.progressOn();
		this.activeTab = 'match';
        if (this.activeTab4 != 'activeTab1') {
			this.activeTab4 = 'activeTab1';
			this.activeTab2 = 'activeTab2';
			this.activeTab3 = 'activeTab3';
		}

		
         this.filterBy = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []}; 	
		 
		if (typeof this.customerInfo['preferences'] != 'undefined') {

			if ((typeof this.customerInfo.preferences.haircolor !== 'undefined') && (this.customerInfo.preferences.haircolor != "")) {
				this.filterBy['haircolor'].push(this.customerInfo.preferences.haircolor);
			}
			if ((typeof this.customerInfo.preferences.bodyshape != "undefined") && (this.customerInfo.preferences.bodyshape != "")) {
				this.filterBy['bodyshape'].push(this.customerInfo.preferences.bodyshape);
			}
			if ((typeof this.customerInfo.preferences.maritalStatus != 'undefined') && (this.customerInfo.preferences.maritalStatus != "")){
				this.filterBy['maritalstatus'].push(this.customerInfo.preferences.maritalStatus);
			}
			if ((typeof this.customerInfo.preferences.smoke !== 'undefined') && (this.customerInfo.preferences.smoke != ''))  {
				this.filterBy['smoke'].push(this.customerInfo.preferences.smoke);
			}
			if ((typeof this.customerInfo.preferences.drink !== 'undefined') && (this.customerInfo.preferences.drink != '')) {
				this.filterBy['drink'].push(this.customerInfo.preferences.drink);
			}
			if ((typeof this.customerInfo.preferences.profession !== 'undefined') && (this.customerInfo.preferences.profession != "")) {
				this.filterBy['profession'].push(this.customerInfo.preferences.profession);
			}
			if((typeof this.customerInfo.preferences.sexualorient !== 'undefined') && (this.customerInfo.preferences.sexualorient != "")){
			this.filterBy.sexualorient.push(this.customerInfo.preferences.sexualorient);
			} 

			if((typeof this.customerInfo.preferences.interestedin !== 'undefined') && (this.customerInfo.preferences.interestedin != "")){
			this.filterBy.gender.push(this.customerInfo.preferences.interestedin);
			}
            
			if((typeof this.customerInfo.preferences.minheight !== 'undefined') && (this.customerInfo.preferences.minheight != "")){  
			this.filterBy.minheight = this.customerInfo.preferences.minheight;
			}
			if((typeof this.customerInfo.preferences.maxheight !== 'undefined') && (this.customerInfo.preferences.maxheight != "")){  
			this.filterBy.maxheight = this.customerInfo.preferences.maxheight;
			}
		}
		this.getAllCustomers();		
	}


  /* Filter */
	public filterSearch(filter){
		console.log("filter");
		console.log(filter);
		this.filterBy = filter;
		this.getAllCustomers();
		}

	private getAllCustomers(){
		    
		    console.log("this.filterBy for customers");
		    console.log(this.filterBy);

			this.customerService.filter(this.filterBy).subscribe((data) => {

				//console.log("data match");
				//console.log(data);

				this.loading.dismiss();

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
		this.getAllCustomers();
		refresher.complete();
	}

	private filterResults(){
	let modal = this.modalCtrl.create(ModalContentPage, {
			filterBy: this.filterBy
		});
    modal.present();
	}
}


@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Filter By
    </ion-title>
    <ion-buttons End	>
      <button ion-button (click)="dismiss()">
        <span item-right ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon item-right name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      
    <ion-item>
        <ion-label>Hair Color</ion-label>
        <ion-select [(ngModel)]="filterBy.haircolor" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption('haircolor')">
            <ion-option value="Black">Black</ion-option>
            <ion-option value="Light Brown">Light Brown</ion-option>
            <ion-option value="Brunette/Brown">Brunette/Brown</ion-option>
            <ion-option value="Red">Red</ion-option>
            <ion-option value="Blonde">Blonde</ion-option>
            <ion-option value="Bald/Shaven">Bald/Shaven</ion-option>
            <ion-option value="Other">Other</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Body Type</ion-label>
        <ion-select [(ngModel)]="filterBy.bodyshape" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption('bodyshape')">
            <ion-option value="Petite">Petite</ion-option>
            <ion-option value="Slender">Slender</ion-option>
            <ion-option value="Medium">Medium</ion-option>
            <ion-option value="Few Extra Pounds">Few Extra Pounds</ion-option>
            <ion-option value="Well Built">Well Built</ion-option>
            <ion-option value="Overweight">Overweight</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Smoke</ion-label>
        <ion-select [(ngModel)]="filterBy.smoke" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption('smoke')">
            <ion-option value ="occasionally">Occasionally</ion-option>
            <ion-option value ="never">Never</ion-option>
            <ion-option value ="rarely">Rarely</ion-option>
            <ion-option value ="regularly">Regularly</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Drink</ion-label>
        <ion-select [(ngModel)]="filterBy.drink" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption('drink')">
             <ion-option value ="occasionally">Occasionally</ion-option>
            <ion-option value ="never">Never</ion-option>
            <ion-option value ="rarely">Rarely</ion-option>
            <ion-option value ="regularly">Regularly</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Profession</ion-label>
        <ion-select [(ngModel)]="filterBy.profession" multiple="true" submitText="Ok" cancelText="Cancel" (ionChange)="selectOption('profession')">
            <ion-option value = "Aircraft Dispatcher">Aircraft Dispatcher</ion-option>
            <ion-option value = "Aircraft Mechanic">Aircraft Mechanic</ion-option>
            <ion-option value = "Airline Pilot">Airline Pilot</ion-option>
            <ion-option value = "Flight Attendant">Flight Attendant</ion-option>
            <ion-option value = "Arts">Arts</ion-option>
            <ion-option value = "Actor">Actor</ion-option>
            <ion-option value = "Architecture">Architecture</ion-option>
            <ion-option value = "Art Appraiser">Art Appraiser</ion-option>
            <ion-option value = "Art Auctioneer">Art Auctioneer</ion-option>
            <ion-option value = "Artist">Artist</ion-option>
            <ion-option value = "Museum Jobs">Museum Jobs</ion-option>
            <ion-option value = "Music Conductor">Music Conductor</ion-option>
            <ion-option value = "Business">Business</ion-option>
            <ion-option value = "Accountant">Accountant</ion-option>
            <ion-option value = "Administrative Assistant/Secretary">Administrative Assistant/Secretary</ion-option>
            <ion-option value = "Advertising">Advertising</ion-option>
            <ion-option value = "Consultant">Consultant</ion-option>
            <ion-option value = "Financial Advisor">Financial Advisor</ion-option>
            <ion-option value = "Fundraiser">Fundraiser</ion-option>
            <ion-option value = "Government Jobs">Government Jobs</ion-option>
            <ion-option value = "Human Resources">Human Resources</ion-option>
            <ion-option value = "Insurance Agent">Insurance Agent</ion-option>
            <ion-option value = "Investment Banker">Investment Banker</ion-option>
            <ion-option value = "Lawyer">Lawyer</ion-option>
            <ion-option value = "Management">Management</ion-option>
            <ion-option value = "Market Research Analyst">Market Research Analyst</ion-option>
            <ion-option value = "Nonprofit Job">Nonprofit Job</ion-option>
            <ion-option value = "Law Enforcement">Law Enforcement</ion-option>
            <ion-option value = "Criminal Justice">Criminal Justice</ion-option>
            <ion-option value = "Federal Law Enforcement">Federal Law Enforcement</ion-option>
            <ion-option value = "Police Officer">Police Officer</ion-option>
            <ion-option value = "Media">Media</ion-option>
            <ion-option value = "Book Publishing">Book Publishing</ion-option>
            <ion-option value = "Freelance Editor">Freelance Editor</ion-option>
            <ion-option value = "Freelance Writer">Freelance Writer</ion-option>
            <ion-option value = "Public Relations">Public Relations</ion-option>
            <ion-option value = "Web Developer">Web Developer</ion-option>
            <ion-option value = "Writer/Editor">Writer/Editor</ion-option>
            <ion-option value = "Medical">Medical</ion-option>
            <ion-option value = "Doctor">Doctor</ion-option>
            <ion-option value = "Nurse">Nurse</ion-option>
            <ion-option value = "Paramedic">Paramedic</ion-option>
            <ion-option value = "Psychologist">Psychologist</ion-option>
            <ion-option value = "Social Worker">Social Worker</ion-option>
            <ion-option value = "Veterinarian">Veterinarian</ion-option>
            <ion-option value = "Service Industry">Service Industry</ion-option>
            <ion-option value = "Bank Teller">Bank Teller</ion-option>
            <ion-option value = "Call Center">Call Center</ion-option>
            <ion-option value = "Funeral Director">Funeral Director</ion-option>
            <ion-option value = "Hair Stylist">Hair Stylist</ion-option>
            <ion-option value = "Personal Fitness Trainer">Personal Fitness Trainer</ion-option>
            <ion-option value = "Retail">Retail</ion-option>
            <ion-option value = "Sales">Sales</ion-option>
            <ion-option value = "Ski Instructor">Ski Instructor</ion-option>
            <ion-option value = "Waiter">Waiter</ion-option>
            <ion-option value = "Wedding Planner">Wedding Planner</ion-option>
            <ion-option value = "Career Counselor">Career Counselor</ion-option>
            <ion-option value = "School Jobs">School Jobs</ion-option>
            <ion-option value = "Substitute Teacher">Substitute Teacher</ion-option>
            <ion-option value = "Teacher">Teacher</ion-option>
            <ion-option value = "Teaching Abroad">Teaching Abroad</ion-option>
            <ion-option value = "Teaching Online">Teaching Online</ion-option>
            <ion-option value = "Technology">Technology</ion-option>
            <ion-option value = "App Developer">App Developer</ion-option>
            <ion-option value = "Computer Programmer">Computer Programmer</ion-option>
            <ion-option value = "Database Administrator">Database Administrator</ion-option>
            <ion-option value = "Assistant/Secretary">Assistant/Secretary</ion-option>
            <ion-option value = "Programmer">Programmer</ion-option>
            <ion-option value = "Software Developer">Software Developer</ion-option>
            <ion-option value = "Web Developer">Web Developer</ion-option>
            <ion-option value = "Other">Other</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Marital Status</ion-label>
        <ion-select [(ngModel)]="filterBy.maritalstatus" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption('maritalstatus')">
            <ion-option value = true>Yes</ion-option>
            <ion-option value = false>No</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Sex Orientation</ion-label>
        <ion-select [(ngModel)]="filterBy.sexualorient" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption('sexualorient')">
            <ion-option value = "Straight">Straight</ion-option>
            <ion-option value = "Bisexual">Bisexual</ion-option>
            <ion-option value = "Lesbian">Lesbian</ion-option>
            <ion-option value = "Gay">Gay</ion-option>
            <ion-option value = "Other">Other</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Gender</ion-label>
        <ion-select [(ngModel)]="filterBy.gender" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption('gender')">
            <ion-option value = "male">Male</ion-option>
            <ion-option value = "female">Female</ion-option>
        </ion-select>
    </ion-item>

    <ion-item>
        <ion-label>Country</ion-label>
        <ion-select [(ngModel)]="filterBy.country" multiple="true" cancelText="Cancel" okText="Ok" (ionChange)="selectOption('country')">
            <ion-option *ngFor="let cntry of countries" value = {{cntry}}>{{cntry}}</ion-option>
        </ion-select>
    </ion-item>

   <ion-item class="heightSelect">
        <ion-label>
            Min Height:
        </ion-label>
        <ion-label> 
            <ion-item>
            <ion-input type="number" [(ngModel)]="filterBy.minheight"  placeholder="Min height"></ion-input>
            </ion-item>            
            </ion-label>
            </ion-item>

    <ion-item class="heightSelect">
            <ion-label>
                Max Height:
            </ion-label>
            <ion-label>
            <ion-item>
            <ion-input type="number" [(ngModel)]="filterBy.maxheight"  placeholder="Max height"></ion-input>
            </ion-item> 
            </ion-label>       
    </ion-item>

    <ion-item class="heightSelect">
        <ion-label>
            Min Age:
        </ion-label>
        <ion-label> 
            <ion-item>
            <ion-input type="number" [(ngModel)]="filterBy.minage"  placeholder="Min age"></ion-input>
            </ion-item>            
            </ion-label>
            </ion-item>

            <ion-item class="heightSelect">
        <ion-label>
            Max Age:
        </ion-label>
        <ion-label> 
            <ion-item>
            <ion-input type="number" [(ngModel)]="filterBy.maxage"  placeholder="Max age"></ion-input>
            </ion-item>            
            </ion-label>
            </ion-item>

    <ion-item>
        <ion-label text-center><button  ion-button class="bcColor" (click) = "showAfterFilter()"> Search </button></ion-label>
    </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  filterBy : any = { gender : [], online : "xyz", minage: "", maxage: "", country: [], sexualorient: [], minheight: "", maxheight: "", haircolor: [], bodyshape: [], maritalstatus: [], smoke: [], drink: [], profession: []};    
  countries: any = [];

  constructor(
  	public events: Events,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public customerService : CustomersService
    ) { 
    this.getuserCountry();   
   this.filterBy = this.params.get('filterBy');
  }
   
  dismiss() {
    this.viewCtrl.dismiss();
  }
 private selectOption(type){
     	console.log(type);
     }
	private getuserCountry(){
        this.customerService.getUserCountry().subscribe((country) =>{  
          this.countries = country.message;
        });
    }

    private showAfterFilter(){
    	let obj:any = {
				filterBy : this.filterBy
			};
			this.events.publish("filter:data", obj);
			this.dismiss();
    }
}