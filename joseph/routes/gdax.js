module.exports = function (io) {
    const express = require('express');
    const router = express.Router();
    const Gdax = require('gdax');
	const publicClient = new Gdax.PublicClient();

	router.get('/markets',(req,res)=>{
		publicClient.getProducts((error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	})

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
		publicClient.getProductHistoricRates(symbol,(error, response, data) => {
		  	if (error) {
		    	res.json(error);
		  	} else {
		    	res.json(data);
		  	}
		});
	})

    router.get('/time', (req,res)=>{
        res.json(Date.now());
    });

    return router;
}