var mongoose = require('mongoose');


var messageThreadSchema = new mongoose.Schema({
	messageThread_id: mongoose.Schema.Types.ObjectId,  //as _id
	user_id: String, //person who started thread
	fullName: String,
	dateCreated: {type: Date, default: Date.now},
	dateLastUpdated: Date, //last message sent
    participant_ids: [String], //add user_id as well (person who started)
    participant_fullNames: [String],
    messageCount: Number,
    unseenMessagesCount: Number,


});

module.exports = MessageThread = mongoose.model('MessageThread', messageThreadSchema);