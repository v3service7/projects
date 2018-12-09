// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var AmbulanceSchema = new Schema({
  	ambulanceNumber: { type: String, required: true, trim: true },
  	ambulanceDesc: String,
	provider: { type: Schema.Types.ObjectId, ref: 'User' },
	driver: { type: Schema.Types.ObjectId, ref: 'User' },
  	status: { type: Boolean, default: true },
  	created_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Ambulance = mongoose.model('Ambulance', AmbulanceSchema);

// make this available to our Ambulance in our Node applications
module.exports = Ambulance;