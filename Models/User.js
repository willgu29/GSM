var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String, //User_id field for now..
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
    

  },
  role: String

});
userSchema.index({"$**": "text" });

// userSchema.index({ email: 'text',
//               fullName: 'text',
//               identity: {
//                 skills: 'text',
//                 personality: 'text',
//                 contactIf: 'text',
//                 interesting: 'text',
//                 canOffer: 'text',
//                 wants: 'text'
//               }});

module.exports = User = mongoose.model('User', userSchema);