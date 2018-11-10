const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

// User Schema
const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: String,
  image: String,
  phonenumber: String,
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  email_token: { type: String },
  role : {type: String, enum: ['Admin', 'User', 'Provider', 'Driver'], default: 'User'},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now } 
});

// Created a model using it
const User = mongoose.model('User', UserSchema);

// make this available to Node applications
module.exports = User;

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
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