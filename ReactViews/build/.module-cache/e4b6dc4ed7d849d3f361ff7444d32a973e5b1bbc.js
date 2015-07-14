
var SendMailForm = React.createClass({displayName: "SendMailForm",
	handleChange: function(name, event) {
        var change = {};
        change[name] = event.target.value;
        this.setState(change);
    },
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: "/admin/sendMail"}, 
				"Subject: ", React.createElement("input", {type: "text", id: "subject", name: "subject"}), 
				"HTML Text: ", React.createElement("textarea", {id: "html", name: "html", onChange: this.handleChange.bind(this, "html"), 
				cols: "60", row: "10"}), 
				"From Email: ", React.createElement("input", {type: "text", id: "from_email", name: "from_email"})
				

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