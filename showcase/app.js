const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');
const users = require('./routes/users');
const pages = require('./routes/pages');
const plans = require('./routes/plans');
const purchaseplans = require('./routes/purchaseplans');
const http = require('http');
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/measuremight.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/measuremight.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/measuremight.com/chain.pem')
};

var multer = require('multer');
// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
	console.log('Connected to Database '+config.database);	
});

// On Error
mongoose.connection.on("error", (err) => {
	console.log('Connected to Database '+err);	
});

const app = express();

// Port Number
const port = 3001;
const httpsPort = 3002;

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
app.use('/plan', plans);
app.use('/page', pages);
app.use('/purchaseplan', purchaseplans);

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //cb(null, 'public/uploads/');
        cb(null, 'public/uploads/');
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
        console.log(err);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null,filename:req.file.filename});
    });
});

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid End Point');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const server = http.createServer(app);
// Start Server
server.listen(port, () => {
  console.log('Server started on port '+port);
});

// Start Https Server
const httpsServer = https.createServer(options ,app);

httpsServer.listen(httpsPort, () => {
	console.log('Server started on port '+httpsPort);
});

/*https.createServer(options, function (req, res) {
  
}).listen(8000);*/
