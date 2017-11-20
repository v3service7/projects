import { Component, OnInit } from '@angular/core';
import { BittrexService } from './../../services/bittrex.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

declare var $: any;
@Component({
  selector: "app-userdashboard",
  templateUrl: "./userdashboard.component.html",
  styleUrls: ["./userdashboard.component.css"]
})
export class UserdashboardComponent implements OnInit {
  loadedCharacter: {};
  markets: any[];
  cuurencies: any[];
  multiple0: boolean = false;
  multiple1: boolean = true;
  options0: Array<any> = [];
  options1: Array<any> = [];
  selection: Array<string>;
  selectBox:any;
  marketBox:any;
  bid: any;
  ask:any;
  last:any;
  high:any;
  low:any;
  vol:any;
  sellMarketHistory: any;
  buyMarketHistory: any;
  allMarketHistory: any;

  form1: FormGroup;


  constructor(
    private bittrexService: BittrexService,
    private fb: FormBuilder,
    public userService:UserService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) {}
  ngOnInit() {
    this.form1 = this.fb.group({
      selectBox: [''],
      marketBox: ['']
    });

    document.body.style.backgroundImage =
      'url("./../../../assets/frontend/img/bg.png")';
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.paddingTop = "80px";
 
    this.form1.controls['selectBox'].setValue('BTC-ADT');
    this.form1.controls['marketBox'].setValue('Bittrex');

    this.bittrexService.getMarketName('BTC-ADT');
    this.getMerkets();
    this.getMarketSummary();
    this.getMarketHistory();
  }

  getMerkets(){
    this.bittrexService.getMarkets().subscribe((data) => {

      if (data['error'] == false) {
      let numOptions = data['list'].result;
      let opts = new Array(numOptions);
      for (let i = 0; i < numOptions.length; i++) {
        opts[i] = {
          value: i.toString(),
          label: numOptions[i].MarketName
        };
      }
      this.markets = opts.slice(0);
    }
    });
    
  }
  getMarketSummary(){
    this.bittrexService.getMarketSummary().subscribe((data) => {
      if(data['error'] == false){
        this.high=data['list'].result[0].High;
        this.low=data['list'].result[0].Low;
        this.vol=data['list'].result[0].Volume;
        this.ask=data['list'].result[0].Ask;
        this.bid=data['list'].result[0].Bid;
      }
    });
    }
  
  getMarketHistory(){
    this.bittrexService.getMarketHistory().subscribe((data) => {
      if (data['error'] == false) {
        this.allMarketHistory = data['list'].result;
        var sellmarket = [];
        var buymarket = [];
        for (let i = 0; i < data['list'].result.length; i++) {
          if (data['list'].result[i].OrderType == 'BUY') {
            buymarket.push(data['list'].result[i]);
          }
          if (data['list'].result[i].OrderType == 'SELL') {
            sellmarket.push(data['list'].result[i]);
          }
        }
        this.buyMarketHistory = buymarket;
        this.sellMarketHistory = sellmarket;
      }
    });
  }
   
  marketSelected(marketSelected: any) {
   
    this.bittrexService.getMarketName(marketSelected.label);

  }

  onLogoutClick(){
    this.userService.logout();
    this.flashMessage.show('You are logged out', {cssClass:'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}

function keysrt(key, desc) {
  return function (a, b) {
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}
// sort on values
function srt(desc) {
  return function (a, b) {
    return desc ? ~~(a < b) : ~~(a > b);
  };
}
