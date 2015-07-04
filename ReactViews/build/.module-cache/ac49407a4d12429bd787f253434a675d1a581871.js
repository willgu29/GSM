var LoginForm = React.createClass({displayName: "LoginForm",

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("form", {className: "loginForm", onsubmit: this.handleSubmit, method: "post"}, 
					React.createElement("input", {type: "text", name: "firstName", placeholder: "first name"}), 
					React.createElement("input", {type: "text", name: "lastName", placeholder: "last name"}), 
                    React.createElement("input", {type: "text", name: "email", placeholder: "email"}), 
                    React.createElement("input", {type: "password", name: "password", placeholder: "password"}), 
                    React.createElement("input", {type: "submit", value: "Login", id: "login"})
                )
			)
		);
	}
})

React.render(React.createElement(LoginForm, null), document.body);