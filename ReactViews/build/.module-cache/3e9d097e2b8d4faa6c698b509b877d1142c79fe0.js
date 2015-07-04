var LoginForm = React.createClass({displayName: "LoginForm",

	handleSubmit: function(e) {
		e.preventDefault();
    $.ajax({
        url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: e,
          success: function(data) {
            console.log("SUCCESS");
          }.bind(this),
          error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
 
	},

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("h4", null, "Login "), 
				React.createElement("form", {className: "loginForm", onSubmit: this.handleSubmit}, 
          "email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
          "password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
          React.createElement("br", null), 
          React.createElement("input", {type: "submit", value: "login", id: "login"})
        )
			)
		);
	}
})

React.render(React.createElement(LoginForm, {url: "/login"}), document.getElementById("loginForm"));

//The form method post automatically posts to current URL