var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  	firstname: String,
  	lastname: String,
  	phonenumber: String,
  	dob: String,
  	email: { type: String, required: true, unique: true },
  	password: { type: String, required: true },
  	status: { type: Boolean, default: true },
});

var customer = mongoose.model('customer', customerSchema);
module.exports = customer;