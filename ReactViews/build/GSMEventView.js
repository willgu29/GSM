"use strict";

pStyleIndent = {

	textIndent: "25"
};

var EventRow = React.createClass({
	displayName: "EventRow",

	render: function render() {
		return React.createElement(
			"li",
			null,
			React.createElement(
				"h3",
				null,
				this.props.name,
				": ",
				this.props.startTime,
				" - ",
				this.props.endTime
			),
			React.createElement(
				"p",
				{ style: pStyleIndent },
				this.props.description
			)
		);
	}
});

var GSMEventView = React.createClass({
	displayName: "GSMEventView",

	getInitialState: function getInitialState() {
		return { events: [] };
	},
	componentDidMount: function componentDidMount() {
		this.loadInitialEvents();
	},
	loadInitialEvents: function loadInitialEvents() {

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (function (events) {
				this.setState({ events: events });
			}).bind(this),
			error: (function (xhr, status, err) {
				console.log("Error: ", err);
			}).bind(this)
		});
	},
	render: function render() {

		console.log(this.state.events);

		var arrayOfEvents = this.state.events;
		var eventDisplay = [];
		for (var i = 0; i < arrayOfEvents.length; i++) {
			var event = arrayOfEvents[i];
			var eventRow = React.createElement(EventRow, { _id: event._id,
				name: event.name,
				description: event.description,
				startTime: event.startTime,
				endTime: event.endTime });

			eventDisplay.push(eventRow);
		}
		if (eventDisplay == "") {
			eventDisplay = "No events currently.";
		}

		return React.createElement(
			"ul",
			null,
			eventDisplay
		);
	}
});

React.render(React.createElement(GSMEventView, { url: "/api/events" }), document.getElementById("gsmEventView"));