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

//Wht. This should be in handleLoginSubmit... there is voodoo shit going on.
/* $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    */