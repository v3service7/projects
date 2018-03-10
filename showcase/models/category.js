var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CategorySchema = new Schema({
    name: { type: String, required: true },
    position: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var category = mongoose.model('category', CategorySchema);
module.exports = category;