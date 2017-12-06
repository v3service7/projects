// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuModel = require('../model/Restaurant.js');
var OrderModel = require('../model/Order.js');

// create a schema
var DriverSchema = new Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address : String,
    phoneNo : String,
    vehicleType : String,
    vehicleName : String,
    vehicleNo: String,
    driverStatus : {type: String,default: 'Available',enum:['Available', 'onDuty']},
    status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date,
    lat : String,
    lng : String,
    orderIds : [{  type: Schema.Types.ObjectId, ref:'Order' }],
    restaurantId : {  type: Schema.Types.ObjectId, ref:'Restaurant', required: true },
    socketId: String
});

// the schema is useless so far
// we need to create a model using it
var Driver = mongoose.model('Driver', DriverSchema);

// make this available to our users in our Node applications
module.exports = Driver;