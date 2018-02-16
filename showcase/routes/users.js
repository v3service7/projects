const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/database');
const emails = require('../mail/emailConfig.js');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');


router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    //console.log(user);
    if(user.role != "Admin"){
      return res.json({success: false, msg: 'Not Authorized'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
		  const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 3600 // 1 hour
        });

        res.json({
          success: true,
          token: 'JWT '+token,
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
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.post('/customer-verify', function(req, res) {
        let response = {};
        console.log(req.body.token)
        User.findOne({ 'email_token': req.body.token }, function(err, customer) {
            if (err) {
                response = { "error": true, "message": 'Connection Lost!' };
                return res.json(response);
            } else {
                console.log(customer)
                if (customer) {
                    User.findByIdAndUpdate(customer._id, { status: true }, function(err, customer) {
                        if (err) {
                            response = { "error": true, "message": 'Update Unsuccessful! Please Try Again' };
                            return res.json(response);
                        } else {
                            response = { "error": false, "message": 'Your account successfully activated, please click here to login' };
                            return res.json(response);
                        }
                    });
                }else{
                    response = { "error": true, "message": 'Email Activation Link Expire.' };
                    return res.json(response);
                }
            };
        });
});

// User social-login
router.post('/social-insta', (req, res, next) => {
    console.log(req.params.code)
    console.log(req.body.code)
    res.json(req.body.code);
})

router.post('/social-login', (req, res, next) => {
    const email = req.body.email;
    User.getUserByUsername(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        if(err) throw err;
        if(user){
            const token = jwt.sign({data:user}, config.secret, {
                expiresIn: 3600 // 1 hour
            });
            res.json({
                success: true,
                token: 'JWT '+token,
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
            return res.json({success: false, msg: 'Something Went Wrong'});
        }
    });
}); 

// User Login
router.post('/userlogin', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
      const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 3600 // 1 hour
        });

        res.json({
          success: true,
          token: 'JWT '+token,
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
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// User Profile based on Session
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// User List
router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {    
    var response={};
    User.find({role: "User"}, null, {sort: {created_at: 1}}, (err, data) => {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };        
        res.json(response);
    }); 
});

// User Add
router.post('/', (req, res, next) => {
    let token = randomstring.generate();
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email_token: token.toLowerCase(),
        dob: req.body.dob,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        status: false
    });
    User.addUser(newUser, (err, user) => {
        if(err){          
            res.json({error: true, msg:err});
        } else {
            emails.emailShoot(user.email,user.email,user.email_token);
            res.json({error: false, msg:'User registered'});
        }
    });
}); 

// User social-register
router.post('/social-register', (req, res, next) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
        if(err){          
            res.json({error: true, msg:err});
        } else {
            res.json({error: false, msg:'User registered'});
        }
    });
}); 



// User Update
router.put('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {    
    var response={};
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : user};
            }
            res.json(response);
        });
});

// User Change Password
router.put('/changePassword/:id', passport.authenticate('jwt', {session:false}), (req, res) => {    
  var response={};
  User.findById(req.params.id, (err, user) => {
    User.comparePassword(req.body.password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
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
  var response={};
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
router.post('/forgotPassword', function(req, res, next) {
    var response = {};
    User.find({ email: req.body.email }, function(err, data) {
        if (err) {
            req.flash('error', 'something went wrong!');
        } else {
            if (data.length > 0) {
                emails.forgetEmailShoot(data[0]);
                res.json({ error: false, message: 'Email sent Successfully' });
            } else {
                res.json({ error: true, message: 'Email id does not exist' });
            }
        };
    });
});


// Get User Profile by id
router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {    
    var response={};
    User.findById(req.params.id, (err,data) => {
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        };
        res.json(response);
    }); 
});


// Delete User by id
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {    
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

module.exports = router;
