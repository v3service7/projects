var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KitchenmenuSchema = new Schema({
	name: { type: String, required: true},
	description: String,
	kitchenId: { type: String, required: true},  /*resaurant Id*/
	image:  String,
	isHidden:  {type:Boolean,default:false},
    isSpecific:  {type:Boolean,default:false},
	openinghours : {monday: {type: Boolean},tuesday: {type:Boolean},wednesday: {type:Boolean},
                    thursday: {type:Boolean},friday: {type:Boolean},saturday: {type:Boolean},
                    sunday: {type:Boolean}, opentime : String, closetime : String}
});

var Kitchenmenu = mongoose.model('Kitchenmenu', KitchenmenuSchema);

module.exports = Kitchenmenu;