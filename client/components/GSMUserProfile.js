'use strict'
import React from 'react'
var $ = require('jquery');
var UserStore = require("../stores/UserStore");
var UserActions = require("../actions/UserActions");

var NewMessage = React.createClass({
	

	createNewMessageThread: function() {
		var data = {
			_id: this.props._id,
			fullName: this.props.fullName,
			email: this.props.email
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			data: data,
			type: "POST",
			success: function(info){
     			if (this.isMounted()){
     				console.log(info);
  					if (info.info == "success") {
  						//TODO: segue to messages page
  						var url = "/messages/" + info._id + "?convoTitle=" + info.convoTitle;
  						console.log(url);
     					window.location.replace(url);
     				} else {
     					alert("There was an error. Please try again in a minute.");
     				}
      			}
      		}.bind(this),
      		error: function(xhr,status,err){
      			console.log(err);
      		}.bind(this)


		});
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