var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
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
    topFiveTime: String,
  	contactIf: String,
    canOffer: [String],
    wants: [String],
    interesting: String,
    reputation: String
  },
  groupsIn_ids: [mongoose.Schema.Types.ObjectId],
  groupsIn_names: [String],
  role: String,
  initialGroupID: String,
  lastLoginDate: Date //if nil/NaN/undefined, etc , never logged in, else date
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