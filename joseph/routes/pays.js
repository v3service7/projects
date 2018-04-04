module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const paypal = require('paypal-rest-sdk');

    /*load Model*/
    let planModel = require("../models/plan.js");

    /*-------------------------------START Pay--------------------------------------------------------*/

    router.post('/', passport.authenticate('jwt', {session:false}), function(req, res){
      const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://34.209.114.118:3000/success",
                "cancel_url": "http://34.209.114.118:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": req.body.name,
                        "price": req.body.amount,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": req.body.amount
                },
                /*"cycles": req.body.month,
                "frequency": "MONTH",
                "frequency_interval": "1",*/
                "description": req.body.name
            }]
        };
        paypal.payment.create(JSON.stringify(create_payment_json), function (error, payment) {
          if (error) {
            console.log(error)
              throw error;
          } else {        
            console.log(payment)
              for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                  res.json({paymentlink : payment.links[i].href});
                }
              }
          }
        });
    });
    
    router.post('/success', passport.authenticate('jwt', {session:false}), function(req, res){
        const payerId = req.body.PayerID;
        const paymentId = req.body.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
               //console.log(error.response);
                throw error;
            } else {
                //console.log(JSON.stringify(payment));
                res.json(JSON.stringify(payment));
            }
        });
    });

    router.get('/cancel', (req, res) => res.send('Cancelled'));
    /*-------------------------------END pay--------------------------------------------------------*/

    return router;
})();