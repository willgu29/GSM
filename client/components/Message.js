'use strict'
import React from 'react'
var $ = require("jquery");

var MessageActions = require("../actions/MessageActions");
var MessageStore = require("../stores/MessageStore");
// var convoID = document.getElementById("convoID").getAttribute("value");

// var convoTitle = document.getElementById("convoTitle").getAttribute("value");

var MessageRow = React.createClass({

	render: function() {
		return(
			<ul>{this.props.fullName}: {this.props.text}</ul>
		);
	}

});

module.exports = React.createClass({
  displayName:"MessageList",
  getInitialProps: function() {
    return( {
      url: "/api/messages",
      convoID: this.props.params.id,
      convoTitle: this.props.location.query.convoTitle
    });
  },
	getInitialState: function() {
		return MessageStore.getState();
	},
  componentDidMount: function() {
    MessageStore.listen(this.onChange);
    this.loadMessages();
  },
  componentWillUnmount: function() {
    MessageStore.unlisten(this.onChange);
  },
  onChange(state) {
    this.setState(state);
  },

	loadMessages: function() {
    MessageActions.getMessagesForThreadByID(this.state.selectedMessageThread._id);
	},
	refreshMessageList: function() {
		this.loadMessages();
	},
	render: function (){
    console.log("Message Thread: " + JSON.stringify(this.state.selectedMessageThread));
    var messageThread = this.state.selectedMessageThread;
    var convoTitle = messageThread.participant_fullNames.join(", ");
		var messageArray = this.state.messages;
		var messageDisplay = [];
		for (var i = 0; i < messageArray.length; i++) {
			var message = messageArray[i];
			var messageRow = (<MessageRow fullName={message.fullName} text={message.text} />);
			messageDisplay.push(messageRow);
		}


		return(
			<div>
				<h3>Conversation with {convoTitle}</h3>
				<li>
					{messageDisplay}
				</li>
				<MessageSend email={messageThread.participant_emails}
                      convoID={messageThread._id} 
                      handleMessageSubmit={this.refreshMessageList} />
			</div>
		);
	}
});


var MessageSend = React.createClass({
	getInitialState: function() {
    	return {text: '',
    			emails: []};
  	},
  	onChange: function(e) {
    	this.setState({text: e.target.value});
  	},
  	componentDidMount: function() {
  		
  	},
  	handleSubmit: function(e) {
    	e.preventDefault();

    	var data = {
    		text: this.state.text
    	};
    	//create message
      MessageActions.createMessageForThreadID(this.props.convoID, this.state.text);
    	
    	
    	var emailData = {
    		emails: this.props.emails,
    		text: this.state.text
    	};
    	//Email notification
    	console.log(emailData);
    	$.ajax({
    		url: "/api/sendMailTo/",
    		type: "POST",
    		dataType:"json",
    		data: emailData,
    		success: function(response) {
        		
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
    	});
    	
    	var nextText = '';
    	this.setState({text: nextText});
  	},
	render: function () {
		return(
			<div id="sendMessage">
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onChange} value={this.state.text} />
				</form>

			</div>
		);
	}
});


// React.render(<MessageList convoTitle={convoTitle} convoID={convoID} url="/api/messages/" />, document.getElementById("message"));