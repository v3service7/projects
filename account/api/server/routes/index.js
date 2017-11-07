module.exports = (function() {
    'use strict';
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const express = require('express');
    const router = express.Router();
    var moment = require('moment');
    const randomstring = require("randomstring");
    var now = moment();



    /*load Model*/
    /*let adminModel = require("../model/admin.js");*/
    let customerModel = require("../model/customer.js");
    var emails = require('../mail/emailConfig.js');


    router.post('/testmail', function(req, res) {
        const tet = emails.emailTest();
        if (tet) {
            return res.status(200).json({status: false, message:'Accessed'  });
        }else{
            return res.status(403).json({status: false, message:'Access Denied'  });
        }
    });

    router.post('/customer-verify', function(req, res) {
        let response = {};
        customerModel.findOne({ 'email_token': req.body.token }, function(err, customer) {
            if (err) {
                response = { "error": true, "message": 'Connection Lost!' };
                return res.json(response);
            } else {
                var registerTime = moment(customer.created_at).format('YYYY-MM-DD HH:mm:ss');
                var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
                if (moment(currentTime).diff(moment(registerTime), 'days') >= 1) {
                    response = { "error": true, "message": 'Email Activation Link Expire.' };
                    return res.json(response);
                } else {
                    customerModel.findByIdAndUpdate(customer._id, { status: true }, function(err, customer) {
                        if (err) {
                            response = { "error": true, "message": 'Update Unsuccessful! Please Try Again' };
                        } else {
                            response = { "error": false, "message": 'Your account successfully activated, please click here to login' };
                        }
                        return res.json(response);
                    });
                }
            };
        });
    });

    router.get('/test', function(req, res) {
        const tet = emails.emailTest();
        if (tet) {
            return res.status(200).json({status: false, message:'Accessed'  });
        }else{
            return res.status(200).json({status: false, message:'Access Denied'  });
        }
    });

    router.get('/admin-getall', function(req, res, next) {
        var response = {};
        customerModel.find({role : 'Admin'}, null, { sort: { created_at: 1 } }, function(err, admins) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": admins };
            };
            res.json(response);
        });
    });

    router.post('/admin-register', function(req, res) {
        let response = {};
        req.body.role = 'Admin';
        /*let adminObj = new customerModel(req.body);
        adminObj.save(function(err, data) {*/
        let newUser = new customerModel(req.body);

        customerModel.addUser(newUser, (err, user) => {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": 'Admin Registered!' };
            }
            return res.status(200).json(response);
        });
    });

    router.put('/admin-update/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        customerModel.findByIdAndUpdate(req.params.id, req.body, function(err, admin) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": admin };
            }
            res.json(response);
        });
    });

    router.put('/admin-change-password/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response={};
        customerModel.findById(req.params.id, (err, user) => {
            customerModel.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    customerModel.encryptPassword(req.body.newpassword, (err, hash) => {
                        var newObject = {};
                        newObject.password = hash;
                        customerModel.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
                            if (err) {
                                response = { "error": true, "message": err };
                            } else {
                                response = { "error": false, "message": "Password Changed Successfully" };
                            }
                            res.json(response);
                        });
                    });          
                } else {
                    response = { "error": true, "message": "Password Incorect" };
                    res.json(response);
                }
            });
        });
    });

    router.put('/admin-reset-password/:id', function(req, res) {
        var response={};
        customerModel.encryptPassword(req.body.password, (err, hash) => {
            var newObject = {};
            newObject.password = hash;
            console.log(hash);
            customerModel.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
                if (err) {
                    response = { "error": true, "message": err };
                } else {
                    response = { "error": false, "message": "Password Reset Successfully" };
                }
                res.json(response);
            });
        });
    });

    router.get('/admin-get/:id', passport.authenticate('jwt', {session:false}), function(req, res) {
        var response = {};
        customerModel.findById(req.params.id, function(err, customer) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": customer };
            };
            res.json(response);
        });
    });

    router.post('/admin-login', function(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        customerModel.getUserByEmail(email, (err, user) => {
            if(err) throw err;
            if(!user){
                return res.json({success: false, msg: 'User not found'});
            }
            if(user.role != "Admin"){
                return res.json({success: false, msg: 'Not Authorized'});
            }

            customerModel.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({data:user}, 'accountHabeeb', {
                        expiresIn: 3600 // 1 hour
                    });

                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: user
                    });
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
            });
        });
    });

    router.post('/admin-forget-password', function(req, res, next) {
        var response = {};
        customerModel.find({ email: req.body.email, role : 'Admin'}, function(err, data) {
            if (err) {
                req.flash('error', 'something went wrong!');
            } else {
                if (data.length > 0) {
                    emails.forgetEmailShoot(data[0],'admin');
                    res.json({ error: false, message: 'Email sent Successfully' });
                } else {
                    res.json({ error: true, message: 'Email id does not exist' });
                }
            };
        });
    });

    router.get('/admin-logout', function(req, res) {
        var response = {};
        let userToken = req.headers['x-access-token'];
        if (userToken != '' && typeof userToken != 'undefined') {
            customerModel.find({ custoken: userToken }, function(err, user) {
                if (user.length > 0) {
                    user[0]['custoken'] = '';
                    customerModel.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
                        if (err) {
                            response = { "error": true, "message": err };
                        } else {
                            response = { "error": false, "message": 'Bye' };
                        }
                        return res.status(200).json(response);
                    });
                } else {
                    return res.status(403).json({
                        'message': 'Unauthorize'
                    });
                };
            });
        } else {
            return res.status(403).json({ 'message': 'Unauthorize' });
        };
    });

    /*Customer Login*/

    router.post('/customer-login', function(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        customerModel.getUserByEmail(email, (err, user) => {
            if(err) throw err;
            if(!user){
                return res.json({success: false, msg: 'User not found'});
            }
            /*if(!user.status){
                return res.json({success: false, msg: 'Your account is not active'});
            }*/
            if(user.role == "Admin"){
                return res.json({success: false, msg: 'Not Authorized'});
            }

            customerModel.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({data:user}, 'accountHabeeb', {
                        expiresIn: 3600 // 1 hour
                    });
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: user
                    });
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
            });
        });
    });

    router.post('/customer-email-verify', function(req, res) {
        var response = {};
        var token = randomstring.generate()
        req.body.email_token = token;
        emails.emailShoot(req.body.email, req.body.email, token);
        res.json(response);
    });

    // User Add
    /*router.post('/customer-register', (req, res, next) => {
        let newUser = new customerModel(req.body);

        customerModel.addUser(newUser, (err, user) => {
            console.log("err");
            console.log(err);
            console.log(user);
            if(err){
                res.json({success: false, msg:err});
            } else {
                res.json({success: true, msg:'User registered'});
            }
        });
    }); */

    router.get('/customer-logout', function(req, res) {
        var response = {};
        let userToken = req.headers['x-access-token'];
        if (userToken != '' && typeof userToken != 'undefined') {
            customerModel.find({ custoken: userToken }, function(err, user) {
                if (user.length > 0) {
                    user[0]['custoken'] = '';
                    customerModel.findByIdAndUpdate(user[0]._id, user[0], function(err, userU) {
                        if (err) {
                            response = { "error": true, "message": err };
                        } else {
                            response = { "error": false, "message": 'Bye' };
                        }
                        return res.status(200).json(response);
                    });
                } else {
                    return res.status(403).json({
                        'message': 'Unauthorize'
                    });
                };
            });
        } else {
            return res.status(403).json({ 'message': 'Unauthorize' });
        };
    });

    router.put('/customer-change-password/:id', function(req, res) {
        var response={};
        customerModel.findById(req.params.id, (err, user) => {
            customerModel.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    customerModel.encryptPassword(req.body.newpassword, (err, hash) => {
                        var newObject = {};
                        newObject.password = hash;
                        customerModel.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
                            if (err) {
                                response = { "error": true, "message": err };
                            } else {
                                response = { "error": false, "message": "Password Changed Successfully" };
                            }
                            res.json(response);
                        });
                    });          
                } else {
                    response = { "error": true, "message": "Password Incorect" };
                    res.json(response);
                }
            });
        });
    });

    router.post('/customer-forget-password', function(req, res, next) {
        var response = {};
        customerModel.find({ email: req.body.email, role : 'User' }, function(err, data) {
            if (err) {
                req.flash({ error: true, message: 'Unable to reach Server!'});
            } else {
                if (data.length > 0) {
                    emails.forgetEmailShoot(data[0],'cust');
                    res.json({ error: false, message: 'Email sent Successfully' });
                } else {
                    res.json({ error: true, message: 'Email Id does not exist' });
                }
            };
        });
    });

    router.put('/customer-reset-password/:id', function(req, res) {
        var response={};
        customerModel.encryptPassword(req.body.password, (err, hash) => {
            var newObject = {};
            newObject.password = hash;
            console.log(hash);
            customerModel.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
                if (err) {
                    response = { "error": true, "message": err };
                } else {
                    response = { "error": false, "message": "Password Reset Successfully" };
                }
                res.json(response);
            });
        });
    });

    router.put('/otp-validate/:id', function(req, res) {
        var response={};
        customerModel.findById(req.params.id, (err, customerObj) => {
            console.log(customerObj)
            if (customerObj.otp == req.body.otp) {
                let obj = {};
                obj.otp='';
                obj.phonestatus=true;
                customerModel.findByIdAndUpdate(req.params.id, obj, (err, customer) => {
                    if (err) {
                        response = { "error": true, "message": err };
                    } else {
                        response = { "error": false, "message": "OTP Veryfied" };
                    }
                    res.json(response);
                });
            }else{
                response = { "error": true, "message": "Wrong OTP" };
                res.json(response);
            }
        });
    });

    router.put('/customer-otp/:id', function(req, res) {
        var response={};
        var newObject = {};
        customerModel.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": "OTP Update" };
            }
            res.json(response);
        });
    });

    return router;
})();