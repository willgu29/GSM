var LoginForm = React.createClass({displayName: "LoginForm",
	getInitialState: function() {
		return ({loginStatus: ""});
	},
	handleSubmit: function(e) {
		e.preventDefault();

		var data = {
			email: React.findDOMNode(this.refs.email).value.trim(),
			password: React.findDOMNode(this.refs.password).value.trim()
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			data: data,
			type: "POST",
			success: function(info){
     			if (this.isMounted()){
     				this.setState({loginStatus:info});
      			}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
      	});

	},

	render: function() {
		var errorMessage;
		if (this.state.loginStatus == "") {

		} else {
			errorMessage = this.state.loginStatus;
		}
		return(
			React.createElement("div", null, 
				React.createElement("h4", null, "Login "), 
				errorMessage, 
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