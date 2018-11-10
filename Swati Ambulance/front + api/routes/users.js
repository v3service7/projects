const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/database');
const emails = require('../mail/emailConfig.js');
const randomstring = require("randomstring");


var validatetoken = 'JWTeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZEN1c3RvbWVyIjo5MCwiQ3VzdG9tZXJGbmFtZSI6IlQxRm5hbWUiLCJDdXN0b21lckxuYW1lIjoiVDFMbmFtZSI';

// Admin Login
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) 
            return res.json({ error: true, msg: err });
        if (!user) 
            return res.json({ error: true, msg: 'User not found' });        
        if (user.role != "Admin")
            return res.json({ error: true, msg: 'Not Authorized' });
        if (user.status === false )
            return res.json({ error: true, msg: 'Your account is not active.', data: user });
        
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) 
                return res.json({ error: true, msg: err });
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: '1d' // 1 day
                });
                res.json({
                    error: false,
                    token: 'JWT ' + token,
                    user: user
                });
            } else {
                return res.json({ error: true, msg: 'Wrong password' });
            }
        });
    });
});

// User Login
router.post('/userlogin', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) 
            return res.json({ error: true, msg: err });
        if (!user)
            return res.json({ error: true, msg: 'User not found' });
        if (user.role != "User")
            return res.json({ error: true, msg: 'Not Authorized' });
        if (user.status === false )
            return res.json({ error: true, msg: 'Your account is not active.', data: user });
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: '1d' // 1 day
                });

                res.json({
                    error: false,
                    token: 'JWT ' + token,
                    user: user
                });
            } else {
                return res.json({ error: true, msg: 'Wrong password' });
            }
        });
    });
});

// Driver Login
router.post('/driverlogin', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) 
            return res.json({ error: true, msg: err });
        if (!user)
            return res.json({ error: true, msg: 'Driver not found' });
        if (user.role != "Driver")
            return res.json({ error: true, msg: 'Not Authorized' });
        if (user.status === false )
            return res.json({ error: true, msg: 'Your account is not active.', data: user });
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: '365d' // 1 day
                });

                res.json({
                    error: false,
                    token: 'JWT ' + token,
                    user: user
                });
            } else {
                return res.json({ error: true, msg: 'Wrong password' });
            }
        });
    });
});

// User email verification
router.post('/user-verify', function (req, res) {
    let response = {};
    User.findOne({ 'email_token': req.body.token }, function (err, user) {
        if (err) {
            response = { "error": true, "message": 'Connection Lost!' };
            return res.json(response);
        } else {
            if (user) {
                User.findByIdAndUpdate(user._id, { status: true }, function (err, user) {
                    if (err) {
                        response = { "error": true, "message": 'Update Unsuccessful! Please Try Again' };
                        return res.json(response);
                    } else {
                        response = { "error": false, "message": 'Your account successfully activated, You can login now.' };
                        return res.json(response);
                    }
                });
            } else {
                response = { "error": true, "message": 'Email Activation Link Expired.' };
                return res.json(response);
            }
        };
    });
});


// Resend Activation Link
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
                User.findByIdAndUpdate(cstmr[0]._id, cstmr[0], function (err, customer) {
                    User.findById(customer._id, function (err, customer1) {
                        if (err) {
                            response = { "error": true, "message": 'Connection Timeout!' };
                            return res.json(response);
                        } else {
                            response = { "error": false, "message": 'Email Sent! Please access your Email ID to Activate your Account' };
                            emails.emailShoot(cstmr[0].email, cstmr[0].firstname, token);
                            return res.json(response);
                        }
                    });
                });
            } else {
                response = { "error": true, "message": 'Account is already Activated' };
                return res.json(response);
            }
        }
    });
});

// User Registration
router.post('/', (req, res, next) => {
    let userToken = req.headers.auth;
    let token = randomstring.generate();
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        email_token: token.toLowerCase(), 
        user: req.body.user,   
        role: req.body.role,
        status: req.body.status
    });
    if (validatetoken == userToken) {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({ error: true, msg: err });
            } else {
                if(req.body.role != 'Driver')
                    emails.emailShoot(user.email, user.email, user.email_token);
                res.json({ error: false, msg: 'User registered' });
            }
        });
    }else{
        res.json({ error: true, msg: 'unauthorized' });
    }
});

// User Reset Password
router.put('/resetPassword/:id', (req, res) => {
    var response = {};
    User.encryptPassword(req.body.password, (err, hash) => {
        var newObject = {};
        newObject.password = hash;
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

// User Profile based on Session
router.get('/profile', (req, res, next) => {
    res.json({ user: req.user });
});

// User List
router.get('/', (req, res, next) => {
    let role = 'User';
    if (typeof req.query.role !== 'undefined' && req.query.role !== null)
        role = req.query.role;
    var response = {};
    if(role !== 'Driver')
    {
        User.find({ role: role }, null, { sort: { firstname: 1 } }, (err, data) => {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": data };
            };
            res.json(response);
        });
    }
    else {
        User.find({ role: role }, null, { sort: { firstname: 1 } }).populate('user').exec(function(err, data) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": data };
            };
            res.json(response);
        });
    }
});



// Get User by id
router.get('/:id', (req, res) => {
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


// User Update
router.put('/:id', (req, res) => {
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
router.put('/changePassword/:id', (req, res) => {
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


// Delete User by id
router.delete('/:id', (req,res) => {    
    var response={};
    User.remove({_id:req.params.id}, (err,data) => {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        };
        res.json(response);
    }); 
});


// check password 
router.post('/checkpassword/:id', (req, res) => {
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

// Admin Change Password
router.put('/adminchangePassword/:id', (req, res) => {  
    var response={};

    User.findById(req.body.adminID, (err, user) => {
        User.comparePassword(req.body.password, user.password, (err, isMatch) => {
          if(isMatch) {
            User.encryptPassword(req.body.newpassword, (err, hash) => {
                    var newObject = {};
                    newObject.password = hash;
                    User.findByIdAndUpdate(req.params.id, newObject, (err, customer) => {
              if (err) {
                response = {"_error" : true, "message" : {'status':'Bad payload - invalid entity or filed', 'description':err}};
              } else {
                response = {"_error" : false,"message" : {'status':'Password Changed Successfully', 'description':null}};   
              }
              res.json(response);
              }); 
            });   
        } else {
                response = {"_error" : true, "message" : {'status':'Admin Password Incorect', 'description':null}};
                res.json(response);
        }
      });
  }); 
}); 


module.exports = router;
