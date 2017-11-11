var express = require('express');
var router = express.Router();

var Owner = require('../model/owner.js');

/* GET home page. */
router.post('/register', function(req, res) {
	var response={};
	var owner = new Owner(req.body);

	owner.save(function(err,ownerData){
        if(err) {
            response = {"error" : true,"message" : err};
        	console.log(response);
        } else {
        	response = {"error" : false,"message" : ownerData};
        	console.log(response);
        }

	    return res.json(response);
	});
});

router.post('/login', function(req, res, next) {
    Owner.find({username: {$regex : new RegExp(req.body.username,"i")},password:req.body.password},function(err,owner) {
    	if (err) {
    		res.json({"error":true,"message":'Unable to load data'});
    	}
        if (owner.length>0) {
            res.json({"error":false,"message" :owner[0]});
        }else{
            res.json({"error":true,"message":'User does not exist'});
        };
    });
});

router.get('/owner-all', function(req, res) {
	var response = {};
	Owner.find({}, null, {sort: {created_at: 1}},function(err, owners) {
        if(err) {
            response = {"error" : true,"message" : err};
        	console.log(response);
        } else {
        	response = {"error" : false,"message" : owners};
        	console.log(response);
        }
	    return res.json(response);
	});
});

router.get('/owner/:id', function(req, res) {
	var response={};
    Owner.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : err};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});




module.exports = router;
