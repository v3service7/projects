module.exports = (function() {
    'use strict';
	const express = require('express');
	const router = express.Router();
	
	/*load Model*/
	let adminModel  =  require("../model/admin.js");
	let customerModel  =  require("../model/customer.js");
	let staffModel  =  require("../model/staff.js");

	/*-------------------------------START CUSTOMER--------------------------------------------------------*/

	router.get('/customer', function(req, res, next) {
		var response={};
		customerModel.find({}, null, {sort: {created_at: 1}},function(err,customers){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : customers};
			};
			res.json(response);
		});	
	});

	router.post('/customer',function(req, res){
		var response={};
	    var customer = new customerModel(req.body);
	    customer.save(function(err, customer){
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : customer};
	        }
	        res.json(response);
	    });
	});

	router.put('/customer/:id',function(req, res){
		var response={};
		customerModel.findByIdAndUpdate(req.params.id, req.body, function(err, customer) {
		    	if(err) {
		            response = {"error" : true,"message" : err};
		        } else {
		            response = {"error" : false,"message" : customer};
		        }
		        res.json(response);
	        });
	});

	router.get('/customer/:id',function(req,res){
		var response={};
		console.log(req.params.id);
		customerModel.findById(req.params.id,function(err,customer){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : customer};
			};
			res.json(response);
		});	
	});

	router.delete('/customer/:id',function(req,res){
		var response={};
		customerModel.remove({_id:req.params.id},function(err,customer){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : customer};
			};
			res.json(response);
		});	
	});
	
	/*-------------------------------END CUSTOMER--------------------------------------------------------*/

	/*-------------------------------START STAFF--------------------------------------------------------*/

	router.get('/staff', function(req, res, next) {
		var response={};
		staffModel.find({}, null, {sort: {created_at: 1}},function(err,staffs){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : staffs};
			};
			res.json(response);
		});	
	});

	router.post('/staff',function(req, res){
		var response={};
	    var staff = new staffModel(req.body);
	    staff.save(function(err, staff){
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : staff};
	        }
	        res.json(response);
	    });
	});

	router.put('/staff/:id',function(req, res){
		var response={};
		staffModel.findByIdAndUpdate(req.params.id, req.body, function(err, staff) {
		    	if(err) {
		            response = {"error" : true,"message" : err};
		        } else {
		            response = {"error" : false,"message" : staff};
		        }
		        res.json(response);
	        });
	});

	router.get('/staff/:id',function(req,res){
		var response={};
		console.log(req.params.id);
		staffModel.findById(req.params.id,function(err,staff){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : staff};
			};
			res.json(response);
		});	
	});

	router.delete('/staff/:id',function(req,res){
		var response={};
		staffModel.remove({_id:req.params.id},function(err,staff){
			if (err) {
				response = {"error" : true,"message" : err};
			} else{
				response = {"error" : false,"message" : staff};
			};
			res.json(response);
		});	
	});
	
	/*-------------------------------END STAFF--------------------------------------------------------*/

    return router;    
})();