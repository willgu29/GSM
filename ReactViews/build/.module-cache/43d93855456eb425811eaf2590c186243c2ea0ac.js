var LoginForm = React.createClass({displayName: "LoginForm",

	handleSubmit: function(e) {
		if (!this.validate) {
			e.preventDefault();
		} 
    alert("HI");
	},

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("h4", null, "Login "), 
				React.createElement("form", {className: "loginForm", onsubmit: this.handleSubmit, method: "post"}, 
                    "email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
                    "password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                    React.createElement("br", null), 
                    React.createElement("input", {type: "submit", value: "login", id: "login"})
                )
			)
		);
	}
})

React.render(React.createElement(LoginForm, null), document.getElementById("loginForm"));
