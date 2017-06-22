var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Kitchenmenu.js');
var addonModel = require('../model/addon.js');

var MenuSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    kitchenId: { type: String, required: true},
    menuId: { type: Schema.Types.ObjectId, ref:'Menu', required: true},
    price: Number,
    image: String,
    options: [{ type: Schema.Types.ObjectId, ref:'Addon', required: true}],
    multisize: [{size: String, price: String}]
});
var Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;