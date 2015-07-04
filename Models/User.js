var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  fullName: String,
  avatarURL: String,
  dateCreated: {type: Date, default: Date.now},
  overallRating: Number,
  identity : {
  	skills: [String],
  	personality: [String],
  	wants: [String],
  	interesting: [String]

  }

});

module.exports = User = mongoose.model('User', userSchema);