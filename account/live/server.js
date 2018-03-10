const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
privateKey = fs.readFileSync('private.key', 'utf8');
certificate = fs.readFileSync('sahal.vatfile.com.crt', 'utf8');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
const app = express();
var credentials = {key: privateKey, cert: certificate};
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const appKeyId = 'AKIAJQ3JPDEH6ORZ33JQ';
const secretKeyId = 'as1boyT8Dab2+nI3+xwA3oC/1BE2nfSYOEMtiCAh';
const S3_BUCKET = 'vatfile';
aws.config.update({region:'eu-west-1',accessKeyId:appKeyId,secretAccessKey:secretKeyId});
s3 = new aws.S3();

const index = require('./server/routes/index');
const api = require('./server/routes/api');

var db = mongoose.connect('mongodb://localhost:27017/accountDB', { useMongoClient: true });
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/ec2-user/vatfile/dist/assets/uploads/');
        //cb(null, './dist/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');

app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, filename: req.file.filename });
    });
});


app.post('/s3upload/:name',function(req, res, next){
    console.log(req.params.name)
    var fol = req.params.name;
    const storageS3 = multerS3({
        s3: s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const datetimestamp = Date.now();
            cb(null, fol+'/'+file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
    const upload = multer({
        storage: storageS3
    }).single('file');

    upload(req,res,function(err){
        if(err){
            console.log(err);
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null,filename:req.file});
    });
});

app.use('/', index);
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Invalid End Point');
}); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
}); 

const port = process.env.PORT || '4020';
app.set('port', port);

const porthttps = process.env.PORT || '4021';
app.set('port', porthttps);

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(porthttps, () => console.log(`Running on localhost:${porthttps}`));
server.listen(port, () => console.log(`Running on localhost:${port}`));