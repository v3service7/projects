var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CountrySchema = new Schema({
    countryName: String
});

var Country = mongoose.model('Country', CountrySchema);
module.exports = Country;