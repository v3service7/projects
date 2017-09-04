var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Restaurant = require('../model/Restaurant.js');
var Promotion = require('../model/Promotion.js');

// create a schema
var PromotionDetail = new Schema({
    restaurantId : [{ type: Schema.Types.ObjectId, ref:'Restaurant', required: true}],
    promotionId : [{ type: Schema.Types.ObjectId, ref:'Promotion', required: true}],
    promoname : String,
    description : String,
    image : String,
    discountOn : {},
    discountPercent : Number,
    discountAmount : Number,
    discountTiming : [],
    orderType : {type: String,default: 'any',enum:['any', 'pickup', 'delivery']},
    orderTime : {type: String,default: 'any',enum:['any', 'now', 'later']},
    clientbenefited : {type: String,default: 'any',enum:['any', 'new', 'returning']},
    dealredemption : {type: String,default: 'all',enum:['all', 'some']},
    couponcode : {},
    status : { type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

var PromotionDetail = mongoose.model('PromotionDetail', PromotionDetail);

module.exports = PromotionDetail;