"use strict";

var NewMessage = React.createClass({
	displayName: "NewMessage",

	createNewMessageThread: function createNewMessageThread() {
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
			success: (function (info) {
				if (this.isMounted()) {
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
			}).bind(this),
			error: (function (xhr, status, err) {
				console.log(err);
			}).bind(this)

		});
	},

	buttonClick: function buttonClick(e) {
		e.preventDefault();
		this.createNewMessageThread();
	},

	render: function render() {

		return React.createElement(
			"button",
			{ onClick: this.buttonClick },
			"Send Message"
		);
	}

});

var UserProfile = React.createClass({
	displayName: "UserProfile",

	getInitialState: function getInitialState() {
		return {
			email: "",
			fullName: "",
			// interesting: "",
			//          contactIf:  "",
			//          personality: [],
			//          skills: [],
			wants: [],
			canOffer: [],
			topFiveTime: ""

		};
	},
	componentDidMount: function componentDidMount() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (function (userData) {
				if (this.isMounted()) {
					this.setState({
						_id: userData._id,
						fullName: userData.fullName,
						email: userData.email,
						// interesting: userData.identity.interesting,
						// personality: userData.identity.personality,
						// skills: userData.identity.skills,
						canOffer: userData.identity.canOffer,
						wants: userData.identity.wants,
						topFiveTime: userData.identity.topFiveTime
						// contactIf: userData.identity.contactIf

					});
				}
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(status, err.toString());
			}).bind(this)
		});
	},

	render: function render() {

		// var skillsArray = this.state.skills.join(", ");
		// var personalityArray = this.state.personality.join(", ");
		var canOfferArray = this.state.canOffer.join(", ");
		var wantsArray = this.state.wants.join(", ");

		var fullName = this.state.fullName;

		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				null,
				"About ",
				fullName
			),
			React.createElement(
				"p",
				null,
				"Spends Time Mostly: ",
				this.state.topFiveTime
			),
			React.createElement(
				"p",
				null,
				"Can Offer: ",
				canOfferArray
			),
			React.createElement(
				"p",
				null,
				"Wants: ",
				wantsArray
			),
			React.createElement(NewMessage, { url: "/api/messages/", fullName: fullName, _id: this.state._id, email: this.state.email })
		);
	}

});

var urlCall = "/api" + window.location.pathname;
React.render(React.createElement(UserProfile, { url: urlCall }), document.getElementById("gsmUserProfile"));

/*
		<p>Interesting Info: {this.state.interesting}</p>
				<p>Skills: {skillsArray}</p>
				<p>Personality: {personalityArray}</p>
				<p>Contact If: {this.state.contactIf}</p>

				*/