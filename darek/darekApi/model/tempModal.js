var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var TempSchema = new Schema({
	tempArray : []
});

var Temp = mongoose.model('Temp', TempSchema);

module.exports = Temp;