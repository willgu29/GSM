var LoginForm = React.createClass({displayName: "LoginForm",

	handleSubmit: function(e) {
		e.preventDefault();

		var data = {
			email: React.findDOMNode(this.refs.email).value.trim(),
			password: React.findDOMNode(this.refs.password).value.trim()
		}
		$.ajax({
			url: this.props.url,
			dataTyp


		});
	},

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("h4", null, "Login "), 
				React.createElement("form", {onSubmit: this.handleSubmit, className: "loginForm", method: "post", action: "login"}, 
         		 "email: ", React.createElement("input", {type: "email", name: "email", ref: "email"}), " ", React.createElement("br", null), 
          		"password: ", React.createElement("input", {type: "password", name: "password", ref: "password"}), " ", React.createElement("br", null), 
          		React.createElement("br", null), 
          		React.createElement("input", {type: "submit", value: "login", id: "login"})
        		)
			)
		);
	}
})

React.render(React.createElement(LoginForm, {url: "/login"}), document.getElementById("loginForm"));

//The form method post automatically posts to current URL