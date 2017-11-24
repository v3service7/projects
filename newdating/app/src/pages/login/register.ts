import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../app/service/customer.service';

import { FileUploader } from 'ng2-file-upload';
import * as globalVariable from "../../app/global";

declare var google: any;
import { StepPage } from './step';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	signUpForm: FormGroup;
	mMale : boolean;
	mFemale : boolean;
	looking4Male : boolean;
	looking4Female : boolean;
	haveImage : boolean = false;
	haveAddress : boolean = false;
	userRegistered : boolean = false;
	dateofbirth : any;
	gender : any;
	event = {month: '1990-02-19'};

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload' });
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
		){
		this.signUpForm = this.lf.group({
			gender: ['', Validators.required],
			dateofbirth: ['', Validators.required],
			interestedin: ['', Validators.required],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			cityName: [],
			countryName: [],
			lat: [],
			lng: [],
			profilePic: []
		});
		//this.moveForward();
		this.signUpForm.controls['dateofbirth'].setValue(this.event.month);
	}

  	importonViewDidLoad() {
  	}

	private register(){
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();

		/*localStorage.setItem('user',JSON.stringify(this.signUpForm.value));
       	loading.dismiss();
       	this.navCtrl.push(StepPage);*/

        this.customerService.addCustomer(this.signUpForm.value).subscribe(
            (data) => {
            	if (!data.error) {
					localStorage.setItem('user',JSON.stringify(data.message));
	            	loading.dismiss();
					this.getToast('Registered Successfully');
					this.navCtrl.push(StepPage);
            	}else{
            		loading.dismiss();
					this.getToast('Email/Username Already Exist');
					this.signUpForm.reset();
            	}
            }
        );
    }

    private moveForward(){
    	this.userRegistered = true;
    	setTimeout(()=>{
    		this.initMap();
    	},1000) 
    }

	private getToast(msg){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position:'top' //top,middle,bottom
		});
		toast.present();
	}

	private selectGender(type){
		if (type == 'male') {
			this.mMale = true;
			this.mFemale = false;
			this.signUpForm.controls['gender'].setValue('male');
		}
		if (type == 'female') {
			this.mMale = false;
			this.mFemale = true;
			this.signUpForm.controls['gender'].setValue('female');
		}
		if (type == 'maleP') {
			this.looking4Male = true;
			this.looking4Female = false;
			this.signUpForm.controls['interestedin'].setValue('male');
		}
		if (type == 'femaleP') {
			this.looking4Male = false;
			this.looking4Female = true;
			this.signUpForm.controls['interestedin'].setValue('female');
		}
	}

	private selectedMale(type){

		if (type == 'chooseGender') {
			if (this.mMale) {
				var imgPath = "assets/images/male-orange.svg"
				return imgPath;
			}else{
				var imgPath = "assets/images/male-black.svg"
				return imgPath;
			}
		}else{
			if (this.looking4Male) {
				var imgPath = "assets/images/male-orange.svg"
				return imgPath;
			}else{
				var imgPath = "assets/images/male-black.svg"
				return imgPath;
			}			
		}
	}

	private selectedFemale(type){
		if (type == 'chooseGender') {
			if (this.mFemale) {
				var imgPath = "assets/images/woman-orange.svg"
				return imgPath;
			}else{
				var imgPath = "assets/images/woman-black.svg"
				return imgPath;
			}
		}else{
			if (this.looking4Female) {
				var imgPath = "assets/images/woman-orange.svg"
				return imgPath;
			}else{
				var imgPath = "assets/images/woman-black.svg"
				return imgPath;
			}			
		}
	}

	private chooseDOB(){
		this.signUpForm.controls['dateofbirth'].setValue(this.event.month);

	}

	onChange(event) {
	    var files = event.srcElement.files;
	    console.log("files");
	    console.log(files);
	    this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			//console.log(responsePath.filename);
			this.signUpForm.controls['profilePic'].setValue(responsePath.filename);
			this.haveImage = true;
		};
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

                this.signUpForm.controls['cityName'].setValue(city);
                this.signUpForm.controls['countryName'].setValue(country);
                this.signUpForm.controls['lat'].setValue(lat);
                this.signUpForm.controls['lng'].setValue(lng);
            }
        });
    }
}
