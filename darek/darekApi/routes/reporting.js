var express = require('express');
var router = express.Router();
var async = require('async');
var passport = require('passport');

var Order = require('../model/Order.js');
var customerModel = require('../model/Customer.js');
var restaurantModel = require('../model/Restaurant.js');
var itemModel = require('../model/Item.js');
var menuModel = require('../model/Kitchenmenu.js');

router.get('/overview/:id', function(req, res, next) {
    var response={};
    console.log(req.params.id);
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() -7);
    Order.find({restaurantId:req.params.id,status:'accepted'},function(err,totalAcceptedOrder){
        Order.find({restaurantId:req.params.id,created_at:{'$gte':lastWeek}},function(err,asPerDayOrder){
            Order.find({restaurantId:req.params.id}).distinct('customerId',function(err,totalClient){
                Order.find({restaurantId:req.params.id,created_at:{'$gte':lastWeek}}).distinct('customerId',function(err,asPerDayClient){
                    res.json({'status':true,'data':{'totalAcceptedOrder':totalAcceptedOrder,'asPerDayOrder':asPerDayOrder,'totalClient':totalClient,'asPerDayClient':asPerDayClient}});
                }); 
            }); 
        }); 
    }); 
});

router.get('/method/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var pickupData=[];
    var deliveryData = [];
    var days = req.params.days; 
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        for (var i = 0; i < days; i++) {
            var pickupCount = 0;
            var deliveryCount = 0;
            var date = new Date();
            date.setDate(date.getDate()-i);
            for (var j = 0; j < orderList.length; j++) {
                if (date.toDateString() == orderList[j].created_at.toDateString()) {
                    if (orderList[j].orderMethod.mType == 'Pickup') {
                        pickupCount++;
                    }
                    if (orderList[j].orderMethod.mType == 'Delivery') {
                        deliveryCount++;
                    }
                }
            }
            pickupData.push(pickupCount);
            deliveryData.push(deliveryCount);
        }
        res.json({'status':true,'message':[{'data':pickupData,'label':'Pickup'},{'data':deliveryData,'label':'Delivery'}]});
    });
});

router.get('/results/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var acceptData=[];
    var missedData = [];
    var rejectData = [];
    var days = req.params.days; 
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        for (var i = 0; i < days; i++) {
            var acptCount = 0;
            var rjctCount = 0;
            var missCount = 0;
            var date = new Date();
            date.setDate(date.getDate()-i);
            for (var j = 0; j < orderList.length; j++) {
                if (date.toDateString() == orderList[j].created_at.toDateString()) {
                    if (orderList[j].status == 'Accepted') {
                        acptCount++;
                    }
                    if (orderList[j].status == 'Rejected') {
                        rjctCount++;
                    }
                    if (orderList[j].status == 'Missed') {
                        missCount++;
                    }
                }
            }
            acceptData.push(acptCount);
            rejectData.push(rjctCount);
            missedData.push(missCount);   
        }
        res.json({'status':true,'message':[{'data':acceptData,'label':'Accepted'},{'data':missedData,'label':'Missed'},{'data':rejectData,'label':'Rejected'}]});
    });
});

router.get('/type/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var nowData=[];
    var laterData = [];
    var days = req.params.days;
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        for (var i = 0; i < days; i++) {
            var pickupCount = 0;
            var deliveryCount = 0;
            var date = new Date();
            date.setDate(date.getDate()-i);
            for (var j = 0; j < orderList.length; j++) {
                if (typeof orderList[j].orderTime != 'undefined') {
                    if (date.toDateString() == orderList[j].created_at.toDateString()) {
                        if (orderList[j].orderTime.tType == 'Now') {
                            pickupCount++;
                        }
                        if (orderList[j].orderTime.tType == 'Later') {
                            deliveryCount++;
                        }
                    }
                }
            }
            nowData.push(pickupCount);
            laterData.push(deliveryCount);
        }
        res.json({'status':true,'message':[{'data':nowData,'label':'Now'},{'data':laterData,'label':'Later'}]});
    });
});

router.get('/payment/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var cashData=[];
    var cardPickupData=[];
    var cardViaInternetData = [];
    var days = req.params.days;
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        for (var i = 0; i < days; i++) {
            var cashCount = 0;
            var cardPickupCount = 0;
            var cardViaInternetCount = 0;
            var date = new Date();
            date.setDate(date.getDate()-i);
            for (var j = 0; j < orderList.length; j++) {
                if (typeof orderList[j].orderPayment != 'undefined') {
                    if (date.toDateString() == orderList[j].created_at.toDateString()) {
                        if (orderList[j].orderPayment.cash == true) {
                            cashCount++;
                        }
                        if (orderList[j].orderPayment.cardpickup == true) {
                            cardPickupCount++;
                        }
                        if (orderList[j].orderPayment.cardinternet == true) {
                            cardViaInternetCount++;
                        }
                    }
                }
            }
            cashData.push(cashCount);
            cardPickupData.push(cardPickupCount);
            cardViaInternetData.push(cardViaInternetCount);
        }
        res.json({'status':true,'message':[{'data':cashData,'label':'Cash'},{'data':cardPickupData,'label':'Cart at Pickup'},{'data':cardViaInternetData,'label':'Cart via Internet'}]});
    });
});

router.get('/items/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var menu=[];
    var days = req.params.days;
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        var itemArray = []
        for (var j = 0; j < orderList.length; j++) {
            if (orderList[j].orders.length > 0) {
                for (var k = 0; k < orderList[j].orders.length; k++) {
                    if (menu.indexOf(orderList[j].orders[k].item.menuId) == -1) {
                        menu.push(orderList[j].orders[k].item.menuId);
                    }
                }
            }
        }

        menuModel.find({_id:{'$in':menu}/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,maunCatList){
            var pickupCount = 0;
            var deliveryCount = 0;
            var db = []
            for (var i = 0; i < maunCatList.length; i++) {
                console.log(menu[i])
                var menuDataLen = []
                for (var p = 0; p < days; p++) {
                    var date = new Date();
                    date.setDate(date.getDate()-p);
                    var menuData=[];
                    for (var j = 0; j < orderList.length; j++) {
                        if (date.toDateString() == orderList[j].created_at.toDateString()) {
                            if (orderList[j].orders.length > 0) {
                                for (var k = 0; k < orderList[j].orders.length; k++) {
                                    if (orderList[j].orders[k].item.menuId == maunCatList[i]._id) {
                                        menuData.push(orderList[j].orders[k].item.menuId);
                                    }
                                }
                            }
                        }    
                    }
                    menuDataLen.push(menuData.length);
                }
                var cDb = {}
                cDb.data = menuDataLen
                cDb.label = maunCatList[i].name
                db[i]=cDb;
            }
            res.json({'status':true,'message':db});
        });
    });
});

router.get('/item-category/:id/:menuId/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var items=[];
    var menuIdParam = req.params.menuId;
    var days = req.params.days;
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        var itemArray = []
        for (var j = 0; j < orderList.length; j++) {
            if (orderList[j].orders.length > 0) {
                for (var k = 0; k < orderList[j].orders.length; k++) {
                    if ((items.indexOf(orderList[j].orders[k].item._id) == -1) && (orderList[j].orders[k].item.menuId == menuIdParam)) {
                        items.push(orderList[j].orders[k].item._id);
                        console.log(orderList[j].orders[k].item._id)
                    }
                }
            }
        }

        itemModel.find({_id:{'$in':items}/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,itemCatList){
            var pickupCount = 0;
            var deliveryCount = 0;
            var db = []
            for (var i = 0; i < itemCatList.length; i++) {
                var menuDataLen = []
                for (var p = 0; p < days; p++) {
                    var date = new Date();
                    date.setDate(date.getDate()-p);
                    var menuData=[];
                    for (var j = 0; j < orderList.length; j++) {
                        if (date.toDateString() == orderList[j].created_at.toDateString()) {
                            if (orderList[j].orders.length > 0) {
                                for (var k = 0; k < orderList[j].orders.length; k++) {
                                    if (orderList[j].orders[k].item._id == itemCatList[i]._id) {
                                        menuData.push(orderList[j].orders[k].item._id);
                                    }
                                }
                            }
                        }    
                    }
                    menuDataLen.push(menuData.length);
                }
                var cDb = {}
                cDb.data = menuDataLen
                cDb.label = itemCatList[i].name
                db[i]=cDb;
            }
            res.json({'status':true,'message':db});
        }); 
    });
});


router.get('/all-sale/:id/:days', function(req, res, next) {
    var lastWeek = new Date();
    //lastWeek.setDate(lastWeek.getDate()-7);
    var acceptData=[];
    var missedData = [];
    var rejectData = [];
    var days = req.params.days;
    Order.find({restaurantId:req.params.id/*,created_at:{'$gte':lastWeek}*/}).exec(function(err,orderList){
        for (var i = 0; i < days; i++) {
            var acptCount = 0;
            var date = new Date();
            date.setDate(date.getDate()-i);
            for (var j = 0; j < orderList.length; j++) {
                if (date.toDateString() == orderList[j].created_at.toDateString()) {
                    if (orderList[j].status == 'Accepted') {
                        acptCount = acptCount + orderList[j].gTotal;
                    }
                }
            }
            acceptData.push(acptCount);
        }
        res.json({'status':true,'message':[{'data':acceptData,'label':'Accepted'}]});
    });
});

router.get('/list/:id', function(req, res, next) {
    Order.find({restaurantId:req.params.id}).populate('customerId').exec(function(err,orderList){
        res.json({'status':true,'message':orderList});
    }); 
});

router.get('/client/:id', function(req, res, next) {
    var response={};
    Order.find({restaurantId:req.params.id}).distinct('customerId',function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };

        customerModel.find({_id:{$in:data}},function(err,custData){
            response = {"error" : false,"message" : custData};
            res.json(response);

        });
        
    }); 
});

module.exports = router;
