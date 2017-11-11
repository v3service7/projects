var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ownerSchema = new Schema({
	firstname: String,
	lastname: String,
	phoneNo : String,
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created_at: Date,
	updated_at: Date
});

var Owner = mongoose.model('Owner', ownerSchema);

// make this available to our users in our Node applications
module.exports = Owner;