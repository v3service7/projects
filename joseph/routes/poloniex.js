module.exports = function (io) {
    const express = require('express');
    const router = express.Router();
    let APIKEY = 'WTWUJL4N-ZROHW8ST-JWIHQI2D-9815DBOZ';
    let APISECRET = 'bf19c79d9d93f473286e9e84268609b1d987fef1f922b6552988d0b7e1aa52e15d1385fc46dd99a73eedd424e27596513d6268d10dde03568e9d01556e2f310b';
    const Poloniex = require('./../node_modules/poloniex-api-node/lib/poloniex');
	let poloniex = new Poloniex(APIKEY,APISECRET);
    
	router.get('/coins',(req, res)=>{
		poloniex.returnTicker((err, ticker) => {
		  	if (err) {
		    	res.json(err)
		  	} else {
		    	res.json(ticker)
		  	}
		});
	})

	router.get('/coin-balances',(req, res)=>{
    	let symbol = req.query.symbol
		poloniex.returnBalances((err, ticker) => {
		  	if (err) {
		    	res.json(err)
		  	} else {
		    	res.json(ticker)
		  	}
		});
	})

	router.get('/coin-currency',(req, res)=>{
		poloniex.returnCurrencies((err, ticker) => {
		  	if (err) {
		    	res.json(err)
		  	} else {
		    	res.json(ticker)
		  	}
		});
	});

	router.get('/order-history',(req,res) => {
		let symbol = req.query.symbol;
		poloniex.returnOpenOrders(symbol, (err,data) => {
			if (!err) {
				res.json(data);
			}
		});
	});

    router.get('/time', (req,res)=>{
        res.json(Date.now());
    });

    router.get('/symbols', (req,res)=>{
        let symbol = req.query.symbol;
        poloniex.returnTicker( function(err,data) {
            let obj = data[symbol]
            res.json({'MarketName':symbol,'High':obj.high24hr,'Low':obj.low24hr,'Volume':obj.baseVolume,'Open':obj.lowestAsk,'Close':obj.highestBid});
        });
    });

	router.get('/history',(req, res) => {
		let symbol = req.query.symbol;
        let periods = req.query.periods;
        let start = req.query.from;
        let end = req.query.to;
        periods = '14400';
		poloniex.returnChartData(symbol,periods,start,end, (err,data) => {
			if (!err) {
				arrayModify(data,(status,data)=>{
                    if (status) {
                        res.json(data);
                    }else{
                        res.json(data);
                    }
                });
			}
		});
	});

    router.get('/trade-buy-limit', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        //poloniex.options({'APIKEY':APIKEY,'APISECRET':APISECRET});
        poloniex.buy(symbol, quantity, price, {}, function(trades, symbolData) {
            res.json({trades, symbolData});
        });
    });

    router.get('/trade-sell-limit', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        //binance.options({'APIKEY':APIKEY,'APISECRET':APISECRET});
        poloniex.sell(symbol, quantity, price, function(trades, symbolData) {
            res.json({trades, symbolData});
        });
    });

    router.get('/trade-history', (req,res)=>{
        let symbol = req.query.symbol
        poloniex.returnMyTradeHistory(symbol, function(trades, symbol) {
            res.json({trades, symbol});
        });
    });
    
    router.get('/open-order', (req,res)=>{
        let symbol = req.query.symbol
        //poloniex.options({'APIKEY':APIKEY,'APISECRET':APISECRET});
        poloniex.returnOpenOrders(symbol, function(orders, symbol) {
            res.json(orders);
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
                if (cusObj['t'].length <= 200) {
                    cusObj['t'].push(history[i]['date']);
                    cusObj['c'].push(history[i]['close']);
                    cusObj['h'].push(history[i]['high']);
                    cusObj['l'].push(history[i]['low']);
                    cusObj['v'].push(history[i]['volume']);
                    cusObj['o'].push(history[i]['open']);
                }
            }
            cb(true,cusObj)
        }else{
            cusObj['s'] = 'no-data';
            cb(false,cusObj)
        }
    }

    return router;
}