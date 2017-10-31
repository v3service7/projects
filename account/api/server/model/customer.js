var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var customerSchema = new Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    dob: String,
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    email_token: { type: String },
    status: { type: Boolean, default: false },
    role : {type: String, enum: ['Admin', 'User'], default: 'User'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var customer = mongoose.model('customer', customerSchema);

module.exports = customer;

module.exports.getUserById = function(id, callback){
  customer.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  customer.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.encryptPassword = function(password, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if(err) throw err;
      callback(null, hash);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) return err;
    callback(null, isMatch);
  });
}