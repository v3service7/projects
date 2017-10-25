import { Component,OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams,  Nav} from 'ionic-angular';
import * as globalVariable from "../../app/global";
import { CustomersService, FriendService, SocketService, BannerService} from '../../app/service/index';

declare var OT: any;
declare var otCore: any;
declare var options: any;
declare var TB: any;
declare var OT_LayoutContainer: any;


@IonicPage()
@Component({
  selector: 'page-videocall',
  templateUrl: 'videocall.html',
})

export class VideocallPage  implements OnInit, OnDestroy  {

 constructor(public navCtrl: NavController, public navParams: NavParams, public nav : Nav, public  customerService: CustomersService, public bannerService : BannerService , public socketService : SocketService) { this.disconnectcall();}

	ionViewDidLoad(){
	console.log('ionViewDidLoad VideocallPage');
	}

    msg : any;
    cid : any;
    profile: any = {};
    url = globalVariable.url+'uploads/';    
    profiles = [];
    callsessionid : any;
    publishedUser:any ={};
    apiKey = '45956382';
    publisher:any;
    session:any;
    sessionOBJ:any;
    token:any;
    form:any;
    tokenid : any;
    banner : any = [];
    bannerImage : any = [];
    bannerImg : any ;
    bannervideo : any;
    timeslot : any = [];
    timeslotImage : any = [];
    itemplayed : any = 0;
    itemplayedImage : any = 0;
    donebanner : any = [];
    donebannerImage : any = [];
    connectedTo : any;
    currentcall: any;
    
    ngOnInit() { 

            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
            console.log(this.cid);   

            this.currentcall = this.navParams.get('response');
            this.callsessionid = this.currentcall.share.sessionid ;
            this.tokenid = this.currentcall.share.tokenid ;            
            this.connectedTo = this.currentcall.share.connectedTo ;         
   
        this.loadAllTime();
        this.loadAllTimeImage();
        this.getCustomer(); 
        this.donebanner = [];
    }

    ngOnDestroy(){
        this.disconnectcall();
        this.setNewTokboxToken();
    }

    /*private whenothervideodisconnect(){
         this.socketService.disconnectToOtherResponse().subscribe(response => {
             this.disconnectcall();
             console.log("dicconed to other");
         });   
    }*/
   
   private setNewTokboxToken(){
   this.customerService.changeTokboxToken(this.cid).subscribe((item) => {
       console.log(item);
   })
   }


    private loadAllTime() {
         this.bannerService.getAllTime().subscribe(users => { 
             console.log("users.message[0]");        
             console.log(users.message[0]); 
             if(users.message[0].bannertiming.length > 0){
                 this.timeslot = users.message[0].bannertiming;
                 this.loadbanners('video');         
             }else{
                 this.timeslot = [];
             }
         });
    }

    private loadAllTimeImage() {
         this.bannerService.getAllTimeImage().subscribe(users => { 
             console.log("users.message[0] Image");        
             console.log(users.message[0]); 
             if(users.message[0].bannertiming.length > 0){
                 this.timeslotImage = users.message[0].bannertiming;
                 this.loadbanners('image');         
             }else{
                 this.timeslotImage = [];
             }
         });
    }

    private loadbanners(type){        
         var obj = {type : type};
         this.bannerService.getAllTypeBanner(obj).subscribe((banner) => {
             console.log("banner" + type);
             console.log(banner);
             if(type == 'video' ){
                 this.banner = banner.message;  
             }else{
                 this.bannerImage = banner.message; 
             }                   
         });
    }

    private open(random){ 
         this.bannervideo = '';                
         document.getElementById('myModalbanner').style.display='block';
         this.bannervideo =  this.banner[random];
    }

    private openImage(random){ 
         this.bannerImg = '';                
         document.getElementById('mybannerimage').style.display='block';
         this.bannerImg =  this.bannerImage[random];
    }

    private  opencall(){
         console.log("qopencallqqqqq index"); 
         var random = this.randno();
         console.log(this.donebanner.indexOf(random));
         /*if(this.donebanner.indexIf(random) != -1){}*/
         if(this.donebanner.length < this.timeslot.length){
             //alert();
             this.setitem(random);    
         }
    }

    private  opencallImage(){
         console.log("bopencallqqqqq");  
         if(this.donebannerImage.length < this.timeslotImage.length){ 
             var random = this.randnoImage();
             this.setitemImage(random);
         }  
    } 

    private setitem(temp){    
         var random = temp;    
         var find1 = this.donebanner.indexOf(random);
         if((find1 != -1) && (this.donebanner.length != this.timeslot.length)){ 
             random = this.opencall();
         }else{
             this.donebanner.push(random); 
             this.repeatset(random);
         } 
       }

    private setitemImage(temp){
         var random = temp;    
         var find1 = this.donebannerImage.indexOf(random);
         if((find1 != -1) && (this.donebannerImage.length != this.timeslotImage.length)){ 
             random = this.opencallImage();
         }else{
             this.donebannerImage.push(random); 
             this.repeatsetImage(random);
         } 
        }  

    private repeatset(random){ 
         console.log("repeatsetqqqqqqq");   
         this.itemplayed = this.itemplayed+1;
         var timesetout1 = (this.timeslot[this.itemplayed-1].time * 1000);
         setTimeout(()=>{      
             this.open(random);      
             this.vi();
         },timesetout1);
        } 

    private repeatsetImage(random){ 
         console.log("repeatsetqqqqqqq");   
         this.itemplayedImage = this.itemplayedImage+1;
         var timesetout = (this.timeslotImage[this.itemplayedImage-1].time * 1000);
         setTimeout(()=>{      
             this.openImage(random);      
             // this.viImage();
             console.log(100);
         },timesetout);
        } 

    private randno(){
         var random = Math.floor(Math.random() * this.banner.length);
         console.log("randno"+ random);
         return random;
         }

    private randnoImage(){
         var random = Math.floor(Math.random() * this.bannerImage.length);
         console.log("randno"+ random);
         return random;
         }

    private sendMessageOnCall(data){
         let nme = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
         console.log('name',nme)
         this.sessionOBJ.signal({
             type: 'msg',
             data:  nme+'@@'+data
         }, function(error) {
             if (error) {
                 console.log('Error sending signal:', error.name, error.message);
             } else {
                 data = '';
             }
         });
         // this.msgList();
         (<HTMLInputElement>document.getElementById('btn-input')).value = "";
    }

    private close(){
         // Get the modal
         document.getElementById('myModalbanner').style.display='none';          
    }

    private closeImage(){
         // Get the modal
         document.getElementById('mybannerimage').style.display='none';          
    }

    private vi(){
         setTimeout(()=>{ 
             var vid = document.getElementById("myVideo");
             vid.onended = () => {                 
                 this.bannervideo = ''; 
                 this.close();
                 console.log(this.donebanner.length, this.timeslot.length);
                 if(this.donebanner.length < this.timeslot.length)
                 {
                     //alert();
                     this.opencall();    
                 }
             }               
         },500);
    }

    private closeviImage(){
         setTimeout(()=>{ 
             var vid = document.getElementById("mybannerimage");                                  
             this.bannerImg = ''; 
             this.closeImage();
             if(this.donebannerImage.length < this.timeslotImage.length){
                 this.opencallImage();     
             }                                                
         },500);
    }

    /* private msgList(){
        this.sessionOBJ.on('signal:msg', function(event) {
            var msgHis = document.getElementById('msgHistory');
            var msg = document.createElement('p');
            msg.innerText = event.data;
            msgHis.appendChild(msg);
            msg.scrollIntoView();
        });
    }*/

    private getCustomer() {
        this.customerService.getOneCustomer(this.cid).subscribe(customers => { 
            this.profile = customers.message; 
            this.token = customers.message.tokboxtoken;
            console.log(customers.message.tokboxsessionid);
            this.initializeSession(this.callsessionid, this.tokenid);
        });
    }
    
    private deductPackageCalls(){
        
           /* if(this.currentcall.share.connected == 'yes'){
                this.customerService.getOneCustomer(this.cid).subscribe(customers => { 
                    console.log("customers caals");
                    if(customers.message.mypackage){
                        var calls = customers.message.mypackage.remaincalls - 1;
                        customers.message.mypackage.remaincalls = calls;
                        var newob = {_id : this.cid, mypackage : customers.message.mypackage}
                        this.customerService.updateCustomer(newob).subscribe((data) => {
                            console.log("data 22");
                        })
                    }
                }); 
            }     */        
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
                    this.deductPackageCalls();
                    this.opencall();
                    this.opencallImage();                   
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

    private handleError(error) {
        if (error) {
            alert(error.message);
        }
    }

    private disconnectcall(){
        if(this.sessionOBJ){
            this.sessionOBJ.disconnect(); 
            if(localStorage.getItem("searchedlist")){
                 var url1 = JSON.parse(localStorage.getItem("searchedlist"));
                 localStorage.removeItem("searchedlist");
                 console.log("urlo", url1 ,window.location.origin);
                 var ori = window.location.origin;
                 var urlretrun = url1.replace(ori, "");
                 console.log("urlretrun");
                 console.log(urlretrun);
                 setTimeout(()=> {
                console.log("coll disonet");
                 //this.router.navigate([urlretrun]);     
                 }, 500);
                 
            }else{
                console.log("coll disonet");
                //this.router.navigate(['customer/profile']); 
               
                }        
            }
    }

}
    


