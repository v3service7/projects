import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController,AlertController,Nav,ViewController } from 'ionic-angular';

import { CustomersService,PackageService } from '../../app/service/index';

import { SettingPage } from './setting';

@Component({
	selector: 'page-plan',
	templateUrl: 'plan.html'
})
export class PlanPage {

	plan : string = 'myPlan';
	currentCustomer : any = {};
	packages : any = [];

	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		private customerService: CustomersService,
		private packageService: PackageService,
		public toastCtrl: ToastController,
		) {

		this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
		this.getOne(this.currentCustomer._id);
		this.getAllPackages();

	}

	private getOne(id){
		this.customerService.getOneCustomer(id).subscribe(cust=>{
			localStorage.setItem('currentCustomer', JSON.stringify(cust.message));
			this.currentCustomer = cust.message;
			console.log(this.currentCustomer);
		});
	}

	private getAllPackages(){
		this.packageService.getAll().subscribe(pkg=>{
			console.log("pkg.message");
			console.log(pkg.message);
			this.packages = pkg.message;
		});
	}

	private buyPackage(pkg){
		let confirm = this.alertCtrl.create({
			title: 'Buy Package?',
			buttons: [
			{
				text: 'Cancel',
			},
			{
				text: 'Confirm',
				handler: () => {
					if (typeof this.currentCustomer['mypackage'] != 'undefined') {
						this.currentCustomer['packagesPurchased'].push(this.currentCustomer['mypackage']);
					}
					this.currentCustomer['mypackage'] = pkg;
					this.currentCustomer['mypackage']['remaincalls'] = pkg.noofcalls;
					this.updateCurrentCustomer();
					setTimeout(()=>{
						this.plan = 'myPlan';
					},1000)
				}
			}
			]
		});
		confirm.present();
	}

	private updateCurrentCustomer(){
		this.customerService.updateCustomer(this.currentCustomer).subscribe(data => {
			if (!data.error) {
				this.getToast("Package Added Successfully");
				this.getOne(this.currentCustomer._id);
			}
		});
	}

	private getToast(msg){
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position:'top' //top,middle,bottom
		});
		toast.present();
	}
}
