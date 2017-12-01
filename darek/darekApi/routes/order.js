var express = require('express');
var router = express.Router();
var passport = require('passport');
var ejs = require('ejs');
var templateDir = './email';

//var cryptoD = require('crypto');

var Order = require('../model/Order.js');
var customerModel = require('../model/Customer.js');
var restaurantModel = require('../model/Restaurant.js');

function sendOrderMail(req,name,subject,content){
    console.log('template done')
    var html = ejs.renderFile(templateDir + '/orders/index.ejs', { order: content },
    function(err, data) {
        if (err) {
            console.log(err);
        }
        return data;
    });

    req.mail.sendMail({  //email options
       from: "Restaurant Team <noreply@abcpos.com>", // sender address.  Must be the same as authenticated user if using GMail.
       to: name, // receiver
       subject: subject, // subject
       html: html
    }, function(error, response){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }
       req.mail.close();
    });
}


function sendUnplacedOrderMail(req,name,subject,content){
    var html = ejs.renderFile(templateDir + '/orders/unplacedOrder.ejs', { order: content },
    function(err, data) {
        if (err) {
            console.log(err);
        }
        return data;
    });

    req.mail.sendMail({  //email options
       from: "Restaurant Team <noreply@abcpos.com>", // sender address.  Must be the same as authenticated user if using GMail.
       to: name, // receiver
       subject: subject, // subject
       html: html
    }, function(error, response){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }
       req.mail.close();
    });
}

router.get('/', function(req, res, next) {
    var response={};
    Order.find({}, null, {sort: {created_at: -1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/pending-orders/:id', function(req, res, next) {
    var response={};
    Order.find({restaurantId:req.params.id,driverStatus:'Accepted'}, null, {sort: {created_at: -1}}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/driver/:id', function(req, res, next) {
    var response={};
    Order.find({driverId:req.params.id}, null, {sort: {created_at: -1}}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/customer/:id', function(req, res, next) {
    var response={};
    Order.find({customerId:req.params.id}, null, {sort: {created_at: -1}}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/customer-by-restaurant/:custID/:resID', function(req, res, next) {
    var response={};
    Order.find({customerId:req.params.custID, restaurantId : req.params.resID}, null, {sort: {created_at: -1}}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

/*
router.get('/create-hmac', function(req, res, next) {
    var response={};
    var apiKey = "orC0OGDhIz3NUg2HShAzczEeM18Zaciw";
    var apiSecret = "e71e64ce4eddfa0920c42d030207933166b9c8166874d0b0d65bfce10ddb8c5f";
    var nonce = Math.random();
    var timestamp = Math.round(+new Date()/1000);;
    var token = "9a7f7bef6a5f0ef2";
    var payload = "https://api-cert.payeezy.com/v1/transactions";
    var data = apiKey + nonce + timestamp + token + payload;
    var hashAlgorithm = "sha256";

    var hmac = cryptoD.createHmac(hashAlgorithm , data , apiSecret, false)
    //var hmac = hash_hmac ( hashAlgorithm , data , apiSecret, false );

    res.json(hmac);
});
*/
router.post('/add', function(req, res) {
    //console.log(req.body);
    var response={};
    var orderObj = new Order(req.body);
    orderObj.save(function(err,data){
        if(err) {
            restaurantModel.findById(req.body.restaurantId , function(err,resData1){
                if (resData1) {
                    customerModel.findById(req.body.customerId , function(err,resData2){
                        if (resData2) {
                            req.body.restaurantId = resData1;
                            req.body.customerId = resData2;
                            let notification = resData1.notification;
                            if (notification && notification.length > 0) {
                                for (var i = 0; i < notification.length; i++) {
                                    if(notification[i].orderNotPlaced){
                                        var name = notification[i].email;
                                        sendUnplacedOrderMail(req,name,'Order Not Placed',req.body);
                                    }
                                }
                            }
                        }
                    });
                }
            });
            response = {"error" : true,"message" : err};
        } else {
            restaurantModel.findById(req.body.restaurantId).populate('ownerId').exec(function(err,resData){
                var name = resData.ownerId.firstname+" <"+resData.ownerId.email+" >";
                sendOrderMail(req,name,'Order Notification',data);
            });

            var count = 0;
            var loopCount = setInterval(() => {
                count++;
                if(count < 6){
                    Order.findById(data._id).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data1){
                        if (err) {
                            response = {"error" : true,"message" : "Error fetching data"};
                        } else{
                            if (data1.status == 'Accepted' || data1.status == 'Rejected' || data1.status == 'Canceled') {
                                var name = data1.customerId.firstname +" <"+ data1.customerId.email+" >";
                                sendOrderMail(req,name,'Order Notification',data1);
                                clearInterval(loopCount);
                            }

                            if (data1.status == 'Rejected') {                                
                                let notification = data1.restaurantId.notification;
                                if (notification && notification.length > 0) {
                                    for (var i = 0; i < notification.length; i++) {
                                        if(notification[i].orderReject){
                                            var name = notification[i].email;
                                            sendOrderMail(req,name,'Order Rejected',data1);
                                        }
                                    }
                                }
                            }

                            if (data1.status == 'Accepted' && data1.orderMethod && data1.orderMethod.mType == 'Pickup') {
                                let notification = data1.restaurantId.notification;
                                if (notification && notification.length > 0) {
                                    for (var i = 0; i < notification.length; i++) {
                                        if(notification[i].pickupConfirm){
                                            var name = notification[i].email;
                                            sendOrderMail(req,name,'Order Accepted for Pickup',data1);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }

                if (count >= 6){
                    var obj = {};
                    obj['status'] = 'Missed'
                    obj['id'] = data._id;
                    Order.findByIdAndUpdate(obj.id, obj, function(err, orderUpdated) {
                        if(err) {
                            response = {"error" : true,"message" : err};
                        } else {
                            response = {"error" : false,"message" : "Data Update"};
                            Order.findById(obj.id).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data2){
                                if (err) {
                                    response = {"error" : true,"message" : "Error fetching data"};
                                } else{
                                    var name = data2.customerId.firstname +" <"+ data2.customerId.email+" >";
                                    sendOrderMail(req,name,'Order Notification',data2);
                                    clearInterval(loopCount);

                                    let notification = data2.restaurantId.notification;
                                    if (notification && notification.length > 0) {
                                        for (var i = 0; i < notification.length; i++) {
                                            if(notification[i].pickupConfirm){
                                                var name2 = notification[i].email;
                                                console.log("name2");
                                                console.log(name2);
                                                sendOrderMail(req,name2,'Order Missed',data2);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            },30000)
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.get('/shoot-mail/:id',function(req,res){
    var response={};
    Order.findById(req.params.id).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Unable to send Mail"};
        } else{
            var name = data.customerId.firstname +" <"+ data.customerId.email+" >";
            sendOrderMail(req,name,'Order Notification',data);
            response = {"error" : false,"message" : "Mail Sent Successfully"};
        };
        res.json(response);
    });
});

router.get('/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    Order.findById(req.params.id).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.put('/update/:id',function(req, res){
    var response={};
    Order.findByIdAndUpdate(req.params.id, req.body, function(err, order) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.delete('/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    Order.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});

module.exports = router;
