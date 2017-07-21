var express = require('express');
var router = express.Router();
var passport = require('passport');

//var cryptoD = require('crypto');

var Order = require('../model/Order.js');
var customerModel = require('../model/Customer.js');
var restaurantModel = require('../model/Restaurant.js');

function sendOrderMail(req,name,subject,content){
    req.mail.sendMail({  //email options
       from: "Restaurant Team <logindharam@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
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
        //console.log(data);
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            restaurantModel.findById(req.body.restaurantId).populate('ownerId').exec(function(err,resData){
                var name = resData.ownerId.firstname+" <"+resData.ownerId.email+" >";
                console.log('owner '+name)
                sendOrderMail(req,name,'Order Notification','Order Receive Successfully');
            });
            customerModel.findById(req.body.customerId,function(err,cusData){
                var name = cusData.firstname+" <"+cusData.email+" >";
                console.log('customer '+name)
                sendOrderMail(req,name,'Order Notification','Order Accepted Successfully');
            });
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.get('/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    Order.findById(req.params.id).populate('customerId').populate('restaurantId').exec(function(err,data){
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

router.get('/status', function(req, res) {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        data:req.user,
        status: true
    });
});

module.exports = router;
