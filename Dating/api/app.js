
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var adminSetting = require('./routes/AdminSetting');
var customer = require('./routes/customer');
var friend = require('./routes/friends');
var page = require('./routes/page');
var country = require('./routes/country');
var User = require('./model/User.js');
var Customer = require('./model/Customer.js');
var Message = require('./model/Message.js');
var socket_io = require('socket.io');
var Jimp = require("jimp");

//var gm = require("gm").subClass({ imageMagick: true });
var app = express(); 

var io= socket_io();
app.io = io;

var chat = require('./routes/chat')(io);


var multer = require('multer');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.Promise = global.Promise;
var db  = mongoose.connect('mongodb://localhost:27017/datingDB');
app.use(function(req,res,next){
  req.db = db;
  next();
});

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }};

  app.use(allowCrossDomain);

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
   cb(null, '/home/nodeapp/dating/public/uploads/');
   //cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
    console.log(req.file);
    if(err){
     res.json({error_code:1,err_desc:err});
     return;
     }else{  
          res.json({error_code:0,err_desc:null,filename:req.file.filename});
  
         /* if((req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg') &&  (req.file.size > 60000)){
                  Jimp.read('public/uploads/' + req.file.filename).then(function (actionfile) {
                  actionfile.quality(20)                 // set JPEG quality         
                  .write('public/uploads/' + req.file.filename);  // save
                  }).catch(function (err) {
                  //if (err) {console.log(' error hooray!');  res.json({error_code:1,err_desc:err});}
                  console.error(err);
                  });                  
            }*/
       }
   
 });
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

 var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "logindharam@gmail.com",
       pass: "dellcomputers"
   }
});
app.use(function(req, res, next) {
    req.mail = smtpTransport;
    next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/', routes);
app.use('/users', users);
app.use('/adminSetting',adminSetting);
app.use('/customer',customer);
app.use('/chat',chat);
app.use('/friend',friend);
app.use('/page',page);
app.use('/country',country);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //consol.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
