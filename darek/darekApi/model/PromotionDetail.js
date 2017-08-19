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
    discoutTiming : {},
    orderType : {any: Boolean, pickup: Boolean, delivery: Boolean},
    orderTime : {any: Boolean, now: Boolean, later: Boolean},
    clientbenefited : {any: Boolean, new: Boolean, returning: Boolean},
    dealredemption : {},
    couponcode : String,
    status : Boolean,
    created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

var PromotionDetail = mongoose.model('PromotionDetail', PromotionDetail);

module.exports = PromotionDetail;