const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  logo: String,
  name: String,
  googleId: String,
  email:String
});


module.exports = mongoose.model('users', userSchema);
