const express = require('express');
const router = express.Router();
const passport = require('passport');
let panicModel = require("../models/panic.js");

router.get('/', function(req, res, next) {
    var response = {};
    panicModel.find({}, null, { sort: { created_at: 1 } }).exec(function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
}); 

router.get('/pending', function(req, res, next) {
    var response = {};
    console.log(new Date());
    console.log(new Date(Date.now() - 2*60*60 * 1000));
    panicModel.find({status:0, "panic_at": {$gt: new Date(Date.now() - 2*60*60 * 1000)}}, null, { sort: { created_at: 1 } }).exec(function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});    

router.post('/', function(req, res) {
    var response = {};
    var panic = new panicModel(req.body);
    panic.save(function(err, panicData) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panicData };
        }
        res.json(response);
    });
});

router.patch('/:id', function(req, res) {
    var response = {};
    panicModel.findByIdAndUpdate(req.params.id, req.body, function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        }
        res.json(response);
    });
});

router.get('/driverpanic/:id', function(req, res) {
    var response = {};
    panicModel.find({"driver._id":req.params.id}).exec(function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});

router.get('/mypanic/:id', function(req, res) {
    var response = {};
    panicModel.find({"driver._id":req.params.id, status:1}).exec(function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});

router.get('/my-current-panic/:id', function(req, res) {
    var response = {};
    panicModel.find({"user._id":req.params.id, status:1}).exec(function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});

router.get('/:id', function(req, res) {
    var response = {};
    panicModel.findById(req.params.id, function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});

router.delete('/:id', function(req, res) {
    var response = {};
    panicModel.remove({ _id: req.params.id }, function(err, panic) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": panic };
        };
        res.json(response);
    });
});

module.exports = router;