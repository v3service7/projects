module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    const binance = require('node-binance-api');
	binance.options({
		'APIKEY':'3tBZmj5B643wHy8CZuI9vH3Ad4NWBuW9jbOGuWjQfzaqE8Ikeg4NNLEq6TSzx2yy',
		'APISECRET':'edHmGPi1swwNERvuef4o8WjUe1DcH6km4Iz582QBV9Xo6LZJr7F4l4AIAyNvFmJj'
	});

    router.get('/prices', (req,res)=>{
        binance.prices(function(ticker) {
        	res.json(ticker);
		});
    });

    router.get('/balances', (req,res)=>{
        binance.balance(function(balances) {
        	res.json(balances);
		});
    });

    router.get('/book-tickers', (req,res)=>{
        binance.bookTickers(function(ticker) {
        	res.json(ticker);
		});
    });

    router.get('/depth', (req,res)=>{
    	let symbol = req.query.symbol
        binance.depth(symbol,function(depth, data) {
            res.json({depth, data});
        });
    });

    router.get('/market', (req,res)=>{
        let symbol = req.query.symbol
        console.log(symbol);
        binance.getMarket(symbol,function(data) {
        	res.json({data});
		});
    });



    router.get('/time', (req,res)=>{
            res.json(Date.now());
    });

    router.get('/symbols', (req,res)=>{
        let symbol = req.query.symbol;
        // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        let periods = req.query.periods;
        periods = '1m';
        binance.candlesticks(symbol, periods, function(ticks, symbol) {
            let last_tick = ticks[ticks.length - 1];
            /*console.log(last_tick)*/
            let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
            //console.log(time,last_tick)
            //res.json(last_tick);
            res.json({'MarketName':symbol,'High':high,'Low':low,'Volume':volume,'Open':open,'Close':close});
            
        });
    });

    function arrayModify(history,cb){
        var cusObj = {}
        if (history && history.length > 0){
            cusObj['s'] = 'ok';
            cusObj['t'] = [];
            cusObj['h'] = [];
            cusObj['l'] = [];
            cusObj['c'] = [];
            cusObj['v'] = [];
            cusObj['o'] = [];
            for (var i = 0; i < history.length; i++) {
                cusObj['t'].push(history[i][0]);
                cusObj['c'].push(history[i][4]);
                cusObj['h'].push(history[i][2]);
                cusObj['l'].push(history[i][3]);
                cusObj['v'].push(history[i][5]);
                cusObj['o'].push(history[i][1]);
            }
            cb(true,cusObj)
        }else{
            cusObj['s'] = 'no-data';
            cb(false,cusObj)
        }
    }

    function toTimestamp(strDate){
       var datum = Date.parse(strDate);
       return datum/1000;
    }

    router.get('/history', (req,res)=>{
    	let symbol = req.query.symbol;
    	// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        let periods = req.query.periods;
    	periods = '1m';
        binance.candlesticks(symbol, periods, function(ticks, symbol) {
            if (ticks.length > 0) {
                let last_tick = ticks[ticks.length - 1];
                /*console.log(last_tick)*/
    			let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
                //console.log(time,last_tick)
                //res.json(last_tick);
                //res.json({'high':high,'low':low,'volume':volume,'open':open,'close':close});
            	arrayModify(ticks,(status,data)=>{
                    if (status) {
                        res.json(data);
                    }else{
                        res.json(data);
                    }
                });
            }
		});
    });

    router.get('/stats',(req,res)=>{
        let symbol = req.query.symbol;
        binance.websockets.depth([symbol], function(depth) {
            let {e:eventType, E:eventTime, s:symbol, u:updateId, b:bidDepth, a:askDepth} = depth;
            console.log(symbol+" market update");
            console.log(depth);
            console.log(symbol+" market bid update");
            console.log(bidDepth);
            console.log(symbol+" market ask update");
            console.log(askDepth);
            console.log('----------------------------------')
        });
        /*binance.websockets.candlesticks([symbol], "1m", function(candlesticks) {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            console.log(ticks);
            console.log(symbol+" "+interval+" candlestick update");
            console.log("open: "+open);
            console.log("high: "+high);
            console.log("low: "+low);
            console.log("close: "+close);
            console.log("volume: "+volume);
            console.log("isFinal: "+isFinal);
            console.log("--------------------------------------------------");
        });*/
    });

    return router;
}