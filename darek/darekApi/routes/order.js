var express = require('express');
var router = express.Router();
var passport = require('passport');

//var cryptoD = require('crypto');

var Order = require('../model/Order.js');
var customerModel = require('../model/Customer.js');
var restaurantModel = require('../model/Restaurant.js');

function sendOrderMail(req,name,subject,content){
    req.mail.sendMail({  //email options
       from: "Restaurant Team <derekitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
       to: name, // receiver
       subject: subject, // subject
       //text: "Email Example with nodemailer" // body
       html: content
    }, function(error, response){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + response.message);
       }
       req.mail.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
       //res.json({error:false});
    });
}

router.get('/', function(req, res, next) {
    var response={};
    Order.find({}, null, {sort: {created_at: 1}},function(err,data){
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
    Order.find({driverId:req.params.id}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
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
    Order.find({customerId:req.params.id}).populate('customerId').populate('restaurantId').populate('driverId').exec(function(err,data){
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
            response = {"error" : true,"message" : err};
        } else {
            restaurantModel.findById(req.body.restaurantId).populate('ownerId').exec(function(err,resData){
                var name = resData.ownerId.firstname+" <"+resData.ownerId.email+" >";
                sendOrderMail(req,name,'Order Notification','Order Receive Successfully');
            });
            customerModel.findById(req.body.customerId,function(err,cusData){
                var name = cusData.firstname+" <"+cusData.email+" >";
                sendOrderMail(req,name,'Order Notification','Order Accepted Successfully');
            });
            response = {"error" : false,"message" : data};
        }
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
