var CreateAccountForm = React.createClass({

	render: function() {
		return(	
			<div>
			<h4>Create Account</h4>
			 <form className="createAccountForm" method="post" action="createAccount" >
             	first name: <input type="text" name="firstName" /> <br />
                last name: <input type="text" name="lastName" /> <br />
                email: <input type="email" name="email" /> <br />
                phone number: (xxxxxxxxxx) <input type="tel" name="phoneNumber" /> <br />
                password: <input type="password" name="password" /> <br />
                <br />
                <input type="submit" value="create account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

React.render(<CreateAccountForm url="/createAccount" />, document.getElementById("createAccountForm"));


