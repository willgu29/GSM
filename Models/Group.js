var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
	group_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
	name: String,
    userIds_inGroup: [String],
    fullNames_inGroup: [String],
    authorFullName: String,
    childrenGroup_ids: [mongoose.Schema.Types.ObjectId],
    childrenGroup_names: [String],
    level: Number //if 1 == root

});

module.exports = Group = mongoose.model('Group', groupSchema);