// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

OwnerSchema = require('../model/Owner.js');

// create a schema
var RestaurantSchema = new Schema({
    name: String,
    resCode: String,
    ownerId : { type: Schema.Types.ObjectId, ref: 'Owner' },
    city : String,
    image : String,
    country : String,
    state : String,
    lat : String,
    lng : String,
    address : String,
    zipcode : String,
    phoneNo : String,
    emailstatus: { type: Boolean, default: false },
    pickup: { type: Boolean, default: true },
    orderforlater: { type: Boolean, default: true },
    orderforlaterpickup: { mintime: String, mindate: String },    
    orderforlaterdelivery: { mintime: String, mindate: String },
    taxation: { name: String, taxpercent: String, menuTax: String, deliveryTax: String, currency: String },
    paymentpickup: { cash: Boolean, cardpickup: Boolean, cardinternet: Boolean},
    paymentdelivery: { cash: Boolean, cardpickup: Boolean, cardinternet: Boolean},
    notification: [],
    languages: [],
    
    openinghours : { monday: {type: Boolean},  mondaytime: {opentime : String, closetime : String}, 
                    tuesday: {type:Boolean}, tuesdaytime: {opentime : String, closetime : String},
                    wednesday: {type:Boolean}, wednesdaytime: {opentime : String, closetime : String},
                    thursday: {type:Boolean}, thursdaytime: {opentime : String, closetime : String},
                    friday: {type:Boolean}, fridaytime: {opentime : String, closetime : String},
                    saturday: {type:Boolean}, saturdaytime: {opentime : String, closetime : String},
                    sunday: {type:Boolean}, sundaytime: {opentime : String, closetime : String}},
    status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date

});

// the schema is useless so far
// we need to create a model using it
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

// make this available to our users in our Node applications
module.exports = Restaurant;