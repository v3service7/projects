import { Component,OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';
import { FriendPage } from '../friend/friend';
import { MessagesPage } from '../messages/messages';
import { ProfilePage } from '../profile/profile';
import { VideoCallIncomingPage } from './videocallincoming';
import { ModalController, NavParams ,NavController, Nav} from 'ionic-angular';
import { SocketService, CustomersService} from '../../app/service/index';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

    customerInfo : any ;
    messagesCount : any;
    unreadMessages : any = [];
    unreadMessagesCount : any = 0;
    call_resp : any;
    callingto: any;

	tab1Root = HomePage;
	tab2Root = AboutPage;
	tab3Root = MessagesPage;
	tab4Root = FriendPage;
	tab5Root = ProfilePage;
 
	constructor(
		private socketService : SocketService,
		private customerService : CustomersService,
		public events: Events,
		public navCtrl: NavController
	) {
		if(localStorage.getItem("currentCustomer")){
			this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
		}
	  }

	ionViewDidLoad() {}

	ionViewDidEnter() {
   this.initfuntion();
   

    this.events.subscribe('messages:badgecounter', (time) => {    
    	setTimeout(() => {
        this.initfuntion();
    	}, 3000);
     });
	}

	initfuntion(){
    this.myMessage();
    this.messageReceived();
    this.tokboxNewReqReceive();
	}
 
	private myMessage(){  
	this.unreadMessagesCount = 0;   
	this.unreadMessages = [];
	this.customerService.unreadMessage(this.customerInfo._id).subscribe(messages=>{

	    this.unreadMessages = messages.message;
	    if (this.unreadMessages.length > 0) {
	        for (var i = 0; i < this.unreadMessages.length; i++) {
	            var unread = 0;
	            for (var j = 0; j < this.unreadMessages[i]['messages'].length; j++) {
	                if (!this.unreadMessages[i]['messages'][j].isread) {
                        this.unreadMessagesCount += 1;
	                    unread++;
	                }
	                this.unreadMessages[i]['unreadMessage'] = unread;
	            }
	        }
	    }
	    console.log("messages unreda");
	    console.log(this.unreadMessages);  
	   });

	}
	
  private messageReceived(){
      this.socketService.receiveMessages().subscribe(response => { 
            console.log("received message on tab");
            console.log(response);
            this.unreadMessagesCount += 1;
            this.events.publish('messages:receivedmsg', response, Date.now());
        });
       }


    private tokboxNewReqReceive(){
        this.socketService.vedioResponse().subscribe(response =>{ 
            console.log('New Video Call');
            this.call_resp = response;  
            this.navCtrl.push(VideoCallIncomingPage, { callingto : this.call_resp});
        });
      }
      

}
