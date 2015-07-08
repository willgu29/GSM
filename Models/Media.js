var mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
	user_id: String,
	dateCreated: {type: Date, default: Date.now},
    mediaType: String,
    mediaLink: String,
    displayOnProfile: Boolean

});

module.exports = Media = mongoose.model('Media', mediaSchema);