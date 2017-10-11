const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

// API file for interacting with MongoDB
const index = require('./server/routes/index');
const api = require('./server/routes/api');

// database connection
var db  = mongoose.connect('mongodb://localhost:27017/accountDB', { useMongoClient: true });
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.set('superSecret', 'securityURI');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));



// API location
app.use('/', index);
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '4021';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));