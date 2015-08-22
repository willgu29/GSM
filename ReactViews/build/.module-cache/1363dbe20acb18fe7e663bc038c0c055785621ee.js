
var CreateGroup = React.createClass({displayName: "CreateGroup",

    //Track opens default yes, track clicks default yes, auto_text default yes,
    //preserve_recipients NO, merge_language Handlebars, 
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: "/api/groups/"}, 
				"Subject: ", React.createElement("input", {type: "text", id: "subject", name: "subject"}), " ", React.createElement("br", null), 
				"HTML Text: ", React.createElement("textarea", {id: "html", name: "html", onChange: this.handleChange.bind(this, "html"), 
				cols: "60", row: "10"}), " ", React.createElement("br", null), 
				"From Email: ", React.createElement("input", {type: "text", id: "from_email", name: "from_email"}), " ", React.createElement("br", null), 
				"From Name: ", React.createElement("input", {type: "text", id: "from_name", name: "from_name"}), " ", React.createElement("br", null), 
				"To: (Separate multiple with commas (no spaces)): ", React.createElement("br", null), 
				React.createElement("input", {type: "text", id: "to_email", name: "to_email"}), " ", React.createElement("br", null), 
				"Tags: (Separate multiple with commas (no spaces)): ", React.createElement("br", null), 
				React.createElement("input", {type: "text", id: "tags", name: "tags"}), " ", React.createElement("br", null), 
				React.createElement("input", {type: "submit", value: "Submit", id: "sendMail"})


			)
		);
	}

});


React.render(React.createElement(CreateGroup, null), document.getElementById("createGroup"));