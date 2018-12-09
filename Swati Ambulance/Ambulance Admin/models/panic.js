// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var PanicSchema = new Schema({
	user: Object,
	userLocation: {address:String, lat:String, lng:String}, 
	panic_at: { type: Date, time: true, default: Date.now },
	driver: Object,
	driverLocation: {address:String, lat:String, lng:String},
	driverReached_at: { type: Date, time: true },
	note: String,  	
	provider: Object,
	status: { type:Number, default:0 }
});

// the schema is useless so far
// we need to create a model using it
var Panic = mongoose.model('Panic', PanicSchema);

// make this available to our Panic in our Node applications
module.exports = Panic;