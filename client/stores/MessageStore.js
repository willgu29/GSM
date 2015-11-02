var alt = require('../alt');
var MessageActions = require('../actions/MessageActions');

class MessageStore {
  constructor() {
    this.messageThread = {};
    this.messages = [];
    
    this.bindListeners({
      onMessageThreadReceived: MessageActions.messageThreadReceived,
      onMessageCreated: MessageActions.messageCreated,
      onMessagesForThreadReceived: MessageActions.messagesForThreadReceived
    });


  }

  onMessageThreadReceived(result) {
  	this.messageThread = result;
  
  }
  onMessagesForThreadReceived(result) {
    this.messages = result;
  }
  onMessageCreated(message) {

  }

}

module.exports = alt.createStore(MessageStore, 'MessageStore');
