var CreateAccountForm = React.createClass({

	render: function() {
		return(	
			<div>
			<h4>New here? Sign Up.</h4>
			 <form className="createAccountForm" method="post" action="createAccount" >
                email: <input type="email" name="email" /> <br />
                password: <input type="password" name="password" /> <br />
             	first name: <input type="text" name="firstName" /> <br />
                last name: <input type="text" name="lastName" /> <br />
                phone: <input type="tel" name="phoneNumber" /> <br />
                group code: <img src='/public/imgs/infobutton.png'/> <input type="text" name="initialGroupCode" /> <br />

                <br />
                <input type="submit" value="create account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

React.render(<CreateAccountForm url="/createAccount" />, document.getElementById("createAccountForm"));


