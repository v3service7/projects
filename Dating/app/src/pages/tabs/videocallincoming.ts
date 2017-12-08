import { Component, Input,OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, Nav} from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import { VideocallPage } from '../videocall/videocall';
import { CustomerPage } from '../customer/customer';

@Component({
	selector: 'page-videocallincoming',
	templateUrl: 'videocallincoming.html'
})
export class VideoCallIncomingPage  implements OnInit{

    customer: any;
    currentcall : any;
    url : any = globalVariable;
    customerInfo : any;
    call_resp: any;

	constructor(
		public navCtrl: NavController,
		public customerService: CustomersService,
		private friendService : FriendService,
		public navParams: NavParams,
		private socketService : SocketService,
        public events: Events,
        public loadingCtrl: LoadingController,
        public nav : Nav,

		) {
        
        this.currentcall = navParams.get('callingto');
        this.call_resp = this.currentcall;
        if(localStorage.getItem("currentCustomer")){
             this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
             }
    	}

    	ngOnInit(){		
    	this.getCustomer(this.currentcall.connectedTo);
        this.callAccepted();
        this.declineCall();
    	}	
        
        private callAccepted(){
             this.socketService.callrecivedresponse().subscribe((data)=>{
                     
                      console.log("call Accepted user", data);
                      //this.nav.setRoot(VideocallPage, {response : data});

             });
        }
         
        declineCall(){
        this.socketService.cancalvediocallresponse().subscribe((data) =>{
         console.log("call declined");
         this.navCtrl.popTo(CustomerPage);
        });
        } 

        private getCustomer(id){
        this.customerService.getOneCustomer(id).subscribe((data) => {
        this.customer = data.message;
        });
        }

        private customerImage(img){
        var imgPath= "";
        if (img != null) {
            imgPath = this.url.imageUrl + img;
        }
        if (img == null) {
            imgPath = "/assets/images/face3.png";
            }
            return imgPath;
           }

                private receivemodel(action){
                if(action == 'yes'){
                var obj1  = {status : true, share : this.call_resp};
                this.callreceived(obj1);
                this.call_resp = {};
                 //this.close();
                }else{
                var obj2  = {status : false, share : this.call_resp};
                this.callreceived(obj2);
                this.call_resp = {};               
                 // this.close();
                }
                }

                private callreceived(response){                            
                if(response.status){              
                var nid = response.share.connectedTo;
                response.share.connectedTo = this.customerInfo._id;
                this.socketService.vediocallaccept(response);
                console.log("Connected user", response);
                
                //localStorage.setItem("searchedlist", JSON.stringify(window.location.href));
                //this.router.navigate(['customer/video-call/', response.share.sessionid, response.share.tokenid, nid]);           

                this.nav.setRoot(VideocallPage, {response : response});
                }else{
                response.share.connectedTo = this.customerInfo._id;
                this.socketService.vediocallaccept(response);
                this.navCtrl.popTo(CustomerPage);
                }           
                } 
}
