import { Component } from '@angular/core';
import { NavController, Nav, AlertController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import * as globalVariable from "../../app/global";
import { CustomersService } from '../../app/service/index';
import { FileUploader } from 'ng2-file-upload';
import { SettingPage } from '../setting/setting';
import { ProfileUpdatePage } from './profileupdate';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	currentCustomer : any;
	gallery: string = "myPhotos";
	url= globalVariable;
	youtubeUrlForm : FormGroup;
	profilePrcnt : number = 20;

	public uploader: FileUploader = new FileUploader({ url: globalVariable.url+'upload'});

	constructor(
		public nav: Nav,
		private lf: FormBuilder,
		public navCtrl: NavController,
		private customerService: CustomersService,
		public alertCtrl: AlertController,
		public sanitizer: DomSanitizer,
		) {
		this.youtubeUrlForm = this.lf.group({
			videoURL: ['', Validators.required]
		});
		//this.getCustomer();
	}

	ionViewDidLoad() { }

	ionViewDidEnter() {
		this.getCustomer();
	}

	videoUrl(url){
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	private getCustomer(){
		var tempCurrentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
		this.customerService.getOneCustomer(tempCurrentCustomer['_id']).subscribe(cust=>{
			localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
			this.currentCustomer = cust.message;
			console.log(this.currentCustomer);

			this.currentCustomer.profileCompletePercent = 0;
			this.profilePrcnt = 20;

			
			this.profilePercent(cust.message, this.profilePrcnt);
			if (typeof cust.message.preferences != 'undefined') {
				this.profilePercent(cust.message.preferences,this.profilePrcnt);
			}

			setTimeout(()=>{

				this.customerService.updateCustomer(this.currentCustomer).subscribe(data => {
					this.customerService.getOneCustomer(this.currentCustomer['_id']).subscribe(cust2=>{
						localStorage.setItem('currentCustomer', JSON.stringify(cust2.message));
						this.currentCustomer = cust.message;

						console.log("this.currentCustomer");
						console.log(this.currentCustomer);
					});
				});
			},5000)
    	});
	}

	private profilePercent(cstmr,prcnt){
		if (typeof cstmr.height != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.haircolor != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.bodyshape != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.maritalStatus != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.haveChildren != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.smoke != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.drink == 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.qualification != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}
		if (typeof cstmr.profession != 'undefined') {
			prcnt = prcnt + 5;
			this.currentCustomer.profileCompletePercent = prcnt.toString();
		}

		this.profilePrcnt = prcnt;
		this.currentCustomer.profileCompletePercent = this.profilePrcnt.toString();
	}

   private customerImage(img){
       if (img != null) {
           var imgPath = this.url.imageUrl + img;
       }
       if (img == null || img == "") {
           var imgPath = "/assets/images/face3.png";
       }
       return imgPath;
   	}

   	private updateCurrentCustomer(){
   		this.customerService.updateCustomer(this.currentCustomer).subscribe((data)=>{
			if (!data.error) {
				this.getCustomer();
			}
		});
   	}

	addMedia(event, type) {
	    var files = event.srcElement.files;
	    console.log("files");
	    console.log(files);
	    this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			var responsePath = JSON.parse(response);
			if (type == 'pic') {
				this.currentCustomer['myPhotos'].push(responsePath.filename);
			}else{
				this.currentCustomer['profileVideo'] = responsePath.filename;

				console.log(this.currentCustomer);
			}
			this.updateCurrentCustomer();
		};
	}

	private deleteImage(i){
		let confirm = this.alertCtrl.create({
			title: 'Delete Image?',
			buttons: [
			{
				text: 'Cancel',
			},
			{
				text: 'Confirm',
				handler: () => {
					this.currentCustomer['myPhotos'].splice(i,1);
					this.updateCurrentCustomer();
				}
			}
			]
		});
		confirm.present();
	}

	private deleteLink(i){
		let confirm = this.alertCtrl.create({
			title: 'Delete Youtube Video?',
			buttons: [
			{
				text: 'Cancel',
			},
			{
				text: 'Confirm',
				handler: () => {
					this.currentCustomer['videolinks'].splice(i,1);
					this.updateCurrentCustomer();
				}
			}
			]
		});
		confirm.present();
	}

	private goToSettingPage(){
		this.navCtrl.push(SettingPage);
	}

 	private goToUpdateProfile(){
 		this.navCtrl.push(ProfileUpdatePage)
 	}

 	private addYoutubeVideo(){
 		this.currentCustomer['videolinks'].push(this.youtubeUrlForm.value['videoURL']);
 		this.youtubeUrlForm.reset();
 		this.updateCurrentCustomer();
 	}

 	private myProfileVideo(video){
 		return (this.url.imageUrl + video);
 	}
}
