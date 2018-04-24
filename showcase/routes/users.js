const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Category = require("../models/category.js");
let bookmarkModel = require("../models/bookmark");
const config = require('../config/database');
const emails = require('../mail/emailConfig.js');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const request = require('request');
const Twitter = require("node-twitter-api");
const twitter = new Twitter({
    consumerKey: 'nDNVhhX7f8LOjUvo0TRkBakzD',
    consumerSecret: 'Yh3lYhukSMtwTdscpsmG5L6Lv5a8nhReq8gpokY5pNxFPLlVaw',
    callback: 'https://measuremight.com:3002/'
});
var validatetoken = 'showcase eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSIsIkN1c3RvbWVyVGVsbm8iOiIxMTExMTExMTExIiwiQ3VzdG9tZXJFbWFpbCI6IlQxQHppaXB0cmFuc2l0LmNvbSIsIkN1c3RvbWVyUGFzc3dvcmQiOiIkMmEkMTAkUG81R0JRUlRHWUpPYU9yaU9OZXE3T1lSeTI0Y1hPZktuQ0NMMy4xaFVTaE56WS9hMDVEQS4iLCJDdXN0b21lckdlbmRlciI6Ik5VTEwiLCJDdXN0b21lckZhY2Vib29rSWQiOiJOVUxMIiwiQ3VzdG9tZXJQaWN0dXJlUGF0aCI6IjAuMDAiLCJDdXN0b21lcklzU3R1ZGVudCI6MCwiQ3VzdG9tZXJWZXJpZnlUZWxubyI6MCwiQ3VzdG9tZXJWZXJpZnlFbWFpbCI6MSwiQ3VzdG9tZXJJc0luYWN0aXZlIjowLCJDdXN0b21lclZlcmlmaWNhdGlvblRva2VuIjpudWxsLCJpYXQiOjE1MDA0MTAyMzQsImV4cCI6MTUwMzAwMjIzNH0.mPlmkuFDISGyjUl6GzELjKTCrAfmdjtuSdtrF45yLvY';
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getAdminByUsername(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        //console.log(user);
        if (user.role != "Admin") {
            return res.json({ success: false, msg: 'Not Authorized' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: '1d' // 1 day
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phonenumber: user.phonenumber,
                        dob: user.dob,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

router.post('/customer-verify', function (req, res) {
    let response = {};
    console.log(req.body.token)
    User.findOne({ 'email_token': req.body.token }, function (err, customer) {
        if (err) {
            response = { "error": true, "message": 'Connection Lost!' };
            return res.json(response);
        } else {
            console.log(customer)
            if (customer) {
                User.findByIdAndUpdate(customer._id, { status: true }, function (err, customer) {
                    if (err) {
                        response = { "error": true, "message": 'Update Unsuccessful! Please Try Again' };
                        return res.json(response);
                    } else {
                        response = { "error": false, "message": 'Your account successfully activated, You can login now.' };
                        return res.json(response);
                    }
                });
            } else {
                response = { "error": true, "message": 'Email Activation Link Expire.' };
                return res.json(response);
            }
        };
    });
});

router.get("/request-token", function (req, res) {
    twitter.getRequestToken(function (err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err);
        else {
            let uri = "https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken;
            //console.log(uri)
            res.json({ 'url': uri, 'requestSecret': requestSecret });
        }
    });
});

router.post("/access-token", function (req, res) {
    var requestToken = req.body.oauth_token,
        verifier = req.body.oauth_verifier,
        requestSecret = req.body.requestSecret;

    twitter.getAccessToken(requestToken, requestSecret, verifier, function (err, accessToken, accessSecret) {
        if (err){
            res.status(500).send(err);
        }else{
            const obj = { 'include_email': true, 'skip_status': true, 'include_entities': true};
            twitter.verifyCredentials(accessToken, accessSecret, obj, function (err, user) {
                if (err)
                    res.status(500).json(err);
                else
                    res.json(user);
            });}
    });
});

// User social-login
router.post('/social-insta', (req, res, next) => {
    let postObj = {};
    postObj['code'] = req.body.code;
    postObj['client_id'] = '98349c5779404c6ea9c9aa59e0e3aeeb';
    postObj['client_secret'] = '7d373b3a6f754a8e8086705ad4738c2b';
    postObj['redirect_uri'] = 'https://measuremight.com:3002/';
    postObj['grant_type'] = 'authorization_code';
    request.post({
        uri: 'https://api.instagram.com/oauth/access_token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: require('querystring').stringify(postObj)
    }, function (err, response, body) {
        res.json(body);
    })
})

router.post('/social-login', (req, res, next) => {
    console.log(req.body)

    const email = req.body.email;
    const provider = req.body.provider;
    User.getUserByUsername(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        if (err) throw err;
        if (user) {
            const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: '1d' // 1 day
            });
            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phonenumber: user.phonenumber,
                    dob: user.dob,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({ success: false, msg: 'Something Went Wrong' });
        }
    });
});

// User Login
router.post('/userlogin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByUsername(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        if (user.status === false ) {
            return res.json({ success: false, msg: 'Your account is not active.', data: user });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: '1d' // 1 day
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phonenumber: user.phonenumber,
                        dob: user.dob,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// User Profile based on Session
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

// User List
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var response = {};
    User.find({ role: "User" }, null, { sort: { firstname: 1 } }, (err, data) => {
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "error": false, "message": data };
        };
        res.json(response);
    });
});


router.post('/resend-activation-link', function (req, res) {
    var response = {};
    User.find({ email: req.body.email }, null, function (err, cstmr) {

        if (err) {
            response = { "error": true, "message": err };
            return res.json(response);
        }

        if (cstmr && cstmr.length == 0) {
            response = { "error": true, "message": 'Incorrect Email' };
            return res.json(response);
        }

        if (cstmr && cstmr.length > 0) {
            if (cstmr[0].status == false) {
                var token = randomstring.generate()
                cstmr[0].email_token = token;
                /*response = { "error": false, "message": cstmr[0] };*/
                User.findByIdAndUpdate(cstmr[0]._id, cstmr[0], function (err, customer) {
                    User.findById(customer._id, function (err, customer1) {
                        if (err) {
                            response = { "error": true, "message": 'Connection Timeout!' };
                            return res.json(response);
                        } else {
                            response = { "error": false, "message": 'Email Sent! Please access your Email ID to Activate your Account' };
                            emails.emailShoot(cstmr[0].email, cstmr[0].email, token);
                            return res.json(response);
                        }
                    });
                });
            } else {
                response = { "error": false, "message": 'Account is already Activated' };
                return res.json(response);
            }
        }
    });
});

// User Add
router.post('/', (req, res, next) => {
    var userToken = req.headers.auth;
    let token = randomstring.generate();
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email_token: token.toLowerCase(),
        dob: req.body.dob,
        provider: 'email',
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status
    });
    if (validatetoken == userToken) {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({ error: true, msg: err });
            } else {
                emails.emailShoot(user.email, user.email, user.email_token);
                var obj ={};
                obj['name'] = 'My Showcase';
                obj['position'] = 0;
                obj['user_id'] = newUser._id;
                category = new Category(obj);
                category.save();
                res.json({ error: false, msg: 'User registered' });
            }
        });
    }else{
        res.json({ error: true, msg: 'unauthorized' });
    }
});

// User social-register
router.post('/social-register', (req, res, next) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ error: true, msg: err });
        } else {
            var obj = {};
            obj['name'] = 'Showcase';
            obj['position'] = 0;
            obj['user_id'] = newUser._id;
            category = new Category(obj);
            category.save();
            res.json({ error: false, msg: 'User registered' });
        }
    });
});



// User Update
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    var response = {};
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            response = { "error": true, "message": err };
        } else {
            response = { "error": false, "message": user };
        }
        res.json(response);
    });
});

// User Change Password
router.put('/changePassword/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    var response = {};
    User.findById(req.params.id, (err, user) => {
        User.comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                User.encryptPassword(req.body.newpassword, (err, hash) => {
                    var newObject = {};
                    newObject.password = hash;
                    User.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
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

// User Reset Password
router.put('/resetPassword/:id', (req, res) => {
    var response = {};
    User.encryptPassword(req.body.password, (err, hash) => {
        var newObject = {};
        newObject.password = hash;
        console.log(hash);
        User.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": "Password Reset Successfully" };
            }
            res.json(response);
        });
    });
});


// User Forgot Password
router.post('/forgotPassword', function (req, res, next) {
    var response = {};
    User.find({ email: req.body.email }, function (err, data) {
        if (err) {
            req.flash('error', 'something went wrong!');
        } else {
            if (data.length > 0) {
                emails.forgetEmailShoot(data[0]);
                res.json({ error: false, message: 'Please check your email to reset the password.' });
            } else {
                res.json({ error: true, message: 'Email id does not exist' });
            }
        };
    });
});


// Get User Profile by id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    var response = {};
    User.findById(req.params.id, (err, data) => {
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "error": false, "message": data };
        };
        res.json(response);
    });
});


// Delete User by id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params.id);
    var response = {};
    Category.find({ user_id: req.params.id }, function (err, categories) {
        for (var i = 0; i > categories.length; i++ ){
            bookmarkModel.remove({ category_id: categories[i]['_id'] }, function (err, bookmark) {
                Category.remove({ _id: categories[i]['_id'] }, function (err, category) {
                    console.log(categories[i]['_id']);
                });
            });
        }
        User.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": "Deleted Successfully" };
            };
            res.json(response);
        });
        
    });
});


// check password 
router.post('/checkpassword/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    var response = {};
    User.findById(req.params.id, (err, user) => {
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
            res.json(response);
        } else {
            User.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    response = { "error": true, "message": 'Error fetching data' };
                    res.json(response);
                }
                if (isMatch) {
                    response = { "error": false, "message": 'Password match' };
                    res.json(response);
                } else {
                    response = { "error": true, "message": 'Password does not match' };
                    res.json(response);
                }
            });
        }

    });
});



module.exports = router;
