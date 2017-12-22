import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BittrexService } from './../../services/bittrex.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
declare var $: any;
declare var TradingView: any;
declare var window: { tvWidget };
declare var Datafeeds: any;
import * as globalVariable from "../../global";

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
    btcList: any;
    ethList: any;
    usdtList: any;
    chooseCurrency: any;
    BuySellCurrency: any;
    chooseMarket: any;
    form1: FormGroup;

    constructor(
        private bittrexService: BittrexService,
        private fb: FormBuilder,
        public userService:UserService,
        private router:Router,
        private flashMessage:FlashMessagesService
    ) {}

    ngOnInit() {
        this.chooseCurrency = 'BTC-ADT';
        this.BuySellCurrency = 'ADT';
        this.chooseMarket = 'Bittrex';

        document.body.style.backgroundImage =
        'url("./../../../assets/frontend/img/bg.png")';
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.paddingTop = "80px";
        this.bittrexService.getMarketName(this.chooseCurrency);
        this.getCurrency();
        this.getMarkets();
        this.getMarketSummary();
        this.getMarketHistory();
        //this.chartLoad(this.allMarketHistory,this.chooseCurrency);
        this.bittrexService.tradeSell().subscribe((data) => {
            console.log(data)
        });
    }

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

    getMarketSummary(){
        this.bittrexService.getMarketSummary().subscribe((data) => {
            if (data['error'] == false && data['list']!=null){
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
            if (data['error'] == false && data['list'] != null) {
                this.allMarketHistory = data['list'].result;
                //this.chartLoad(this.allMarketHistory,this.chooseCurrency);
                //console.log(this.allMarketHistory)
                var sellmarket = [];
                var buymarket = [];
                for (let i = 0; i < data['list'].result.length; i++) {
                    if (data['list'].result[i].OrderType == 'BUY') {
                        buymarket.push(data['list'].result[i]);
                        /* console.log(data['list'].result[i].Price)
                        console.log(data['list'].result[i].TimeStamp) */
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

    currencySelected(currencyName: any) {
        this.bittrexService.getMarketName(currencyName);
        this.chooseCurrency=currencyName;
        this.BuySellCurrency = currencyName.split('-')[1];
        //this.chartLoad(this.allMarketHistory,this.chooseCurrency);
        /*console.log(currencyName)
        console.log(this.BuySellCurrency)*/
    }

    marketSelected(marketName: any) {
        console.log(marketName)
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

    chartLoad(allData,selectedCurrency){
        $(document).ready(function(){
            //console.log(allData)
            var feedUrl = globalVariable.url;
            var feedUrl = "https://demo_feed.tradingview.com";
            var obj = {"supports_search":true,"supports_group_request":false,"supports_marks":true,"supports_timescale_marks":true,"supports_time":true,"exchanges":[{"value":"","name":"All Exchanges","desc":""},{"value":"NasdaqNM","name":"NasdaqNM","desc":"NasdaqNM"},{"value":"NYSE","name":"NYSE","desc":"NYSE"},{"value":"NCM","name":"NCM","desc":"NCM"},{"value":"NGM","name":"NGM","desc":"NGM"}],"symbols_types":[{"name":"All types","value":""},{"name":"Stock","value":"stock"},{"name":"Forex","value":"forex"}],"supported_resolutions":["D","2D","3D","W","3W","M","6M"]};
            var datafeedObj = new Datafeeds.UDFCompatibleDatafeed(feedUrl)
            datafeedObj._setupWithConfiguration(obj);
            
            TradingView.onready(function()
            {
                var widget = new TradingView.widget({
                    fullscreen: true,
                    symbol: 'AA',
                    interval: 'D',
                    container_id: "tv_chart_container",
                    datafeed: datafeedObj,
                    library_path: "/assets/charting_library/",
                    locale: "en",
                    drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                    disabled_features: ["header_widget", "left_toolbar", "use_localstorage_for_settings"],
                    enabled_features: ["study_templates"],
                    charts_storage_url: 'http://saveload.tradingview.com',
                    charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id'
                });
            });
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
}

