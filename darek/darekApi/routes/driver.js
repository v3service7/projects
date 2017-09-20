var express = require('express');
var router = express.Router();

var driverModel  =  require("../model/Driver.js");


router.post('/driver-login', function(req, res, next) {
    var response={};
    driverModel.find({email:req.body.email,password:req.body.password},function(err,owner) {
        if (owner.length>0) {
            res.json({status:true,data:owner[0]});
        }else{
            res.json({status:false,data:''});
        };
    });
});

router.post('/forget-password',function(req,res,next){
    var response={};
    driverModel.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
            
        } else{
            if (data.length>0) {
                var name = data[0].firstname+" <"+data[0].email+" >";
                /*var content = "Password reset Link <a href='http://34.209.114.118:3003/owner/resetpassword/"+data[0]._id+"'>Click Here</a>"*/
                var content = "Password reset Link <a href='http://104.236.69.166:3000/owner/resetpassword/"+data[0]._id+"'>Click Here</a>"
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
                   res.json({error:false});
                });
                console.log(data);
            }else{
                res.json({error:true,'message':'Email doest no exist'});
            }
        };
    }); 
});

router.put('/change-password/:id',function(req, res){
    var response={};
    driverModel.findById(req.params.id,function(err,data){
        if (data.password == req.body.oldpassword) {
            var newObject = {};
            newObject.password = req.body.newpassword;
            driverModel.findByIdAndUpdate(req.params.id, newObject, function(err, kitchen) {
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

router.get('/driver', function(req, res, next) {
    var response={};
    driverModel.find({}, null, {sort: {created_at: 1}}).populate('restaurantId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.get('/restaurant-drivers/:id', function(req, res, next) {
    var response={};
    driverModel.find({restaurantId:req.params.id}, null, {sort: {created_at: 1}}).populate('restaurantId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.post('/driver',function(req, res){
    var response={};
    var driver = new driverModel(req.body);
    driver.save(function(err){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/driver/:id',function(req, res){
    var response={};
    driverModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.get('/driver/:id',function(req,res){
    var response={};
    console.log(req.params.id);
    driverModel.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    });
});

router.delete('/driver/:id',function(req,res){
    var response={};
    driverModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    });
});

module.exports = router;