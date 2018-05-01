import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {UserService} from '../../services/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { ExchangeService} from '../../services/exchange.service';
import { PlanService} from '../../services/plan.service';
import { TradeAlertService } from '../../services/tradealert.service';
import { PurchaseplanService} from '../../services/purchaseplan.service';
import { ExchangeapiService} from '../../services/exchangeapi.service';
import { BinanceService } from '../../services/binance.service';
declare var AmCharts: any;

@Component({
  selector: 'app-frontplan',
  templateUrl: './frontplan.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class FrontPlanComponent implements OnInit {
    plansType: any = [];
    accountplansType: any = [];
    user: any;
    id: any;

    constructor(
        private userService: UserService,
        private planService: PlanService,
        private router: Router,
        private purchaseplanService: PurchaseplanService,
        private flashMessage: FlashMessagesService
    ) {}

    ngOnInit() {
        this.getProfile();
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    getProfile() {
          this.userService.getProfile().subscribe(profile => {
            this.id = profile.user._id;
            this.plangetList();
            this.accountgetList();
        },
        err => {
          console.log(err);
          return false;
        });
    }

      plangetList() {
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                     this.plansType = data.message;
                }
            },
            (err) => {
                console.log('kfgbhj');
            }
        );
    }

    private purchasePlan(data) {
        const obj = {};
        const x = parseInt( data.planType );
        const current = new Date();
        const threeMonthsInTheFuture =  new Date(new Date(current).setMonth(current.getMonth() + x));
          obj['plan'] = data._id;
          obj['expireddate'] = threeMonthsInTheFuture;
          obj['user'] = this.id;
          obj['month'] = x;
              if (confirm('Are you sure to purchase plan?')) {
                this.purchaseplanService.paymentplan(data).subscribe(
                    (data) => {
                        if (!data.error) {
                            window.location.href = data.paymentlink;
                            this.purchaseplanService.puchaseplan(obj).subscribe((data) => {
                            });
                        }
                    },
                    (err) => {
                        console.log('kfgbhj');
                    }
                );
            }
      }

    accountgetList() {
        this.purchaseplanService.accountList(this.id).subscribe(
            (data) => {
              if (!data.error) {
                     this.accountplansType = data.message;
                     this.accountplansType.reverse();
                }
            },
            (err) => {
                console.log('kfgbhj');
            }
        );
    }
}

@Component({
  selector: 'app-frontplan',
  templateUrl: './fronttradehistory.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class FrontTradeHistoryComponent implements OnInit {
    currency = localStorage.getItem('currency');
    market = localStorage.getItem('market');
    constructor(
        private binanceService: BinanceService,
    ) { }

    ngOnInit() {
        this.trades();
    }

    /**
     * chartInit
     */
    public chartInit(chartData) {
        const chart = AmCharts.makeChart('chartdiv', {
            'theme': 'dark',
            'type': 'serial',
            'dataProvider': chartData,
            'valueAxes': [{
                'inside': true,
                'axisAlpha': 0
            }],
            'graphs': [{
                'id': 'g1',
                'balloonText':
                    '<div style="margin:5px; font-size:19px;"><span style="font-size:13px;">[[category]]</span><br>[[value]]</div>',
                'bullet': 'round',
                'bulletBorderAlpha': 1,
                'bulletBorderColor': '#FFFFFF',
                'hideBulletsCount': 50,
                'lineThickness': 2,
                'lineColor': 'green',
                'negativeLineColor': 'red',
                'valueField': 'visits'
            }],
            'chartScrollbar': {},
            'chartCursor': {},
            'categoryField': 'date',
            'categoryAxis': {
                'parseDates': true,
                'axisAlpha': 0,
                'minHorizontalGap': 55
            }
        });
    }

    public generatechartData(arr) {
        const chartData = [];
        /* const firstDate = new Date();
        firstDate.setDate( firstDate.getDate() - 150 );
        let visits = -40;
        let b = 0.6;
        for ( let i = 0; i < 150; i++ ) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            const newDate = new Date( firstDate );
            newDate.setDate( newDate.getDate() + i );
            if (i > 80) {
                b = 0.4;
            }
            visits += Math.round((Math.random() < b ? 1 : -1) * Math.random() * 10);
            chartData.push( {
                date: newDate,
                visits: visits
            });
        } */
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const tradeDate = new Date(element.time);
            console.log(element.time);
            console.log(tradeDate);
            chartData.push({
                date: tradeDate,
                visits: element.price
            });
        }
        console.log(chartData);
        return chartData;
    }
    /**
     * trades
     */
    public trades() {
        if (this.market === 'Huobi') {}
        if (this.market === 'Gdax') {}
        if (this.market === 'Poloniex') {}
        if (this.market === 'Binance') {
            this.binanceService.getTradeHistory(this.currency).subscribe((data) => {
                if (data.trades.length > 0) {
                    const chartData = this.generatechartData(data.trades);
                    this.chartInit(chartData);
                }
            });
        }
        if (this.market === 'Bittrex') {}
    }
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
    exchangeNames: any = [];
    exchangeTypes = ['Exchange', 'Margin Trading', 'Deposit'];
    plans: any = [];
    plansType: any = [];
    accountplansType: any = [];
    user: any;
    firstname: String;
    lastname: String;
    email: String;
    username: String;
    phonenumber: String;
    password: any = '';
    newpassword: any = '';
    exchangeName: String;
    nickName: String;
    exchangeType: String;
    apiKey: String;
    secretKey: String;
    id:any;
    otp: String;
    openType: String;
    authFactor: any = {};
      temp:any={};
      sid:string;
      newex : any = false;
      authfactor : any = false;
      authOpen : any = false;
      isActive : any = 'profile';
      isChildActive : any = 'alertRequest';
    alertRequestList: any = [];
    alertHistoryList: any = [];

      constructor(
          private validateService: ValidateService,
        private flashMessage:FlashMessagesService,
        private exchangeService: ExchangeService,
        private exchangeapiService: ExchangeapiService,
        private userService:UserService,
        private planService: PlanService,
        private binanceService: BinanceService,
        private purchaseplanService: PurchaseplanService,
        private tradeAlertService: TradeAlertService,
        private router: Router
      ) { }

      ngOnInit() {
          this.getProfile()
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    getProfile(){
          this.userService.getProfile().subscribe(profile => {
              //console.log(profile)
            this.id = profile.user._id;   
            this.authfactor = profile.user.authfactor;	  
            this.user = profile.user;	  
            this.firstname = this.user.firstname; 
            this.lastname = this.user.lastname; 
            this.email = this.user.email; 
            this.username = this.user.username; 
            this.phonenumber = this.user.phonenumber;  
            this.plangetList();
            this.accountgetList();
            this.getList() ;
            this.getApiList();
            this.myAlertList();
            if (!this.authfactor) {
                this.enable2Factor();
            }
        },
        err => {
          console.log(err);
          return false;
        });
    }

    enable2Factor(){
        this.userService.enableAuth().subscribe(data => {
            this.authFactor = data;
        });
    }

    removeAuth(){
        let objProfile = {authfactor:false,twofactor:{}, _id: this.id}
        this.userService.updateProfile(objProfile).subscribe(data => {		
          if(!data.error){
              this.getProfile();
            this.flashMessage.show('2 Factor Authentication Disabled Successfully', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/profile']);
          } else {
            this.flashMessage.show('Invalid Key', {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/profile']);
          }
        });
    }

    verifyOtp(){
        let obj = {};
        obj['token'] = this.otp;
        obj['tempSecret'] = this.authFactor.tempSecret;
        this.userService.verifyAuth(obj).subscribe(data => {
            this.authOpen = false;
            this.otp = '';
            if (data.status) {
                let objProfile = {authfactor:true,twofactor:this.authFactor, _id: this.id}
                this.userService.updateProfile(objProfile).subscribe(data => {		
                  if(!data.error){
                      this.getProfile();
                    this.flashMessage.show('2 Factor Authentication Enabled Successfully', {cssClass: 'alert-success', timeout: 3000});
                    this.router.navigate(['/profile']);
                  } else {
                    this.flashMessage.show('Invalid Key', {cssClass: 'alert-danger', timeout: 3000});
                    this.router.navigate(['/profile']);
                  }
                });
            }
            console.log(data)
        });
    }

    showType(type,data){
        this.authOpen = true;
        this.openType = type;
        this.temp = data;
    }

    showForm(){
        this.authOpen = false;
        if (this.openType == 'addExchange') {
            document.getElementById('v-pills-addexchng-tab').click();
            this.clearform()
        }
        if (this.openType == 'editExchange') {
            setTimeout(() => {
                document.getElementById('v-pills-editexchange-tab').click();	
                this.editPlan(this.temp);
            }, 1000);
        }
        if (this.openType == 'deleteExchange') {
            this.deletePlan(this.temp._id)
        }
    }

    verifyAuth(){
        let obj = {};
        obj['token'] = this.otp;
        obj['tempSecret'] = this.user.twofactor.tempSecret;
        this.userService.verifyAuth(obj).subscribe(data => {
            this.otp = '';
            this.authOpen = false;
            if (data.status) {
                this.showForm()
                this.flashMessage.show('2 Factor Authentication Successfully', {cssClass: 'alert-success', timeout: 3000});
            }else{
                this.flashMessage.show('2 Factor Authentication Wrong', {cssClass: 'alert-danger', timeout: 3000});
            }
            console.log(data)
        },error => {
            this.otp = '';
            this.authOpen = false;
            this.flashMessage.show('2 Factor Authentication Wrong', {cssClass: 'alert-danger', timeout: 3000});        	
        });
    }

    myAlertList(){
        this.tradeAlertService.tradeAlertList(JSON.parse(localStorage.getItem('user'))['_id']).subscribe(data => {
            let alertList

            alertList = data['message'];

            this.alertRequestList = alertList.filter((item) => { return item['isOpen'] == true; });
            this.alertHistoryList = alertList.filter((item) => { return item['isOpen'] == false; });
            //console.log(this.alertList)
        });
    }

       setActiveChild(current,my){
        if (current == my) {
              return 'activeClass';
         }
    }

       setActive(current,my){
        if (current == my) {
              return 'activeClass';
         }
    }

    setActiveChildClass(name){
       this.isChildActive = name;
    }

    setActiveClass(name){
       this.isActive = name;
    }

      onProfileSubmit(){
        const userProfile = {
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              username: this.username,
              phonenumber: this.phonenumber,
              _id: this.id
        }
        // Required Fields
        if(!this.validateService.validateProfile(userProfile)){
          this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }
        // Validate Email
        if(!this.validateService.validateEmail(userProfile.email)){
          this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }
        // Update User Profile
        this.userService.updateProfile(userProfile).subscribe(data => {		
          if(!data.error){
            this.flashMessage.show('Profile Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/profile']);
          } else {
            this.flashMessage.show('Email/Username already in use', {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/profile']);
          }
        });
      }

      userChangePassword(){
        let obj = {};
          obj['password'] = this.password;
          obj['newpassword'] = this.newpassword;
          obj['id'] = this.id;
            if(this.password != '' && this.newpassword != ''){
                  this.userService.changePassword(obj).subscribe(
                    (data) => {            
                      if (!data.error) {
                            this.flashMessage.show('Password Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
                            this.router.navigate(['/profile']);
                            this.password = '';
                            this.newpassword = '';
                           }else{
                            this.flashMessage.show('Current password is wrong', {cssClass: 'alert-danger', timeout: 3000});
                            this.router.navigate(['/profile']);
                            this.password = '';
                            this.newpassword = '';
                        }
                    },
                    (err)=>{
                        this.flashMessage.show('Something went wrong', { cssClass: 'danger-alert', timeout: 5000 });
                        console.log('kfgbhj');
                    }
                );
            }else{
                this.flashMessage.show('Please fill current/change password', {cssClass: 'alert-danger', timeout: 3000});
     
            }
      }

      getList(){
        this.exchangeService.customerexchangeList(this.id).subscribe(
            (data) => {
              if (!data.error) {
                     this.plans = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    getApiList(){
        this.exchangeapiService.exchangeapiList().subscribe(
            (data) => {
              if (!data.error) {
                     this.exchangeNames = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    apiValidate(name,data1){
        if (name == 'Binance') {
            console.log(data1)
            this.binanceService.getAuthenticate(data1).subscribe((data)=>{
                if (data['orders'].length >= 0) {
                this.exchangeService.exchangeAdd(data1).subscribe(
                    (data) => {
                      if (!data.error) {
                              this.getList();
                            document.getElementById('v-pills-exchange-tab').click();
                            this.flashMessage.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                            this.router.navigate(['/profile']);
                        }else{
                            this.flashMessage.show('Exchange API Already exists', { cssClass: 'alert-danger', timeout: 3000 });
                        }
                    },
                    (err)=>{
                        console.log('kfgbhj')
                    }
                );
            }else{
                this.flashMessage.show('Invalid API Key', { cssClass: 'alert-danger', timeout: 3000 });
            }
            });
        }else{
            this.exchangeService.exchangeAdd(data1).subscribe(
                    (data) => {
                      if (!data.error) {
                              this.getList();
                            document.getElementById('v-pills-exchange-tab').click();
                            this.flashMessage.show('Exchange Account Added Successfully', { cssClass: 'alert-success', timeout: 3000 });
                            this.router.navigate(['/profile']);
                        }else{
                            this.flashMessage.show('Exchange API Already exists', { cssClass: 'alert-danger', timeout: 3000 });
                        }
                    },
                    (err)=>{
                        console.log('kfgbhj')
                    }
                );
        }
    }

    planAdd(){
        const Addplan = {
              nickName: this.nickName,
              exchangeName: this.exchangeName,
              exchangeType: this.exchangeType,
              apiKey: this.apiKey,
              secretKey: this.secretKey,
              user: this.id
        }
        if(!this.validateService.validateaddplan(Addplan)){
          this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        this.exchangeapiService.exchangeapi(this.exchangeName).subscribe((data)=> {
            this.apiValidate(data.message.exchangeapiName,Addplan);
            

        },
        (err)=>{
            console.log('kfgbhj')
        })

        /**/
    }

    editPlan(data) {
        if(data){
            this.sid= data._id;
            this.nickName = data.nickName;   
            this.exchangeName = data.exchangeName._id;   
            this.exchangeType = data.exchangeType;  
            this.apiKey = data.apiKey;  
            this.secretKey = data.secretKey;
        }
    }

    clearform(){
            this.nickName = '';
            this.exchangeName = '';
            this.exchangeType = '';
            this.apiKey = '';
            this.secretKey = '';
    }

    planUpdate(){
        const updateplan = {
            _id:this.sid,
            nickName: this.nickName,
            exchangeName: this.exchangeName,
            exchangeType: this.exchangeType,
            apiKey: this.apiKey,
            secretKey: this.secretKey,
            user: this.id
        }
        if(!this.validateService.validateaddplan(updateplan) && !updateplan){
          this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }
        this.exchangeService.exchangeUpdate(updateplan).subscribe(
            (data) => {
              if (!data.error) {
                    this.getList();
                    document.getElementById('v-pills-exchange-tab').click();
                    this.flashMessage.show('Exchange Account Updated Successfully', { cssClass: 'alert-success', timeout: 3000 });
                    this.router.navigate(['/profile']);
                }else{
                   this.flashMessage.show('Exchange API Already Exists', { cssClass: 'alert-danger', timeout: 3000 }); 
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    private deletePlan(id) {
        if(confirm('Are you sure to delete ?')) {
                this.flashMessage.show('Exchange Account Deleted Successfully', { cssClass: 'alert-success', timeout: 3000 });
                this.exchangeService.exchangeDelete(id).subscribe(data => {
                this.getList();
            });
        }
    }

    plangetList(){
        this.planService.planList().subscribe(
            (data) => {
              if (!data.error) {
                     this.plansType = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

      private purchasePlan(data) {
          let obj = {};
          var x = parseInt(data.planType) ;
        var current = new Date();
        var threeMonthsInTheFuture =  new Date(new Date(current).setMonth(current.getMonth() + x));
          obj['plan'] = data._id;
          obj['expireddate'] = threeMonthsInTheFuture;
          obj['user'] = this.id;
              if(confirm('Are you sure to purchase plan?')) {
                this.purchaseplanService.paymentplan(data).subscribe(
                    (data) => {
                        if(!data.error){
                            window.location.href = data.paymentlink;
                            this.purchaseplanService.puchaseplan(obj).subscribe(data => {
                            });
                        }
                    },
                    (err)=>{
                        console.log('kfgbhj')
                    }
                );
            }
      }

    accountgetList(){
        this.purchaseplanService.accountList(this.id).subscribe(
            (data) => {
              if (!data.error) {
                     this.accountplansType = data.message
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
}
