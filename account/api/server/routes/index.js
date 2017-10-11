module.exports = (function() {
    'use strict';
	const jwt    = require('jsonwebtoken');
	const express = require('express');
	const router = express.Router();

	/*load Model*/
	let adminModel  =  require("../model/admin.js");

	router.get('/test', function(req, res) {
        let response={};
        return res.status(200).json({status:true});
    });

	router.post('/admin-register', function(req, res) {
        let response={};
        let adminObj = new adminModel(req.body);
        adminObj.save(function(err,data){
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : data};
            }
            return res.status(200).json(response);
        });
    });

    router.put('/admin-update/:id',function(req, res){
        var response={};
        adminModel.findByIdAndUpdate(req.params.id, req.body, function(err, admin) {
                if(err) {
                    response = {"error" : true,"message" : err};
                } else {
                    response = {"error" : false,"message" : admin};
                }
                res.json(response);
            });
    });
    
    router.get('/admin-get/:id',function(req,res){
        var response={};
        adminModel.findById(req.params.id,function(err,customer){
            if (err) {
                response = {"error" : true,"message" : err};
            } else{
                response = {"error" : false,"message" : customer};
            };
            res.json(response);
        }); 
    });

    router.post('/admin-login', function(req, res, next) {
        let response = {};
        adminModel.find({username:req.body.username,password:req.body.password},function (err,adminObj) {
            if (adminObj.length > 0) {
                adminObj[0].custoken = '';
                console.log(adminObj[0])
                var token = jwt.sign({data: adminObj[0]}, "superSecret", {
                    expiresIn: 360000 // expires in 1 hours
                });
                adminObj[0].custoken = token;

                adminModel.findByIdAndUpdate(adminObj[0]._id, adminObj[0], function(err, userU) {
                    adminModel.findById(adminObj[0]._id, function(err, userIIII) {
                        if(err) {
                            response = {"error" : true,"message" : err};
                        } else {
                            response = {"error" : false,"message" : userIIII};
                        }
                        return res.status(200).json(response);
                    });
                });
            }else{
                return res.status(403).json({'message': 'Invalid Username/Password'});
            }
        });
    });

	
    router.post('/admin-forget-password',function(req,res,next){
        var response={};
        adminModel.find({email:req.body.email},function(err,data){
            if (err) {
                req.flash('error', 'something went wrong!');
            } else{
                if (data.length>0) {
                    var name = data[0].firstname+" <"+data[0].email+" >";
                    var content = "Password reset Link <a href='http://34.209.114.118:3003/admin/resetpassword/"+data[0]._id+"'>Click Here</a>"
                    req.mail.sendMail({  //email options
                       from: "Restaurant Team <habeebacount@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
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
                    res.json({error:true,message:'Email id does not exist'});
                }
            };
        }); 
    });


	router.get('/admin-logout', function(req, res) {
        var response={};
    	let userToken = req.headers['x-access-token'];
    	if (userToken != '' && typeof userToken != 'undefined') {
        	adminModel.find({custoken : userToken}, function (err,user) {
	            if (user.length > 0) {
	                user[0]['custoken'] = '';
	                adminModel.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
	                    if(err) {
	                        response = {"error" : true,"message" : err};
	                    } else {
	                        response = {"error" : false,"message" : 'Bye'};
	                    }
	                    return res.status(200).json(response);
	                });  
	            }else{
	                return res.status(403).json({
	                    'message': 'Unauthorize'
	                });
	            };
        	});
    	}else{
        	return res.status(403).json({'message': 'Unauthorize'});
    	};
	});

    return router;    
})();