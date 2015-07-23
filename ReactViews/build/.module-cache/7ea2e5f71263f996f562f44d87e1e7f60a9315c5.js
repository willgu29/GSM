var LoginForm = React.createClass({displayName: "LoginForm",
	getInitialState: function() {
		return ({loginStatus: ""});
	},
	handleSubmit: function(e) {
		e.preventDefault();

		var email = React.findDOMNode(this.refs.email).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		var data = {
			email: email,
			password: password
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			data: data,
			type: "POST",
			success: function(info){
     			if (this.isMounted()){
     				console.log(info);
     				if (info == '/') {
     					window.location.href = "http://igrouply.com";
     				}
     				this.setState({loginStatus:info});
      			}
      		}.bind(this),
      		error: function(xhr,status,err){
      			console.log(err);
      		}.bind(this)
      	});

	},

	render: function() {
		// var errorMessage;
		// if (this.state.loginStatus == "") {
		// 	errorMessage = "";
		// } else {
		// 	errorMessage = <p>{this.state.loginStatus}</p>;
		// }
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