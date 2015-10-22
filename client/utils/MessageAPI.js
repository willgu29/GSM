var axios = require('axios');


const MessageAPI = {

	//Currently only gets message thread for current logged in user.
	//Therefore, just pass in userID = nil, /api/messages/ will automatically put userID of current
	//req user in.
	getMessageThreadsForUserID: function(userID) {
		axios.get("/api/messages/")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	}

	//every message thread has a conversationID, this will fetch the entire message log.
	getMessagesForMessageThread: function(messageThreadID) {
		axios.get("/api/message/" + convoID)
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});	
	}
	//get 1 specific message thread object (not the messages in them)
	//Check mongoose Models for clarification on data structure
	getMessageThread: function(messageThreadID) {
		axios.get("/api/messageThread/" + messageThreadID)
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});	
	}



}


module.exports = MessageAPI;