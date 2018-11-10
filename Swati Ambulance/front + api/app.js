const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');
const users = require('./routes/users');
const ambulances = require('./routes/ambulances');
const panics = require('./routes/panics');
const http = require('http');
global.siteUrl = 'http://18.221.47.77:3006/';



const fs = require('fs');
var multer = require('multer');



// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
	console.log('Connected to Database '+config.database);	
});

// On Error
mongoose.connection.on("error", (err) => {
	console.log('Connection to Database '+err);	
});

const app = express();

// Port Number
const port = 3006;

// CORS Middleware to access API from outside
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware to get form content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/ambulances', ambulances);
app.use('/panics', panics);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid End Point');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
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
	}
};

app.use(allowCrossDomain);

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/home/nodeapp/Ambulance/public/uploads/');
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});

var upload = multer({
	storage: storage
});

app.post('/uploads', function(req, res) {
	upload(req,res,function(err){
		console.log("err");
		console.log(err);
    	if(err){
    		res.json({error_code:1,err_desc:err});
			return;
 		}else{
        	res.json({error_code:0,err_desc:null,filename:req.file.filename});
       }
	});
});





















const server = http.createServer(app);

// Start Server
server.listen(port, () => {
	console.log('Server started on port '+ port);
});
