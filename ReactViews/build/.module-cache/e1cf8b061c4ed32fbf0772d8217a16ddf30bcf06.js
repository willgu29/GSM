var CreateEvent = React.createClass({displayName: "CreateEvent",

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("h3", null, "Create root group"), 
				React.createElement("form", {method: "post", action: this.props.url}, 
					"Event Name: ", React.createElement("input", {type: "text", id: "eventName", name: "eventName"}), " ", React.createElement("br", null), 
					"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
					"Start Time: ", React.createElement("input", {type: "datetime-local", id: "startTime", name: "startTime"}), " ", React.createElement("br", null), 
					"End Time: ", React.createElement("input", {type: "datetime-local", id: "endTime", name: "endTime"}), " ", React.createElement("br", null), 
				
					React.createElement("input", {type: "submit", value: "create event", id: "createEvent"})


				), 
				React.createElement("h3", null, "Create sub group"), 
				React.createElement(CreateSubGroup, {url: this.props.url})
			)
		);
	}

});

React.render(React.createElement(CreateGroup, {url: "/api/events/"}), document.getElementById("createEvent"));