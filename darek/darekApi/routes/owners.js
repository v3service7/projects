var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../model/User.js');
var ownerModel = require('../model/Owner.js');

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
    ownerModel.find({username:req.body.username,password:req.body.password},function(err,owner) {
        if (owner.length>0) {
            res.json({status:true,data:owner[0]});
        }else{
            res.json({status:false,data:''});
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


router.post('/account-confirm',function(req, res){
    //if (!req.isAuthenticated()) {
    //    return res.status(200).json({
    //        status: false,
    //        message:'Access Denied'
    //    });
    //}
    console.log(req.body);
    ownerModel.find({email:req.body.email}, req.body, function(err, ownerD) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            var loggedUser = ownerD[0];
            var name = loggedUser.firstname+" <"+loggedUser.email+" >";
            var content = "Email Activation Link <a href='http://34.209.114.118:3003/owner/mailactivate/"+loggedUser._id+"'>Click Here</a>"
            req.mail.sendMail({  //email options
               from: "Restaurant Team <logindharam@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
               to: name, // receiver
               subject: "Email Activation", // subject
               html: content
            }, function(error, response){  //callback
               if(error){
                   console.log(error);
               }else{
                   console.log("Message sent: " + response.message);
               }
               req.mail.close();
               res.json({status:true});
               
            });
        }
    });
});

router.get('/mailactivate/:id', function(req, res, next) {
    req.body.emailstatus = true;
    ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : owner};
            res.json(response);
        }
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
    ownerModel.find({}, null, {sort: {created_at: 1}},function(err,data){
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
    var owner = new ownerModel(req.body);
    owner.save(function(err){
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.get('ownerautologin/:id',function(req, res){

    // if (!req.isAuthenticated()) {
    //     return res.status(200).json({
    //         status: false,
    //         message:'Access Denied'
    //     });
    // }

    var response={};
    ownerModel.findById(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
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
    ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : "Data Update"};
            }
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
    ownerModel.findById(req.params.id,function(err,data){
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
    ownerModel.remove({_id:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});


router.post('/forget-password',function(req,res,next){
    var response={};
    ownerModel.find({email:req.body.email},function(err,data){
        if (err) {
            req.flash('error', 'something went wrong!');
            
        } else{
            if (data.length>0) {
                var name = data[0].firstname+" <"+data[0].email+" >";
                var content = "Password reset Link <a href='http://34.209.114.118:3003/owner/resetpassword/"+data[0]._id+"'>Click Here</a>"
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
    ownerModel.find({_id:req.params.id},function(err,userdatas){
        console.log(userdatas)
        res.json({error:false});
        //res.render('resetpassword', { title: 'Restaurant Admin Panel',name: 'rest',userdata : userdatas[0] });
    });
});

module.exports = router;