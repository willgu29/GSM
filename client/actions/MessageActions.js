var alt = require('../alt');
var MessageAPI = require("../utils/MessageAPI");

class MessageActions {
	constructor() {
		this.generateActions(
			"messageThreadsReceived",
			"messageThreadReceived",
			"messageCreated",
			"messagesForThreadReceived"
		);
	}

	setSelectedThreadTo(convoID) {
		this.dispatch(convoID);
	}
	//only returns current user (pass in nil)
	getMessageThreadsForUserID(userID) {
		MessageAPI.getMessageThreadsForUserID(userID).then((result) => {
			this.actions.messageThreadsReceived(result);
		}).catch(function(error) {

		});
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