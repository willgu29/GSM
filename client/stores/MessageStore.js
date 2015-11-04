var alt = require('../alt');
var MessageActions = require('../actions/MessageActions');

class MessageStore {
  constructor() {
    this.messageThreads = [];
    this.selectedMessageThread = {};
    this.messages = [];
    
    this.bindListeners({
      onMessageThreadsReceived: MessageActions.messageThreadsReceived,
      onMessageThreadReceived: MessageActions.messageThreadReceived,
      onMessageCreated: MessageActions.messageCreated,
      onMessagesForThreadReceived: MessageActions.messagesForThreadReceived,
      onSetSelectedThreadTo: MessageActions.setSelectedThreadTo
    });


  }

  onSetSelectedThreadTo(convoID) {
    for (var i = 0; i < this.messageThreads.length; i++) {
      var messageThread = this.messageThreads[i];
      if (messageThread._id == convoID) {
        this.selectedMessageThread = messageThread;
        break;
      }
    }
  }

  onMessageThreadsReceived(result) {
    this.messageThreads = result;
  }

  onMessageThreadReceived(result) {
  	this.selectedMessageThread = result;
  
  }
  onMessagesForThreadReceived(result) {
    this.messages = result;
  }
  onMessageCreated(message) {

  }

}

module.exports = alt.createStore(MessageStore, 'MessageStore');
