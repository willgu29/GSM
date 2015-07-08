var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  phoneNumber: Number,
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
  	contactIf: String,
  	interesting: String,
    canOffer: [String],
    wants: [String],
    hobbies: [String],
    reputation: String
    

  }

});

module.exports = User = mongoose.model('User', userSchema);