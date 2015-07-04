var LoginForm = React.createClass({

	render: function() {
		return(
			<div>
				<h4>Login </h4>
				<form className="loginForm" method="post" action="login" >
          email: <input type="text" name="email" /> <br />
          password: <input type="password" name="password" /> <br />
          <br />
          <input type="submit" value="login" id="login" />
        </form>
			</div>
		);
	}
})

React.render(<LoginForm url="/login" />, document.getElementById("loginForm"));

//The form method post automatically posts to current URL