module.exports = (function() {
    'use strict';
    const jwt = require('jsonwebtoken');
    const express = require('express');
    const router = express.Router();
    var moment = require('moment');
    var now = moment();



    /*load Model*/
    let adminModel = require("../model/admin.js");
    let customerModel = require("../model/customer.js");
    var emails = require('../mail/emailConfig.js');


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
                            response = { "error": false, "message": '“Your account successfully activated, please click here to login' };
                        }
                        return res.json(response);
                    });
                }
            };
        });
    });

    router.get('/test', function(req, res) {
        let response = {};
        return res.status(200).json({ status: true });
    });

    router.get('/admin-getall', function(req, res, next) {
        var response = {};
        customerModel.find({}, null, { sort: { created_at: 1 } }, function(err, admins) {
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
        let adminObj = new customerModel(req.body);
        adminObj.save(function(err, data) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": data };
            }
            return res.status(200).json(response);
        });
    });

    router.put('/admin-update/:id', function(req, res) {
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

    router.put('/admin-change-password/:id', function(req, res) {
        var response = {};
        customerModel.findById(req.params.id, function(err, admin) {
            if (admin.password == req.body.password) {
                var newObject = {};
                newObject.password = req.body.newpassword;
                customerModel.findByIdAndUpdate(req.params.id, newObject, function(err, kitchen) {
                    if (err) {
                        response = { "error": true, "message": err };
                    } else {
                        response = { "error": false, "message": "Password changed Successfully " };
                    }
                    res.json(response);
                });
            } else {
                response = { "error": true, "message": "Password Incorect" };
                res.json(response);
            };
        });
    });

    router.get('/admin-get/:id', function(req, res) {
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
        customerModel.find({ email: req.body.email }, function(err, data) {
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

    // User Add
    router.post('/customer-register', (req, res, next) => {
        let newUser = new customerModel(req.body);

        customerModel.addUser(newUser, (err, user) => {
            if(err){          
                res.json({success: false, msg:err});
            } else {
                res.json({success: true, msg:'User registered'});
            }
        });
    }); 

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
        var response = {};
        customerModel.findById(req.params.id, function(err, admin) {
            if (admin.password == req.body.password) {
                var newObject = {};
                newObject.password = req.body.newpassword;
                customerModel.findByIdAndUpdate(req.params.id, newObject, function(err, customer) {
                    if (err) {
                        response = { "error": true, "message": err };
                    } else {
                        response = { "error": false, "message": "Password changed Successfully " };
                    }
                    res.json(response);
                });
            } else {
                response = { "error": true, "message": "Password Incorect" };
                res.json(response);
            };
        });
    });


    router.post('/customer-forget-password', function(req, res, next) {
        var response = {};
        customerModel.find({ email: req.body.email }, function(err, data) {
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

    return router;
})();