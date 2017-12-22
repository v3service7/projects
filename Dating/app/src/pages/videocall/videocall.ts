import { Component, OnInit, OnDestroy  } from '@angular/core';
import { IonicPage, NavController, NavParams,  Nav} from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import * as globalVariable from "../../app/global";
import { CustomersService, SocketService, BannerService} from '../../app/service/index';
declare var OT: any;
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'page-videocall',
  templateUrl: 'videocall.html',
  styles: ['./videocall.scss']
})
export class VideocallPage {

    session: any;
    publisher: any;
    sessionId: string;
    token: string;
    cameraSource = 0;
    devices: any[];
    apiKey:any = "46018952";
    currentcall: any;
    connectedTo: any;
    cid: any;
    profile: any;
    url = globalVariable.url+'uploads/';   
    // banner variables

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
    textMsg: any;

    constructor(public navCtrl: NavController,
              private diagnostic: Diagnostic,
              public navParams: NavParams,
              public nav : Nav,
              public  customerService: CustomersService, 
              public bannerService : BannerService , 
              public socketService : SocketService) {
             
              this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
              
              //console.log(this.cid);  
              // Replace these values with those generated in your TokBox Account
              /*this.apiKey = "46010992";
                this.sessionId = "2_MX40NjAxMDk5Mn5-MTUxMjM4MjYxMTQxNn5JdVE5UmJYRnBlaFlQNEVzQU5hMVBQN3B-UH4";
                this.token = "T1==cGFydG5lcl9pZD00NjAxMDk5MiZzaWc9M2E2MWRjNTFiMmQ0ZTUwMWVkMjE3MTE2ODk4ZmU1MmYzZGUwYzMxNjpzZXNzaW9uX2lkPTJfTVg0ME5qQXhNRGs1TW41LU1UVXhNak00TWpZeE1UUXhObjVKZFZFNVVtSllSbkJsYUZsUU5FVnpRVTVoTVZCUU4zQi1VSDQmY3JlYXRlX3RpbWU9MTUxMjM4MjYxMSZub25jZT0wLjgwODcxNzg0MjgzMDM5OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTEyNDY5MDExJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";*/

              this.currentcall = this.navParams.get('response');
              this.sessionId = this.currentcall.share.sessionid ;
              this.token = this.currentcall.share.tokenid ;            
              this.connectedTo = this.currentcall.share.connectedTo ; 

              this.loadAllTime();
              this.loadAllTimeImage();
              this.getCustomer();
    }

    ionViewDidLoad(){
      let requestCameraCallback = (isAvailable) => { if(!isAvailable){this.diagnostic.requestCameraAuthorization();} };
      let requestMicrophoneaCallback = (isAvailable) => { if(!isAvailable){this.diagnostic.requestMicrophoneAuthorization();} };
      let errorCallback = (e) => console.error(e);

      // Checks camera permissions
      this.diagnostic.isCameraAvailable().then(requestCameraCallback, errorCallback);
      // Checks microphone permissions
      this.diagnostic.isMicrophoneAuthorized().then(requestMicrophoneaCallback,errorCallback);

      
    }


  ionViewWillLeave(){
      console.log("ionViewWillLeave"); 
    }

  ionViewWillUnload(){
      console.log("ionViewWillUnload"); 
       var obj = {_id: this.cid, isbusyvideo: false};
      this.updateCustomerForVideo(obj);
      this.endCall();
  }

     updateCustomerForVideo(obj){
        this.customerService.updateCustomer(obj).subscribe(data => {
         console.log(data);
        });
    } 


    ngOnDestroy(){
    this.endCall();
    this.setNewTokboxToken();
    }

    private setNewTokboxToken(){
    this.customerService.changeTokboxToken(this.cid).subscribe((item) => {

    })
    }

   private getCustomer() {
        this.customerService.getOneCustomer(this.cid).subscribe(customers => {            
           // this.profile = customers.message; 
          //  this.token = customers.message.tokboxtoken;
          //console.log(customers.message.tokboxsessionid);
            this.initializeSession();
        });
    }

  // Starts Call
  initializeSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    // Subscribe to a newly created stream
    this.session.on('streamCreated', (event) => {
      this.session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        resolution: '1280x720',
        showControls: false,
        width: '100%',
        height: '100%'
      });
    });

      var connectionCount = 0;
      this.session.on('connectionCreated', (event) => {
      this.session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
              connectionCount++;
              console.log(connectionCount + ' connections.');
              if (event.connection.connectionId != this.session.connection.connectionId) {

                 this.deductPackageCalls();
                  this.opencall();
                  this.opencallImage();   

                  console.log('Another client connected connectionCreated. ' + connectionCount + ' total.');
              }else{
                  console.log('not any client connected. ');
              }
      });

      this.session.on('connectionDestroyed', (event) => {
          connectionCount--;
          this.endCall(); 
          console.log(connectionCount + ' connections.');
      });

      this.session.on('sessionDisconnected', (event) => {
          console.log('Disconnected from the this.session.');
          document.getElementById('disconnectBtn').style.display = 'none';
          if (event.reason == 'networkDisconnected') {
              alert('Your network connection terminated.')
          }
      });

      this.session.on('streamCreated', (event, error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                        //console.log(event)
                        console.log('Subscriber added.');
                    }

      });

      this.session.on('streamDestroyed', (event) => {


      });

      this.session.on('signal', (event) => {
                
                console.log("Signal event sent from connection " + event.from.id);
                console.log(event);

                let cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                let nameAndMsg = event.data.split("@@");
                let name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }else{
                    name = nameAndMsg[0];
                }                
                var classs = event.from.connectionId === this.session.connection.connectionId ? 'mine' : 'theirs';
                var nameAndMessage:any = '<div class="msg-panel '+ classs +'"><div class="username-text">'+ name +' : </div><div class="msg-text">'+ nameAndMsg[1] +'</div></div>';
                var msgHistory = document.getElementById('msgHistory');
                msgHistory.innerHTML += nameAndMessage;
                //msgHistory.appendChild(nameAndMessage);
                //console.log(nameAndMessage);

                var list =  document.querySelector(`div#msgHistory`);
                list.scrollTop = list.scrollHeight;

                (<HTMLInputElement>document.getElementsByClassName("text-input")[0]).value = "";
                (<HTMLInputElement>document.getElementById("input-msg-text")).value = "";
                this.textMsg = "";
                 //data.value = "";

                });   


    // Connect to the session
    this.session.connect(this.token, (error) => {
      if (!error) {
        // Create a publisher
        this.publisher = OT.initPublisher('publisher', {
          insertMode: 'append',
          resolution: '1280x720',
          width: '100%',
          height: '100%'  
          });
          
        this.session.publish(this.publisher, (error) => {
          if(error){
            console.log("Publisher error: " + error);
          }

        });
        } else {
            alert('There was an error connecting to the session' + error.message);
        }
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


  // Ends call
  endCall() {
    if (!!this.session) {
      this.session.disconnect();
      this.nav.setRoot(TabsPage);
    }
  }

// Banner section
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

    private openImage(random){ 
         this.bannerImg = '';                
         document.getElementById('mybannerimage').style.display='block';
         this.bannerImg =  this.bannerImage[random];
    }

    private  opencall(){
         console.log("opencall");
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
         console.log("setItem");   
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
         console.log("repeat set");   
         this.itemplayed = this.itemplayed+1;
         var timesetout1 = (this.timeslot[this.itemplayed-1].time * 1000);
         setTimeout(()=>{      
             this.modelOpen(random);      
             this.vi();
         },timesetout1);
        } 

    private repeatsetImage(random){ 
         console.log("repeat set image");   
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

    private sendMessageOnCall(){
          //alert("msg send");
          var data = this.textMsg;
         let username = JSON.parse(localStorage.getItem('currentCustomer')).username;
         console.log('name',username)
         this.session.signal({
             type: 'msg',
             data:  username+'@@'+data
         }, function(error) {
             if (error) {
                 console.log('Error sending signal:', error.name, error.message);
             } else {
                 data = '';
             }
         });
         // this.msgList();
         /*(<HTMLInputElement>document.getElementById('btn-input')).value = "";
         data.value = "";*/
    }

    private close(){
         // Get the modal
         document.getElementById('myModalbanner').style.display='none';          
    }

    private closeImage(){
         // Get the modal
         document.getElementById('mybannerimage').style.display='none';          
    }

    public modelOpen(random){       
         this.bannervideo = '';                
         var modal = document.getElementById('myModal');
         modal.style.display = "block";
         this.bannervideo =  this.banner[random];
      }

    public  modelClose(){
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
      }

    private vi(){
         setTimeout(()=>{ 
             var vid = document.getElementById("myVideo");
             vid.onended = () => {                 
                 this.bannervideo = ''; 
                 this.modelClose();
                 console.log(this.donebanner.length, this.timeslot.length);
                 if(this.donebanner.length < this.timeslot.length)
                 {
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
   
}