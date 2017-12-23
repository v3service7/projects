import { Component, Input,OnInit , Output,EventEmitter } from '@angular/core';
import { NavController, Events, LoadingController, Nav , AlertController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';
import { CustomerDetailPage } from './customerdetail';
import { VideoCallOutgoingPage } from './videocalldetail';
import { MessageDetailPage } from '../messages/messagedetail';



@Component({
    selector: 'page-customer',
    templateUrl: 'customer.html'
})
export class CustomerPage  implements OnInit{

    customerInfo:any;
    url= globalVariable;
    friends : any = [];
    customersL : any = [];
    @Input() customers = [];
    @Output() changeSomething : EventEmitter<string> = new EventEmitter();
    myonline : any = [];
    currentcall : any;
    callingto: any;

    constructor(
        public navCtrl: NavController,
        public customerService: CustomersService,
        private friendService : FriendService,
        private socketService : SocketService,
        public events: Events,
        public nav: Nav,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController
        ) {
        if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));      
            console.log(this.customerInfo);
            this.getAllAllow();
        }
        
    }

    ngOnInit(){
        this.customersL = this.customers;
        console.log("this.customers");
        console.log(this.customers);
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();       
        this.socketService.onlineList2emit();  
        this.socketService.onlineList3emit();
        this.offlinenew2();
        //this.getCustomer(this._id);
    }
    ionViewDidEnter() {
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
            console.log("this.myonline 1"); 
            console.log(this.myonline);
        }); 
    }

    private onlinenew2(){
        this.socketService.onlineListon2().subscribe(response => {   
            this.myonline = response.chatList.map(function(a) {return a._id;});   
            console.log("this.myonline 2");
            console.log(this.myonline);
        }); 
    }

    private onlinenew3(){
        this.socketService.onlineList3().subscribe(response => {   
            this.myonline = response.chatList.map(function(a) {return a._id;});        
            console.log("this.myonline 3"); 
            console.log(this.myonline); 
        }); 
    }

    private offlinenew2(){
        this.socketService.offline2().subscribe(response => {
            this.myonline = response.chatList.map(function(a) {return a._id;});
            console.log("this.myonline 4"); 
            console.log(this.myonline); 
        });
    }

    private getAllAllow(){
        this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(data => {
            this.friends = data.message;
        });
    }

    private SomeEvent(){
        this.getAllAllow();
        this.changeSomething.emit('complete');  
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

    /* Some Action on list Accept  */

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
        /*let loading = this.loadingCtrl.create({
            content : 'Loading your messages...'
        });

        loading.present();*/
        let messageObj = {};
        this.customerService.getOneCustomer(id).subscribe((data) => {
            messageObj['id'] = data.message;

            localStorage.setItem("currentChat", JSON.stringify(data.message));

            this.events.publish('messages:badgecounter', Date.now());

            var obj = {fromCustId: data.message, toCustId: this.customerInfo._id};
               
            this.customerService.getmessage(obj).subscribe((data1) => {
                messageObj['messages'] = data1.message;
                //loading.dismiss();

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











/*private getCustomer(id){
this.customerService.getOneCustomer(id).subscribe(cust=>{
this.customer = cust.message;
});
}*/

private deatilPage(id){
    /*localStorage.setItem('id',id);*/
    this.navCtrl.push(CustomerDetailPage,{
        id : id
    });
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



public videoCallConfirmbox(id){

let prompt = this.alertCtrl.create({
      title: 'Video Call',
      message: "Are you agree to make Video call?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.vediocall(id);
          }
        }
      ]
    });
    prompt.present();
  }

            /* Video call */

            private vediocall(id){
            console.log("vediocall send")
            this.currentcall = {_id :  id, cid : this.customerInfo._id};
            this.socketService.video(this.currentcall);
            this.navCtrl.push(VideoCallOutgoingPage, {
                    callingto :  this.currentcall
            });
            }

          
}
