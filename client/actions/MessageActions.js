var alt = require('../alt');
var MessageAPI = require("../utils/MessageAPI");

class MessageActions {
	constructor() {
		this.generateActions(
			"messageThreadReceived",
			"messageCreated",
			"messagesForThreadReceived"
		);
	}

	getMessageThreadByID(id) {

	}

	getMessagesForThreadByID(threadID) {
		MessageAPI.getMessagesForMessageThreadByID(threadID).then((result) => {
			this.actions.messagesForThreadReceived(result);
		}).catch(function(error) {

		});
	}

	createMessageThread(participantID, participantFullName, participantEmail) {
		MessageAPI.createNewMessageThread(participantID, participantFullName, participantEmail).then((result) => {
			this.actions.messageThreadReceived(result);
		}).catch(function(error) {

  		});
	}
	createMessageForThreadID(threadID, messageText) {
		MessageAPI.createNewMessageInThreadIDWithText(threadID, messageText).then((result) => {
			this.actions.messageCreated(result);
		}).catch(function(error) {

		});
	}
	



}

module.exports = alt.createActions(MessageActions);