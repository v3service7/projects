var express = require('express');
var router = express.Router();

var cuisineModel = require("../model/Cuisine.js");

router.post('/cuisine',function(req, res){
    var response={};
    var cuisine = new cuisineModel(req.body);
    cuisine.save(function(err,data){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.put('/cuisine/:id',function(req, res){
    var response={};
    cuisineModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.get('/cuisine',function(req,res){
    var response={};
    cuisineModel.find({},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.delete('/cuisine/:id',function(req,res){
    var response={};
    cuisineModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        }
        res.json(response);
    });
});

module.exports = router;