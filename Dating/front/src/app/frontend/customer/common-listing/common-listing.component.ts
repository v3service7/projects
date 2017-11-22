import { Component, OnInit , Input, Output,EventEmitter } from '@angular/core';
import {CustomerService, FriendService, SocketService } from '../../../service/index';
import * as globalVariable from "../../../global";
declare var $ : any;
declare var toastr : any;
toastr.options.timeOut = 3000;

@Component({
  selector: 'app-common-listing',
  templateUrl: './common-listing.component.html',
  styleUrls: ['./common-listing.component.css']
})
export class CommonListingComponent implements OnInit {

  customerInfo: any;
  friends : any = [];
  @Input() customers: any;
  @Output() changeSomething : EventEmitter<string> = new EventEmitter();
  filterBy : any = { gender : [], online : "xyz", age: {min : "", max : ""}, country: [], sexualorient:[] };
  myonline : any = [];
  currentcall : any;
  callingto: any;
  url = globalVariable.url+'uploads/';
  dynamicclass : any = {grid : "", imageh : "", imagehh: "", padding : ""};

  constructor(public customerService: CustomerService, public friendService : FriendService, public socketService : SocketService) {

     if(localStorage.getItem("currentCustomer")){
      this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));      
     }
     this.getAllAllow();

  }

  ngOnInit(){ 
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();       
        this.socketService.onlineList2emit();  
        this.socketService.onlineList3emit();
        this.onlinenew4();   
        this.socketService.onlineList4emit();
        this.offlinenew2();

        console.log('window.location.href.split("/")[0]');

        if(window.location.pathname.split("/")[2] == 'profile'){
          this.dynamicclass.grid = 'col-lg-4 col-md-4 col-sm-6 col-xs-12';
          this.dynamicclass.imageh = 'panel-headingc card-img2';
          this.dynamicclass.imagehh = 'img-s2';
          this.dynamicclass.padding = 'listpadding2';
          
        }else{
          this.dynamicclass.grid = 'col-lg-3 col-md-3 col-sm-6 col-xs-12';
          this.dynamicclass.imageh = 'panel-headingc card-img';
          this.dynamicclass.imagehh = 'img-s';
          this.dynamicclass.padding = 'listpadding';
        }        
  }  

  public onlinenew() {
      this.socketService.onlineList2().subscribe(response => {   
           this.myonline = response.chatList.map(function(a) {return a._id;});           
          console.log("main 1"); 
          console.log(this.myonline);
      }); 
    }
      public onlinenew2(){
      this.socketService.onlineListon2().subscribe(response => {   
        this.myonline = response.chatList.map(function(a) {return a._id;});   
        console.log("main 2");     
      }); 
    }

     public onlinenew3(){
      this.socketService.onlineList3().subscribe(response => {   
       this.myonline = response.chatList.map(function(a) {return a._id;});        
       console.log("main 3"); 
      }); 
     }

  public offlinenew2(){
      this.socketService.offline2().subscribe(response => {
          this.myonline = response.chatList.map(function(a) {return a._id;}); 
      }); 
  }  
public onlinenew4(){
      this.socketService.onlineList4().subscribe(response => {   
       this.myonline = response.chatList.map(function(a) {return a._id;});        
       console.log("main 3o"); 
      }); 
     }



    public getAllAllow(){
    this.friendService.getAllFriendAllow(this.customerInfo._id).subscribe(data => {
    this.friends = data.message;       
    });
    }

    public SomeEvent(){
    this.getAllAllow();
    this.changeSomething.emit('complete');  
    }  

    public checkforinvite(id){   
    const index1 = this.friends.findIndex(item => item.FromId._id == id);
    const index2 = this.friends.findIndex(item => item.ToId._id == id);
    if(index1 != -1 || index2 != -1){
    return false;
    } else {
    return true;
    } 
    }

    public checkImage(src){
      
    if((src != 'undefined') && (src != '') && (typeof src !== 'undefined')){
    return globalVariable.url+'uploads/' + src;
    }else{
    return '../../assets/images/face.png';
    }

    }


      /* Some Action on list Accept  */

      public acceptrequest(id, pid) {
      var friendobj={_id: id, status:1};
      this.requestFromTo(this.customerInfo._id, pid, 'accept');  
      this.friendService.updateFriend(friendobj).subscribe(
      (data) => {
      this.SomeEvent();          
      });      
      }

      public deleteBlock(id){        
      this.friendService.deleteOne(id).subscribe(
      (data) => {
      this.SomeEvent();             
      });  
      }


      public unblockrequest(data, type) {         
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

      public selectNewChat(id){
      this.socketService.selectForChat(id, this.customerInfo._id);
      }

      public requestFromTo(from, to, type){
      var obj = {FromId : from, ToId: to, title: type}; 
      this.SomeEvent();
      }

      public sendRequest(id) {
      var friendobj={FromId: this.customerInfo._id, ToId:id, status:0};
      var notif = {FromId : this.customerInfo._id, ToId: id, title: 'request'}; 
      this.socketService.notify(notif);
      this.friendService.addFriend(friendobj).subscribe(
      (data) => {
      this.SomeEvent();
      });
      }   


      public checkblock(id){
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

      public anyBlockRequest(id) {
      var friendobj={ FromId:this.customerInfo._id, ToId:id, status:4}
      this.friendService.addFriend(friendobj).subscribe(
      (data) => {
      this.SomeEvent();    
      });
      }

/*
      public vediocall(id){
      this.callingtouser(id);
      this.currentcall = {_id :  id, cid : this.customerInfo._id};
      this.socketService.video(this.currentcall);


      //this.opencallingpopup();
      }*/
       

      public vediocall(id){
      this.customerService.getOne(this.customerInfo._id).subscribe(customers => {        
      if(typeof customers.message.mypackage !== 'undefined' && (customers.message.mypackage.remaincalls > 0)){
          this.callingtouser(id);
          this.currentcall = {_id :  id, cid : this.customerInfo._id};
          this.socketService.video(this.currentcall);       
          }else{
           toastr.clear();
           toastr.error("You are not Able to make call? Please Purchase Plan.");
         } 
         });     
        }


      public callingtouser(id){
      this.customerService.getOne(id).subscribe((data) => {
      this.callingto = data.message;
       $('#videocalloutgoing').modal('show');
      });
      }

      public videocallcancel(){
      this.socketService.callcancel(this.currentcall);  
      this.currentcall = {}; 
      //this.closecallingpopup(); 
      $('#videocalloutgoing').modal('hide');   
      } 


}
