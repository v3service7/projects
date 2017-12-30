module.exports = function (io) {
    var express = require('express');

    /* Bittrex Configuration*/
    var bittrex = require("./../node_modules/node.bittrex.api/node.bittrex.api.js");
    const APIKEY = '42ac5b5c0f5c431a831c7dc0ae4776cd';
    const APISECRET = '4501a1dc096548e395a652871ad53642';
    bittrex.options({
        'apikey': APIKEY,
        'apisecret': APISECRET,
        'baseUrl': 'https://bittrex.com/api/v1.1',
    });

    /* Binance Configuration*/
    const binance = require('node-binance-api');
	binance.options({
		'APIKEY':'3tBZmj5B643wHy8CZuI9vH3Ad4NWBuW9jbOGuWjQfzaqE8Ikeg4NNLEq6TSzx2yy',
		'APISECRET':'edHmGPi1swwNERvuef4o8WjUe1DcH6km4Iz582QBV9Xo6LZJr7F4l4AIAyNvFmJj'
	});

    io.on("connection", function (socket) {
        var existsocket = Object.keys(io.sockets.sockets);
        console.log('user connected');
        console.log(existsocket);

        /* START BITTREX WEB SOCKET */
        socket.on('marketName', (name) => {
            bittrex.websockets.client(function () {
                bittrex.websockets.subscribe(['BTC-LTC'], function (data) {
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

                binance.depth(name,function(depth, data) {
                	socket.emit("binanceMarketHistory", {
	                    error: false,
	                    list: depth
	                });
		        });
	            /*console.log(symbol+" "+interval+" candlestick update");
	            console.log("open: "+open);
	            console.log("high: "+high);
	            console.log("low: "+low);
	            console.log("close: "+close);
	            console.log("volume: "+volume);
	            console.log("isFinal: "+isFinal);
	            console.log("--------------------------------------------------");*/
	        });
        });
        /* END BINANCE WEB SOCKET */
    });
}