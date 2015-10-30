var errorStyle = {

	color: "red"
}

var LoginForm = React.createClass({
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
     					window.location.reload();
     				} else {
						this.setState({loginStatus:info.message});     					
     				}
      			}
      		}.bind(this),
      		error: function(xhr,status,err){
      			console.log(err);
      		}.bind(this)
      	});

	},

	render: function() {
		var errorMessage;
		if (this.state.loginStatus == "") {
			errorMessage = "";
		} else {
			errorMessage = <p style={errorStyle}>{this.state.loginStatus}</p>;
		}
		return(
			<div>
				<h4>Login </h4>
				{errorMessage}
				<form onSubmit={this.handleSubmit} className="loginForm" method="post" action="login" >
         		 email: <input type="email" name="email" ref="email" /> <br />
          		password: <input type="password" name="password"  ref="password" /> <br />
          		<br />
          		<input type="submit" value="login" id="login" />
        		</form>
			</div>
		);
	}
})

// React.render(<LoginForm url="/login" />, document.getElementById("loginForm"));

//The form method post automatically posts to current URL