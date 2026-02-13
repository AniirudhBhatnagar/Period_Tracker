const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // only for local auth
  googleId: String, // for OAuth
});

module.exports = mongoose.model('User', UserSchema); 