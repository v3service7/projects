import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {CustomerService, FriendService, CountryService, SocketService, BannerService} from '../../../service/index';
import * as globalVariable from "../../../global";
declare var $ : any;
declare var toastr : any;
toastr.options.timeOut = 3000;
declare var OT: any;
declare var otCore: any;
declare var options: any;
declare var TB: any;
declare var OT_LayoutContainer: any;


@Component({
  selector: 'app-speed-dating',
  templateUrl: './speed-dating.component.html',
  styleUrls: ['./speed-dating.component.css']
})
export class SpeedDatingComponent implements OnInit {

    public newCandidate: any = "";
    public cid : any = "";
    public processing : any = false;
    public donestack : any = [];
    public sessionOBJ : any;
    public apiKey = '46002262';
    public screenwidth = 'mini';
    public url = globalVariable.url+'uploads/'; 

    /* banner image  variable */
    public timeslotImage:any = [];
    public banner: any = [];
    public bannerImage : any = [];
    public donebannerImage : any = [];
    public itemplayedImage :  any = 0;
    public bannerImg :  any;

   /* banner video variable */
   public timeslot : any = [];
   public donebanner : any = [];
   public itemplayed : any = 0;
   public bannervideo : any;
   public banneropen: any = false;


    constructor(public customerService: CustomerService, public bannerService : BannerService, public socketService : SocketService, public router: Router, public route: ActivatedRoute) {
         this.loadAllTime();
         this.loadAllTimeImage();
    }

    ngOnInit(){  
        if(localStorage.getItem('currentCustomer')){
            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
            if(typeof this.cid != 'undefined'){
            this.donestack.push(this.cid);
            }            
            var objinit = {speedstatus : true};
            this.updateCustomer(objinit);
            //this.loadAllTime();
           
        }       
        this.initSpeeddateresponse(); 
        
       }



    ngOnDestroy(){
        this.changetokbox();
        
        console.log("leave component & sessionOBJ");
        console.log(this.sessionOBJ);
        
        var objdestroy = {speedstatus : false, isbusyspeed : false};

       // this.isbusySpeed(false);
        this.updateCustomer(objdestroy); 
       
        if(typeof this.sessionOBJ != "undefined"){
            this.sessionOBJ.disconnect();
            console.log("leave component & sessionOBJ inside");
        }        
    }



        public loadAllTime() {
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

    
     public fullscreen(){
      if(this.screenwidth == 'mini'){
         this.screenwidth = 'max';
      }else{
          this.screenwidth = 'mini';
      }
     }

    public loadAllTimeImage() {
         this.bannerService.getAllTimeImage().subscribe(users => {  
             if(users.message[0].bannertiming.length > 0){
                 this.timeslotImage = users.message[0].bannertiming;
                 this.loadbanners('image');         
             }else{
                 this.timeslotImage = [];
             }
            });
           }


    public loadbanners(type){        
         var obj = {type : type};
         this.bannerService.getAllTypeBanner(obj).subscribe((banner) => {             
             if(type == 'video' ){                 
                 this.banner = banner.message;  
             }else{

                 console.log("banner.message");
                 console.log(banner.message);

                 this.bannerImage = banner.message; 
             }
           });
        }
    
    public  opencallImage(){
         console.log("bopencallqqqqq");  
         if(this.donebannerImage.length < this.timeslotImage.length){ 
             var random = this.randnoImage();
             this.setitemImage(random);
         }  
    }

     public setitemImage(temp){
         var random = temp;    
         var find1 = this.donebannerImage.indexOf(random);
         if((find1 != -1) && (this.donebannerImage.length != this.timeslotImage.length)){ 
             random = this.opencallImage();
         }else{
             this.donebannerImage.push(random); 
             this.repeatsetImage(random);
         } 
    } 


    public repeatsetImage(random){ 
         console.log("repeat set new");  
         console.log(this.timeslotImage.length, this.itemplayedImage);

         this.itemplayedImage = this.itemplayedImage+1;
         var timesetout = (this.timeslotImage[this.itemplayedImage-1].time * 1000);
         setTimeout(()=>{      
             this.openImage(random);      
             // this.viImage();
             console.log(100);
         },timesetout);
    } 

    public randnoImage(){
         var random = Math.floor(Math.random() * this.bannerImage.length);
         console.log("randno"+ random);
         return random;
    }

    public openImage(random){ 
         this.bannerImg = '';                
         document.getElementById('mybannerimage').style.display='block';
         this.bannerImg =  this.bannerImage[random];
    }
    
    public closeImage(){
         // Get the modal
         document.getElementById('mybannerimage').style.display='none';          
    }
   
    public closeviImage(){
         setTimeout(()=>{ 
             var vid = document.getElementById("mybannerimage");                                  
             this.bannerImg = ''; 
             this.closeImage();
             if(this.donebannerImage.length < this.timeslotImage.length){
                 this.opencallImage();     
             }                                                
         },500);
    }
    
    public repeatset(random){ 
         console.log("repeatsetqqqqqqq");   
         this.itemplayed = this.itemplayed+1;
         var timesetout1 = (this.timeslot[this.itemplayed-1].time * 1000);
         setTimeout(()=>{      
             this.open(random);      
             this.vi();
         },timesetout1);
    } 
    
    public open(random){ 
         this.bannervideo = '';                
         document.getElementById('myModalbanner').style.display='block';
         this.banneropen = true;   
         this.bannervideo =  this.banner[random];
    }

      public vi(){
         setTimeout(()=>{ 
             var vid = document.getElementById("myVideo");
             vid.onended = () => {                 
                 this.bannervideo = ''; 
                 this.close();
                 console.log(this.donebanner.length, this.timeslot.length);
                 if(this.donebanner.length < this.timeslot.length)
                 {                  
                     this.opencall();    
                 }
             }               
         },500);
    }
    
     public close(){
         // Get the modal
         document.getElementById('myModalbanner').style.display='none';
         this.banneropen = false;         
    }


     public  opencall(){
         console.log("qopencallqqqqq index"); 
         var random = this.randno();
         console.log(this.donebanner.indexOf(random));
         /*if(this.donebanner.indexIf(random) != -1){}*/
         if(this.donebanner.length < this.timeslot.length){
             //alert();
             this.setitem(random);    
         }
    }
     
    public setitem(temp){
         var random = temp;    
         var find1 = this.donebanner.indexOf(random);
         if((find1 != -1) && (this.donebanner.length != this.timeslot.length)){ 
             random = this.opencall();
         }else{
             this.donebanner.push(random); 
             this.repeatset(random);
         } 
    }

    public randno(){
         var random = Math.floor(Math.random() * this.banner.length);
         console.log("randno"+ random);
         return random;
    }

    public initSpeeddateresponse(){
        this.socketService.speeddatingResponse().subscribe((data) => {
             if(typeof this.sessionOBJ != "undefined"){                
                console.log("after");
                this.sessionOBJ.disconnect();
                }

            if(this.donestack.indexOf(data["fromid"]) == -1){
                 this.donestack.push(data["fromid"]); 
                 }    
            this.initializeSession(data["sessionid"], data["tokenid"]);
        });

    }

    public updateCustomer(newdata){
        
        var data = {_id : this.cid};
        
        if(typeof newdata.speedstatus !== 'undefined')
        {
          data["speedstatus"] = newdata.speedstatus;
        }

        if(typeof newdata.isbusyspeed !== 'undefined')
        {
          data["isbusyspeed"] = newdata.isbusyspeed;
        }

        this.customerService.updateCustomer(data).subscribe((item) => {
            if(newdata.speedstatus == true){
                this.speedCustomerAvail();
            }
        });
    }

    public next(){
        if(typeof this.sessionOBJ != "undefined")
        {
        this.sessionOBJ.disconnect();    
        }        
        this.speedCustomerAvail();
    }

    public disconnectall(){
        var objdisconnect = {speedstatus : false, isbusyspeed : false};
        this.updateCustomer(objdisconnect);
        this.sessionOBJ.disconnect();  
        this.router.navigate(['customer/profile']);
    }



    public speedCustomerAvail(){
        this.openModal();
        var obj = {ids : this.donestack};        
       console.log("obj donestack",obj );
        this.customerService.allSpeedCustomerAvail(obj).subscribe((data) => {
             console.log("new user",data);
             this.newCandidate = data.data;            

            if((data.data != "") && (this.newCandidate._id != 'undefined')){ 
                 this.newCandidate.fromid = this.cid;               
                 this.socketService.speeddatingvideo(this.newCandidate);
                 this.initializeSession(this.newCandidate.tokboxsessionid , this.newCandidate.tokboxtoken);
                 if(this.donestack.indexOf(this.newCandidate._id) == -1){
                    this.donestack.push(this.newCandidate._id);    
                 }
            }else{
                
                setTimeout(() => {
                this.customerService.getOne(this.cid).subscribe((data)=>{
                
                    console.log("TimeOut");
                    console.log(data);

                     if(data.message.isbusyspeed == false){
                            toastr.remove();
                     toastr.success("No On Avail In Speed Dating"); 
                        this.router.navigate(['customer/profile']);
                        } 
                                                         
                });                 
               }, 30000);           
            }
        });
    }

/*
    public isbusySpeed(type){
        var objp = {_id : this.cid , isbusyspeed : type};  
        this.customerService.updateCustomer(objp).subscribe((item) => {       
        console.log("done busy status change");
        });
    }
     */
     public changetokbox(){         
         this.customerService.changeTokboxToken(this.cid).subscribe((item) => {       
        console.log("done token chnage");
        
        });
     }

    public initializeSession(sessionId,token) {

        var objdisconnect = {isbusyspeed : true};
        this.updateCustomer(objdisconnect);
     
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;

        session.connect(token, (error) => {
            if (!error) {
                var publisherProperties = {width:'341px',insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(this.sessionOBJ);
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
                this.opencall();    
                this.opencallImage();
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
            },
            streamCreated: (event) => {
                this.closeModal();
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
             connectionDestroyed: (event) => {
                connectionCount--;
              //  this.disconnectcall();
              console.log("last disconnect other");
                this.sessionOBJ.disconnect();     
                this.changetokbox();            
                this.openModal();        
                var objdisconnect = {isbusyspeed : false};        
                this.updateCustomer(objdisconnect);
                this.speedCustomerAvail(); 
                this.bannervideo = ''; 
                this.close();
               
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
            signal: function(event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                let cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                let nameAndMsg = event.data.split("@@");
                let name = '';
                if (nameAndMsg[0] == cusObj.username) {
                    name = 'Me';
                }else{
                    name = nameAndMsg[0];
                }
                let msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('li');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'message appeared right chat-textad tips-msg' : 'message appeared left chat-textad tips-msg';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerHTML = "<div class='text_wrapper' style='max-width: 287px;'><div class='text' style='text-align: left;'>"+ name+' : ' +msgggg + "</div></div>" ;
                    msgHis.appendChild(msg);
                }
                var list =  document.querySelector(`div#emsgHistory_msgvideo`);
                list.scrollTop = list.scrollHeight;
            }
        });
    }

    public handleError(error) {
        if (error) {
            alert(error.message);
        }
       }
    
     public sendMessageOnCall(data){
         let nme = JSON.parse(localStorage.getItem('currentCustomer')).username;
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

 
 public openModal() {
        document.getElementById('process').style.display = "block";
        var rids1 = document.getElementsByClassName("relativeclass11");
         for (var i = 0; i < rids1.length; i++){
          (<HTMLInputElement>rids1[i]).className += " " + 'minimizes';
          }
          document.getElementById('msgHistory').innerHTML = "";        
            
        }

    public closeModal() {
          document.getElementById('process').style.display = "none";
        var rids1 = document.getElementsByClassName("relativeclass11");
         for (var i = 0; i < rids1.length; i++){
          (<HTMLInputElement>rids1[i]).classList.remove("minimizes");
          }
         
        }


}
