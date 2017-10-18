import { Component, Input } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CustomersService,FriendService,SocketService } from '../../app/service/index';

import * as globalVariable from "../../app/global";

@Component({
    selector: 'page-messagedetail',
    templateUrl: 'messagedetail.html'
})
export class MessageDetailPage {
	
    loading:any;
    customerInfo:any;
	message:any;
    url= globalVariable;
    currentMsg : any;


    constructor(
        public friendService:FriendService,
        public navCtrl: NavController,
        public customerService: CustomersService,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public socketService : SocketService,
        public events: Events
    ) {
        this.message = navParams.get('message');
        
        setTimeout(()=>{
            var x = document.getElementById('focusRow');
            x.focus();
            console.log("x");
            console.log(x);
        },1000)

    }

    ionViewDidEnter() {
        if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
        }

        this.events.subscribe('messages:receivedmsg', (msg,time) => {  
            var toCustomer = JSON.parse(localStorage.getItem('currentChat'));
            if(msg.fromCustId == toCustomer._id){
                this.message.messages.push(msg);
            }
        });
    }

    private doRefresh(refresher) {
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


    private senderORreceiver(msg){
        if (this.customerInfo) {
            if (msg.fromCustId._id == this.customerInfo._id) {
                return {'background' : '#c7eafc', 'left':'25%', 'color':'#45829b'};
            }else{
                return {'background' : '#ffe6cb', 'left':'0', 'color':'#c48843'};
            }
        }
    }

    private sendMessage(){
        if(localStorage.getItem('currentCustomer') && localStorage.getItem('currentChat')){
            var current_user = JSON.parse(localStorage.getItem('currentCustomer'));         
            this.customerService.getOneCustomer(current_user._id).subscribe((cst) => {
                var fromCustomer = cst.message;
                var toCustomer = JSON.parse(localStorage.getItem('currentChat'));

                const data = {
                    fromCustId : fromCustomer._id,
                    fromSocketId : fromCustomer.socketId,
                    message : this.currentMsg.trim(),
                    toCustId : toCustomer._id,
                    toSocketId : toCustomer.socketId
                };

                const dataCopy = {
                    fromCustId : fromCustomer,
                    fromSocketId : fromCustomer.socketId,
                    message : this.currentMsg.trim(),
                    toCustId : toCustomer,
                    toSocketId : toCustomer.socketId
                };

                this.socketService.sendMessage(data);

                this.message.messages.push(dataCopy);
                setTimeout(()=>{
                    this.currentMsg = "";
                    var x = document.getElementById('focusRow');
                    x.focus();
                },500);

            });
        }
    }




}
