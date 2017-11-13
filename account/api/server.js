const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
const app = express();

const multer = require('multer');

// API file for interacting with MongoDB
const index = require('./server/routes/index');
const api = require('./server/routes/api');

// database connection
var db = mongoose.connect('mongodb://localhost:27017/accountDB', { useMongoClient: true });
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// CORS Middleware to access API from outside
//app.use(cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,x-access-token,Authorization');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);

/*var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        //cb(null, '/kitchen/ms-2/public/uploads/');
        cb(null, './dist/uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});*/

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './dist/uploads/');
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
    console.log("req, res");
    console.log(req, res);
    upload(req, res, function(err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, filename: req.file.filename });
    });
});

// API location
app.use('/', index);
app.use('/api', api);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid End Point');
}); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}); 

//Set Port
const port = process.env.PORT || '4021';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));