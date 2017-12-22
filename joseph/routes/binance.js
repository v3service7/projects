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
        binance.depth(symbol,function(depth, symbol) {
        	res.json({depth, symbol});
		});
    });

    router.get('/market', (req,res)=>{
    	let symbol = req.query.symbol
        binance.getMarket(symbol,function(symbol) {
        	res.json({symbol});
		});
    });

    router.get('/history', (req,res)=>{
    	let symbol = req.query.symbol;
    	// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    	let periods = req.query.periods;
        binance.candlesticks(symbol, periods, function(ticks, symbol) {
        	let last_tick = ticks[ticks.length - 1];
			let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        	res.json({last_tick,ticks, symbol});
		});
    });

    return router;
}