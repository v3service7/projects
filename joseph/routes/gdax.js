module.exports = function (io) {
    const express = require('express');
    const router = express.Router();
    const Gdax = require('gdax');
	const publicClient = new Gdax.PublicClient();
	const apiURI = 'https://api.gdax.com';
	const sandboxURI = 'https://api-public.sandbox.gdax.com';
	const key = '1d99f63dc74ca341181426ffaf7d6856';
	const secret = 'vd+iOLCslyi1kern5HmqjlozISlFdTkD4oJtYIajQ18nXd06wmR0O+730VKRB/17CNvX0TeBkPrtXLPl3huMkQ==';
	const passphrase = 'n91f9yximd';


	router.get('/balances',(req,res)=>{
		const authedClient = new Gdax.AuthenticatedClient(key, secret, passphrase, apiURI );
		authedClient.getAccounts((error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	});

	router.get('/markets',(req,res)=>{
		publicClient.getProducts((error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	});

	router.get('/ticker',(req,res)=>{
        let symbol = req.query.symbol
		publicClient.getProductTicker(symbol,(error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	})

	router.get('/order-book',(req,res)=>{
        let symbol = req.query.symbol
		publicClient.getProductOrderBook(symbol,(error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	})

	router.get('/trade',(req,res)=>{
        let symbol = req.query.symbol
		publicClient.getProductTrades(symbol,(error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	})

	router.get('/history',(req,res)=>{
        let symbol = req.query.symbol
        let start = req.query.from;
        let end = req.query.to;
        //console.log(symbol,start,end)
		publicClient.getProductHistoricRates(symbol,(error, response, data) => {
			console.log(error)
			console.log(data)
		  	arrayModify(data,(status,data)=>{
                if (status) {
                    res.json(data);
                }else{
                    res.json(data);
                }
            });
		});
	})

    router.get('/time', (req,res)=>{
        res.json(Date.now());
    });

    router.get('/symbols', (req,res)=>{
        let symbol = req.query.symbol;
        publicClient.getProduct24HrStats(symbol, function(error, response, data) {
            res.json({'MarketName':symbol,'High':data.high,'Low':data.low,'Volume':data.volume,'Open':data.open,'Close':data.close});
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
                    cusObj['t'].push(history[i][0]);
                    cusObj['c'].push(history[i][4]);
                    cusObj['h'].push(history[i][2]);
                    cusObj['l'].push(history[i][1]);
                    cusObj['v'].push(history[i][5]);
                    cusObj['o'].push(history[i][3]);
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