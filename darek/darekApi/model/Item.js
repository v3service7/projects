var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuModel = require('../model/Kitchenmenu.js');
var addonModel = require('../model/addon.js');

var MenuSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    kitchenId: { type: String, required: true},     /*restaurant id*/
    menuId: { type: Schema.Types.ObjectId, ref:'Menu', required: true}, /*menu id*/
    price: Number,
    image: String,
    isHidden:  {type:Boolean,default:false},
    isSpecific:  {type:Boolean,default:false},
    options: [{ type: Schema.Types.ObjectId, ref:'Addon', required: true}],
    multisize: [{size: String, price: String}],
    openinghours : { monday: {type: Boolean},tuesday: {type:Boolean},wednesday: {type:Boolean},
                    thursday: {type:Boolean},friday: {type:Boolean},saturday: {type:Boolean},
                    sunday: {type:Boolean}, opentime : String, closetime : String}
});
var Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;