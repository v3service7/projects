const express = require('express');
const router = express.Router();
const passport = require('passport');
let ambulanceModel = require("../models/ambulance.js");

router.get('/', function(req, res, next) {
    var response = {};
    ambulanceModel.find({}, null, { sort: { created_at: 1 } }).populate('provider').populate('driver').exec(function(err, ambulance) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulance };
        };
        res.json(response);
    });
});    

router.post('/', function(req, res) {
    var response = {};
    var ambulane = new ambulanceModel(req.body);
    ambulane.save(function(err, ambulane) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulane };
        }
        res.json(response);
    });
});

router.put('/:id', function(req, res) {
    var response = {};
    ambulanceModel.findByIdAndUpdate(req.params.id, req.body, function(err, ambulance) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulance };
        }
        res.json(response);
    });
});

router.get('/custambulance/:id', function(req, res) {
    var response = {};
    ambulanceModel.find({"provider":req.params.id}).exec(function(err, ambulance) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulance };
        };
        res.json(response);
    });
});

router.get('/:id', function(req, res) {
    var response = {};
    ambulanceModel.findById(req.params.id, function(err, ambulance) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulance };
        };
        res.json(response);
    });
});

router.delete('/:id', function(req, res) {
    var response = {};
    ambulanceModel.remove({ _id: req.params.id }, function(err, ambulance) {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": ambulance };
        };
        res.json(response);
    });
});

module.exports = router;