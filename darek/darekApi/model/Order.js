var mongoose = require('mongoose');
var Schema = mongoose.Schema;

customerSchema = require('../model/Customer.js');
RestaurantSchema = require('../model/Restaurant.js');

// create a schema
var OrderSchema = new Schema({
	restaurantId : { type: Schema.Types.ObjectId, ref: 'Restaurant' ,required: true },
	customerId : { type: Schema.Types.ObjectId, ref: 'Customer',required: true },
	orderMethod: {},
	orderTime: {},
	orderPayment: {ptype:String,cash: Boolean, cardpickup: Boolean, cardinternet: Boolean},
	subTotal:Number,
	tax:Number,
	gTotal:Number,
	deliveryfee: Number,
	orders:{}
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;