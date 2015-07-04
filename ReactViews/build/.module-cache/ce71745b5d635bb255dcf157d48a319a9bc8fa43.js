var LoginForm = React.createClass({displayName: "LoginForm",

	handleLoginSubmit: function(e) {
		if (!this.validate) {
			e.preventDefault();
		}
		alert("HI");
	},

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("form", {className: "loginForm", onsubmit: this.handleLoginSubmit, method: "post"}, 
					"First name: ", React.createElement("input", {type: "text", name: "firstName"}), " ", React.createElement("br", null), 
					"Last name: ", React.createElement("input", {type: "text", name: "lastName"}), " ", React.createElement("br", null), 
                    "Email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
                    "Password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                    React.createElement("input", {type: "submit", value: "Login", id: "login"})
                )
			)
		);
	}
})

React.render(React.createElement(LoginForm, null), document.body);