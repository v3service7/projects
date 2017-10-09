const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// database connection
var db  = mongoose.connect('mongodb://localhost:27017/accountDB');
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// cross origin access
allowCrossDomain = function(req, res, next) {
  	res.header('Access-Control-Allow-Credentials', true);
  	res.header('Access-Control-Allow-Origin', req.headers.origin);
  	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  	if ('OPTIONS' === req.method) {
    	res.sendStatus(200);
  	} else {
    	next();
  	}
};
app.use(allowCrossDomain);


// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));