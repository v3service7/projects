var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Restaurant = require('../model/Restaurant.js');

// create a schema
var PromotionSchema = new Schema({
    image:  { type: String},
    name: { type: String, required: true},
    desc:  { type: String, required: true},
    restaurantOptions : [{ type: Schema.Types.ObjectId, ref:'Restaurant'}],
    created_at: { type: Date, default: Date.now }
});

var Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;