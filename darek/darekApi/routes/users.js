var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../model/User.js');
var Owner = require('../model/Owner.js');
var restaurantModel = require('../model/Restaurant.js');

router.post('/register', function(req, res) {
    console.log(req.body);
    User.register(new User(req.body), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({
                status: 'Registration successful!'
            });
        });
    });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    User.find({username:req.body.username,password:req.body.password},function(err,user) {
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


router.get('/admin', function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    User.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        console.log(response);
        res.json(response);
    }); 
});

router.post('/admin/',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    var user = new User(req.body);
    user.save(function(err,ownerData){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.get('/admin/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    User.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.put('/admin/:id',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
            console.log(user);
            res.json(response);
        });
});

router.delete('/admin/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    User.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});


router.get('/', function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    Owner.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        console.log(response);
        res.json(response);
    }); 
});

router.post('/',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    var user = new Owner(req.body);
    user.save(function(err,ownerData){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            restaurantModel.find({},function(err,data){
                var resObj = {};
                var resLength = data.length+1;
                if (data.length<= 9) {
                    resObj.resCode = 'RES00'+resLength;
                }else{
                    resObj.resCode = 'RES0'+resLength;
                };
                resObj.ownerId = ownerData._id;
                restaurant = new restaurantModel(resObj);
                restaurant.save();
                response = {"error" : false,"message" : "Data added"};
            });
            
        }
        res.json(response);
    });
});

router.put('/:id',function(req, res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    Owner.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
            res.json(response);
        });
});

router.get('/forget-pass',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    Owner.find({email:req.body.email},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.get('/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    Owner.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});

router.delete('/:id',function(req,res){
    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }
    var response={};
    console.log(req.params.id);
    Owner.remove({_id:req.params.id},function(err,data){
        restaurantModel.remove({ownerId:req.params.id},function(err,data){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else{
                response = {"error" : false,"message" : "Deleted Successfully"};
            };
            res.json(response);
        });
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
    Owner.findById(req.params.id,function(err,data){
        if (data.password == req.body.oldpassword) {
            var newObject = {};
            newObject.password = req.body.newpassword;
            Owner.findByIdAndUpdate(req.params.id, newObject, function(err, kitchen) {
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


router.post('/forget-password',function(req,res,next){
    var response={};
    User.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
            
        } else{
            if (data.length>0) {
                var name = data[0].firstname+" <"+data[0].email+" >";
                var content = "Password reset Link <a href='http://34.209.114.118:3003/admin/resetpassword/"+data[0]._id+"'>Click Here</a>"
                console.log(content);
                req.mail.sendMail({  //email options
                   from: "Restaurant Team <logindharam@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
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
            }
        };
    }); 
});

router.get('/resetpassword/:id', function(req, res, next) {
    User.find({_id:req.params.id},function(err,userdatas){
        console.log(userdatas)
        res.json({error:false});
        //res.render('resetpassword', { title: 'Restaurant Admin Panel',name: 'rest',userdata : userdatas[0] });
    });
});

module.exports = router;