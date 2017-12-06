// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var customerSchema = new Schema({
	firstname: String,
	lastname: String,
	image: String,
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phonenumber: Number,
	status: { type: Boolean, default: true },
	socketId: String
});

customerSchema.plugin(passportLocalMongoose);

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;