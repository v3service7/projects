var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CuisineSchema = new Schema({
    name: String,
    image: String
});

var Cuisine = mongoose.model('Cuisine', CuisineSchema);
module.exports = Cuisine;