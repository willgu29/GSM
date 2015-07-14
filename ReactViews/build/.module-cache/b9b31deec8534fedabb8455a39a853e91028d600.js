
var SendMailForm = React.createClass({displayName: "SendMailForm",
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: "/admin/sendMail"}
				
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