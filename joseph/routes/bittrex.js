module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    var bittrex = require("./../node_modules/node.bittrex.api/node.bittrex.api.js");
    const APISECRET = 'aa8a9e47dff246a395f33af55570d047';
    const APIKEY = '2e6c90b726e24b1ba145297c6a56240f';
    /* GET home page. */

    io.on("connection", function (socket) {
        var existsocket = Object.keys(io.sockets.sockets);
        console.log('user connected');
        console.log(existsocket);

        /*bittrex API*/
        bittrex.options({
            'apikey': APIKEY,
            'apisecret': APISECRET,
        });
       
    
        bittrex.getmarkets(function (data) {
            socket.emit("allmarketname", {
                error: false,
                list: data
                
            });
        });
        socket.on('marketName', (name) => {      
            bittrex.websockets.client(function () {
                console.log('Websocket connected');
                bittrex.websockets.subscribe(['BTC-LTC'], function (data) {
                    if (data.M === 'updateSummaryState') {
                        data.A.forEach(function (data_for) {
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
                
         
    })
    return router;
}