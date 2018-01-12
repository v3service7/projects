// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var TradeAlertSchema = new Schema({
  	userId: { type: Schema.Types.ObjectId, ref: 'User' },
  	exchangeName: String,
  	exchangeMarket: String,
  	alertPrice: Number,
  	notes: String,
  	sound: String,
  	isOpen: {type:Boolean, default: true },
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var TradeAlert = mongoose.model('TradeAlert', TradeAlertSchema);

// make this available to our TradeAlert in our Node applications
module.exports = TradeAlert;