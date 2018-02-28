var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bookmarkSchema = new Schema({
    title: { type: String, required: true },
    position: { type: Number, required: true },
    type: { type: String  },
    body: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
});

var bookmark = mongoose.model('bookmark', bookmarkSchema);

module.exports = bookmark;