import { Component, Input,OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';

import { CustomerPage } from './customer';
import { MessageDetailPage } from '../messages/messagedetail'

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

	@Output() changeSomething : EventEmitter<string> = new EventEmitter();



	constructor(
		public navCtrl: NavController,
		public customerService: CustomersService,
		private friendService : FriendService,
		public navParams: NavParams,
		private socketService : SocketService,
        public events: Events,
        public loadingCtrl: LoadingController
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





    private SomeEvent(){
        this.getAllAllow();
        this.changeSomething.emit('complete');  
    }

    private acceptrequest(id, pid) {
        var friendobj={_id: id, status:1};
        this.friendService.updateFriend(friendobj).subscribe((data) => {
            this.SomeEvent();
        });
    }

    private deleteBlock(id){        
        this.friendService.deleteOne(id).subscribe((data) => {
            this.SomeEvent();
        });
    }

    private unblockrequest(data, type) {
        if(type == 2){
            var friendobj ={_id:data._id, FromId: data.ToId._id, ToId: data.FromId._id, status:0};
            this.friendService.updateFriend(friendobj).subscribe(
                (data) => {
                    this.SomeEvent();
                });
        }else{
            this.SomeEvent();
            this.deleteBlock(data._id);
        }
    }


    private selectNewChat(id){
        let loading = this.loadingCtrl.create({
            content : 'Loading your messages...'
        });

        loading.present();
        let messageObj = {};
        this.customerService.getOneCustomer(id).subscribe((data) => {
            messageObj['id'] = data.message;

            localStorage.setItem("currentChat", JSON.stringify(data.message));

            this.events.publish('messages:badgecounter', Date.now());

            var obj = {fromCustId: data.message, toCustId: this.customerInfo._id};

            this.customerService.getmessage(obj).subscribe((data1) => {
                messageObj['messages'] = data1.message;
                loading.dismiss();
                this.navCtrl.push(MessageDetailPage, {
                    message : messageObj
                });
            });

        });
    }

    private requestFromTo(from, to, type){
        var obj = {FromId : from, ToId: to, title: type}; 
        this.SomeEvent();
    }


    private sendRequest(id) {
        var friendobj={FromId: this.customerInfo._id, ToId:id, status:0}
        this.friendService.addFriend(friendobj).subscribe((data) => {
            this.SomeEvent();
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

    private anyBlockRequest(id) {
        var friendobj={ FromId:this.customerInfo._id, ToId:id, status:4}
        this.friendService.addFriend(friendobj).subscribe((data) => {
            this.SomeEvent();
        });
    }


}
