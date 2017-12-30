module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    var bittrex = require("./../node_modules/node.bittrex.api/node.bittrex.api.js");
    const APIKEY = '42ac5b5c0f5c431a831c7dc0ae4776cd';
    const APISECRET = '4501a1dc096548e395a652871ad53642';
    /*const APIKEY = '2e6c90b726e24b1ba145297c6a56240f';
    const APISECRET = 'aa8a9e47dff246a395f33af55570d047';*/
    
    /*bittrex API*/
    bittrex.options({
        'apikey': APIKEY,
        'apisecret': APISECRET,
        'baseUrl': 'https://bittrex.com/api/v1.1',
    });

    router.post('/tradesell', (req, res) => {
        bittrex.tradesell({
            MarketName: req.body.marketName,
            OrderType: 'LIMIT',
            Quantity: req.body.quantity,
            Rate: req.body.rate,
            TimeInEffect: 'IMMEDIATE_OR_CANCEL', // supported options are 'IMMEDIATE_OR_CANCEL', 'GOOD_TIL_CANCELLED', 'FILL_OR_KILL'
            ConditionType: 'NONE', // supported options are 'NONE', 'GREATER_THAN', 'LESS_THAN'
            Target: 0, // used in conjunction with ConditionType
        }, function (data, err) {
            if(err){
                res.json({ success: false, message: err , result: ''});
            }
            else{
                res.json({ success: true, message: err, result: data });
            }
        });
    });

    function toTimestamp(strDate){
       var datum = Date.parse(strDate);
       return datum/1000;
    }

    function arrayModify(history,cb){
        var cusObj = {}
        if (history && history.success){
            cusObj['s'] = 'ok';
            cusObj['t'] = [];
            /*cusObj['o'] = [];*/
            cusObj['h'] = [];
            cusObj['l'] = [];
            cusObj['c'] = [];
            cusObj['v'] = [];
            for (var i = 0; i < history['result'].length; i++) {
                cusObj['t'].push(toTimestamp(history['result'][i]['TimeStamp']));
                cusObj['c'].push(history['result'][i]['Last']);
                cusObj['h'].push(history['result'][i]['High']);
                cusObj['l'].push(history['result'][i]['Low']);
                cusObj['v'].push(history['result'][i]['Volume']);
                /*cusObj['t'].push(history['result'][i]['TimeStamp']);
                cusObj['c'].push(history['result'][i]['TimeStamp']);
                cusObj['h'].push(history['result'][i]['Total']);
                cusObj['l'].push(history['result'][i]['Quantity']);
                cusObj['v'].push(history['result'][i]['Price']);*/
            }
            cb(true,cusObj)
        }else{
            cusObj['s'] = 'no-data';
            cb(false,cusObj)
        }
    }

    router.get('/history', (req,res)=>{
        var name = req.query.symbol;
        //bittrex.getmarkethistory({ market: name }, function (history) { 
        bittrex.getmarketsummary({ market: name }, function (history) { 
            arrayModify(history,(status,data)=>{
                if (status) {
                    res.json(data);
                }else{
                    res.json(data);
                }
            })
        });
    });

    router.get('/time', (req,res)=>{
            res.json(Date.now());
    });

    router.get('/symbols', (req,res)=>{
        var name = req.query.symbol;
        bittrex.getmarketsummary({ market: name }, function (summary) {
            if (summary && summary.success) {
                res.json(summary.result[0]);
            }
        });
    });
    return router;
}