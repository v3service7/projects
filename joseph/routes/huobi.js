module.exports = function (io) {
    var express = require('express');
    var request = require('request');
    var hsdk = require('./hsdk');
    var router = express.Router();
    let APIKEY = 'd1d25f34-d4535113-8298508a-ec1ff';
    let APIPRIVATE = 'd8127554-f45fcfda-bfda0ef4-2c808';
    let headers = {'Content-Type':'application/x-www-form-urlencoded'}
    options = {
	    url: '',
	    method: 'GET',
	    json:true,
	    headers: headers
	}


    router.get('/accounts', (req,res)=>{
        hsdk.get_account().then((data)=>{
            res.json(data);
        });
    });

    router.get('/balance', (req,res)=>{
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.get_balance(obj.id).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });

    router.get('/trade-buy-limit', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.buy_limit(symbol, price,quantity ,obj.id).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });

    router.get('/trade-sell-limit', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.sell_limit(symbol, price,quantity ,obj.id).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });

    router.get('/trade-buy', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.buy_limit(symbol, price,quantity ,obj.id).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });

    router.get('/trade-sell', (req,res)=>{
        let symbol = req.query.symbol;
        let quantity = req.query.quantity;
        let price = parseFloat(req.query.price);
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.sell_limit(symbol, price,quantity ,obj.id).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });
    
    router.get('/trade-all-order', (req,res)=>{
        let symbol = req.query.symbol
        hsdk.get_account().then((data1)=>{
            if (data1.length >= 0) {
                let obj = data1[0]
                hsdk.get_open_orders(symbol).then((data)=>{
                    res.json(data);
                });                
            }
        });
    });

    router.get('/history', (req,res)=>{
    	let symbol = req.query.symbol;
        let url = 'https://api.huobi.pro/market/history/kline?period=1day&size=1000&symbol='+symbol.toLowerCase();
        options.url = url;
        request(options, function (error, response, body) {
        	if (response.body.status == 'ok' && response.statusCode == 200) {
	            arrayModify(response.body,(status,data)=>{
	                if (status) {
	                    res.json(data);
	                }else{
	                    res.json(data);
	                }
	            });
            }
        });
    });

    router.get('/time', (req,res)=>{
        res.json(Date.now());
    });

    router.get('/symbols', (req,res)=>{
    	let symbol = req.query.symbol;
        let url = 'https://api.huobi.pro/market/history/kline?period=1day&size=1000&symbol='+symbol.toLowerCase();
        options.url = url;
        request(options, function (error, response, body) {
        	if (response.body.data) {
	        	let obj = response.body.data[0];
	        	res.json({'MarketName':symbol.toUpperCase(),'High':obj.high,'Low':obj.low,'Volume':obj.vol,'Open':obj.open,'Close':obj.close,'minmov':1,'minmov2':0,'pricescale':100,'session':'0930-1630'});
        	}
        });
    });

    function arrayModify(history,cb){
        var cusObj = {}
        if (history['data'] && history['data'].length > 0){
            cusObj['s'] = 'ok';
            cusObj['t'] = [];
            cusObj['h'] = [];
            cusObj['l'] = [];
            cusObj['c'] = [];
            cusObj['v'] = [];
            cusObj['o'] = [];
            for (var i = 0; i < history['data'].length; i++) {
                if (cusObj['t'].length <= 500) {
                    cusObj['t'].push(history['data'][i]['id']);
                    cusObj['c'].push(history['data'][i]['close']);
                    cusObj['h'].push(history['data'][i]['high']);
                    cusObj['l'].push(history['data'][i]['low']);
                    cusObj['v'].push(history['data'][i]['vol']);
                    cusObj['o'].push(history['data'][i]['open']);
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