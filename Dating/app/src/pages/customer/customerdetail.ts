import { Component, Input,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';

import { CustomerPage } from './customer';

@Component({
	selector: 'page-customerdetail',
	templateUrl: 'customerdetail.html'
})
export class CustomerDetailPage  implements OnInit{
	id : string;
	customer:any;
	customerInfo:any;
	friends:any = [];
	showBasic:boolean = false;
	url= globalVariable;
	myonline : any = [];

	constructor(
		public navCtrl: NavController,
		public customerService: CustomersService,
		private friendService : FriendService,
		public navParams: NavParams,
		private socketService : SocketService
		) {
		this.id = navParams.get('id');
		/*this.id = localStorage.getItem('id');*/
	}

	ngOnInit(){
		if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));      
        }
        this.getAllAllow();

		this.getCustomer(this.id);

		this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();       
        this.socketService.onlineList2emit();  
        this.socketService.onlineList3emit();
        this.offlinenew2();
	}

	private onlinenew() {
        this.socketService.onlineList2().subscribe(response => {   
            this.myonline = response.chatList.map(function(a) {return a._id;});           
            console.log("main 1"); 
            console.log(this.myonline);
        }); 
    }

    private onlinenew2(){
        this.socketService.onlineListon2().subscribe(response => {   
            this.myonline = response.chatList.map(function(a) {return a._id;});   
            console.log("main 2");     
        }); 
    }

    private onlinenew3(){
        this.socketService.onlineList3().subscribe(response => {   
            this.myonline = response.chatList.map(function(a) {return a._id;});        
            console.log("main 3"); 
        }); 
    }

    private offlinenew2(){
        this.socketService.offline2().subscribe(response => {
            this.myonline = response.chatList.map(function(a) {return a._id;});
        });
    }


	private getCustomer(id){
		this.customerService.getOneCustomer(id).subscribe(cust=>{
			this.customer = cust.message;
			console.log("this.customer");
			console.log(this.customer);
    	});
	}

	private getAllAllow(){
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(data => {
            this.friends = data.message;

            console.log("this.friends");
            console.log(this.friends);
        });
    }

    private checkforinvite(id){   
        const index1 = this.friends.findIndex(item => item.FromId._id == id);
        const index2 = this.friends.findIndex(item => item.ToId._id == id);
        if(index1 != -1 || index2 != -1){
            return false;
        } else {
            return true;
        } 
    }

	private customerImage(img){
		if (img != null) {
			var imgPath = this.url.imageUrl + img;
		}
		if (img == null) {
			var imgPath = "/assets/images/face3.png";
		}
		return imgPath;
	}

	private showMoreDetail(){
		this.showBasic = true;
	}

	private hideMoreDetail(){
		this.showBasic = false;
	}

}
