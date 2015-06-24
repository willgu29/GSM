var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  fullName: String,
  avatarURL: String,
  dateCreated: {type: Date, default: Date.now},
  overallRating: Number


});

module.exports = User = mongoose.model('User', userSchema);