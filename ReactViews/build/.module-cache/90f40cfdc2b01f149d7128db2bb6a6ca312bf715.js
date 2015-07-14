
var SendMailForm = React.createClass({displayName: "SendMailForm",
	handleChange: function(name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change);
    },


    //Track opens default yes, track clicks default yes, auto_text default yes, 
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: "/admin/sendMail"}, 
				"Subject: ", React.createElement("input", {type: "text", id: "subject", name: "subject"}), " ", React.createElement("br", null), 
				"HTML Text: ", React.createElement("textarea", {id: "html", name: "html", onChange: this.handleChange.bind(this, "html"), 
				cols: "60", row: "10"}), " ", React.createElement("br", null), 
				"From Email: ", React.createElement("input", {type: "text", id: "from_email", name: "from_email"}), " ", React.createElement("br", null), 
				"From Name: ", React.createElement("input", {type: "text", id: "from_name", name: "from_name"}), " ", React.createElement("br", null), 
				"To: (Separate multiple with commas (no spaces)): ", React.createElement("br", null), 
				React.createElement("input", {type: "text", id: "to_email", name: "to_email"}), " ", React.createElement("br", null)



			)
		);
	}

});


var SendMail = React.createClass({displayName: "SendMail",
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: ""}



			)
		);
	}

});

React.render(React.createElement(SendMail, null), document.getElementById("sendMandrillMail"));