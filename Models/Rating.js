var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
	user_id: String,
	dateCreated: {type: Date, default: Date.now},
    rating: Number,
    comment: String,
   	byUser_id: String,

});

module.exports = Rating = mongoose.model('Rating', ratingSchema);