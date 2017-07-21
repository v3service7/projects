// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuModel = require('../model/Restaurant.js');

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
    status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date,
    restaurantId : {  type: Schema.Types.ObjectId, ref:'Restaurant', required: true },
});

// the schema is useless so far
// we need to create a model using it
var Driver = mongoose.model('Driver', DriverSchema);

// make this available to our users in our Node applications
module.exports = Driver;