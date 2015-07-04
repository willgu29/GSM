var CreateAccountForm = React.createClass({

	handleSubmit: function(e) {
		if (!this.validate) {
			e.preventDefault();
		} 
		alert("HI");
	},

	render: function() {
		return(
			<div>
			 <form className="createAccountForm" onsubmit={this.handleSubmit} method="post">
             	First name: <input type="text" name="firstName" /> <br />
                Last name: <input type="text" name="lastName" /> <br />
                Email: <input type="text" name="email" /> <br />
                Password: <input type="password" name="password" /> <br />
                <input type="submit" value="Create Account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

React.render(<CreateAccountForm />, document.body);