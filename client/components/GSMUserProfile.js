'use strict'
import React from 'react'
var $ = require('jquery');
var UserStore = require("../stores/UserStore");
var UserActions = require("../actions/UserActions");
var MessageActions = require("../actions/MessageActions");
var MessageStore = require("../stores/MessageStore");

var { Router, Route } = require('react-router');
import History from 'react-router/lib/History'


var NewMessage = React.createClass({
	mixins: [History],
	componentDidMount: function() {
		MessageStore.listen(this.onChange);
	},
	componentWillUnmount: function() {
		MessageStore.unlisten(this.onChange);
	},
	onChange(state) {
		if (state.messageThread.info == "success") {
			console.log("hello?");
			var pathURL = "/messages/" + state.messageThread._id;
			this.history.pushState(null, pathURL, null);

		}
	},
	createNewMessageThread: function() {
		var data = {
			_id: this.props._id,
			fullName: this.props.fullName,
			email: this.props.email
		};
		MessageActions.createMessageThread(this.props._id, this.props.fullName,this.props.email);
	},

	buttonClick: function(e) {
		e.preventDefault();
		this.createNewMessageThread();
	},

	render: function() {
		
		return(
			<button onClick={this.buttonClick}>Send Message</button>

		);
	}

});


module.exports = React.createClass({
	displayName: "UserProfile",
	getInitialState: function() {
		return UserStore.getState();
	},
	componentDidMount: function() {
		UserStore.listen(this.onChange);
		UserActions.getUser(this.props.params.userID)
	},
	componentWillUnmount: function() {
		UserStore.unlisten(this.onChange);
	},
	onChange(state) {
		this.setState(state);
	},

	render: function () {

		// var skillsArray = this.state.skills.join(", ");
		// var personalityArray = this.state.personality.join(", ");
		var canOfferArray = this.state.fetchedUser.canOffer.join(", ");
		var wantsArray = this.state.fetchedUser.wants.join(", ");

		var fullName = this.state.fetchedUser.fullName;

		console.log("FullName: +", fullName);
		console.log("Wnats: + ", wantsArray);

		return(
			<div>
				<h3>About {fullName}</h3>
				<p>Spends Time Mostly: {this.state.fetchedUser.topFiveTime}</p>
				<p>Can Offer: {canOfferArray}</p>
				<p>Wants: {wantsArray}</p>

				<NewMessage url="/api/messages/" fullName={fullName} _id={this.state.fetchedUser._id} email={this.state.fetchedUser.email} />
			</div>

		);
	}

});






/*
		<p>Interesting Info: {this.state.interesting}</p>
				<p>Skills: {skillsArray}</p>
				<p>Personality: {personalityArray}</p>
				<p>Contact If: {this.state.contactIf}</p>

				*/