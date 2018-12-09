const express = require('express');
const router = express.Router();
const passport = require('passport');
let panicModel = require("../models/panic.js");

router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
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

router.get('/pending', passport.authenticate('jwt', {session:false}), function(req, res, next) {
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

router.post('/', passport.authenticate('jwt', {session:false}), function(req, res) {
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

router.patch('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
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

router.get('/driverpanic/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
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

router.get('/mypanic/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
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

router.get('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
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

router.delete('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
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