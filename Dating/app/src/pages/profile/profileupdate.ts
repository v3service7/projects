import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { ProfilePage } from './profile';

declare var google: any;

@Component({
  selector: 'page-profile-update',
  templateUrl: 'profileupdate.html',
})
export class ProfileUpdatePage {

	preferences : any = {};

	currentCustomer : any;
	editBasic : boolean = false;
	editSelf : boolean = false;
	editPref : boolean = false;

	colorSelect : String;
	colorSelectPref : String;

	bodySelect : String;
	bodySelectPref : String;

	maritalStatus : String;
	maritalStatusPref : String;

	haveChildren : String;
	haveChildrenPref : String;

	smoke : String;
	smokePref : String;

	drink : String;
	drinkPref : String;

	education : String;
	educationPref : String;

	typeOfWork : String;
	typeOfWorkPref : String;

	BasicInfoForm :FormGroup;
    dob: any = '1990-02-19' ;
    citycountry : any;
    sexualorient: any;

	constructor(
		public nav: Nav,
	    public loadingCtrl: LoadingController,
	    public menuCtrl: MenuController,
	    private lf: FormBuilder,
	    public navCtrl: NavController,
	    private viewCtrl: ViewController,
	    public toastCtrl: ToastController,
	    private customerService: CustomersService,
	    public navParams: NavParams
		) {

		this.BasicInfoForm = this.lf.group({
	        _id: ['', Validators.required],
	        email: ['', Validators.required],
	        username: ['', Validators.required],
	        name: ['', Validators.required],
	        cityName: [],
	        dateofbirth: [],
	        countryName: [],
	        description: [],
	        interests: [],
	        sexualorient: [],
	        gender: [],
	        lat: [],
	        lng: []
	    });
		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
		this.BasicInfoForm.patchValue(this.currentCustomer);
		console.log(this.currentCustomer);
	}

	ionViewDidLoad() {}

	private getOne(){
		this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(cust=>{
    		localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
    		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    		console.log(this.currentCustomer);
    		this.citycountry = this.currentCustomer.cityName +','+ this.currentCustomer.countryName;
    	});
	}

	private chooseDOB(){
		this.BasicInfoForm.controls['dateofbirth'].setValue(this.dob);

	}

	private editBasicInfo(){
		this.editBasic = true;
		this.citycountry = this.currentCustomer.cityName +','+ this.currentCustomer.countryName;
		setTimeout(()=>{
    		this.initMap();
    	},1000) 
	  }

	private initMap() {
        var input = <HTMLInputElement>document.getElementById('pac-input');
        var options = {types: ['(cities)']};
        var autocomplete = new google.maps.places.Autocomplete(input,options);

        autocomplete.addListener('place_changed', ()=> {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            if (place.address_components) {
                let city,country,lat,lng;
                
                if (place.address_components.length >= 4) {
                    city = place.address_components[place.address_components.length-3].long_name;
                }else{
                    city = place.address_components[place.address_components.length-2].long_name;
                }
                country = place.address_components[place.address_components.length-1].long_name;
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();

                this.BasicInfoForm.controls['cityName'].setValue(city);
                this.BasicInfoForm.controls['countryName'].setValue(country);
                this.BasicInfoForm.controls['lat'].setValue(lat);
                this.BasicInfoForm.controls['lng'].setValue(lng);

                console.log("this.BasicInfoForm.value");
                console.log(this.BasicInfoForm.value);
            }
        });
    }

	private editAboutSelf(){
		this.editSelf = true;

		this.colorSelect = this.currentCustomer['haircolor'];
		this.bodySelect = this.currentCustomer['bodyshape'];
		this.maritalStatus = this.currentCustomer['maritalStatus'];
		if (this.currentCustomer['maritalStatus']) {
			this.haveChildren = this.currentCustomer['haveChildren']
		}
		this.smoke = this.currentCustomer['smoke'];
		this.drink = this.currentCustomer['drink'];
		this.typeOfWork = this.currentCustomer['profession'];
	}


	private editAboutPref(){

		this.editPref = true;

		if (this.currentCustomer['preferences']){		
			this.colorSelectPref = this.currentCustomer['preferences']['haircolor'];
			this.bodySelectPref = this.currentCustomer['preferences']['bodyshape'];
			this.maritalStatusPref = this.currentCustomer['preferences']['maritalStatus'];
			this.haveChildrenPref = this.currentCustomer['preferences']['haveChildren'];
			this.sexualorient = this.currentCustomer["preferences"]["sexualorient"];
			this.smokePref = this.currentCustomer['preferences']['smoke'];
			this.drinkPref = this.currentCustomer['preferences']['drink'];
			//this.Pref = this.currentCustomer['preferences']['drink'];
			this.typeOfWorkPref = this.currentCustomer['preferences']['profession'];
		    }else{
			this.colorSelectPref = "";
			this.bodySelectPref = "";
			this.maritalStatusPref = "";
			this.haveChildrenPref = "";
			this.smokePref = "";
			this.drinkPref = "";		
			this.typeOfWorkPref = "";
		    }


	     }



	update(){
		console.log(this.BasicInfoForm.value);

		this.customerService.updateCustomer(this.BasicInfoForm.value).subscribe(data => {
			if (!data.error) {
				this.getToast("Information Updated");
				this.editBasic = false;
				this.getOne();
			}
		});
	   }

	updateInfo(){
		if (this.currentCustomer['preferences']) {
			console.log("preff");
			console.log(this.currentCustomer['preferences']);
			this.customerService.updateCustomer(this.currentCustomer).subscribe(data => {
				if (!data.error) {
					this.getToast("Information Updated");
	            	this.getOne();
	            	this.editSelf = false;
	            	this.editPref = false;
				}
			});
		}else{
			this.currentCustomer['preferences'] = this.preferences;
			this.customerService.updateCustomer(this.currentCustomer).subscribe(data => {
				if (!data.error) {
					this.getToast("Information Updated");
	            	this.getOne();
	            	this.editSelf = false;
	            	this.editPref = false;
				}
			});
		}
	}

	private height(event,type, mm){
		if (type == 'self') {
			this.currentCustomer['height'] = event.target.value;
	     	}else{

			console.log("event,type")
			console.log(event,type, mm);

			if(mm == 'min' && this.currentCustomer['preferences']){
            this.currentCustomer['preferences']['minheight'] = event.target.value;
			}else{
		    this.currentCustomer['preferences']['maxheight'] = event.target.value;
			}
			//	this.preferences['height'] = event.target.value;
		}
	}

	private hairColorFunction(type){
		if(type == 'self') {
		this.currentCustomer['haircolor'] = this.colorSelect;
		}else{
		if (this.currentCustomer['preferences']) {
			this.currentCustomer['preferences']['haircolor'] = this.colorSelectPref;
		}else{
			this.preferences['haircolor'] = this.colorSelectPref;
		}
		}
	}

	private bodyFunction(type){
		if (type == 'self') {
			this.currentCustomer['bodyshape'] = this.bodySelect;
		}else{
			if (this.currentCustomer['preferences']) {
				this.currentCustomer['preferences']['bodyshape'] = this.bodySelectPref;
			}else{
				this.preferences['bodyshape'] = this.bodySelectPref;
			}
		}
	}

	private marriage(type){
		if (type == 'self') {
			if(this.maritalStatus == 'false'){
	            this.currentCustomer['maritalStatus'] = false;
	            this.currentCustomer['haveChildren'] = false;
	        }else{
	            this.currentCustomer['maritalStatus'] = true;
	        }
		}else{
			if (this.currentCustomer['preferences']) {
				if(this.maritalStatusPref == 'false'){
		            this.currentCustomer['preferences']['maritalStatus'] = false;
		            this.currentCustomer['preferences']['haveChildren'] = false;
		        }else{
		            this.currentCustomer['preferences']['maritalStatus'] = true;
		        }
			}else{
				if(this.maritalStatusPref == 'false'){
		            this.preferences['maritalStatus'] = false;
		            this.preferences['haveChildren'] = false;
		        }else{
		            this.preferences['maritalStatus'] = true;
		        }
			}
		}
	}

	private haveChild(type){
		if (type == 'self') {
			if(this.haveChildren == 'false'){
	            this.currentCustomer['haveChildren'] = false;
	        }else{
	            this.currentCustomer['haveChildren'] = true;
	        }
		}else{
			if (this.currentCustomer['preferences']) {
				if(this.haveChildrenPref == 'false'){
		            this.currentCustomer['preferences']['haveChildren'] = false;
		        }else{
		            this.currentCustomer['preferences']['haveChildren'] = true;
		        }
			}else{
				if(this.haveChildrenPref == 'false'){
		            this.preferences['haveChildren'] = false;
		        }else{
		            this.preferences['haveChildren'] = true;
		        }
		    }
		}
	}

	private smoker(type){
		if (type == 'self') {
			if(this.smoke == 'false'){
	            this.currentCustomer['smoke'] = false;
	        }else{
	            this.currentCustomer['smoke'] = true;
	        }
		}else{
			if (this.currentCustomer['preferences']) {
				if(this.smoke == 'false'){
		            this.currentCustomer['preferences']['smoke'] = false;
		        }else{
		            this.currentCustomer['preferences']['smoke'] = true;
		        }
			}else{
				if(this.smoke == 'false'){
		            this.preferences['smoke'] = false;
		        }else{
		            this.preferences['smoke'] = true;
		        }
			}
		}
	}

	private drinker(type){
		if (type == 'self') {
			if(this.drink == 'false'){
	            this.currentCustomer['drink'] = false;
	        }else{
	            this.currentCustomer['drink'] = true;
	        }
	    }else{
	    	if (this.currentCustomer['preferences']) {
				if(this.drinkPref == 'false'){
		            this.currentCustomer['preferences']['drink'] = false;
		        }else{
		            this.currentCustomer['preferences']['drink'] = true;
		        }
	    	}else{
	    		if(this.drinkPref == 'false'){
		            this.preferences['drink'] = false;
		        }else{
		            this.preferences['drink'] = true;
		        }
	    	}
	    }
	}

    private profession(type){
    	if (type == 'self') {
    		this.currentCustomer['profession'] = this.typeOfWork;
    	}else{
    		if (this.currentCustomer['preferences']) {
    			this.currentCustomer['preferences']['profession'] = this.typeOfWorkPref;
    		}else{
    			this.preferences['profession'] = this.typeOfWorkPref;
    		}
    	}
       }


     private sexualorientf(){
      this.preferences['sexualorient'] = this.sexualorient;	
     }


	private getToast(msg){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position:'top' //top,middle,bottom
		});
		toast.present();
	}

	private backToProfile(){
		this.navCtrl.pop(ProfilePage);
	}
}
