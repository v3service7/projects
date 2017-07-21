var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Item.js');
var Resturant = require('../model/Restaurant.js');

var AddOni = new Schema({
    name: { type: String, required: true},
    groupType: {},
    restaurantId: { type: Schema.Types.ObjectId, ref:'Restaurant',  required: true},
    itemId: { type: Schema.Types.ObjectId, ref:'Item'},
    subaddon: [{name: String, price: String}]
});

var AddOn = mongoose.model('Addon', AddOni);
module.exports = AddOn;