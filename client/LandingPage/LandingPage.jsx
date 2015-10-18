'use strict'
import React from 'react'


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


var groupStyle = {

    cursor: "pointer",
    width: "10%",
    height: "auto"
}


var CreateAccountForm = React.createClass({
    getInitialState: function() {
        return {help: false};
    },
    handleClick: function(event) {
        this.setState({help: !this.state.help});
    },
	render: function() {
        var helptext = this.state.help ? 'iGrouply is still in Alpha testing. To join, enter a valid group code if you\'re in a group. If you would like to start a group, email hi@igrouply.com' : '';
		return(	
			<div>
			<h4>New to iGrouply? Sign Up.</h4>
			 <form className="createAccountForm" method="post" action="createAccount" >
                email: <input type="email" name="email" /> <br />
                password: <input type="password" name="password" /> <br />
             	first name: <input type="text" name="firstName" /> <br />
                last name: <input type="text" name="lastName" /> <br />
                phone number: <input type="tel" name="phoneNumber" /> <br />
                group code:&nbsp;&nbsp; 
                
                <img src='/public/imgs/InfoButtonBlack.png' style={groupStyle} onClick={this.handleClick}/>
                <br/><i> {helptext}</i><br/>
                

                <input type="text" name="initialGroupCode" /> <br />

                <br />
                <input type="submit" value="create account" id="createAccount" />
            </form>
            </div>
             
		);
	} 
});

module.exports = React.createClass({
	render: function() {
		return (

				<div id="landingPage">
    
    		<div class='container-fluid top'>
    			<div class='row'>
 					<div class="col-md-1"></div> 
    					<div class="col-md-2">
    					<div class="header">
						<div class='header-logo'>iGrouply</div>
					<br/><p></p>
					<p class='header-content'><br/>Discover your network.
							<ul id="valueProp">
								<li>Find people who can help you with your projects and goals</li>
								<li>Offer your skills and help other people</li>
								<li>Message and meet interesting people</li>
								<li>UCLA (and BAB) Exclusive</li>
							</ul>
						</p>

				</div>
			</div>
			<div class="col-md-2 login">

			    <LoginForm />
			    <hr/>

			    <CreateAccountForm />
			</div>
		</div>
	</div>

</div>

		);
	}


})