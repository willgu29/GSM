var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	user_id: String,
	dateCreated: {type: Date, default: Date.now},
    rating: Number,
    text: String,
    isAnonymous: Boolean,
    byUser_id: String,
    authorFullName: String,

});

module.exports = Comment = mongoose.model('Comment', commentSchema);