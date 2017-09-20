var express = require('express');
var router = express.Router();
var passport = require('passport');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https', // Default 
    apiKey: null, // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = NodeGeocoder(options);

var Customer = require('../model/Customer.js');


router.get('/', function(req, res, next) {
    var response={};
    Customer.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{

            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/:id',function(req,res){
    /*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
    var response={};
    console.log(req.params.id);
    Customer.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


router.post('/add-lat-lng', function(req, res) {
    var fullAddress = req.body.streetName+" "+req.body.postcode+" "+req.body.city;
    console.log(fullAddress);
    geocoder.geocode(fullAddress, function(err, gResponse) {
        if (typeof gResponse != 'undefined' && gResponse.length > 0) {
            req.body.lat = gResponse[0].latitude;
            req.body.lng = gResponse[0].longitude;
        }
        response = {"error" : false,"message" : req.body};
        res.json(response);
    });
});


router.post('/register', function(req, res) {
    console.log(req.body);
    var response={};
    var customerObj = new Customer(req.body);
    customerObj.save(function(err){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    Customer.find({username:{$regex : new RegExp(req.body.username,"i")},password:req.body.password},function(err,user) {
        if (user.length>0) {
            req.logIn(user[0], function(err) {
                if (err) {
                    return res.status(500).json({
                    err: 'Could not log in User'
                    });
                }
                //console.log(req.user);
                res.status(200).json({
                    data:req.user,
                    status: 'Login successful!'
                });
            });
        }else{
            res.json({status:false,data:'Bad Credential'});
        };
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.put('/update/:id',function(req, res){
    /*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
    var response={};
    Customer.findByIdAndUpdate(req.params.id, req.body, function(err, customer) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : customer};
            }
            res.json(response);
        });
});


router.put('/change-password/:id',function(req, res){
    // if (!req.isAuthenticated()) {
 //        return res.status(200).json({
 //            status: false,
 //            message:'Access Denied'
 //        });
 //    }
    var response={};
    Customer.findById(req.params.id,function(err,data){
        if (data.password == req.body.oldpassword) {
            var newObject = {};
            newObject.password = req.body.newpassword;
            Customer.findByIdAndUpdate(req.params.id, newObject, function(err, kitchen) {
                if(err) {
                    response = {"error" : true,"message" : err};
                } else {
                    response = {"error" : false,"message" : "Password changed Successfully "};
                }
                res.json(response);
            });
        }else{
            response = {"error" : true,"message" : "Password Incorect"};
            res.json(response);
        };
    });
});


router.post('/forget-pass',function(req,res,next){
    console.log("req.body");
    console.log(req.body);
    var response={};
    Customer.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
        } else{
            if (data.length>0) {
                var name = data[0].firstname+" <"+data[0].email+" >";
                /*var content = "Password reset Link <a href='http://localhost:4200/resetpassword/"+data[0]._id+"'>Click Here</a>"*/
                var content = "Password reset Link <a href='http://104.236.69.166:3000/resetpassword/"+data[0]._id+"'>Click Here</a>"
                /*var content = "Password reset Link <a href='http://34.209.114.118:3003/resetpassword/"+data[0]._id+"'>Click Here</a>"*/
                console.log(content);
                req.mail.sendMail({  //email options
                   from: "Restaurant Team <derekitchen@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
                   to: name, // receiver
                   subject: "Reset Password", // subject
                   //text: "Email Example with nodemailer" // body
                   html: content
                }, function(error, response){  //callback
                   if(error){
                       console.log(error);
                   }else{
                       console.log("Message sent: " + response.message);
                   }
                   req.mail.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                   res.json({error:false, data : data});
                });
            }
            else{
                res.json({error:true, data:"Email Doesn't Exist"});
            }
        };
    }); 
});

// router.get('/resetpassword/:id', function(req, res, next) {
//     Customer.find({_id:req.params.id},function(err,userdatas){
//         console.log(userdatas)
//         res.json({error:false});
//         //res.render('resetpassword', { title: 'Restaurant Admin Panel',name: 'rest',userdata : userdatas[0] });
//     });
// });


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
