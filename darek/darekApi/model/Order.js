var mongoose = require('mongoose');
var Schema = mongoose.Schema;

customerSchema = require('../model/Customer.js');
RestaurantSchema = require('../model/Restaurant.js');
DriverSchema = require('../model/Driver.js');

// create a schema
var OrderSchema = new Schema({
	restaurantId : { type: Schema.Types.ObjectId, ref: 'Restaurant' ,required: true },
	customerId : { type: Schema.Types.ObjectId, ref: 'Customer',required: true },
	driverId : { type: Schema.Types.ObjectId, ref: 'Driver'},
	orderMethod: {},
	orderTime: {},
	orderPayment: {ptype:String,cash: Boolean, cardpickup: Boolean, cardinternet: Boolean},
	subTotal:Number,
	tax:Number,
	gTotal:Number,
	deliveryfee: Number,
	orders:{},
	status : String,
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;