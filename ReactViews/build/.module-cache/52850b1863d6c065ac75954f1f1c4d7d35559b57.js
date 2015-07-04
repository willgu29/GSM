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
				React.createElement("form", {className: "loginForm", onsubmit: this.handleSubmit, method: "post"}, 
                    "Email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
                    "Password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                    React.createElement("input", {type: "submit", value: "Login", id: "login"})
                )
			)
		);
	}
})

React.render(React.createElement(LoginForm, null), document.getElementAtId("loginForm"));

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