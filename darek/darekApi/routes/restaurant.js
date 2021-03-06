var express = require('express');
var router = express.Router();
var NodeGeocoder = require('node-geocoder');
var restaurantModel  =  require("../model/Restaurant.js");

var ownerModel  =  require("../model/Owner.js");
var deliveryZone = require("../model/DeliveryZone.js");
var kitchenMenuModel  =  require("../model/Kitchenmenu.js");
var itemModel  =  require("../model/Item.js");
var addOnModel  =  require("../model/addon.js");
var languageModel  =  require("../model/Language.js");
var promotionDetailModel  =  require("../model/PromotionDetail.js");
var order = require('../model/Order.js');
var driverModel  =  require("../model/Driver.js");

var ratingModel = require("../model/Rating.js");


var options = {
    provider: 'google',
    httpAdapter: 'https', // Default 
    apiKey: null, // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = NodeGeocoder(options);

router.get('/restaurant', function(req, res, next) {
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};
    //restaurantModel.find({}, null, {sort: {created_at: 1}},function(err,data){
    restaurantModel.find({}).populate('ownerId').exec(function (err, data) {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.post('/restaurant',function(req, res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var fullAddress = req.body.address+" "+req.body.zipcode+" "+req.body.city+" "+req.body.country;
    console.log(fullAddress);
    geocoder.geocode(fullAddress, function(err, gResponse) {
        restaurantModel.find({},function(err,data){
            console.log(gResponse);
            if (data.length<= 9) {
                req.body.resCode = 'RES00'+data.length;
            }else{
                req.body.resCode = 'RES0'+data.length;
            };
            req.body.lat = gResponse[0].latitude;
            req.body.lng = gResponse[0].longitude;
            var restaurant = new restaurantModel(req.body);
            restaurant.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : err};
                } else {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
        });
    });
});

router.put('/restaurant/:id',function(req, res){
    var response={};
    restaurantModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : country};
        }
        res.json(response);
    });
});

router.put('/restaurant-location-update/:id',function(req, res){
    var response={};
    var fullAddress = req.body.address+" "+req.body.zipcode+" "+req.body.city+" "+req.body.country;
    console.log(fullAddress);
    geocoder.geocode(fullAddress, function(err, gResponse) {
        console.log(gResponse);
        if (typeof gResponse != 'undefined' && gResponse.length>0) {
            req.body.lat = gResponse[0].latitude;
            req.body.lng = gResponse[0].longitude;
        };
        restaurantModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : country};
            }
            res.json(response);
        });
    });
});

router.put('/restaurant-notification/:id',function(req, res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};
    restaurantModel.findById(req.params.id, function(err, restaurant) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            restaurant.notification.push(req.body.notification);
            restaurant.save();
            response = {"error" : false,"message" : "Data Update","data" : restaurant};
        }
        res.json(response);
    });
});

router.put('/delivery-update/:id',function(req, res){
    var response={};
    restaurantModel.findByIdAndUpdate(req.params.id, req.body, function(err, restaurant) {

        console.log(restaurant);
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : restaurant};
        }
        res.json(response);
    });
});

router.put('/location-update/:id',function(req, res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};
    restaurantModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});


router.get('/owner-restaurants/:id',function(req, res){    
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};

    console.log(req.params.id);
    
    restaurantModel.find({ownerId:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data[0]};
        };
        res.json(response);
    });
});


router.get('/restaurant/:id',function(req,res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};
    console.log(req.params.id);
    restaurantModel.findById(req.params.id).populate('languages').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.delete('/restaurant/:id',function(req,res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    var response={};
    console.log(req.params.id);
    restaurantModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            kitchenMenuModel.remove({kitchenId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log("All Menu Deleted Successfully");
                };
            });

            itemModel.remove({kitchenId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Items Deleted Successfully');
                }
            });

            addOnModel.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Addons Deleted Successfully');
                }
            });

            promotionDetailModel.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Promotions Deleted Successfully');
                }
            });

            deliveryZone.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Delivery Zones Deleted Successfully');
                }
            });

            order.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Orders Deleted Successfully');
                }
            });

            driverModel.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Driver Details related this restaurant Deleted Successfully');
                }
            });

            ratingModel.remove({restaurantId:req.params.id},function(err,data){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    console.log('All Ratings Deleted Successfully');
                }
            });
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    });
});

router.delete('/restaurant/notification/:id/:index', function(req, res) {
    console.log(req.params.id);
    console.log(req.params.index);

    restaurantModel.findById(req.params.id, function(err, data) {
        data.notification.splice(req.params.index,1);
        data.save();
        res.json({"error" : false,"message" : "Deleted Successfully"});  
    });
});

// router.put('/restaurant/notification/:id/:index', function(req, res) {

// });

router.put('/restaurant/notification/:id/:index', function(req, res) {
 console.log(req.params.id);
 console.log(req.params.index);
 
 restaurantModel.findById(req.params.id, function(err, data) {
  for (var i = 0; i < data.notification.length; i++) {
   if (i == req.params.index) {
       data.notification[i] = req.body.notification;
       };   
    };
    restaurantModel.findByIdAndUpdate(req.params.id,data, function(err, data) {
        res.json({"error" : false,"message" : "Updated Successfully"});
    });

    console.log(data.notification);
  // data.notification.splice(req.params.index,1);
  //data.save();
});
 
});

module.exports = router;