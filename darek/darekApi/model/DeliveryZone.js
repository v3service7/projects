var mongoose = require('mongoose');
var Schema = mongoose.Schema;
RestaurantSchema = require('../model/Restaurant.js');

var ZoneSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  type: String,
  amount: String,
  radius: String,
  currency: {type: String, default : 'USD'},
  color: String,
  deliveryfee: String
});

var Zone = mongoose.model('Zone', ZoneSchema);
module.exports = Zone;

