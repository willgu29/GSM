'use strict'
import React from 'react'
var $ = require("jquery");
import { Router, Route, Link } from 'react-router'


var MessageActions = require("../actions/MessageActions");
var MessageStore = require("../stores/MessageStore");


var MessageThreadRow = React.createClass({
	handleClick: function() {
		MessageActions.setSelectedThreadTo(this.props.convoID);
		MessageActions.getMessagesForThreadByID(this.props.convoID);
	},
	render: function() {
		var fullName = this.props.fullName;
		var participantNames = this.props.participants;
		var participants = participantNames.join(", ");
		var infoText = this.props.messageCount + " messages in conversation";

		var convoURL = this.props.url + this.props.convoID + "?convoTitle=" + participantNames;
		return(
			<li><Link onClick={this.handleClick} to={convoURL}>{participants}: {infoText}</Link></li>

		);
	}

})

module.exports = React.createClass({
	displayName:"MessageThreads",
	getInitialState: function() {
		return MessageStore.getState();
	},
	componentDidMount: function() {
		MessageStore.listen(this.onChange);
		MessageActions.getMessageThreadsForUserID("me");
	},
	componentWillUnmount: function() {
		MessageStore.unlisten(this.onChange);
	},
	onChange(state){
		this.setState(state);
	},
	render: function() {

		var arrayOfThreads = this.state.messageThreads;
		var arrayOfRows = [];
		for (var i = 0; i < arrayOfThreads.length; i++) {
			var thread = arrayOfThreads[i];
			arrayOfRows.push(<MessageThreadRow fullName={thread.fullName} 
												participants={thread.participant_fullNames}
												messageCount={thread.messageCount} 
												url="/messages/conversation/"
												convoID={thread._id}/>);
		}

		if (arrayOfRows.length == 0) {
			arrayOfRows = (<li>No conversations started yet. Browse members and click more info
				to send individuals a message!</li>);
		}
		return(
			<div>
				<ul>
					{arrayOfRows}
				</ul>
				{this.props.children}
			</div>
		);
	}
});


// React.render(<MessageThreads url="/api/messages/" />, document.getElementById("messageThreads"));