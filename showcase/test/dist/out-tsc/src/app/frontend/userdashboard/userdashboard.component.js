"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bittrex_service_1 = require("./../../services/bittrex.service");
var binance_service_1 = require("./../../services/binance.service");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../../services/user.service");
var tradealert_service_1 = require("../../services/tradealert.service");
var router_1 = require("@angular/router");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var globalVariable = require("../../global");
var UserdashboardComponent = (function () {
    function UserdashboardComponent(bittrexService, binanceService, tradeAlertService, fb, userService, router, flashMessage) {
        this.bittrexService = bittrexService;
        this.binanceService = binanceService;
        this.tradeAlertService = tradeAlertService;
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.multiple0 = false;
        this.multiple1 = true;
        this.options0 = [];
        this.options1 = [];
        this.alertList = [];
        this.alertListTemp = [];
        this.openOrders = [];
        this.closeOrders = [];
        this.buyBalanceStats = [];
        this.sellBalanceStats = [];
        this.balanceStatPercent = [1, 5, 10, 25, 50, 75];
        this.isActiveTrade = 'limit';
        this.isActiveOrder = 'open';
        this.isActiveAlert = 'data';
        this.isActiveChart = 'chart';
    }
    UserdashboardComponent.prototype.ngOnInit = function () {
        this.alertFilter = { 'exchangeName': 'All', 'exchangeMarket': 'All', 'isOpen': true };
        this.chooseCurrency = localStorage.getItem('currency');
        this.BuySellCurrency = localStorage.getItem('coin');
        this.chooseMarket = localStorage.getItem('market');
        this.alertForm = this.fb.group({
            exchangeName: ['', forms_1.Validators.required],
            exchangeMarket: ['', forms_1.Validators.required],
            alertPrice: ['', forms_1.Validators.required],
            userId: ['', forms_1.Validators.required],
            notes: [''],
            sound: [''],
        });
        this.tradeBuyLimitForm = this.fb.group({
            spend: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            buy: ['', forms_1.Validators.required]
        });
        this.tradeSellLimitForm = this.fb.group({
            sell: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            receive: ['', forms_1.Validators.required]
        });
        this.tradeBuyForm = this.fb.group({
            spend: ['', forms_1.Validators.required],
            buy: ['', forms_1.Validators.required]
        });
        this.tradeSellForm = this.fb.group({
            sell: ['', forms_1.Validators.required],
            receive: ['', forms_1.Validators.required]
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
        this.loadAllFun();
    };
    UserdashboardComponent.prototype.setActiveTrade = function (current, my) {
        if (current == my) {
            return 'active';
        }
    };
    UserdashboardComponent.prototype.setActiveClassTrade = function (name) {
        this.isActiveTrade = name;
    };
    UserdashboardComponent.prototype.setActiveOrder = function (current, my) {
        if (current == my) {
            return 'active';
        }
    };
    UserdashboardComponent.prototype.setActiveClassOrder = function (name) {
        this.isActiveOrder = name;
    };
    UserdashboardComponent.prototype.setActiveAlert = function (current, my) {
        if (current == my) {
            return 'active';
        }
    };
    UserdashboardComponent.prototype.setActiveClassAlert = function (name) {
        this.isActiveAlert = name;
    };
    UserdashboardComponent.prototype.setActiveChart = function (current, my) {
        if (current == my) {
            return 'active';
        }
    };
    UserdashboardComponent.prototype.setActiveClassChart = function (name) {
        this.isActiveChart = name;
    };
    UserdashboardComponent.prototype.setAlert = function () {
        var _this = this;
        this.tradeAlertService.tradeAlertAdd(this.alertForm.value).subscribe(function (data) {
            if (!data.error) {
                _this.flashMessage.show('Alert set Sucessfully', { cssClass: 'alert-success', timeout: 3000 });
                _this.myAlertList();
                _this.alertForm.reset();
            }
        });
    };
    UserdashboardComponent.prototype.myAlertList = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('user'));
        this.alertForm.controls['exchangeName'].setValue(this.chooseMarket);
        this.alertForm.controls['exchangeMarket'].setValue(this.chooseCurrency);
        this.alertForm.controls['userId'].setValue(user['_id']);
        this.tradeAlertService.tradeAlertList(user['_id']).subscribe(function (data) {
            _this.alertList = data['message'];
            _this.alertListTemp = data['message'];
        });
        this.binanceService.getAlertNotify().subscribe(function (data) {
            var arr = data['list'];
            if (arr.length > 0) {
                var myAlert = arr.filter(function (item) { return item['userId'] == user['_id']; });
                _this.alertNotice = myAlert[0];
                _this.alertNotice['isOpen'] = false;
                _this.tradeAlertService.tradeAlertUpdate(_this.alertNotice).subscribe(function (data) {
                    if (!data.error) {
                        _this.myAlertList();
                    }
                });
            }
        });
    };
    UserdashboardComponent.prototype.alertListFilter = function (type, data) {
        var _this = this;
        this.alertList = this.alertListTemp;
        var alertLis = [];
        if (type == 'exchange') {
            this.alertFilter['exchangeName'] = data;
            if (this.alertFilter['exchangeName'] != 'all') {
                alertLis = this.alertList.filter(function (item) {
                    return item['exchangeName'] == _this.alertFilter['exchangeName'];
                });
            }
            else {
                alertLis = this.alertListTemp;
            }
        }
        if (type == 'market') {
            this.alertFilter['exchangeMarket'] = data;
            if (this.alertFilter['exchangeMarket'] != 'all') {
                alertLis = this.alertList.filter(function (item) {
                    return item['exchangeMarket'] == _this.alertFilter['exchangeMarket'];
                });
            }
            else {
                alertLis = this.alertListTemp;
            }
        }
        if (type == 'alert') {
            this.alertFilter['isOpen'] = data;
            alertLis = this.alertList.filter(function (item) {
                return item['isOpen'] == _this.alertFilter['isOpen'];
            });
        }
        this.alertList = alertLis;
    };
    UserdashboardComponent.prototype.tradeBuyLimit = function () {
        var _this = this;
        this.binanceService.buyLimit(this.chooseCurrency, this.tradeBuyLimitForm.value).subscribe(function (data) {
            if (typeof data.code !== 'undefined') {
                _this.flashMessage.show('Trade Buy Sucessfully', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.tradeBuyLimitForm.reset();
            _this.binanceOpenOrder();
        });
    };
    UserdashboardComponent.prototype.tradeBuy = function () {
        var _this = this;
        this.binanceService.buy(this.chooseCurrency, this.tradeBuyForm.value).subscribe(function (data) {
            if (typeof data.code !== 'undefined') {
                _this.flashMessage.show('Trade Buy Sucessfully', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.tradeBuyForm.reset();
            _this.binanceOpenOrder();
        });
    };
    UserdashboardComponent.prototype.tradeSellLimit = function () {
        var _this = this;
        this.binanceService.sellLimit(this.chooseCurrency, this.tradeSellLimitForm.value).subscribe(function (data) {
            if (typeof data.code !== 'undefined') {
                _this.flashMessage.show('Trade Sell Sucessfully', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.tradeSellLimitForm.reset();
            _this.binanceOpenOrder();
        });
    };
    UserdashboardComponent.prototype.tradeSell = function () {
        var _this = this;
        this.binanceService.sell(this.chooseCurrency, this.tradeSellForm.value).subscribe(function (data) {
            if (typeof data.code !== 'undefined') {
                _this.flashMessage.show('Trade Sell Sucessfully', { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.tradeSellForm.reset();
            _this.binanceOpenOrder();
        });
    };
    UserdashboardComponent.prototype.tradeBuyPriceSet = function (type, data) {
        if (type == 'limit') {
            this.tradeBuyLimitForm.controls['price'].setValue(data);
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'], this.tradeBuyLimitForm.value['spend']));
        }
        else {
            this.tradeBuyForm.controls['price'].setValue(data);
        }
    };
    UserdashboardComponent.prototype.quntityCalculate = function (price, amount) {
        var quantity = amount / price;
        if (isNaN(quantity) || (quantity == Infinity)) {
            quantity = 0;
        }
        return quantity.toFixed(2);
    };
    UserdashboardComponent.prototype.quntitySellCalculate = function (price, amount) {
        var quantity = amount * price;
        if (isNaN(quantity) || (quantity == Infinity)) {
            quantity = 0;
        }
        console.log(quntitySellCalculatequntitySellCalculate);
        return quantity.toFixed(2);
    };
    UserdashboardComponent.prototype.onBlurQuntityCalculate = function (type) {
        if (type == 'buy') {
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'], this.tradeBuyLimitForm.value['spend']));
        }
        else {
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'], this.tradeSellLimitForm.value['sell']));
        }
    };
    UserdashboardComponent.prototype.tradeBuySpendSet = function (type, amount) {
        if (type == 'limit') {
            this.tradeBuyLimitForm.controls['spend'].setValue(amount);
            this.tradeBuyLimitForm.controls['buy'].setValue(this.quntityCalculate(this.tradeBuyLimitForm.value['price'], this.tradeBuyLimitForm.value['spend']));
        }
        else {
            this.tradeBuyForm.controls['spend'].setValue(amount);
            this.tradeBuyForm.controls['buy'].setValue(this.quntityCalculate(this.low, amount));
        }
    };
    UserdashboardComponent.prototype.tradeSellPriceSet = function (type, data) {
        if (type == 'limit') {
            this.tradeSellLimitForm.controls['price'].setValue(data);
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'], this.tradeSellLimitForm.value['sell']));
        }
        else {
            this.tradeSellForm.controls['price'].setValue(data);
        }
    };
    UserdashboardComponent.prototype.tradeSellSpendSet = function (type, amount) {
        if (type == 'limit') {
            this.tradeSellLimitForm.controls['sell'].setValue(amount);
            this.tradeSellLimitForm.controls['receive'].setValue(this.quntitySellCalculate(this.tradeSellLimitForm.value['price'], this.tradeSellLimitForm.value['spend']));
        }
        else {
            this.tradeSellForm.controls['sell'].setValue(amount);
            this.tradeSellForm.controls['receive'].setValue(this.quntitySellCalculate(this.low, amount));
        }
    };
    UserdashboardComponent.prototype.loadAllFun = function () {
        this.myAlertList();
        if (this.chooseMarket == 'Binance') {
            console.log('----Binance---');
            this.chartUrl = globalVariable.url + 'binance';
            this.binanceService.reConnect();
            this.binanceService.getMarketName(this.chooseCurrency);
            this.getBinanceCurrency();
            this.getBinanceMarketSummary();
            this.getBinanceMarketHistory();
            this.binanceOpenOrder();
            this.binanceTradeBalance();
            this.chartLoad(this.chooseCurrency, this.chartUrl);
        }
        if (this.chooseMarket == 'Bittrex') {
            console.log('----------------Bittrex');
            this.chartUrl = globalVariable.url + 'bittrexApi';
            this.binanceService.reConnect();
            this.bittrexService.getMarketName(this.chooseCurrency);
            this.getCurrency();
            this.getMarketSummary();
            this.getMarketHistory();
            this.chartLoad(this.chooseCurrency, this.chartUrl);
        }
    };
    UserdashboardComponent.prototype.getMarkets = function () {
        var _this = this;
        this.bittrexService.getMarkets().subscribe(function (data) {
            var markets = [];
            if (data['error'] == false) {
                for (var i = 0; i < data.message.length; i++) {
                    markets.push(data.message[i].exchangeapiName);
                }
                _this.markets = markets;
            }
        });
    };
    UserdashboardComponent.prototype.binanceTradeBalance = function () {
        var _this = this;
        this.binanceService.getBalance().subscribe(function (data) {
            var currencyName = _this.chooseCurrency;
            var substring = currencyName.substr(-3);
            if (substring == "BTC") {
                _this.buySellCat = substring;
                _this.BuySellCurrency = _this.chooseCurrency.replace(_this.buySellCat, '');
            }
            if (substring == "ETH") {
                _this.buySellCat = substring;
                _this.BuySellCurrency = _this.chooseCurrency.replace(_this.buySellCat, '');
            }
            if (currencyName.substr(-4) == "USDT") {
                _this.buySellCat = currencyName.substr(-4);
                _this.BuySellCurrency = _this.chooseCurrency.replace(_this.buySellCat, '');
            }
            _this.buyBalance = data[_this.buySellCat];
            _this.sellBalance = data[_this.BuySellCurrency];
            _this.sellBalanceStats = [];
            _this.buyBalanceStats = [];
            for (var i = 0; i < _this.balanceStatPercent.length; ++i) {
                var amount = (_this.buyBalance['available'] * _this.balanceStatPercent[i]) / 100;
                _this.buyBalanceStats.push({ 'label': _this.balanceStatPercent[i] + '% (' + amount.toFixed(5) + ')', 'amount': amount.toFixed(5) });
                var amount1 = (_this.sellBalance['available'] * _this.balanceStatPercent[i]) / 100;
                _this.sellBalanceStats.push({ 'label': _this.balanceStatPercent[i] + '% (' + amount1.toFixed(5) + ')', 'amount': amount1.toFixed(5) });
            }
        });
    };
    UserdashboardComponent.prototype.binanceOpenOrder = function () {
        var _this = this;
        this.binanceService.getOpenOrder(this.chooseCurrency).subscribe(function (data) {
            _this.openOrders = [];
            _this.closeOrders = [];
            if (data['orders'].length > 0) {
                _this.openOrders = data['orders'].filter(function (item) { return item['status'] == 'NEW'; });
                _this.closeOrders = data['orders'].filter(function (item) { return item['status'] == 'FILLED'; });
            }
        }, function (err) {
            console.log(err);
        });
    };
    UserdashboardComponent.prototype.getBinanceCurrency = function () {
        var _this = this;
        this.binanceService.getCurrency().subscribe(function (data) {
            var btclist = [];
            var ethlist = [];
            var usdtlist = [];
            for (var property in data) {
                var substring = property.substr(-3);
                if (substring == "BTC") {
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    btclist.push(obj);
                }
                if (substring == "ETH") {
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    ethlist.push(obj);
                }
                if (property.substr(-4) == "USDT") {
                    var obj = {};
                    obj['MarketName'] = property;
                    obj['Last'] = data[property];
                    usdtlist.push(obj);
                }
            }
            _this.btcList = btclist;
            _this.ethList = ethlist;
            _this.usdtList = usdtlist;
        });
    };
    UserdashboardComponent.prototype.getCurrency = function () {
        var _this = this;
        this.bittrexService.getCurrency().subscribe(function (data) {
            if (data['error'] == false && data['list'] != null) {
                var numOptions = data['list'].result;
                var opts = new Array(numOptions);
                var btclist = [];
                var ethlist = [];
                var usdtlist = [];
                for (var i = 0; i < numOptions.length; i++) {
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
                _this.btcList = btclist;
                _this.ethList = ethlist;
                _this.usdtList = usdtlist;
            }
        });
    };
    UserdashboardComponent.prototype.getBinanceMarketSummary = function () {
        var _this = this;
        this.binanceService.getMarketSummary().subscribe(function (data) {
            if (data['error'] == false && data['list'] != null) {
                _this.high = data['list'].high;
                _this.low = data['list'].low;
                _this.vol = data['list'].volume;
                _this.ask = data['list'].open;
                _this.bid = data['list'].close;
                _this.alertForm.controls['alertPrice'].setValue(_this.ask);
            }
        });
    };
    UserdashboardComponent.prototype.getMarketSummary = function () {
        var _this = this;
        this.bittrexService.getMarketSummary().subscribe(function (data) {
            if (data['error'] == false && data['list'] != null) {
                _this.high = data['list'].result[0].High;
                _this.low = data['list'].result[0].Low;
                _this.vol = data['list'].result[0].Volume;
                _this.ask = data['list'].result[0].Ask;
                _this.bid = data['list'].result[0].Bid;
                _this.alertForm.controls['alertPrice'].setValue(_this.ask);
            }
        });
    };
    UserdashboardComponent.prototype.getBinanceMarketHistory = function () {
        var _this = this;
        this.binanceService.getMarketHistory().subscribe(function (data) {
            if (data['error'] == false && data['list'] != null) {
                _this.allMarketHistory = [];
                var sellmarket = [];
                var buymarket = [];
                for (var key in data['list']['bids']) {
                    var total = parseFloat(data['list']['bids'][key]) * parseFloat(key);
                    var obj = { 'Price': key, 'Quantity': data['list']['bids'][key], 'Total': total };
                    var allObj = { 'Price': key, 'Quantity': data['list']['bids'][key], 'TimeStamp': total, 'OrderType': 'BUY' };
                    buymarket.push(obj);
                    if (buymarket.length <= 10) {
                        _this.allMarketHistory.push(allObj);
                    }
                }
                for (var key in data['list']['asks']) {
                    var total = parseFloat(data['list']['asks'][key]) * parseFloat(key);
                    var obj = { 'Price': key, 'Quantity': data['list']['asks'][key], 'Total': total };
                    var allObj = { 'Price': key, 'Quantity': data['list']['asks'][key], 'TimeStamp': total, 'OrderType': 'SELL' };
                    sellmarket.push(obj);
                    if (sellmarket.length <= 10) {
                        _this.allMarketHistory.push(allObj);
                    }
                }
                _this.buyMarketHistory = buymarket;
                _this.sellMarketHistory = sellmarket;
            }
        });
    };
    UserdashboardComponent.prototype.getMarketHistory = function () {
        var _this = this;
        this.bittrexService.getMarketHistory().subscribe(function (data) {
            if (data['error'] == false && data['list'] != null) {
                _this.allMarketHistory = data['list'].result;
                //this.chartLoad(this.allMarketHistory,this.chooseCurrency);
                //console.log(this.allMarketHistory)
                var sellmarket = [];
                var buymarket = [];
                for (var i = 0; i < data['list'].result.length; i++) {
                    if (data['list'].result[i].OrderType == 'BUY') {
                        buymarket.push(data['list'].result[i]);
                    }
                    if (data['list'].result[i].OrderType == 'SELL') {
                        sellmarket.push(data['list'].result[i]);
                    }
                }
                _this.buyMarketHistory = buymarket;
                _this.sellMarketHistory = sellmarket;
            }
        });
    };
    UserdashboardComponent.prototype.currencySelected = function (currencyName) {
        localStorage.setItem('currency', currencyName);
        this.chooseCurrency = localStorage.getItem('currency');
        localStorage.setItem('coin', this.chooseCurrency.split('-')[1]);
        this.BuySellCurrency = localStorage.getItem('coin');
        localStorage.setItem('market', this.chooseMarket);
        this.chooseMarket = localStorage.getItem('market');
        this.loadAllFun();
        //this.chartLoad(this.chooseCurrency,this.chartUrl)
        /*console.log(currencyName)
        console.log(this.BuySellCurrency)*/
    };
    UserdashboardComponent.prototype.marketSelected = function (marketName) {
        this.chooseMarket = marketName;
        this.loadAllFun();
    };
    UserdashboardComponent.prototype.onLogoutClick = function () {
        this.userService.logout();
        this.flashMessage.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
    };
    UserdashboardComponent.prototype.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    UserdashboardComponent.prototype.chartLoad = function (selectedCurrency, url) {
        //console.log(selectedCurrency,url)
        $(document).ready(function () {
            var obj = { "supports_search": true, "supports_group_request": false, "supports_marks": false, "supports_timescale_marks": false, "supports_time": true, "exchanges": [{ "value": "", "name": "All Exchanges", "desc": "" }, { "value": "NasdaqNM", "name": "NasdaqNM", "desc": "NasdaqNM" }, { "value": "NYSE", "name": "NYSE", "desc": "NYSE" }, { "value": "NCM", "name": "NCM", "desc": "NCM" }, { "value": "NGM", "name": "NGM", "desc": "NGM" }], "symbols_types": [{ "name": "All types", "value": "" }, { "name": "Stock", "value": "stock" }, { "name": "Forex", "value": "forex" }], "supported_resolutions": ["D", "2D", "3D", "W", "3W", "M", "6M"] };
            var datafeedObj = new Datafeeds.UDFCompatibleDatafeed(url);
            datafeedObj._setupWithConfiguration(obj);
            /*TradingView.onready(function()
            {*/
            console.log(selectedCurrency, url);
            var widget = new TradingView.widget({
                fullscreen: true,
                symbol: selectedCurrency,
                interval: 'D',
                container_id: "tv_chart_container",
                datafeed: datafeedObj,
                timezone: "America/New_York",
                library_path: "/assets/charting_library/",
                locale: "en",
                drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
                disabled_features: ["header_settings", "header_screenshot", "header_saveload", "use_localstorage_for_settings"],
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
                    "scalesProperties.textColor": "#AAA",
                    "scalesProperties.backgroundColor": "#343a40"
                }
            });
            //});
            document.querySelector('#tv_chart_container iframe')['style']['height'] = 'inherit';
        });
    };
    UserdashboardComponent.prototype.getMinAndMaxPrice = function (udf_datafeed, time1, time2, callback) {
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
            }, function (err) {
            });
        }, function (err) {
        });
    };
    return UserdashboardComponent;
}());
UserdashboardComponent = __decorate([
    core_1.Component({
        selector: "app-userdashboard",
        templateUrl: "./userdashboard.component.html",
        styleUrls: ["./userdashboard.component.css"]
    }),
    __metadata("design:paramtypes", [bittrex_service_1.BittrexService,
        binance_service_1.BinanceService,
        tradealert_service_1.TradeAlertService,
        forms_1.FormBuilder,
        user_service_1.UserService,
        router_1.Router,
        angular2_flash_messages_1.FlashMessagesService])
], UserdashboardComponent);
exports.UserdashboardComponent = UserdashboardComponent;
//# sourceMappingURL=userdashboard.component.js.map