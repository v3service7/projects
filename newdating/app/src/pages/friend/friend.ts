import { Component, Input } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

import { CustomersService,FriendService } from '../../app/service/index';

@Component({
    selector: 'page-friend',
    templateUrl: 'friend.html'
})
export class FriendPage {
    customerList:any=[];
    loading:any;
    customerInfo:any;
    activeTab1 = 'activeTab1';
    activeTab2 = 'activeTab2';
    activeTab3 = 'activeTab3';

    constructor(public friendService:FriendService, public navCtrl: NavController,public customerService: CustomersService, public loadingCtrl: LoadingController) {

    }
    ionViewDidEnter() {
        if(localStorage.getItem("currentCustomer")){
            this.customerInfo = JSON.parse(localStorage.getItem("currentCustomer"));
            this.myFriends();
        }
    }
    someEvent(){
        console.log("someEvent");
    }

    private myFriends(){
        if (this.activeTab1 != 'activeTab1') {
            this.activeTab1 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }

        this.friendService.myfriends({id:this.customerInfo._id}).subscribe((data)=>{

            console.log("myFriends");
            console.log(data);
            this.customerList = [];   
            this.customerList = data.message;
        });
    }


    private myPendingRequests(){
        if (this.activeTab2 != 'activeTab1') {
            this.activeTab2 = 'activeTab1';
            this.activeTab1 = 'activeTab2';
            this.activeTab3 = 'activeTab3';
        }
        this.friendService.mypendingrequest({id:this.customerInfo._id}).subscribe((data)=>{

            console.log("pendingreq");
            console.log(data);
            this.customerList = [];  
            this.customerList = data.message; 
        });
    }


    private myBlocked(){
        if (this.activeTab3 != 'activeTab1') {
            this.activeTab3 = 'activeTab1';
            this.activeTab2 = 'activeTab2';
            this.activeTab1 = 'activeTab3';
        }
        this.friendService.myblocked({id:this.customerInfo._id}).subscribe((data)=>{

            console.log("myBlocked");
            console.log(data);
            this.customerList = [];
            this.customerList = data.message;
        });
    }

    private doRefresh(refresher) {
        this.myFriends();
        refresher.complete();
    }

}
