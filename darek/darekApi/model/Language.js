var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var LanguageSchema = new Schema({
    name : { type: String, required: true },
    abbr : { type: String, required: true },
    currency : { type: String, required: true },
});

var Language = mongoose.model('Language', LanguageSchema);
module.exports = Language;