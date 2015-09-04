var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	group_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
	name: String,
	description: String,
    peopleInvited_fullNames: [String],
    peopleInvited_ids: [String],
    peopleAttending_fullNames: [String],
    peopleAttending_ids: [String],
    peopleNotAttending_fullNames: [String],
    peopleNotAttending_ids: [String],

});

module.exports = Event = mongoose.model('Event', eventSchema);