var mongoose = require('mongoose');
var Schema = mongoose.Schema;

customerSchema = require('../model/Customer.js');
RestaurantSchema = require('../model/Restaurant.js');

// create a schema
var RatingSchema = new Schema({
	restaurantId : { type: Schema.Types.ObjectId, ref: 'Restaurant' ,required: true },
	customerId: { type: Schema.Types.ObjectId, ref: 'Customer' ,required: true},
	review: String,
	rating : Number,
	created_at: { type: Date, default: Date.now }
});

var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;