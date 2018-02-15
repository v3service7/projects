var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
  	name: String,
  	desc: String,
  	amount:String,
  	planType: Number,
  	status: { type: Boolean, default: true },
});

var plan = mongoose.model('plan', planSchema);
module.exports = plan;