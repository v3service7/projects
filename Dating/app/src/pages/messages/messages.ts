import { Component, Input } from '@angular/core';
import { NavController,LoadingController, Events} from 'ionic-angular';
import { CustomersService,FriendService, SocketService} from '../../app/service/index';

import * as globalVariable from "../../app/global";

import { MessageDetailPage } from "./messagedetail";

@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html'
})
export class MessagesPage {
	unreadMessages:any=[];
	loading:any;
	customerInfo:any;
    url= globalVariable;

    constructor(
        public friendService:FriendService,
        public navCtrl: NavController,
        public customerService: CustomersService,
        public loadingCtrl: LoadingController,
        private socketService : SocketService,
        public events: Events
        ) {}

    ionViewDidEnter() {
        if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myMessage();
        }

        this.events.subscribe('messages:receivedmsg', (msg,time) => {          
          this.myMessage();
        });

    }
     

    private myMessage(){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.customerService.unreadMessage(this.customerInfo._id).subscribe(messages=> {
            this.unreadMessages = messages.message;
            this.loading.dismiss();

            if (this.unreadMessages.length > 0) {
                for (var i = 0; i < this.unreadMessages.length; i++) {
                    var unread = 0;
                    for (var j = 0; j < this.unreadMessages[i]['messages'].length; j++) {
                        if (!this.unreadMessages[i]['messages'][j].isread) {
                            unread++;
                        }
                        this.unreadMessages[i]['unreadMessage'] = unread;
                    }
                }
            }
            
        });
    }

    private background(unreadMessage){
        if (unreadMessage > 0) {
            return {'background' : '#d6ecff', 'font-weight' : '600'};
        }else{
            return {'background' : 'white'};
        }
    }

    private doRefresh(refresher) {
        this.myMessage();
        refresher.complete();
    }

    private senderPic(pic){
        var imagePath : any;
        if (typeof pic == "undefined") {
            imagePath = "assets/images/face3.png";
        }else{
            imagePath =  this.url + pic;
        }

        return imagePath;
    }

    private selectChat(message){

        console.log("message");
        console.log(message);
         
         this.customerService.getOneCustomer(message.id._id).subscribe((data) => {
             
         console.log("customer k");
         console.log(data);

         localStorage.setItem("currentChat", JSON.stringify(data.message));

         });

        this.events.publish('messages:badgecounter', Date.now());

        var obj = {fromCustId: message.id, toCustId: this.customerInfo._id};

        this.customerService.getmessage(obj).subscribe((data) => {
            console.log("Update");
        });

        this.navCtrl.push(MessageDetailPage, {
            message : message
        });

        
    }
}
