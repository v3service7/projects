module.exports = function (io) {
    var express = require('express');

    let tradealertModel = require("../models/tradealerts.js");

    /* Bittrex Configuration*/
    var bittrex = require("./../node_modules/node.bittrex.api/node.bittrex.api.js");
    const APIKEY = '42ac5b5c0f5c431a831c7dc0ae4776cd';
    const APISECRET = '4501a1dc096548e395a652871ad53642';
    bittrex.options({
        'apikey': APIKEY,
        'apisecret': APISECRET,
        'baseUrl': 'https://bittrex.com/api/v1.1',
    });

    function tradeAlertCheck(name,price,cb){
        //console.log(name,price)
        tradealertModel.find({},function(err,tradealerts){
            let list = tradealerts.filter((item) => {return (item['exchangeMarket'] == name) && (item['alertPrice'] == price);});
            cb(list);
        });
    }

    /* Binance Configuration*/
    const binance = require('node-binance-api');
    binance.options({
        'APIKEY':'3tBZmj5B643wHy8CZuI9vH3Ad4NWBuW9jbOGuWjQfzaqE8Ikeg4NNLEq6TSzx2yy',
        'APISECRET':'edHmGPi1swwNERvuef4o8WjUe1DcH6km4Iz582QBV9Xo6LZJr7F4l4AIAyNvFmJj'
    });

    /* Poloniex Configuration*/
    const Poloniex = require('./../node_modules/poloniex-api-node/lib/poloniex');;
    let poloniex = new Poloniex('34YVWM7V-FH54N6DW-4B1N3RWJ-ZPSPVF3P','c476e2218191ffdd8f92cf9eca3aafdc4ea7e1615ea4f2213fd443984f3b3ee07a5a79f63759a655d1ee6eab716054b8e9cb64256b263b81eb3b86ff920d9aa1');
    
    /* Gdax Configuration*/
    const Gdax = require('gdax');
    const publicClient = new Gdax.PublicClient();
    
	
    io.on("connection", function (socket) {
        var existsocket = Object.keys(io.sockets.sockets);
        console.log('user connected');
        console.log(existsocket);

        /* START BITTREX WEB SOCKET */
        socket.on('marketName', (name) => {
            bittrex.websockets.client(function () {
                bittrex.websockets.subscribe([name], function (data) {
                    if (data.M === 'updateExchangeState') {
                        data.A.forEach(function (data_for) {
                            bittrex.getmarketsummaries(function (data) {                           
                                 socket.emit("allCurrency", {
                                     error: false,
                                     list: data
                                 });                               
                            });

                            bittrex.getmarketsummary({ market: name }, function (summary) {
                                socket.emit("getmarketsummary", {
                                    error: false,
                                    list: summary
                                });
                            });

                            bittrex.getmarkethistory({ market: name }, function (history) {                                
                                socket.emit("getmarkethistory", {
                                    error: false,
                                    list: history
                                });
                            });
                        });
                    }
                });
            });
        });         
        /* END BITTREX WEB SOCKET */

        /* START BINANCE WEB SOCKET */
        socket.on('binanceMarketName', (name) => {
            binance.websockets.candlesticks([name], "1m", function(candlesticks) {
	            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
	            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
	            //console.log(ticks);
	            let obj = {'open':open,'close':close,'high':high,'low':low,'volume':volume};
	            socket.emit("binanceMarketSummary", {
                    error: false,
                    list: obj
                });

                /*binance.depth(name,function(depth, data) {
                	socket.emit("binanceMarketHistory", {
	                    error: false,
	                    list: depth
	                });
		        });*/

                tradeAlertCheck(name,obj['open'],function(data){
                    socket.emit("binanceAlert", {error: false,list: data});
                });
	        });
            binance.websockets.depth([name], (depth) => {
              //let {e:eventType, E:eventTime, s:symbol, u:updateId, b:bidDepth, a:askDepth} = depth;
                    /*console.log(" market depth update");
                    console.log(depth);*/
                    socket.emit("binanceMarketHistory", {
                        error: false,
                        list: depth
                    });
            });
        });
        /* END BINANCE WEB SOCKET */

        /* START POLONIEX WEB SOCKET */
        socket.on('poloniexMarketName', (name) => {
            poloniex.on('open', () => {
              console.log(`Poloniex WebSocket connection open`);
            });
            poloniex.subscribe(name);
            poloniex.on('message', (channelName, data, seq) => {
                if (channelName === name) {
                    poloniex.returnTicker((err, ticker) => {
                        if (!err) {
                            socket.emit("poloniexMarketSummary", {
                                error: false,
                                list: ticker
                            });
                        }
                    });
                    if (data[0]['type'] == 'orderBook') {

                        console.log('----------------------------')
                        console.log(data[0])
                        console.log('----------------------------')
                        socket.emit("poloniexMarketHistory", {
                            error: false,
                            list: data[0]['data']
                        });
                    }
                }
            });

            poloniex.on('close', (reason, details) => {
              console.log(`Poloniex WebSocket connection disconnected`);
            });

            poloniex.on('error', (error) => {
              console.log(`An error has occured`);
            });

            poloniex.openWebSocket({ version: 2 });
        });
        /* END POLONIEX WEB SOCKET */

        /* START GDAX WEB SOCKET */

        socket.on('gdaxMarketName', (name) => {
            const websocket = new Gdax.WebsocketClient([name]);

            websocket.on('message', data => {
                if (data['type'] == 'subscriptions') {
                console.log(data)
                console.log(data['channels'])
                console.log('---------------------------------')

                }
                /*publicClient.getProductTicker(name,(error, response, data) => {
                    if (error == null ) {
                    console.log('---------gdaxMarketSummary---------')
                    console.log(error)
                    console.log(response)
                    console.log(data)
                        socket.emit("gdaxMarketSummary", {
                            error: false,
                            list: data
                        });
                    }
                });

                publicClient.getProductTrades(name,(error, response, data) => {
                    if (error == null) {
                    console.log('---------gdaxMarketHistory---------')
                    console.log(error)
                    console.log(data)
                        socket.emit("gdaxMarketHistory", {
                            error: false,
                            list: data
                        });
                    }
                });*/
            });
            websocket.on('error', err => { /* handle error */ });
            websocket.on('close', () => { /* ... */ });
        });
    });
}