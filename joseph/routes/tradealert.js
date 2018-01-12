module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let tradeAlertModel = require("../models/tradealerts.js");

    /*-------------------------------START PLAN--------------------------------------------------------*/

    router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
        var response = {};
        tradeAlertModel.find({}, null, { sort: { created_at: 1 } }, function(err, tradeAlerts) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": tradeAlerts };
            };
            res.json(response);
        });
    });

    router.post('/', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        var tradeAlert = new tradeAlertModel(req.body);
        tradeAlert.save(function(err, tradeAlert) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": tradeAlert };
            }
            res.json(response);
        });
    });

    router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        tradeAlertModel.findByIdAndUpdate(req.params.id, req.body, function(err, tradeAlert) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": tradeAlert };
            }
            res.json(response);
        });
    });

    router.get('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        tradeAlertModel.find({userId:req.params.id}, function(err, tradeAlert) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": tradeAlert };
            };
            res.json(response);
        });
    });

    router.delete('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        tradeAlertModel.remove({ _id: req.params.id }, function(err, tradeAlert) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": tradeAlert };
            };
            res.json(response);
        });
    });

    /*-------------------------------END PLAN--------------------------------------------------------*/

    return router;
})();