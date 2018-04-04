import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BittrexService } from './../../services/bittrex.service';
import { BinanceService } from './../../services/binance.service';
import { PoloniexService } from './../../services/poloniex.service';
import { GdaxService } from './../../services/gdax.service';
import { HoubiService } from './../../services/huobi.service';
import { FormControl, FormGroup, FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TradeAlertService } from '../../services/tradealert.service';
import { PurchaseplanService} from '../../services/purchaseplan.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
declare var $: any;
declare var TradingView: any;
declare var Highcharts: any;
declare var window: { tvWidget };
declare var Datafeeds: any;
import * as globalVariable from "../../global";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Chart, StockChart } from 'angular-highcharts';

@Component({
    selector: "app-userdashboard",
    templateUrl: "./userdashboard.component.html",
    styleUrls: ["./userdashboard.component.css"]
})

export class UserdashboardComponent implements OnInit {
    loadedCharacter: {};
    markets: any[];
    currency: any[];
    cuurencies: any[];
    multiple0: boolean = false;
    isPayment: boolean = false;
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
    sellMarketHistory: any=[];
    buyMarketHistory: any=[];
    allMarketHistory: any=[];
    btcList: any;
    ethList: any;
    usdtList: any;
    chooseCurrency: any;
    chartUrl: any;
    BuySellCurrency: any;
    buySellCat: any;
    chooseMarket: any;
    form1: FormGroup;
    alertForm: FormGroup;
    tradeBuyForm: FormGroup;
    tradeSellForm: FormGroup;
    tradeBuyLimitForm: FormGroup;
    tradeSellLimitForm: FormGroup;
    term: any;
    alertNotice: any;
    buyBalance: any;
    sellBalance: any;
    alertList: any=[];
    alertListTemp: any=[];
    alertFilter: any;
    openOrders:any = [];
    closeOrders:any = [];
    buyBalanceStats:any = [];
    sellBalanceStats:any = [];
    planHistory:any = [];
    stockOptions:any = {};
    balanceStatPercent:any = [1,5,10,25,50,75];
    isActiveTrade : any = 'limit';
    isActiveOrder : any = 'open';
    isActiveAlert : any = 'data';
    isActiveChart : any = 'chart';
    chart: any ;

    constructor(
        private bittrexService: BittrexService,
        private binanceService: BinanceService,
        private poloniexService: PoloniexService,
        private gdaxService: GdaxService,
        private houbiService: HoubiService,
        private tradeAlertService: TradeAlertService,
        private fb: FormBuilder,
        public userService:UserService,
        private router:Router,
        private purchaseplanService: PurchaseplanService,
        private flashMessage:FlashMessagesService
    ) {}

    ngOnInit() {
        this.alertFilter = {'exchangeName':'All','exchangeMarket':'All','isOpen':true}
        this.chooseCurrency = localStorage.getItem('currency');
        this.BuySellCurrency = localStorage.getItem('coin');
        this.chooseMarket = localStorage.getItem('market');

        this.alertForm = this.fb.group({
            exchangeName: ['', Validators.required],
            exchangeMarket: ['', Validators.required],
            alertPrice: ['', Validators.required],
            userId: ['', Validators.required],
            notes: [''],
            sound: [''],
          });

        this.tradeBuyLimitForm = this.fb.group({
            spend:['',Validators.required],
            price:['',Validators.required],
            buy:['',Validators.required]
        });

        this.tradeSellLimitForm = this.fb.group({
            sell:['',Validators.required],
            price:['',Validators.required],
            receive:['',Validators.required]
        });

        this.tradeBuyForm = this.fb.group({
            spend:['',Validators.required],
            buy:['',Validators.required]
        });

        this.tradeSellForm = this.fb.group({
            sell:['',Validators.required],
            receive:['',Validators.required]
        });

        document.body.style.backgroundImage =
        'url("./../../../assets/frontend/img/bg.png")';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.paddingTop = "80px";
        this.bittrexService.getMarketName(this.chooseCurrency);
        this.getMarkets();
        this.accountgetList();
        this.loadAllFun()
    }

    accountgetList(){
        let user = JSON.parse(localStorage.getItem('user'));
        this.purchaseplanService.accountList(user._id).subscribe(
            (data) => {
              if (!data.error) {
                    this.planHistory = data.message;
                    if (this.planHistory.length > 0) {
                        let today = new Date();
                        for (var i = 0; i < this.planHistory.length; ++i) {
                            let date = new Date(this.planHistory[i]['expireddate']);
                            if (today.toLocaleDateString() <= date.toLocaleDateString()) {
                                console.log(date.toLocaleDateString())
                                this.isPayment = true;
                            }
                        }
                    }
                }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    setAlert(){
        this.tradeAlertService.tradeAlertAdd(this.alertForm.value).subscribe(data => {
            if (!data.error) {
                this.flashMessage.show('Alert set Sucessfully', {cssClass:'alert-success', timeout: 3000});
                this.myAlertList();
                this.alertForm.reset();
            }
        });
    }

    myAlertList(){
        let user = JSON.parse(localStorage.getItem('user'));
        this.alertForm.controls['exchangeName'].setValue(this.chooseMarket);
        this.alertForm.controls['exchangeMarket'].setValue(this.chooseCurrency);
        this.alertForm.controls['userId'].setValue(user['_id']);
        this.tradeAlertService.tradeAlertList(user['_id']).subscribe(data => {
            this.alertList = data['message'];
            //console.log(this.alertList)
            this.alertListTemp = data['message'];
        });

        this.binanceService.getAlertNotify().subscribe((data) => {
            let arr = data['list'];
            if (arr.length > 0) {
                let myAlert = arr.filter((item)=>{return item['userId'] == user['_id']});
                this.alertNotice = myAlert[0];
                this.alertNotice['isOpen'] = false;
                this.tradeAlertService.tradeAlertUpdate(this.alertNotice).subscribe(data => {
                    if (!data.error) {
                        this.myAlertList();
                    }
                });
            }
        });
    }

    alertListFilter(type, data){
        this.alertList = this.alertListTemp;
        let alertLis = [];
        if (type == 'exchange') {
            this.alertFilter['exchangeName'] = data;
            if (this.alertFilter['exchangeName'] != 'all') {
                alertLis = this.alertList.filter((item) => {           
                    return item['exchangeName'] == this.alertFilter['exchangeName'];
                });
            }else{
                alertLis = this.alertListTemp;
            }
        }

        if (type == 'market') {
            this.alertFilter['exchangeMarket'] = data;
            if (this.alertFilter['exchangeMarket'] != 'all') {
                alertLis = this.alertList.filter((item) => {           
                    return item['exchangeMarket'] == this.alertFilter['exchangeMarket'];
                });
            }else{
                alertLis = this.alertListTemp;
            }
        }

        if (type == 'alert') {
            this.alertFilter['isOpen'] = data
            alertLis = this.alertList.filter((item) => {           
                return item['isOpen'] == this.alertFilter['isOpen'];
            });
        }
        this.alertList = alertLis;
    }

    loadAllFun(){
        this.myAlertList();
        if (this.chooseMarket == 'Huobi') {
            console.log('----Huobi---');
            this.chartUrl = globalVariable.url+'huobi';
            this.binanceService.reConnect();
            Observable.interval(5000).subscribe(x => {
                this.getHoubiMarketHistory();                
                this.getHoubiMarketSummary();
            });
            this.getHoubiCurrency();
            this.getHoubiTradeBalance();
            this.houbiOpenOrder();
            //this.chartLoad(this.chooseCurrency,this.chartUrl)
        }
        if (this.chooseMarket == 'Gdax') {
            console.log('----Gdax---');
            this.chartUrl = globalVariable.url+'gdax';
            this.binanceService.reConnect();
            Observable.interval(2000).subscribe(x => {
                this.getGdaxxCurrency();
                this.getGdaxMarketSummary();
                this.getGdaxMarketHistory();
            });
            //this.chartLoad(this.chooseCurrency,this.chartUrl)
        }

        if (this.chooseMarket == 'Poloniex') {
            console.log('----Poloniex---');
            this.chartUrl = globalVariable.url+'poloniex';
            this.binanceService.reConnect();
            this.poloniexService.getMarketName(this.chooseCurrency);
            this.getPoloniexCurrency();
            this.getPoloniexMarketSummary();
            this.getPoloniexMarketHistory();
            this.poloniexTradeBalance();
            //this.chartLoad(this.chooseCurrency,this.chartUrl)
        }

        if (this.chooseMarket == 'Binance') {
            console.log('----Binance---');
            this.chartUrl = globalVariable.url+'binance';
            this.binanceService.reConnect();
            this.binanceService.getMarketName(this.chooseCurrency);
            this.getBinanceCurrency();
            this.getBinanceMarketSummary();
            this.getBinanceMarketHistory();
            this.binanceOpenOrder();
            this.binanceTradeBalance();
            this.depthChart();
            //this.chartLoad(this.chooseCurrency,this.chartUrl)
        }

        if(this.chooseMarket == 'Bittrex'){
            console.log('----------------Bittrex')
            this.chartUrl = globalVariable.url+'bittrexApi';
            this.binanceService.reConnect();
            this.bittrexService.getMarketName(this.chooseCurrency);
            this.getCurrency();
            this.getMarketSummary();
            this.getMarketHistory();
            //this.chartLoad(this.chooseCurrency,this.chartUrl)
        }
    }

    tradeBuyLimit(){
        if (this.chooseMarket == 'Huobi') {
            this.houbiService.buyLimit(this.chooseCurrency,this.tradeBuyLimitForm.value).subscribe(data => {
                if (data.status == 'ok') {
                    this.flashMessage.show('Trade Buy Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeBuyLimitForm.reset();
                this.houbiOpenOrder();
            });
        }

        if (this.chooseMarket == 'Binance') {
            this.binanceService.buyLimit(this.chooseCurrency,this.tradeBuyLimitForm.value).subscribe(data => {
                if (typeof data.code !== 'undefined') {
                    this.flashMessage.show('Trade Buy Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeBuyLimitForm.reset();
                this.binanceOpenOrder();
            });
        }
    }

    tradeBuy(){
        if (this.chooseMarket == 'Huobi') {
            this.houbiService.buy(this.chooseCurrency,this.tradeBuyForm.value).subscribe(data => {
                if (data.status == 'ok') {
                    this.flashMessage.show('Trade Buy Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeBuyForm.reset();
                this.houbiOpenOrder();
            });
        }
        if (this.chooseMarket == 'Binance') {
            this.binanceService.buy(this.chooseCurrency,this.tradeBuyForm.value).subscribe(data => {
                if (typeof data.code !== 'undefined') {
                    this.flashMessage.show('Trade Buy Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeBuyForm.reset();
                this.binanceOpenOrder();
            });
        }
    }

    tradeSellLimit(){
        if (this.chooseMarket == 'Huobi') {
            this.binanceService.sellLimit(this.chooseCurrency,this.tradeSellLimitForm.value).subscribe(data => {
                if (data.status == 'ok') {
                    this.flashMessage.show('Trade Sell Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeSellLimitForm.reset();
                this.houbiOpenOrder();            
            });
        }
        if (this.chooseMarket == 'Binance') {
            this.binanceService.sellLimit(this.chooseCurrency,this.tradeSellLimitForm.value).subscribe(data => {
                if (typeof data.code !== 'undefined') {
                    this.flashMessage.show('Trade Sell Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeSellLimitForm.reset();
                this.binanceOpenOrder();            
            });
        }
    }

    tradeSell(){
        if (this.chooseMarket == 'Huobi') {
            this.binanceService.sell(this.chooseCurrency,this.tradeSellForm.value).subscribe(data => {
                if (data.status == 'ok') {
                    this.flashMessage.show('Trade Sell Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeSellForm.reset();
                this.houbiOpenOrder();            
            });
        }
        if (this.chooseMarket == 'Binance') {
            this.binanceService.sell(this.chooseCurrency,this.tradeSellForm.value).subscribe(data => {
                if (typeof data.code !== 'undefined') {
                    this.flashMessage.show('Trade Sell Sucessfully', {cssClass:'alert-success', timeout: 3000});
                }else{
                    this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
                }
                this.tradeSellForm.reset();
                this.binanceOpenOrder();            
            });
        }
    }

    depthChart(){
       this.binanceService.getDepthChart().subscribe((data)=>{
           console.log('depth')
           console.log(data)
       this.chart = new Chart({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Linechart'
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Line 1',
                data: [1, 2, 3]
            }]
        });
           /*this.chart = new StockChart({
                rangeSelector: {
                    selected: 2
                },

                title: {
                    text: 'AAPL Stock Price'
                },

                series: [{
                    name: 'AAPL Stock Price',
                    data: data,
                    type: 'areaspline',
                    threshold: null,
                    tooltip: {
                        valueDecimals: 2
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    }
                }]
           })*/
       })
    }

    /* Houbi Function */

    getHoubiCurrency(){
        this.houbiService.getCurrency().subscribe((data) => {
            if (data.status == 'ok') {
                var btclist = [];
                var ethlist = []; 
                var usdtlist = [];
                for (var i = 0; i < data.data.length; ++i) {
                    let obj = {}
                    obj['MarketName'] = data.data[i]['base-currency']+data.data[i]['quote-currency'];
                    obj['Last'] = data.data[i]['price-precision'];
                    if (data.data[i]['quote-currency'] == 'btc') {
                        btclist.push(obj);
                    }
                    if (data.data[i]['quote-currency'] == 'eth') {
                        ethlist.push(obj);
                    }
                    if (data.data[i]['quote-currency'] == 'usdt') {
                        usdtlist.push(obj);
                    }
                }
                this.btcList = btclist;
                this.ethList = ethlist;
                this.usdtList = usdtlist;
            }
        });
    }

    getHoubiMarketSummary(){
        this.houbiService.getMarketSummary(this.chooseCurrency).subscribe((data) => {
            if (data.status == 'ok') {
                this.high=data['tick'].high;
                this.low=data['tick'].low;
                this.vol=data['tick'].vol;
                this.ask=data['tick'].ask[0];
                this.bid=data['tick'].bid[0];
                let objArr = this.alertList.filter((item) => {return (item['exchangeMarket'] == this.chooseMarket) && (item['alertPrice'] == this.ask);});
                if (objArr.length > 0) {
                    let user = JSON.parse(localStorage.getItem('user'));
                    let myAlert = objArr.filter((item)=>{return item['userId'] == user['_id']});
                    this.alertNotice = myAlert[0];
                    this.alertNotice['isOpen'] = false;
                    this.tradeAlertService.tradeAlertUpdate(this.alertNotice).subscribe(data => {
                        if (!data.error) {
                            this.myAlertList();
                        }
                    });
                }
                this.alertForm.controls['alertPrice'].setValue(this.ask);
            }
        });
    }

    getHoubiMarketHistory(){
        this.houbiService.getMarketHistory(this.chooseCurrency).subscribe((data) => {
            if (data['status'] == 'ok') {
                this.allMarketHistory = [];
                var sellmarket = [];
                var buymarket = [];
                for (var i = 0; i < data['tick']['bids'].length; ++i) {
                    let total = data['tick']['bids'][i][0] * data['tick']['bids'][i][1];
                    let obj = {'Price':data['tick']['bids'][i][0],'Quantity':data['tick']['bids'][i][1],'Total':total}
                    let allObj = {'Price':data['tick']['bids'][i][0],'Quantity':data['tick']['bids'][i][1],'TimeStamp':data['tick']['ts'],'OrderType':'BUY'}
                    buymarket.push(obj);
                    this.allMarketHistory.push(allObj);
                }

                for (var i = 0; i < data['tick']['asks'].length; ++i) {
                    let total = data['tick']['asks'][i][0] * data['tick']['asks'][i][1];
                    let obj = {'Price':data['tick']['asks'][i][0],'Quantity':data['tick']['asks'][i][1],'Total':total}
                    let allObj = {'Price':data['tick']['asks'][i][0],'Quantity':data['tick']['asks'][i][1],'TimeStamp':data['tick']['ts'],'OrderType':'SELL'}
                    sellmarket.push(obj);
                    this.allMarketHistory.push(allObj);
                }

                this.buyMarketHistory = buymarket;
                this.sellMarketHistory = sellmarket;
            }
        })
    }

    getHoubiTradeBalance(){
        this.houbiService.getBalance().subscribe((data)=>{
            console.log(data);
            let currencyName = this.chooseCurrency;
            console.log(currencyName)
            const substring = currencyName.substr(-3);
            if ( substring == "btc" ){
                this.buySellCat = substring;
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            if ( substring == "eth" ){
                this.buySellCat = substring;
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            if ( currencyName.substr(-4) == "usdt" ){
                this.buySellCat = currencyName.substr(-4);
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            for (var i = 0; i < data['list'].length; ++i) {
                if (data['list'][i]['type'] == 'trade' ) {
                    if (data['list'][i]['currency'] == this.buySellCat) {
                        this.buyBalance = data['list'][i]['balance'];
                    }
                    if (data['list'][i]['currency'] == this.BuySellCurrency) {
                        this.sellBalance = data['list'][i]['balance'];
                    }
                }
            }
            this.sellBalanceStats = [];
            this.buyBalanceStats = [];
            for (var i = 0; i < this.balanceStatPercent.length; ++i) {
                let amount = (this.buyBalance * this.balanceStatPercent[i])/100
                this.buyBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount.toFixed(5)+')','amount':amount.toFixed(5)})
                let amount1 = (this.sellBalance * this.balanceStatPercent[i])/100
                this.sellBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount1.toFixed(5)+')','amount':amount1.toFixed(5)})
            }
        });
    }

    houbiOpenOrder(){
        this.houbiService.getOpenOrder(this.chooseCurrency).subscribe((data)=>{
            this.openOrders = [];
            this.closeOrders = [];
            if (data['data'].length > 0) {
                this.openOrders = data['orders'].filter((item) => { return item['state'] != 'filled';});
                this.closeOrders = data['orders'].filter((item) => { return item['state'] == 'filled';});
            }
        },(err)=>{
            console.log(err)
        })
    }

    /* Gdax Function */

    getGdaxxCurrency(){
        this.gdaxService.getCurrency().subscribe((data) => {
            var btclist = [];
            var ethlist = []; 
            var usdtlist = []; 
            for (var i = 0; i < data.length; ++i) {
                let obj = {}
                obj['MarketName'] = data[i]['id'];
                obj['Last'] = data[i]['base_max_size'];
                if (data[i]['base_currency'] == 'BTC') {
                    btclist.push(obj);
                }
                if (data[i]['base_currency'] == 'ETH') {
                    ethlist.push(obj);
                }
                if (data[i]['base_currency'] == 'USDT') {
                    usdtlist.push(obj);
                }
            }
            this.btcList = btclist;
            this.ethList = ethlist;
            this.usdtList = usdtlist;
        });
    }

    getGdaxMarketSummary(){
        this.gdaxService.getMarketSummary(this.chooseCurrency).subscribe((data) => {
            //console.log(data)
            //if (data['error'] == false && data['list']!=null){
                this.high=data.price;
                this.low=data.size;
                this.vol=data.volume;
                this.ask=data.ask;
                this.bid=data.bid;
                this.alertForm.controls['alertPrice'].setValue(this.ask);
            //}
        });
    }

    getGdaxMarketHistory(){
        this.gdaxService.getMarketHistory(this.chooseCurrency).subscribe((data) => {
            this.allMarketHistory = [];
            var sellmarket = [];
            var buymarket = [];
            for (var i = 0; i < data.length; ++i) {
                if (data[i]['side'] == 'sell') {
                    let total = data[i]['price'] * data[i]['size'];
                    let obj = {'Price':data[i]['price'],'Quantity':data[i]['size'],'Total':total}
                    let allObj = {'Price':data[i]['price'],'Quantity':data[i]['size'],'TimeStamp':data[i]['time'],'OrderType':'SELL'}
                    sellmarket.push(obj);
                    this.allMarketHistory.push(allObj);
                }
                if (data[i]['side'] == 'buy') {
                    let total = data[i]['price'] * data[i]['size'];
                    let obj = {'Price':data[i]['price'],'Quantity':data[i]['size'],'Total':total}
                    let allObj = {'Price':data[i]['price'],'Quantity':data[i]['size'],'TimeStamp':data[i]['time'],'OrderType':'BUY'}
                    buymarket.push(obj);
                    this.allMarketHistory.push(allObj);
                }
            }
            this.buyMarketHistory = buymarket;
            this.sellMarketHistory = sellmarket;
        })
    }

    /*Poloniex Function*/

    getPoloniexCurrency(){
        this.poloniexService.getCurrency().subscribe((data) => {
            var btclist = [];
            var ethlist = []; 
            var usdtlist = []; 
            for(var key in data) {
                let obj = {}
                 if (key.startsWith('BTC_')) {
                    obj['MarketName'] = key;
                    obj['Last'] = data[key]['last'];
                    btclist.push(obj);
                }
                if (key.startsWith('ETH_')) {
                    obj['MarketName'] = key;
                    obj['Last'] = data[key]['last'];
                    ethlist.push(obj);
                }
                if (key.startsWith('USDT_')) {
                    obj['MarketName'] = key;
                    obj['Last'] = data[key]['last'];
                    usdtlist.push(obj);
                }
            }
            this.btcList = btclist;
            this.ethList = ethlist;
            this.usdtList = usdtlist;
        });
    }

    getPoloniexMarketSummary(){
        this.poloniexService.getMarketSummary().subscribe((data) => {
            if (data['error'] == false && data['list']!=null){
                this.high=data['list'][this.chooseCurrency].high24hr;
                this.low=data['list'][this.chooseCurrency].low24hr;
                this.vol=data['list'][this.chooseCurrency].baseVolume;
                this.ask=data['list'][this.chooseCurrency].lowestAsk;
                this.bid=data['list'][this.chooseCurrency].highestBid;
                this.alertForm.controls['alertPrice'].setValue(this.ask);
            }
        });
    }

    getPoloniexMarketHistory(){
        this.poloniexService.getMarketHistory().subscribe((data) => {
            if (data['error'] == false && data['list'] != null) {
                this.allMarketHistory = [];
                var sellmarket = [];
                var buymarket = [];
                for (var key in data['list']['bids']) {
                    let total = parseFloat(data['list']['bids'][key]) * parseFloat(key);
                    let obj = {'Price':key,'Quantity':data['list']['bids'][key],'Total':total}
                    let allObj = {'Price':key,'Quantity':data['list']['bids'][key],'TimeStamp':total,'OrderType':'BUY'}
                        buymarket.push(obj);
                    if (buymarket.length <= 10 ) {
                        this.allMarketHistory.push(allObj);
                    }
                }
                
                for (var key in data['list']['asks']) {
                    let total = parseFloat(data['list']['asks'][key]) * parseFloat(key);

                    let obj = {'Price':key,'Quantity':data['list']['asks'][key],'Total':total}

                    let allObj = {'Price':key,'Quantity':data['list']['asks'][key],'TimeStamp':total,'OrderType':'SELL'}
                    sellmarket.push(obj);
                    if (sellmarket.length <= 10 ) {
                        this.allMarketHistory.push(allObj);
                    }
                }
                this.buyMarketHistory = buymarket;
                this.sellMarketHistory = sellmarket;
            }
        });
    }

    poloniexTradeBalance(){
        this.poloniexService.getBalance().subscribe((data)=>{
            let currencyName = this.chooseCurrency;
            if ( currencyName.startsWith('BTC_') ){
                this.buySellCat = currencyName.replace('BTC_','');
                this.BuySellCurrency = this.chooseCurrency.replace('_'+this.buySellCat,'')
            }
            if ( currencyName.startsWith('ETH_') ){
                this.buySellCat = currencyName.replace('ETH_','');
                this.BuySellCurrency = this.chooseCurrency.replace('_'+this.buySellCat,'')
            }
            if ( currencyName.startsWith('USDT_') ){
                this.buySellCat = currencyName.replace('USDT_','');
                this.BuySellCurrency = this.chooseCurrency.replace('_'+this.buySellCat,'')
            }
            this.buyBalance = data[this.buySellCat];
            this.sellBalance = data[this.BuySellCurrency];
            this.sellBalanceStats = [];
            this.buyBalanceStats = [];
            
            for (var i = 0; i < this.balanceStatPercent.length; ++i) {
                let amount = (this.buyBalance * this.balanceStatPercent[i])/100
                this.buyBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount.toFixed(5)+')','amount':amount.toFixed(5)})
                let amount1 = (this.sellBalance * this.balanceStatPercent[i])/100
                this.sellBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount1.toFixed(5)+')','amount':amount1.toFixed(5)})
            }
        })
    }

    /*Binance Function*/

    getMarkets() {
        this.bittrexService.getMarkets().subscribe((data) => {
            var markets = [];
            if (data['error'] == false) {
                for (let i = 0; i < data.message.length; i++) {
                    markets.push(data.message[i].exchangeapiName)
                }
                this.markets = markets;
            } 
        });
    }

    binanceTradeBalance(){
        this.binanceService.getBalance().subscribe((data)=>{
            let currencyName = this.chooseCurrency;
            const substring = currencyName.substr(-3);
            if ( substring == "BTC" ){
                this.buySellCat = substring;
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            if ( substring == "ETH" ){
                this.buySellCat = substring;
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            if ( currencyName.substr(-4) == "USDT" ){
                this.buySellCat = currencyName.substr(-4);
                this.BuySellCurrency = this.chooseCurrency.replace(this.buySellCat,'')
            }
            this.buyBalance = data[this.buySellCat];
            this.sellBalance = data[this.BuySellCurrency];
            this.sellBalanceStats = [];
            this.buyBalanceStats = [];

            for (var i = 0; i < this.balanceStatPercent.length; ++i) {
                let amount = (this.buyBalance['available'] * this.balanceStatPercent[i])/100
                this.buyBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount.toFixed(5)+')','amount':amount.toFixed(5)})
                let amount1 = (this.sellBalance['available'] * this.balanceStatPercent[i])/100
                this.sellBalanceStats.push({'label':this.balanceStatPercent[i]+'% (' +amount1.toFixed(5)+')','amount':amount1.toFixed(5)})
            }
        })
    }

    tradeBuyPriceSet(type, data){
        if (type == 'limit') {
            this.tradeBuyLimitForm.controls['price'].setValue(data);
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'],this.tradeBuyLimitForm.value['spend']));
        }else{
            this.tradeBuyForm.controls['price'].setValue(data);
        }
    }

    quntityCalculate(price,amount){
        let quantity = amount/price;
        if ( isNaN(quantity) || (quantity == Infinity) ) {
            quantity = 0;
        }
        return quantity.toFixed(5);
    }

    quntitySellCalculate(price,amount){
        let quantity = amount*price;
        if ( isNaN(quantity) || (quantity == Infinity) ) {
            quantity = 0;
        }
        console.log(quantity)
        return quantity.toFixed(5);
    }

    onBlurQuntityCalculate(type){
        if (type == 'buy') {
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'],this.tradeBuyLimitForm.value['spend']))
        }else{
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'],this.tradeSellLimitForm.value['sell']))
        }
    }

    tradeBuySpendSet(type, amount){
        if (type == 'limit') {
            this.tradeBuyLimitForm.controls['spend'].setValue(amount);
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'],this.tradeBuyLimitForm.value['spend']));
        }else{
            this.tradeBuyForm.controls['spend'].setValue(amount);
            this.tradeBuyForm.controls['buy'].setValue(this.quntityCalculate(this.low,amount));
        }
    }

    tradeSellPriceSet(type, data){
        if (type == 'limit') {
            this.tradeSellLimitForm.controls['price'].setValue(data);
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'],this.tradeSellLimitForm.value['sell']))
        }else{
            this.tradeSellForm.controls['price'].setValue(data);            
        }
    }

    tradeSellSpendSet(type, amount){
        if (type == 'limit') {
            this.tradeSellLimitForm.controls['sell'].setValue(amount);
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'],this.tradeSellLimitForm.value['spend']));
        }else{
            this.tradeSellForm.controls['sell'].setValue(amount);
            this.tradeSellForm.controls['receive'].setValue(this.quntitySellCalculate(this.low,amount));
        }
    }

    binanceOpenOrder(){
        this.binanceService.getOpenOrder(this.chooseCurrency).subscribe((data)=>{
            this.openOrders = [];
            this.closeOrders = [];
            if (data['orders'].length > 0) {
                this.openOrders = data['orders'].filter((item) => { return item['status'] == 'NEW';});
                this.closeOrders = data['orders'].filter((item) => { return item['status'] == 'FILLED';});
            }
        },(err)=>{
            console.log(err)
        })
    }

    getBinanceCurrency(){
        this.binanceService.getCurrency().subscribe((data) => {
            //console.log(data)
            var btclist = [];
            var ethlist = []; 
            var usdtlist = []; 
            for (var property in data) {
                const substring = property.substr(-3);
                if ( substring == "BTC" ){
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    btclist.push(obj);
                }
                if ( substring == "ETH" ){
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    ethlist.push(obj);

                }
                if ( property.substr(-4) == "USDT" ){
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    usdtlist.push(obj);
                }
            }
            this.btcList = btclist;
            this.ethList = ethlist;
            this.usdtList = usdtlist;
        });
    }

    getBinanceMarketSummary(){
        this.binanceService.getMarketSummary().subscribe((data) => {
            if (data['error'] == false && data['list']!=null){
                this.high=data['list'].high;
                this.low=data['list'].low;
                this.vol=data['list'].volume;
                this.ask=data['list'].open;
                this.bid=data['list'].close;
                this.alertForm.controls['alertPrice'].setValue(this.ask);
            }
        });
    }

    getBinanceMarketHistory(){
        this.binanceService.getMarketHistory().subscribe((data) => {
            if (data['error'] == false && data['list'] != null) {

                //this.allMarketHistory = [];
                var sellmarket = [];
                var buymarket = [];
                let bArray = data['list']['b'];
                let aArray = data['list']['a'];
                for (var i = 0; i < bArray.length; ++i) {
                    let total = parseFloat(bArray[i][0]) * parseFloat(bArray[i][1]);
                    let obj = {'Price':bArray[i][0],'Quantity':bArray[i][1],'Total':total}
                    let allObj = {'Price':bArray[i][0],'Quantity':bArray[i][1],'TimeStamp':data['list']['E'],'OrderType':'BUY'}
                    buymarket.push(obj);
                this.buyMarketHistory.push(obj);
                    if (buymarket.length <= 10 ) {
                        this.allMarketHistory.push(allObj);
                    }
                }

                for (var i = 0; i < aArray.length; ++i) {
                    let total = parseFloat(aArray[i][0]) * parseFloat(aArray[i][1]);
                    let obj = {'Price':aArray[i][0],'Quantity':aArray[i][1],'Total':total}
                    let allObj = {'Price':aArray[i][0],'Quantity':aArray[i][1],'TimeStamp':data['list']['E'],'OrderType':'SELL'}
                    sellmarket.push(obj);
                this.sellMarketHistory.push(obj);
                    if (sellmarket.length <= 10 ) {
                        this.allMarketHistory.push(allObj);
                    }
                }
                this.allMarketHistory.reverse();
                if (this.allMarketHistory.length >= 200) {
                    this.allMarketHistory.splice(100,99)
                }

                this.buyMarketHistory.reverse();
                if (this.buyMarketHistory.length >= 200) {
                    this.buyMarketHistory.splice(100,99)
                }

                this.sellMarketHistory.reverse();
                if (this.sellMarketHistory.length >= 200) {
                    this.sellMarketHistory.splice(100,99)
                }
            }
        });
    }

    /* Bittrex Function */

    getMarketHistory(){
        this.bittrexService.getMarketHistory().subscribe((data) => {
            if (data['error'] == false && data['list'] != null) {
                this.allMarketHistory = data['list'].result;
                //this.chartLoad(this.allMarketHistory,this.chooseCurrency);
                //console.log(this.allMarketHistory)
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

    getMarketSummary(){
        this.bittrexService.getMarketSummary().subscribe((data) => {
            if (data['error'] == false && data['list']!=null){
                this.high=data['list'].result[0].High;
                this.low=data['list'].result[0].Low;
                this.vol=data['list'].result[0].Volume;
                this.ask=data['list'].result[0].Ask;
                this.bid=data['list'].result[0].Bid;
                this.alertForm.controls['alertPrice'].setValue(this.ask);
            }
        });
    }

    getCurrency(){
        this.bittrexService.getCurrency().subscribe((data) => {
            if (data['error'] == false && data['list'] !=null) {
                let numOptions = data['list'].result;
                let opts = new Array(numOptions);
                var btclist = [];
                var ethlist = []; 
                var usdtlist = []; 
                for (let i = 0; i < numOptions.length; i++) {
                    if (data['list'].result[i].MarketName.startsWith('BTC-')) {
                        btclist.push(data['list'].result[i]);
                    }
                    if (data['list'].result[i].MarketName.startsWith('ETH-')) {
                        ethlist.push(data['list'].result[i]);
                    }
                    if (data['list'].result[i].MarketName.startsWith('USDT')) {
                        usdtlist.push(data['list'].result[i]);
                    }
                }
                this.btcList = btclist;
                this.ethList = ethlist;
                this.usdtList = usdtlist;
            }
        });
    }

    bittrexOpenOrder(){
        this.bittrexService.getOpenOrder(this.chooseCurrency).subscribe((data)=>{
            this.openOrders = [];
            this.closeOrders = [];
            if (data['orders'].length > 0) {
                this.openOrders = data['orders'].filter((item) => { return item['status'] == 'NEW';});
                this.closeOrders = data['orders'].filter((item) => { return item['status'] == 'FILLED';});
            }
        },(err)=>{
            console.log(err)
        })
    }

    /* Common Function */

    currencySelected(currencyName: any) {
        localStorage.setItem('currency', currencyName);
        this.chooseCurrency = localStorage.getItem('currency');
        localStorage.setItem('coin', this.chooseCurrency.split('-')[1]);
        this.BuySellCurrency = localStorage.getItem('coin');
        localStorage.setItem('market', this.chooseMarket);
        this.chooseMarket = localStorage.getItem('market');
        this.loadAllFun();
        ////this.chartLoad(this.chooseCurrency,this.chartUrl)
        /*console.log(currencyName)
        console.log(this.BuySellCurrency)*/
    }

    marketSelected(marketName: any) {
        this.chooseMarket = marketName;
        this.loadAllFun();
    }

    onLogoutClick(){
        this.userService.logout();
        this.flashMessage.show('You are logged out', {cssClass:'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
        return false;
    }

    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    chartLoad(selectedCurrency,url){
        //console.log(selectedCurrency,url)
        $(document).ready(function(){
            var obj = {"supports_search":true,"supports_group_request":false,"supports_marks":false,"supports_timescale_marks":false,"supports_time":true,"exchanges":[{"value":"","name":"All Exchanges","desc":""},{"value":"NasdaqNM","name":"NasdaqNM","desc":"NasdaqNM"},{"value":"NYSE","name":"NYSE","desc":"NYSE"},{"value":"NCM","name":"NCM","desc":"NCM"},{"value":"NGM","name":"NGM","desc":"NGM"}],"symbols_types":[{"name":"All types","value":""},{"name":"Stock","value":"stock"},{"name":"Forex","value":"forex"}],"supported_resolutions":["D","2D","3D","W","3W","M","6M"]};
            var datafeedObj = new Datafeeds.UDFCompatibleDatafeed(url)
            datafeedObj._setupWithConfiguration(obj);
            
            /*TradingView.onready(function()
            {*/
                console.log(selectedCurrency,url)
                
                var widget = new TradingView.widget({
                    fullscreen: true,
                    symbol: selectedCurrency,
                    interval: 'D',
                    container_id: "tv_chart_container",
                    datafeed: datafeedObj,
                    timezone: "America/New_York",
                    library_path: "/assets/charting_library/",
                    locale: "en",
                    drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                    disabled_features: ["header_settings","header_screenshot","header_saveload","use_localstorage_for_settings"],
                    enabled_features: ["study_templates"],
                    charts_storage_url: 'http://saveload.tradingview.com',
                    charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id',
                    toolbar_bg: '#343a40',
                    overrides: {
                        "volumePaneSize": "medium",
                        "paneProperties.background": "#343a40",
                        "paneProperties.vertGridProperties.color": "#454545",
                        "paneProperties.horzGridProperties.color": "#454545",
                        "symbolWatermarkProperties.transparency": 90,
                        "scalesProperties.textColor" : "#AAA",
                        "scalesProperties.backgroundColor": "#343a40"
                    }
                });
            //});
            document.querySelector('#tv_chart_container iframe')['style']['height'] = 'inherit';
        });
    }

    getMinAndMaxPrice(udf_datafeed, time1, time2, callback) {
        var minPrice = 99999, maxPrice = 0;
        var minPriceTime, maxPriceTime;
        udf_datafeed.resolveSymbol("AAPL", function (symbolInfo) {
            udf_datafeed.getBars(symbolInfo, "D", time1, time2, function (bars) {
                bars.forEach(function (bar) {
                    if (bar.time / 1000 >= time1 && bar.time / 1000 <= time2) {
                        if (bar.high > maxPrice) {
                            maxPrice = bar.high;
                            maxPriceTime = bar.time / 1000;
                        }
                        if (bar.low < minPrice) {
                            minPrice = bar.low;
                            minPriceTime = bar.time / 1000;
                        }
                    }
                });
                callback(minPrice, maxPrice, minPriceTime, maxPriceTime);
            },
            function (err) {
            });
        },
        function (err) {
        });
    }

    setActiveTrade(current,my){
        if (current == my) {
              return 'active';
        }
    }

    setActiveClassTrade(name){
       this.isActiveTrade = name;
    }

    setActiveOrder(current,my){
        if (current == my) {
              return 'active';
        }
    }

    setActiveClassOrder(name){
       this.isActiveOrder = name;
    }

    setActiveAlert(current,my){
        if (current == my) {
              return 'active';
        }
    }

    setActiveClassAlert(name){
       this.isActiveAlert = name;
    }

    setActiveChart(current,my){
        if (current == my) {
              return 'active';
        }
    }

    setActiveClassChart(name){
       this.isActiveChart = name;
    }
}