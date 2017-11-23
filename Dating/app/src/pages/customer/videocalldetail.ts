import { Component, Input,OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService } from '../../app/service/index';

declare var OT: any;
declare var otCore: any;
declare var options: any;
declare var TB: any;
declare var OT_LayoutContainer: any;


@Component({
	selector: 'page-videocalldetail',
	templateUrl: 'videocalldetail.html'
})
export class VideoCallOutgoingPage  implements OnInit{

    customer: any;
    currentcall : any;
    url= globalVariable;
    callsessionid : any;
    publishedUser:any ={};
    apiKey = '45956382';
    publisher:any;
    session:any;
    sessionOBJ:any;
    token:any;

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
            let sessionId = this.customer.tokboxsessionid;
            let tokenId = this.customer.tokboxtoken;
            let socketId = this.customer.socketId;
            this.initializeSession(sessionId,tokenId);
        console.log(JSON.stringify(this.customer))
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

    private initializeSession(sessionId,token) {
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, (error) => {
            if (!error) {
                var publisherProperties = {insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Publishing a stream.');                        
                    }
                });
            } else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: (event) => {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    /*this.deductPackageCalls();
                    this.opencall();
                    this.opencallImage();  */                 
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
                /*session.signal(
                {
                    data:"hello"
                },
                (error) => {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");                  
                    }
                }
                );*/
            },
            connectionDestroyed: (event) => {
                connectionCount--;
                this.disconnectcall(); 
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            },
            streamCreated:function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = {width: '100%', height: '100%',insertMode: "append"};
                var subscriber = session.subscribe(event.stream,
                'subscriberContainer',
                subscriberProperties,
                function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                        //console.log(event)
                        console.log('Subscriber added.');
                    }
                });
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        + 'or because the other party lost their connection.';
                        event.preventDefault();   // Prevent the Subscriber from being removed
                    }
                }
            },
            signal:function(event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                let cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                let nameAndMsg = event.data.split("@@");
                let name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }else{
                    name = nameAndMsg[0];
                }
                let msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name+' : ' +msgggg ;
                    msgHis.appendChild(msg);
                }
                var list =  document.querySelector(`div#msgHistory`);
                list.scrollTop = list.scrollHeight;
            }
        });
    }

    private disconnectcall(){
        if(this.sessionOBJ){
            this.sessionOBJ.disconnect(); 
            // this.disconnectOther(); 
            //this.router.navigate(['customer/allprofile']);    
        }        
    }
}
