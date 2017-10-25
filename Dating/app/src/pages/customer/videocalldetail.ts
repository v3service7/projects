import { Component, Input,OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';



@Component({
	selector: 'page-videocalldetail',
	templateUrl: 'videocalldetail.html'
})
export class VideoCallOutgoingPage  implements OnInit{

    customer: any;
    currentcall : any;
    url= globalVariable;

	constructor(
		public navCtrl: NavController,
		public customerService: CustomersService,
		private friendService : FriendService,
		public navParams: NavParams,
		private socketService : SocketService,
        public events: Events,
        public loadingCtrl: LoadingController
		) {
        this.currentcall = navParams.get('callingto');
    	}


    	ngOnInit(){		
    	this.getCustomer(this.currentcall._id);
    	}	

        private getCustomer(id){
        this.customerService.getOneCustomer(id).subscribe((data) => {
        this.customer = data.message;
        });
        }

        private videocallcancel(){
        this.socketService.callcancel(this.currentcall);  
        this.currentcall = {}; 
        this.navCtrl.pop(VideoCallOutgoingPage);
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



}
